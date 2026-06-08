variable "project_id" {
  description = "Google Cloud project ID."
  type        = string
  default     = "t3ratech-solutions"
}

variable "region" {
  description = "Cloud Run and Artifact Registry region. Cloud Run direct domain mapping requires a supported region."
  type        = string
  default     = "europe-west1"
}

variable "service_name" {
  description = "Cloud Run service name."
  type        = string
  default     = "t3ratech-website"
}

variable "repository_id" {
  description = "Artifact Registry Docker repository ID."
  type        = string
  default     = "t3ratech-apps"
}

variable "image" {
  description = "Container image to deploy. The deploy script builds and passes this value."
  type        = string
  default     = ""
}

variable "image_tag" {
  description = "Fallback image tag used only when var.image is empty."
  type        = string
  default     = "latest"
}

variable "domains" {
  description = "Verified custom domains to map to the Cloud Run service."
  type        = list(string)
  default     = ["t3ratech.co.za", "www.t3ratech.co.za"]
}

variable "container_port" {
  description = "Container port exposed by the website image."
  type        = number
  default     = 8080
}

variable "cpu" {
  description = "Cloud Run CPU limit."
  type        = string
  default     = "1"
}

variable "memory" {
  description = "Cloud Run memory limit."
  type        = string
  default     = "512Mi"
}

variable "min_instances" {
  description = "Minimum Cloud Run instances."
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum Cloud Run instances."
  type        = number
  default     = 2
}

variable "deletion_protection" {
  description = "Protect the Cloud Run service from terraform destroy."
  type        = bool
  default     = false
}

variable "labels" {
  description = "Common labels."
  type        = map(string)
  default = {
    app     = "t3ratech-website"
    owner   = "t3ratech"
    managed = "terraform"
  }
}
