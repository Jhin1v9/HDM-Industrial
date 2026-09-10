# ADR 001 — Visual tokens (na ausência do Documento 08)

## Contexto
O Documento 08 (Visual Design, Interaction & Communication System) não foi entregue nesta sessão.
Nenhum dos 9 documentos define cores hex ou fontes (verificação exaustiva pelo Fact Extractor).
Doc 02 §23 define apenas restrições: sem preto+amarelo segurança, sem textura metálica, sem
stencil, sem faíscas/parafusos/placas diagonais como dependência; grid evidente, preciso, denso
sem poluição, humano. Prompt Supremo §59–60 exige tokens completos e reforça: linhas, estrutura,
contraste, dados, grande tipografia; evitar rounded excessivo, shadows, glass, gradients.

## Decisão (orquestrador, compatível com docs 01–10)
- **Paleta**: tinta profunda azul-aço (#10151A family) + papel quente (#FAF9F6/#F4F3EF) +
  aço neutro + acento "signal" terracota queimado (#D9551F) usado com parcimónia (CTA/foco).
  Sem gradientes vistosos, sem amarelo/preto cliché, sem textura metálica.
- **Tipografia**: Archivo (display+body, grotesca industrial contemporânea, self-hosted via
  next/font, subset latin) + IBM Plex Mono para dados/referências/quantidades.
- **Forma**: radius contido (2–6px), sombras raras e secas, bordas 1px estruturais, grid técnico
  (tech-grid) como fallback visual de placeholders — staging parece intencional.
- **Motion**: ease industrial (0.2,0.6,0.2,1), 140–240ms, só orientação/estado/hierarquia;
  `prefers-reduced-motion` respeitado globalmente.

## Consequências
Quando o Documento 08 existir, revisitar `src/styles/globals.css` (@theme) — único ponto de
verdade dos tokens — sem tocar componentes.
