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

cd "$(git rev-parse --show-toplevel)"

echo "==> 1/3 verify (se falhar, nada é publicado)"
npm run verify

echo "==> 2/3 deploy do export estático"
TMP="$(mktemp -d)"
cp -r out "$TMP/out"
cat > "$TMP/vercel.json" <<'EOF'
{
  "cleanUrls": true,
  "buildCommand": "echo static deploy",
  "outputDirectory": ".",
  "installCommand": "echo no install",
  "framework": null
}
EOF
# o vercel.json precisa estar ao lado do conteúdo servido (raiz do deploy)
mv "$TMP/out" "$TMP/dist" 2>/dev/null || true
cd "$TMP/dist"
cp ../vercel.json .
vercel deploy --prod --yes
cd - >/dev/null

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

rm -rf "$TMP"
$ok && echo "PUBLICADO E VALIDADO ✅" || { echo "PUBLICADO COM ROTAS QUEBRADAS — investigue"; exit 1; }
