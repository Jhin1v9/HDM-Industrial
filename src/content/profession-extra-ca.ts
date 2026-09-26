import type { ProfessionExtra } from './profession-extra.js';

export const CA: Record<string, ProfessionExtra> = {
  soldador: {
    when: [
      "Aturada de planta o manteniment major amb terminis tancats: necessita soldadors que comencin aquesta mateixa setmana.",
      "Punt de producció al taller: l'obra creix i la seva quadrilla actual no arriba per a la soldadura.",
      "Obra nova d'estructura metàl·lica on el procés de soldadura defineix el calendari sencer.",
    ],
    verify: [
      "Certificat de soldadura segons el procés requerit (TIG, MIG/MAG o elèctrode), vigent.",
      "Formació PRL al dia i experiència demostrable en entorn industrial real.",
      "Disponibilitat real confirmada per HDM abans que es comprometi a res.",
    ],
    faq: [
      { q: "Puc demanar només soldadors TIG?", a: "Sí. A la sol·licitud indique el procés (TIG, MIG/MAG o elèctrode) i HDM verifica quadrilles amb aquest certificat concret." },
      { q: "Treballen en alçada?", a: "Els soldadors amb formació específica per a treballs en alçada s'indiquen a la sol·licitud i HDM ho verifica." },
      { q: "Quants soldadors puc demanar?", a: "Des d'un fins a una quadrilla completa. HDM confirma disponibilitat real abans de confirmar." },
    ],
  },
  calderero: {
    when: [
      "Fabricació o reparació de dipòsits, tuberies o xapa en planta industrial.",
      "Aturada tècnica on el traçat i conformament de la xapa és la ruta crítica.",
      "Muntatge d'estructura metàl·lica pesada que exigeix ofici de caldereria experimentat.",
    ],
    verify: [
      "Experiència demostrable en caldereria industrial: traçat, conformament i muntatge.",
      "Formació PRL vigent i costum de treballar en quadrilla amb terminis.",
      "Disponibilitat real confirmada per HDM abans que decideixi.",
    ],
    faq: [
      { q: "Els calderers també munten?", a: "Sí, el perfil de calderer inclou muntatge de xapa i tuberia. Si necessita només muntatge, vegi el perfil de muntador." },
      { q: "Poden treballar en planta química o naval?", a: "HDM verifica l'experiència del perfil en el sector que indiqui a la sol·licitud." },
      { q: "Amb quina antelació he de demanar?", a: "Com més millor, però HDM confirma disponibilitat real en hores laborables sense compromís." },
    ],
  },
  montador: {
    when: [
      "Aixecament i muntatge d'estructura metàl·lica en obra amb calendari ajustat.",
      "Substitució o reforç d'una quadrilla de muntatge durant un pic d'obra.",
      "Muntatge d'equips industrials que exigeix treball en alçada i coordinació d'izatges.",
    ],
    verify: [
      "Experiència en muntatge d'estructures i treball en alçada, amb formació específica.",
      "Formació PRL vigent i ofici demostrat en quadrilles d'obra.",
      "Disponibilitat real confirmada per HDM abans que decideixi.",
    ],
    faq: [
      { q: "Tots els muntadors treballen en alçada?", a: "Els assignats a alçada disposen de la formació específica; indiqui-ho a la sol·licitud i HDM ho verifica." },
      { q: "Poden coordinar izatges?", a: "El perfil està acostumat a la coordinació d'izatges en obra; el rigging especialitzat s'indica a part." },
      { q: "Es desplacen fora de Barcelona?", a: "Sí, la cobertura inclou el corredor industrial; indiqui la ubicació i HDM confirma." },
    ],
  },
  electricista: {
    when: [
      "Instal·lació o manteniment elèctric en planta: quadres, cablejat i línies.",
      "Aturada elèctrica programada que necessita reforç qualificat en hores concretes.",
      "Obra industrial on la instal·lació elèctrica avança en paral·lel amb el muntatge mecànic.",
    ],
    verify: [
      "Qualificació elèctrica conforme al treball a realitzar, amb formació PRL vigent.",
      "Experiència en instal·lacions industrials: tensió, tipus de quadre i entorn.",
      "Disponibilitat real confirmada per HDM abans que decideixi.",
    ],
    faq: [
      { q: "Puc demanar electricista per a manteniment, no només obra?", a: "Sí, el perfil cobreix instal·lació i manteniment elèctric en planta. Indiqui el tipus de treball a la sol·licitud." },
      { q: "Treballen amb qualsevol tensió?", a: "HDM verifica la qualificació del perfil segons la tensió i el tipus d'instal·lació que indiqui." },
      { q: "També hi ha ajudants d'electricista?", a: "Sí, el perfil de constructor/ajudant complementa la quadrilla elèctrica quan cal." },
    ],
  },
  eletromecanico: {
    when: [
      "Màquines amb components elèctrics i mecànics que fallen i ningú sap per on començar: el perfil electromecànic cobreix els dos.",
      "Manteniment industrial preventiu on un sol perfil redueix aturades i costos de coordinació.",
      "Instal·lació o reparació de motors, variadors i quadres juntament amb la part mecànica.",
    ],
    verify: [
      "Capacitat de diagnòstic conjunt: elèctric i mecànic en el mateix perfil.",
      "Formació PRL vigent i experiència demostrable en manteniment electromecànic industrial.",
      "Disponibilitat real confirmada per HDM abans que decideixi.",
    ],
    faq: [
      { q: "Què diferencia l'electromecànic de l'electricista?", a: "L'electromecànic integra avaries mecàniques i elèctriques en la mateixa màquina; l'electricista es centra en la instal·lació elèctrica." },
      { q: "Serveix per a manteniment preventiu?", a: "Sí, és un dels seus usos principals: instal·la, manté i repara màquines amb components dels dos tipus." },
      { q: "Puc demanar-lo juntament amb un mecànic industrial?", a: "Sí, a la mateixa sol·licitud afegeixi tots dos perfils i HDM confirma la quadrilla completa." },
    ],
  },
  "mecanico-industrial": {
    when: [
      "Aturades de producció per desgast de components: el mecànic industrial ajusta abans que la línia s'aturi.",
      "Instal·lació o reparació de maquinària de fàbrica amb calendari de producció a respectar.",
      "Reforç de manteniment durant campanyes de producció intensiva.",
    ],
    verify: [
      "Experiència demostrable en mecànica industrial: instal·lació, manteniment i reparació de maquinària.",
      "Formació PRL vigent i ofici demostrat en entorn fabril.",
      "Disponibilitat real confirmada per HDM abans que decideixi.",
    ],
    faq: [
      { q: "Quines màquines cobreix aquest perfil?", a: "Maquinària de fàbrica en general: instal·la, manté i repara, ajustant components per evitar aturades a la producció." },
      { q: "Treballa junt amb l'electromecànic?", a: "Sí, es complementen: el mecànic industrial cobreix la part mecànica pura i l'electromecànic la integrada." },
      { q: "Puc demanar-lo per a una aturada llarga de planta?", a: "Sí, indiqui la durada estimada a la sol·licitud i HDM organitza la quadrilla." },
    ],
  },
  constructor: {
    when: [
      "Necessita reforçar una quadrilla en obra sense perdre temps en selecció.",
      "Suport operatiu general: preparació, auxili a oficis i tasques d'obra.",
      "Substitucions puntuals que no poden aturar el ritme del treball.",
    ],
    verify: [
      "Formació PRL bàsica segons l'entorn de treball, vigent.",
      "Ofici verificat i disponibilitat immediata a la seva zona.",
      "Disponibilitat real confirmada per HDM abans que decideixi.",
    ],
    faq: [
      { q: "L'ajudant serveix per a qualsevol obra?", a: "Per a obra i treballs industrials generals; per a oficis específics vegi els perfils especialitzats." },
      { q: "Puc demanar ajudants juntament amb soldadors?", a: "Sí, configuri la quadrilla completa a la sol·licitud: perfils especialitzats més suport." },
      { q: "Amb quina rapidesa poden començar?", a: "HDM confirma disponibilitat real en hores laborables; la incorporació depèn de la urgència que indiqui." },
    ],
  },
  supervisor: {
    when: [
      "Quadrilla de diversos perfils que necessita coordinació i un interlocutor únic.",
      "Obra amb exigència de control d'execució i seguretat reforçada.",
      "Vostè no pot ser a l'obra diàriament i necessita algú de confiança a sobre.",
    ],
    verify: [
      "Experiència demostrable coordinant equips en entorn industrial.",
      "Formació PRL vigent i criteri tècnic per controlar l'execució.",
      "Disponibilitat real confirmada per HDM abans que decideixi.",
    ],
    faq: [
      { q: "El supervisor substitueix el meu cap d'obra?", a: "No el substitueix: coordina la quadrilla subministrada i li informa a vostè. És l'interlocutor entre la seva operació i el personal." },
      { q: "Puc demanar només supervisor sense quadrilla?", a: "Sí, si necessita algú que organitzi personal propi o d'altres fonts." },
      { q: "Parla amb la meva equip en el meu idioma?", a: "Els perfils s'assignen segons l'idioma de treball que indiqui a la sol·licitud." },
    ],
  },
};
