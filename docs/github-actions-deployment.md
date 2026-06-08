# GitHub Actions Website Deployment

The repository deploys the website through `.github/workflows/deploy-website.yml`.

## Chosen Pipeline

Use the existing Terraform stack:

1. Build the static site with `npm run build`.
2. Authenticate to Google Cloud with Workload Identity Federation.
3. Build the Docker image.
4. Push the image to Artifact Registry.
5. Apply `infra/website` with the new image tag.

This keeps Cloud Run, Artifact Registry, IAM, Terraform state, and domain mappings in one infrastructure path.

## Required Repository Variables

Set these in GitHub repository settings:

| Variable | Example |
|---|---|
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID` |
| `GCP_SERVICE_ACCOUNT` | `github-actions-website@t3ratech-solutions.iam.gserviceaccount.com` |

Optional overrides:

| Variable | Default |
|---|---|
| `GCP_PROJECT_ID` | `t3ratech-solutions` |
| `GCP_REGION` | `europe-west1` |
| `WEBSITE_SERVICE_NAME` | `t3ratech-website` |
| `ARTIFACT_REPOSITORY_ID` | `t3ratech-apps` |
| `WEBSITE_DOMAINS_JSON` | `["t3ratech.co.zw","www.t3ratech.co.zw"]` |

## Google Cloud IAM

The deploy service account needs enough access to run the existing Terraform stack and write the remote state:

- Workload Identity User binding for the GitHub OIDC principal.
- Storage object access on the Terraform state bucket.
- Service Usage Admin.
- Artifact Registry Admin.
- Cloud Run Admin.
- Service Account Admin.
- Service Account User.

If the service account should not enable APIs or manage IAM, run the Terraform bootstrap locally once, then reduce the pipeline service account to image push + Cloud Run deploy permissions.

## Manual Domain Mapping Replacement

Run the workflow manually and set `replace_domain_mappings` to `true` after domain verification changes or when Cloud Run domain mappings need to be recreated.

## Other Viable GitHub Actions Options

| Option | Fit |
|---|---|
| Terraform deploy, current choice | Best when infrastructure and application revision should move together. |
| Terraform bootstrap + `gcloud run deploy` | Best when infra is stable and each commit should only publish a new revision. Requires Terraform to ignore image drift. |
| Terraform bootstrap + `google-github-actions/deploy-cloudrun` | Cleaner Cloud Run revision deploy step, but still needs separate image build/push and drift handling. |
| Static hosting pipeline | Simpler for a Vite site, but it would bypass the existing Cloud Run, Artifact Registry, and Terraform investment. |
