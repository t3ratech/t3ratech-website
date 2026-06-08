# T3raTech Website

Website for T3raTech Solutions, focused on three T3raTech systems and the SciTech Zimbabwe community:

- Bantora at `bantora.t3ratech.co.zw`
- Connekt at `connekt.t3ratech.co.zw`
- T3rnel at `t3rnel.t3ratech.co.zw`
- SciTech Zimbabwe, a WhatsApp community for Zimbabwean science, technology, jobs, commerce, and innovation groups

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

## Operations

```bash
PROJECT_ID=t3ratech-solutions REGION=europe-west1 bash scripts/deploy-website-terraform.sh
```

Website operations are documented in `docs/deployment-system.md`.
Domain setup for `t3ratech.co.zw` is documented in `docs/domain-webdev-co-zw.md`.

GitHub Actions publishing setup is documented in `docs/github-actions-deployment.md`.
