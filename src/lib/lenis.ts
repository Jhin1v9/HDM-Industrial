import type Lenis from "lenis";

/**
 * Registro da instância ativa do Lenis.
 *
 * O MotionProvider cria/destrói o Lenis a cada navegação (pathname); modais
 * como o RequestDrawer precisam pausar o smooth scroll enquanto estão abertos
 * — sem isso a roda sobre o backdrop continua rolando a página por trás do
 * modal (o Lenis anima window.scroll independentemente de
 * body { overflow: hidden }).
 */

let activeLenis: Lenis | null = null;

export function setActiveLenis(instance: Lenis | null): void {
  activeLenis = instance;
}

export function getActiveLenis(): Lenis | null {
  return activeLenis;
}
