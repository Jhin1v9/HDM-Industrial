import { PT } from './profession-extra-pt';

/**
 * Conteúdo GORDO das páginas de profissão (Fase 2 do plano mobile+SEO).
 * ES é o idioma primário do site (locale `/`) — Google indexa principalmente
 * ele. Regras AGENTS.md: nada de cifras/clientes inventados; gatilhos de
 * confiança naturais, PNL leve ("disponibilidad real", "sin compromiso").
 */

export interface ProfessionExtra {
  when: string[]; // cuándo lo necesitas — 3 cenários
  verify: string[]; // qué verifica HDM — 3 verificações (confiança)
  faq: Array<{ q: string; a: string }>; // 3 perguntas com schema
}

const ES: Record<string, ProfessionExtra> = {
  soldador: {
    when: [
      "Parada de planta o mantenimiento mayor con plazos cerrados: necesita soldadores que empiecen esta misma semana.",
      "Pico de producción en taller: la obra crece y su cuadrilla actual no da abasto en soldadura.",
      "Obra nueva de estructura metálica donde el proceso de soldadura define el calendario entero.",
    ],
    verify: [
      "Certificado de soldadura según el proceso requerido (TIG, MIG/MAG o electrodo revestido), vigente.",
      "Formación PRL al día y experiencia contrastada en entorno industrial real.",
      "Disponibilidad real confirmada por HDM antes de que usted se comprometa a nada.",
    ],
    faq: [
      { q: "¿Puedo pedir solo soldadores TIG?", a: "Sí. En la solicitud indica el proceso (TIG, MIG/MAG o electrodo) y HDM verifica cuadrillas con ese certificado concreto." },
      { q: "¿Trabajan en altura?", a: "Los soldadores con formación específica para trabajos en altura se indican en la solicitud y HDM lo verifica." },
      { q: "¿Cuántos soldadores puedo pedir?", a: "Desde uno hasta una cuadrilla completa. HDM confirma disponibilidad real antes de confirmar." },
    ],
  },
  calderero: {
    when: [
      "Fabricación o reparación de depósitos, tuberías o chapa en planta industrial.",
      "Parada técnica donde el trazado y conformado de chapa es la ruta crítica.",
      "Montaje de estructura metálica pesada que exige oficio de calderería experimentado.",
    ],
    verify: [
      "Experiencia demostrable en calderería industrial: trazado, conformado y montaje.",
      "Formación PRL vigente y hábito de trabajo en cuadrilla con plazos.",
      "Disponibilidad real confirmada por HDM antes de que decida.",
    ],
    faq: [
      { q: "¿Los caldereros también montan?", a: "Sí, el perfil de calderero incluye montaje de chapa y tubería. Si necesita solo montaje, vea el perfil de montador." },
      { q: "¿Pueden trabajar en planta química o naval?", a: "HDM verifica la experiencia del perfil en el sector que usted indique en la solicitud." },
      { q: "¿Con qué antelación debo pedir?", a: "Cuanto antes mejor, pero HDM confirma disponibilidad real en horas laborables sin compromiso." },
    ],
  },
  montador: {
    when: [
      "Levantado y montaje de estructura metálica en obra con calendario ajustado.",
      "Sustitución o refuerzo de cuadrilla de montaje durante un pico de obra.",
      "Montaje de equipos industriales que exige trabajo en altura y coordinación de izajes.",
    ],
    verify: [
      "Experiencia en montaje de estructuras y trabajo en altura, con formación específica.",
      "Formación PRL vigente y oficio acreditado en cuadrillas de obra.",
      "Disponibilidad real confirmada por HDM antes de que decida.",
    ],
    faq: [
      { q: "¿Todos los montadores trabajan en altura?", a: "Los asignados a altura cuentan con la formación específica; indíquelo en la solicitud y HDM lo verifica." },
      { q: "¿Pueden coordinar izajes?", a: "El perfil está habituado a la coordinación de izajes en obra; el rigging especializado se indica aparte." },
      { q: "¿Se desplazan fuera de Barcelona?", a: "Sí, la cobertura incluye el corredor industrial; indique la ubicación y HDM confirma." },
    ],
  },
  electricista: {
    when: [
      "Instalación o mantenimiento eléctrico en planta: cuadros, cableado y líneas.",
      "Parada eléctrica programada que necesita refuerzo cualificado en horas concretas.",
      "Obra industrial donde la instalación eléctrica avanza en paralelo al montaje mecánico.",
    ],
    verify: [
      "Cualificación eléctrica acorde al trabajo a realizar, con formación PRL vigente.",
      "Experiencia en instalaciones industriales: tensión, tipo de cuadro y entorno.",
      "Disponibilidad real confirmada por HDM antes de que decida.",
    ],
    faq: [
      { q: "¿Puedo pedir electricista para mantenimiento, no solo obra?", a: "Sí, el perfil cubre instalación y mantenimiento eléctrico en planta. Indique el tipo de trabajo en la solicitud." },
      { q: "¿Trabajan con cualquier tensión?", a: "HDM verifica la cualificación del perfil según la tensión y tipo de instalación que usted indique." },
      { q: "¿También hay ayudantes de electricista?", a: "Sí, el perfil de constructor/ayudante complementa la cuadrilla eléctrica cuando se necesita." },
    ],
  },
  eletromecanico: {
    when: [
      "Máquinas con componentes eléctricos y mecánicos que fallan y nadie sabe por dónde empezar: el perfil eletromecânico cobre os dois.",
      "Mantenimiento industrial preventivo donde un solo perfil reduce paradas y costes de coordinación.",
      "Instalación o reparación de motores, variadores y cuadros junto a la parte mecânica.",
    ],
    verify: [
      "Capacidad de diagnóstico conjunto: eléctrico y mecánico no mismo perfil.",
      "Formación PRL vigente e experiencia demostrable em mantenimiento electromecánico industrial.",
      "Disponibilidad real confirmada por HDM antes de que decida.",
    ],
    faq: [
      { q: "¿Qué diferencia al electromecánico del electricista?", a: "El electromecánico integra averías mecánicas y eléctricas en la misma máquina; el electricista se centra en la instalación eléctrica." },
      { q: "¿Sirve para mantenimiento preventivo?", a: "Sí, es uno de sus usos principales: instala, mantiene y repara máquinas con componentes de ambos tipos." },
      { q: "¿Puedo pedirlo junto a un mecánico industrial?", a: "Sí, en la misma solicitud añada ambos perfiles y HDM confirma la cuadrilla completa." },
    ],
  },
  "mecanico-industrial": {
    when: [
      "Paradas de producción por desgaste de componentes: el mecánico industrial ajusta antes de que la línea pare.",
      "Instalación o reparación de maquinaria de fábrica con calendario de producción a respetar.",
      "Refuerzo de mantenimiento durante campañas de producción intensiva.",
    ],
    verify: [
      "Experiencia demostrable en mecánica industrial: instalación, mantenimiento y reparación de maquinaria.",
      "Formación PRL vigente e ofício acreditado en entorno fabril.",
      "Disponibilidad real confirmada por HDM antes de que decida.",
    ],
    faq: [
      { q: "¿Qué máquinas cubre este perfil?", a: "Maquinaria de fábrica en general: instala, mantiene y repara, ajusta componentes para evitar paradas en la producción." },
      { q: "¿Trabaja junto al electromecánico?", a: "Sí, se complementan: el mecánico industrial cubre la parte mecánica pura y el electromecánico la integrada." },
      { q: "¿Puedo pedirlo para una parada larga de planta?", a: "Sí, indique la duración estimada en la solicitud y HDM organiza la cuadrilla." },
    ],
  },
  constructor: {
    when: [
      "Necesita reforzar una cuadrilla en obra sin perder tiempo en selección.",
      "Apoyo operativo general: preparación, auxilio a oficios y tareas de obra.",
      "Sustituciones puntuales que no pueden parar el ritmo del trabajo.",
    ],
    verify: [
      "Formación PRL básica según el entorno de trabajo, vigente.",
      "Oficio verificado y respuesta de HDM en horas laborables.",
      "Disponibilidad real confirmada por HDM antes de que decida.",
    ],
    faq: [
      { q: "¿El ayudante sirve para cualquier obra?", a: "Para obra y trabajos industriales generales; para oficios específicos vea los perfiles especializados." },
      { q: "¿Puedo pedir ayudantes junto a soldadores?", a: "Sí, configure la cuadrilla completa en la solicitud: perfiles especializados más apoyo." },
      { q: "¿Con qué rapidez pueden empezar?", a: "HDM confirma disponibilidad real en horas laborables; la incorporación depende de la urgencia que indique." },
    ],
  },
  supervisor: {
    when: [
      "Cuadrilla de varios perfiles que necesita coordinación y un interlocutor único.",
      "Obra con exigencia de control de ejecución y seguridad reforzada.",
      "Usted no puede estar en obra a diario y necesita alguien de confianza encima.",
    ],
    verify: [
      "Experiencia demostrable coordinando equipos en entorno industrial.",
      "Formación PRL vigente y criterio técnico para controlar la ejecución.",
      "Disponibilidad real confirmada por HDM antes de que decida.",
    ],
    faq: [
      { q: "¿El supervisor sustituye a mi jefe de obra?", a: "No lo sustituye: coordina la cuadrilla suministrada y le informa a usted. Es el interlocutor entre su operación y el personal." },
      { q: "¿Puedo pedir solo supervisor sin cuadrilla?", a: "Sí, si necesita alguien que organice personal propio o de otras fuentes." },
      { q: "¿Habla con mi equipo en mi idioma?", a: "Los perfiles se asignan según el idioma de trabajo que indique en la solicitud." },
    ],
  },
};



/** Conteúdo gordo por locale — fallback ES enquanto a tradução não existe. */
export const PROFESSION_EXTRA: Record<string, Record<string, ProfessionExtra>> = {
  es: ES,
  ca: ES,
  en: ES,
  pt: PT,
};
