# Relatório — último ciclo de entregas

_Atualizado automaticamente pelo SYNAPSE em 2026-09-21_

## Entregues

- **2026-09-21 · 0471dd2 · docs(documentos/relatorios)** — Sincronização do `relatorio.html` do cliente com a versão servida no VPS (declarada autoritativa no corpo do commit). Adições: bloco CSS `.back-to-panel` (pill fixa com regra responsiva que esconde o rótulo no mobile), link "Voltar ao painel" (`<a href="/cliente/">`) e changelog interno do relatório atualizado (seção Trabaja con nosotros com badge "Em testes finais"). Sem breaking changes; risco baixo. Único ponto de atenção: href absoluto `/cliente/` depende do painel existir nesse caminho no host.
- **2026-09-21 · 69b5338 · feat(careers + automation)** — Área de candidaturas "Trabaja con nosotros" (Etapa A, sem backend): páginas registry-driven em 4 idiomas (es/en/pt/ca), formulário via helper puro `buildCareersMailto` para `rrhh@hdmindustrial.es` com 5 testes unitários, link novo no Header e Footer. No mesmo commit, instalação do SYNAPSE (orquestrador `automation/synapse.sh`, hook post-commit, prompts de agente, install sh/ps1). Zero breaking changes; risco de regressão baixo (mudanças aditivas). Verify declarado pelo autor: 81/81 testes, build com 157 páginas, check:seo 152 OK (não reproduzido pela classificação).

## Em andamento

- Seção "Trabaja con nosotros" em testes finais conforme badge publicado no relatório do cliente — código já entregue (69b5338), aguardando data de publicação para trocar o badge.
- Etapa B do fluxo de candidaturas: backend real de recebimento de CV com anexo, registrada como backlog (o mailto é etapa intermediária deliberada).

## Próximos passos

- Verificar que o link `/cliente/` responde corretamente no ambiente publicado (botão "Voltar ao painel" do relatório).
- Atualizar o badge "Em testes finais" para uma data de publicação quando a seção Trabaja con nosotros entrar no ar.
- Confirmar se a página de Política de Privacidade foi de fato atualizada para cobrir dados de candidatos (o commit menciona, mas o diff não lista o arquivo legal).
- Monitorar nos primeiros dias se os currículos chegam corretamente ao inbox `rrhh@hdmindustrial.es` (o fluxo depende do cliente de email do candidato).
- Formalizar no backlog a Etapa B: backend de recebimento de CV com anexo, substituindo o mailto.

## Notas técnicas

- Convergência operacional: o VPS passou a ser a versão autoritativa do relatório do cliente; o repo espelha o que está no ar. Backups `.bak-20260921` declarados no host — contexto não verificável pelo diff.
- O fluxo de candidaturas depende do cliente de email do usuário (mailto) — comportamento variável em mobile/webmail; é decisão de design da Etapa A, não regressão, mas é o ponto de atenção residual da feature.
- A atualização da política de privacidade citada no commit 69b5338 não é verificável pelo diff_stat — tratar como pendência até confirmação manual.
- O verify 81/81 testes de 69b5338 é tomado por declaração do corpo do commit; o diff em si evidencia build de 157 páginas e apenas 7 linhas removidas (comentários de navegação em `Header.tsx`).
