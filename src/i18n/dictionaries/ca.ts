/**
 * Diccionari CA (català) — català central estàndard, professional, directe, natural.
 * Copy conservador: sense claims sense prova (vegeu claims.ts). Sense lorem ipsum.
 */
import type { Dictionary } from "./es";

const ca = {
  meta: {
    siteName: "HDM Industrial",
    defaultTitle: "HDM Industrial — Personal industrial qualificat, on el necessita",
    defaultDescription:
      "Subministrament de personal industrial qualificat: soldadors TIG, MIG/MAG i elèctrode, calderers, muntadors, electricistes, electromecànics, mecànics industrials i supervisors. Digui-nos què necessita i HDM revisa la disponibilitat.",
    ogDescription:
      "Configuri la seva necessitat de personal industrial en minuts. HDM revisa disponibilitat i requisits abans de confirmar la proposta.",
  },
  nav: {
    profiles: "Personal industrial",
    solutions: "Solucions",
    sectors: "Sectors",
    coverage: "Cobertura",
    howWeWork: "Com treballem",
    certifications: "Certificacions i seguretat",
    projects: "Projectes",
    company: "Empresa",
    contact: "Contacte",
    careers: "Treballa amb nosaltres",
    request: "Sol·licitar personal",
    myRequest: "La meva sol·licitud",
    menu: "Menú",
    close: "Tancar",
    language: "Idioma",
  },
  common: {
    requestCta: "Sol·licitar disponibilitat",
    requestPersonal: "Sol·licitar personal",
    addToRequest: "Afegir a la meva sol·licitud",
    added: "Afegit",
    viewRequest: "Veure sol·licitud",
    editRequest: "Editar",
    remove: "Treure",
    back: "Tornar",
    next: "Continuar",
    professionals: "professionals",
    professional: "professional",
    profilesLabel: "perfils",
    profileLabel: "perfil",
    from: "Des de",
    readMore: "Veure'n més",
    editorialPhoto: "Imatge editorial d'ambient industrial. No representa instal·lacions ni personal d'HDM.",
    pendingAsset: "Espai reservat per a material real d'HDM",
    navPrimary: "Navegació principal",
    navPrimaryMobile: "Navegació principal mòbil",
    requestProgress: "Progrés de la sol·licitud",
    requestMode: "Mode de sol·licitud",
    spain: "Espanya",
    portugal: "Portugal",
    whatsapp: "WhatsApp",
    call: "Trucar",
    email: "Correu electrònic",
    allProfiles: "Veure tots els perfils",
    startRequestHere: "Començar sol·licitud amb aquest perfil",
    startRequestArea: "Planificar un projecte en aquesta zona",
    startRequestSolution: "Sol·licitar aquesta solució",
  },
  home: {
    heroEyebrow: "Subministrament de personal industrial qualificat",
    heroTitle: "El personal industrial que necessita, on el necessita.",
    heroLead:
      "Soldadors TIG, MIG/MAG i elèctrode, calderers, muntadors, electricistes, electromecànics, mecànics industrials i supervisors. Configuri la seva necessitat i HDM revisa la disponibilitat abans de confirmar.",
    heroNote:
      "Sense compromís: la seva sol·licitud no confirma disponibilitat. HDM la revisa i respon.",
    heroStart: "Començar la meva sol·licitud",
    heroSecondary: "Veure perfils industrials",
    comoTitle: "Com funciona",
    comoSub: "Tres passos. Sense compromís i amb resposta en hores laborables.",
    como1t: "Expliqui'ns la necessitat",
    como1d: "Perfil, procés, termini i ubicació. Configuri la seva sol·licitud en menys d’un minut.",
    como2t: "HDM revisa la disponibilitat",
    como2d: "Verifiquem formació PRL, certificacions i quadrilles disponibles a la seva zona.",
    como3t: "Rep perfils verificats",
    como3d: "Li confirmem disponibilitat real abans que decideixi. Sense sorpreses.",
    faqTitle: "Preguntes freqüents",
    faq1q: "En quant de temps rebo resposta?",
    faq1a: "HDM revisa cada sol·licitud en hores laborables i li confirma disponibilitat real abans que es comprometi a res.",
    faq2q: "La sol·licitud confirma disponibilitat?",
    faq2a: "No. La sol·licitud és sense compromís: serveix perquè HDM verifiqui quadrilles i li respongui amb opcions reals.",
    faq3q: "Quins perfils puc sol·licitar?",
    faq3a: "Soldadors TIG, MIG/MAG i elèctrode, calderers, muntadors, electricistes, electromecànics, mecànics industrials, ajudants i supervisors.",
    scaleEyebrow: "Capacitat organitzada",
    coverageEyebrow: "Cobertura",
    processEyebrow: "Com treballem",
    trustEyebrow: "Certificacions i seguretat",
    sectorsEyebrow: "Sectors",
    solutionsEyebrow: "Solucions",
    scale: {
      profiles: "tipus de perfil",
      specializations: "especialitats de soldadura",
      modes: "modalitats operatives",
      areas: "àrees de projecte",
      sectors: "sectors confirmats",
    } as Record<string, string>,
    heroComposerTitle: "Configuri el seu equip",
    heroComposerNote: "La seva sol·licitud l'acompanya mentre navega. Res no s'envia fins que vostè ho decideixi.",
    profilesTitle: "Quin perfil necessita?",
    profilesLead:
      "Seleccioni perfils i quantitats. Pot combinar diversos perfils en una mateixa sol·licitud.",
    coverageTitle: "On és el seu projecte?",
    coverageLead:
      "Zones on HDM subministra personal per a projectes. Seleccioni la seva zona per començar: la cobertura indica àrea de treball, no disponibilitat en temps real.",
    processTitle: "De la necessitat a la mobilització",
    processLead:
      "Un procés clar, sense promeses buides: vostè defineix la necessitat, HDM confirma el que pot posar en marxa.",
    processSteps: [
      {
        title: "Configuri la seva necessitat",
        body: "Perfils, especialitats, quantitats, lloc, dates i logística. Sense formularis burocràtics: una configuració clara.",
      },
      {
        title: "HDM revisa disponibilitat",
        body: "L'equip d'HDM revisa perfils, requisits i documentació abans de confirmar res.",
      },
      {
        title: "Proposta i mobilització",
        body: "Rep una proposta concreta. Si el projecte ho requereix, HDM gestiona desplaçament, allotjament, transport i dietes.",
      },
      {
        title: "Acompanyament",
        body: "HDM continua atenent durant el treball. Si sorgeix un problema, té un interlocutor.",
      },
    ] as { title: string; body: string }[],
    trustTitle: "Documentació i seguretat, sense lletra petita",
    trustLead:
      "Personal amb formació PRL i certificats de soldadura. La documentació de cada incorporació es prepara abans de començar.",
    sectorsTitle: "Sectors en què treballa el personal",
    solutionsTitle: "Solucions per a cada situació operativa",
    finalCtaTitle: "Digui-nos quin personal necessita.",
    finalCtaLead:
      "Munti la seva sol·licitud en minuts. HDM revisa disponibilitat i requisits abans de confirmar la proposta.",
    finalCtaButton: "Sol·licitar disponibilitat",
  },
  profiles: {
    title: "Personal industrial",
    queHacenTitle: "Què fan",
    cuandoTitle: "Quan el necessita",
    verificaTitle: "Què verifica HDM",
    faqTitle: "Preguntes freqüents",
    lead:
      "Perfils professionals confirmats que HDM subministra per a operacions industrials a Espanya i Portugal.",
    pageTitleSuffix: "industrials",
    specializationLabel: "Especialitats",
    whatTheyDo: "Què fa aquest perfil",
    requirements: "Requisits habituals",
    relatedSectors: "Sectors habituals",
    items: {
      soldador: {
        name: "Soldadors",
        singular: "Soldador",
        short: "Soldadura TIG, MIG/MAG i elèctrode per a obra, planta i aturades.",
        description:
          "Soldadors industrials per a treballs en taller, obra i planta. Indiqui el procés de soldadura que necessita —TIG, MIG/MAG o elèctrode revestit— i els requisits del projecte: HDM revisa la disponibilitat de perfils amb la certificació de soldadura adequada.",
        requirements:
          "Certificat de soldadura segons el procés requerit. Formació PRL. Experiència en entorn industrial.",
        queHacen: "El soldador industrial uneix, repara i reforça estructures metàl·liques en taller, obra i planta de producció. Segons el procés —TIG, MIG/MAG o elèctrode revestit— treballa des d'acabats fins de precisió fins a cordons d'alta productivitat en espessors gruixuts. En una aturada de planta, el soldador és dels perfils que més condicionen el termini: un cordó ben executat a la primera evita retraballaments que costen hores. Per això HDM verifica el procés exacte que domina cada professional abans de proposar-lo a un projecte.",
        cuando: ["Aturades de planta o turnaround, on cada hora de soldadura està comptada.", "Pics de producció que superen la capacitat de la quadrilla habitual.", "Obra industrial amb terminis que no admeten retards (estructura, suportació, tuberia).", "Reparacions urgents d'equips o línies de producció aturades."],
        verifica: "HDM verifica abans de proposar: certificat de soldadura segons el procés requerit (TIG, MIG/MAG o elèctrode), formació PRL al dia i experiència contrastada en entorn industrial. Sense dades verificades, no hi ha proposta.",
        faq: [{ q: "Puc demanar només soldadors TIG per a una aturada d'una setmana?", a: "Sí. Configuri la sol·licitud amb el procés (TIG), el volum i les dates; HDM revisa quadrilles amb aquest certificat i li confirma disponibilitat real abans que decideixi." }, { q: "Treballen en alçada o en espais confinats?", a: "Quan el projecte ho requereix, s'indiquen a la sol·licitud les condicions (alçada, confinat, torn). HDM ho té en compte en verificar perfils i certificacions." }, { q: "En quant de temps puc tenir soldadors disponibles?", a: "Depèn del procés, volum i ubicació. HDM respon cada sol·licitud en hores laborables amb disponibilitat real, sense compromís per la seva part." }],
      },
      calderero: {
        name: "Calderers",
        singular: "Calderer",
        short: "Caldereria, canonada i estructura metàl·lica pesada.",
        description:
          "Calderers per a treballs de caldereria, traçat, conformat i muntatge de xapa, canonada i estructures metàl·liques en entorn industrial. Adequats per a aturades, manteniment i projectes de fabricació.",
        requirements: "Formació PRL. Experiència demostrable en caldereria industrial.",
      },
      montador: {
        name: "Muntadors d'estructures",
        singular: "Muntador",
        short: "Muntatge d'estructures metàl·liques i equips industrials.",
        description:
          "Muntadors d'estructures per a aixecament, ajust i muntatge d'estructura metàl·lica, suportació i equips en obra i indústria. Perfil acostumat a treball en alçada i coordinació d'aixecaments.",
        requirements: "Formació PRL. Experiència en muntatge d'estructures i treball en alçada.",
      },
      electricista: {
        name: "Electricistes industrials",
        singular: "Electricista industrial",
        short: "Instal·lacions, quadres i cablejat en entorn industrial.",
        description:
          "Electricistes industrials per a instal·lació, cablejat, quadres elèctrics i manteniment elèctric en planta i obra industrial. Indiqui tensió de treball i tipus d'instal·lació en configurar la seva sol·licitud.",
        requirements: "Formació PRL. Qualificació elèctrica d'acord amb el treball a realitzar.",
      },
      constructor: {
        name: "Constructors i ajudants",
        singular: "Constructor / ajudant",
        short: "Suport operatiu per a obra i treballs industrials.",
        description:
          "Constructors i ajudants per a suport en obra, preparació, auxili a oficis i tasques operatives generals en projectes industrials. La forma més directa de reforçar una quadrilla.",
        requirements: "Formació PRL bàsica segons l'entorn de treball.",
      },
      supervisor: {
        name: "Supervisors i encarregats",
        singular: "Supervisor / encarregat",
        short: "Coordinació de quadrilles i control d'execució.",
        description:
          "Supervisors i encarregats per coordinar quadrilles, controlar l'execució del treball i servir d'interlocutor entre la seva operació i el personal subministrat. Recomanable en sol·licituds de diversos perfils.",
        requirements: "Experiència demostrable coordinant equips en entorn industrial.",
      },
      eletromecanico: {
        name: "Electromecànics",
        singular: "Electromecànic",
        short: "Instal·lació, manteniment i reparació de màquines elèctriques i mecàniques.",
        description:
          "Electromecànics industrials: instal·len, mantenen i reparen màquines amb components elèctrics i mecànics. Identifiquen avaries, substitueixen peces, fan connexions elèctriques i ajusten motors.",
        requirements: "Formació PRL. Experiència demostrable en manteniment electromecànic industrial.",
      },
      "mecanico-industrial": {
        name: "Mecànics industrials",
        singular: "Mecànic industrial",
        short: "Manteniment i reparació de maquinària de fàbriques.",
        description:
          "Mecànics industrials: instal·len, mantenen i reparen maquinària de fàbriques. Identifiquen avaries, substitueixen peces desgastades i ajusten components per evitar aturades a la producció.",
        requirements: "Formació PRL. Experiència demostrable en mecànica industrial.",
      },
    } as Record<
      string,
      { name: string; singular: string; short: string; description: string; requirements: string; queHacen?: string; cuando?: string[]; verifica?: string; faq?: Array<{ q: string; a: string }> }
    >,
    specializations: {
      tig: { name: "TIG", description: "Soldadura de precisió, acabats fins i materials fins." },
      "mig-mag": { name: "MIG/MAG", description: "Soldadura semiautomàtica d'alta productivitat." },
      electrodo: { name: "Elèctrode", description: "Soldadura amb elèctrode revestit, obra i exterior." },
    } as Record<string, { name: string; description: string }>,
  },
  sectors: {
    title: "Sectors",
    lead: "Entorns on treballa el personal subministrat per HDM.",
    items: {
      industria: {
        name: "Indústria general",
        intro:
          "Personal per a plantes i operacions industrials de tot tipus: reforços de producció, pics de treball i necessitats puntuals de mà d'obra qualificada.",
      },
      construccion: {
        name: "Construcció",
        intro:
          "Muntadors, soldadors i ajudants per a obra: estructura metàl·lica, instal·lacions i treballs amb terminis que no admeten retards.",
      },
      "mantenimiento-industrial": {
        name: "Manteniment industrial",
        intro:
          "Perfils tècnics per a manteniment preventiu i correctiu en planta, amb la documentació i l'especialitat que cada intervenció exigeix.",
      },
      energia: {
        name: "Energia",
        intro:
          "Personal industrial per a projectes del sector energètic, on la qualificació del perfil i la documentació són condicions d'entrada.",
      },
      fabricacion: {
        name: "Fabricació",
        intro:
          "Personal per a empreses de fabricació que necessiten reforçar els seus equips: soldadors, calderers i muntadors integrats en l'operació del client.",
      },
      petroquimica: {
        name: "Petroquímica",
        intro:
          "Perfils industrials per a entorns exigents de petroquímica, amb requisits documentals i de seguretat específics que es revisen en cada sol·licitud.",
      },
    } as Record<string, { name: string; intro: string }>,
  },
  coverage: {
    title: "Cobertura",
    lead:
      "Zones de projecte on HDM subministra personal industrial. La cobertura no implica oficines locals ni disponibilitat en temps real: indiqui la seva zona i HDM confirma.",
    mapLabel: "Mapa de zones de projecte a Espanya i Portugal",
    listLabel: "Llista de zones",
    items: {
      barcelona: {
        name: "Barcelona",
        intro:
          "Subministrament de personal industrial per a projectes a l'àrea de Barcelona i el seu corredor industrial: soldadors, muntadors, electricistes i perfils de suport.",
      },
      tarragona: {
        name: "Tarragona",
        intro:
          "Personal per al pol industrial de Tarragona: aturades, manteniment i projectes en entorn químic i de procés, amb perfils acostumats als seus requisits.",
      },
      valencia: {
        name: "València",
        intro:
          "Reforç de quadrilles industrials per a projectes a València: obra, planta i treballs programats amb perfils confirmats per HDM.",
      },
      madrid: {
        name: "Madrid",
        intro:
          "Subministrament de personal industrial a Madrid per a obra, manteniment i projectes de fabricació, amb coordinació directa amb el seu equip.",
      },
      "pais-vasco": {
        name: "País Basc",
        intro:
          "Personal qualificat per al teixit industrial del País Basc: calderers, soldadors i muntadors per a projectes amb exigència tècnica.",
      },
      portugal: {
        name: "Portugal",
        intro:
          "HDM opera també a Portugal, amb capacitat de desplaçament i logística declarada per a projectes en territori portuguès.",
      },
    } as Record<string, { name: string; intro: string }>,
  },
  solutions: {
    title: "Solucions",
    lead: "Formes concretes de resoldre una necessitat de personal industrial.",
    items: {
      "paradas-industriales": {
        name: "Aturades industrials",
        intro:
          "Les aturades programades i urgents concentren molta feina en poc temps. Configuri perfils, quantitats i torns: HDM revisa quin equip pot mobilitzar per a la seva finestra d'aturada.",
        points: [
          "Equips multiperfil: soldadors, calderers, muntadors i supervisió.",
          "Indiqui torns i durada estimada de l'aturada.",
          "La disponibilitat es confirma després de revisar la seva sol·licitud.",
        ],
      },
      "refuerzo-de-personal": {
        name: "Reforç de personal",
        intro:
          "Quan la plantilla no hi arriba: reforç continuat de la seva operació amb personal industrial qualificat integrat en els seus equips i els seus horaris.",
        points: [
          "Treball continuat o fix en client.",
          "Perfils tècnics i de suport, combinables.",
          "Seguiment d'HDM durant tota la col·laboració.",
        ],
      },
      "sustitucion-temporal": {
        name: "Substitució temporal",
        intro:
          "Baixes, vacances o absències que no poden frenar la producció. Sol·liciti substitucions temporals del perfil exacte que necessita cobrir.",
        points: [
          "Mateix perfil i especialitat que la persona a substituir.",
          "Durada flexible segons la situació.",
          "Documentació preparada abans de la incorporació.",
        ],
      },
      "trabajos-puntuales": {
        name: "Treballs puntuals i obra",
        intro:
          "Un projecte concret amb una data de fi. Subministrament de personal per a treballs puntuals i obra: muntatge, soldadura, estructura i suport operatiu.",
        points: [
          "Equips dimensionats al treball: des d'1 persona fins a quadrilles completes.",
          "Dates i durada definides per vostè.",
          "Supervisió opcional per a equips grans.",
        ],
      },
      "personal-con-desplazamiento": {
        name: "Personal amb desplaçament",
        intro:
          "El seu projecte no és on és el personal. HDM declara capacitat de gestionar desplaçament a Espanya i Portugal, incloent-hi allotjament, transport i dietes.",
        points: [
          "Desplaçaments a Espanya i Portugal.",
          "Gestió d'allotjament, transport i dietes declarada per HDM.",
          "Indiqui la logística necessària en configurar la sol·licitud.",
        ],
      },
    } as Record<string, { name: string; intro: string; points: string[] }>,
  },
};

const caRequest = {
  request: {
    title: "Sol·licitar personal",
    indicatorEmpty: "Sol·licitar personal",
    indicatorWithItems: "La meva sol·licitud",
    stepNeed: "Necessitat",
    stepProfiles: "Perfils",
    stepProject: "Projecte",
    stepLogistics: "Logística",
    stepSummary: "Resum",
    stepContact: "Contacte",
    needTitle: "Què necessita?",
    needLead: "Seleccioni el tipus de necessitat. El sistema adapta les preguntes.",
    needTypes: {
      "trabajo-puntual": { name: "Treball puntual / obra", hint: "Un projecte concret amb data de fi." },
      "sustitucion-temporal": { name: "Substitució temporal", hint: "Cobrir una baixa o absència." },
      "parada-programada": { name: "Aturada programada", hint: "Una finestra d'aturada amb data coneguda." },
      "parada-urgente": { name: "Aturada urgent", hint: "Incidència que exigeix actuar ja." },
      "trabajo-continuado": { name: "Treball continuat", hint: "Reforç fix o continuat a la seva empresa." },
    } as Record<string, { name: string; hint: string }>,
    modeExpert: "Sé quins perfils necessito",
    modeAssisted: "No sé exactament quin perfil necessito",
    assistedTitle: "Descrigui el treball",
    assistedLead:
      "No passa res si no té clar el perfil. Descrigui el treball i ho revisem amb vostè.",
    assistedPlaceholder:
      "Ex.: Necessitem reforçar la soldadura de canonada en una aturada de 2 setmanes…",
    assistedQuantity: "Quantitat aproximada de persones",
    profilesTitle: "Configuri el seu equip",
    profilesLead: "Afegeixi perfils i quantitats. Pot combinar diversos perfils en la mateixa sol·licitud.",
    addProfile: "Afegir un altre perfil",
    specialization: "Especialitat",
    quantity: "Quantitat",
    decrease: "Reduir quantitat",
    increase: "Augmentar quantitat",
    quantityInput: "Quantitat de professionals",
    requirementsLabel: "Requisits del perfil (opcional)",
    requirementsHint: "Ex.: certificat de soldadura TIG en tub, experiència en inox…",
    teamTotal: "professionals",
    teamProfiles: "perfils",
    projectTitle: "Projecte",
    projectLead: "Expliqui'ns on i quan. HDM confirma després la disponibilitat.",
    timingLabel: "Per a quan?",
    timing: {
      urgente: "Com més aviat millor",
      "esta-semana": "Aquesta setmana",
      "este-mes": "Aquest mes",
      "fecha-concreta": "Data programada",
      "sin-fecha": "Encara sense data",
    } as Record<string, string>,
    startDateLabel: "Data d'inici sol·licitada",
    durationLabel: "Durada estimada",
    durationValueLabel: "Durada",
    durationUnits: {
      dias: "dies",
      semanas: "setmanes",
      meses: "mesos",
      continuado: "Continuat",
      "por-definir": "Per definir",
    },
    durationPlaceholder: "Ex.: 3",
    shiftLabel: "Torn (opcional)",
    shiftPlaceholder: "Ex.: matins, rotatiu, nit…",
    locationLabel: "Zona del projecte",
    locationHint: "Zona de treball del projecte. No implica disponibilitat en temps real.",
    cityLabel: "Ciutat / municipi (opcional)",
    addressLabel: "Adreça o referència (opcional)",
    sectorLabel: "Sector (opcional)",
    descriptionLabel: "Descripció del treball (opcional)",
    logisticsTitle: "Logística i requisits",
    logisticsLead: "El projecte requereix desplaçament del personal? HDM declara capacitat de gestió logística.",
    displacement: "El projecte requereix desplaçament",
    displacementScope: "Àmbit del desplaçament",
    displacementEspana: "Espanya",
    displacementPortugal: "Portugal",
    accommodation: "Allotjament",
    transport: "Transport",
    allowances: "Dietes / manutenció",
    logisticsYes: "Necessari",
    logisticsNo: "No necessari",
    logisticsTbd: "Per definir",
    logisticsNotes: "Notes de logística (opcional)",
    certsQuestion: "El seu projecte exigeix alguna certificació específica?",
    certsYes: "Sí",
    certsNo: "No",
    certsUnknown: "No ho sé",
    certsLabel: "Indiqui la certificació exigida",
    certsHint: "Ex.: PRL específic del centre, certificat de soldadura per procés…",
    attachmentsTitle: "Documentació",
    attachmentsLead:
      "Adjunti plecs, requisits o plànols si en té. Formats: PDF, Word, Excel, JPG, PNG. Màx. 25 MB per fitxer.",
    attachmentsCta: "Adjuntar document",
    attachmentsNote:
      "Els documents es tracten de forma privada. En aquest entorn de demostració els fitxers no es pugen: HDM els sol·licitarà en revisar la seva sol·licitud.",
    attachmentTooLarge: "El fitxer supera la mida màxima permesa (25 MB).",
    attachmentTooMany: "Màxim 10 fitxers per sol·licitud.",
    attachmentBadType: "Tipus de fitxer no permès. Utilitzi PDF, Word, Excel, JPG o PNG.",
    attachmentRemove: "Treure fitxer",
    summaryTitle: "La seva sol·licitud",
    summaryLead: "Revisi-ho tot abans d'enviar. Pot editar qualsevol part.",
    summaryNeed: "Necessitat",
    summaryProfiles: "Equip sol·licitat",
    summaryLocation: "Ubicació",
    summaryStart: "Inici sol·licitat",
    summaryDuration: "Durada",
    summaryShift: "Torn",
    summaryLogistics: "Logística",
    summaryDocs: "Documentació",
    summarySector: "Sector",
    summaryTotal: "professionals en total",
    summaryDisclaimer:
      "Enviar aquesta sol·licitud no implica una contractació. HDM revisarà disponibilitat i requisits abans de confirmar condicions.",
    trustPanel: [
      "La pot modificar abans d'enviar",
      "No confirma contractació",
      "HDM revisarà disponibilitat",
      "Els seus documents s'utilitzaran per revisar la sol·licitud",
    ] as string[],
    contactTitle: "A qui responem?",
    contactLead: "Només el necessari per respondre a la seva sol·licitud. Res més.",
    contactCompany: "Empresa",
    contactName: "Persona de contacte",
    contactPhone: "Telèfon",
    contactEmail: "Correu electrònic",
    privacyNote:
      "Les seves dades s'usen únicament per gestionar aquesta sol·licitud. Consulti la política de privacitat.",
    submit: "Sol·licitar disponibilitat",
    submitting: "Enviant…",
    honeypotLabel: "No ompli aquest camp",
    successTitle: "Sol·licitud rebuda",
    successReference: "Referència",
    successBody:
      "HDM revisarà disponibilitat i requisits abans de confirmar la proposta. Desi la seva referència.",
    successDemoNote:
      "Entorn de demostració: la sol·licitud s'ha desat localment. Per a producció, configuri el backend (vegeu README).",
    successNew: "Crear una altra sol·licitud",
    failureTitle: "No hem pogut enviar la sol·licitud.",
    failureBody: "La seva informació continua aquí. Pot reintentar-ho o continuar per un altre canal.",
    failureRetry: "Reintentar",
    failureWhatsapp: "Continuar per WhatsApp",
    failureCall: "Trucar",
    emptyTitle: "La seva sol·licitud està buida",
    emptyBody:
      "Encara no ha afegit cap perfil. Comenci seleccionant els perfils que necessita o descrigui el treball.",
    emptyCta: "Configurar la meva sol·licitud",
    errors: {
      empty_request: "Introdueixi almenys 1 professional o descrigui el treball.",
      past_date: "La data d'incorporació no pot ser en el passat.",
      invalid_date: "Revisi la data d'inici.",
      invalid_phone: "Revisi el número de telèfon.",
      required: "Camp obligatori.",
      invalid_email: "Revisi el correu electrònic.",
      attachment_failed: "No hem pogut afegir aquest fitxer. La seva sol·licitud continua desada.",
      network: "Error de connexió. La seva informació continua aquí.",
      no_backend:
        "L'enviament en línia no està configurat en aquest entorn. Continuï per WhatsApp o telèfon: la seva sol·licitud està a punt per compartir.",
      unknown: "S'ha produït un error. La seva informació continua aquí.",
      invalid_input: "Revisi les dades introduïdes: algun camp no és vàlid o supera la longitud permesa.",
    },
    whatsappIntro: "Hola, he preparat una sol·licitud al web d'HDM.",
    whatsappNeed: "Necessito",
    whatsappLocation: "Ubicació",
    whatsappStart: "Inici sol·licitat",
    whatsappDuration: "Durada",
    whatsappClose: "Vull consultar disponibilitat.",
    whatsappDescribe: "Descripció del treball",
  },
};

const caPages = {
  howWeWork: {
    title: "Com treballem",
    lead:
      "HDM subministra personal industrial qualificat. Així es converteix una necessitat en un equip treballant.",
    sections: [
      {
        title: "Vostè defineix la necessitat",
        body: "Perfil, especialitat, quantitat, lloc i data. Ho pot fer des de qualsevol pàgina del lloc: la seva sol·licitud l'acompanya mentre navega.",
      },
      {
        title: "HDM revisa abans de confirmar",
        body: "Disponibilitat de perfils, requisits tècnics, certificacions i logística. Res no es confirma automàticament: cada sol·licitud es revisa.",
      },
      {
        title: "Documentació preparada",
        body: "Formació PRL i certificats de soldadura quan el perfil ho requereix. La documentació es prepara abans de la incorporació.",
      },
      {
        title: "Logística quan cal",
        body: "Desplaçament a Espanya i Portugal amb gestió d'allotjament, transport i dietes, declarada per HDM.",
      },
      {
        title: "Acompanyament durant el treball",
        body: "HDM continua atenent després de la incorporació. Si sorgeix un problema, té un interlocutor directe.",
      },
    ] as { title: string; body: string }[],
  },
  certifications: {
    title: "Certificacions i seguretat",
    lead:
      "El que podem afirmar avui, sense exagerar: personal amb formació PRL i certificats de soldadura.",
    prlTitle: "Formació PRL",
    prlBody:
      "El personal subministrat compta amb formació en prevenció de riscos laborals d'acord amb l'entorn de treball. Si el seu centre exigeix PRL específic, indiqui-ho a la sol·licitud.",
    weldingTitle: "Certificats de soldadura",
    weldingBody:
      "Els soldadors s'assignen segons el procés requerit —TIG, MIG/MAG o elèctrode— i la certificació de soldadura corresponent es revisa abans de confirmar.",
    docsTitle: "Documentació abans de començar",
    docsBody:
      "La documentació de cada incorporació es prepara abans de començar el treball. Adjunti els requisits del seu centre a la sol·licitud si en té.",
    honestyTitle: "Compromís de transparència",
    honestyBody:
      "Quan HDM disposi de certificacions addicionals documentades, es publicaran aquí amb la seva norma i abast exactes. Fins llavors, no les anunciem.",
  },
  projects: {
    title: "Projectes",
    lead:
      "Els projectes dels clients d'HDM són confidencials. Aquí es publicaran casos reals amb el format següent, quan existeixi autorització.",
    confidentialLabel: "Projecte confidencial",
    modelTitle: "Com explicarem els projectes",
    modelFields: [
      "Sector",
      "Zona",
      "Necessitat",
      "Perfils",
      "Quantitat",
      "Durada",
      "Repte",
      "Resposta HDM",
      "Resultat",
    ] as string[],
    emptyTitle: "Casos en preparació",
    emptyBody:
      "Encara no hi ha casos públics autoritzats. Mentrestant, la prova més directa és funcional: configuri una sol·licitud real i comprovi com respon HDM.",
  },
  company: {
    title: "Empresa",
    lead:
      "HDM Industrial subministra personal qualificat per a operacions industrials a Espanya i Portugal.",
    body1:
      "La indústria és l'entorn; les persones són el producte. HDM posa soldadors, calderers, muntadors, electricistes, electromecànics, mecànics industrials, ajudants i supervisors dins de l'operació del client, amb la documentació i la logística que el projecte exigeix.",
    body2:
      "Serietat, transparència i professionalisme són els valors declarats de l'empresa. El compromís d'HDM va més enllà de la incorporació: quan sorgeix un problema, HDM continua aquí.",
    body3:
      "Aquest lloc reflecteix aquesta forma de treballar: vostè configura el que necessita i HDM confirma el que pot posar en marxa. Sense promeses automàtiques.",
    valuesTitle: "Com es comporta HDM",
    values: [
      { name: "Serietat", body: "El que es confirma, es compleix. El que no està confirmat, es diu." },
      { name: "Transparència", body: "Sense xifres inflades ni promeses automàtiques. La disponibilitat es revisa i es comunica." },
      { name: "Professionalisme", body: "Perfils correctes, documentació preparada, interlocutor clar." },
    ] as { name: string; body: string }[],
    photoPending: "Fotografia real de l'equip HDM — pendent de lliurament",
  },
  contact: {
    title: "Contacte",
    lead:
      "La via més ràpida és la sol·licitud: arriba estructurada i HDM pot respondre amb precisió.",
    directTitle: "Contacte directe",
    pendingData:
      "Dades de contacte directe en configuració. Mentrestant, utilitzi la sol·licitud en línia.",
    formTitle: "O enviï un missatge",
    formNote: "Per a necessitats de personal, utilitzi la sol·licitud: recull el context amb més detall.",
    nameLabel: "Nom",
    messageLabel: "Missatge",
    send: "Enviar missatge",
    sent: "Missatge preparat. S'obrirà el seu client de correu.",
  },
  footer: {
    tagline: "Personal industrial qualificat, on el necessita.",
    explore: "Explorar",
    companyCol: "Empresa",
    legal: "Legal",
    legalNotice: "Avís legal",
    privacy: "Privacitat",
    cookies: "Cookies",
    editorialNote:
      "Les fotografies d'ambient industrial són editorials i no representen instal·lacions ni personal d'HDM.",
    fiscalNote: "HDM Industrial — Domicili fiscal a Portugal. Dades registrals completes a l'avís legal.",
  },
  cookiesBanner: {
    title: "Cookies",
    body: "Utilitzem cookies tècniques perquè el lloc funcioni i, només si vostè accepta, mesurament anònim d'ús. Sense publicitat ni seguiment comercial.",
    accept: "Acceptar mesurament",
    reject: "Només tècniques",
    more: "Més informació",
  },
  legal: {
    aviso: {
      title: "Avís legal",
      body: "Pàgina d'avís legal. Les dades registrals completes d'HDM Industrial (denominació, NIF, domicili fiscal a Portugal i dades de contacte) es publicaran aquí quan el departament legal les confirmi. Mentrestant, aquesta pàgina existeix com a espai reservat funcional i no s'ha d'indexar.",
    },
    privacidad: {
      title: "Política de privacitat",
      intro: "Resum clar de com es tracten les dades en aquest lloc.",
      sections: [
        { title: "Quines dades demanem", body: "Només les necessàries per gestionar la seva sol·licitud: empresa, persona de contacte, telèfon i correu electrònic, a més del context de la necessitat (perfils, lloc, dates, logística i documents que adjunti voluntàriament)." },
        { title: "Per a què s'usen", body: "Únicament per revisar la disponibilitat, preparar una proposta i comunicar-nos amb vostè sobre aquesta sol·licitud." },
        { title: "El que no fem", body: "No venem dades, no les usem per a publicitat de tercers i no enviem dades personals a eines d'analítica." },
        { title: "Documents adjunts", body: "Els documents que adjunti es tracten de forma privada i s'usen només per avaluar la seva sol·licitud." },
        { title: "Dades de candidats", body: "Si envies el teu currículum des de la secció Treballa amb nosaltres, les teves dades i el teu CV s'usen únicament per valorar la teva candidatura davant necessitats de personal d'HDM. No es cedeixen a tercers ni s'usen per a publicitat." },
        { title: "Els seus drets", body: "Pot sol·licitar accés, rectificació o eliminació de les seves dades contactant amb HDM pels canals de contacte." },
      ] as { title: string; body: string }[],
    },
    cookies: {
      title: "Política de cookies",
      intro: "Aquest lloc usa el mínim de cookies possible.",
      sections: [
        { title: "Cookies tècniques", body: "Necessàries perquè el lloc funcioni: la seva sol·licitud es desa al seu navegador per no perdre-la en navegar. No requereixen consentiment." },
        { title: "Mesurament d'ús", body: "Només si vostè accepta, es carrega mesurament anònim d'ús per millorar el lloc. Si rebutja, no es carrega cap script de mesurament." },
        { title: "Sense publicitat", body: "No hi ha cookies publicitàries ni de seguiment comercial de tercers." },
      ] as { title: string; body: string }[],
    },
  },
  notFound: {
    title: "Pàgina no trobada",
    body: "La pàgina que cerca no existeix o ha canviat d'adreça. La seva sol·licitud, si en tenia una en curs, continua desada.",
    cta: "Tornar a l'inici",
  },
};

export const caCareers = {
  careers: {
    eyebrow: "HDM Industrial",
    title: "Treballa amb nosaltres",
    lead: "HDM subministra personal industrial qualificat per a operacions a Espanya i Portugal. Si tens experiència en perfils industrials, envia'ns el teu currículum: el revisem quan sorgeix una necessitat que encaixi amb el teu perfil.",
    honestyTitle: "Sense ofertes publicades",
    honestyBody: "Aquest lloc no publica ofertes. Enviar el teu CV no garanteix una oferta concreta: el teu perfil queda disponible per quan HDM necessiti cobrir una necessitat de personal, i et contacta si encaixa.",
    profilesTitle: "Perfils en què opera HDM",
    processTitle: "Com funciona",
    processSteps: [
      { title: "Envia el teu currículum", body: "Completa el formulari: es prepararà un correu dirigit a rrhh@hdmindustrial.es. Adjunta el teu CV abans d'enviar." },
      { title: "HDM revisa el teu perfil", body: "L'equip revisa la teva experiència i el teu perfil professional." },
      { title: "Contacte si encaixa", body: "Si sorgeix una necessitat que encaixi amb el teu perfil, HDM et contacta. Si no hi ha encaix en aquell moment, no hi ha resposta en aquesta ocasió." },
    ] as { title: string; body: string }[],
    formTitle: "Envia el teu currículum",
    formLead: "S'obrirà el teu client de correu amb el missatge preparat. Revisa les dades i adjunta el teu currículum abans d'enviar.",
    nameLabel: "Nom",
    emailLabel: "Correu electrònic",
    phoneLabel: "Telèfon",
    profileLabel: "Perfil",
    profilePlaceholder: "Selecciona el teu perfil",
    profileOther: "Altre perfil industrial",
    attachLabel: "Currículum (PDF, Word o imatge)",
    attachCta: "Seleccionar fitxer",
    attachSelected: "Fitxer seleccionat",
    attachPrivacy: "El teu CV es tracta de forma privada i s'usa només per valorar la teva candidatura.",
    attachEmailLabel: "Currículum",
    submitSuccess: "Currículum enviat — gràcies. HDM revisarà el teu perfil i et contactarà si encaixa amb una necessitat.",
    zoneLabel: "Zona / ciutat (opcional)",
    messageLabel: "Missatge (opcional)",
    privacyNote: "Les teves dades s'usen únicament per valorar la teva candidatura. Consulta la política de privacitat.",
    send: "Preparar correu amb el meu CV",
  },
};

export const caDictionary: Dictionary = { ...ca, ...caRequest, ...caPages, ...caCareers };
