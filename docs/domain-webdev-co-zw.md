# Point `t3ratech.co.zw` to the Cloud Run Website

## Chosen Path

Use Cloud Run domain mapping in `europe-west1`.

Why:

- It is the cheapest direct custom-domain path for Cloud Run.
- Cloud Run automatically issues and renews a Google-managed HTTPS certificate.
- `africa-south1` is not supported for direct Cloud Run domain mapping, so the website service runs in `europe-west1`.

## Deploy Cloud Run

Prerequisites:

- Billing is linked to project `t3ratech-solutions`.
- `t3ratech.co.zw` must be verified for the active Google account or a service account owner in Google Search Console.
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
- Creates Cloud Run domain mappings for `t3ratech.co.zw` and `www.t3ratech.co.zw`.
- Outputs the DNS records to add at webdev.co.zw.

## DNS at webdev.co.zw

Log in to the webdev.co.zw client area and open DNS management for `t3ratech.co.zw`.

First add the Google Search Console verification record. Generate it with:

```bash
gcloud domains verify t3ratech.co.zw
```

Google Search Console will show a TXT value like:

```text
google-site-verification=...
```

At webdev.co.zw, add it as:

| Type | Host/Name | Value |
|---|---|---|
| `TXT` | `@` | `google-site-verification=...` |

Keep this TXT record after verification. It proves ownership of
`t3ratech.co.zw` and should cover `www`, `connekt`, `bantora`, and `t3rnel`.

You can also prepare the Cloud Run routing records in the same DNS zone:

| Type | Host/Name | Value |
|---|---|---|
| `A` | `@` | `216.239.32.21` |
| `A` | `@` | `216.239.34.21` |
| `A` | `@` | `216.239.36.21` |
| `A` | `@` | `216.239.38.21` |
| `AAAA` | `@` | `2001:4860:4802:32::15` |
| `AAAA` | `@` | `2001:4860:4802:34::15` |
| `AAAA` | `@` | `2001:4860:4802:36::15` |
| `AAAA` | `@` | `2001:4860:4802:38::15` |
| `CNAME` | `www` | `ghs.googlehosted.com` |
| `CNAME` | `connekt` | `ghs.googlehosted.com` |
| `CNAME` | `bantora` | `ghs.googlehosted.com` |
| `CNAME` | `t3rnel` | `ghs.googlehosted.com` |

The current DNS export/configured CSV is:

```csv
type,name,content,ttl,priority,proxied
A,@,216.239.38.21,1,,0
A,@,216.239.36.21,1,,0
A,@,216.239.34.21,1,,0
A,@,216.239.32.21,1,,0
AAAA,@,2001:4860:4802:38::15,1,,0
AAAA,@,2001:4860:4802:36::15,1,,0
AAAA,@,2001:4860:4802:34::15,1,,0
AAAA,@,2001:4860:4802:32::15,1,,0
CNAME,bantora,ghs.googlehosted.com,1,,0
CNAME,connekt,ghs.googlehosted.com,1,,0
CNAME,t3rnel,ghs.googlehosted.com,1,,0
TXT,@,google-site-verification=EzHdaax-c0iR8F9sFQeWKZn6woIn0h4hhF0R8Zt6Pxo,300,,0
```

This CSV does not include `www`. Add this record too if `www.t3ratech.co.zw`
should serve the website:

```csv
CNAME,www,ghs.googlehosted.com,1,,0
```

If the DNS is managed in Cloudflare, keep these records unproxied / DNS-only
(`proxied=0`). The Cloudflare proxy can produce 525 errors while Cloud Run's
Google-managed certificate is not provisioned.

Only the apex and `www` mappings are managed by the current website Terraform
stack. The product subdomains can exist in DNS now, but they will not serve the
right product until each product has its own Cloud Run domain mapping.

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

- Use `@` for the apex domain `t3ratech.co.zw`.
- Use `www` for `www.t3ratech.co.zw`.
- Add every returned `A`, `AAAA`, or `CNAME` record.
- Do not guess the values; use the Terraform output.

## Product Subdomains

Reserve these hostnames for the launch products:

| Hostname | Target Cloud Run service | DNS host/name at webdev.co.zw |
|---|---|---|
| `connekt.t3ratech.co.zw` | Future Connekt public app/service | `connekt` |
| `bantora.t3ratech.co.zw` | Future Bantora public web app | `bantora` |
| `t3rnel.t3ratech.co.zw` | Future T3rnel public app/service | `t3rnel` |

Do not add these three product subdomains to the website Terraform stack unless
you intentionally want them to show the static T3raTech website as temporary
placeholders. The cleaner production setup is one Cloud Run domain mapping per
public product service.

After each product service has its own Cloud Run domain mapping, webdev.co.zw
will usually need a CNAME record like this:

| Type | Host/Name | Value |
|---|---|---|
| `CNAME` | `connekt` | Use the value returned by that product's Terraform output, commonly `ghs.googlehosted.com` |
| `CNAME` | `bantora` | Use the value returned by that product's Terraform output, commonly `ghs.googlehosted.com` |
| `CNAME` | `t3rnel` | Use the value returned by that product's Terraform output, commonly `ghs.googlehosted.com` |

Verifying the apex domain `t3ratech.co.zw` in Google Search Console should cover
these subdomains too, so you should not need separate TXT verification records
for `connekt`, `bantora`, or `t3rnel`.

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
gcloud domains verify t3ratech.co.zw
```

After verification, rerun `scripts/deploy-website-terraform.sh`.

If the previous failed domain mappings remain in Terraform state, force replacement once:

```bash
PROJECT_ID=t3ratech-solutions \
REGION=europe-west1 \
REPLACE_DOMAIN_MAPPINGS=1 \
bash scripts/deploy-website-terraform.sh
```
