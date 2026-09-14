/**
 * Script inline mínimo: marca <html> com .js-reveal ANTES do primeiro paint
 * para que o CSS de scroll reveal só oculte elementos quando JS está ativo.
 * Em export estático sem JS (crawlers, falha de script), nada fica invisível.
 */
export function RevealInit() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.classList.add("js-reveal")`,
      }}
    />
  );
}
