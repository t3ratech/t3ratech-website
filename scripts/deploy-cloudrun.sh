#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-blaklizt-entertainment}"
REGION="${REGION:-europe-west1}"
SERVICE_NAME="${SERVICE_NAME:-t3ratech-website}"
MAX_INSTANCES="${MAX_INSTANCES:-3}"
MEMORY="${MEMORY:-512Mi}"
CPU="${CPU:-1}"

if ! command -v gcloud >/dev/null 2>&1; then
  echo "gcloud is required. Install the Google Cloud CLI or run this from Cloud Shell." >&2
  exit 1
fi

gcloud config set project "${PROJECT_ID}"

gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com

gcloud run deploy "${SERVICE_NAME}" \
  --project "${PROJECT_ID}" \
  --region "${REGION}" \
  --source . \
  --allow-unauthenticated \
  --port 8080 \
  --memory "${MEMORY}" \
  --cpu "${CPU}" \
  --min-instances 0 \
  --max-instances "${MAX_INSTANCES}" \
  --execution-environment gen2

gcloud run services describe "${SERVICE_NAME}" \
  --project "${PROJECT_ID}" \
  --region "${REGION}" \
  --format='value(status.url)'
