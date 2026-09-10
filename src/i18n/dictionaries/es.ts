/**
 * Diccionario ES (raíz /) — español de España, profesional, directo, natural.
 * Copy conservador: sin claims sin prueba (ver claims.ts). Sin lorem ipsum.
 */
export const es = {
  meta: {
    siteName: "HDM Industrial",
    defaultTitle: "HDM Industrial — Personal industrial cualificado, donde lo necesita",
    defaultDescription:
      "Suministro de personal industrial cualificado: soldadores TIG, MIG/MAG y electrodo, caldereros, montadores, electricistas industriales y supervisores. Díganos qué necesita y HDM revisa la disponibilidad.",
    ogDescription:
      "Configure su necesidad de personal industrial en minutos. HDM revisa disponibilidad y requisitos antes de confirmar la propuesta.",
  },
  nav: {
    profiles: "Personal industrial",
    solutions: "Soluciones",
    sectors: "Sectores",
    coverage: "Cobertura",
    howWeWork: "Cómo trabajamos",
    certifications: "Certificaciones y seguridad",
    projects: "Proyectos",
    company: "Empresa",
    contact: "Contacto",
    request: "Solicitar personal",
    myRequest: "Mi solicitud",
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
  },
  common: {
    requestCta: "Solicitar disponibilidad",
    requestPersonal: "Solicitar personal",
    addToRequest: "Añadir a mi solicitud",
    added: "Añadido",
    viewRequest: "Ver solicitud",
    editRequest: "Editar",
    remove: "Quitar",
    back: "Volver",
    next: "Continuar",
    professionals: "profesionales",
    professional: "profesional",
    profilesLabel: "perfiles",
    profileLabel: "perfil",
    from: "Desde",
    readMore: "Ver más",
    editorialPhoto: "Imagen editorial de ambiente industrial. No representa instalaciones ni personal de HDM.",
    pendingAsset: "Espacio reservado para material real de HDM",
    navPrimary: "Navegación principal",
    navPrimaryMobile: "Navegación principal móvil",
    requestProgress: "Progreso de la solicitud",
    requestMode: "Modo de solicitud",
    spain: "España",
    portugal: "Portugal",
    whatsapp: "WhatsApp",
    call: "Llamar",
    email: "Email",
    allProfiles: "Ver todos los perfiles",
    startRequestHere: "Empezar solicitud con este perfil",
    startRequestArea: "Planificar un proyecto en esta zona",
    startRequestSolution: "Solicitar esta solución",
  },
  home: {
    heroEyebrow: "Suministro de personal industrial cualificado",
    heroTitle: "El personal industrial que necesita, donde lo necesita.",
    heroLead:
      "Soldadores TIG, MIG/MAG y electrodo, caldereros, montadores, electricistas industriales y supervisores. Configure su necesidad y HDM revisa la disponibilidad antes de confirmar.",
    heroNote:
      "Sin compromiso: su solicitud no confirma disponibilidad. HDM la revisa y responde.",
    heroStart: "Empezar mi solicitud",
    heroSecondary: "Ver perfiles industriales",
    scaleEyebrow: "Capacidad organizada",
    coverageEyebrow: "Cobertura",
    processEyebrow: "Cómo trabajamos",
    trustEyebrow: "Certificaciones y seguridad",
    sectorsEyebrow: "Sectores",
    solutionsEyebrow: "Soluciones",
    scale: {
      profiles: "tipos de perfil",
      specializations: "especialidades de soldadura",
      modes: "modalidades operativas",
      areas: "áreas de proyecto",
      sectors: "sectores confirmados",
    } as Record<string, string>,
    heroComposerTitle: "Configure su equipo",
    heroComposerNote: "Su solicitud le acompaña mientras navega. Nada se envía hasta que usted decida.",
    profilesTitle: "¿Qué perfil necesita?",
    profilesLead:
      "Seleccione perfiles y cantidades. Puede combinar varios perfiles en una misma solicitud.",
    coverageTitle: "¿Dónde está su proyecto?",
    coverageLead:
      "Zonas donde HDM suministra personal para proyectos. Seleccione su zona para empezar: la cobertura indica área de trabajo, no disponibilidad en tiempo real.",
    processTitle: "De la necesidad a la movilización",
    processLead:
      "Un proceso claro, sin promesas vacías: usted define la necesidad, HDM confirma lo que puede poner en marcha.",
    processSteps: [
      {
        title: "Configure su necesidad",
        body: "Perfiles, especialidades, cantidades, lugar, fechas y logística. Sin formularios burocráticos: una configuración clara.",
      },
      {
        title: "HDM revisa disponibilidad",
        body: "El equipo de HDM revisa perfiles, requisitos y documentación antes de confirmar nada.",
      },
      {
        title: "Propuesta y movilización",
        body: "Recibe una propuesta concreta. Si el proyecto lo requiere, HDM gestiona desplazamiento, alojamiento, transporte y dietas.",
      },
      {
        title: "Acompañamiento",
        body: "HDM sigue atendiendo durante el trabajo. Si surge un problema, tiene un interlocutor.",
      },
    ] as { title: string; body: string }[],
    trustTitle: "Documentación y seguridad, sin letra pequeña",
    trustLead:
      "Personal con formación PRL y certificados de soldadura. La documentación de cada incorporación se prepara antes de empezar.",
    sectorsTitle: "Sectores en los que trabaja el personal",
    solutionsTitle: "Soluciones para cada situación operativa",
    finalCtaTitle: "Díganos qué personal necesita.",
    finalCtaLead:
      "Monte su solicitud en minutos. HDM revisa disponibilidad y requisitos antes de confirmar la propuesta.",
    finalCtaButton: "Solicitar disponibilidad",
  },
  profiles: {
    title: "Personal industrial",
    lead:
      "Perfiles profesionales confirmados que HDM suministra para operaciones industriales en España y Portugal.",
    pageTitleSuffix: "industriales",
    specializationLabel: "Especialidades",
    whatTheyDo: "Qué hace este perfil",
    requirements: "Requisitos habituales",
    relatedSectors: "Sectores habituales",
    items: {
      soldador: {
        name: "Soldadores",
        singular: "Soldador",
        short: "Soldadura TIG, MIG/MAG y electrodo para obra, planta y paradas.",
        description:
          "Soldadores industriales para trabajos en taller, obra y planta. Indique el proceso de soldadura que necesita —TIG, MIG/MAG o electrodo revestido— y los requisitos del proyecto: HDM revisa la disponibilidad de perfiles con la certificación de soldadura adecuada.",
        requirements:
          "Certificado de soldadura según proceso requerido. Formación PRL. Experiencia en entorno industrial.",
      },
      calderero: {
        name: "Caldereros",
        singular: "Calderero",
        short: "Calderería, tubería y estructura metálica pesada.",
        description:
          "Caldereros para trabajos de calderería, trazado, conformado y montaje de chapa, tubería y estructuras metálicas en entorno industrial. Adecuados para paradas, mantenimiento y proyectos de fabricación.",
        requirements: "Formación PRL. Experiencia demostrable en calderería industrial.",
      },
      montador: {
        name: "Montadores de estructuras",
        singular: "Montador",
        short: "Montaje de estructuras metálicas y equipos industriales.",
        description:
          "Montadores de estructuras para levantado, ajuste y montaje de estructura metálica, soportación y equipos en obra e industria. Perfil habituado a trabajo en altura y coordinación de izajes.",
        requirements: "Formación PRL. Experiencia en montaje de estructuras y trabajo en altura.",
      },
      electricista: {
        name: "Electricistas industriales",
        singular: "Electricista industrial",
        short: "Instalaciones, cuadros y cableado en entorno industrial.",
        description:
          "Electricistas industriales para instalación, cableado, cuadros eléctricos y mantenimiento eléctrico en planta y obra industrial. Indique tensión de trabajo y tipo de instalación al configurar su solicitud.",
        requirements: "Formación PRL. Cualificación eléctrica acorde al trabajo a realizar.",
      },
      constructor: {
        name: "Constructores y ayudantes",
        singular: "Constructor / ayudante",
        short: "Apoyo operativo para obra y trabajos industriales.",
        description:
          "Constructores y ayudantes para apoyo en obra, preparación, auxilio a oficios y tareas operativas generales en proyectos industriales. La forma más directa de reforzar una cuadrilla.",
        requirements: "Formación PRL básica según el entorno de trabajo.",
      },
      supervisor: {
        name: "Supervisores y encargados",
        singular: "Supervisor / encargado",
        short: "Coordinación de cuadrillas y control de ejecución.",
        description:
          "Supervisores y encargados para coordinar cuadrillas, controlar la ejecución del trabajo y servir de interlocutor entre su operación y el personal suministrado. Recomendable en solicitudes de varios perfiles.",
        requirements: "Experiencia demostrable coordinando equipos en entorno industrial.",
      },
    } as Record<
      string,
      { name: string; singular: string; short: string; description: string; requirements: string }
    >,
    specializations: {
      tig: { name: "TIG", description: "Soldadura de precisión, acabados finos y materiales finos." },
      "mig-mag": { name: "MIG/MAG", description: "Soldadura semiautomática de alta productividad." },
      electrodo: { name: "Electrodo", description: "Soldadura con electrodo revestido, obra y exterior." },
    } as Record<string, { name: string; description: string }>,
  },
  sectors: {
    title: "Sectores",
    lead: "Entornos donde trabaja el personal suministrado por HDM.",
    items: {
      industria: {
        name: "Industria general",
        intro:
          "Personal para plantas y operaciones industriales de todo tipo: refuerzos de producción, picos de trabajo y necesidades puntuales de mano de obra cualificada.",
      },
      construccion: {
        name: "Construcción",
        intro:
          "Montadores, soldadores y ayudantes para obra: estructura metálica, instalaciones y trabajos con plazos que no admiten retrasos.",
      },
      "mantenimiento-industrial": {
        name: "Mantenimiento industrial",
        intro:
          "Perfiles técnicos para mantenimiento preventivo y correctivo en planta, con la documentación y la especialidad que cada intervención exige.",
      },
      energia: {
        name: "Energía",
        intro:
          "Personal industrial para proyectos del sector energético, donde la cualificación del perfil y la documentación son condiciones de entrada.",
      },
      fabricacion: {
        name: "Fabricación",
        intro:
          "Personal para empresas de fabricación que necesitan reforzar sus equipos: soldadores, caldereros y montadores integrados en la operación del cliente.",
      },
      petroquimica: {
        name: "Petroquímica",
        intro:
          "Perfiles industriales para entornos exigentes de petroquímica, con requisitos documentales y de seguridad específicos que se revisan en cada solicitud.",
      },
    } as Record<string, { name: string; intro: string }>,
  },
  coverage: {
    title: "Cobertura",
    lead:
      "Zonas de proyecto donde HDM suministra personal industrial. La cobertura no implica oficinas locales ni disponibilidad en tiempo real: indique su zona y HDM confirma.",
    mapLabel: "Mapa de zonas de proyecto en España y Portugal",
    listLabel: "Lista de zonas",
    items: {
      barcelona: {
        name: "Barcelona",
        intro:
          "Suministro de personal industrial para proyectos en el área de Barcelona y su corredor industrial: soldadores, montadores, electricistas y perfiles de apoyo.",
      },
      tarragona: {
        name: "Tarragona",
        intro:
          "Personal para el polo industrial de Tarragona: paradas, mantenimiento y proyectos en entorno químico y de proceso, con perfiles habituados a sus requisitos.",
      },
      valencia: {
        name: "Valencia",
        intro:
          "Refuerzo de cuadrillas industriales para proyectos en Valencia: obra, planta y trabajos programados con perfiles confirmados por HDM.",
      },
      madrid: {
        name: "Madrid",
        intro:
          "Suministro de personal industrial en Madrid para obra, mantenimiento y proyectos de fabricación, con coordinación directa con su equipo.",
      },
      "pais-vasco": {
        name: "País Vasco",
        intro:
          "Personal cualificado para el tejido industrial del País Vasco: caldereros, soldadores y montadores para proyectos con exigencia técnica.",
      },
      portugal: {
        name: "Portugal",
        intro:
          "HDM opera también en Portugal, con capacidad de desplazamiento y logística declarada para proyectos en territorio portugués.",
      },
    } as Record<string, { name: string; intro: string }>,
  },
  solutions: {
    title: "Soluciones",
    lead: "Formas concretas de resolver una necesidad de personal industrial.",
    items: {
      "paradas-industriales": {
        name: "Paradas industriales",
        intro:
          "Paradas programadas y urgentes concentran mucho trabajo en poco tiempo. Configure perfiles, cantidades y turnos: HDM revisa qué equipo puede movilizar para su ventana de parada.",
        points: [
          "Equipos multiperfil: soldadores, caldereros, montadores y supervisión.",
          "Indique turnos y duración estimada de la parada.",
          "La disponibilidad se confirma tras revisar su solicitud.",
        ],
      },
      "refuerzo-de-personal": {
        name: "Refuerzo de personal",
        intro:
          "Cuando la plantilla no llega: refuerzo continuado de su operación con personal industrial cualificado integrado en sus equipos y sus horarios.",
        points: [
          "Trabajo continuado o fijo en cliente.",
          "Perfiles técnicos y de apoyo, combinables.",
          "Seguimiento de HDM durante toda la colaboración.",
        ],
      },
      "sustitucion-temporal": {
        name: "Sustitución temporal",
        intro:
          "Bajas, vacaciones o ausencias que no pueden frenar la producción. Solicite sustituciones temporales del perfil exacto que necesita cubrir.",
        points: [
          "Mismo perfil y especialidad que la persona a sustituir.",
          "Duración flexible según la situación.",
          "Documentación preparada antes de la incorporación.",
        ],
      },
      "trabajos-puntuales": {
        name: "Trabajos puntuales y obra",
        intro:
          "Un proyecto concreto con una fecha de fin. Suministro de personal para trabajos puntuales y obra: montaje, soldadura, estructura y apoyo operativo.",
        points: [
          "Equipos dimensionados al trabajo: desde 1 persona a cuadrillas completas.",
          "Fechas y duración definidas por usted.",
          "Supervisión opcional para equipos grandes.",
        ],
      },
      "personal-con-desplazamiento": {
        name: "Personal con desplazamiento",
        intro:
          "Su proyecto no está donde está el personal. HDM declara capacidad de gestionar desplazamiento en España y Portugal, incluyendo alojamiento, transporte y dietas.",
        points: [
          "Desplazamientos en España y Portugal.",
          "Gestión de alojamiento, transporte y dietas declarada por HDM.",
          "Indique la logística necesaria al configurar la solicitud.",
        ],
      },
    } as Record<string, { name: string; intro: string; points: string[] }>,
  },
};

export const esRequest = {
  request: {
    title: "Solicitar personal",
    indicatorEmpty: "Solicitar personal",
    indicatorWithItems: "Mi solicitud",
    stepNeed: "Necesidad",
    stepProfiles: "Perfiles",
    stepProject: "Proyecto",
    stepLogistics: "Logística",
    stepSummary: "Resumen",
    stepContact: "Contacto",
    needTitle: "¿Qué necesita?",
    needLead: "Seleccione el tipo de necesidad. El sistema adapta las preguntas.",
    needTypes: {
      "trabajo-puntual": { name: "Trabajo puntual / obra", hint: "Un proyecto concreto con fecha de fin." },
      "sustitucion-temporal": { name: "Sustitución temporal", hint: "Cubrir una baja o ausencia." },
      "parada-programada": { name: "Parada programada", hint: "Una ventana de parada con fecha conocida." },
      "parada-urgente": { name: "Parada urgente", hint: "Incidencia que exige actuar ya." },
      "trabajo-continuado": { name: "Trabajo continuado", hint: "Refuerzo fijo o continuado en su empresa." },
    } as Record<string, { name: string; hint: string }>,
    modeExpert: "Sé qué perfiles necesito",
    modeAssisted: "No sé exactamente qué perfil necesito",
    assistedTitle: "Describa el trabajo",
    assistedLead:
      "No pasa nada si no tiene claro el perfil. Describa el trabajo y lo revisamos con usted.",
    assistedPlaceholder:
      "Ej.: Necesitamos reforzar la soldadura de tubería en una parada de 2 semanas…",
    assistedQuantity: "Cantidad aproximada de personas",
    profilesTitle: "Configure su equipo",
    profilesLead: "Añada perfiles y cantidades. Puede combinar varios perfiles en la misma solicitud.",
    addProfile: "Añadir otro perfil",
    specialization: "Especialidad",
    quantity: "Cantidad",
    decrease: "Reducir cantidad",
    increase: "Aumentar cantidad",
    quantityInput: "Cantidad de profesionales",
    requirementsLabel: "Requisitos del perfil (opcional)",
    requirementsHint: "Ej.: certificado de soldadura TIG en tubo, experiencia en inox…",
    teamTotal: "profesionales",
    teamProfiles: "perfiles",
    projectTitle: "Proyecto",
    projectLead: "Cuéntenos dónde y cuándo. HDM confirma después la disponibilidad.",
    timingLabel: "¿Para cuándo?",
    timing: {
      urgente: "Lo antes posible",
      "esta-semana": "Esta semana",
      "este-mes": "Este mes",
      "fecha-concreta": "Fecha programada",
      "sin-fecha": "Todavía sin fecha",
    } as Record<string, string>,
    startDateLabel: "Fecha de inicio solicitada",
    durationLabel: "Duración estimada",
    durationValueLabel: "Duración",
    durationUnits: {
      dias: "días",
      semanas: "semanas",
      meses: "meses",
      continuado: "Continuado",
      "por-definir": "Por definir",
    },
    durationPlaceholder: "Ej.: 3",
    shiftLabel: "Turno (opcional)",
    shiftPlaceholder: "Ej.: mañanas, rotativo, noche…",
    locationLabel: "Zona del proyecto",
    locationHint: "Zona de trabajo del proyecto. No implica disponibilidad en tiempo real.",
    cityLabel: "Ciudad / municipio (opcional)",
    addressLabel: "Dirección o referencia (opcional)",
    sectorLabel: "Sector (opcional)",
    descriptionLabel: "Descripción del trabajo (opcional)",
    logisticsTitle: "Logística y requisitos",
    logisticsLead: "¿El proyecto requiere desplazamiento del personal? HDM declara capacidad de gestión logística.",
    displacement: "El proyecto requiere desplazamiento",
    displacementScope: "Ámbito del desplazamiento",
    displacementEspana: "España",
    displacementPortugal: "Portugal",
    accommodation: "Alojamiento",
    transport: "Transporte",
    allowances: "Dietas / manutención",
    logisticsYes: "Necesario",
    logisticsNo: "No necesario",
    logisticsTbd: "Por definir",
    logisticsNotes: "Notas de logística (opcional)",
    certsQuestion: "¿Su proyecto exige alguna certificación específica?",
    certsYes: "Sí",
    certsNo: "No",
    certsUnknown: "No lo sé",
    certsLabel: "Indique la certificación exigida",
    certsHint: "Ej.: PRL específico del centro, certificado de soldadura por proceso…",
    attachmentsTitle: "Documentación",
    attachmentsLead:
      "Adjunte pliegos, requisitos o planos si los tiene. Formatos: PDF, Word, Excel, JPG, PNG. Máx. 25 MB por archivo.",
    attachmentsCta: "Adjuntar documento",
    attachmentsNote:
      "Los documentos se tratan de forma privada. En este entorno de demostración los archivos no se suben: HDM los solicitará al revisar su solicitud.",
    attachmentTooLarge: "El archivo supera el tamaño máximo permitido (25 MB).",
      attachmentTooMany: "Máximo 10 archivos por solicitud.",
    attachmentBadType: "Tipo de archivo no permitido. Use PDF, Word, Excel, JPG o PNG.",
    attachmentRemove: "Quitar archivo",
    summaryTitle: "Su solicitud",
    summaryLead: "Revise todo antes de enviar. Puede editar cualquier parte.",
    summaryNeed: "Necesidad",
    summaryProfiles: "Equipo solicitado",
    summaryLocation: "Ubicación",
    summaryStart: "Inicio solicitado",
    summaryDuration: "Duración",
    summaryShift: "Turno",
    summaryLogistics: "Logística",
    summaryDocs: "Documentación",
    summarySector: "Sector",
    summaryTotal: "profesionales en total",
    summaryDisclaimer:
      "Enviar esta solicitud no implica una contratación. HDM revisará disponibilidad y requisitos antes de confirmar condiciones.",
    trustPanel: [
      "Puede modificarla antes de enviar",
      "No confirma contratación",
      "HDM revisará disponibilidad",
      "Sus documentos se utilizarán para revisar la solicitud",
    ] as string[],
    contactTitle: "¿A quién respondemos?",
    contactLead: "Solo lo necesario para responder a su solicitud. Nada más.",
    contactCompany: "Empresa",
    contactName: "Persona de contacto",
    contactPhone: "Teléfono",
    contactEmail: "Email",
    privacyNote:
      "Sus datos se usan únicamente para gestionar esta solicitud. Consulte la política de privacidad.",
    submit: "Solicitar disponibilidad",
    submitting: "Enviando…",
    honeypotLabel: "No rellene este campo",
    successTitle: "Solicitud recibida",
    successReference: "Referencia",
    successBody:
      "HDM revisará disponibilidad y requisitos antes de confirmar la propuesta. Guarde su referencia.",
    successDemoNote:
      "Entorno de demostración: la solicitud se ha guardado localmente. Para producción, configure el backend (ver README).",
    successNew: "Crear otra solicitud",
    failureTitle: "No hemos podido enviar la solicitud.",
    failureBody: "Su información sigue aquí. Puede reintentar o continuar por otro canal.",
    failureRetry: "Reintentar",
    failureWhatsapp: "Continuar por WhatsApp",
    failureCall: "Llamar",
    emptyTitle: "Su solicitud está vacía",
    emptyBody:
      "Aún no ha añadido ningún perfil. Empiece seleccionando los perfiles que necesita o describa el trabajo.",
    emptyCta: "Configurar mi solicitud",
    errors: {
      empty_request: "Introduzca al menos 1 profesional o describa el trabajo.",
      past_date: "La fecha de incorporación no puede estar en el pasado.",
      invalid_date: "Revise la fecha de inicio.",
      invalid_phone: "Revise el número de teléfono.",
      required: "Campo obligatorio.",
      invalid_email: "Revise el correo electrónico.",
      attachment_failed: "No hemos podido añadir este archivo. Su solicitud sigue guardada.",
      network: "Error de conexión. Su información sigue aquí.",
      no_backend:
        "El envío online no está configurado en este entorno. Continúe por WhatsApp o teléfono: su solicitud está lista para compartir.",
      invalid_input: "Revise los datos introducidos: algún campo no es válido o supera la longitud permitida.",
      unknown: "Ha ocurrido un error. Su información sigue aquí.",
    },
    whatsappIntro: "Hola, he preparado una solicitud en la web de HDM.",
    whatsappNeed: "Necesito",
    whatsappLocation: "Ubicación",
    whatsappStart: "Inicio solicitado",
    whatsappDuration: "Duración",
    whatsappClose: "Quiero consultar disponibilidad.",
    whatsappDescribe: "Descripción del trabajo",
  },
};

export const esPages = {
  howWeWork: {
    title: "Cómo trabajamos",
    lead:
      "HDM suministra personal industrial cualificado. Así se convierte una necesidad en un equipo trabajando.",
    sections: [
      {
        title: "Usted define la necesidad",
        body: "Perfil, especialidad, cantidad, lugar y fecha. Puede hacerlo desde cualquier página del sitio: su solicitud le acompaña mientras navega.",
      },
      {
        title: "HDM revisa antes de confirmar",
        body: "Disponibilidad de perfiles, requisitos técnicos, certificaciones y logística. Nada se confirma automáticamente: cada solicitud se revisa.",
      },
      {
        title: "Documentación preparada",
        body: "Formación PRL y certificados de soldadura cuando el perfil lo requiere. La documentación se prepara antes de la incorporación.",
      },
      {
        title: "Logística cuando hace falta",
        body: "Desplazamiento en España y Portugal con gestión de alojamiento, transporte y dietas, declarada por HDM.",
      },
      {
        title: "Acompañamiento durante el trabajo",
        body: "HDM sigue atendiendo después de la incorporación. Si surge un problema, tiene un interlocutor directo.",
      },
    ] as { title: string; body: string }[],
  },
  certifications: {
    title: "Certificaciones y seguridad",
    lead:
      "Lo que podemos afirmar hoy, sin exagerar: personal con formación PRL y certificados de soldadura.",
    prlTitle: "Formación PRL",
    prlBody:
      "El personal suministrado cuenta con formación en prevención de riesgos laborales acorde al entorno de trabajo. Si su centro exige PRL específico, indíquelo en la solicitud.",
    weldingTitle: "Certificados de soldadura",
    weldingBody:
      "Los soldadores se asignan según el proceso requerido —TIG, MIG/MAG o electrodo— y la certificación de soldadura correspondiente se revisa antes de confirmar.",
    docsTitle: "Documentación antes de empezar",
    docsBody:
      "La documentación de cada incorporación se prepara antes de empezar el trabajo. Adjunte los requisitos de su centro a la solicitud si los tiene.",
    honestyTitle: "Compromiso de transparencia",
    honestyBody:
      "Cuando HDM disponga de certificaciones adicionales documentadas, se publicarán aquí con su norma y alcance exactos. Hasta entonces, no las anunciamos.",
  },
  projects: {
    title: "Proyectos",
    lead:
      "Los proyectos de los clientes de HDM son confidenciales. Aquí se publicarán casos reales con el formato siguiente, cuando exista autorización.",
    confidentialLabel: "Proyecto confidencial",
    modelTitle: "Cómo contaremos los proyectos",
    modelFields: [
      "Sector",
      "Zona",
      "Necesidad",
      "Perfiles",
      "Cantidad",
      "Duración",
      "Reto",
      "Respuesta HDM",
      "Resultado",
    ] as string[],
    emptyTitle: "Casos en preparación",
    emptyBody:
      "Aún no hay casos públicos autorizados. Mientras tanto, la prueba más directa es funcional: configure una solicitud real y compruebe cómo responde HDM.",
  },
  company: {
    title: "Empresa",
    lead:
      "HDM Industrial suministra personal cualificado para operaciones industriales en España y Portugal.",
    body1:
      "La industria es el entorno; las personas son el producto. HDM pone soldadores, caldereros, montadores, electricistas, ayudantes y supervisores dentro de la operación del cliente, con la documentación y la logística que el proyecto exige.",
    body2:
      "Seriedad, transparencia y profesionalismo son los valores declarados de la empresa. El compromiso de HDM va más allá de la incorporación: cuando surge un problema, HDM sigue ahí.",
    body3:
      "Este sitio refleja esa forma de trabajar: usted configura lo que necesita y HDM confirma lo que puede poner en marcha. Sin promesas automáticas.",
    valuesTitle: "Cómo se comporta HDM",
    values: [
      { name: "Seriedad", body: "Lo que se confirma, se cumple. Lo que no está confirmado, se dice." },
      { name: "Transparencia", body: "Sin cifras infladas ni promesas automáticas. La disponibilidad se revisa y se comunica." },
      { name: "Profesionalismo", body: "Perfiles correctos, documentación preparada, interlocutor claro." },
    ] as { name: string; body: string }[],
    photoPending: "Fotografía real del equipo HDM — pendiente de entrega",
  },
  contact: {
    title: "Contacto",
    lead:
      "La vía más rápida es la solicitud: llega estructurada y HDM puede responder con precisión.",
    directTitle: "Contacto directo",
    pendingData:
      "Datos de contacto directo en configuración. Mientras tanto, use la solicitud online.",
    formTitle: "O envíe un mensaje",
    formNote: "Para necesidades de personal, use la solicitud: recoge el contexto con más detalle.",
    nameLabel: "Nombre",
    messageLabel: "Mensaje",
    send: "Enviar mensaje",
    sent: "Mensaje preparado. Se abrirá su cliente de correo.",
  },
  footer: {
    tagline: "Personal industrial cualificado, donde lo necesita.",
    explore: "Explorar",
    companyCol: "Empresa",
    legal: "Legal",
    legalNotice: "Aviso legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    editorialNote:
      "Las fotografías de ambiente industrial son editoriales y no representan instalaciones ni personal de HDM.",
    fiscalNote: "HDM Industrial — Domicilio fiscal en Portugal. Datos registrales completos en aviso legal.",
  },
  cookiesBanner: {
    title: "Cookies",
    body: "Usamos cookies técnicas para que el sitio funcione y, solo si usted acepta, medición anónima de uso. Sin publicidad ni seguimiento comercial.",
    accept: "Aceptar medición",
    reject: "Solo técnicas",
    more: "Más información",
  },
  legal: {
    aviso: {
      title: "Aviso legal",
      body: "Página de aviso legal. Los datos registrales completos de HDM Industrial (denominación, NIF, domicilio fiscal en Portugal y datos de contacto) se publicarán aquí cuando el departamento legal los confirme. Mientras tanto, esta página existe como espacio reservado funcional y no debe indexarse.",
    },
    privacidad: {
      title: "Política de privacidad",
      intro: "Resumen claro de cómo se tratan los datos en este sitio.",
      sections: [
        { title: "Qué datos pedimos", body: "Solo los necesarios para gestionar su solicitud: empresa, persona de contacto, teléfono y email, además del contexto de la necesidad (perfiles, lugar, fechas, logística y documentos que adjunte voluntariamente)." },
        { title: "Para qué se usan", body: "Únicamente para revisar la disponibilidad, preparar una propuesta y comunicarnos con usted sobre esa solicitud." },
        { title: "Lo que no hacemos", body: "No vendemos datos, no los usamos para publicidad de terceros y no enviamos datos personales a herramientas de analítica." },
        { title: "Documentos adjuntos", body: "Los documentos que adjunte se tratan de forma privada y se usan solo para evaluar su solicitud." },
        { title: "Sus derechos", body: "Puede solicitar acceso, rectificación o eliminación de sus datos contactando con HDM por los canales de contacto." },
      ] as { title: string; body: string }[],
    },
    cookies: {
      title: "Política de cookies",
      intro: "Este sitio usa el mínimo de cookies posible.",
      sections: [
        { title: "Cookies técnicas", body: "Necesarias para que el sitio funcione: su solicitud se guarda en su navegador para no perderla al navegar. No requieren consentimiento." },
        { title: "Medición de uso", body: "Solo si usted acepta, se carga medición anónima de uso para mejorar el sitio. Si rechaza, no se carga ningún script de medición." },
        { title: "Sin publicidad", body: "No hay cookies publicitarias ni de seguimiento comercial de terceros." },
      ] as { title: string; body: string }[],
    },
  },
  notFound: {
    title: "Página no encontrada",
    body: "La página que busca no existe o ha cambiado de dirección. Su solicitud, si tenía una en curso, sigue guardada.",
    cta: "Volver al inicio",
  },
};

export const esDictionary = { ...es, ...esRequest, ...esPages };
export type Dictionary = typeof esDictionary;
