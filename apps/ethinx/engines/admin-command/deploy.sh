#!/bin/bash

# ETHINX Zero-Touch Deployment Script
# Usage: ./deploy.sh [command]
# Commands: build, start, stop, restart, logs, status, clean

set -e

APP_NAME="ethinx"
IMAGE_NAME="ethinx/core:latest"
CONTAINER_NAME="ethinx"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[ETHINX]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Build the Docker image
build() {
    print_status "Building Docker image..."
    docker build -t $IMAGE_NAME .
    print_success "Image built successfully: $IMAGE_NAME"
}

# Start the container
start() {
    print_status "Starting ETHINX container..."
    
    # Check if container already exists
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        print_warning "Container exists. Removing..."
        docker rm -f $CONTAINER_NAME
    fi
    
    # Run the container
    docker run -d \
        --name $CONTAINER_NAME \
        -p 80:3000 \
        -v ethinx_data:/app/data \
        --restart always \
        --security-opt no-new-privileges:true \
        --read-only \
        --tmpfs /var/run:size=10M \
        --tmpfs /var/cache/nginx:size=50M \
        --memory=512m \
        --cpus=1 \
        $IMAGE_NAME
    
    print_success "Container started on port 80"
    print_status "Access the dashboard at: http://localhost"
}

# Stop the container
stop() {
    print_status "Stopping ETHINX container..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    print_success "Container stopped"
}

# Restart the container
restart() {
    stop
    start
}

# Show logs
logs() {
    print_status "Showing logs (Ctrl+C to exit)..."
    docker logs -f $CONTAINER_NAME
}

# Show status
status() {
    print_status "Container Status:"
    echo ""
    
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        print_success "Container is running"
        echo ""
        docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        
        # Health check
        print_status "Health Check:"
        curl -s http://localhost/health 2>/dev/null || print_warning "Health endpoint not responding"
        echo ""
    else
        print_warning "Container is not running"
    fi
}

# Clean up everything
clean() {
    print_warning "This will remove the container, image, and volumes. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Cleaning up..."
        docker stop $CONTAINER_NAME 2>/dev/null || true
        docker rm $CONTAINER_NAME 2>/dev/null || true
        docker rmi $IMAGE_NAME 2>/dev/null || true
        docker volume rm ethinx_data 2>/dev/null || true
        print_success "Cleanup complete"
    else
        print_status "Cleanup cancelled"
    fi
}

# Quick deploy (build + start)
deploy() {
    build
    start
    echo ""
    print_success "ETHINX deployed successfully!"
    echo ""
    echo "  Dashboard: http://localhost"
    echo "  Health:    http://localhost/health"
    echo ""
}

# Show help
help() {
    echo ""
    echo "ETHINX Deployment Script"
    echo ""
    echo "Usage: ./deploy.sh [command]"
    echo ""
    echo "Commands:"
    echo "  deploy   Build and start the application (default)"
    echo "  build    Build the Docker image"
    echo "  start    Start the container"
    echo "  stop     Stop the container"
    echo "  restart  Restart the container"
    echo "  logs     Show container logs"
    echo "  status   Show container status"
    echo "  clean    Remove container, image, and volumes"
    echo "  help     Show this help message"
    echo ""
}

# Main entry point
case "${1:-deploy}" in
    build)   build ;;
    start)   start ;;
    stop)    stop ;;
    restart) restart ;;
    logs)    logs ;;
    status)  status ;;
    clean)   clean ;;
    deploy)  deploy ;;
    help)    help ;;
    *)
        print_error "Unknown command: $1"
        help
        exit 1
        ;;
esac
