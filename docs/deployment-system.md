# T3raTech Website Deployment System

The website is deployed with Terraform-managed Google Cloud resources and a small Docker image build script.

## Current Architecture

| Layer | Resource |
|---|---|
| Project | `t3ratech-solutions` |
| Region | `europe-west1` |
| Image registry | Artifact Registry repo `t3ratech-apps` |
| Terraform state | GCS bucket `t3ratech-solutions-tfstate`, prefix `t3ratech-website/website` |
| Runtime | Cloud Run service `t3ratech-website` |
| Public access | `allUsers` -> `roles/run.invoker` on the website service |
| Domain | Cloud Run domain mappings for `t3ratech.co.za` and `www.t3ratech.co.za` |
| TLS | Cloud Run Google-managed certificate, automatic renewal |

Product subdomains are reserved but should be mapped by each product's own
Terraform stack when those Cloud Run services are deployed:

| Hostname | Intended service |
|---|---|
| `connekt.t3ratech.co.za` | Connekt public app/service |
| `bantora.t3ratech.co.za` | Bantora public web app |
| `t3rnel.t3ratech.co.za` | T3rnel public app/service |

The live Cloud Run URL is:

```text
https://t3ratech-website-v5sxyzggra-ew.a.run.app
```

## Access State

`tsungai.kaviya@gmail.com` has:

- `roles/owner`
- `roles/billing.projectManager`

`t3ratech.dev@gmail.com` has the deployment/admin roles needed to operate the stack:

- `roles/billing.projectManager`
- `roles/editor`
- `roles/resourcemanager.projectIamAdmin`
- `roles/serviceusage.serviceUsageAdmin`
- `roles/artifactregistry.admin`
- `roles/run.admin`
- `roles/iam.serviceAccountAdmin`
- `roles/iam.serviceAccountUser`

Billing is linked to:

```text
billingAccounts/0195A1-FEEB79-FF29FC
```

## Files

| Path | Purpose |
|---|---|
| `infra/website/*.tf` | Terraform resources for APIs, registry, Cloud Run, IAM, and domain mappings |
| `scripts/deploy-website-terraform.sh` | Builds/pushes the image and applies Terraform |
| `scripts/terraform-dns-records.sh` | Prints domain mapping DNS records from Terraform outputs |
| `docs/domain-webdev-co-zw.md` | DNS instructions for webdev.co.zw |

## Normal Deploy

```bash
PROJECT_ID=t3ratech-solutions \
REGION=europe-west1 \
bash scripts/deploy-website-terraform.sh
```

The image tag defaults to the current Git commit SHA.

## Domain Verification

The Cloud Run service is live, but the custom domain mappings are currently blocked until Google domain ownership verification is completed for `t3ratech.co.za`.

Verify the apex domain once:

```bash
gcloud domains verify t3ratech.co.za
```

Complete the Search Console verification flow, preferably with a DNS TXT record at webdev.co.zw.

After verification, rerun:

```bash
PROJECT_ID=t3ratech-solutions \
REGION=europe-west1 \
REPLACE_DOMAIN_MAPPINGS=1 \
bash scripts/deploy-website-terraform.sh
```

Then print DNS records:

```bash
bash scripts/terraform-dns-records.sh
```

Add the returned records in webdev.co.zw. Cloud Run will issue and renew the Google-managed certificate automatically after DNS resolves.
