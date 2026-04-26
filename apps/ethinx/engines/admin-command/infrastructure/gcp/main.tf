# ============================================================
# ETHINX Google Cloud Deployment
# Cloud Run + Cloud SQL Configuration
# ============================================================

# Service Account
resource "google_service_account" "ethinx" {
  account_id   = "ethinx-service"
  display_name = "ETHINX Service Account"
  description  = "Service account for ETHINX application"
}

# Artifact Registry Repository
resource "google_artifact_registry_repository" "ethinx" {
  location      = var.region
  repository_id = "ethinx"
  description   = "ETHINX container images"
  format        = "DOCKER"
  
  docker_config {
    immutable_tags = false
  }
}

# Cloud Run Service
resource "google_cloud_run_v2_service" "ethinx" {
  name     = "ethinx"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"
  
  template {
    service_account = google_service_account.ethinx.email
    
    scaling {
      min_instance_count = 0
      max_instance_count = 10
    }
    
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/ethinx/core:latest"
      
      ports {
        container_port = 3000
      }
      
      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
        cpu_idle          = true
        startup_cpu_boost = true
      }
      
      env {
        name  = "NODE_ENV"
        value = "production"
      }
      
      startup_probe {
        http_get {
          path = "/health"
          port = 3000
        }
        initial_delay_seconds = 0
        timeout_seconds       = 3
        period_seconds        = 10
        failure_threshold     = 3
      }
      
      liveness_probe {
        http_get {
          path = "/health"
          port = 3000
        }
        initial_delay_seconds = 10
        timeout_seconds       = 3
        period_seconds        = 30
        failure_threshold     = 3
      }
    }
  }
  
  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

# Allow public access
resource "google_cloud_run_v2_service_iam_member" "public" {
  location = google_cloud_run_v2_service.ethinx.location
  name     = google_cloud_run_v2_service.ethinx.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Cloud Armor Security Policy (optional)
resource "google_compute_security_policy" "ethinx" {
  name        = "ethinx-security-policy"
  description = "Security policy for ETHINX"
  
  # Rate limiting rule
  rule {
    action   = "rate_based_ban"
    priority = 1000
    
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    
    rate_limit_options {
      conform_action = "allow"
      exceed_action  = "deny(429)"
      
      rate_limit_threshold {
        count        = 100
        interval_sec = 60
      }
      
      ban_duration_sec = 300
    }
  }
  
  # Default allow rule
  rule {
    action   = "allow"
    priority = 2147483647
    
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
  }
}

# Variables
variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "us-central1"
}

# Outputs
output "service_url" {
  description = "Cloud Run service URL"
  value       = google_cloud_run_v2_service.ethinx.uri
}

output "service_name" {
  description = "Cloud Run service name"
  value       = google_cloud_run_v2_service.ethinx.name
}
