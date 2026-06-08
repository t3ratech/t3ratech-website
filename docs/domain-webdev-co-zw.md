# Point `t3ratech.co.za` to the Cloud Run Website

## Chosen Path

Use Cloud Run domain mapping in `europe-west1`.

Why:

- It is the cheapest direct custom-domain path for Cloud Run.
- Cloud Run automatically issues and renews a Google-managed HTTPS certificate.
- `africa-south1` is not supported for direct Cloud Run domain mapping, so the website service runs in `europe-west1`.

## Deploy Cloud Run

Prerequisites:

- Billing is linked to project `t3ratech-solutions`.
- `t3ratech.co.za` must be verified for the active Google account or a service account owner in Google Search Console.
- Docker must be running locally.
- Terraform and `gcloud` must be authenticated.

Run this from the repo root after GCP auth is configured:

```bash
PROJECT_ID=t3ratech-solutions \
REGION=europe-west1 \
bash scripts/deploy-website-terraform.sh
```

The script:

- Enables the required GCP APIs.
- Creates Artifact Registry.
- Builds and pushes the website Docker image.
- Creates/updates the public Cloud Run service.
- Creates Cloud Run domain mappings for `t3ratech.co.za` and `www.t3ratech.co.za`.
- Outputs the DNS records to add at webdev.co.zw.

## DNS at webdev.co.zw

Log in to the webdev.co.zw client area and open DNS management for `t3ratech.co.za`.

First add the Google Search Console verification record. Generate it with:

```bash
gcloud domains verify t3ratech.co.za
```

Google Search Console will show a TXT value like:

```text
google-site-verification=...
```

At webdev.co.zw, add it as:

| Type | Host/Name | Value |
|---|---|---|
| `TXT` | `@` | `google-site-verification=...` |

After Google verifies ownership, rerun the deploy with domain replacement:

```bash
PROJECT_ID=t3ratech-solutions \
REGION=europe-west1 \
REPLACE_DOMAIN_MAPPINGS=1 \
bash scripts/deploy-website-terraform.sh
```

Then add the final Cloud Run routing records from Terraform:

```bash
bash scripts/terraform-dns-records.sh
```

Terraform prints the `resource_records` returned by Cloud Run domain mapping. At webdev.co.zw:

- Use `@` for the apex domain `t3ratech.co.za`.
- Use `www` for `www.t3ratech.co.za`.
- Add every returned `A`, `AAAA`, or `CNAME` record.
- Do not guess the values; use the Terraform output.

## SSL and Auto Renewal

Cloud Run provisions the Google-managed certificate after DNS is correct. It usually takes about 15 minutes but can take up to 24 hours.

If webdev.co.zw has existing CAA records, make sure they allow Google-managed certificates:

```text
0 issue "pki.goog"
```

If there are no CAA records, you usually do not need to add any.

## Domain Verification

The domain must be verified in Google Search Console / Google Cloud before Terraform can create the mapping.

```bash
gcloud domains verify t3ratech.co.za
```

After verification, rerun `scripts/deploy-website-terraform.sh`.

If the previous failed domain mappings remain in Terraform state, force replacement once:

```bash
PROJECT_ID=t3ratech-solutions \
REGION=europe-west1 \
REPLACE_DOMAIN_MAPPINGS=1 \
bash scripts/deploy-website-terraform.sh
```
