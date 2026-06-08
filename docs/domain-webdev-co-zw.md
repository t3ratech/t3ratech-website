# Point `t3ratech.co.za` to the Cloud Run Website

## Recommended Path

Use Cloud Run for the container and Firebase Hosting as the domain/TLS front door.

Why:

- Cloud Run domain mappings are preview and not recommended for production.
- Cloud Run direct domain mapping is not available in `africa-south1`.
- Firebase Hosting can sit in front of Cloud Run and automatically provisions and renews SSL certificates for custom domains.
- Firebase custom-domain troubleshooting explicitly expects CAA records to allow `letsencrypt.org` and `pki.goog`, which matches the free auto-renewing certificate goal.

This repo's `firebase.json` rewrites all Firebase Hosting traffic to the Cloud Run service:

```json
{
  "source": "**",
  "run": {
    "serviceId": "t3ratech-website",
    "region": "europe-west1"
  }
}
```

## Deploy Cloud Run

Run this from Google Cloud Shell or a machine with the Google Cloud CLI installed and logged in:

```bash
git clone https://github.com/t3ratech/t3ratech-website.git
cd t3ratech-website

PROJECT_ID=blaklizt-entertainment \
REGION=europe-west1 \
bash scripts/deploy-cloudrun.sh
```

The script deploys a public Cloud Run service named `t3ratech-website` with:

- `min-instances=0`
- `max-instances=3`
- `memory=512Mi`
- `cpu=1`
- source build using this repo's Dockerfile

## Connect Firebase Hosting to Cloud Run

Install/login if needed:

```bash
npm install -g firebase-tools
firebase login
firebase use --add blaklizt-entertainment
firebase deploy --only hosting --project blaklizt-entertainment
```

Then open Firebase Console:

```text
Firebase Console -> Project blaklizt-entertainment -> Hosting -> Add custom domain
```

Add both:

- `t3ratech.co.za`
- `www.t3ratech.co.za`

Firebase will give you exact DNS records. Use those exact records at webdev.co.zw.

## DNS at webdev.co.zw

Log in to the webdev.co.zw client area and open DNS management for `t3ratech.co.za`.

Add the verification record first:

| Type | Host/Name | Value |
|---|---|---|
| TXT | `@` or `t3ratech.co.za` | The unique Firebase verification value |

After Firebase verifies ownership, add the serving records shown by Firebase.

Typical shape:

| Domain | Type | Host/Name | Value |
|---|---|---|---|
| `t3ratech.co.za` | A | `@` | Firebase-provided IP address |
| `t3ratech.co.za` | A | `@` | Firebase-provided IP address |
| `www.t3ratech.co.za` | CNAME | `www` | Firebase-provided hostname |

Do not guess the IPs. Copy them from the Firebase wizard because Google can change the required records.

## SSL and Auto Renewal

Firebase provisions SSL after DNS is correct. It can take a few hours and up to 24 hours.

Keep the TXT verification record in DNS. Firebase uses domain verification and certificate automation to keep the domain connected and certificates renewed.

If webdev.co.zw has existing CAA records, make sure they allow:

```text
0 issue "letsencrypt.org"
0 issue "pki.goog"
```

If there are no CAA records, you usually do not need to add any.

## Alternative: Direct Cloud Run Domain Mapping

You can map the domain directly to Cloud Run only in supported regions such as `europe-west1` or `us-central1`.

```bash
gcloud domains verify t3ratech.co.za
gcloud beta run domain-mappings create \
  --service t3ratech-website \
  --domain t3ratech.co.za \
  --region europe-west1
gcloud beta run domain-mappings describe \
  --domain t3ratech.co.za \
  --region europe-west1
```

Then add the returned `resourceRecords` at webdev.co.zw.

This option uses Google-managed certificates that are automatically renewed, but Cloud Run domain mapping is preview and Google recommends the external Application Load Balancer for production.
