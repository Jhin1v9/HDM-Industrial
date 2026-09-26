# PLANO MOBILE + SEO + CONTEÚDO — HDM Industrial (2026-09-25, Luna)

> Decreto owner: revisão TOTAL do mobile (cada elemento, wizard incluso), SEO de
> primeira página no Google, páginas de profissão GORDAS (gatilhos de confiança,
> PNL leve, natural — sem forçar), conteúdo pro site que tá vazio, animações e
> carrosséis com criatividade e sentido. Executar POR FASES, Home primeiro.

## FASE 0 — Fundamentos mobile (sem isso, nada adianta)

Bugs/achados reais (verificados no código e no ar):
- [ ] **Viewport sem trava**: `width=device-width, initial-scale=1` — falta a política anti-zoom-pinchinch. ⚠️ Decisão de engenharia: `maximum-scale=1, user-scalable=no` trava o zoom mas é anti-acessibilidade (WCAG). **Recomendação profissional**: manter o zoom ACESSÍVEL e eliminar TODA fonte de overflow horizontal (o que realmente faz a tela "mexer pros lados") — se o owner insistir na trava dura, aplicamos com justificativa registrada.
- [ ] **Zero guards de overflow-x** no CSS global — qualquer elemento 1px maior que a viewport quebra a tela no mobile. Adicionar `html,body{overflow-x:clip}` + utilitário de debug (`outline` em elementos que transbordam, rodar em todas as 156 páginas).
- [ ] Auditoria elemento-por-elemento no mobile (375px e 390px): header, hero (headline clamp vs composer), composer/mini-wizard (grid de profissões 3 col → 2 col?), CTAs (altura mínima 44px), dots do carrossel, formulário de solicitação em steps, footer, tabelas/capacidade.
- [ ] Wizard de solicitação mobile: steps devem ser full-screen drawer com progress bar; teclado não pode cobrir inputs (scrollIntoView); validação inline por campo.
- [ ] Teste real: Lighthouse mobile em `/`, `/personal-industrial`, `/soluciones/*` (meta: LCP < 2,5s, CLS < 0,1, zero scroll horizontal).

## FASE 1 — HOME (primeira página, primeira impressão)

Conteúdo/SEO (a home tá vazia demais):
- [ ] **Prova de confiança acima da dobra**: números reais já existem (capacidade organizada) — trazer 3 cartões de prova (sectores confirmados, modalidades, áreas) pra logo abaixo do hero com animação de contagem (count-up ao entrar na viewport).
- [ ] **Como funciona em 3 passos** (iconografia própria): "Cuéntanos la necesidad → HDM revisa disponibilidad → Recibes perfiles en tu plazo". Frases com gatilho de certeza ("sin compromiso", "respuesta en horas, no días").
- [ ] **Sectores atendidos** (já existe coverage/sectors) — trazer pra home como faixa de logos-texto animada (marquee suave, pausa no hover/touch).
- [ ] Carrossel: manter o wallpaper do hero (já é o "carrossel que faz sentido") + adicionar **faixa editorial de casos** (imagens industriais com legenda de sector: "Obra naval — montaje", "Planta química — parada") — sem inventar clientes (regra AGENTS.md), apenas ambientação por sector.
- Animações: Reveal já existe — elevar com stagger por seção, parallax leve no hero (já tem data-parallax), micro-interações nos CTAs (scale 0.98 no tap).

SEO home:
- [ ] Title/H1: manter "El personal industrial que necesita, donde lo necesita" + title tag com keyword principal: "Suministro de personal industrial cualificado | HDM".
- [ ] Intro de 80-120 palavras com keywords: *suministro de personal industrial, soldadores TIG/MIG, caldereros, montadores, Barcelona, disponibilidad en horas*.
- [ ] Schema.org: `Organization` (já existe) + `Service` + `FAQPage` com 3 perguntas reais (¿Cómo funciona? ¿En cuánto tiempo? ¿Qué perfiles?).
- [ ] Keywords pesquisadas (concorrentes Gi Group, InfoJobs, Indeed, ETTs verticais como solvikironsolution.com): **suministro de personal industrial**, **personal industrial cualificado**, **soldadores TIG Barcelona / MIG-MAG**, **caldereros y tuberos**, **montadores de estructuras metálicas**, **trabajos en altura**, **personal para paradas de planta**, **ETT industrial Barcelona/Cataluña**.

## FASE 2 — Páginas de PROFISSÃO (o grosso do SEO long-tail)

Hoje cada profissão tem 4 campos curtos (~50 palavras) — MUITO pouco. Google ranqueia páginas gordas. Plano por página (template único, 8 seções):

1. **Hero da profissão** — nome + promessa ("Soldadores TIG, MIG/MAG y electrodo disponibles en horas. HDM revisa y confirma.").
2. **O que fazem** (150-200 palavras, descrição oficial do cliente + contexto de uso real: "en taller, obra y paradas de planta").
3. **Cuándo lo necesitas** — 3-4 cenários concretos (parada programada, pico de producción, obra con plazo).
4. **Qué verifica HDM** — gatilhos de confiança PNL leve: "Formación PRL al día", "certificado de soldadura según proceso", "experiencia contrastada en entorno industrial" (tudo verdade — sem inventar números).
5. **Procesos/especialidades** (só soldador tem hoje — expandir: electricista "instalaciones, cuadros, cableado"; montador "estructura, soportación, altura").
6. **FAQ própria** (4-6 perguntas: plazos, volumen mínimo, desplazamientos, documentación) → `FAQPage` schema por página.
7. **Sectores habituales** (links internos pras páginas de sector).
8. **CTA fixo** — "Solicitar disponibilidad" sticky no mobile (bottom bar).

Regras de escrita: gatilhos de confiança naturais — *disponibilidad real*, *sin compromiso*, *respuesta en horas*, *personal verificado*; PNL leve (certeza, escassez honesta: "los cuadrillas se asignan por orden de solicitud"); PROIBIDO inventar cifras/clientes (AGENTS.md). 4 idiomas mantidos (ES/CA/EN/PT).

## FASE 3 — Wizard/solicitação mobile-first

- [ ] Drawer full-screen com progresso (passo x de 6), resumo vivo do pedido no topo.
- [ ] Inputs ≥48px, máscaras (telefone), validação inline, botão "atrás" preservando tudo (regra já existe — testar).
- [ ] Confirmação final com recapitulação clara + expectativa de resposta ("HDM revisa y responde en horas laborables").

## FASE 4 — SEO técnico + conteúdo que fecha a 1ª página

- [ ] Sitemap já existe (156 páginas) — conferir indexação no Search Console (ação owner: conectar).
- [ ] Blog/soluciones: 4 artigos-pilares (1.000+ palavras): "Cómo encontrar soldadores TIG en Barcelona en 24h", "ETT industrial vs cuadrilla propia: cuándo conviene", "Paradas de planta: cómo planificar personal", "Certificaciones de soldadura: qué exigir".
- [ ] Internal linking: toda profissão → sectores → soluciones → artigos.
- [ ] Backlinks iniciais: perfil Google Business (ação owner), diretórios sectoriais (metalmecon, ferroviário), guest posts.
- [ ] Core Web Vitals: imagens AVIF/WebP com srcset (hoje JPG grande), fontes subsetadas.

## Critérios de aceite
- [ ] Zero scroll horizontal em 375/390/414px em TODAS as páginas
- [ ] Lighthouse mobile ≥ 90 (Performance ≥ 85) na home
- [ ] Cada profissão ≥ 450 palavras + FAQ + schema
- [ ] Title/description únicos por página (já verificado pelo check:seo — manter)
- [ ] verify completo + 0 regras AGENTS.md violadas (sem cifras/clientes inventados)

---
## REVISÃO 26/09 — status real
- Fase 0 ✅ EXISTIA da build original (overflow-x: clip, composer 2col, CTAs 52px) — confirmado.
- Fase 1 ✅ ENTREGUE (Como funciona + FAQ+schema home, 4 idiomas).
- Fase 2 ✅ ENTREGUE + reconciliada (duas sessões: dicionário queHacen/cuando/verifica/faq + registry CA/EN/PT; FAQ híbrido com fallback; sem duplicação).
- Fase 3 ✅ EXISTIA da build original (MobileRequestBar: fixed bottom, safe-area, contador vivo, h-48px; RequestDrawer com focus-trap) — auditado, nada a fazer.
- Fase 4 — RESTANTE:
  1. [ ] Search Console (AÇÃO OWNER: verificação do domínio + sitemap)
  2. [ ] Google Business Profile (AÇÃO OWNER: criar/ficha HDM)
  3. [ ] Blog: 4 artigos-pilares (próxima sessão técnica)
  4. [ ] Backlinks iniciais (diretórios sectoriais)
