#!/usr/bin/env bash
# Publica o preview v2 do HDM Industrial — build + copy para /var/www + reload Caddy.
# Sem sudo: a cópia usa container (root) e o reload usa a admin API do Caddy (:2019).
# Uso: bash scripts/preview-v2-deploy.sh   (a partir da raiz do repo, ou de qualquer lugar)
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> build (basePath /previas/hdm-matheus-v2)"
HDM_BASE_PATH=/previas/hdm-matheus-v2 NEXT_PUBLIC_BASE_PATH=/previas/hdm-matheus-v2 npm run build

echo "==> copiar out/ -> /var/www/hdm-matheus-v2 (legível pelo user caddy)"
docker run --rm -v "$PWD:/src:ro" -v /var/www:/dst nginx:alpine sh -c \
  "rm -rf /dst/hdm-matheus-v2 && mkdir -p /dst/hdm-matheus-v2 && cp -r /src/out/. /dst/hdm-matheus-v2/ && chmod -R a+rX /dst/hdm-matheus-v2"

echo "==> reload Caddy (admin API)"
curl -s -X POST http://127.0.0.1:2019/load -H "Content-Type: text/caddyfile" \
  --data-binary @/etc/caddy/Caddyfile -o /dev/null -w "reload: %{http_code}\n"

echo "==> pronto: https://vps.nexo-digital.app/previas/hdm-matheus-v2/"
