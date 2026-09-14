# BUGS — Nexo Workspace (registro consolidado, 14/09/2026)

> Espelho de `C:\Users\Abner\Documents\Nexo Workspace\BUGS.md` + bugs do site
> já corrigidos. **Documento interno — NUNCA commitar este arquivo no repo do
> cliente** (o repo é público e o Matheus pode ler; aqui há credenciais e
> internals da plataforma).

---

## BUG-01 — Timeline "Progreso" mantém eventos órfãos de comentários deletados

**Sintoma:** ao deletar um comentário via `DELETE /nexo/api/admin/comments/[id]`,
o comentário some da conversa, mas o item continua na timeline de progresso da
solicitação. Em sequências de postar/apagar, o cliente vê entradas duplicadas
ou corrompidas que não somem nunca (foi o que aconteceu na solicitação do HDM —
por isso ela foi deletada e refeita).

**Causa raiz:** a timeline é montada a partir da tabela `Event`
(`COMMENT_CREATED` é criado junto com o comentário em
`workspace-nexo/app/api/admin/requests/[id]/comments/route.ts`), mas o DELETE
do comentário não remove o evento correspondente. Evento fica órfão.

**Correção sugerida:** em `workspace-nexo/app/api/admin/comments/[id]/route.ts`
(DELETE), apagar também o evento — idealmente guardar `commentId` no metadata
do evento na criação e deletar por ele. Limpar os órfãos existentes no banco
(request `cmu11j7av002oju6hmb4zkur1`).

---

## BUG-02 — Comentários da equipe Nexo aparecem como "Cliente" na visão do cliente

**Sintoma:** comentário postado pela API admin (autor = staff Nexo, ex.:
abner@nexo-digital.app) aparece na área do cliente com o rótulo/avatar de
"Cliente".

**Causa raiz:** `workspace-cliente/app/api/requests/[id]/route.ts` (linhas
~49-57) adivinha o autor pelo formato do id:

```ts
authorName: c.authorId?.startsWith('nexo') || c.authorId === 'system'
  ? 'Nexo'
  : c.authorId === session.user.id ? 'Voce' : 'Cliente',
```

Ids de usuário são cuid (`cmrth1lna0005...`), então qualquer staff Nexo cai no
fallback `'Cliente'`.

**Correção sugerida:** resolver o autor de verdade — incluir `author` no
`include` do Prisma (`comments: { orderBy, include: { author: { select: {
name: true, isNexoStaff: true } } } }`) e rotular por `isNexoStaff`/role, não
por string matching de id.

---

## BUG-03 — Vercel bloqueia deploys git em time Hobby quando o autor do commit não é o dono da integração

**Sintoma:** push pro GitHub dispara o deployment, mas ele fica `BLOCKED` para
sempre (sem build, sem logs). Mensagem: *"The deployment was blocked because the
commit author doesn't have permission to create deployments for this project.
Hobby teams do not support collaboration."*

**Contexto:** projeto `hdm` (time `nexodigitalsys-ctrls-projects`, plano Hobby),
repo `Jhin1v9/HDM-Industrial`.

**Resolvido (14/09, manhã):** deixar o repo **público**
(`gh repo edit Jhin1v9/HDM-Industrial --visibility public --accept-visibility-change-consequences`)
destravou o deploy por push — build Ready em ~20s.

**REABERTO (14/09, à tarde — decisão do Abner):** o repo voltou a ficar **privado**.
Deploys disparados por push do GitHub voltaram a travar em UNKNOWN/BLOCKED
(Hobby + repo privado). **Novo fluxo padrão de deploy (funciona com repo privado):**
push normal + `vercel deploy --prod --yes` da raiz do repo (builda no servidor da
Vercel, ~2-4 min; não depende da integração Git). Validar com `vercel ls --yes` +
`curl https://hdm-six.vercel.app/`.

**Alternativa (deploy estático, ~1 min):** export + CLI:

```bash
cp -r out /tmp/hdm-deploy
cd /tmp/hdm-deploy
# vercel.json OBRIGATÓRIO — senão o Vercel usa o preset Next.js do projeto
# e quebra (sem app/), ou serve sem cleanUrls e /pt/, /empresa viram 404
cat > vercel.json <<'EOF'
{
  "cleanUrls": true,
  "buildCommand": "echo static deploy",
  "outputDirectory": ".",
  "installCommand": "echo no install",
  "framework": null
}
EOF
vercel deploy --prod --yes --name hdm
```

**Atenção:** sem `"cleanUrls": true` as rotas limpas (`/pt/`, `/empresa`)
retornam 404, porque o export gera `pt.html` + pasta `pt/` sem `index.html`.

---

## Notas operacionais (não são bugs da plataforma)

- **Comunicação com o cliente (regra de ouro):** zero internals (nunca Vercel,
  GitHub, deploy, bugs, credenciais no painel/relatório do cliente); linguagem
  de leigo traduzida em benefício; tratar pelo nome ("Olá, Matheus!"), assinar
  "Equipe Nexo Digital"; um comentário bem feito por entrega (evita poluir a
  timeline — ver BUG-01).
- **Encoding:** postar JSON com acentos via `curl -d` no Git Bash corrompe
  UTF-8 (mojibake nos comentários). Sempre `--data-binary @arquivo.json` com
  arquivo gravado em UTF-8 + header `Content-Type: application/json; charset=utf-8`.

---

## BUG-04 — Painel admin: detalhe da solicitação fica espremido no canto direito, fora da tela

**Sintoma:** em `/nexo/en/solicitacoes`, ao clicar numa solicitação da lista, o painel de
detalhe (380px) é empurrado para fora da tela à direita. Só aparece diminuindo o zoom da
janela, e mesmo assim ilegível. Reproduzido em 1920×1080.

**Causa raiz (reproduzida e medida via headless Chrome):** o layout da página é
`grid lg:grid-cols-[1fr_380px]` (`workspace-nexo/app/[locale]/(admin)/solicitacoes/page.tsx`,
~linha 444). A trilha `1fr` é `minmax(auto, 1fr)`, cujo mínimo automático é o
**min-content** da tabela. Células de conteúdo com texto longo não quebram
(`data-table.tsx` usa `w-full` sem `table-fixed`; a coluna de título tem `truncate` mas
sem largura efetiva que o force), então o min-content da tabela estoura (~3815px medidos).
O item do grid (overflow visible) não encolhe abaixo disso, o painel vai parar em
x≈4063 e a página ganha scroll horizontal gigante. O `overflow-x-auto` interno do
DataTable nunca é acionado porque o item do grid já nasce largo demais.

**Correção sugerida (uma linha):** no `solicitacoes/page.tsx`, dar `min-w-0` no wrapper
da tabela (a div `cn('transition-opacity', ...)`, ~linha 446) **ou** trocar o template do
grid para `lg:grid-cols-[minmax(0,1fr)_380px]`. Com isso a trilha encolhe, o
`overflow-x-auto` do DataTable passa a funcionar (scroll horizontal dentro do card da
tabela) e o painel de detalhe volta a ficar visível ao lado.

---

## BUG-05 — Sem edição de texto na timeline (staff precisa deletar/refazer para corrigir o que o cliente vê)

**Sintoma:** o texto dos eventos da timeline ("Progreso") fica visível para o cliente
como foi escrito. Se a equipe escrever algo interno por engano (ex.: "bloqueio vercel"),
hoje a única saída é deletar a solicitação inteira e refazer — e deletar evento/comentário
ainda deixa rastro na timeline (BUG-01).

**Situação da API:** o endpoint de edição **já existe e está no ar** —
`PUT /nexo/api/admin/events/[id]` aceita `{ type, description, metadata }`
(`workspace-nexo/app/api/admin/events/[id]/route.ts`; verificado na VPS em 14/09:
retorna JSON 404 para id inexistente, ou seja, a rota existe). A timeline do cliente é
montada a partir da tabela `Event`, então editar o `description` do evento atualiza o
que o cliente vê.

**O que falta é só a UI admin:** `TimelineVertical` (`components/timeline-vertical.tsx`)
só expõe `onDeleteEvent`, e a página só tem `handleDeleteEvent`.
**Correção sugerida:** adicionar `onEditEvent` no `TimelineVertical` (botão editar ao
lado do deletar, inline textarea no item), e na página um `handleEditEvent` chamando o
PUT. Assim qualquer texto interno que vazar pode ser corrigido na hora, sem deletar nada.

---

## Bugs do SITE (HDM) — todos corrigidos em 14/09 (commit `63d2f19`)

Encontrados na auditoria E2E (16 rotas × desktop 1440×900 + mobile 390×844,
scroll ida/volta, back-nav, Request Engine):

1. **Pan lateral no mobile** → `overflow-x: clip` no html.
2. **Scroll do drawer conflitava com o Lenis** (scroll da página "vazava")
   → `lenis.stop()/start()` no open/close + `data-lenis-prevent` no scroller
   interno de `src/features/request/chrome.tsx`.
3. **Parallax cortava imagens** → scale 1.15→1.25.

Além desses, antes da auditoria: **páginas internas ficavam brancas até F5**
(navegação client-side não re-executava o motion). Corrigido com effect deps
`[pathname]` no `MotionProvider` (commit `8c36622`).
