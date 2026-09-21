/**
 * EN dictionary — professional international (British-leaning) business English.
 * Conservative copy: no unproven claims (see claims.ts). No lorem ipsum.
 * Mirrors the ES dictionary key-for-key.
 */
import { type Dictionary } from "./es";

const en = {
  meta: {
    siteName: "HDM Industrial",
    defaultTitle: "HDM Industrial — Qualified industrial personnel, where you need them",
    defaultDescription:
      "Supply of qualified industrial personnel: TIG, MIG/MAG and stick welders, boilermakers, structural fitters, industrial electricians and supervisors. Tell us what you need and HDM will review availability.",
    ogDescription:
      "Configure your industrial personnel requirement in minutes. HDM reviews availability and requirements before confirming the proposal.",
  },
  nav: {
    profiles: "Industrial personnel",
    solutions: "Solutions",
    sectors: "Sectors",
    coverage: "Coverage",
    howWeWork: "How we work",
    certifications: "Certifications and safety",
    projects: "Projects",
    company: "Company",
    contact: "Contact",
    careers: "Work with us",
    request: "Request personnel",
    myRequest: "My request",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  common: {
    requestCta: "Request availability",
    requestPersonal: "Request personnel",
    addToRequest: "Add to my request",
    added: "Added",
    viewRequest: "View request",
    editRequest: "Edit",
    remove: "Remove",
    back: "Back",
    next: "Continue",
    professionals: "professionals",
    professional: "professional",
    profilesLabel: "profiles",
    profileLabel: "profile",
    from: "From",
    readMore: "Read more",
    editorialPhoto: "Editorial image of an industrial setting. It does not depict HDM facilities or personnel.",
    pendingAsset: "Placeholder reserved for genuine HDM material",
    navPrimary: "Primary navigation",
    navPrimaryMobile: "Primary mobile navigation",
    requestProgress: "Request progress",
    requestMode: "Request mode",
    spain: "Spain",
    portugal: "Portugal",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",
    allProfiles: "View all profiles",
    startRequestHere: "Start a request with this profile",
    startRequestArea: "Plan a project in this area",
    startRequestSolution: "Request this solution",
  },
  home: {
    heroEyebrow: "Supply of qualified industrial personnel",
    heroTitle: "The industrial personnel you need, where you need them.",
    heroLead:
      "TIG, MIG/MAG and stick welders, boilermakers, structural fitters, industrial electricians and supervisors. Configure your requirement and HDM will review availability before confirming.",
    heroNote:
      "No obligation: your request does not confirm availability. HDM reviews it and responds.",
    heroStart: "Start my request",
    heroSecondary: "View industrial profiles",
    scaleEyebrow: "Organised capacity",
    coverageEyebrow: "Coverage",
    processEyebrow: "How we work",
    trustEyebrow: "Certifications and safety",
    sectorsEyebrow: "Sectors",
    solutionsEyebrow: "Solutions",
    scale: {
      profiles: "profile types",
      specializations: "welding specialities",
      modes: "operating modes",
      areas: "project areas",
      sectors: "confirmed sectors",
    } as Record<string, string>,
    heroComposerTitle: "Configure your team",
    heroComposerNote: "Your request stays with you as you browse. Nothing is sent until you decide.",
    profilesTitle: "Which profile do you need?",
    profilesLead:
      "Select profiles and quantities. You can combine several profiles in a single request.",
    coverageTitle: "Where is your project?",
    coverageLead:
      "Areas where HDM supplies personnel for projects. Select your area to begin: coverage indicates a working area, not real-time availability.",
    processTitle: "From requirement to mobilisation",
    processLead:
      "A clear process with no empty promises: you define the requirement, HDM confirms what it can put in place.",
    processSteps: [
      {
        title: "Configure your requirement",
        body: "Profiles, specialities, quantities, location, dates and logistics. No bureaucratic forms: one clear configuration.",
      },
      {
        title: "HDM reviews availability",
        body: "The HDM team reviews profiles, requirements and documentation before confirming anything.",
      },
      {
        title: "Proposal and mobilisation",
        body: "You receive a concrete proposal. If the project requires it, HDM arranges travel, accommodation, transport and allowances.",
      },
      {
        title: "Ongoing support",
        body: "HDM remains available throughout the work. If a problem arises, you have a point of contact.",
      },
    ] as { title: string; body: string }[],
    trustTitle: "Documentation and safety, with no small print",
    trustLead:
      "Personnel with risk prevention training (PRL) and welding certificates. The documentation for each placement is prepared before work begins.",
    sectorsTitle: "Sectors in which the personnel work",
    solutionsTitle: "Solutions for every operational situation",
    finalCtaTitle: "Tell us what personnel you need.",
    finalCtaLead:
      "Put your request together in minutes. HDM reviews availability and requirements before confirming the proposal.",
    finalCtaButton: "Request availability",
  },
  profiles: {
    title: "Industrial personnel",
    lead:
      "Confirmed professional profiles that HDM supplies for industrial operations in Spain and Portugal.",
    pageTitleSuffix: "industrial",
    specializationLabel: "Specialities",
    whatTheyDo: "What this profile does",
    requirements: "Typical requirements",
    relatedSectors: "Typical sectors",
    items: {
      soldador: {
        name: "Welders",
        singular: "Welder",
        short: "TIG, MIG/MAG and stick welding for construction sites, plants and shutdowns.",
        description:
          "Industrial welders for workshop, site and plant work. State the welding process you need — TIG, MIG/MAG or stick welding (SMAW) — and the project requirements: HDM will review the availability of profiles with the appropriate welding certification.",
        requirements:
          "Welding certificate for the required process. Risk prevention training (PRL). Experience in industrial environments.",
      },
      calderero: {
        name: "Boilermakers",
        singular: "Boilermaker",
        short: "Boilermaking, pipework and heavy steel structures.",
        description:
          "Boilermakers for boilermaking work, marking out, forming and assembly of plate, pipework and steel structures in industrial environments. Well suited to shutdowns, maintenance and fabrication projects.",
        requirements: "Risk prevention training (PRL). Proven experience in industrial boilermaking.",
      },
      montador: {
        name: "Structural fitters",
        singular: "Structural fitter",
        short: "Erection of steel structures and industrial equipment.",
        description:
          "Structural fitters for lifting, aligning and erecting steel structures, supports and equipment on construction sites and in industry. Profiles accustomed to working at height and coordinating lifts.",
        requirements: "Risk prevention training (PRL). Experience in structural erection and working at height.",
      },
      electricista: {
        name: "Industrial electricians",
        singular: "Industrial electrician",
        short: "Installations, switchboards and cabling in industrial environments.",
        description:
          "Industrial electricians for installation, cabling, electrical switchboards and electrical maintenance in industrial plants and sites. State the working voltage and type of installation when configuring your request.",
        requirements: "Risk prevention training (PRL). Electrical qualification appropriate to the work to be carried out.",
      },
      constructor: {
        name: "Construction workers and labourers",
        singular: "Construction worker / labourer",
        short: "Operational support for construction sites and industrial work.",
        description:
          "Construction workers and labourers for site support, preparation, assistance to the trades and general operational tasks on industrial projects. The most direct way to reinforce a crew.",
        requirements: "Basic risk prevention training (PRL) appropriate to the working environment.",
      },
      supervisor: {
        name: "Supervisors and foremen",
        singular: "Supervisor / foreman",
        short: "Crew coordination and control of work execution.",
        description:
          "Supervisors and foremen to coordinate crews, control the execution of the work and act as the point of contact between your operation and the supplied personnel. Recommended for requests involving several profiles.",
        requirements: "Proven experience coordinating teams in industrial environments.",
      },
    } as Record<
      string,
      { name: string; singular: string; short: string; description: string; requirements: string }
    >,
    specializations: {
      tig: { name: "TIG", description: "Precision welding, fine finishes and thin materials." },
      "mig-mag": { name: "MIG/MAG", description: "High-productivity semi-automatic welding." },
      electrodo: { name: "Stick welding", description: "Shielded metal arc welding (SMAW), site and outdoor work." },
    } as Record<string, { name: string; description: string }>,
  },
  sectors: {
    title: "Sectors",
    lead: "Environments in which the personnel supplied by HDM work.",
    items: {
      industria: {
        name: "General industry",
        intro:
          "Personnel for industrial plants and operations of all kinds: production reinforcement, workload peaks and one-off needs for qualified labour.",
      },
      construccion: {
        name: "Construction",
        intro:
          "Structural fitters, welders and labourers for construction sites: steel structures, installations and work with deadlines that allow no delays.",
      },
      "mantenimiento-industrial": {
        name: "Industrial maintenance",
        intro:
          "Technical profiles for preventive and corrective plant maintenance, with the documentation and speciality each intervention requires.",
      },
      energia: {
        name: "Energy",
        intro:
          "Industrial personnel for energy sector projects, where profile qualification and documentation are conditions of entry.",
      },
      fabricacion: {
        name: "Manufacturing",
        intro:
          "Personnel for manufacturing companies that need to reinforce their teams: welders, boilermakers and structural fitters integrated into the client's operation.",
      },
      petroquimica: {
        name: "Petrochemicals",
        intro:
          "Industrial profiles for demanding petrochemical environments, with specific documentary and safety requirements that are reviewed for each request.",
      },
    } as Record<string, { name: string; intro: string }>,
  },
  coverage: {
    title: "Coverage",
    lead:
      "Project areas where HDM supplies industrial personnel. Coverage does not imply local offices or real-time availability: state your area and HDM will confirm.",
    mapLabel: "Map of project areas in Spain and Portugal",
    listLabel: "List of areas",
    items: {
      barcelona: {
        name: "Barcelona",
        intro:
          "Supply of industrial personnel for projects in the Barcelona area and its industrial corridor: welders, structural fitters, electricians and support profiles.",
      },
      tarragona: {
        name: "Tarragona",
        intro:
          "Personnel for the Tarragona industrial hub: shutdowns, maintenance and projects in chemical and process environments, with profiles accustomed to their requirements.",
      },
      valencia: {
        name: "Valencia",
        intro:
          "Reinforcement of industrial crews for projects in Valencia: construction, plant and scheduled work with profiles confirmed by HDM.",
      },
      madrid: {
        name: "Madrid",
        intro:
          "Supply of industrial personnel in Madrid for construction, maintenance and manufacturing projects, with direct coordination with your team.",
      },
      "pais-vasco": {
        name: "Basque Country",
        intro:
          "Qualified personnel for the industrial fabric of the Basque Country: boilermakers, welders and structural fitters for technically demanding projects.",
      },
      portugal: {
        name: "Portugal",
        intro:
          "HDM also operates in Portugal, with declared travel and logistics capacity for projects on Portuguese territory.",
      },
    } as Record<string, { name: string; intro: string }>,
  },
  solutions: {
    title: "Solutions",
    lead: "Concrete ways to resolve an industrial personnel requirement.",
    items: {
      "paradas-industriales": {
        name: "Industrial shutdowns",
        intro:
          "Scheduled and urgent shutdowns concentrate a great deal of work into a short time. Configure profiles, quantities and shifts: HDM will review which team it can mobilise for your shutdown window.",
        points: [
          "Multi-profile teams: welders, boilermakers, structural fitters and supervision.",
          "State the shifts and estimated duration of the shutdown.",
          "Availability is confirmed once your request has been reviewed.",
        ],
      },
      "refuerzo-de-personal": {
        name: "Personnel reinforcement",
        intro:
          "When your own workforce is not enough: ongoing reinforcement of your operation with qualified industrial personnel integrated into your teams and your schedules.",
        points: [
          "Ongoing or fixed-term work at the client's site.",
          "Technical and support profiles, combinable.",
          "HDM follow-up throughout the collaboration.",
        ],
      },
      "sustitucion-temporal": {
        name: "Temporary replacement",
        intro:
          "Sick leave, holidays or absences that cannot slow production down. Request temporary replacements for the exact profile you need to cover.",
        points: [
          "Same profile and speciality as the person being replaced.",
          "Flexible duration according to the situation.",
          "Documentation prepared before the placement begins.",
        ],
      },
      "trabajos-puntuales": {
        name: "One-off jobs and site work",
        intro:
          "A specific project with an end date. Supply of personnel for one-off jobs and site work: erection, welding, structures and operational support.",
        points: [
          "Teams sized to the job: from 1 person to complete crews.",
          "Dates and duration defined by you.",
          "Optional supervision for large teams.",
        ],
      },
      "personal-con-desplazamiento": {
        name: "Personnel with travel",
        intro:
          "Your project is not where the personnel are. HDM declares the capacity to manage travel within Spain and Portugal, including accommodation, transport and allowances.",
        points: [
          "Travel within Spain and Portugal.",
          "Accommodation, transport and allowance management declared by HDM.",
          "State the required logistics when configuring the request.",
        ],
      },
    } as Record<string, { name: string; intro: string; points: string[] }>,
  },
};

const enRequest = {
  request: {
    title: "Request personnel",
    indicatorEmpty: "Request personnel",
    indicatorWithItems: "My request",
    stepNeed: "Requirement",
    stepProfiles: "Profiles",
    stepProject: "Project",
    stepLogistics: "Logistics",
    stepSummary: "Summary",
    stepContact: "Contact",
    needTitle: "What do you need?",
    needLead: "Select the type of requirement. The system adapts the questions.",
    needTypes: {
      "trabajo-puntual": { name: "One-off job / site work", hint: "A specific project with an end date." },
      "sustitucion-temporal": { name: "Temporary replacement", hint: "Covering sick leave or an absence." },
      "parada-programada": { name: "Scheduled shutdown", hint: "A shutdown window with a known date." },
      "parada-urgente": { name: "Urgent shutdown", hint: "An incident requiring immediate action." },
      "trabajo-continuado": { name: "Ongoing work", hint: "Fixed or ongoing reinforcement at your company." },
    } as Record<string, { name: string; hint: string }>,
    modeExpert: "I know which profiles I need",
    modeAssisted: "I'm not sure exactly which profile I need",
    assistedTitle: "Describe the work",
    assistedLead:
      "Don't worry if you're not sure about the profile. Describe the work and we will review it with you.",
    assistedPlaceholder:
      "E.g.: We need to reinforce pipe welding during a 2-week shutdown…",
    assistedQuantity: "Approximate number of people",
    profilesTitle: "Configure your team",
    profilesLead: "Add profiles and quantities. You can combine several profiles in the same request.",
    addProfile: "Add another profile",
    specialization: "Speciality",
    quantity: "Quantity",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    quantityInput: "Number of professionals",
    requirementsLabel: "Profile requirements (optional)",
    requirementsHint: "E.g.: TIG pipe welding certificate, stainless steel experience…",
    teamTotal: "professionals",
    teamProfiles: "profiles",
    projectTitle: "Project",
    projectLead: "Tell us where and when. HDM will confirm availability afterwards.",
    timingLabel: "When do you need it?",
    timing: {
      urgente: "As soon as possible",
      "esta-semana": "This week",
      "este-mes": "This month",
      "fecha-concreta": "Scheduled date",
      "sin-fecha": "No date yet",
    } as Record<string, string>,
    startDateLabel: "Requested start date",
    durationLabel: "Estimated duration",
    durationValueLabel: "Duration",
    durationUnits: {
      dias: "days",
      semanas: "weeks",
      meses: "months",
      continuado: "Ongoing",
      "por-definir": "To be defined",
    },
    durationPlaceholder: "E.g.: 3",
    shiftLabel: "Shift (optional)",
    shiftPlaceholder: "E.g.: mornings, rotating, nights…",
    locationLabel: "Project area",
    locationHint: "The project's working area. It does not imply real-time availability.",
    cityLabel: "City / town (optional)",
    addressLabel: "Address or reference (optional)",
    sectorLabel: "Sector (optional)",
    descriptionLabel: "Description of the work (optional)",
    logisticsTitle: "Logistics and requirements",
    logisticsLead: "Does the project require personnel to travel? HDM declares logistics management capacity.",
    displacement: "The project requires travel",
    displacementScope: "Scope of travel",
    displacementEspana: "Spain",
    displacementPortugal: "Portugal",
    accommodation: "Accommodation",
    transport: "Transport",
    allowances: "Allowances / subsistence",
    logisticsYes: "Required",
    logisticsNo: "Not required",
    logisticsTbd: "To be defined",
    logisticsNotes: "Logistics notes (optional)",
    certsQuestion: "Does your project require any specific certification?",
    certsYes: "Yes",
    certsNo: "No",
    certsUnknown: "I don't know",
    certsLabel: "State the required certification",
    certsHint: "E.g.: site-specific risk prevention training (PRL), welding certificate by process…",
    attachmentsTitle: "Documentation",
    attachmentsLead:
      "Attach specifications, requirements or drawings if you have them. Formats: PDF, Word, Excel, JPG, PNG. Max. 25 MB per file.",
    attachmentsCta: "Attach document",
    attachmentsNote:
      "Documents are treated privately. In this demonstration environment files are not uploaded: HDM will request them when reviewing your request.",
    attachmentTooLarge: "The file exceeds the maximum permitted size (25 MB).",
    attachmentTooMany: "Maximum 10 files per request.",
    attachmentBadType: "File type not permitted. Use PDF, Word, Excel, JPG or PNG.",
    attachmentRemove: "Remove file",
    summaryTitle: "Your request",
    summaryLead: "Review everything before sending. You can edit any part.",
    summaryNeed: "Requirement",
    summaryProfiles: "Requested team",
    summaryLocation: "Location",
    summaryStart: "Requested start",
    summaryDuration: "Duration",
    summaryShift: "Shift",
    summaryLogistics: "Logistics",
    summaryDocs: "Documentation",
    summarySector: "Sector",
    summaryTotal: "professionals in total",
    summaryDisclaimer:
      "Sending this request does not constitute hiring. HDM will review availability and requirements before confirming terms.",
    trustPanel: [
      "You can modify it before sending",
      "It does not confirm hiring",
      "HDM will review availability",
      "Your documents will be used to review the request",
    ] as string[],
    contactTitle: "Who should we reply to?",
    contactLead: "Only what is needed to respond to your request. Nothing more.",
    contactCompany: "Company",
    contactName: "Contact person",
    contactPhone: "Telephone",
    contactEmail: "Email",
    privacyNote:
      "Your data is used solely to process this request. See the privacy policy.",
    submit: "Request availability",
    submitting: "Sending…",
    honeypotLabel: "Do not fill in this field",
    successTitle: "Request received",
    successReference: "Reference",
    successBody:
      "HDM will review availability and requirements before confirming the proposal. Keep your reference.",
    successDemoNote:
      "Demonstration environment: the request has been saved locally. For production, configure the backend (see README).",
    successNew: "Create another request",
    failureTitle: "We could not send the request.",
    failureBody: "Your information is still here. You can retry or continue via another channel.",
    failureRetry: "Retry",
    failureWhatsapp: "Continue via WhatsApp",
    failureCall: "Call",
    emptyTitle: "Your request is empty",
    emptyBody:
      "You have not added any profiles yet. Start by selecting the profiles you need or describe the work.",
    emptyCta: "Configure my request",
    errors: {
      empty_request: "Enter at least 1 professional or describe the work.",
      past_date: "The start date cannot be in the past.",
      invalid_date: "Please check the start date.",
      invalid_phone: "Please check the telephone number.",
      required: "Required field.",
      invalid_email: "Please check the email address.",
      attachment_failed: "We could not add this file. Your request is still saved.",
      network: "Connection error. Your information is still here.",
      no_backend:
        "Online submission is not configured in this environment. Continue via WhatsApp or telephone: your request is ready to share.",
      unknown: "An error has occurred. Your information is still here.",
      invalid_input: "Please review the information entered: a field is invalid or exceeds the permitted length.",
    },
    whatsappIntro: "Hello, I have prepared a request on the HDM website.",
    whatsappNeed: "I need",
    whatsappLocation: "Location",
    whatsappStart: "Requested start",
    whatsappDuration: "Duration",
    whatsappClose: "I would like to check availability.",
    whatsappDescribe: "Description of the work",
  },
};

const enPages = {
  howWeWork: {
    title: "How we work",
    lead:
      "HDM supplies qualified industrial personnel. This is how a requirement becomes a team at work.",
    sections: [
      {
        title: "You define the requirement",
        body: "Profile, speciality, quantity, location and date. You can do this from any page on the site: your request stays with you as you browse.",
      },
      {
        title: "HDM reviews before confirming",
        body: "Profile availability, technical requirements, certifications and logistics. Nothing is confirmed automatically: every request is reviewed.",
      },
      {
        title: "Documentation prepared",
        body: "Risk prevention training (PRL) and welding certificates where the profile requires them. Documentation is prepared before the placement begins.",
      },
      {
        title: "Logistics when needed",
        body: "Travel within Spain and Portugal with accommodation, transport and allowance management, as declared by HDM.",
      },
      {
        title: "Support during the work",
        body: "HDM remains available after the placement. If a problem arises, you have a direct point of contact.",
      },
    ] as { title: string; body: string }[],
  },
  certifications: {
    title: "Certifications and safety",
    lead:
      "What we can state today, without exaggeration: personnel with risk prevention training (PRL) and welding certificates.",
    prlTitle: "Risk prevention training (PRL)",
    prlBody:
      "The supplied personnel hold occupational risk prevention training appropriate to the working environment. If your site requires site-specific PRL training, state this in the request.",
    weldingTitle: "Welding certificates",
    weldingBody:
      "Welders are assigned according to the required process — TIG, MIG/MAG or stick welding — and the corresponding welding certification is reviewed before confirming.",
    docsTitle: "Documentation before starting",
    docsBody:
      "The documentation for each placement is prepared before work begins. Attach your site's requirements to the request if you have them.",
    honestyTitle: "Commitment to transparency",
    honestyBody:
      "When HDM holds additional documented certifications, they will be published here with their exact standard and scope. Until then, we do not advertise them.",
  },
  projects: {
    title: "Projects",
    lead:
      "HDM's client projects are confidential. Real case studies will be published here in the following format once authorisation exists.",
    confidentialLabel: "Confidential project",
    modelTitle: "How we will present projects",
    modelFields: [
      "Sector",
      "Area",
      "Requirement",
      "Profiles",
      "Quantity",
      "Duration",
      "Challenge",
      "HDM response",
      "Outcome",
    ] as string[],
    emptyTitle: "Case studies in preparation",
    emptyBody:
      "There are no authorised public case studies yet. In the meantime, the most direct proof is functional: configure a real request and see how HDM responds.",
  },
  company: {
    title: "Company",
    lead:
      "HDM Industrial supplies qualified personnel for industrial operations in Spain and Portugal.",
    body1:
      "Industry is the environment; people are the product. HDM places welders, boilermakers, structural fitters, electricians, labourers and supervisors inside the client's operation, with the documentation and logistics the project requires.",
    body2:
      "Reliability, transparency and professionalism are the company's stated values. HDM's commitment goes beyond the placement: when a problem arises, HDM is still there.",
    body3:
      "This site reflects that way of working: you configure what you need and HDM confirms what it can put in place. No automatic promises.",
    valuesTitle: "How HDM behaves",
    values: [
      { name: "Reliability", body: "What is confirmed is delivered. What is not confirmed is stated as such." },
      { name: "Transparency", body: "No inflated figures and no automatic promises. Availability is reviewed and communicated." },
      { name: "Professionalism", body: "The right profiles, documentation prepared, a clear point of contact." },
    ] as { name: string; body: string }[],
    photoPending: "Genuine photograph of the HDM team — pending delivery",
  },
  contact: {
    title: "Contact",
    lead:
      "The fastest route is the request: it arrives structured and HDM can respond precisely.",
    directTitle: "Direct contact",
    pendingData:
      "Direct contact details are being configured. In the meantime, please use the online request.",
    formTitle: "Or send a message",
    formNote: "For personnel requirements, use the request: it captures the context in more detail.",
    nameLabel: "Name",
    messageLabel: "Message",
    send: "Send message",
    sent: "Message prepared. Your email client will open.",
  },
  footer: {
    tagline: "Qualified industrial personnel, where you need them.",
    explore: "Explore",
    companyCol: "Company",
    legal: "Legal",
    legalNotice: "Legal notice",
    privacy: "Privacy",
    cookies: "Cookies",
    editorialNote:
      "The industrial setting photographs are editorial and do not depict HDM facilities or personnel.",
    fiscalNote: "HDM Industrial — Registered office in Portugal. Full registry details in the legal notice.",
  },
  cookiesBanner: {
    title: "Cookies",
    body: "We use technical cookies to make the site work and, only if you accept, anonymous usage measurement. No advertising and no commercial tracking.",
    accept: "Accept measurement",
    reject: "Technical only",
    more: "More information",
  },
  legal: {
    aviso: {
      title: "Legal notice",
      body: "Legal notice page. The full registry details of HDM Industrial (company name, tax ID, registered office in Portugal and contact details) will be published here once the legal department confirms them. In the meantime, this page exists as a functional placeholder and should not be indexed.",
    },
    privacidad: {
      title: "Privacy policy",
      intro: "A clear summary of how data is handled on this site.",
      sections: [
        { title: "What data we ask for", body: "Only what is necessary to process your request: company, contact person, telephone and email, plus the context of the requirement (profiles, location, dates, logistics and any documents you attach voluntarily)." },
        { title: "What it is used for", body: "Solely to review availability, prepare a proposal and communicate with you about that request." },
        { title: "What we do not do", body: "We do not sell data, we do not use it for third-party advertising and we do not send personal data to analytics tools." },
        { title: "Attached documents", body: "Any documents you attach are treated privately and used only to evaluate your request." },
        { title: "Applicant data", body: "If you send your CV from the Work with us section, your data and CV are used solely to assess your application against HDM personnel requirements. They are not shared with third parties or used for advertising." },
        { title: "Your rights", body: "You may request access to, rectification of or deletion of your data by contacting HDM through the contact channels." },
      ] as { title: string; body: string }[],
    },
    cookies: {
      title: "Cookie policy",
      intro: "This site uses the minimum possible number of cookies.",
      sections: [
        { title: "Technical cookies", body: "Necessary for the site to work: your request is saved in your browser so you do not lose it while browsing. They do not require consent." },
        { title: "Usage measurement", body: "Only if you accept, anonymous usage measurement is loaded to improve the site. If you decline, no measurement script is loaded." },
        { title: "No advertising", body: "There are no advertising cookies or third-party commercial tracking." },
      ] as { title: string; body: string }[],
    },
  },
  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has moved. Your request, if you had one in progress, is still saved.",
    cta: "Back to home",
  },
};

export const enCareers = {
  careers: {
    eyebrow: "HDM Industrial",
    title: "Work with us",
    lead: "HDM supplies qualified industrial personnel for operations in Spain and Portugal. If you have experience in industrial profiles, send us your CV: we review it when a requirement arises that matches your profile.",
    honestyTitle: "No jobs posted",
    honestyBody: "This site does not list vacancies. Sending your CV does not guarantee a specific offer: your profile stays on file for when HDM needs to fill a personnel requirement, and we contact you if there is a match.",
    profilesTitle: "The profiles HDM works with",
    processTitle: "How it works",
    processSteps: [
      { title: "Send your CV", body: "Fill in the form: an email will be prepared addressed to rrhh@hdmindustrial.es. Attach your CV before sending." },
      { title: "HDM reviews your profile", body: "The team reviews your experience and professional profile." },
      { title: "Contact if there is a match", body: "If a requirement arises that matches your profile, HDM will contact you. If there is no match at that time, there will be no reply on this occasion." },
    ] as { title: string; body: string }[],
    formTitle: "Send your CV",
    formLead: "Your mail client will open with the message prepared. Review the details and attach your CV before sending.",
    nameLabel: "Name",
    emailLabel: "Email",
    phoneLabel: "Telephone",
    profileLabel: "Profile",
    profilePlaceholder: "Select your profile",
    profileOther: "Other industrial profile",
    zoneLabel: "Area / city (optional)",
    messageLabel: "Message (optional)",
    privacyNote: "Your data is used only to assess your application. See the privacy policy.",
    send: "Prepare email with my CV",
  },
};

export const enDictionary: Dictionary = { ...en, ...enRequest, ...enPages, ...enCareers };
