import Link from "next/link";
import type { ComponentProps } from "react";

type LProps = ComponentProps<typeof Link>;

/**
 * Link do site com prefetch desligado.
 *
 * Por quê: o build é 100% estático (output: export). O prefetch RSC do App
 * Router tenta baixar `__next.*.__PAGE__.txt?_rsc=…`, que NÃO EXISTE no
 * export → 404 em toda rota e console poluído (revisão 26/09). Em site
 * exportado o prefetch do router não agrega nada — as páginas .html já são
 * servidas instantaneamente.
 */
export function L(props: LProps) {
  return <Link prefetch={false} {...props} />;
}
