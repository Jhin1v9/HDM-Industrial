import type { ProfessionExtra } from './profession-extra.js';

export const PT: Record<string, ProfessionExtra> = {
  soldador: {
    when: [
      "Paragem de planta ou manutenção maior com prazos fechados: precisa de soldadores que comecem já esta semana.",
      "Pico de produção no taller: a obra cresce e a sua equipa atual não chega para a soldadura.",
      "Obra nova de estrutura metálica onde o processo de soldadura define o calendário inteiro.",
    ],
    verify: [
      "Certificado de soldadura segundo o processo exigido (TIG, MIG/MAG ou eletrodo), válido.",
      "Formação PRL em dia e experiência comprovada em ambiente industrial real.",
      "Disponibilidade real confirmada pela HDM antes de si se comprometer com alguma coisa.",
    ],
    faq: [
      { q: "Posso pedir só soldadores TIG?", a: "Sim. No pedido indique o processo (TIG, MIG/MAG ou eletrodo) e a HDM verifica equipas com esse certificado concreto." },
      { q: "Trabalham em altura?", a: "Os soldadores com formação específica para trabalhos em altura são indicados no pedido e a HDM confirma." },
      { q: "Quantos soldadores posso pedir?", a: "De um a uma equipa completa. A HDM confirma disponibilidade real antes de confirmar." },
    ],
  },
  calderero: {
    when: [
      "Fabricação ou reparação de depósitos, tubagens ou chapa em planta industrial.",
      "Paragem técnica onde o traçado e conformado da chapa é o caminho crítico.",
      "Montagem de estrutura metálica pesada que exige ofício de caldeireiro experiente.",
    ],
    verify: [
      "Experiência comprovada em caldeirearia industrial: traçado, conformado e montagem.",
      "Formação PRL válida e hábito de trabalho em equipa com prazos.",
      "Disponibilidade real confirmada pela HDM antes de si decidir.",
    ],
    faq: [
      { q: "Os caldeireiros também montam?", a: "Sim, o perfil de caldeireiro inclui montagem de chapa e tubagem. Se precisar só de montagem, veja o perfil de montador." },
      { q: "Podem trabalhar em planta química ou naval?", a: "A HDM verifica a experiência do perfil no setor que indicar no pedido." },
      { q: "Com quanta antecedência devo pedir?", a: "Quanto antes melhor, mas a HDM confirma disponibilidade real em horas úteis sem compromisso." },
    ],
  },
  montador: {
    when: [
      "Levantamento e montagem de estrutura metálica em obra com calendário apertado.",
      "Substituição ou reforço de equipa de montagem durante um pico de obra.",
      "Montagem de equipamentos industriais que exige trabalho em altura e coordenação de içamentos.",
    ],
    verify: [
      "Experiência em montagem de estruturas e trabalho em altura, com formação específica.",
      "Formação PRL válida e ofício comprovado em equipas de obra.",
      "Disponibilidade real confirmada pela HDM antes de si decidir.",
    ],
    faq: [
      { q: "Todos os montadores trabalham em altura?", a: "Os atribuídos a altura têm a formação específica; indique-o no pedido e a HDM confirma." },
      { q: "Podem coordenar içamentos?", a: "O perfil está habituado à coordenação de içamentos em obra; o rigging especializado indica-se à parte." },
      { q: "Deslocam-se fora de Barcelona?", a: "Sim, a cobertura inclui o corredor industrial; indique a localização e a HDM confirma." },
    ],
  },
  electricista: {
    when: [
      "Instalação ou manutenção elétrica em planta: quadros, cablagem e linhas.",
      "Paragem elétrica programada que precisa de reforço qualificado em horas concretas.",
      "Obra industrial onde a instalação elétrica avança em paralelo com a montagem mecânica.",
    ],
    verify: [
      "Qualificação elétrica conforme o trabalho a realizar, com formação PRL válida.",
      "Experiência em instalações industriais: tensão, tipo de quadro e ambiente.",
      "Disponibilidade real confirmada pela HDM antes de si decidir.",
    ],
    faq: [
      { q: "Posso pedir eletricista para manutenção, não só obra?", a: "Sim, o perfil cobre instalação e manutenção elétrica em planta. Indique o tipo de trabalho no pedido." },
      { q: "Trabalham com qualquer tensão?", a: "A HDM verifica a qualificação do perfil conforme a tensão e o tipo de instalação que indicar." },
      { q: "Há também ajudantes de eletricista?", a: "Sim, o perfil de construtor/ajudante complementa a equipa elétrica quando necessário." },
    ],
  },
  eletromecanico: {
    when: [
      "Máquinas com componentes elétricos e mecânicos que avariam e ninguém sabe por onde começar: o perfil eletromecânico cobre os dois.",
      "Manutenção industrial preventiva onde um único perfil reduz paragens e custos de coordenação.",
      "Instalação ou reparação de motores, variadores e quadros juntamente com a parte mecânica.",
    ],
    verify: [
      "Capacidade de diagnóstico conjunto: elétrico e mecânico no mesmo perfil.",
      "Formação PRL válida e experiência comprovada em manutenção eletromecânica industrial.",
      "Disponibilidade real confirmada pela HDM antes de si decidir.",
    ],
    faq: [
      { q: "O que diferencia o eletromecânico do eletricista?", a: "O eletromecânico integra avarias mecânicas e elétricas na mesma máquina; o eletricista centra-se na instalação elétrica." },
      { q: "Serve para manutenção preventiva?", a: "Sim, é uma das suas utilizações principais: instala, mantém e repara máquinas com componentes de ambos os tipos." },
      { q: "Posso pedi-lo juntamente com um mecânico industrial?", a: "Sim, no mesmo pedido adicione ambos os perfis e a HDM confirma a equipa completa." },
    ],
  },
  "mecanico-industrial": {
    when: [
      "Paragens de produção por desgaste de componentes: o mecânico industrial ajusta antes de a linha parar.",
      "Instalação ou reparação de maquinaria de fábrica com calendário de produção a respeitar.",
      "Reforço de manutenção durante campanhas de produção intensiva.",
    ],
    verify: [
      "Experiência comprovada em mecânica industrial: instalação, manutenção e reparação de maquinaria.",
      "Formação PRL válida e ofício comprovado em ambiente fabril.",
      "Disponibilidade real confirmada pela HDM antes de si decidir.",
    ],
    faq: [
      { q: "Que máquinas cobre este perfil?", a: "Maquinaria de fábrica em geral: instala, mantém e repara, ajustando componentes para evitar paragens na produção." },
      { q: "Trabalha junto do eletromecânico?", a: "Sim, complementam-se: o mecânico industrial cobre a parte mecânica pura e o eletromecânico a integrada." },
      { q: "Posso pedi-lo para uma paragem longa de planta?", a: "Sim, indique a duração estimada no pedido e a HDM organiza a equipa." },
    ],
  },
  constructor: {
    when: [
      "Precisa de reforçar uma equipa em obra sem perder tempo em seleção.",
      "Apoio operativo geral: preparação, auxílio a ofícios e tarefas de obra.",
      "Substituições pontuais que não podem parar o ritmo do trabalho.",
    ],
    verify: [
      "Formação PRL básica conforme o ambiente de trabalho, válida.",
      "Ofício verificado e disponibilidade imediata na sua zona.",
      "Disponibilidade real confirmada pela HDM antes de si decidir.",
    ],
    faq: [
      { q: "O ajudante serve para qualquer obra?", a: "Para obra e trabalhos industriais gerais; para ofícios específicos veja os perfis especializados." },
      { q: "Posso pedir ajudantes juntamente com soldadores?", a: "Sim, configure a equipa completa no pedido: perfis especializados mais apoio." },
      { q: "Com que rapidez podem começar?", a: "A HDM confirma disponibilidade real em horas úteis; a incorporação depende da urgência que indicar." },
    ],
  },
  supervisor: {
    when: [
      "Equipa de vários perfis que precisa de coordenação e um interlocutor único.",
      "Obra com exigência de controlo de execução e segurança reforçada.",
      "O senhor não pode estar na obra diariamente e precisa de alguém de confiança por cima.",
    ],
    verify: [
      "Experiência comprovada a coordenar equipas em ambiente industrial.",
      "Formação PRL válida e critério técnico para controlar a execução.",
      "Disponibilidade real confirmada pela HDM antes de si decidir.",
    ],
    faq: [
      { q: "O supervisor substitui o meu chefe de obra?", a: "Não o substitui: coordena a equipa fornecida e informa o senhor. É o interlocutor entre a sua operação e o pessoal." },
      { q: "Posso pedir só supervisor sem equipa?", a: "Sim, se precisar de alguém que organize pessoal próprio ou de outras fontes." },
      { q: "Fala com a minha equipa no meu idioma?", a: "Os perfis são atribuídos conforme o idioma de trabalho que indicar no pedido." },
    ],
  },
};
