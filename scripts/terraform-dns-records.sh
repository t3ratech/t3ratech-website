#!/usr/bin/env bash
set -euo pipefail

TF_DIR="${TF_DIR:-infra/website}"

terraform -chdir="${TF_DIR}" output domain_dns_records
