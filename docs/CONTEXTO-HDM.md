# CONTEXTO HDM INDUSTRIAL — Handoff para a próxima IA

> **LEIA ESTE ARQUIVO PRIMEIRO.** Resumo completo do projeto + as tarefas pendentes.
> Atualizado em **14/09/2026**. Espelho dos bugs: `docs\BUGS-NEXO.md` e
> `docs\ROTAS-VPS.md` nesta mesma pasta; originais em `Nexo Workspace\BUGS.md`
> e `Nexo Workspace\ROTAS-VPS.md`.

---

## 0. TAREFAS PENDENTES AGORA (ordem de prioridade)

### TAREFA A — Colocar o relatório do Matheus no ar no `/relatorios/`
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

**Como o app funciona (verificado no ar):** login por form
`POST /relatorios/entrar` (`email`, `senha` em branco pra cliente, `next`);
cliente válido → 303 → `/relatorios/clientes/<slug>/` + cookie de sessão;
referência funcionando: `juninho@nexo-digital.app` → `/relatorios/clientes/jr-reformas/`.
O relatório do Jr servido difere levemente do arquivo local (ajuste manual na VPS).

### TAREFA B — Corrigir as rotas da VPS (diagnóstico pronto)
Documento completo com causa de cada um: **`docs\ROTAS-VPS.md`**. Resumo:
1. Staff loga no `/cliente` e o pós-login manda para `/` (hub de demos) em vez
   de `/nexo/pt` → fix no redirect pós-login do app cliente.
2. Card "Dashboard / Panel principal" do hub aponta para `/dashboard/` (NEXO
   DASHBOARD PRO, app errado) em vez de `/nexo/`.
3. `/login` redireciona (nginx) para `/cliente/login`; erro de login do cliente
   vai para `/login?error=...` (config `pages.error` errada do NextAuth).
4. `/` e `/portal/` servem o mesmo hub estático de 58 demos — decidir o que
   deve servir na raiz.

### TAREFA C — Corrigir os bugs da plataforma Nexo (código na VPS)
Causas localizadas e fixes sugeridos em `docs\BUGS-NEXO.md`:
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

## 1. Quem é quem

| Papel | Quem |
|---|---|
| Agência (nós) | **Nexo Digital** — dono: Abner |
| Cliente | **Matheus**, dono da **HDM Industrial** |
| Empresa do cliente | Fornecimento de mão de obra industrial (B2B, Espanha + Portugal). **Só fornece pessoal** — nunca fabricante/oficina/executora de obra |

## 2. O que é o quê (não confundir as pastas)

- `C:\Users\Abner\Documents\HDM - Industrial\HDM INDUSTRIAL\hdm-industrial` →
  **o site de verdade** (repo Next.js). Toda alteração no site acontece aqui.
- `...\HDM INDUSTRIAL\site-export` → build antigo, **não é código**, ignorar.
- `C:\Users\Abner\Documents\Nexo Workspace` → **nosso** workspace de estudo das
  APIs da plataforma Nexo. O que vale é o que roda na VPS; o local é cópia de
  referência — **não editar o local esperando mudar a VPS**.
- Este arquivo + `docs\` aqui = documentação interna. **NUNCA commitar estes
  MDs no repo do cliente** (é público; há credenciais e internals).

## 3. Acesso e credenciais

**Site do cliente:**
- Repo GitHub (público): `Jhin1v9/HDM-Industrial`, branch `main`
- Deploy automático Vercel: **https://hdm-six.vercel.app** (projeto `hdm`,
  time `nexodigitalsys-ctrls-projects`)
- `gh` e `vercel` CLI já autenticados na máquina

**Plataforma Nexo (painel de solicitações):**
- Painel admin: `https://vps.nexo-digital.app/nexo` — APIs em `/nexo/api/admin/...`
- Área do cliente: `/cliente` — APIs em `/cliente/api/...`
- Login NextAuth: `POST /{prefixo}/api/auth/callback/credentials` com csrf de
  `GET /{prefixo}/api/auth/csrf`; cookie `nexo.session-token`
- **Admin:** abner@nexo-digital.app / [`senha admin — com o Abner`]
- **Cliente (Matheus):** hdm-industrial@nexo-digital.app / [`senha cliente — com o Abner`]
- **Relatórios:** `hdm-industrial@nexo-digital.app`, **sem senha** (ver TAREFA A)
- Request ativa do pedido de animação: id `cmu11j7av002oju6hmb4zkur1`,
  projeto "Main WebSite" (`cmtldsn7400087ahwhrmgflvd`), status `IN_DEVELOPMENT`

**Cuidados operacionais:**
- NUNCA postar JSON com acentos via `curl -d` (corrompe UTF-8). Gravar o JSON
  com a ferramenta Write em `C:/Users/Abner/AppData/Local/Temp/` e enviar com
  `--data-binary @arquivo` + `Content-Type: application/json; charset=utf-8`.
- Não servir `out/` com `npx serve` antes do build — trava (EBUSY). Matar o
  processo antes de `npm run verify`.
- Auditoria E2E: `puppeteer-core` + Chrome headless
  (`C:/Program Files/Google/Chrome/Application/chrome.exe`), instalado com
  `npm i --no-save`, rodado com `NODE_PATH="$PWD/node_modules"`.

## 4. Fluxo de trabalho obrigatório (a cada mudança no site do HDM)

1. Ler o pedido e o `AGENTS.md` do repo (TS strict, Server Components, conteúdo
   nunca invisível sem JS, nunca sobrescrever trabalho alheio, sem claims
   inventados — sem headcount, sem clientes fictícios, sem fotos stock como
   prova real).
2. Implementar. Motion = atributos `data-*` consumidos pelo `MotionProvider`
   (`src/components/chrome/MotionProvider.tsx`). **Não criar observers paralelos.**
3. `npm run verify` → lint + typecheck + 85 testes + placeholders + claims +
   build + check:seo (148 páginas). **Tudo tem que passar.**
4. `git add -A && git commit && git push origin main` → Vercel builda sozinho
   (~75s; build bloqueado = ver BUG-03). Validar no ar com
   `curl https://hdm-six.vercel.app/<rota>`.
5. Adicionar entrada **NO TOPO** do changelog em
   `documentos/relatorios/relatorio.html` (badge "Entregue") e commitar.
   **ATENÇÃO:** depois disso, replicar a mesma entrada no relatório que está no
   container do `/relatorios/` (TAREFA A) — os dois precisam ficar sincronizados.
6. Postar **UM** comentário SHARED na request ativa
   (`POST /nexo/api/admin/requests/{id}/comments`, `{content, visibility:"SHARED"}`).
7. Bug da plataforma Nexo → registrar em `Nexo Workspace\BUGS.md` + espelho
   em `docs\BUGS-NEXO.md`; problema de rota → `Nexo Workspace\ROTAS-VPS.md` +
   espelho em `docs\ROTAS-VPS.md`.

## 5. Regras de comunicação com o cliente (regra de ouro)

- **Zero internals**: nunca mencionar Vercel, GitHub, deploy, bloqueios, bugs,
  credenciais ou estado de builds no painel do cliente nem no relatório.
- **Linguagem de leigo**: traduzir tudo em benefício ("a página rola mais
  suave", "os blocos aparecem gradualmente"). Sem jargão (GSAP, Lenis, parallax,
  testes, CI).
- Tratar pelo nome: "Olá, Matheus!" / "HDM Industrial". Assinar "Equipe Nexo Digital".
- **Um comentário bem feito** por entrega — a timeline não limpa comentários
  apagados (BUG-01), então não poluir.

## 6. Estado entregue no site (tudo no ar, verificado)

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
3. **Auditoria E2E** — 16 rotas × desktop + mobile, scroll ida/volta, back-nav,
   Request Engine. 3 bugs corrigidos (commit `63d2f19`): `overflow-x: clip` no
   html (pan mobile), drawer pausa Lenis, parallax scale 1.25. Zero erros de
   console.
4. **Relatório do cliente:** `documentos/relatorios/relatorio.html` no repo
   (estilo Jr-Reformas com identidade HDM: paper #f4f3ef, ink #10151a, signal
   #d9551f, Archivo + IBM Plex Mono). Changelog com entradas novas no topo.
5. Comentários no painel: o mais recente é o da revisão de qualidade.

Último commit: `0d14993`. Repo limpo e sincronizado com `origin/main`.

## 7. Pendências conhecidas do site (roadmap — consta no relatório e em `PENDING.md`)

- Contatos reais (telefone/WhatsApp/email via env `NEXT_PUBLIC_HDM_*`)
- Endereço fiscal em Portugal
- Headcount real (**nunca publicar número inventado**)
- Fotos reais da equipe (quando chegarem, substituir as editoriais —
  registrado em `src/content/mediaManifest.json`)
- Certificações específicas
- Ativação Supabase das solicitações
