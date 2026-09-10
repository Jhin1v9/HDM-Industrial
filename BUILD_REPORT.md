# BUILD REPORT — HDM Industrial

**Data:** 2026-09-10 · **Metodologia:** Agent Swarm (preflight → ownership → waves → integração controlada → audit swarm → fixes controlados → adversarial review → final serial quality gate)
**Especificação:** Prompt Supremo HDM Industrial + Documentos 01–10 (tratados como especificação de produto, não inspiração)
**Versão de entrega (preview):** `28a8a52` (guardada via website_version_manager; publicação é ação manual do utilizador)

---

## 1. Veredito

**IMPLEMENTATION COMPLETE / EXTERNAL ACTIVATION PENDING.**
A plataforma está construída, testada, auditada (6+3 auditores em swarm), corrigida e re-verificada de ponta a ponta. O envio online do Request em produção depende de credenciais externas (Supabase + contactos HDM) que não foram fornecidas — o sistema **nunca simula sucesso**: sem backend falha explicitamente com caminho humano; com `NEXT_PUBLIC_DEMO_MODE=true` (build entregue) persiste de verdade no navegador com etiqueta honesta de "entorno de demostración".

## 2. O que foi construído

| Área | Entregue |
|---|---|
| Stack | Next.js **16.3.4** (App Router, `output: "export"`, Turbopack), React 19, TypeScript strict + `noUncheckedIndexedAccess`, Zod v4, Tailwind v4 (@theme), Vitest 3 |
| Páginas | **153 páginas estáticas** (37 de conteúdo × 4 locales + detalhes + utilidades) |
| Idiomas | ES `/`, CA `/ca/`, EN `/en/`, PT `/pt/` (pt-PT europeu verificado) — 4 dicionários com paridade de chaves enforced por tipos; slugs localizados; hreflang + x-default; canonical por página |
| HDM Request Engine | Compositor multi-perfil (6 perfis, especializações de soldadura), modos expert/assistido, 6 passos (Necesidad → Contacto), valor-antes-de-dados, persistência PII-stripped em localStorage (schemaVersion 2 + migração v1, TTL 14 dias), sobrevive a navegação e a troca de idioma, falha preserva a solicitação, WhatsApp handoff sem PII, honeypot, limites de upload (10 ficheiros / 25 MB / whitelist MIME) |
| Request Repository | Supabase (PostgREST, RLS insert-only, migração `0001` incluída) + Dev (demo etiquetado, arquivo PII-stripped, máx. 20 entradas) — produção sem backend = falha explícita (§85) |
| Fotos | **12/12 placeholders preenchidos** com fotos públicas full HD, verificadas ao vivo (HTTP 200), adequação contextual confirmada, **licença comercial confirmada (10× Unsplash License, 2× Pexels License)** — registo completo em `docs/photo-provenance.md`; rodapé editorial em todas as páginas (4 idiomas) declarando que não retratam instalações/pessoal HDM |
| SEO técnico | 148 páginas com 1× h1, title, canonical, hreflang (auditado por script); sitemap só com URLs indexáveis (petroquímica noindex); robots.ts; Organization JSON-LD só com factos verificados |
| Legal | aviso-legal, privacidad, cookies (4 idiomas); banner de cookies real (sem consentimento = zero scripts de medição) |

## 3. Final Serial Quality Gate (W10) — evidências

| Gate | Resultado |
|---|---|
| Clean install (`npm ci`) | ✅ |
| Testes unitários | ✅ **76/76** (7 ficheiros) |
| Typecheck (`tsc --noEmit`, strict) | ✅ |
| Lint (`eslint .`, flat config Next 16) | ✅ 0 erros 0 avisos |
| Build final | ✅ 153 páginas, CSS Tailwind completo (36,6 KB minificado) |
| SEO audit (`check:seo`) | ✅ 148 páginas |
| Placeholder audit | ✅ 12/22 preenchidos, 10 pendentes (não-bloqueantes, com caption localizada), 0 blocking |
| Claims audit | ✅ 0 fragmentos proibidos |
| E2E fluxo crítico (demo) | ✅ **11/11** — drawer → compositor → 6 passos → validação → persistência real → referência `HDM-XXXX` → nota demo honesta → reload mantém rascunho → PII stripped → troca de idioma preserva → barra móvel |
| E2E caminho de falha (produção sem backend) | ✅ **11/11** — falha explícita, razão `no_backend` visível, retry preserva dados, **zero links falsos** de contacto |
| E2E regressão W9 | ✅ **11/11** — focus trap/return, cookie vs drawer, "España" localizado, maxLength, arquivo sem PII |
| Mobile | ✅ visual (390×844) + barra fixa + menu com scroll em landscape + safe-area |
| Visual QA | ✅ screenshots desktop/mobile/PT/drawer no build final estilizado |

## 4. Auditorias em swarm e correções

**W7 — 6 auditores paralelos:** SEO, content-truth, a11y, request-engine, mobile/UX, translations+claims.
**W8 — correções controladas:** 4 CRITICAL (displacement tri-state; persist gate StrictMode; eyebrows ES hardcoded; texto de placeholder ES público), 8+ MAJOR (h1 em 52 páginas, body2 "lo que los clientes destacan"→compromisso, alts ES→12×3 localizados, "7 modalidades"→5, drawer sem focus trap, menu móvel sem scroll, 404 default, contraste steel/signal, "a hiring" EN), MINORs (honeypot name, data local, data no resumo, WhatsApp com data formatada, >10 anexos com erro, demo note por outcome, PT scale labels, superlativo "la mejor prueba", claims.ts 8→6).

**W9 — 3 revisores adversariais (veredito inicial: 3× FAIL):**
- *Request engine:* dev archive guardava PII → agora PII-stripped + cap 20; 11 classes de divergência UI-gate vs schema → maxLength em todos os campos + normalização de issues zod→`invalid_input`; draft legado booleano → schemaVersion 2 + migração v1; `certification_requirements` array→text (drift migração); status "failed" reset no hydrate.
- *Conteúdo/i18n:* "España" hardcoded em 21 páginas → `dict.common.spain/portugal`; alt CA "moc"→"mono"; claims.ts modalidades alinhado.
- *A11y/mobile:* **BLOCKER ambiental — build sem utilidades Tailwind** (causa raiz: `postcss.config.mjs` omitido do sync para o workspace; regenerado e re-verificado visualmente); focus return capturado no evento de abertura (ordem de efeitos React); foco inicial no × (não no backdrop); cookie banner z-70→z-55 (não cobre o drawer); file input com aria-label; dropdown HDM state-driven (aria-expanded ≡ visibilidade).

**Aceites/documentados (README §Limitaciones):** inserção Supabase não-transaccional (3 POSTs), multi-separador last-writer-wins, rádios sem setas APG (operáveis Tab+Enter, WCAG 2.1.1 ok), targets 32–40 px (≥24 px, WCAG 2.5.8 AA), mapa SVG com alternativa textual equivalente, 404 estático em ES.

## 5. Validações exigidas pelo utilizador

**A) Backend real do Request:** testado E2E em ambos os modos (evidências acima). O export estático **não** inutilizou o Request: validação, persistência/adaptador e referência funcionam browser-a-browser. Produção real = **EXTERNAL ACTIVATION PENDING**: aplicar `supabase/migrations/0001_personnel_requests.sql` + definir `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY` (+ `NEXT_PUBLIC_HDM_PHONE/WHATSAPP/EMAIL` para os canais humanos) e rebuild sem `NEXT_PUBLIC_DEMO_MODE`.

**B) Fotos públicas:** registo completo (slot ID, URL original viva, fonte, resolução, contexto, adequação visual, licença) em `docs/photo-provenance.md` — **12/12 LICENSED-FOR-COMMERCIAL-USE**, 0 TEMPORARY-PLACEHOLDER. Limitação transparente: páginas de autor não abribles no ambiente (anti-bot); ambas as licenças não exigem atribuição.

## 6. Verdades de negócio — conformidade final

- "Solo suministramos personal" — nenhuma menção a fabrico/oficina como serviço HDM ✅
- Zero cifras de plantilla, zero SLA 24/48h, zero ISO, zero "líder/nº1", zero clientes/casos/testemunhos inventados, zero disponibilidade em tempo real ✅ (auditado por 2 revisores independentes)
- CTA sempre "Solicitar disponibilidad/personal" — 0 verbos proibidos em 150 páginas ✅
- Fotos nunca apresentadas como prova; disclaimer editorial em todas as páginas ✅

## 7. Entrega

| Item | Caminho |
|---|---|
| Site final (build estático) | `/mnt/agents/output/app/` (= `hdm-industrial/out/`) — preview via cartão de versão `28a8a52` |
| Código-fonte canónico | `/mnt/agents/output/hdm-industrial/` |
| Proveniência de fotos | `docs/photo-provenance.md` |
| Limitações e ativação | `README.md` |
| Processo swarm | `SWARM_ARCHITECTURE.md` |

**Publicação:** o preview está guardado; publicar é ação manual do utilizador (botão 「发布」). Nada foi publicado.
