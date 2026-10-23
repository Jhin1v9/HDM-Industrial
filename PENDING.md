## 23/10/2026 — Formularios reais + GA4 em producao
- Contacto: `ContactMailForm` POSTa a `https://vps.nexo-digital.app/hdm-cv/contact` (novo endpoint
  no relay `nexo_hdm_cv`: SMTP IONOS -> info@hdmindustrial.es, replyTo visitante, honeypot,
  5/h/IP); fallback mailto para info@ se o relay falhar. `company.ts` cai em info@ por defeito.
- CV (`/submit`): relay passou a ter credencial (`HDM_CV_SMTP_URL`, From contacto@nexo-digital.app)
  e CORS para www.hdmindustrial.es — envio com anexo operacional (testado 200).
- GA4 `G-RXQ87GDQT9` por defeito em `ga4.ts` (env `NEXT_PUBLIC_GA_ID` ainda tem prioridade),
  restrito a www.hdmindustrial.es / hdmindustrial.es / hdm-six.vercel.app e so apos consentimento.
- Pendente: GSC (token do utilizador) e formulario de solicitacao (Supabase) ainda em modo humano.

# PENDING.md — HDM Industrial

Fatos não confirmados, assets pendentes, claims amber/red, integrações sem credentials.
Nada aqui bloqueia o build. Atualizar quando o cliente confirmar.

---

## Novedades recientes (19/10/2026 — vídeo hero restaurado en TODOS los viewports)

- **Vídeo hero de vuelta en TODOS los viewports (pedido del usuario 19/10,
  tarde)**: primero se restauró solo-en-desktop a petición suya; tras
  investigar el autoplay móvil (pendiente de 12/10) se activó también en
  móviles — decisión: "como teníamos antes, primero comprobar el ordenador
  y luego el móvil". A petición suya pasó a ser la **1.ª diapositiva** del
  slider (antes la 6 de 8; con rotación a 30s tardaba 2,5 min en verse —
  el usuario "no lo veía"). `HeroRotator` renderiza `<video muted loop
  playsInline poster= fotograma preload="metadata">` (`videoSrc:
  "/videos/hdm-hero-obra.mp4"`, 18,4s) sin gating de ancho; pausa/repasa
  según slide activo. `prefers-reduced-motion` sigue quedándose solo con
  imagen (accesibilidad). Si un device real no reproduce el autoplay, el
  `poster` muestra el fotograma → mismo resultado visual que una imagen.
- **Verificación (19/10)**: `npm run verify` OK (180 págs) + deploy preview.
  Playwright: **desktop WebKit** → reproduciendo (`ct=6.3, readyState=4`),
  h1+dots `06 / 08` OK · **móvil WebKit iPhone-emul 390** → reproduciendo
  (`ct=4.5`), `scrollWidth=390` sin overflow · **Chromium** → elemento
  presente con poster (build open-source sin codec H.264 →
  `DEMUXER_ERROR_NO_SUPPORTED_STREAMS` es limitación del navegador de test,
  NO del sitio). OJO: usar la URL **raíz** `/previas/hdm-matheus-v2/` en los
  tests — el español va SIN prefijo (`app/(es)`), `/es/` es un 404 (era el
  error que hizo fallar el primer test, no el sitio).
- **Timing nuevo del rotador (19/10 tarde, revisión del usuario)**: el
  decreto de Matheus de **30s/foto** hacía que el vídeo (slide 1) tardara
  2,5 min en llegar al girar y — peor — **se viera repetir en loop** dentro
  de su propia slide ("tarda bastante o repite el vídeo"). Ahora:
  `durationMs` por slide — **vídeo 19s = 1 clipe completo (18,4s) y pasa,
  sin attribute `loop`** (al re-activarse con `active` hace `currentTime=0`
  y vuelve a empezar limpio) + **fotos 8s** (`PHOTO_MS`) → ciclo completo
  ~75s. Rotación por `setTimeout` reiniciado según la slide activa (los
  clicks de dots reinician también su countdown). Verificado con Playwright:
  ct 3→12→18 sin salto (no loop), 01→02@19s→03@27s→04@35s.
- **Caddy — caché del mp4 (19/10)**: `/videos/*` en el bloque del preview pasa
  de `no-store` (general) a `public, max-age=86400` — si no, cada visita
  re-descargaba los 4MB. HTML sigue `no-store`, `/_next/static` immutable.
  Backup `Caddyfile.bak.20261019.videos-cache`.
- **Repo (19/10)**: push HECHO a `origin/main` con todo el lote 11–19/10
  (galerías, reseñas 4 idiomas, vídeo, deploy script, imágenes cliente…).
  **Excepción**: `.github/workflows/sync-reviews.yml` NO se pudo subir — el
  token gh (tanto el OAuth de `gh auth` como el PAT de
  `~/.git-credentials`) carece del scope `workflow` que GitHub exige para
  crear/modificar workflows por HTTPS; la llave SSH `github_key` de
  `~/.ssh/config` es de OTRO repo (da "Permission denied"). El fichero
  queda en local **ignorado** (`.gitignore`) para no bloquear futuros
  pushes; para subirlo: `gh auth refresh -h github.com -s workflow`
  (dispositivo) y luego `git add -f .github/workflows/sync-reviews.yml` +
  commit + push, o pegarlo desde la web de GitHub.

## Novedades recientes (11/10/2026 — lote imágenes + galerías)

- **Miniaturas sin barra de scroll (11/10 noche)**: la tira de miniaturas
  tenía `overflow-x-auto` con barra nativa visible. Rediseño: **flechas ← →
  a los lados** que hacen scroll suave (70% del ancho por click), deshabilitadas
  en los extremos, scrollbar oculto (`.gallery-no-scrollbar` + `scrollbar-width:
  none`), y la miniatura activa se centra automáticamente al cambiar de imagen
  (`scrollIntoView inline:center`). Verificado Playwright: desktop 0→368→0,
  móvil 0→195, ambas flechas visibles, scrollbarWidth=none.
- **Fix móvil /proyectos (11/10 noche)**: el grid `lg:grid-cols-2` en mobile
  forzaba un ancho mínimo de **994px en viewport de 390px** (causa: los 14
  thumbnails de la galería + `min-width: auto` default de CSS grid items).
  El contenido se cortaba a la derecha ("Como contaremos os projeto[s]").
  Fix: `min-w-0` en los hijos de todos los grids con contenido ancho
  (ProjectsPage, EmpresaPage, CertificationsPage, ProfilesPages). Verificado
  Playwright 390×844 en los 4 idiomas: stageW=282 (fits).
- **Vídeo hero QUITADO del render (12/10/2026, decisión del usuario)**: tras 2
  intentos de autoplay en móvil (v1 con overlay de play, v2 con `<video>`
  oculto hasta confirmar `play()`), el usuario reportó que **sigue bloqueado
  en móvil** → instrucción: "quitarlo y poner solo imágenes". Hero ahora es
  100% `<img>` (rotador 30s + Ken Burns). El mp4 sigue en
  `public/videos/hdm-hero-obra.mp4` y en el manifest (PH-VIDEO-HERO-01, solo
  proveniencia) pero **ninguna página lo referencia**. `HeroRotator.tsx`
  simplificado (sin refs/tap-to-play). Verificado: 0 `<video>` en el DOM,
  8 dots, imagen carga con basePath correcto.
- **El usuario "seguía viendo el vídeo" = caché del móvil (12/10)**: el HTML
  del preview no tenía `Cache-Control` → el navegador del móvil servía la
  versión vieja (con `<video>`) desde caché. Fix en Caddy
  (`/etc/caddy/Caddyfile`, backup `.bak.YYYYMMDD.cache-hdm`): HTML/txt/imagenes
  bajo `/previas/hdm-matheus-v2/` → `no-store, must-revalidate`; assets
  `/_next/static/*` → `immutable` 1 año. **El usuario debe hacer un hard
  refresh la primera vez** (o borrar caché del sitio) para ver la versión
  nueva; después ya nunca se quedará vieja.
- **Hero: primera imagen cambiada a 1920px (12/10)**: el fotograma del vídeo
  (1280×720) iba de primera y se veía borroso estirado en el hero ("mala
  calidad"). Reordenado: `hdm-taller-montaje.jpg` (1920×864) abre el carrusel;
  el fotograma pasa a la posición 7. Verificado Playwright: img naturalWidth=1920.
- **Visor de galería profesional v2** (`GalleryViewer.tsx`): estadio con
  crossfade + Ken Burns sutil, **auto-play** (4,5-5 s, pausa en hover, respeta
  `prefers-reduced-motion`) con barra de progreso, **miniaturas clicables**,
  **lightbox con zoom** (doble clic/toque, pincha, botones +/−, arrastrar para
  pan, teclado ←/→/Esc/+/-). Claves i18n `galleryLabel/Prev/Next/Zoom/Close` ×4.
- **Fix lightbox (11/10 noche)**: el overlay era `position: fixed` dentro de la
  página — el GSAP del MotionProvider aplica transforms en ancestros y eso
  rompe `fixed` (quedaba relativo al ancestro, no al viewport). Solución:
  **`createPortal` al `<body>`** + `useSyncExternalStore` para mounted (evita
  setState en effect, lint react-hooks). Imagen del lightbox en
  `absolute inset-0` + `object-contain` (siempre dentro del ecrã). Fondo
  sólido `#10151a` (no opacidad). Verificado Playwright 25/25: desktop 1280×900
  + móvil 390×844, flechas next/prev funcionan, zoom 160%, Escape cierra,
  imagen fits viewport en ambos.
- **Proyectos** (todas las locales): las 3 miniaturas por ficha → visor con
  **9 fotos reales** de trabajos.
- **Certificaciones**: foto editorial EPI → **imagen 11 real** del cliente
  (soldador con arnés en cesta, `hdm-obra-soldador-gondola.jpg`); se quitó
  la nota «imagen editorial». Bloque de confianza `trustTitle`/`trustBody`
  (borde ok-600); placeholders PH-CERT-* eliminados.
- **Trabaja con nosotros** + **Home (sección Confianza)**: foto EPI editorial
  → **IMG_0078** (`hdm-equipo-taller.jpg`, operario HDM en taller).
- **Empresa**: se quitó el placeholder de retrato de Matheus (pendiente de
  foto real) y se añadió **galería «Trabajos realizados»** (14 fotos reales
  16:9 con auto-play + zoom, clave `company.galleryTitle` ×4).
- **Personal Industrial** (índice + 8 perfiles): foto única o editorial por
  especialidad → **visor con fotos reales por perfil** (`PROFILE_GALLERY` en
  ProfilesPages.tsx). Sin placeholders editoriales en estas páginas.
- **Soluciones + guías + sectores**: se eliminó la repetición de
  `plant-industrial.jpg` — ahora cada artículo/sector usa **una foto real
  distinta** del cliente (`solutionMedia`/`sectorMedia` en InfoPages.tsx;
  fallbacks también reales). Cero fotos editoriales en estas páginas.

## Novedades recientes (10/10/2026)

- **Sistema de reseñas publicado** (port de jr-reformas): sección en la portada +
  página `/resenas` (+ `/reviews` `/avaliacoes` `/ressenyes`), formulario con
  valoración 1-5, filtros, estado vacío honesto (cero testimonios inventados —
  regla AGENTS.md). Moderación vía GitHub Issues: `hdm-cv` extendido con
  `POST /hdm-cv/reviews` (PAT server-side, rate-limit 3/h) → issue label
  `pending-review` → aprobar con label `approved` → `scripts/sync-reviews.mjs`
  escribe `public/data/reviews.json` (workflow `.github/workflows/sync-reviews.yml`).
- **Footer**: iconos Instagram + WhatsApp (sin número visible) en la columna
  logo/tagline; bottom bar = solo copyright; enlace «Reseñas» en columna Empresa.
- **Chips del composer**: grid 2 columnas (antes 3 en desktop), etiquetas cortas
  (`chip` key ×4 idiomas) — «Electromecánicos» cabe sin cortar.
- **Fix GSAP (bug 10/10/2026)**: el reveal 3D (`rotationX` + `transformPerspective:900`)
  **rompía páginas altas** — las guías (~4.000px) quedaban 100% invisibles con JS
  (proyección 3D explotaba el bounding rect → ScrollTrigger las veía «abajo de la
  dobra» → nunca revelaban; el failsafe usaba el mismo rect roto). Fix:
  elementos >1.500px reciben fade plano sin 3D + failsafe pasa a posición de
  layout (`offsetTop`). Ver `MotionProvider.tsx`.
- **Fix Caddy trailing-slash soft-404**: `/soluciones/`, `/resenas/` etc. con
  barra final servían **la home** (try_files caía en `/index.html`); rutas
  desconocidas también devolvían 200-home. Ahora: rewrite de barra final +
  **404 real** para rutas inexistentes (mejor para SEO). Backup:
  `/etc/caddy/Caddyfile.bak.20261010.trailing-slash`.

## Pendientes — sistema de reseñas (activación)

- [ ] **PAT fine-grained** en GitHub (`Jhin1v9/HDM-Industrial`, Issues: Read and write)
      → añadir `HDM_REVIEWS_PAT=ghp_...` al `.env` del VPS + `docker compose up -d hdm-cv`.
      Sin PAT el formulario responde 503 `reviews_not_configured` (honesto, no simula éxito).
- [ ] Subir al repo (cuando toque commit): `scripts/sync-reviews.mjs`,
      `.github/workflows/sync-reviews.yml`, `public/data/reviews.json` (vacío `[]`).
- [ ] Flujo manual hasta que el workflow corra en GitHub: aprobar issue →
      `node scripts/sync-reviews.mjs` con `GITHUB_TOKEN` → redeploy.

## Pendientes — rendimiento / deuda detectada

- [ ] **Home de 250 KB** (HTML): el diccionario completo (~112 KB ES, con las
      4 guías ≥1.000 palabras) se serializa en el RSC payload de cada página que
      pasa `dict` a componentes cliente (`ReviewsSection`, `TeamComposer`, etc.).
      Cada guía añade ~15-20 KB a TODAS las páginas. Opciones: (a) no pasar el
      dict entero a componentes cliente (extraer solo las claves usadas),
      (b) loader de guías bajo demanda, (c) reducir claves serializables.
- [ ] El prefetch de `next/link` sigue deshabilitado (`L.tsx`, correcto para
      export estático): navegación interna = 1 carga completa (~0,3-1,0 s según
      red). Medido 10/10: click guía → contenido a los ~1,06 s (aceptable;
      antes del fix de reveal el usuario percibía «carga eterna» = página en blanco).
- [ ] Retrato de Matheus para Empresa (si el cliente lo envía): `PH-PHOTO-MATHEUS-01`
      sigue `pending` en el registry; la página ya no lo referencia (galería de
      trabajos lo sustituye), solo reactivar si se quiere un bloque «Quién somos».

## Imágenes del cliente — lote 11/10/2026 (clasificado y añadido)

Origen: `/home/nexo/Descargas/HDM/` (40 JPEG numerados + 4 IMG raíz + 5 vídeos).
Revisadas **todas visualmente** una a una. Procesadas con ImageMagick/ffmpeg a
tamaños web (quality 82, ≤1920px). Fuentes: `public/images/cliente/` + `public/videos/`.

**Rellenados (antes = hueco «material pendiente»):**
| Placeholder | Archivo | Foto |
|---|---|---|
| PH-PHOTO-TEAM-01 (empresa) | `hdm-equipo-taller.jpg` 1920×864 | Operario con chaqueta HDM en taller + empilhadeira (IMG_0078) |
| PH-PROJECT-01 (proyectos) | `hdm-proyecto-inox-bomba.jpg` 1600×1200 | Skid inox + bomba azul (IMG_0082, ya era 4:3) |
| PH-PROJECT-02 (proyectos) | `hdm-proyecto-prensa.jpg` 1600×1200 | Prensa/hidráulica grande (IMG_0081, recorte 4:3) |
| PH-PROJECT-03 (proyectos) | `hdm-proyecto-hopper.jpg` 1600×1200 | Hopper/cone inox en taller (HDM-28) |
| PH-VIDEO-HERO-01 (home) | `videos/hdm-hero-obra.mp4` 1280×720 4 MB | Grúa içando depósito inox (IMG_0079.MP4, crf 28) + poster `hdm-video-hero-poster.jpg` — **mp4 já não é renderizado** (12/10, autoplay móvel bloqueado; solo o fotograma segue no hero) |

**Hero rotator (home)**: 7 fotos (fotograma do vídeo primeiro) + editoriais al final — sin vídeo (12/10).

**Catálogo añadido al manifest** (disponibles, aún sin slot en página — usar en
futuras secciones / reemplazar editoriales de perfiles):
`hdm-obra-gondola.jpg` (cesta sobre tubo, cielo azul) · `hdm-tig-brida.jpg`
(cordón TIG arcoíris en brida) · `hdm-obra-estructura.jpg` (arnés entre
tuberías) · `hdm-taller-fabricacion.jpg` (pieza doble brida) ·
`hdm-taller-marco.jpg` (bastidor tubular) · `hdm-tig-proceso.jpg` (tocha+varilla) ·
`hdm-obra-soldador-gondola.jpg` (soldador arnés en cesta).

**Descartados / no usados:** duplicados de calidades (HDM-20≈14, 27≈16, 29≈18,
32≈19, 35≈22, 39≈30, 40≈38), fotos de detalle demasiado cerradas para web,
IMG_0083.MOV (116 MB, piezas pintadas), IMG_0084.MOV (personal fuera de naves),
HDM-41/42.mp4 verticales y <500px (no aptos hero 16:9).
Mejores TIG del lote (HDM-9/33) ya disponibles en catálogo para sustituir la
foto editorial de `profile-tig.jpg` cuando se quiera (actualizar alt del
manifest al hacerlo).

**Sigue pendiente (sin foto en el lote):**
- [ ] **PH-PHOTO-MATHEUS-01** — no hay retrato del responsable; hace falta foto
      vertical ~4:5 de Matheus para la página Empresa.
- [ ] PH-CERT-PRL-01 / PH-CERT-WELDING-01 — escaneos de certificados.
- [ ] PH-TESTIMONIAL-01/02 — textos reales de clientes (sistema de reseñas ya
      publicado; estos son para la página Proyectos).

## Fatos pendentes de confirmação
- [ ] Perfis **eletromecânico** e **mecânico industrial** — solicitados pelo cliente em
      21/09/2026 (solicitação c6kjmmkugoa1h4gnviecd06lh). AGUARDANDO descrição das funções
      antes de criar páginas (Regra Zero). Enquanto isso, os 6 perfis confirmados seguem.
- [ ] Logo própria: PDF recebido em 21/09/2026 via chat (wordmark "HDM INDUSTRIAL",
      engrenagens, PB) — guardado em `documentos/brand/hdm-logo-recebido-20260921.pdf`.
      Pendente: confirmação de versão final + onde aplicar (header/footer/favicon).
      ATENÇÃO: extrair PNG/SVG vetor limpo antes de usar no site.
- [ ] Carrossel de imagens: pendente respostas do cliente (hero vs outras seções;
      autoplay vs manual; fotos próprias vs editoriais) — ver solicitação acima.
- [ ] Headcount real e significado de 54 vs 70 (BLOQUEIO DE PRODUÇÃO — não publicar total).
- [ ] Endereço fiscal completo em Portugal (rua, CP, cidade, NIF).
- [ ] Dados de contacto definitivos: telefone, WhatsApp, email público. O formulário de 7/9/2026
      CONTÉM telefone principal e WhatsApp (números distintos, Doc 06 §73) mas os valores não foram
      transcritos nos documentos — obter com o cliente. "Contatos errados" é LAUNCH BLOCKER (Doc 10 §149).
      Ativar via env: NEXT_PUBLIC_HDM_PHONE / NEXT_PUBLIC_HDM_WHATSAPP / NEXT_PUBLIC_HDM_EMAIL.
- [ ] Decisão comercial pendente: telefone+email ambos obrigatórios ou pelo menos um (Doc 06 §59–60).
      Implementação atual: ambos obrigatórios (conservador B2B).
- [ ] Formato da referência: não congelado nos docs (HDM-A7F2 usado, Doc 09 §59).
- [ ] Documento 08 (Visual Design) não foi entregue: tokens visuais decididos pelo orquestrador
      (docs/adr/001-visual-tokens.md), coerentes com Doc 02 §23 (sem clichês industriais).
- [ ] Setores "engenharia" e "naval" (só no discovery antigo).
- [ ] Certificações específicas: norma, organismo, número, validade (além de "PRL" e "certificados de soldadura" genéricos).
- [ ] Processo operacional oficial passo a passo (timeline do site usa wording conservador).
- [ ] Testemunhos reais de clientes.
- [ ] Cases de projetos publicáveis (modelo "PROYECTO CONFIDENCIAL" em placeholder).

## Assets pendentes (ver src/content/placeholders.ts)
- [x] PH-VIDEO-HERO-01 — mp4 entregado e arquivado; **renderizado como imagem apenas** (12/10: autoplay bloqueado en móvil, decisión del usuario → hero solo fotos).
- [ ] PH-PHOTO-MATHEUS-01 — foto do responsável (NÃO substituir por stock — identidade real).
- [ ] PH-PHOTO-TEAM-01 — foto real da equipe HDM (NÃO substituir por stock como prova).
- [ ] PH-CERT-PRL-01, PH-CERT-WELDING-01 — digitalizações de certificados.
- [ ] PH-PROJECT-01..03 — imagens de projetos reais.
- [ ] PH-TESTIMONIAL-01..02 — testemunhos reais.
- [x] Fotografias editoriais/ambiente (hero, perfis, planta, estrutura, logística, EPI):
      fotos públicas verificadas em public/images/ + mediaManifest.json. Nunca apresentadas como prova HDM.

## Integrações — EXTERNAL ACTIVATION PENDING (código pronto)
- [ ] Supabase: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY (ver .env.example,
      supabase/migrations/). Sem env: DevRequestRepository (persistência local, modo demo sinalizado).
- [ ] Email transacional (notificação de nova solicitud): provider interface pronta; ativação via
      Supabase Edge Function / Resend — credential pendente.
- [ ] **HDM CV relay** (VPS `nexo_hdm_cv`, porta 13475 — SEM banco de dados, decisão do
      Abner 21/09/2026): serviço construído e no ar internamente (uploads em disco privado
      + log JSONL). Falta: (1) rota Caddy `handle /hdm-cv/*` (exige sudo) e (2) credencial
      `HDM_CV_SMTP_URL` ou `HDM_CV_RESEND_API_KEY` no `.env` do VPS + `docker compose up -d hdm-cv`.
      Sem credencial: relay responde 503 `email_not_configured`, guarda o CV em disco e o site
      cai no fluxo mailto/Web Share — nunca simula sucesso (§85).
- [ ] Analytics (Vercel Web Analytics) — carregar só após consentimento de cookies.
- [ ] Domínio final + redirect map OLD→NEW (documentado em docs/redirects.md; aplicar no deploy).

## Claims
- Registry: src/content/claims.ts (status green/amber/red). Claims `red` nunca aparecem em conteúdo público.
