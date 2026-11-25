// Stash visual identity: a deck of link cards in 3D, drifting tag chips, bookmark ribbons.
export const theme = {
  tilt: true,
  badge: (k, s) => `<span class="sbk" style="width:${s * .8}px;height:${s}px"><svg viewBox="0 0 32 40" aria-hidden="true"><path class="sbp" d="M4 3h24v34l-12-9-12 9z"/><path class="sbs" d="M10 12h12M10 18h8"/></svg></span>`,
  empty: () => `<svg class="se" viewBox="0 0 170 120" width="180" aria-hidden="true"><path class="sb1" d="M25 58l60-26 60 26v38l-60 22-60-22z"/><path class="sb2" d="M25 58l60 24 60-24M85 82v36"/><g class="sd d1"><rect x="55" y="-2" width="60" height="22" rx="6"/><circle cx="67" cy="9" r="5"/><rect x="77" y="6" width="32" height="5" rx="2.5"/></g><g class="sd d2"><rect x="62" y="-2" width="60" height="22" rx="6"/><circle cx="74" cy="9" r="5"/><rect x="84" y="6" width="26" height="5" rx="2.5"/></g></svg>`,
};
const CARDS = [["#0f766e", "Design systems", "#read"], ["#b45309", "CSS grid guide", "#dev"], ["#be185d", "Recipe: shakshuka", "#food"], ["#1d4ed8", "Cloudflare docs", "#later"]];
const TAGS = ["#read-later", "#dev", "#inspiration", "#recipes", "#tools", "#docs", "#news"];
export const deckHero = () => `<div class="deck" aria-hidden="true"><div class="deck3d">${CARDS.map((c, i) => `<div class="lk" style="--i:${i};--c:${c[0]}"><span class="fv"></span><div class="lt"><b>${c[1]}</b><i></i></div><span class="tg">${c[2]}</span></div>`).join("")}</div>${TAGS.map((t, i) => `<span class="floattag" style="--x:${8 + i * 13}%;--d:${i * 1.3}s;--y:${(i * 37) % 70}%">${t}</span>`).join("")}</div>`;
