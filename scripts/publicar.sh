#!/usr/bin/env bash
# Publica o site HDM em produção com UM comando e valida no ar.
#
#   bash scripts/publicar.sh
#
# O que faz:
#   1. npm run verify (lint + typecheck + testes + build + SEO) — se falhar, não publica
#   2. Deploy do export estático (out/) pela CLI — o mesmo conteúdo validado sobe pro ar
#   3. Validação ao vivo das rotas críticas
#
# Por que deploy do out/ e não vercel deploy do source: mais rápido (~1 min)
# e publica EXATAMENTE o build que o verify aprovou. Requisito: vercel CLI
# autenticada (team nexodigitalsys-ctrls-projects). Ver BUG-03 nos docs internos.
set -euo pipefail

# Garante node/npm/vercel no PATH mesmo em shells enxutas (Git Bash da Kimi,
# cron, background tasks). Caminhos Windows são inócuos no Linux e vice-versa.
for p in "/c/Program Files/nodejs" "$HOME/AppData/Roaming/npm" "$HOME/.local/bin" "/usr/local/bin"; do
  [ -d "$p" ] && export PATH="$p:$PATH"
done

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

echo "==> 1/3 verify (se falhar, nada é publicado)"
npm run verify

echo "==> 2/3 deploy (source → build no servidor da Vercel, ~2-4 min)"
# Deploy da raiz do repo, vinculado ao projeto hdm pelo .vercel local.
# O .vercelignore restringe o upload a ~42KB. O upload de export estático
# (out/) para o projeto hdm aborta na rede (testado 26/09) — source-deploy
# builda no servidor e é o caminho robusto.
vercel deploy --prod --yes --archive=tgz

echo "==> 3/3 validação ao vivo"
ok=true
for route in "/" "/trabaja-con-nosotros" "/personal-industrial" "/cookies" "/en" "/pt" "/ca"; do
  for i in 1 2 3 4 5 6; do
    CODE="$(curl -s -o /dev/null -w "%{http_code}" "https://hdm-six.vercel.app$route")"
    [ "$CODE" = "200" ] && break
    sleep 5
  done
  printf "  %-28s %s\n" "$route" "$CODE"
  [ "$CODE" = "200" ] || ok=false
done

$ok && echo "PUBLICADO E VALIDADO ✅" || { echo "PUBLICADO COM ROTAS QUEBRADAS — investigue"; exit 1; }
