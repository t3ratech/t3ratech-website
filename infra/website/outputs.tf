output "artifact_registry_repository" {
  description = "Artifact Registry repository."
  value       = "${google_artifact_registry_repository.website.location}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.website.repository_id}"
}

output "deployed_image" {
  description = "Container image configured on Cloud Run."
  value       = local.image
}

output "cloud_run_service_name" {
  description = "Cloud Run service name."
  value       = google_cloud_run_v2_service.website.name
}

output "cloud_run_service_uri" {
  description = "Default run.app URI."
  value       = google_cloud_run_v2_service.website.uri
}

output "domain_mapping_status" {
  description = "Raw Cloud Run domain mapping status. Use resource_records for DNS at webdev.co.zw."
  value = {
    for domain, mapping in google_cloud_run_domain_mapping.website :
    domain => mapping.status
  }
}

output "domain_dns_records" {
  description = "DNS records returned by Cloud Run domain mappings."
  value = {
    for domain, mapping in google_cloud_run_domain_mapping.website :
    domain => try(mapping.status[0].resource_records, [])
  }
}
