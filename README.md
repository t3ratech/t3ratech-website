# T3raTech Website

Static launch website for T3raTech Solutions, focused only on the first three product launches:

- Bantora
- Connekt
- T3rnel

Source material used:

- T3raTech company profile PDF from the company registration folder
- `bantora/ARCHITECTURE.md`
- `connekt/ARCHITECTURE.md`
- `t3rnel/ARCHITECTURE.md`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Container

```bash
docker build -t t3ratech-website .
docker run --rm -p 8080:8080 -e PORT=8080 t3ratech-website
```

## Cloud Run

```bash
PROJECT_ID=t3ratech-solutions REGION=europe-west1 bash scripts/deploy-website-terraform.sh
```

The deployment system is documented in `docs/deployment-system.md`.
Domain setup for `t3ratech.co.za` is documented in `docs/domain-webdev-co-zw.md`.
