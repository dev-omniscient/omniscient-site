// Line drawings for blog covers, one per category. Each sits in the cover's white panel (.cover__art).
// Classes: fill (green), paper (white), soft (the band color), point (the emerald point, one per drawing; add on when it
// sits on a fill, to turn it white), gray.
export const ART = {
  pipeline: `<svg viewBox="0 0 200 160" aria-hidden="true"><path class="gray" d="M10 150H190M10 10V150"/><path d="M10 140 60 108 110 118 180 30"/><path d="M158 30H180V52"/><rect class="paper" x="54" y="102" width="12" height="12"/><rect class="paper" x="104" y="112" width="12" height="12"/><circle class="point" cx="180" cy="30" r="5"/></svg>`,
  crm: `<svg viewBox="0 0 200 160" aria-hidden="true"><rect class="paper" x="10" y="10" width="180" height="140"/><path d="M10 40H190M10 100H190M10 130H190M60 10V150"/><path class="gray" d="M10 70H190"/><rect class="fill" x="10" y="70" width="180" height="30"/><path d="M76 25H130M76 115H150M76 145H120M26 25H44M26 115H44" class="gray"/><circle class="point on" cx="35" cy="85" r="5"/></svg>`,
  "deal-room": `<svg viewBox="0 0 200 160" aria-hidden="true"><rect class="paper" x="10" y="14" width="180" height="132"/><path d="M10 34H190"/><rect class="soft" x="24" y="48" width="152" height="52"/><path class="fill" d="M92 62 112 74 92 86Z"/><rect x="24" y="112" width="44" height="22"/><rect x="78" y="112" width="44" height="22"/><rect x="132" y="112" width="44" height="22"/><circle class="point" cx="21" cy="24" r="3.5"/></svg>`,
  guides: `<svg viewBox="0 0 200 160" aria-hidden="true"><path d="M54 124H100V102M120 82H166V60"/><rect class="paper" x="14" y="104" width="40" height="40"/><rect class="paper" x="80" y="62" width="40" height="40"/><rect class="fill" x="146" y="20" width="40" height="40"/><circle class="point on" cx="166" cy="40" r="5"/></svg>`,
  product: `<svg viewBox="0 0 200 160" aria-hidden="true"><rect class="fill" x="40" y="20" width="56" height="56"/><rect class="paper" x="104" y="20" width="56" height="56"/><rect class="paper" x="40" y="84" width="56" height="56"/><rect class="soft" x="104" y="84" width="56" height="56"/><circle class="point" cx="132" cy="112" r="5"/></svg>`,
  company: `<svg viewBox="0 0 200 160" aria-hidden="true"><path d="M6 140H194"/><circle class="paper" cx="44" cy="72" r="20"/><path class="paper" d="M14 140V110H74V140"/><circle class="paper" cx="156" cy="72" r="20"/><path class="paper" d="M126 140V110H186V140"/><circle class="soft" cx="100" cy="56" r="26"/><path class="fill" d="M60 140V96H140V140Z"/><circle class="point" cx="100" cy="56" r="5"/></svg>`,
};

export const CATEGORIES = {
  pipeline: "Pipeline",
  crm: "CRM",
  "deal-room": "Deal Room",
  guides: "Guides",
  product: "Product",
  company: "Company",
};

// The cover's markup: the band and the drawing, no text. The post's title and category sit outside it.
export function cover({ category, art = category, og = false }) {
  const cls = ["cover", `cover--${category}`, og ? "cover--og" : ""].filter(Boolean).join(" ");
  return `<div class="${cls}" role="img" aria-label="${CATEGORIES[category]}"><div class="cover__art">${ART[art]}</div></div>`;
}
