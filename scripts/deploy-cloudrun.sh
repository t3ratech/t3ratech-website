#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "scripts/deploy-cloudrun.sh is now a Terraform wrapper."
echo "Use scripts/deploy-website-terraform.sh directly for the IaC flow."

exec "${SCRIPT_DIR}/deploy-website-terraform.sh" "$@"
