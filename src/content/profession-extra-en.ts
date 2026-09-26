import type { ProfessionExtra } from './profession-extra.js';

export const EN: Record<string, ProfessionExtra> = {
  soldador: {
    when: [
      "Plant shutdown or major maintenance with tight deadlines: you need welders who start this very week.",
      "Workshop production peak: the job is growing and your current crew can't keep up with welding.",
      "New structural steel job where the welding process sets the entire schedule.",
    ],
    verify: [
      "Welding certificate for the required process (TIG, MIG/MAG or stick), valid.",
      "Up-to-date PRL training and proven experience in real industrial environments.",
      "Real availability confirmed by HDM before you commit to anything.",
    ],
    faq: [
      { q: "Can I request only TIG welders?", a: "Yes. State the process (TIG, MIG/MAG or stick) in the request and HDM verifies crews with that specific certificate." },
      { q: "Do they work at height?", a: "Welders with specific training for work at height are flagged in the request and HDM verifies it." },
      { q: "How many welders can I request?", a: "From one to a full crew. HDM confirms real availability before confirming." },
    ],
  },
  calderero: {
    when: [
      "Fabrication or repair of tanks, piping or plate work in an industrial plant.",
      "Technical shutdown where plate layout and forming is the critical path.",
      "Heavy structural steel assembly requiring experienced boilermaking craft.",
    ],
    verify: [
      "Proven experience in industrial boilermaking: layout, forming and assembly.",
      "Valid PRL training and a track record of deadline-driven crew work.",
      "Real availability confirmed by HDM before you decide.",
    ],
    faq: [
      { q: "Do boilermakers also assemble?", a: "Yes, the boilermaker profile includes plate and piping assembly. If you need assembly only, see the structural fitter profile." },
      { q: "Can they work in chemical or shipbuilding plants?", a: "HDM verifies the profile's experience in the sector you state in the request." },
      { q: "How far in advance should I request?", a: "The sooner the better, but HDM confirms real availability within business hours, no commitment." },
    ],
  },
  montador: {
    when: [
      "Structural steel erection and assembly on site with a tight schedule.",
      "Replacing or reinforcing an assembly crew during a work peak.",
      "Industrial equipment assembly requiring work at height and lift coordination.",
    ],
    verify: [
      "Experience in structural assembly and work at height, with specific training.",
      "Valid PRL training and proven craft in site crews.",
      "Real availability confirmed by HDM before you decide.",
    ],
    faq: [
      { q: "Do all fitters work at height?", a: "Those assigned to height work hold the specific training; state it in the request and HDM verifies." },
      { q: "Can they coordinate lifts?", a: "The profile is used to lift coordination on site; specialised rigging is stated separately." },
      { q: "Do they travel outside Barcelona?", a: "Yes, coverage includes the industrial corridor; state the location and HDM confirms." },
    ],
  },
  electricista: {
    when: [
      "Electrical installation or maintenance in a plant: panels, wiring and lines.",
      "Scheduled electrical shutdown that needs qualified reinforcement at specific hours.",
      "Industrial job where the electrical installation runs in parallel with mechanical assembly.",
    ],
    verify: [
      "Electrical qualification matching the work, with valid PRL training.",
      "Experience in industrial installations: voltage, panel type and environment.",
      "Real availability confirmed by HDM before you decide.",
    ],
    faq: [
      { q: "Can I request an electrician for maintenance, not just new work?", a: "Yes, the profile covers installation and electrical maintenance on site. State the type of work in the request." },
      { q: "Do they work with any voltage?", a: "HDM verifies the profile's qualification against the voltage and installation type you state." },
      { q: "Are electrician helpers available too?", a: "Yes, the labourer profile complements the electrical crew when needed." },
    ],
  },
  eletromecanico: {
    when: [
      "Machines with electrical and mechanical components failing and nobody knows where to start: the electromechanic profile covers both.",
      "Preventive industrial maintenance where a single profile cuts downtime and coordination costs.",
      "Installation or repair of motors, drives and panels together with the mechanical side.",
    ],
    verify: [
      "Combined diagnostic ability: electrical and mechanical in one profile.",
      "Valid PRL training and proven experience in industrial electromechanical maintenance.",
      "Real availability confirmed by HDM before you decide.",
    ],
    faq: [
      { q: "What sets the electromechanic apart from the electrician?", a: "The electromechanic handles both mechanical and electrical faults in the same machine; the electrician focuses on the electrical installation." },
      { q: "Is it suitable for preventive maintenance?", a: "Yes, one of its main uses: installs, maintains and repairs machines with both component types." },
      { q: "Can I request one together with an industrial mechanic?", a: "Yes, add both profiles in the same request and HDM confirms the full crew." },
    ],
  },
  "mecanico-industrial": {
    when: [
      "Production stoppages from component wear: the industrial mechanic adjusts before the line stops.",
      "Installation or repair of factory machinery with a production schedule to respect.",
      "Maintenance reinforcement during intensive production campaigns.",
    ],
    verify: [
      "Proven experience in industrial mechanics: installation, maintenance and repair of machinery.",
      "Valid PRL training and proven craft in a factory environment.",
      "Real availability confirmed by HDM before you decide.",
    ],
    faq: [
      { q: "Which machines does this profile cover?", a: "General factory machinery: installs, maintains and repairs, adjusting components to prevent production stoppages." },
      { q: "Does it work alongside the electromechanic?", a: "Yes, they complement each other: the industrial mechanic covers the pure mechanical side, the electromechanic the integrated one." },
      { q: "Can I request one for a long plant shutdown?", a: "Yes, state the estimated duration in the request and HDM organises the crew." },
    ],
  },
  constructor: {
    when: [
      "You need to reinforce a site crew without losing time on selection.",
      "General operative support: preparation, trade assistance and site tasks.",
      "Spot replacements that cannot slow the pace of work.",
    ],
    verify: [
      "Basic PRL training for the work environment, valid.",
      "Verified craft and immediate availability in your area.",
      "Real availability confirmed by HDM before you decide.",
    ],
    faq: [
      { q: "Is the labourer suitable for any site?", a: "For general site and industrial work; for specific trades see the specialised profiles." },
      { q: "Can I request labourers together with welders?", a: "Yes, set up the full crew in the request: specialised profiles plus support." },
      { q: "How quickly can they start?", a: "HDM confirms real availability within business hours; start depends on the urgency you state." },
    ],
  },
  supervisor: {
    when: [
      "A multi-profile crew that needs coordination and a single point of contact.",
      "A site with demanding execution control and reinforced safety requirements.",
      "You cannot be on site daily and need someone trustworthy on top of it.",
    ],
    verify: [
      "Proven experience coordinating teams in industrial environments.",
      "Valid PRL training and the technical judgement to control execution.",
      "Real availability confirmed by HDM before you decide.",
    ],
    faq: [
      { q: "Does the supervisor replace my site manager?", a: "No: they coordinate the supplied crew and report to you. They are the link between your operation and the personnel." },
      { q: "Can I request a supervisor without a crew?", a: "Yes, if you need someone to organise your own or third-party personnel." },
      { q: "Do they speak my team's language?", a: "Profiles are assigned based on the working language you state in the request." },
    ],
  },
};
