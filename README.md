# HDM Industrial — Plataforma digital B2B

Sitio web corporativo + motor de solicitudes (HDM Request Engine) para
**HDM Industrial**, empresa de **suministro de personal industrial cualificado**
(soldadores TIG/MIG-MAG/electrodo, caldereros, montadores, electricistas
industriales, ayudantes y supervisores) para clientes B2B en España y Portugal.

> HDM **no** es fabricante ni taller: suministra personal. Toda la comunicación
> del sitio parte de esa verdad (ver `AGENTS.md` y `FACTS_CONFIRMED.md`).

## Stack

- **Next.js 16.3.4** (App Router, `output: "export"` — sitio 100% estático)
- **React 19**, **TypeScript strict** (`noUncheckedIndexedAccess`)
- **Tailwind CSS v4** (tokens en `src/styles/globals.css`, ADR 001)
- **Zod v4** (esquema compartido cliente/servidor/tests)
- **Vitest** + Testing Library
- **npm** (lockfile único: `package-lock.json`)

## Comandos

```bash
npm install          # instalar dependencias
npm run dev          # desarrollo local
npm run build        # build estático → out/
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test         # vitest run
npm run check:placeholders  # estado de placeholders por prioridad
npm run check:claims        # escaneo de afirmaciones prohibidas (CI)
npm run check:seo           # h1/title/canonical en el HTML generado (post-build)
npm run verify              # puerta de calidad completa (lint+types+tests+checks+build)
```

## Variables de entorno (`.env.example`)

| Variable | Para qué | Obligatoria |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical/hreflang/sitemap | Producción |
| `NEXT_PUBLIC_HDM_PHONE` | Teléfono visible + CTA de llamada | Pendiente cliente |
| `NEXT_PUBLIC_HDM_WHATSAPP` | Handoff de WhatsApp (wa.me) | Pendiente cliente |
| `NEXT_PUBLIC_HDM_EMAIL` | Contacto directo / formulario mailto | Pendiente cliente |
| `NEXT_PUBLIC_SUPABASE_URL` | Persistencia real de solicitudes | Activación externa |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Persistencia real (RLS insert-only) | Activación externa |
| `NEXT_PUBLIC_DEMO_MODE` | `true` permite el repositorio demo en build de producción (preview/staging) | No |

**Sin backend configurado, producción NUNCA simula éxito** (§85): el envío
online se desactiva con un camino humano funcional (WhatsApp/teléfono) y la
solicitud se conserva intacta.

## Arquitectura

```
app/
  (es)/                 # Español en la raíz (/) — layout propio con <html lang="es">
  (localized)/pt|en|ca  # Árboles localizados (/pt/, /en/, /ca/)
  sitemap.ts robots.ts icon.svg
src/
  domain/               # CONTRATO: tipos, esquema Zod, helpers puros, persistencia
  content/              # REGISTROS: perfiles, cobertura, sectores, soluciones,
                        #   claims, placeholders, páginas, empresa, mediaManifest
  i18n/                 # Diccionarios es/ca/en/pt (tipo Dictionary único)
  features/request/     # Request Engine: store, composer, steps, panel, chrome,
                        #   submit, whatsapp, format
  features/coverage/    # Mapa SVG propio de zonas de proyecto
  features/analytics/   # Eventos unificados, gate de consentimiento real
  server/requests/      # RequestRepository: Supabase (prod) + Dev (demo honesto)
  components/           # Chrome (header/footer/consent/shell) + páginas
  lib/                  # seo (canonical/hreflang), fonts
scripts/                # check-placeholders / check-claims / check-seo
supabase/migrations/    # SQL: personnel_requests + perfiles + adjuntos (RLS)
tests/                  # Vitest (dominio + componentes)
docs/adr/               # Decisiones de arquitectura (001: tokens visuales)
```

### Rutas e i18n

- Español en la raíz; `pt`/`en`/`ca` con prefijo. Slugs de sección localizados
  (Doc 05 §42) definidos en `src/content/pages.ts` (`sectionSlugs`);
  `localizedPath()` traduce rutas canónicas ES → locale y
  `esPathFromLocalized()` hace la inversa (selector de idioma).
- Los **IDs de dominio son independientes del idioma** (`profession=soldador`,
  `specialization=tig`): solo las etiquetas se traducen. La solicitud sobrevive
  a cambios de idioma.
- SEO: canonical por locale, hreflang es/ca/en/pt + `x-default→es`,
  `noindex` en rutas legales, la página de solicitud y el sector petroquímica.

### Request Engine (producto central)

- Compositor multiperfil (expert/assisted), valor antes que datos (§33: los
  datos de contacto solo al final), resumen editable, éxito SOLO tras
  persistencia real, fallo conserva la solicitud + handoff WhatsApp.
- Estado: React Context + useReducer; borrador en `localStorage`
  (`hdm.request.v1`, TTL 14 días, **PII eliminada** — los datos de contacto
  viven solo en memoria hasta el envío, Doc 09 §97).
- CTA semántico en todo el sitio: **"Solicitar disponibilidad"** — nunca
  Comprar/Reservar/Contratar.

### Registros (single source of truth)

Contenido estructural en `src/content/`: añadir un perfil/sector/zona/solución
al registro correspondiente propaga rutas, sitemap, SEO y UI. El manifiesto de
medios (`mediaManifest.json`) documenta cada foto: origen, licencia (Unsplash/
Pexels), dimensiones y verificación. Las fotos son **editoriales** — nunca se
presentan como instalaciones/personal de HDM (ver `AGENTS.md`).

### Placeholders

Todo dato no confirmado vive en `src/content/placeholders.ts` con prioridad
(P0 bloquea release, P1/P2 diferibles). `npm run check:placeholders` informa
del estado; los P0 bloquean CI en producción.

## Tests

`npm run test` — dominio (esquema, reducer, totales, referencia,
serialización/PII, caducidad, WhatsApp, subidas) y componentes
(QuantityStepper, TeamComposer, RequestIndicator).

## Despliegue

1. `npm run verify` debe pasar completo.
2. Configurar variables de entorno de producción.
3. `npm run build` → `out/` (estático: cualquier hosting/CDN).
4. Redirects: configurar en el hosting según `docs/redirects.md`.
5. Supabase: aplicar `supabase/migrations/0001_personnel_requests.sql` antes
   de activar las variables `NEXT_PUBLIC_SUPABASE_*`.

## Limitaciones conocidas (decisiones documentadas)

- **Backend del Request (ACTIVACIÓN EXTERNA PENDIENTE):** el export es
  estático; la persistencia real en producción exige Supabase
  (`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + migración
  `0001`). Sin esas credenciales: build con `NEXT_PUBLIC_DEMO_MODE=true`
  persiste de verdad en el archivo local del navegador y lo etiqueta como
  "entorno de demostración"; build de producción sin backend **falla
  explícitamente con camino humano** (nunca simula éxito, §85). Verificado E2E
  en ambos modos (11/11 checks cada uno).
- **Inserción Supabase no transaccional:** la escritura es
  `personnel_requests` → `request_profiles` → `request_attachments` en tres
  POSTs; un fallo intermedio puede dejar filas huérfanas (aceptable para un
  inbox de leads; mitigable con una RPC transaccional si se requiere).
- **Archivo dev (`hdm.request.archive.v1`):** archivo de staging del entorno
  demo. Aplica el mismo invariante de PII que el draft: el contacto se guarda
  vacío y la dirección fina se omite; lista limitada a las últimas 20
  submisiones. No se usa en producción.
- **Multi-pestaña:** el draft usa una única clave de localStorage
  (last-writer-wins). Dos pestañas editando a la vez se sobrescriben el draft;
  limitación conocida y aceptada (una solicitud por navegador).
- **404 estático:** `404.html` usa el diccionario ES (fallback estático
  documentado) con `lang="es"`.
- **Contactos (teléfono/WhatsApp/email):** se activan con
  `NEXT_PUBLIC_HDM_PHONE` / `NEXT_PUBLIC_HDM_WHATSAPP` / `NEXT_PUBLIC_HDM_EMAIL`.
  Sin ellas, ningún enlace falso se renderiza (verificado E2E).

## Documentos de gobierno

- `AGENTS.md` — reglas obligatorias para cualquier cambio (verdades de
  negocio, prohibiciones, fotos, CTA, verificación).
- `FACTS_CONFIRMED.md` — únicos hechos seguros.
- `PENDING.md` — datos pendientes del cliente (bloqueantes y diferibles).
- `SWARM_ARCHITECTURE.md` — ownership y waves del proceso de construcción.
- `docs/photo-provenance.md` — registro de procedencia y licencias de las 12
  fotografías editoriales (12/12 con licencia de uso comercial).
