#!/usr/bin/env bash
set -euo pipefail

TF_DIR="${TF_DIR:-infra/website}"

if [ -z "${GOOGLE_OAUTH_ACCESS_TOKEN:-}" ] && command -v gcloud >/dev/null 2>&1; then
  export GOOGLE_OAUTH_ACCESS_TOKEN
  GOOGLE_OAUTH_ACCESS_TOKEN="$(gcloud auth print-access-token)"
fi

terraform -chdir="${TF_DIR}" output domain_dns_records
