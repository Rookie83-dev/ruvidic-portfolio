window.siteContent = {
  hero: {
    titleMain: "ZORAN",
    titleOutline: "RUVIDIĆ",
    eyebrow: "IT · Security · Facility · Photography",
    location: "Belgrade, Serbia",
    tagline: "Army, UN mission, IT — and always a river,<br>a lens, or an aquarium somewhere in the background."
  },
  about: {
    paragraphs: [
      "My career started in uniform — 14 years in the Serbian Army, including a 7-month deployment with the UN peacekeeping mission MINUSCA in the Central African Republic. Operational work far from home, in conditions that demand precision and a cool head.",
      "Then came hospitality IT and facilities — infrastructure, networks, helpdesk, systems management, and operational support across international hotel environments.",
      "Today the focus is on security, compliance, automations, ISO standards, BCP plans, policies, and training — everything that keeps a modern company operational and secure."
    ],
    timeline: [
      { year: "2002–2016", role: "Professional Soldier", org: "Serbian Army", desc: "14 years of active service. Operations, logistics, training. Two medals owner", active: false },
      { year: "during service", role: "UN Peacekeeper", org: "MINUSCA — Central African Republic", desc: "7-month deployment with UN peacekeeping mission MINUSCA. Medal awarded by General Secretary of UN", active: false },
      { year: "2016–2021", role: "IT Manager", org: "Radisson Hotel Group<br>Marriott International", desc: "Infrastructure, networks, helpdesk, systems management.", active: false },
      { year: "2021–present", role: "IT & Facility Lead", org: "Interventure d.o.o.", desc: "Security, GCP/GWS, Azure/Intune, automations, ISO 27001/27701/9001, BCP, IRP, fire safety, training.", active: true }
    ]
  },
  expertise: [
    { icon: "🔐", iconClass: "icon-teal", title: "IT Security & Audits", text: "SIEM implementation, GCP service accounts for Drive audit, OAuth audit, spam control, phishing tests, network analytics.", tags: [{label:"SIEM", class:"t-teal"},{label:"GCP", class:"t-teal"},{label:"Drive Audit", class:"t-teal"},{label:"OAuth", class:"t-teal"},{label:"Phishing", class:"t-teal"},{label:"Unifi API", class:"t-teal"}] },
    { icon: "⚙️", iconClass: "icon-blue", title: "Automations & Integrations", text: "Apps Script workflow automations, API integrations with HubSpot and Slack, service accounts for email and calendar monitoring.", tags: [{label:"Apps Script", class:"t-blue"},{label:"HubSpot API", class:"t-blue"},{label:"Slack API", class:"t-blue"},{label:"Overclaw", class:"t-blue"},{label:"Gmail API", class:"t-blue"}] },
    { icon: "🏢", iconClass: "icon-amber", title: "Facility & Building Management", text: "Building management, fire safety training, access control, CCTV, deadline tracking and legal compliance.", tags: [{label:"Fire Safety", class:"t-amber"},{label:"Access Control", class:"t-amber"},{label:"CCTV", class:"t-amber"},{label:"Facility", class:"t-amber"}] },
    { icon: "📋", iconClass: "icon-green", title: "ISO & Governance", text: "Planning, documentation and certification for ISO 9001, 27001 and 27701. BCP and IRP plans, data protection, network infrastructure.", tags: [{label:"ISO 9001", class:"t-green"},{label:"ISO 27001", class:"t-green"},{label:"ISO 27701", class:"t-green"},{label:"BCP/IRP", class:"t-green"}] }
  ],
  projects: [
    { title: "GCP Security Audit Suite", text: "Service accounts for monitoring Drive activity outside the corporate domain, OAuth authorization and spam detection. Continuous alerting and automated reports.", tags: [{label:"Google Cloud", class:"t-teal"},{label:"Drive API", class:"t-teal"},{label:"Apps Script", class:"t-blue"}], status: {label:"Security", class:"t-teal"} },
    { title: "Email & Calendar Oversight — Overclaw", text: "Service account implementation for email and calendar content search via the Overclaw platform, with API connection to the agency for compliance monitoring.", tags: [{label:"Overclaw", class:"t-blue"},{label:"Gmail API", class:"t-blue"},{label:"Calendar API", class:"t-blue"}], status: {label:"Audit", class:"t-blue"} },
    { title: "Network Analytics — Unifi API", text: "Automated network data collection via Unifi controller. Real-time dashboards for traffic, device and security incident monitoring.", tags: [{label:"Unifi", class:"t-teal"},{label:"Network API", class:"t-teal"},{label:"Automation", class:"t-blue"}], status: {label:"Network", class:"t-teal"} },
    { title: "ISO Triple Certification — 9001 / 27001 / 27701", text: "Gap analysis, documentation, internal audits, and successful completion of the certification process for all three standards.", tags: [{label:"ISO 27001", class:"t-green"},{label:"ISO 27701", class:"t-green"},{label:"ISO 9001", class:"t-green"},{label:"GDPR", class:"t-green"}], status: {label:"Compliance", class:"t-green"} }
  ],
  certifications: [
    {num:"ISO", name:"ISO 27001", body:"Part of certification team"},
    {num:"ISO", name:"ISO 27701", body:"Privacy management"},
    {num:"ISO", name:"ISO 9001", body:"Quality management"},
    {num:"PP", name:"Fire Safety", body:"State exam — firefighter"},
    {num:"UN", name:"UN Peacekeeper", body:"MINUSCA · Central African Rep."},
    {num:"GCP", name:"Google Cloud", body:"Security & Admin"}
  ],
  gallery: {
    intro: "Patience and attention to detail. The world invisible to the naked eye, and celestial objects captured through a camera or digital telescope.",
    tabs: [
      { key: "makro", label: "Macro", images: [
        {src:"photos/macro-fly.jpg", alt:"Macro insect on colored pencil", caption:"Macro · insect · detail", wide:true},
        {src:"photos/macro-plant.jpg", alt:"Lavender macro photo", caption:"Lavender · macro"}
      ]},
      { key: "astro", label: "Astrophoto", images: [
        {src:"photos/astro-m42-nebula.jpg", alt:"Orion Nebula M42", caption:"M42 · Orion Nebula", wide:true},
        {src:"photos/astro-horsehead-nebula.jpg", alt:"Horsehead Nebula", caption:"Horsehead Nebula"}
      ]},
      { key: "ostalo", label: "Other", images: [
        {src:"photos/reef-clownfish.jpg", alt:"Clownfish in reef aquarium", caption:"Reef aquarium · clownfish", wide:true}
      ]}
    ]
  },
  passions: [
    {
      reverse: true,
      label: "Fly Fishing",
      labelColor: "var(--accent2)",
      title: "The river as<br>meditation",
      text: "Fly fishing is not just fishing — it's reading water, knowing entomology, the precision of a cast, and the deep silence alongside a river. The Drina, Gradac, Ljubovidja and other kindred streams — the lifeblood of our great rivers.",
      tags: [{label:"Dry Fly", class:"t-amber"},{label:"Nymph", class:"t-amber"},{label:"Streamers", class:"t-amber"},{label:"Fly tying", class:"t-amber"}],
      visual: { type: "stats", title: "Favourite waters", rows: [
        {num:"DRINA", label:"Grayling & Trout", width:"90%"},
        {num:"GRADAC", label:"Brown trout · Grayling", width:"72%"},
        {num:"LJUBOVIDJA", label:"Mountain river · Trout", width:"58%"}
      ]}
    },
    {
      reverse: false,
      label: "Marine Aquaristics",
      labelColor: "var(--accent3)",
      title: "Ocean<br>in four walls",
      text: "A reef tank is a living ecosystem — water chemistry, light cycles, species compatibility. Biology, chemistry and patience in miniature format.",
      tags: [{label:"Reef Tank", class:"t-blue"},{label:"SPS Corals", class:"t-blue"},{label:"LPS Corals", class:"t-blue"},{label:"Water chemistry", class:"t-blue"}],
      visual: { type: "grid", cells: [
        {icon:"🐠", title:"Marine fish", sub:"Clownfish, Tang, Blenny"},
        {icon:"🪸", title:"SPS & LPS", sub:"Acropora, Hammer, Frogspawn"},
        {icon:"⚗️", title:"Water chemistry", sub:"Ca, Mg, Alk, NO3, PO4"},
        {icon:"💡", title:"LED Spectrum", sub:"Photoperiod & intensity"}
      ]}
    }
  ],
  contact: {
    title: "Let's<br><span>connect</span>",
    text: "Always happy to connect — whether you're into IT, security or compliance, or you simply share an interest in fly fishing, macro photography or astrophotography.",
    links: [
      {type:"a", href:"https://www.linkedin.com/in/zoran-ruvidic/", target:"_blank", icon:"LinkedIn", label:"Zoran Ruvidic", sub:"↗"},
      {type:"div", icon:"Location", label:"Belgrade, Serbia", sub:"📍"}
    ]
  }
};
