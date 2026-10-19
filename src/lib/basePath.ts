/**
 * Prefixo de basePath para assets referenciados manualmente.
 *
 * next/link e rotas geridas pelo Next aplicam o basePath automaticamente;
 * `<img src="/...">` NÃO aplica. Em builds com subpath (preview VPS:
 * HDM_BASE_PATH), todo asset manual precisa deste prefixo - sem ele as
 * imagens apontam para a raiz do domínio e falham (404/403).
 * Em builds sem subpath, NEXT_PUBLIC_BASE_PATH é vazio e o path sai intacto.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
