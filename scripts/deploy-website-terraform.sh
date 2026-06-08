#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-t3ratech-solutions}"
REGION="${REGION:-europe-west1}"
SERVICE_NAME="${SERVICE_NAME:-t3ratech-website}"
REPOSITORY_ID="${REPOSITORY_ID:-t3ratech-apps}"
DOMAINS_JSON="${DOMAINS_JSON:-[\"t3ratech.co.za\",\"www.t3ratech.co.za\"]}"
TF_DIR="${TF_DIR:-infra/website}"

if ! command -v terraform >/dev/null 2>&1; then
  echo "terraform is required." >&2
  exit 1
fi

if ! command -v gcloud >/dev/null 2>&1; then
  echo "gcloud is required for Docker auth and first-project API bootstrap." >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required to build and push the website image." >&2
  exit 1
fi

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  IMAGE_TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD)}"
else
  IMAGE_TAG="${IMAGE_TAG:-$(date +%Y%m%d%H%M%S)}"
fi

IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY_ID}/${SERVICE_NAME}:${IMAGE_TAG}"

export TF_VAR_project_id="${PROJECT_ID}"
export TF_VAR_region="${REGION}"
export TF_VAR_service_name="${SERVICE_NAME}"
export TF_VAR_repository_id="${REPOSITORY_ID}"
export TF_VAR_domains="${DOMAINS_JSON}"
export TF_VAR_image="${IMAGE}"

gcloud config set project "${PROJECT_ID}" >/dev/null
export GOOGLE_OAUTH_ACCESS_TOKEN
GOOGLE_OAUTH_ACCESS_TOKEN="$(gcloud auth print-access-token)"

# Terraform can manage the rest, but these APIs must exist before Terraform can reliably
# enable project services in a fresh project.
gcloud services enable \
  cloudresourcemanager.googleapis.com \
  serviceusage.googleapis.com \
  --project "${PROJECT_ID}" \
  --quiet

terraform -chdir="${TF_DIR}" init

terraform -chdir="${TF_DIR}" apply \
  -target=google_project_service.required \
  -target=google_artifact_registry_repository.website \
  -auto-approve

gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet

docker build --platform linux/amd64 -t "${IMAGE}" .
docker push "${IMAGE}"

replace_args=()
if [ "${REPLACE_DOMAIN_MAPPINGS:-0}" = "1" ]; then
  replace_args+=('-replace=google_cloud_run_domain_mapping.website["t3ratech.co.za"]')
  replace_args+=('-replace=google_cloud_run_domain_mapping.website["www.t3ratech.co.za"]')
fi

terraform -chdir="${TF_DIR}" apply "${replace_args[@]}" -auto-approve

terraform -chdir="${TF_DIR}" output cloud_run_service_uri
terraform -chdir="${TF_DIR}" output domain_dns_records
