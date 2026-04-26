#!/bin/bash

# ============================================================
# ETHINX Cloud Deployment Script
# Zero-Touch Multi-Cloud Deployment
# ============================================================

set -euo pipefail

# Configuration
APP_NAME="ethinx"
VERSION="${VERSION:-1.0.0}"
ENVIRONMENT="${ENVIRONMENT:-production}"
REGION="${REGION:-us-east-1}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Logging
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

print_banner() {
    echo -e "${CYAN}"
    echo "╔═══════════════════════════════════════════════════════════╗"
    echo "║                                                           ║"
    echo "║   ███████╗████████╗██╗  ██╗██╗███╗   ██╗██╗  ██╗         ║"
    echo "║   ██╔════╝╚══██╔══╝██║  ██║██║████╗  ██║╚██╗██╔╝         ║"
    echo "║   █████╗     ██║   ███████║██║██╔██╗ ██║ ╚███╔╝          ║"
    echo "║   ██╔══╝     ██║   ██╔══██║██║██║╚██╗██║ ██╔██╗          ║"
    echo "║   ███████╗   ██║   ██║  ██║██║██║ ╚████║██╔╝ ██╗         ║"
    echo "║   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝         ║"
    echo "║                                                           ║"
    echo "║           Cloud Deployment System v${VERSION}               ║"
    echo "║                                                           ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local missing=()
    
    command -v docker &>/dev/null || missing+=("docker")
    command -v git &>/dev/null || missing+=("git")
    command -v node &>/dev/null || missing+=("node")
    command -v npm &>/dev/null || missing+=("npm")
    
    if [ ${#missing[@]} -ne 0 ]; then
        log_error "Missing required tools: ${missing[*]}"
        log_info "Please install missing dependencies and try again."
        exit 1
    fi
    
    log_success "All prerequisites met"
}

build_application() {
    log_info "Building application..."
    
    # Install dependencies
    npm ci --legacy-peer-deps
    
    # Build for production
    npm run build
    
    log_success "Application built successfully"
}

build_docker_image() {
    local tag="${1:-latest}"
    
    log_info "Building Docker image: ${APP_NAME}:${tag}"
    
    docker build \
        --build-arg VERSION="${VERSION}" \
        --build-arg BUILD_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
        --build-arg VCS_REF="$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')" \
        -t "${APP_NAME}:${tag}" \
        -t "${APP_NAME}:${VERSION}" \
        .
    
    log_success "Docker image built: ${APP_NAME}:${tag}"
}

deploy_docker_local() {
    log_info "Deploying locally with Docker..."
    
    # Stop existing container
    docker stop "${APP_NAME}" 2>/dev/null || true
    docker rm "${APP_NAME}" 2>/dev/null || true
    
    # Run new container
    docker run -d \
        --name "${APP_NAME}" \
        --restart unless-stopped \
        -p 80:3000 \
        -v "${APP_NAME}_data:/app/data" \
        -e NODE_ENV=production \
        -e TZ=UTC \
        --memory=512m \
        --cpus=1 \
        "${APP_NAME}:latest"
    
    log_success "Deployed locally at http://localhost"
}

deploy_docker_compose() {
    log_info "Deploying with Docker Compose..."
    
    docker compose down --remove-orphans 2>/dev/null || true
    docker compose up -d --build
    
    log_success "Deployed with Docker Compose"
}

deploy_aws_ecs() {
    log_info "Deploying to AWS ECS..."
    
    # Check AWS CLI
    if ! command -v aws &>/dev/null; then
        log_error "AWS CLI not installed. Install from https://aws.amazon.com/cli/"
        exit 1
    fi
    
    # Login to ECR
    local account_id=$(aws sts get-caller-identity --query Account --output text)
    local ecr_url="${account_id}.dkr.ecr.${REGION}.amazonaws.com"
    
    aws ecr get-login-password --region "${REGION}" | \
        docker login --username AWS --password-stdin "${ecr_url}"
    
    # Create repository if not exists
    aws ecr describe-repositories --repository-names "${APP_NAME}" --region "${REGION}" 2>/dev/null || \
        aws ecr create-repository --repository-name "${APP_NAME}" --region "${REGION}"
    
    # Tag and push image
    docker tag "${APP_NAME}:latest" "${ecr_url}/${APP_NAME}:latest"
    docker tag "${APP_NAME}:latest" "${ecr_url}/${APP_NAME}:${VERSION}"
    docker push "${ecr_url}/${APP_NAME}:latest"
    docker push "${ecr_url}/${APP_NAME}:${VERSION}"
    
    # Update ECS service
    aws ecs update-service \
        --cluster "${APP_NAME}-cluster" \
        --service "${APP_NAME}-service" \
        --force-new-deployment \
        --region "${REGION}"
    
    log_success "Deployed to AWS ECS"
}

deploy_gcp_cloudrun() {
    log_info "Deploying to Google Cloud Run..."
    
    # Check gcloud CLI
    if ! command -v gcloud &>/dev/null; then
        log_error "Google Cloud CLI not installed"
        exit 1
    fi
    
    local project_id=$(gcloud config get-value project)
    local gcr_url="gcr.io/${project_id}/${APP_NAME}"
    
    # Build and push to GCR
    gcloud builds submit --tag "${gcr_url}:latest" .
    
    # Deploy to Cloud Run
    gcloud run deploy "${APP_NAME}" \
        --image "${gcr_url}:latest" \
        --platform managed \
        --region "${REGION}" \
        --allow-unauthenticated \
        --memory 512Mi \
        --cpu 1 \
        --min-instances 0 \
        --max-instances 10 \
        --port 3000
    
    log_success "Deployed to Google Cloud Run"
}

deploy_azure_container() {
    log_info "Deploying to Azure Container Apps..."
    
    # Check Azure CLI
    if ! command -v az &>/dev/null; then
        log_error "Azure CLI not installed"
        exit 1
    fi
    
    local resource_group="${APP_NAME}-rg"
    local acr_name="${APP_NAME}acr"
    
    # Create ACR if not exists
    az acr show --name "${acr_name}" &>/dev/null || \
        az acr create --resource-group "${resource_group}" --name "${acr_name}" --sku Basic
    
    # Build and push
    az acr build --registry "${acr_name}" --image "${APP_NAME}:latest" .
    
    # Deploy to Container Apps
    az containerapp update \
        --name "${APP_NAME}" \
        --resource-group "${resource_group}" \
        --image "${acr_name}.azurecr.io/${APP_NAME}:latest"
    
    log_success "Deployed to Azure Container Apps"
}

deploy_vercel() {
    log_info "Deploying to Vercel..."
    
    if ! command -v vercel &>/dev/null; then
        log_warn "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy
    vercel --prod --yes
    
    log_success "Deployed to Vercel"
}

deploy_netlify() {
    log_info "Deploying to Netlify..."
    
    if ! command -v netlify &>/dev/null; then
        log_warn "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # Build first
    npm run build
    
    # Deploy
    netlify deploy --prod --dir=dist
    
    log_success "Deployed to Netlify"
}

deploy_railway() {
    log_info "Deploying to Railway..."
    
    if ! command -v railway &>/dev/null; then
        log_warn "Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    railway up --detach
    
    log_success "Deployed to Railway"
}

show_status() {
    echo ""
    log_info "Deployment Status"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if docker ps --format '{{.Names}}' | grep -q "^${APP_NAME}$"; then
        echo -e "Docker:     ${GREEN}● Running${NC}"
        docker ps --filter "name=${APP_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    else
        echo -e "Docker:     ${YELLOW}○ Not running${NC}"
    fi
    
    echo ""
    echo "Health Check:"
    curl -s http://localhost/health 2>/dev/null || echo "  Not available"
    echo ""
}

show_help() {
    echo "ETHINX Cloud Deployment Script"
    echo ""
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  build           Build the application"
    echo "  docker          Build Docker image"
    echo "  local           Deploy locally with Docker"
    echo "  compose         Deploy with Docker Compose"
    echo "  aws             Deploy to AWS ECS"
    echo "  gcp             Deploy to Google Cloud Run"
    echo "  azure           Deploy to Azure Container Apps"
    echo "  vercel          Deploy to Vercel"
    echo "  netlify         Deploy to Netlify"
    echo "  railway         Deploy to Railway"
    echo "  status          Show deployment status"
    echo "  all             Build and deploy locally"
    echo ""
    echo "Options:"
    echo "  --env=ENV       Environment (production/staging/dev)"
    echo "  --region=REG    Cloud region"
    echo "  --version=VER   Version tag"
    echo ""
    echo "Examples:"
    echo "  $0 local                    # Deploy locally"
    echo "  $0 aws --region=us-west-2   # Deploy to AWS"
    echo "  $0 vercel                   # Deploy to Vercel"
    echo ""
}

# Parse arguments
parse_args() {
    for arg in "$@"; do
        case $arg in
            --env=*)
                ENVIRONMENT="${arg#*=}"
                ;;
            --region=*)
                REGION="${arg#*=}"
                ;;
            --version=*)
                VERSION="${arg#*=}"
                ;;
        esac
    done
}

# Main
main() {
    print_banner
    parse_args "$@"
    
    local command="${1:-help}"
    
    case $command in
        build)
            check_prerequisites
            build_application
            ;;
        docker)
            check_prerequisites
            build_docker_image
            ;;
        local)
            check_prerequisites
            build_application
            build_docker_image
            deploy_docker_local
            show_status
            ;;
        compose)
            check_prerequisites
            deploy_docker_compose
            show_status
            ;;
        aws)
            check_prerequisites
            build_docker_image
            deploy_aws_ecs
            ;;
        gcp)
            check_prerequisites
            deploy_gcp_cloudrun
            ;;
        azure)
            check_prerequisites
            build_docker_image
            deploy_azure_container
            ;;
        vercel)
            check_prerequisites
            deploy_vercel
            ;;
        netlify)
            check_prerequisites
            deploy_netlify
            ;;
        railway)
            check_prerequisites
            deploy_railway
            ;;
        status)
            show_status
            ;;
        all)
            check_prerequisites
            build_application
            build_docker_image
            deploy_docker_local
            show_status
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            log_error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
