#!/usr/bin/env bash
set -euo pipefail

TF_DIR="${TF_DIR:-infra/website}"

if [ -z "${GOOGLE_OAUTH_ACCESS_TOKEN:-}" ] && command -v gcloud >/dev/null 2>&1; then
  export GOOGLE_OAUTH_ACCESS_TOKEN
  GOOGLE_OAUTH_ACCESS_TOKEN="$(gcloud auth print-access-token)"
fi

error_file="$(mktemp)"
trap 'rm -f "${error_file}"' EXIT

if terraform -chdir="${TF_DIR}" output domain_dns_records 2>"${error_file}"; then
  exit 0
fi

if grep -q 'Output "domain_dns_records" not found' "${error_file}"; then
  cat >&2 <<'EOF'
Cloud Run DNS records are not available yet.

The domain mappings have not completed because Google has not verified ownership
of t3ratech.co.za for this account/project.

First add the Google Search Console TXT verification record at webdev.co.zw:

  gcloud domains verify t3ratech.co.za

After Google verifies the domain, recreate the Cloud Run mappings and update
Terraform state:

  PROJECT_ID=t3ratech-solutions \
  REGION=europe-west1 \
  REPLACE_DOMAIN_MAPPINGS=1 \
  bash scripts/deploy-website-terraform.sh

Then rerun:

  bash scripts/terraform-dns-records.sh
EOF
  exit 1
fi

cat "${error_file}" >&2
exit 1
