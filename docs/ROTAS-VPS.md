# ROTAS DA VPS — Nexo (nexo-digital.app) — diagnóstico completo

> Investigado em 14/09/2026 com `curl` + headless Chrome contra a VPS de produção.
> Tudo aqui foi **verificado no ar**, não é especulação. Documento interno.

---

## Mapa real dos apps na VPS (verificado)

| Rota | O que serve | App de verdade |
|---|---|---|
| `/` | Hub estático "NEXO Workspace" com **58 cards** de demos (crm-*, saas-*, tpv-*, erp-*, negocios-*, luna, nexus, store, lp, dashboard, nexo, cliente, admin-tools...) | Página HTML estática (sem login, sem proteção) |
| `/portal/` | **O mesmo hub idêntico** (301 → /portal/) | idem |
| `/dashboard/` | **"NEXO DASHBOARD PRO"** — SPA Vite separada (`/dashboard-app/assets/index-*.js`) | App diferente do workspace Nexo |
| `/nexo/` | Workspace **admin** da Nexo (Next.js, NextAuth) | App correto do admin |
| `/nexo/pt/login` | Login do admin (por idioma) | — |
| `/cliente/` | Workspace do **cliente** (Next.js, NextAuth) | App do cliente |
| `/cliente/login` | Login do cliente | — |
| `/relatorios/` | **"Nexo Digital — Central de Relatórios"** — app próprio (HTML + form) | App separado (Docker) |
| `/crm-ventas/`, `/crm-*`, `/erp-*`, `/saas/*`, `/tpv/*`, `/negocios/*`, `/luna/`, `/nexus/`, `/store/`, `/lp/` | Demos/produtos diversos | Apps/containers separados |
| `/admin-tools/` | 301 → `/admin-tools/vnc.html` (ferramenta VNC) | — |

---

## Os 4 problemas de rota relatados pelo Abner (reproduzidos)

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
- Login no `/cliente` com credencial staff (`abner@nexo-digital.app` / [`senha admin — com o Abner`])
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

---

## App `/relatorios/` (Central de Relatórios) — como funciona

- Login: form `POST /relatorios/entrar` com campos `email`, `senha`, `next`.
  Placeholder do campo senha: *"deixe em branco se for cliente"*.
- **Cliente:** email cadastrado + senha em branco → 303 para
  `/relatorios/clientes/<slug>/` e seta cookie de sessão. As páginas de cliente
  exigem o cookie (sem ele, 303 de volta pro login).
- Verificado: `juninho@nexo-digital.app` (senha vazia) → `/relatorios/clientes/jr-reformas/`
  (200, relatório estático de ~54KB, `<title>Relatório Completo — Jr-Reformas.com</title>`).
- **HDM está como "Em breve"** no card da home: *"O relatório deste projeto ainda
  está sendo diagramado..."*. `hdm-industrial@nexo-digital.app` retorna
  `?erro=1` (email não provisionado + página `/clientes/hdm/` inexistente).
- A versão servida do Jr difere levemente do arquivo local
  (`Junior reformas\docs\03-relatorios\relatorio-jr-reformas.html`) — provável
  ajuste manual na VPS.

### Tarefa: colocar o relatório do Matheus no ar
1. No container do `/relatorios/`, criar `/clientes/hdm/index.html` a partir de
   `HDM INDUSTRIAL\hdm-industrial\documentos\relatorios\relatorio.html` (repo
   `Jhin1v9/HDM-Industrial`, já no ar no GitHub).
2. Provisionar `hdm-industrial@nexo-digital.app` como email de cliente (mesmo
   padrão do Jr: senha em branco).
3. Atualizar o card "Em breve" do HDM na home para linkar o relatório.
4. Testar: login com o email → 303 → relatório visível; sem cookie → redirect
   pro login (mesmo comportamento do Jr).

---

## Correções sugeridas (ordem de impacto)

1. **Pós-login do staff no `/cliente`** → redirect para `/nexo/pt` em vez de `/`
   (bug mais irritante no dia a dia).
2. **Card "Dashboard" do hub** → apontar para `/nexo/` (ou renomear o card).
3. **`/login`** → decidir: landing de escolha (admin vs cliente) ou redirect
   direto pro admin `/nexo/pt/login`.
4. **`pages.error` do NextAuth do `/cliente`** → `/cliente/login`.
5. **`/` e `/portal/`** → decidir o que deve servir (landing Nexo? redirect por
   role? manter hub só em rota interna tipo `/demos/`?).
6. Documentar o mapa nginx (location blocks) — hoje o comportamento só é
   descoberto por tentativa.
