# Deploy en Vercel + DNS en IONOS — runbook (19/10/2026)

**Decisión**: Vercel para `www.hdmindustrial.es` · DNS del dominio en IONOS
(zona actual: MX IONOS + www→CloudFront viejo + apex→hosting IONOS).
Comparativa previa (Vercel vs Hostinger): `docs/hdm-industrial-hostinger-vs-vercel.md`.

## Estado del repo (listo para Vercel)

- `output: "export"` en `next.config.ts` → Vercel publica el `out/` estático
  (sin functions → **no aplica el límite de 4,5 MB** de Vercel; los forms van
  por `mailto:`, el relay de la VPS `https://vps.nexo-digital.app/hdm-cv` y,
  si se configura, Supabase).
- Build de producción **verificado localmente** (19/10) con
  `NEXT_PUBLIC_SITE_URL=https://www.hdmindustrial.es`:
  sitemap 160 URLs en el dominio canónico, robots.txt, canonical + hreflang
  es/ca/en/pt + x-default, og:url — **cero** restos de `/previas/` ni del
  dominio erróneo `hdm-industrial.es` (fallback de `src/lib/seo.ts` corregido).
- Repo GitHub: `Jhin1v9/HDM-Industrial`, `main` al día.
  (Excepción conocida: `.github/workflows/sync-reviews.yml` no subió — token
  sin scope `workflow`; no afecta al deploy.)

## Paso 1 — Vercel (cuenta con GitHub `Jhin1v9`)

1. <https://vercel.com> → Log in → **Continue with GitHub**.
2. **Add New… → Project** → importar **`Jhin1v9/HDM-Industrial`**.
   Framework auto-detectado **Next.js**; Build/Output con los defaults
   (`next build`; el `output: export` se sirve como estático).
3. **Settings → Environment Variables** (Production):
   - `NEXT_PUBLIC_SITE_URL` = `https://www.hdmindustrial.es`  *(obligatoria)*
   - Opcionales (si el cliente confirma datos): `NEXT_PUBLIC_HDM_PHONE`,
     `NEXT_PUBLIC_HDM_WHATSAPP`, `NEXT_PUBLIC_HDM_EMAIL`,
     `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_HDM_CV_ENDPOINT` **no hace falta** (default ya apunta al
     relay de la VPS).
4. **Deploy** → espera build (~1 min) → URL `hdm-industrial-*.vercel.app` OK.

## Paso 2 — Dominios en Vercel

1. Proyecto → **Settings → Domains**:
   - Añadir **`www.hdmindustrial.es`** → marcarla **Primary**.
   - Añadir **`hdmindustrial.es`** → elegir redirect a `www` (apex→www).
2. Vercel mostrará los registros DNS que espera (coinciden con el Paso 3).

## Paso 3 — DNS en IONOS (panel IONOS → dominios → hdmindustrial.es → Zona DNS)

**NO cambiar los nameservers** (se quedan en IONOS; así el correo no se toca).
Solo crear/ajustar 2 registros:

| Tipo | Nombre | Valor |
|------|--------|-------|
| `CNAME` | `www` | `cname.vercel-dns.com` |
| `A` | `@` (apex / raíz) | `76.76.21.21` |

- **NO tocar los MX** (`mx00/mx01.ionos.de`) — el correo
  (`info@`, `rrhh@`, `administracion@hdmindustrial.es`) sigue entrando igual.
- Bajar el **TTL** de esos 2 registros a 300 s si es posible (acelera el
  cambio); IONOS por defecto 3600 → propagación máxima ~1 h, suele ser minutos.
- Efectos: el apex deja de apuntar al hosting IONOS (217.160.0.76) y `www`
  deja el CloudFront viejo (S3 dic-2025) → ambos pasan a Vercel.
- HTTPS: Vercel emite el cert (Let's Encrypt) solo; tarda 1–5 min tras
  propagar.

## Paso 4 — Post-deploy (lo hace la VPS)

1. Añadir el dominio al **CORS del relay**:
   `/home/nexo/Documentos/VPS/VPS/.env` →
   `HDM_CV_ALLOWED_ORIGIN=https://www.hdmindustrial.es` (sumar al valor
   actual, coma) → `docker compose up -d hdm-cv`.
   Sin esto, forms de **CV y reseñas** dan error CORS desde el dominio nuevo.
2. Smoke test E2E: home (vídeo hero), `/solicitar-personal`, `/resenas`
   (envío de prueba), `/trabaja-con-nosotros`, sitemap.xml, hreflang,
   robots.txt, OG preview.
3. **Apagar lo viejo de AWS** (S3+CloudFront dic-2025) cuando el cliente
   confirme que el sitio nuevo está bien — evita doble coste. No borrar aún:
   sirve de rollback inmediato mientras TTL/propague.

## Verificación final (checklist)

- [ ] `https://www.hdmindustrial.es/` → sitio v2 (vídeo hero, 8 slides)
- [ ] `https://hdmindustrial.es/` → redirect 301 a `www`
- [ ] `https://www.hdmindustrial.es/sitemap.xml` → 160 URLs del dominio
- [ ] `https://www.hdmindustrial.es/robots.txt` → apunta a ese sitemap
- [ ] Google: `site:www.hdmindustrial.es` empieza a reindexar (Search Console
      opcional: añadir propiedad + enviar sitemap)
- [ ] El correo sigue entrando (test a `info@hdmindustrial.es`)
- [ ] Form CV desde el dominio nuevo → 200 (relay VPS + CORS)

## Paso 5 — Google Analytics 4 + Search Console

**GA4** (consent-gated: el script solo carga tras "Aceptar medición"):
1. <https://analytics.google.com> → Administrar (engranaje) → **Crear
   propiedad** → Web → nombre "HDM Industrial" → URL
   `https://www.hdmindustrial.es` → sector "Empleo/Recursos humanos".
2. Copiar el **Medición ID** (`G-XXXXXXXXXX`) → Vercel → Settings →
   Environment Variables → `NEXT_PUBLIC_GA_ID` → **Redeploy**.
3. Verificación: en GA4 → Admin → Flujo de datos → Web → "Verificación de
   etiqueta" (tras aceptar cookies en el sitio, el estado pasa a "Activa").
   Los eventos personalizados del panel de solicitudes
   (`request_started`, `profile_added`…) salen también a GA4.

**Search Console**:
1. <https://search.google.com/search-console> → **+ Añadir propiedad** →
   método **URL prefix** → `https://www.hdmindustrial.es` →
   verificar por **Etiqueta HTML** → copiar el token.
2. Vercel env `NEXT_PUBLIC_GSC_VERIFICATION=<token>` → **Redeploy** →
   volver a Search Console → **Verificar**.
3. Tras propagar el DNS (Paso 3): **Sitemaps** → enviar
   `https://www.hdmindustrial.es/sitemap.xml` (160 URLs).
4. Si la web vieja (CloudFront) ya tenía propiedad en Search Console,
   reutilizar la misma (mismo dominio) y solo reenviar el sitemap; no hace
   falta "cambio de dirección".

Opcional: Vercel → Settings → Web Analytics (el código ya soporta
`window.va`). No duplica GA4 si prefieres solo uno de los dos.

## Avisos

- **Plan Hobby = uso no comercial** (Fair Use de Vercel). Si el sitio es
  comercial (lo es), toca **Pro** (~€16–20/mes). Riesgo de throttling/baja
  en Hobby. Detalle en `docs/hdm-industrial-hostinger-vs-vercel.md`.
- **Solicitudes online** (`/solicitar-personal` → Supabase): sin
  `NEXT_PUBLIC_SUPABASE_*` el comportamiento es el mismo que en preview
  (camino humano/marked). Para activarlo: crear proyecto Supabase + envs.
- **Rollback**: revertir los 2 registros DNS en IONOS a los valores previos
  (`www` → `dzv8y8q2j46h1.cloudfront.net`, apex → `217.160.0.76`).

## Repo

El paso 1 (Vercel) lee `main` de GitHub; cada push a `main` = deploy
automático en producción. Los deploys de preview del VPS
(`/previas/hdm-matheus-v2/`) siguen funcionando en paralelo (script
`scripts/preview-v2-deploy.sh`) — útiles como staging.
