# SWARM_ARCHITECTURE.md — HDM Industrial

Ambiente real detectado (preflight): Node 20.20.2, npm 11.19 (pnpm indisponível — permissão;
lockfile único package-lock.json), sem repo pré-existente, subagentes via spawn (foreground/background,
máx. 16 vivos), filesystem compartilhado /mnt/agents/output/hdm-industrial.

## DESCOBERTA CRÍTICA DE AMBIENTE (W4)
/mnt/agents é um mount FUSE lento SEM suporte a symlinks e com extração tar
não confiável → node_modules NÃO pode viver no projeto. Workspace canônico de
verificação: **/tmp/hdm-build** (cópia do source + node_modules real em
/tmp/hdm-nm via `cp -al` hardlinks; symlink é recusado pelo Turbopack).
Fluxo: editar fonte em /mnt (canônico) → cp arquivo → /tmp/hdm-build → verificar
→ sync out/ de volta via tar pipe. /mnt permanece o entregável canônico (source + out/).

## Versões travadas
Next.js **16.3.4** (Active LTS conforme Doc 09; npm latest confirmado), React 19,
Tailwind v4, Zod v4, TS strict + noUncheckedIndexedAccess, Vitest 3.
eslint-config-next 16 = flat config nativo (sem FlatCompat; `next lint` removido → `eslint .`).
@types/react ^19.3.0 (peer de @types/react-dom 19.3).

## Ownership (shared files — dono único: ORQUESTRADOR/INTEGRADOR)
package.json, package-lock.json, tsconfig, next.config.ts, eslint.config.mjs,
layouts, globals.css (tokens), src/content/* (registries), src/domain/* (contracts),
routing/locale config (src/lib/seo.ts, src/content/pages.ts), migrations, app/** gerado.

| Wave | Task | Owner | Directories allowed | Forbidden | Dependencies | Status |
|------|------|-------|--------------------|-----------|--------------|--------|
| W0 | Fact extraction docs 02–10 | explore subagent | read-only uploads | write anywhere | — | DONE |
| W0 | Media acquisition (fotos públicas full HD) | media subagent | public/images/**, mediaManifest.json | todo o resto | — | DONE (12/12 verificadas) |
| W1 | Foundation: scaffold, tokens, contracts, registries, i18n ES | orquestrador | todo o repo (owner) | — | npm install | DONE |
| W2 | Request Engine (domain, state, UI, backend adapters) | orquestrador | src/features/request/**, src/server/** | — | W1 | DONE |
| W3 | Features: profiles/solutions/coverage/sectors/trust/projects | orquestrador | src/features/**, src/components/** | shared files | W1 | DONE |
| W4 | Page assembly: 4 árvores de rotas, SEO, sitemap, robots | orquestrador | app/**, src/lib/seo.ts | — | W2–W3 | DONE (build rc 0, 153 páginas) |
| W5 | Traduções PT/EN/CA | 3 translator subagents | src/i18n/dictionaries/{pt,en,ca}.ts | qualquer lógica | ES stable | DONE (paridade 402/407 keys) |
| W6 | Testes Vitest + scripts CI | coder subagent | tests/**, scripts/**, vitest.config.ts | src/** | W4 | RUNNING |
| W7 | Audit swarm: content-truth, SEO, a11y, request-engine, mobile/UX, translations+claims | 6 reviewer subagents | read-only | write | build OK | DONE (6/6 reportaram) |
| W8 | Controlled fixes (sem overlap) | orquestrador + 3 tradutores | conforme finding | — | W7 | DONE (2 CRIT request-engine, 2 CRIT i18n, MAJORs a11y/conteúdo/mobile, MINORs; rebuild verde 153 páginas, 76/76 testes) |
| W8b | Validações do utilizador: A) backend E2E real (11/11 success + 11/11 failure-path) B) proveniência de 12 fotos (12/12 licensed, docs/photo-provenance.md) | orquestrador + photo agent | docs | — | W8 | DONE |
| W9 | Adversarial review | 3 verifier subagents (request-engine, conteúdo/i18n, a11y/mobile) | read-only | write | W8 | DONE (3× FAIL→fixes: PII no dev archive, maxLength gates, migração draft v1→v2, focus return/initial, cookie z-index, dropdown state, "España"→dict, CA "mono", build CSS regenerado — causa raiz: postcss.config.mjs fora do sync) |
| W9b | Controlled fixes W9 + regressão E2E (11/11) | orquestrador + 3 tradutores | conforme finding | — | W9 | DONE |
| W10 | Final Serial Quality Gate: clean install, 76/76 testes, typecheck, lint, build 153 páginas estilizado, SEO 148, placeholders, claims, E2E 11/11 ×2, mobile visual | orquestrador | — | — | W9b | DONE |
| W10 | Final serial gate + sync out/ + build_version + build report | orquestrador | — | — | tudo | PENDING |

Regras: dois agentes nunca editam o mesmo shared file; auditores report-only;
subagentes recebem MISSION/CONTEXT/FILES/FACTS/ACCEPTANCE; failed ≠ done; integração serial.
