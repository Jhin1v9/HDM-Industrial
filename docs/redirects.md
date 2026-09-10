# Redirects — HDM Industrial

Static export (`output: "export"`) means redirects are handled at the hosting
layer (CDN / web server), not by Next.js. This document is the authoritative
list to configure at launch.

## Language entry

| From | To | Type | Notes |
| --- | --- | --- | --- |
| `/pt`, `/en`, `/ca` (no trailing slash) | `/{locale}/` | 301 | Trailing-slash normalization (host default). |

## Legacy / defensive aliases (only if a previous site existed at the domain)

Configure only after confirming the legacy URL inventory with the client.
Candidate aliases (do NOT create until confirmed — inventing redirects for
never-existing URLs pollutes the sitemap):

| From | To | Type |
| --- | --- | --- |
| `/personal` | `/personal-industrial` | 301 |
| `/soldadores` | `/personal-industrial/soldadores-industriales` | 301 |
| `/servicios` | `/soluciones` | 301 |
| `/contact` | `/contacto` | 301 |
| `/en` (root only, if legacy EN site existed) | `/en/` | 301 |

## Rules that must NEVER exist

- No redirect from `/solicitar-personal` to a WhatsApp link (the page must
  work as a page; WhatsApp is a handoff option, not a destination).
- No locale auto-redirect by IP/browser language (§44: language switch is
  always user-driven; hreflang handles SEO).
- No redirect chains (max 1 hop).

## Notes

- Spanish lives at the root (`/`); pt/en/ca under their prefixes. There is no
  `/es/` prefix — do not create one.
- `petroquímica` sector page exists but is `noindex` until HDM has its own
  proof for that sector (Doc 07 §104); it must NOT be redirected away.
