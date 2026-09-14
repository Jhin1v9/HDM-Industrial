# ENVIAR PRA KIMI — Contexto completo HDM Industrial + Nexo Workspace

> **ARQUIVO ÚNICO DE HANDOFF.** Junta o contexto do projeto, o diagnóstico das
> rotas da VPS e o registro de bugs. Lê isto primeiro.
> Atualizado em **14/09/2026**. Documento **interno** — contém credenciais e
> internals; NUNCA commitar no repo do cliente (é público, o Matheus pode ler).

---

# PARTE 1 — TAREFAS PENDENTES AGORA (ordem de prioridade)

## TAREFA A — Colocar o relatório do Matheus no ar no `/relatorios/`

A Central de Relatórios (`https://vps.nexo-digital.app/relatorios/`, app próprio
em Docker na VPS) lista o HDM como **"Em breve"**. O relatório pronto está no
repo do site: `hdm-industrial\documentos\relatorios\relatorio.html`
(repo GitHub `Jhin1v9/HDM-Industrial`, branch main).

1. No container do `/relatorios/`, criar `/clientes/hdm/index.html` com o
   conteúdo desse `relatorio.html`.
2. Provisionar `hdm-industrial@nexo-digital.app` como email de cliente
   (**sem senha**, como o Jr — o campo senha fica em branco).
3. Trocar o card "Em breve" do HDM na home para linkar o relatório.
4. Testar: `POST /relatorios/entrar` com o email → 303 para
   `/relatorios/clientes/hdm/`; página visível com cookie; sem cookie →
   redirect pro login (mesmo comportamento do Jr).

**Como o app funciona (verificado no ar em 14/09):** login por form
`POST /relatorios/entrar` (campos `email`, `senha` em branco pra cliente, `next`);
cliente válido → 303 → `/relatorios/clientes/<slug>/` + cookie de sessão;
referência funcionando: `juninho@nexo-digital.app` → `/relatorios/clientes/jr-reformas/`
(200, relatório estático ~54KB, `<title>Relatório Completo — Jr-Reformas.com</title>`).
O relatório do Jr servido difere levemente do arquivo local
(`Junior reformas\docs\03-relatorios\relatorio-jr-reformas.html`) — provável
ajuste manual na VPS; conferir quando subir o do Matheus.

## TAREFA B — Corrigir as rotas da VPS (diagnóstico pronto na PARTE 3)

1. Staff loga no `/cliente` e o pós-login manda para `/` (hub de demos) em vez
   de `/nexo/pt`.
2. Card "Dashboard / Panel principal" do hub aponta para `/dashboard/` (NEXO
   DASHBOARD PRO, app errado) em vez de `/nexo/`.
3. `/login` redireciona (nginx) para `/cliente/login`; erro de login do cliente
   vai para `/login?error=...` (config `pages.error` errada do NextAuth).
4. `/` e `/portal/` servem o mesmo hub estático de 58 demos — decidir o que
   deve servir na raiz.

## TAREFA C — Corrigir os bugs da plataforma Nexo (código na VPS, fixes na PARTE 4)

- **BUG-04** (reproduzido): painel admin `/nexo/en/solicitacoes` — detalhe da
  request espremido fora da tela. Fix de uma linha: `min-w-0` no wrapper da
  tabela ou `minmax(0,1fr)_380px` no grid.
- **BUG-05**: falta UI de edição de evento na timeline. A API
  `PUT /nexo/api/admin/events/[id]` **já existe no ar**; falta só `onEditEvent`
  no `TimelineVertical` + `handleEditEvent` na página.
- **BUG-01**: timeline mantém eventos órfãos de comentários deletados; limpar
  órfãos da request `cmu11j7av002oju6hmb4zkur1`.
- **BUG-02**: comentários da staff aparecem como "Cliente" — resolver autor via
  `isNexoStaff` no include do Prisma.

---

# PARTE 2 — CONTEXTO DO PROJETO

## 2.1 Quem é quem

| Papel | Quem |
|---|---|
| Agência (nós) | **Nexo Digital** — dono: Abner |
| Cliente | **Matheus**, dono da **HDM Industrial** |
| Empresa do cliente | Fornecimento de mão de obra industrial (B2B, Espanha + Portugal). **Só fornece pessoal** — nunca fabricante/oficina/executora de obra |

## 2.2 O que é o quê (não confundir as pastas)

- `C:\Users\Abner\Documents\HDM - Industrial\HDM INDUSTRIAL\hdm-industrial` →
  **o site de verdade** (repo Next.js). Toda alteração no site acontece aqui.
- `...\HDM INDUSTRIAL\site-export` → build antigo, **não é código**, ignorar.
- `C:\Users\Abner\Documents\Nexo Workspace` → **nosso** workspace de estudo das
  APIs da plataforma Nexo. O que vale é o que roda na VPS; o local é cópia de
  referência — **não editar o local esperando mudar a VPS**.

## 2.3 Acesso e credenciais

**Site do cliente:**
- Repo GitHub (público): `Jhin1v9/HDM-Industrial`, branch `main`
- Deploy Vercel (via CLI — repo privado, ver BUG-03): **https://hdm-six.vercel.app** (projeto `hdm`,
  time `nexodigitalsys-ctrls-projects`)
- `gh` e `vercel` CLI já autenticados na máquina

**Plataforma Nexo (painel de solicitações):**
- Painel admin: `https://vps.nexo-digital.app/nexo` — APIs em `/nexo/api/admin/...`
- Área do cliente: `/cliente` — APIs em `/cliente/api/...`
- Login NextAuth: `POST /{prefixo}/api/auth/callback/credentials` com csrf de
  `GET /{prefixo}/api/auth/csrf`; cookie `nexo.session-token`
- **Admin:** abner@nexo-digital.app / `.7741@`
- **Cliente (Matheus):** hdm-industrial@nexo-digital.app / `7741`
- **Relatórios:** `hdm-industrial@nexo-digital.app`, **sem senha** (TAREFA A)
- Request ativa do pedido de animação: id `cmu11j7av002oju6hmb4zkur1`,
  projeto "Main WebSite" (`cmtldsn7400087ahwhrmgflvd`), status `IN_DEVELOPMENT`
- Rotas úteis: `GET/PUT/DELETE /nexo/api/admin/requests/[id]` (PUT aceita
  `{status}`; enum: RECEIVED→ANALYZING→PREPARING_SOLUTION→IN_DEVELOPMENT→
  WAITING_CLIENT→CLIENT_REVIEWING→COMPLETED/CLOSED);
  `POST /nexo/api/admin/requests/[id]/comments` com `{content, visibility:"SHARED"}`;
  `DELETE /nexo/api/admin/comments/[id]`;
  `POST /cliente/api/requests` cria solicitação como o cliente `{projectId, content}`.

**Cuidados operacionais:**
- NUNCA postar JSON com acentos via `curl -d` (corrompe UTF-8). Gravar o JSON
  com a ferramenta Write em `C:/Users/Abner/AppData/Local/Temp/` e enviar com
  `--data-binary @arquivo` + `Content-Type: application/json; charset=utf-8`.
- Não servir `out/` com `npx serve` antes do build — trava (EBUSY). Matar o
  processo antes de `npm run verify`.
- Auditoria E2E: `puppeteer-core` + Chrome headless
  (`C:/Program Files/Google/Chrome/Application/chrome.exe`), instalado com
  `npm i --no-save`, rodado com `NODE_PATH="$PWD/node_modules"`.

## 2.4 Fluxo de trabalho obrigatório (a cada mudança no site do HDM)

1. Ler o pedido e o `AGENTS.md` do repo (TS strict, Server Components, conteúdo
   nunca invisível sem JS, nunca sobrescrever trabalho alheio, sem claims
   inventados — sem headcount, sem clientes fictícios, sem fotos stock como
   prova real).
2. Implementar. Motion = atributos `data-*` consumidos pelo `MotionProvider`
   (`src/components/chrome/MotionProvider.tsx`). **Não criar observers paralelos.**
3. `npm run verify` → lint + typecheck + 85 testes + placeholders + claims +
   build + check:seo (148 páginas). **Tudo tem que passar.**
4. `git add -A && git commit && git push origin main` → **repo é privado, o
   Vercel NÃO builda sozinho** (BUG-03). Deploy pela CLI:
   `vercel deploy --prod --yes` da raiz do repo (~2-4 min, builda no servidor
   da Vercel). Validar com `vercel ls --yes` (Ready) + `curl https://hdm-six.vercel.app/<rota>`.
5. Adicionar entrada **NO TOPO** do changelog em
   `documentos/relatorios/relatorio.html` (badge "Entregue") e commitar.
   **ATENÇÃO:** depois disso, replicar a mesma entrada no relatório que está no
   container do `/relatorios/` (TAREFA A) — os dois precisam ficar sincronizados.
6. Postar **UM** comentário SHARED na request ativa
   (`POST /nexo/api/admin/requests/{id}/comments`, `{content, visibility:"SHARED"}`).
7. Bug da plataforma Nexo → registrar no BUGS (PARTE 4); problema de rota →
   registrar na PARTE 3.

## 2.5 Regras de comunicação com o cliente (regra de ouro)

- **Zero internals**: nunca mencionar Vercel, GitHub, deploy, bloqueios, bugs,
  credenciais ou estado de builds no painel do cliente nem no relatório.
- **Linguagem de leigo**: traduzir tudo em benefício ("a página rola mais
  suave", "os blocos aparecem gradualmente"). Sem jargão (GSAP, Lenis, parallax,
  testes, CI).
- Tratar pelo nome: "Olá, Matheus!" / "HDM Industrial". Assinar "Equipe Nexo Digital".
- **Um comentário bem feito** por entrega — a timeline não limpa comentários
  apagados (BUG-01), então não poluir.

## 2.6 Estado entregue no site (tudo no ar, verificado)

1. **Motion GSAP ScrollTrigger + Lenis** (`gsap`, `lenis` nas deps):
   `MotionProvider.tsx` roda como client effect com deps `[pathname]`
   (essencial — re-executa a cada navegação interna; sem isso a página fica
   branca até F5). Portão `.js-reveal` no html via `RevealInit.tsx`; failsafe
   de 2,5s revela `[data-reveal]` oculto; catch remove o portão;
   `prefers-reduced-motion` desliga tudo.
   - Animação **3D perceptível**: reveals sobem `y:64` com `rotationX:-14` +
     `perspective 900`, `power4.out` 1.15s, stagger 0.12; hero com títulos
     split por linha (máscara, yPercent 120→0) + zoom 1.1→1; parallax scale
     1.25 / yPercent ±10.
2. **Fix de navegação client-side** (effect com `[pathname]`, commit `8c36622`).
3. **Auditoria E2E** — 16 rotas × desktop 1440×900 + mobile 390×844, scroll
   ida/volta, back-nav, Request Engine. 3 bugs corrigidos (commit `63d2f19`):
   `overflow-x: clip` no html (pan mobile), drawer pausa Lenis (`lenis.stop()/
   start()` + `data-lenis-prevent` em `src/features/request/chrome.tsx`),
   parallax scale 1.25. Zero erros de console.
4. **Relatório do cliente:** `documentos/relatorios/relatorio.html` no repo
   (estilo Jr-Reformas com identidade HDM: paper #f4f3ef, ink #10151a, signal
   #d9551f, Archivo + IBM Plex Mono). Changelog com entradas novas no topo.
5. Comentários no painel: o mais recente é o da revisão de qualidade.

Último commit: `0d14993`. Repo limpo e sincronizado com `origin/main`.

## 2.7 Pendências conhecidas do site (roadmap — consta no relatório e em `PENDING.md`)

- Contatos reais (telefone/WhatsApp/email via env `NEXT_PUBLIC_HDM_*`)
- Endereço fiscal em Portugal
- Headcount real (**nunca publicar número inventado**)
- Fotos reais da equipe (quando chegarem, substituir as editoriais —
  registrado em `src/content/mediaManifest.json`)
- Certificações específicas
- Ativação Supabase das solicitações

---

# PARTE 3 — ROTAS DA VPS (diagnóstico verificado no ar, 14/09/2026)

## Mapa real dos apps na VPS

| Rota | O que serve | App de verdade |
|---|---|---|
| `/` | Hub estático "NEXO Workspace" com **58 cards** de demos (crm-*, saas-*, tpv-*, erp-*, negocios-*, luna, nexus, store, lp, dashboard, nexo, cliente, admin-tools...) | Página HTML estática (sem login, sem proteção) |
| `/portal/` | **O mesmo hub idêntico** (301 → /portal/) | idem |
| `/dashboard/` | **"NEXO DASHBOARD PRO"** — SPA Vite separada (`/dashboard-app/assets/index-*.js`) | App diferente do workspace Nexo |
| `/nexo/` | Workspace **admin** da Nexo (Next.js, NextAuth); login em `/nexo/pt/login` | App correto do admin |
| `/cliente/` | Workspace do **cliente** (Next.js, NextAuth) | App do cliente |
| `/relatorios/` | **"Nexo Digital — Central de Relatórios"** — app próprio (HTML + form), Docker | App separado |
| `/crm-ventas/`, `/crm-*`, `/erp-*`, `/saas/*`, `/tpv/*`, `/negocios/*`, `/luna/`, `/nexus/`, `/store/`, `/lp/` | Demos/produtos diversos | Apps/containers separados |
| `/admin-tools/` | 301 → `/admin-tools/vnc.html` (ferramenta VNC) | — |

## Os 4 problemas de rota (reproduzidos)

### 1. Acessar `https://vps.nexo-digital.app/` cai direto no "workspace do admin"
Na verdade cai no **hub estático de demos** (`/` serve o HTML do NEXO Workspace com
58 links). Não é o dashboard admin — é uma página de índice sem login. Correção
possível: `/` deveria servir uma landing da Nexo ou redirecionar (nginx) para
onde fizer sentido (`/nexo/login` para staff, ou `/lp` etc.). **Decisão de
produto do Abner necessária.**

### 2. Clicar em "Dashboard" no hub leva pra OUTRO app
O card **"Dashboard / Panel principal"** do hub aponta para `/dashboard/`, que é
o **NEXO DASHBOARD PRO** (SPA Vite, produto separado) — não o dashboard do
workspace Nexo. Correção: o card deve apontar para `/nexo/` (dashboard admin) ou
ser renomeado pra refletir o que é.

### 3. `https://vps.nexo-digital.app/login` não leva ao dashboard — "tira daqui"
- `/login` é redirect **nginx 301 → `/cliente/login`** (o login é do app do CLIENTE).
- Login no `/cliente` com credencial staff (`abner@nexo-digital.app` / `.7741@`)
  **funciona** (sessão com `role: ADMIN, isNexoStaff: true`), mas o pós-login
  devolve **302 para `/`** — o hub de demos. Por isso "loga e me tira daqui".
- Correções: (a) staff autenticado no `/cliente` deveria ser redirecionado para
  `/nexo/pt` (ou o app deveria recusar staff com link pro login certo); (b)
  `/login` deveria ir para `/nexo/pt/login` (admin), não para o login do cliente.
- Falha de login no `/cliente`: NextAuth redireciona o erro para o top-level
  `/login?error=CredentialsSignin` (config errada do `pages.error`), que só
  funciona por acidente via redirect nginx. Deveria ser `/cliente/login`.

### 4. Rotas duplicadas/confusas entre apps
`/dashboard` (301 → `/crm-ventas/dashboard`), `/login` (301 → `/cliente/login`),
`/` e `/portal/` servindo o mesmo hub — parece nginx fazendo alias/redirect por
ordem de location blocks. Falta um mapa de rotas único por app.

## Correções sugeridas (ordem de impacto)

1. **Pós-login do staff no `/cliente`** → redirect para `/nexo/pt` em vez de `/`.
2. **Card "Dashboard" do hub** → apontar para `/nexo/` (ou renomear o card).
3. **`/login`** → decidir: landing de escolha (admin vs cliente) ou redirect
   direto pro admin `/nexo/pt/login`.
4. **`pages.error` do NextAuth do `/cliente`** → `/cliente/login`.
5. **`/` e `/portal/`** → decidir o que deve servir (landing Nexo? redirect por
   role? manter hub só em rota interna tipo `/demos/`?).
6. Documentar o mapa nginx (location blocks) — hoje o comportamento só é
   descoberto por tentativa.

---

# PARTE 4 — BUGS (causas localizadas, verificadas na VPS em 14/09/2026)

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

## Notas operacionais (não são bugs da plataforma)

- **Comunicação com o cliente (regra de ouro):** zero internals (nunca Vercel,
  GitHub, deploy, bugs, credenciais no painel/relatório do cliente); linguagem
  de leigo traduzida em benefício; tratar pelo nome ("Olá, Matheus!"), assinar
  "Equipe Nexo Digital"; um comentário bem feito por entrega (evita poluir a
  timeline — ver BUG-01).
- **Encoding:** postar JSON com acentos via `curl -d` no Git Bash corrompe
  UTF-8 (mojibake nos comentários). Sempre `--data-binary @arquivo.json` com
  arquivo gravado em UTF-8 + header `Content-Type: application/json; charset=utf-8`.

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
