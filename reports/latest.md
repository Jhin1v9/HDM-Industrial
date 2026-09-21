# Relatório — último ciclo de entregas

_Atualizado automaticamente pelo SYNAPSE em 2026-09-21_

## Entregues

- **2026-09-21 · da88617 · feat(careers)** — Botão de anexo de CV em `CareersMailForm.tsx`: validação local por extensão (pdf/doc/docx/jpg/png) e limite de 25 MB, envio via Web Share API no mobile com fallback `mailto` (nome/tamanho do arquivo no corpo). Lógica extraída para `CAREERS_CV_LIMITS`/`isAcceptedCvFile`/`isCvSizeAllowed`/`buildCareersBody` em `mailto.ts`; 4 dicionários i18n ampliados; suite de domínio ampliada (validação + formatação de tamanho).
- **2026-09-21 · 75e3d08 · feat(careers,automation)** — Instalação do SYNAPSE (orquestrador `synapse.sh`, hook post-commit, prompts, instaladores, docs) junto com a seção "Trabaja con nosotros" em 4 idiomas, registry-driven, formulário mailto para `rrhh@hdmindustrial.es` e link no Header/Footer.
- **2026-09-21 · 69b5338 · feat(careers,automation)** — Versão inicial da área de candidaturas: 4 rotas indexáveis, `CareersPage`/`CareersMailForm`, helper puro `buildCareersMailto` com 5 testes, `companyFacts.hrEmail`, nav aditiva e instalação do SYNAPSE. Assunto idêntico a `75e3d08` — possível duplicação de trabalho no histórico.
- **2026-09-21 · 5812804 · docs(relatorios)** — Atualização de status no `documentos/relatorios/relatorio.html`: seção Trabaja con nosotros marcada como "no ar"/"Entregue" (3 linhas alteradas, diff puramente documental).
- **2026-09-21 · 0471dd2 · docs(relatorios)** — Sincronização do relatório HTML do cliente com a versão do VPS: CSS `.back-to-panel`, link "Voltar ao painel" (`href="/cliente/"`) e novo item de changelog.

## Em andamento

- Cobertura do ramo Web Share do anexo de CV: sem teste unitário (`navigator.canShare` só é exercido em browser real); pendente validação manual em dispositivos Android/iOS.
- Divergência no histórico: commits `75e3d08` e `69b5338` têm mesmo assunto e conteúdo sobreposto — decisão sobre limpeza do histórico não registrada.
- Etapa B (backend real de recebimento de CV com anexo) explicitamente fora de escopo, registrada como backlog sem prazo definido.

## Próximos passos

- Testar manualmente o fluxo Web Share em 1–2 aparelhos Android/iOS reais.
- Considerar teste de componente (Testing Library) para `handleFile`/`handleSubmit`, cobrindo estados de erro de extensão/tamanho na UI.
- Validar em staging o clique do formulário em pt/en/ca (rótulos localizados; testes cobrem só espanhol).
- Verificar se o commit `69b5338` deve permanecer no histórico ou se há trabalho duplicado a limpar.
- Confirmar se a Política de Privacidade foi de fato atualizada para cobrir dados de candidatos (mencionada no commit, ausente do diff).
- Monitorar nos primeiros dias se os CVs chegam corretamente a `rrhh@hdmindustrial.es` (fluxo depende do cliente de email do candidato).
- Verificar que o link `/cliente/` responde no ambiente publicado (botão "Voltar ao painel" pode 404).

## Notas técnicas

- Nenhum breaking change nos commits do ciclo; `CareersMailInput` ganhou campo obrigatório `attachment`, mas os únicos callers foram atualizados no mesmo commit (`da88617`).
- Risco residual: o ramo Web Share é dependente de browser e não tem cobertura automatizada; o fallback `mailto` mitiga a falha desse ramo.
- Métricas de teste ("suite 94/94", "verify completo verde") são declarações do corpo dos commits — não reproduzíveis pelo diff.
- O fluxo de candidaturas é deliberadamente sem backend: arquivo permanece apenas no navegador e a entrega depende do email do usuário; se houver backend futuro, revisar o limite de 25 MB contra o limite real do servidor de email.
