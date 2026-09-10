# PLAN — HDM INDUSTRIAL FULL PRODUCT BUILD

Especificação autoritativa: PROMPT SUPREMO SWAM.md + Documentos 01–10 (uploads).
Hierarquia de verdade: instrução mais recente do usuário > docs 01–10 > discovery > inferência.
Instrução adicional do usuário (nível 1): substituir placeholders de foto por FOTOS PÚBLICAS FULL HD
verificadas no ar e contextualmente coerentes, sempre que possível — sem falsificar prova
(fotos editoriais/ambientais; nunca apresentadas como equipe/projetos/certificados reais da HDM).

## Ambiente
- Sandbox sem repo existente → baseline novo (Prompt Supremo §70): Next.js Active LTS, TS strict,
  App Router, Server Components default. pnpm se disponível, senão npm.
- Sem credentials externas → adapters + .env.example + dev fallback (§83–85, §93).
- Deploy: static export (output:'export') → preview via version manager (html/out).
  Request backend: RequestRepository interface; SupabaseRequestRepository (REST, env-config)
  + DevRequestRepository (persistência local honesta). Sem backend configurado em produção:
  falha explícita com caminho humano (WhatsApp/telefone) — §85.

## Ondas
- W0 Discovery/Facts: FACTS_CONFIRMED.md, PENDING.md, AGENTS.md, SWARM_ARCHITECTURE.md
- W1 Foundation: scaffold, design tokens, domain contracts (freeze), content registries,
  i18n (ES root, /pt /en /ca), placeholder registry, page registry
- W2 Core: Request Engine (schema Zod, reducer/state, persistência cross-page e cross-locale,
  Team Composer, QuantityStepper, Expert/Assisted modes, Summary, Success/Failure, WhatsApp
  handoff contextual, upload privado adapter, indicador global, mobile request bar)
- W3 Features: profiles (pictogramas SVG), solutions, coverage map SVG próprio ES+PT,
  sectors, trust/certifications, projects (placeholder confidencial)
- W4 Pages: todas as rotas do sitemap §42 (ES) + equivalentes PT/EN/CA; Home montada por último
- W5 Multilingual + SEO: dictionaries completos, hreflang, canonical por idioma, sitemap,
  robots, JSON-LD real, redirects map OLD→NEW documentado
- Fotos: subagente paralelo baixa candidatos (Unsplash público), verifica HTTP 200, revisa
  contexto visualmente, salva em public/images/ com manifest (id, descrição, fonte, licença)
- W6 Integration: integrador único (orquestrador) — build global
- W7 Audit swarm: content-truth, claims, SEO, a11y, mobile, request-engine, placeholder (read-only)
- W8 Controlled fixes sem overlap
- W9 Adversarial review (fake claims, truth test, mobile, template test)
- W10 Final serial gate: lint → typecheck → unit → placeholder audit → SEO audit → build
- Entrega: website_version_manager build_version + BUILD REPORT (formato §211)

## Swarm real deste ambiente
- Subagentes disponíveis via spawn (foreground/background), máx. 16 vivos.
- Escrita paralela somente com directory ownership exclusivo; integração serial no orquestrador.
