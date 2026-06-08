locals {
  required_apis = toset([
    "artifactregistry.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "iam.googleapis.com",
    "run.googleapis.com",
    "serviceusage.googleapis.com",
  ])

  image = var.image != "" ? var.image : "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}/${var.service_name}:${var.image_tag}"
}

resource "google_project_service" "required" {
  for_each = local.required_apis

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "website" {
  project       = var.project_id
  location      = var.region
  repository_id = var.repository_id
  description   = "Docker images for T3raTech website services"
  format        = "DOCKER"
  labels        = var.labels

  depends_on = [
    google_project_service.required["artifactregistry.googleapis.com"],
  ]
}

resource "google_service_account" "website" {
  project      = var.project_id
  account_id   = var.service_name
  display_name = "T3raTech Website Cloud Run"
  description  = "Runtime identity for the T3raTech website Cloud Run service."

  depends_on = [
    google_project_service.required["iam.googleapis.com"],
  ]
}

resource "google_cloud_run_v2_service" "website" {
  project             = var.project_id
  name                = var.service_name
  location            = var.region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = var.deletion_protection
  labels              = var.labels

  template {
    service_account = google_service_account.website.email

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    containers {
      image = local.image

      ports {
        container_port = var.container_port
      }

      resources {
        limits = {
          cpu    = var.cpu
          memory = var.memory
        }
        cpu_idle          = true
        startup_cpu_boost = true
      }
    }
  }

  depends_on = [
    google_project_service.required["run.googleapis.com"],
    google_artifact_registry_repository.website,
  ]
}

resource "google_cloud_run_v2_service_iam_member" "public_invoker" {
  project  = var.project_id
  location = google_cloud_run_v2_service.website.location
  name     = google_cloud_run_v2_service.website.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_domain_mapping" "website" {
  for_each = toset(var.domains)

  project  = var.project_id
  name     = each.value
  location = google_cloud_run_v2_service.website.location

  metadata {
    namespace = var.project_id
    labels    = var.labels
  }

  spec {
    route_name = google_cloud_run_v2_service.website.name
  }

  depends_on = [
    google_cloud_run_v2_service_iam_member.public_invoker,
  ]
}
