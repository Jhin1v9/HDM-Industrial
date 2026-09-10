# AGENTS.md — Regras obrigatórias para qualquer agente neste repo

## Verdades inegociáveis
- NO fake availability. Nunca mostrar disponibilidade live, stock, % capacidade.
- NO fake headcount. Nunca publicar 54/70 nem total de profesionales.
- NO invented certifications. Apenas "PRL" e "certificados de soldadura" genéricos.
- NO invented clients, NO invented cases, NO invented testimonials.
- NO stock photography as primary proof. Fotos em public/images/ são editoriais/ambiente;
  nunca legendá-las como equipe/projetos/instalações reais da HDM.
- HDM SUMINISTRA PERSONAL. Nunca posicionar como fabricante/oficina/executora de obra.
- CTA principal: "Solicitar disponibilidad". Nunca "Comprar/Reservar/Contratar ahora".
- Cliente B2B é o usuário primário. Sem CTA de recrutamento competindo.

## Engenharia
- Preserve Request state: navegação e troca de idioma NÃO podem apagar a solicitud.
- IDs de domínio são locale-independent (profession=welder, specialization=tig); só labels mudam.
- Client uploads são PRIVATE: MIME allowlist, size limit, random path, signed access. Nunca bucket público.
- Não gerar matriz SEO perfil×cidade×setor automaticamente.
- Não sobrescrever trabalho não relacionado do usuário. Nunca `git reset --hard` contra trabalho alheio.
- TypeScript strict. Evitar `any`.
- Server Components por padrão; Client Components só onde necessário (Request, mapa, drawers, uploader).
- Single source of truth: src/content/* (registries). Não duplicar fatos hardcoded.
- Run `npm run verify` antes de declarar done.
- Fotos novas: somente públicas/licenciadas, full HD, verificadas (HTTP 200 + revisão visual de contexto),
  registradas em src/content/mediaManifest.json.

## Hierarquia de verdade
1. Respostas mais recentes do cliente/briefing
2. Documentos estratégicos 01–10
3. Discovery anterior
4. Código/site antigo
5. Inferência

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
