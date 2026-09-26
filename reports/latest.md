# Relatório — último ciclo de entregas

_Atualizado automaticamente pelo SYNAPSE em 2026-09-21_

## Entregues

- **2026-09-21 · 082c8f0 · feat(careers)** — Envio real de CV via relay na VPS: o formulário (`CareersMailForm.tsx`) agora POSTa multipart para `nexo_hdm_cv` (porta 13475), configurável por `NEXT_PUBLIC_HDM_CV_ENDPOINT` (default `https://vps.nexo-digital.app/hdm-cv`), com sucesso somente após 2xx (classificador puro `classifyCvResponse`, §85). Qualquer falha cai no fallback Web Share/mailto; adicionado honeypot (`website`, §115), estado `sent` com `submitSuccess` nas 4 localizações e testes do classificador (2xx = sent; 503/404/429/502/500 = fallback).
- **2026-09-21 · da88617 · feat(careers)** — Campo de anexo de CV: validação local por extensão (pdf/doc/docx/jpg/png) e limite de 25 MB (`CAREERS_CV_LIMITS`), envio via Web Share API com fallback mailto (nome/tamanho no corpo); lógica extraída para `mailto.ts` (`isAcceptedCvFile`, `isCvSizeAllowed`, `buildCareersBody`).
- **2026-09-21 · 75e3d08 · feat(careers,automation)** — Instalação do SYNAPSE (orquestrador `synapse.sh`, hook post-commit, prompts, instaladores) junto com a seção "Trabaja con nosotros" em 4 idiomas, registry-driven, formulário mailto para `rrhh@hdmindustrial.es` e link no Header/Footer.
- **2026-09-21 · 69b5338 · feat(careers,automation)** — Versão inicial da área de candidaturas: 4 rotas indexáveis, `CareersPage`/`CareersMailForm`, helper puro `buildCareersMailto` com 5 testes, `companyFacts.hrEmail`, nav aditiva e instalação do SYNAPSE. Assunto idêntico a `75e3d08` — possível duplicação no histórico.
- **2026-09-21 · 5812804 · docs(relatorios)** — Atualização de status no `documentos/relatorios/relatorio.html`: seção Trabaja con nosotros marcada como "no ar"/"Entregue" (diff puramente documental).
- **2026-09-21 · 0471dd2 · docs(relatorios)** — Sincronização do relatório HTML do cliente com a versão do VPS: CSS `.back-to-panel`, link "Voltar ao painel" (`href="/cliente/"`) e novo item de changelog.

## Em andamento

- Ativação do relay de CV no servidor: rota Caddy `/hdm-cv/*` (requer sudo) e credencial de email (`HDM_CV_SMTP_URL` ou `HDM_CV_RESEND_API_KEY`) ainda pendentes — até lá o formulário opera sempre em fallback (PENDING.md).
- Cobertura do fluxo async de submit: só o classificador puro é testado; falta teste de componente/e2e (sucesso 2xx, fallback em 503 e erro de rede), e o ramo Web Share segue sem teste automatizado.
- Divergência no histórico: commits `75e3d08` e `69b5338` têm mesmo assunto e conteúdo sobreposto — decisão sobre limpeza não registrada.

## Próximos passos

- Criar a rota Caddy `/hdm-cv/*` e configurar a credencial de email para o relay sair do modo 503/fallback.
- Verificar no relay (repo da VPS) que honeypot `website` preenchido resulta em descarte do envio.
- Adicionar teste de componente/e2e do fluxo async (sucesso 2xx, fallback em 503 e erro de rede).
- Validar as traduções novas (`submitSuccess`, `attachPrivacy`) com o cliente em es/ca/pt.
- Testar manualmente o fluxo Web Share em 1–2 aparelhos Android/iOS reais.
- Validar em staging o clique do formulário em pt/en/ca (testes cobrem só espanhol).
- Verificar se o commit `69b5338` deve permanecer no histórico ou se há trabalho duplicado a limpar.
- Confirmar se a Política de Privacidade foi de fato atualizada para cobrir dados de candidatos.
- Verificar que o link `/cliente/` responde no ambiente publicado.

## Notas técnicas

- O commit `082c8f0` reescreveu o fluxo de submit (síncrono → async com fetch); risco de regressão médio mitigado pelos fallbacks, mas o comportamento de rede em produção ainda não foi exercido de ponta a ponta (rota Caddy pendente) — o fetch pode falhar silenciosamente para todos até o relay entrar no ar.
- Nenhum breaking change no ciclo; `CareersMailInput` ganhou campo `attachment` com callers atualizados no mesmo commit (`da88617`).
- Incerteza declarada: não é possível afirmar pelo diff se o relay rejeita honeypot preenchido — a validação vive no repo da VPS, fora deste repositório.
- Métricas de teste ("96/96", "94/94", "81/81") são declarações dos corpos dos commits — não reproduzíveis pelo diff.
