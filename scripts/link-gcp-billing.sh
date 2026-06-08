#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-t3ratech-solutions}"
BILLING_ACCOUNT_ID="${BILLING_ACCOUNT_ID:-}"

if ! command -v gcloud >/dev/null 2>&1; then
  echo "gcloud is required." >&2
  exit 1
fi

gcloud config set project "${PROJECT_ID}" >/dev/null

if [ -z "${BILLING_ACCOUNT_ID}" ]; then
  echo "Set BILLING_ACCOUNT_ID to link billing. Available accounts:"
  gcloud billing accounts list
  exit 1
fi

gcloud billing projects link "${PROJECT_ID}" \
  --billing-account "${BILLING_ACCOUNT_ID}"

gcloud billing projects describe "${PROJECT_ID}"
