/**
 * Dicionário PT (raiz /pt/) — português europeu, profissional, direto, natural.
 * Copy conservador: sem claims sem prova (ver claims.ts). Sem lorem ipsum.
 */
import type { Dictionary } from "./es";

export const pt = {
  meta: {
    siteName: "HDM Industrial",
    defaultTitle: "HDM Industrial — Pessoal industrial qualificado, onde precisa dele",
    defaultDescription:
      "Fornecimento de pessoal industrial qualificado: soldadores TIG, MIG/MAG e eletrodo, caldeireiros, montadores, eletricistas, eletromecânicos, mecânicos industriais e supervisores. Diga-nos do que precisa e a HDM revê a disponibilidade.",
    ogDescription:
      "Configure a sua necessidade de pessoal industrial em minutos. A HDM revê a disponibilidade e os requisitos antes de confirmar a proposta.",
  },
  nav: {
    profiles: "Pessoal industrial",
    solutions: "Soluções",
    sectors: "Setores",
    coverage: "Cobertura",
    howWeWork: "Como trabalhamos",
    certifications: "Certificações e segurança",
    projects: "Projetos",
    company: "Empresa",
    contact: "Contacto",
    request: "Solicitar pessoal",
    myRequest: "O meu pedido",
    menu: "Menu",
    close: "Fechar",
    language: "Idioma",
  },
  common: {
    requestCta: "Solicitar disponibilidade",
    requestPersonal: "Solicitar pessoal",
    addToRequest: "Adicionar ao meu pedido",
    added: "Adicionado",
    viewRequest: "Ver pedido",
    editRequest: "Editar",
    remove: "Remover",
    back: "Voltar",
    next: "Continuar",
    professionals: "profissionais",
    professional: "profissional",
    profilesLabel: "perfis",
    profileLabel: "perfil",
    from: "Desde",
    readMore: "Ver mais",
    editorialPhoto: "Imagem editorial de ambiente industrial. Não representa instalações nem pessoal da HDM.",
    pendingAsset: "Espaço reservado para material real da HDM",
    navPrimary: "Navegação principal",
    navPrimaryMobile: "Navegação principal móvel",
    requestProgress: "Progresso do pedido",
    requestMode: "Modo de pedido",
    spain: "Espanha",
    portugal: "Portugal",
    whatsapp: "WhatsApp",
    call: "Ligar",
    email: "Email",
    allProfiles: "Ver todos os perfis",
    startRequestHere: "Começar pedido com este perfil",
    startRequestArea: "Planear um projeto nesta zona",
    startRequestSolution: "Solicitar esta solução",
  },
  home: {
    heroEyebrow: "Fornecimento de pessoal industrial qualificado",
    heroTitle: "O pessoal industrial de que precisa, onde precisa dele.",
    heroLead:
      "Soldadores TIG, MIG/MAG e eletrodo, caldeireiros, montadores, eletricistas industriais e supervisores. Configure a sua necessidade e a HDM revê a disponibilidade antes de confirmar.",
    heroNote:
      "Sem compromisso: o seu pedido não confirma disponibilidade. A HDM revê-o e responde.",
    heroStart: "Começar o meu pedido",
    heroSecondary: "Ver perfis industriais",
    scaleEyebrow: "Capacidade organizada",
    coverageEyebrow: "Cobertura",
    processEyebrow: "Como trabalhamos",
    trustEyebrow: "Certificações e segurança",
    sectorsEyebrow: "Setores",
    solutionsEyebrow: "Soluções",
    scale: {
      profiles: "tipos de perfil",
      specializations: "especialidades de soldadura",
      modes: "modalidades operacionais",
      areas: "zonas de projeto",
      sectors: "setores confirmados",
    } as Record<string, string>,
    heroComposerTitle: "Configure a sua equipa",
    heroComposerNote: "O seu pedido acompanha-o enquanto navega. Nada é enviado até que o decida.",
    profilesTitle: "De que perfil precisa?",
    profilesLead:
      "Selecione perfis e quantidades. Pode combinar vários perfis no mesmo pedido.",
    coverageTitle: "Onde está o seu projeto?",
    coverageLead:
      "Zonas onde a HDM fornece pessoal para projetos. Selecione a sua zona para começar: a cobertura indica área de trabalho, não disponibilidade em tempo real.",
    processTitle: "Da necessidade à mobilização",
    processLead:
      "Um processo claro, sem promessas vazias: o cliente define a necessidade, a HDM confirma o que pode pôr em marcha.",
    processSteps: [
      {
        title: "Configure a sua necessidade",
        body: "Perfis, especialidades, quantidades, local, datas e logística. Sem formulários burocráticos: uma configuração clara.",
      },
      {
        title: "A HDM revê a disponibilidade",
        body: "A equipa da HDM revê perfis, requisitos e documentação antes de confirmar o que quer que seja.",
      },
      {
        title: "Proposta e mobilização",
        body: "Recebe uma proposta concreta. Se o projeto o exigir, a HDM gere a deslocação, o alojamento, o transporte e as ajudas de custo.",
      },
      {
        title: "Acompanhamento",
        body: "A HDM continua a atender durante o trabalho. Se surgir um problema, tem um interlocutor.",
      },
    ] as { title: string; body: string }[],
    trustTitle: "Documentação e segurança, sem letra pequena",
    trustLead:
      "Pessoal com formação PRL e certificados de soldadura. A documentação de cada incorporação é preparada antes de começar.",
    sectorsTitle: "Setores em que trabalha o pessoal",
    solutionsTitle: "Soluções para cada situação operativa",
    finalCtaTitle: "Diga-nos de que pessoal precisa.",
    finalCtaLead:
      "Monte o seu pedido em minutos. A HDM revê a disponibilidade e os requisitos antes de confirmar a proposta.",
    finalCtaButton: "Solicitar disponibilidade",
  },
  profiles: {
    title: "Pessoal industrial",
    lead:
      "Perfis profissionais confirmados que a HDM fornece para operações industriais em Espanha e Portugal.",
    pageTitleSuffix: "industriais",
    specializationLabel: "Especialidades",
    whatTheyDo: "O que faz este perfil",
    requirements: "Requisitos habituais",
    relatedSectors: "Setores habituais",
    items: {
      soldador: {
        name: "Soldadores",
        singular: "Soldador",
        short: "Soldadura TIG, MIG/MAG e eletrodo para obra, planta e paragens.",
        description:
          "Soldadores industriais para trabalhos em oficina, obra e planta. Indique o processo de soldadura de que precisa — TIG, MIG/MAG ou eletrodo revestido — e os requisitos do projeto: a HDM revê a disponibilidade de perfis com a certificação de soldadura adequada.",
        requirements:
          "Certificado de soldadura conforme o processo requerido. Formação PRL. Experiência em ambiente industrial.",
      },
      calderero: {
        name: "Caldeireiros",
        singular: "Caldeireiro",
        short: "Caldeiraria, tubagem e estrutura metálica pesada.",
        description:
          "Caldeireiros para trabalhos de caldeiraria, traçagem, conformação e montagem de chapa, tubagem e estruturas metálicas em ambiente industrial. Adequados para paragens, manutenção e projetos de fabrico.",
        requirements: "Formação PRL. Experiência comprovável em caldeiraria industrial.",
      },
      montador: {
        name: "Montadores de estruturas",
        singular: "Montador",
        short: "Montagem de estruturas metálicas e equipamentos industriais.",
        description:
          "Montadores de estruturas para levantamento, ajuste e montagem de estrutura metálica, suportação e equipamentos em obra e indústria. Perfil habituado a trabalho em altura e coordenação de içamentos.",
        requirements: "Formação PRL. Experiência em montagem de estruturas e trabalho em altura.",
      },
      electricista: {
        name: "Eletricistas industriais",
        singular: "Eletricista industrial",
        short: "Instalações, quadros e cablagem em ambiente industrial.",
        description:
          "Eletricistas industriais para instalação, cablagem, quadros elétricos e manutenção elétrica em planta e obra industrial. Indique a tensão de trabalho e o tipo de instalação ao configurar o seu pedido.",
        requirements: "Formação PRL. Qualificação elétrica adequada ao trabalho a realizar.",
      },
      constructor: {
        name: "Construtores e ajudantes",
        singular: "Construtor / ajudante",
        short: "Apoio operativo para obra e trabalhos industriais.",
        description:
          "Construtores e ajudantes para apoio em obra, preparação, auxílio aos ofícios e tarefas operativas gerais em projetos industriais. A forma mais direta de reforçar uma equipa.",
        requirements: "Formação PRL básica conforme o ambiente de trabalho.",
      },
      supervisor: {
        name: "Supervisores e encarregados",
        singular: "Supervisor / encarregado",
        short: "Coordenação de equipas e controlo de execução.",
        description:
          "Supervisores e encarregados para coordenar equipas, controlar a execução do trabalho e servir de interlocutor entre a sua operação e o pessoal fornecido. Recomendável em pedidos de vários perfis.",
        requirements: "Experiência comprovável a coordenar equipas em ambiente industrial.",
      },
      eletromecanico: {
        name: "Eletromecânicos",
        singular: "Eletromecânico",
        short: "Instalação, manutenção e reparação de máquinas elétricas e mecânicas.",
        description:
          "Eletromecânicos industriais: instalam, fazem a manutenção e reparam máquinas com componentes elétricos e mecânicos. Identificam avarias, trocam peças, fazem ligações elétricas e ajustam motores.",
        requirements: "Formação PRL. Experiência comprovável em manutenção eletromecânica industrial.",
      },
      "mecanico-industrial": {
        name: "Mecânicos industriais",
        singular: "Mecânico industrial",
        short: "Manutenção e reparação de máquinas de fábricas.",
        description:
          "Mecânicos industriais: instalam, fazem a manutenção e reparam máquinas de fábricas. Identificam avarias, trocam peças desgastadas e ajustam componentes para evitar paragens na produção.",
        requirements: "Formação PRL. Experiência comprovável em mecânica industrial.",
      },
    } as Record<
      string,
      { name: string; singular: string; short: string; description: string; requirements: string }
    >,
    specializations: {
      tig: { name: "TIG", description: "Soldadura de precisão, acabamentos finos e materiais finos." },
      "mig-mag": { name: "MIG/MAG", description: "Soldadura semiautomática de alta produtividade." },
      electrodo: { name: "Eletrodo", description: "Soldadura com eletrodo revestido, obra e exterior." },
    } as Record<string, { name: string; description: string }>,
  },
  sectors: {
    title: "Setores",
    lead: "Ambientes onde trabalha o pessoal fornecido pela HDM.",
    items: {
      industria: {
        name: "Indústria geral",
        intro:
          "Pessoal para plantas e operações industriais de todo o tipo: reforços de produção, picos de trabalho e necessidades pontuais de mão de obra qualificada.",
      },
      construccion: {
        name: "Construção",
        intro:
          "Montadores, soldadores e ajudantes para obra: estrutura metálica, instalações e trabalhos com prazos que não admitem atrasos.",
      },
      "mantenimiento-industrial": {
        name: "Manutenção industrial",
        intro:
          "Perfis técnicos para manutenção preventiva e corretiva em planta, com a documentação e a especialidade que cada intervenção exige.",
      },
      energia: {
        name: "Energia",
        intro:
          "Pessoal industrial para projetos do setor energético, onde a qualificação do perfil e a documentação são condições de entrada.",
      },
      fabricacion: {
        name: "Fabrico",
        intro:
          "Pessoal para empresas de fabrico que precisam de reforçar as suas equipas: soldadores, caldeireiros e montadores integrados na operação do cliente.",
      },
      petroquimica: {
        name: "Petroquímica",
        intro:
          "Perfis industriais para ambientes exigentes de petroquímica, com requisitos documentais e de segurança específicos que são revistos em cada pedido.",
      },
    } as Record<string, { name: string; intro: string }>,
  },
  coverage: {
    title: "Cobertura",
    lead:
      "Zonas de projeto onde a HDM fornece pessoal industrial. A cobertura não implica escritórios locais nem disponibilidade em tempo real: indique a sua zona e a HDM confirma.",
    mapLabel: "Mapa de zonas de projeto em Espanha e Portugal",
    listLabel: "Lista de zonas",
    items: {
      barcelona: {
        name: "Barcelona",
        intro:
          "Fornecimento de pessoal industrial para projetos na área de Barcelona e no seu corredor industrial: soldadores, montadores, eletricistas e perfis de apoio.",
      },
      tarragona: {
        name: "Tarragona",
        intro:
          "Pessoal para o polo industrial de Tarragona: paragens, manutenção e projetos em ambiente químico e de processo, com perfis habituados aos seus requisitos.",
      },
      valencia: {
        name: "Valência",
        intro:
          "Reforço de equipas industriais para projetos em Valência: obra, planta e trabalhos programados com perfis confirmados pela HDM.",
      },
      madrid: {
        name: "Madrid",
        intro:
          "Fornecimento de pessoal industrial em Madrid para obra, manutenção e projetos de fabrico, com coordenação direta com a sua equipa.",
      },
      "pais-vasco": {
        name: "País Basco",
        intro:
          "Pessoal qualificado para o tecido industrial do País Basco: caldeireiros, soldadores e montadores para projetos com exigência técnica.",
      },
      portugal: {
        name: "Portugal",
        intro:
          "A HDM opera também em Portugal, com capacidade de deslocação e logística declarada para projetos em território português.",
      },
    } as Record<string, { name: string; intro: string }>,
  },
  solutions: {
    title: "Soluções",
    lead: "Formas concretas de resolver uma necessidade de pessoal industrial.",
    items: {
      "paradas-industriales": {
        name: "Paragens industriais",
        intro:
          "Paragens programadas e urgentes concentram muito trabalho em pouco tempo. Configure perfis, quantidades e turnos: a HDM revê que equipa pode mobilizar para a sua janela de paragem.",
        points: [
          "Equipas multiperfil: soldadores, caldeireiros, montadores e supervisão.",
          "Indique os turnos e a duração estimada da paragem.",
          "A disponibilidade é confirmada após a revisão do seu pedido.",
        ],
      },
      "refuerzo-de-personal": {
        name: "Reforço de pessoal",
        intro:
          "Quando o quadro de pessoal não chega: reforço continuado da sua operação com pessoal industrial qualificado integrado nas suas equipas e nos seus horários.",
        points: [
          "Trabalho continuado ou fixo no cliente.",
          "Perfis técnicos e de apoio, combináveis.",
          "Acompanhamento da HDM durante toda a colaboração.",
        ],
      },
      "sustitucion-temporal": {
        name: "Substituição temporária",
        intro:
          "Baixas, férias ou ausências que não podem travar a produção. Solicite substituições temporárias do perfil exato que precisa de cobrir.",
        points: [
          "Mesmo perfil e especialidade da pessoa a substituir.",
          "Duração flexível conforme a situação.",
          "Documentação preparada antes da incorporação.",
        ],
      },
      "trabajos-puntuales": {
        name: "Trabalhos pontuais e obra",
        intro:
          "Um projeto concreto com uma data de fim. Fornecimento de pessoal para trabalhos pontuais e obra: montagem, soldadura, estrutura e apoio operativo.",
        points: [
          "Equipas dimensionadas para o trabalho: de 1 pessoa a equipas completas.",
          "Datas e duração definidas por si.",
          "Supervisão opcional para equipas grandes.",
        ],
      },
      "personal-con-desplazamiento": {
        name: "Pessoal com deslocação",
        intro:
          "O seu projeto não está onde está o pessoal. A HDM declara capacidade de gerir deslocações em Espanha e Portugal, incluindo alojamento, transporte e ajudas de custo.",
        points: [
          "Deslocações em Espanha e Portugal.",
          "Gestão de alojamento, transporte e ajudas de custo declarada pela HDM.",
          "Indique a logística necessária ao configurar o pedido.",
        ],
      },
    } as Record<string, { name: string; intro: string; points: string[] }>,
  },
};

export const ptRequest = {
  request: {
    title: "Solicitar pessoal",
    indicatorEmpty: "Solicitar pessoal",
    indicatorWithItems: "O meu pedido",
    stepNeed: "Necessidade",
    stepProfiles: "Perfis",
    stepProject: "Projeto",
    stepLogistics: "Logística",
    stepSummary: "Resumo",
    stepContact: "Contacto",
    needTitle: "Do que precisa?",
    needLead: "Selecione o tipo de necessidade. O sistema adapta as perguntas.",
    needTypes: {
      "trabajo-puntual": { name: "Trabalho pontual / obra", hint: "Um projeto concreto com data de fim." },
      "sustitucion-temporal": { name: "Substituição temporária", hint: "Cobrir uma baixa ou ausência." },
      "parada-programada": { name: "Paragem programada", hint: "Uma janela de paragem com data conhecida." },
      "parada-urgente": { name: "Paragem urgente", hint: "Incidência que exige atuar já." },
      "trabajo-continuado": { name: "Trabalho continuado", hint: "Reforço fixo ou continuado na sua empresa." },
    } as Record<string, { name: string; hint: string }>,
    modeExpert: "Sei de que perfis preciso",
    modeAssisted: "Não sei exatamente de que perfil preciso",
    assistedTitle: "Descreva o trabalho",
    assistedLead:
      "Não há problema se não tiver a certeza do perfil. Descreva o trabalho e revemo-lo consigo.",
    assistedPlaceholder:
      "Ex.: Precisamos de reforçar a soldadura de tubagem numa paragem de 2 semanas…",
    assistedQuantity: "Quantidade aproximada de pessoas",
    profilesTitle: "Configure a sua equipa",
    profilesLead: "Adicione perfis e quantidades. Pode combinar vários perfis no mesmo pedido.",
    addProfile: "Adicionar outro perfil",
    specialization: "Especialidade",
    quantity: "Quantidade",
    decrease: "Reduzir quantidade",
    increase: "Aumentar quantidade",
    quantityInput: "Quantidade de profissionais",
    requirementsLabel: "Requisitos do perfil (opcional)",
    requirementsHint: "Ex.: certificado de soldadura TIG em tubo, experiência em inox…",
    teamTotal: "profissionais",
    teamProfiles: "perfis",
    projectTitle: "Projeto",
    projectLead: "Diga-nos onde e quando. A HDM confirma depois a disponibilidade.",
    timingLabel: "Para quando?",
    timing: {
      urgente: "O mais cedo possível",
      "esta-semana": "Esta semana",
      "este-mes": "Este mês",
      "fecha-concreta": "Data programada",
      "sin-fecha": "Ainda sem data",
    } as Record<string, string>,
    startDateLabel: "Data de início solicitada",
    durationLabel: "Duração estimada",
    durationValueLabel: "Duração",
    durationUnits: {
      dias: "dias",
      semanas: "semanas",
      meses: "meses",
      continuado: "Continuado",
      "por-definir": "Por definir",
    },
    durationPlaceholder: "Ex.: 3",
    shiftLabel: "Turno (opcional)",
    shiftPlaceholder: "Ex.: manhãs, rotativo, noite…",
    locationLabel: "Zona do projeto",
    locationHint: "Zona de trabalho do projeto. Não implica disponibilidade em tempo real.",
    cityLabel: "Cidade / município (opcional)",
    addressLabel: "Morada ou referência (opcional)",
    sectorLabel: "Setor (opcional)",
    descriptionLabel: "Descrição do trabalho (opcional)",
    logisticsTitle: "Logística e requisitos",
    logisticsLead: "O projeto requer deslocação do pessoal? A HDM declara capacidade de gestão logística.",
    displacement: "O projeto requer deslocação",
    displacementScope: "Âmbito da deslocação",
    displacementEspana: "Espanha",
    displacementPortugal: "Portugal",
    accommodation: "Alojamento",
    transport: "Transporte",
    allowances: "Ajudas de custo / alimentação",
    logisticsYes: "Necessário",
    logisticsNo: "Não necessário",
    logisticsTbd: "Por definir",
    logisticsNotes: "Notas de logística (opcional)",
    certsQuestion: "O seu projeto exige alguma certificação específica?",
    certsYes: "Sim",
    certsNo: "Não",
    certsUnknown: "Não sei",
    certsLabel: "Indique a certificação exigida",
    certsHint: "Ex.: PRL específica do centro, certificado de soldadura por processo…",
    attachmentsTitle: "Documentação",
    attachmentsLead:
      "Anexe cadernos de encargos, requisitos ou plantas, se os tiver. Formatos: PDF, Word, Excel, JPG, PNG. Máx. 25 MB por ficheiro.",
    attachmentsCta: "Anexar documento",
    attachmentsNote:
      "Os documentos são tratados de forma privada. Neste ambiente de demonstração os ficheiros não são carregados: a HDM solicitá-los-á ao rever o seu pedido.",
    attachmentTooLarge: "O ficheiro excede o tamanho máximo permitido (25 MB).",
    attachmentTooMany: "Máximo de 10 ficheiros por pedido.",
    attachmentBadType: "Tipo de ficheiro não permitido. Use PDF, Word, Excel, JPG ou PNG.",
    attachmentRemove: "Remover ficheiro",
    summaryTitle: "O seu pedido",
    summaryLead: "Reveja tudo antes de enviar. Pode editar qualquer parte.",
    summaryNeed: "Necessidade",
    summaryProfiles: "Equipa solicitada",
    summaryLocation: "Localização",
    summaryStart: "Início solicitado",
    summaryDuration: "Duração",
    summaryShift: "Turno",
    summaryLogistics: "Logística",
    summaryDocs: "Documentação",
    summarySector: "Setor",
    summaryTotal: "profissionais no total",
    summaryDisclaimer:
      "Enviar este pedido não implica uma contratação. A HDM reverá a disponibilidade e os requisitos antes de confirmar condições.",
    trustPanel: [
      "Pode modificá-lo antes de enviar",
      "Não confirma contratação",
      "A HDM reverá a disponibilidade",
      "Os seus documentos serão utilizados para rever o pedido",
    ] as string[],
    contactTitle: "A quem respondemos?",
    contactLead: "Apenas o necessário para responder ao seu pedido. Nada mais.",
    contactCompany: "Empresa",
    contactName: "Pessoa de contacto",
    contactPhone: "Telefone",
    contactEmail: "Email",
    privacyNote:
      "Os seus dados são usados apenas para gerir este pedido. Consulte a política de privacidade.",
    submit: "Solicitar disponibilidade",
    submitting: "A enviar…",
    honeypotLabel: "Não preencha este campo",
    successTitle: "Pedido recebido",
    successReference: "Referência",
    successBody:
      "A HDM reverá a disponibilidade e os requisitos antes de confirmar a proposta. Guarde a sua referência.",
    successDemoNote:
      "Ambiente de demonstração: o pedido foi guardado localmente. Para produção, configure o backend (ver README).",
    successNew: "Criar outro pedido",
    failureTitle: "Não foi possível enviar o pedido.",
    failureBody: "A sua informação continua aqui. Pode tentar novamente ou continuar por outro canal.",
    failureRetry: "Tentar novamente",
    failureWhatsapp: "Continuar por WhatsApp",
    failureCall: "Ligar",
    emptyTitle: "O seu pedido está vazio",
    emptyBody:
      "Ainda não adicionou nenhum perfil. Comece por selecionar os perfis de que precisa ou descreva o trabalho.",
    emptyCta: "Configurar o meu pedido",
    errors: {
      empty_request: "Introduza pelo menos 1 profissional ou descreva o trabalho.",
      past_date: "A data de incorporação não pode estar no passado.",
      invalid_date: "Reveja a data de início.",
      invalid_phone: "Reveja o número de telefone.",
      required: "Campo obrigatório.",
      invalid_email: "Reveja o endereço de email.",
      attachment_failed: "Não foi possível adicionar este ficheiro. O seu pedido continua guardado.",
      network: "Erro de ligação. A sua informação continua aqui.",
      no_backend:
        "O envio online não está configurado neste ambiente. Continue por WhatsApp ou telefone: o seu pedido está pronto para partilhar.",
      unknown: "Ocorreu um erro. A sua informação continua aqui.",
      invalid_input: "Reveja os dados introduzidos: algum campo não é válido ou excede o comprimento permitido.",
    },
    whatsappIntro: "Olá, preparei um pedido no site da HDM.",
    whatsappNeed: "Preciso de",
    whatsappLocation: "Localização",
    whatsappStart: "Início solicitado",
    whatsappDuration: "Duração",
    whatsappClose: "Quero consultar a disponibilidade.",
    whatsappDescribe: "Descrição do trabalho",
  },
};

export const ptPages = {
  howWeWork: {
    title: "Como trabalhamos",
    lead:
      "A HDM fornece pessoal industrial qualificado. É assim que uma necessidade se transforma numa equipa a trabalhar.",
    sections: [
      {
        title: "O cliente define a necessidade",
        body: "Perfil, especialidade, quantidade, local e data. Pode fazê-lo a partir de qualquer página do site: o seu pedido acompanha-o enquanto navega.",
      },
      {
        title: "A HDM revê antes de confirmar",
        body: "Disponibilidade de perfis, requisitos técnicos, certificações e logística. Nada é confirmado automaticamente: cada pedido é revisto.",
      },
      {
        title: "Documentação preparada",
        body: "Formação PRL e certificados de soldadura quando o perfil o requer. A documentação é preparada antes da incorporação.",
      },
      {
        title: "Logística quando é preciso",
        body: "Deslocação em Espanha e Portugal com gestão de alojamento, transporte e ajudas de custo, declarada pela HDM.",
      },
      {
        title: "Acompanhamento durante o trabalho",
        body: "A HDM continua a atender depois da incorporação. Se surgir um problema, tem um interlocutor direto.",
      },
    ] as { title: string; body: string }[],
  },
  certifications: {
    title: "Certificações e segurança",
    lead:
      "O que podemos afirmar hoje, sem exagerar: pessoal com formação PRL e certificados de soldadura.",
    prlTitle: "Formação PRL",
    prlBody:
      "O pessoal fornecido dispõe de formação em prevenção de riscos laborais adequada ao ambiente de trabalho. Se o seu centro exigir PRL específica, indique-o no pedido.",
    weldingTitle: "Certificados de soldadura",
    weldingBody:
      "Os soldadores são atribuídos conforme o processo requerido — TIG, MIG/MAG ou eletrodo — e a certificação de soldadura correspondente é revista antes de confirmar.",
    docsTitle: "Documentação antes de começar",
    docsBody:
      "A documentação de cada incorporação é preparada antes de começar o trabalho. Anexe os requisitos do seu centro ao pedido, se os tiver.",
    honestyTitle: "Compromisso de transparência",
    honestyBody:
      "Quando a HDM dispuser de certificações adicionais documentadas, serão publicadas aqui com a sua norma e âmbito exatos. Até lá, não as anunciamos.",
  },
  projects: {
    title: "Projetos",
    lead:
      "Os projetos dos clientes da HDM são confidenciais. Aqui serão publicados casos reais com o formato seguinte, quando existir autorização.",
    confidentialLabel: "Projeto confidencial",
    modelTitle: "Como contaremos os projetos",
    modelFields: [
      "Setor",
      "Zona",
      "Necessidade",
      "Perfis",
      "Quantidade",
      "Duração",
      "Desafio",
      "Resposta HDM",
      "Resultado",
    ] as string[],
    emptyTitle: "Casos em preparação",
    emptyBody:
      "Ainda não há casos públicos autorizados. Entretanto, a prova mais direta é funcional: configure um pedido real e comprove como a HDM responde.",
  },
  company: {
    title: "Empresa",
    lead:
      "A HDM Industrial fornece pessoal qualificado para operações industriais em Espanha e Portugal.",
    body1:
      "A indústria é o ambiente; as pessoas são o produto. A HDM coloca soldadores, caldeireiros, montadores, eletricistas, eletromecânicos, mecânicos industriais, ajudantes e supervisores dentro da operação do cliente, com a documentação e a logística que o projeto exige.",
    body2:
      "Seriedade, transparência e profissionalismo são os valores declarados da empresa. O compromisso da HDM vai além da incorporação: quando surge um problema, a HDM continua lá.",
    body3:
      "Este site reflete essa forma de trabalhar: o cliente configura o que precisa e a HDM confirma o que pode pôr em marcha. Sem promessas automáticas.",
    valuesTitle: "Como se comporta a HDM",
    values: [
      { name: "Seriedade", body: "O que se confirma, cumpre-se. O que não está confirmado, diz-se." },
      { name: "Transparência", body: "Sem números inflacionados nem promessas automáticas. A disponibilidade é revista e comunicada." },
      { name: "Profissionalismo", body: "Perfis corretos, documentação preparada, interlocutor claro." },
    ] as { name: string; body: string }[],
    photoPending: "Fotografia real da equipa HDM — pendente de entrega",
  },
  contact: {
    title: "Contacto",
    lead:
      "A via mais rápida é o pedido: chega estruturado e a HDM pode responder com precisão.",
    directTitle: "Contacto direto",
    pendingData:
      "Dados de contacto direto em configuração. Entretanto, use o pedido online.",
    formTitle: "Ou envie uma mensagem",
    formNote: "Para necessidades de pessoal, use o pedido: recolhe o contexto com mais detalhe.",
    nameLabel: "Nome",
    messageLabel: "Mensagem",
    send: "Enviar mensagem",
    sent: "Mensagem preparada. O seu cliente de email irá abrir.",
  },
  footer: {
    tagline: "Pessoal industrial qualificado, onde precisa dele.",
    explore: "Explorar",
    companyCol: "Empresa",
    legal: "Legal",
    legalNotice: "Aviso legal",
    privacy: "Privacidade",
    cookies: "Cookies",
    editorialNote:
      "As fotografias de ambiente industrial são editoriais e não representam instalações nem pessoal da HDM.",
    fiscalNote: "HDM Industrial — Domicílio fiscal em Portugal. Dados registados completos no aviso legal.",
  },
  cookiesBanner: {
    title: "Cookies",
    body: "Usamos cookies técnicos para que o site funcione e, apenas se aceitar, medição anónima de uso. Sem publicidade nem rastreio comercial.",
    accept: "Aceitar medição",
    reject: "Apenas técnicos",
    more: "Mais informação",
  },
  legal: {
    aviso: {
      title: "Aviso legal",
      body: "Página de aviso legal. Os dados registados completos da HDM Industrial (denominação, NIF, domicílio fiscal em Portugal e dados de contacto) serão publicados aqui quando o departamento jurídico os confirmar. Entretanto, esta página existe como espaço reservado funcional e não deve ser indexada.",
    },
    privacidad: {
      title: "Política de privacidade",
      intro: "Resumo claro de como são tratados os dados neste site.",
      sections: [
        { title: "Que dados pedimos", body: "Apenas os necessários para gerir o seu pedido: empresa, pessoa de contacto, telefone e email, além do contexto da necessidade (perfis, local, datas, logística e documentos que anexar voluntariamente)." },
        { title: "Para que são usados", body: "Apenas para rever a disponibilidade, preparar uma proposta e comunicar consigo sobre esse pedido." },
        { title: "O que não fazemos", body: "Não vendemos dados, não os usamos para publicidade de terceiros e não enviamos dados pessoais a ferramentas de analítica." },
        { title: "Documentos anexados", body: "Os documentos que anexar são tratados de forma privada e usados apenas para avaliar o seu pedido." },
        { title: "Os seus direitos", body: "Pode solicitar acesso, retificação ou eliminação dos seus dados contactando a HDM pelos canais de contacto." },
      ] as { title: string; body: string }[],
    },
    cookies: {
      title: "Política de cookies",
      intro: "Este site usa o mínimo de cookies possível.",
      sections: [
        { title: "Cookies técnicos", body: "Necessários para que o site funcione: o seu pedido fica guardado no seu navegador para não o perder ao navegar. Não requerem consentimento." },
        { title: "Medição de uso", body: "Apenas se aceitar, é carregada medição anónima de uso para melhorar o site. Se recusar, não é carregado nenhum script de medição." },
        { title: "Sem publicidade", body: "Não há cookies publicitários nem de rastreio comercial de terceiros." },
      ] as { title: string; body: string }[],
    },
  },
  notFound: {
    title: "Página não encontrada",
    body: "A página que procura não existe ou mudou de endereço. O seu pedido, se tinha um em curso, continua guardado.",
    cta: "Voltar ao início",
  },
};

export const ptDictionary: Dictionary = { ...pt, ...ptRequest, ...ptPages };
