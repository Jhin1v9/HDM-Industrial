# PENDING.md — HDM Industrial

Fatos não confirmados, assets pendentes, claims amber/red, integrações sem credentials.
Nada aqui bloqueia o build. Atualizar quando o cliente confirmar.

## Fatos pendentes de confirmação
- [ ] Headcount real e significado de 54 vs 70 (BLOQUEIO DE PRODUÇÃO — não publicar total).
- [ ] Endereço fiscal completo em Portugal (rua, CP, cidade, NIF).
- [ ] Dados de contacto definitivos: telefone, WhatsApp, email público. O formulário de 7/9/2026
      CONTÉM telefone principal e WhatsApp (números distintos, Doc 06 §73) mas os valores não foram
      transcritos nos documentos — obter com o cliente. "Contatos errados" é LAUNCH BLOCKER (Doc 10 §149).
      Ativar via env: NEXT_PUBLIC_HDM_PHONE / NEXT_PUBLIC_HDM_WHATSAPP / NEXT_PUBLIC_HDM_EMAIL.
- [ ] Decisão comercial pendente: telefone+email ambos obrigatórios ou pelo menos um (Doc 06 §59–60).
      Implementação atual: ambos obrigatórios (conservador B2B).
- [ ] Formato da referência: não congelado nos docs (HDM-A7F2 usado, Doc 09 §59).
- [ ] Documento 08 (Visual Design) não foi entregue: tokens visuais decididos pelo orquestrador
      (docs/adr/001-visual-tokens.md), coerentes com Doc 02 §23 (sem clichês industriais).
- [ ] Setores "engenharia" e "naval" (só no discovery antigo).
- [ ] Certificações específicas: norma, organismo, número, validade (além de "PRL" e "certificados de soldadura" genéricos).
- [ ] Processo operacional oficial passo a passo (timeline do site usa wording conservador).
- [ ] Testemunhos reais de clientes.
- [ ] Cases de projetos publicáveis (modelo "PROYECTO CONFIDENCIAL" em placeholder).

## Assets pendentes (ver src/content/placeholders.ts)
- [ ] PH-VIDEO-HERO-01 — vídeo hero (poster + fallback gráfico ativos).
- [ ] PH-PHOTO-MATHEUS-01 — foto do responsável (NÃO substituir por stock — identidade real).
- [ ] PH-PHOTO-TEAM-01 — foto real da equipe HDM (NÃO substituir por stock como prova).
- [ ] PH-CERT-PRL-01, PH-CERT-WELDING-01 — digitalizações de certificados.
- [ ] PH-PROJECT-01..03 — imagens de projetos reais.
- [ ] PH-TESTIMONIAL-01..02 — testemunhos reais.
- [x] Fotografias editoriais/ambiente (hero, perfis, planta, estrutura, logística, EPI):
      fotos públicas verificadas em public/images/ + mediaManifest.json. Nunca apresentadas como prova HDM.

## Integrações — EXTERNAL ACTIVATION PENDING (código pronto)
- [ ] Supabase: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY (ver .env.example,
      supabase/migrations/). Sem env: DevRequestRepository (persistência local, modo demo sinalizado).
- [ ] Email transacional (notificação de nova solicitud): provider interface pronta; ativação via
      Supabase Edge Function / Resend — credential pendente.
- [ ] Analytics (Vercel Web Analytics) — carregar só após consentimento de cookies.
- [ ] Domínio final + redirect map OLD→NEW (documentado em docs/redirects.md; aplicar no deploy).

## Claims
- Registry: src/content/claims.ts (status green/amber/red). Claims `red` nunca aparecem em conteúdo público.
