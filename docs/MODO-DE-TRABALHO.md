# MODO DE TRABALHO — padrão "extraordinário" da Nexo Digital

> Regra permanente de como trabalhamos, definida pelo Abner em 14/09/2026.
> Vale para este projeto (HDM Industrial) e como padrão da agência.

---

## 1. Engenharia — nunca "de qualquer jeito"

- **Agir como engenheiro sênior.** Antes de implementar, pesquisar referências:
  melhores sites do segmento, exemplos de sucesso, padrões de animação e
  interação premiados.
- **Sempre seguir as melhores práticas atuais (2026)** de performance,
  acessibilidade, SEO e motion (ex.: GSAP + ScrollTrigger + Lenis quando
  fizer sentido, reveals com perspectiva 3D perceptível — não animações
  "tímidas" que o usuário mal nota).
- **Animação tem que ser percebida.** Se o pedido é motion, o cliente precisa
  VER o bloco levantar/entrar — sutil demais é falha, não elegância.
- **Testar tudo em desktop E mobile** antes de entregar: todas as páginas,
  scroll de ida e volta, navegação pra trás (back-nav), drawers e formulários.
  Zero erros de console.
- **Validar antes de declarar pronto:** no site do HDM isso é `npm run verify`
  (lint + typecheck + testes + build + SEO) + conferir a URL no ar. Nunca
  entregar no "acho que funcionou".

## 2. Linguagem por canal (regra de ouro da comunicação)

| Canal | Linguagem | O que fazer |
|---|---|---|
| **Relatório do cliente** (`documentos/relatorios/relatorio.html`, no GitHub) | **TÉCNICA** | Pode e deve citar tecnologias e termos de implementação (GSAP, ScrollTrigger, Lenis, parallax, responsividade, performance, SEO técnico). O relatório é o registro profissional do que foi feito. |
| **VPS / painel do cliente** (comentários nas solicitações, status) | **HUMANA, pra leigos** | Traduzir tudo em benefício: "a página rola mais suave", "os blocos aparecem gradualmente conforme você desce". Zero jargão. |

Em AMBOS os canais, nunca vazar internals operacionais: bloqueios de deploy,
erros de plataforma, credenciais, estado de builds, nomes de serviços
(Vercel/GitHub/Supabase) como problema. Interno fica nos BUGS.md / com o Abner.

### Tom no painel (VPS)
- Tratar o cliente pelo nome: "Olá, Matheus!" / "HDM Industrial".
- Assinar: "Equipe Nexo Digital".
- **Um comentário bem feito por entrega** — a timeline da plataforma não limpa
  comentários apagados (BUG-01), então não poluir.

## 3. Checklist de cada entrega

1. Implementado no padrão da seção 1 (pesquisa + melhores práticas + testes).
2. Validação técnica passando (site: `npm run verify` 100%).
3. Deploy feito e **URL conferida no ar** (repo privado → `vercel deploy --prod --yes`, ver BUG-03).
4. Relatório atualizado — **linguagem técnica**, entrada nova no topo do changelog.
5. Comentário no painel da VPS — **linguagem humana**, um só, bem feito.
6. Bugs/plataforma encontrados no caminho → registrados em `Nexo Workspace\BUGS.md`.
