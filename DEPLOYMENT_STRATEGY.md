# Cloud Run Deployment Strategy

This strategy covers only the first launch group: the static T3raTech website, Bantora, Connekt, and then T3rnel.

For the website-only deployment, use `scripts/deploy-website-terraform.sh`. For `t3ratech.co.za`, use `docs/domain-webdev-co-zw.md`.

## Guiding Choice

Use Cloud Run for stateless containers and managed GCP services for state. Do not try to run Postgres, Redis, Kafka, or MinIO as stateful containers on Cloud Run.

## Service Map

| Service | Cloud Run exposure | State dependencies | First settings |
|---|---|---|---|
| `t3ratech-website` | Public | None | `min_instances=0`, `max_instances=2`, 256-512 MiB |
| `bantora-web` | Public | Calls `bantora-api` | `min_instances=0`, 256-512 MiB |
| `bantora-api` | Public API, auth protected writes | Cloud SQL Postgres, Memorystore Redis, Secret Manager | Start at 1 vCPU / 1-2 GiB, cap max instances |
| `connekt-core` | Private/internal unless public auth endpoints require direct access | Cloud SQL Postgres, object storage, secrets | Start at 1 vCPU / 1 GiB |
| `connekt-content-api` | Public or private behind frontend/API gateway | Cloud SQL Postgres, object storage | Start at 1 vCPU / 1 GiB |
| `connekt-administration` | Private/admin restricted | Cloud SQL Postgres | Start at 1 vCPU / 1 GiB |
| `connekt-admin-web` | Private/admin restricted | Calls admin API | `min_instances=0`, 256-512 MiB |
| `t3rnel-api` | Private at first, public later if productized | Secret Manager, optional storage | Start at 0.5-1 vCPU / 512 MiB-1 GiB |

## Shared Managed Resources

| Resource | Recommendation |
|---|---|
| Artifact Registry | One Docker repository for all launch images |
| Cloud SQL for Postgres | One instance, separate databases and users for Bantora and Connekt |
| Memorystore Redis | One small Redis instance shared by Bantora and Connekt if both need caching/session support |
| Object storage | Prefer Cloud Storage buckets; adapt MinIO/S3-specific code instead of running MinIO on Cloud Run |
| Messaging | Keep Kafka out of Cloud Run. Use Google Managed Service for Apache Kafka only if Connekt modules truly need it; otherwise launch with Kafka-dependent modules disabled or add a Pub/Sub adapter |
| Secret Manager | Store DB passwords, JWT secrets, API keys, Redis auth, and provider credentials |
| VPC | Use Direct VPC egress for private access to Cloud SQL private IP and Memorystore |

## Launch Phases

| Phase | Work |
|---|---|
| 1 | Deploy `t3ratech-website` as a public Cloud Run service with custom domain |
| 2 | Deploy shared Artifact Registry, Secret Manager entries, VPC, Cloud SQL, and Redis |
| 3 | Deploy Bantora API and web; connect API to Cloud SQL and Redis |
| 4 | Deploy a reduced Connekt set: core, content API, administration, admin web, and only the first required communication/payment services |
| 5 | Add managed Kafka only if enabled Connekt modules require it in production |
| 6 | Deploy T3rnel core API after Bantora and Connekt health checks, logging, and secrets are stable |

## Cost Guardrails

- Keep `min_instances=0` for the website, frontends, admin web, and low-traffic APIs.
- Use `min_instances=1` only where Java cold starts damage the user experience.
- Cap every service with `max_instances` while traffic is unknown.
- Start Connekt with fewer enabled modules and add modules as usage proves the need.
- Prefer one Cloud SQL instance with separate databases over one instance per product.
- Avoid managed Kafka until Connekt genuinely needs the Kafka-dependent modules live.

## Terraform Shape

| Terraform area | Resources |
|---|---|
| APIs | Enable Cloud Run, Artifact Registry, Secret Manager, Cloud SQL Admin, VPC Access/Compute as needed |
| Registry | `google_artifact_registry_repository` |
| Network | VPC, subnet, private service access where needed, Direct VPC egress config on Cloud Run services |
| Database | Cloud SQL Postgres instance, databases, users, backups |
| Cache | Memorystore Redis instance if required |
| Secrets | Secret Manager secrets and IAM bindings for service accounts |
| Services | `google_cloud_run_v2_service` for each stateless container |
| IAM | Per-service service accounts with least privilege |
| Domains | Cloud Run domain mappings in `europe-west1` with Google-managed certificates |

## Notes

Cloud Run is a strong fit for the website, Bantora services, and T3rnel API. Connekt needs the most care because its local architecture includes stateful infrastructure and Kafka-backed modules. The cheapest Cloud Run launch is a reduced Connekt module set with managed Postgres, managed secrets, optional Redis, and Kafka deferred until unavoidable.
