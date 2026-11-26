import { install, reveal, tilt } from "/fx.js";
import { setup as i18n } from "/i18n.js";
import { D as AD, R as AR } from "/ar.js";
i18n(AD, AR);
import { theme, deckHero } from "/art.js";
install(theme);
import { $, h, api, siteFooter, byMahmoudView, toast, guard, modal, fmtDate, ago, initTheme, field, authForm, plansView, adminView } from "/kit.js";
const toggleTheme = initTheme();
const S = { user: null, items: [], cols: [], limits: {}, q: "", tag: "", col: "all", dead: false };
const app = $("#app");
const COLORS = ["blue", "green", "orange", "pink", "purple", "teal"];
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

function shell(content, active) {
  const nav = h("nav", { class: "nav", "aria-label": "Main" }, [["#/", "Library", "home"], ["#/plans", "Plans", "plans"], ["#/account", "Account", "account"]].concat(S.user && S.user.role === "admin" ? [["#/admin", "Admin", "admin"]] : []).map(([href, t, k]) => h("a", { href, class: active === k ? "on" : "" }, t)));
  app.replaceChildren(h("header", { class: "topbar" }, h("div", { class: "in" }, h("a", { class: "brand", href: "#/" }, h("span", { class: "lg" }, "★"), h("span", {}, "Stash")), nav, h("button", { class: "btn sm", "aria-label": "Toggle dark mode", onclick: toggleTheme }, "◐"))), h("main", {}, content), siteFooter());
}
function publicShell(content) {
  app.replaceChildren(h("header", { class: "topbar" }, h("div", { class: "in" }, h("a", { class: "brand", href: "#/" }, h("span", { class: "lg" }, "★"), "Stash"), h("div", { class: "grow" }), h("button", { class: "btn sm", "aria-label": "Toggle dark mode", onclick: toggleTheme }, "◐"))), h("main", {}, content), siteFooter());
}
function landing() {
  publicShell(h("div", { class: "landing" }, h("div", { class: "hero" }, h("div", { html: deckHero() }), h("h1", {}, "Every link you care about, one search away"), h("p", { class: "muted", style: "max-width:560px;margin:0 auto 20px" }, "Collections, tags, instant search, public share pages, import and export. Free to start.")),
    h("div", { class: "row", style: "justify-content:center" }, authForm((u) => { S.user = u; route(); }, { title: "Start with Stash", sub: "Log in or create a free account." })),
    h("div", { class: "feat" }, [["Collections and tags", "Group links your way and filter in one tap."], ["Share a page", "Turn any collection into a public page with one switch."], ["Import and export", "Bring bookmarks from your browser. Take them with you any time."], ["Link checker", "Find dead links before you need them."]].map(([a, b]) => h("div", { class: "card reveal tcard" }, h("h3", {}, a), h("p", { class: "muted" }, b))))));
  reveal(document); document.querySelectorAll(".tcard").forEach(tilt);
}
async function load() { const d = await api("/api/data"); S.items = d.items; S.cols = d.cols; S.limits = d.limits; }
const shown = () => {
  const q = S.q.toLowerCase().trim();
  return S.items.filter((i) => (S.col === "all" || (S.col === "fav" ? i.fav : S.col === "none" ? !i.col : i.col === S.col)) && (!S.tag || i.tags.includes(S.tag)) && (!S.dead || i.status === "dead") &&
    (!q || (i.title + " " + i.url + " " + i.note + " " + i.tags.join(" ")).toLowerCase().includes(q)));
};
async function library() {
  await load();
  const side = h("aside", { class: "side", "aria-label": "Collections" });
  const list = h("div", { class: "stack" });
  const tagbar = h("div", { class: "row", style: "gap:6px" });
  const count = (f) => S.items.filter(f).length;
  const nav = (key, label, n, color) => h("button", { class: "nl" + (S.col === key ? " on" : ""), style: S.col === key ? "background:var(--accent-soft)" : "", "aria-current": S.col === key ? "true" : null, onclick: () => { S.col = key; draw(); } }, h("span", {}, color ? h("span", { class: "dot c-" + color }) : null, label), h("span", { class: "muted small" }, n));
  const draw = () => {
    side.replaceChildren(nav("all", "All links", S.items.length), nav("fav", "★ Favorites", count((i) => i.fav)), nav("none", "Unsorted", count((i) => !i.col)),
      ...S.cols.map((c) => nav(c.id, c.name, count((i) => i.col === c.id), c.color)), h("button", { class: "btn sm", style: "margin-top:8px", onclick: newCol }, "+ Collection"));
    const tags = {}; S.items.forEach((i) => i.tags.forEach((t) => (tags[t] = (tags[t] || 0) + 1)));
    tagbar.replaceChildren(...Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([t, n]) => h("button", { class: "badge tag" + (S.tag === t ? " on" : ""), onclick: () => { S.tag = S.tag === t ? "" : t; draw(); } }, `#${t} ${n}`)));
    const rows = shown(); const cur = S.cols.find((c) => c.id === S.col);
    list.replaceChildren(...(cur ? [colHeader(cur)] : []), ...(rows.length ? rows.map(linkRow) : [h("div", { class: "card empty" }, S.items.length ? "No links match." : h("div", {}, h("h3", {}, "Your vault is empty"), h("p", {}, "Add your first link, or import bookmarks from your browser."), h("button", { class: "btn pri", onclick: () => linkModal() }, "+ Add link")))]));
  };
  const q = h("input", { type: "search", placeholder: "Search title, link, notes, tags", "aria-label": "Search", value: S.q, oninput: (e) => { S.q = e.target.value; draw(); } });
  const dead = S.items.filter((i) => i.status === "dead").length;
  shell(h("div", { class: "layout" }, side, h("div", { class: "stack" },
    h("div", { class: "row" }, h("div", { class: "grow", style: "min-width:200px" }, q), h("button", { class: "btn pri", onclick: () => linkModal() }, "+ Add link"), h("button", { class: "btn", onclick: toolsModal }, "Import / Export"), h("button", { class: "btn", onclick: () => checkLinks(draw) }, "Check links"), dead ? h("button", { class: "btn" + (S.dead ? " pri" : ""), onclick: () => { S.dead = !S.dead; draw(); } }, `Dead (${dead})`) : null),
    tagbar, list, h("p", { class: "small muted" }, `${S.items.length} of ${S.limits.items} links on the ${S.user.plan} plan.`))), "home");
  draw();
  const rd = draw; library.redraw = rd;
}
async function copyMd(c) {
  const rows = S.items.filter((i) => i.col === c.id);
  if (!rows.length) return toast("Add some links first.");
  const md = `# ${c.name}\n\n` + rows.map((i) => `- [${(i.title || i.url).replace(/[\[\]]/g, "")}](${i.url})` + (i.note ? ` - ${i.note.replace(/\s+/g, " ")}` : "")).join("\n") + "\n";
  try { await navigator.clipboard.writeText(md); toast("Markdown copied"); } catch { modal("Markdown", h("textarea", { rows: 10, readonly: true, style: "width:100%", onfocus: (e) => e.target.select() }, md)); }
}
function colHeader(c) {
  const url = c.slug ? `${location.origin}/#/s/${c.slug}` : "";
  return h("div", { class: "card stack" }, h("div", { class: "row spread" }, h("h2", { style: "margin:0" }, h("span", { class: "dot c-" + c.color }), c.name), h("div", { class: "row" },
    h("button", { class: "btn sm", onclick: () => copyMd(c) }, "Copy as Markdown"), h("button", { class: "btn sm", onclick: () => editCol(c) }, "Edit"), h("button", { class: "btn sm" + (c.slug ? " pri" : ""), onclick: () => guard(async () => { await api(`/api/collections/${c.id}`, { shared: !c.slug }); await load(); library(); }) }, c.slug ? "Shared: turn off" : "Share publicly"))),
    c.descr ? h("p", { class: "muted", style: "margin:0" }, c.descr) : null,
    c.slug ? h("div", { class: "row small" }, h("a", { href: url, style: "word-break:break-all" }, url), h("button", { class: "btn sm", onclick: async () => { try { await navigator.clipboard.writeText(url); toast("Link copied"); } catch { toast("Copy the link above", true); } } }, "Copy")) : null);
}
function linkRow(i) {
  const col = S.cols.find((c) => c.id === i.col);
  return h("div", { class: "card link" }, h("div", { class: "fav", "aria-hidden": "true" }, host(i.url).charAt(0).toUpperCase()),
    h("div", { class: "grow stack", style: "gap:4px" }, h("a", { class: "t", href: i.url, target: "_blank", rel: "noopener noreferrer", onclick: () => api(`/api/items/${i.id}/open`, {}).catch(() => {}) }, i.title),
      h("div", { class: "small muted", style: "word-break:break-all" }, host(i.url), i.status === "dead" ? h("span", { class: "badge bad", style: "margin-inline-start:8px" }, "Dead link") : null, i.status === "ok" ? h("span", { class: "badge ok", style: "margin-inline-start:8px" }, "Works") : null),
      i.note ? h("div", { class: "small" }, i.note) : null,
      h("div", { class: "row", style: "gap:5px" }, col ? h("span", { class: "badge" }, h("span", { class: "dot c-" + col.color, style: "margin:0" }), col.name) : null, i.tags.map((t) => h("span", { class: "badge acc" }, "#" + t)))),
    h("div", { class: "row", style: "gap:0;flex-wrap:nowrap" }, h("button", { class: "star" + (i.fav ? " on" : ""), "aria-label": i.fav ? "Remove from favorites" : "Add to favorites", "aria-pressed": !!i.fav, onclick: () => guard(async () => { await api(`/api/items/${i.id}`, { fav: !i.fav }); i.fav = i.fav ? 0 : 1; library.redraw(); }) }, "★"),
      h("button", { class: "btn sm ghost", "aria-label": "Edit " + i.title, onclick: () => linkModal(i) }, "Edit")));
}
function linkModal(i) {
  const url = h("input", { type: "text", inputmode: "url", value: i ? i.url : "", placeholder: "https://example.com", autocomplete: "off" }), title = h("input", { value: i ? i.title : "", placeholder: "Optional: defaults to the site name", maxlength: 200 });
  const note = h("textarea", { placeholder: "Why is this worth keeping?" }, i ? i.note : ""), tags = h("input", { value: i ? i.tags.join(", ") : "", placeholder: "read-later, design" });
  const col = h("select", {}, h("option", { value: "" }, "Unsorted"), S.cols.map((c) => h("option", { value: c.id, selected: i ? i.col === c.id : S.col === c.id }, c.name)));
  const m = modal(i ? "Edit link" : "Add link", h("form", { class: "stack", onsubmit: (e) => { e.preventDefault(); guard(async () => {
    const d = { url: url.value, title: title.value, note: note.value, tags: tags.value, col: col.value };
    if (i) await api(`/api/items/${i.id}`, d); else await api("/api/items", d);
    m.close(); toast("Saved"); await load(); library();
  }); } }, field("Link", url), field("Title", title), field("Note", note), field("Tags", tags, "Comma separated"), field("Collection", col),
    h("div", { class: "row" }, h("button", { class: "btn pri" }, "Save"), i ? h("button", { type: "button", class: "btn danger", onclick: () => confirm("Delete this link?") && guard(async () => { await api(`/api/items/${i.id}`, null, "DELETE"); m.close(); await load(); library(); }) }, "Delete") : null)));
}
function newCol() {
  const n = h("input", { placeholder: "e.g. Reading list", maxlength: 50 }); let color = "blue";
  const sw = h("div", { class: "row" }, COLORS.map((c) => h("button", { type: "button", class: "btn sm", "aria-label": c, onclick: (e) => { color = c; sw.querySelectorAll("button").forEach((b) => b.classList.remove("pri")); e.currentTarget.classList.add("pri"); } }, h("span", { class: "dot c-" + c, style: "margin:0" }))));
  const m = modal("New collection", h("form", { class: "stack", onsubmit: (e) => { e.preventDefault(); guard(async () => { const r = await api("/api/collections", { name: n.value, color }); m.close(); await load(); S.col = r.id; library(); }); } }, field("Name", n), h("div", {}, h("label", {}, "Color"), sw), h("button", { class: "btn pri" }, "Create")));
}
function editCol(c) {
  const n = h("input", { value: c.name, maxlength: 50 }), d = h("textarea", {}, c.descr || ""), color = h("select", {}, COLORS.map((x) => h("option", { value: x, selected: c.color === x }, x)));
  const m = modal("Edit collection", h("form", { class: "stack", onsubmit: (e) => { e.preventDefault(); guard(async () => { await api(`/api/collections/${c.id}`, { name: n.value, descr: d.value, color: color.value }); m.close(); await load(); library(); }); } }, field("Name", n), field("Description", d), field("Color", color),
    h("div", { class: "row" }, h("button", { class: "btn pri" }, "Save"), h("button", { type: "button", class: "btn danger", onclick: () => confirm("Delete this collection? Links stay in your library.") && guard(async () => { await api(`/api/collections/${c.id}`, null, "DELETE"); m.close(); S.col = "all"; await load(); library(); }) }, "Delete"))));
}
async function checkLinks(draw) {
  const todo = S.items.filter((i) => !i.checked || Date.now() - i.checked > 864e5).slice(0, 15);
  const ids = (todo.length ? todo : S.items.slice(0, 15)).map((i) => i.id);
  if (!ids.length) return toast("Add some links first.", true);
  toast("Checking " + ids.length + " links…");
  await guard(async () => { const r = await api("/api/check", { ids }); const bad = r.results.filter((x) => x.status === "dead").length; await load(); draw(); toast(`Checked ${r.results.length}: ${bad} dead. Run again to check more.`); });
}
function toolsModal() {
  const file = h("input", { type: "file", accept: ".json,.html,.htm", "aria-label": "Bookmarks file" });
  const dl = (name, type, text) => { const a = h("a", { href: URL.createObjectURL(new Blob([text], { type })), download: name }); document.body.append(a); a.click(); a.remove(); };
  const m = modal("Import / Export", h("div", { class: "stack" }, h("h3", {}, "Import"), h("p", { class: "muted small" }, "Choose a bookmarks HTML file exported from Chrome, Firefox, Edge or Safari, or a Stash JSON export. Duplicates are skipped."), file,
    h("button", { class: "btn pri", onclick: () => guard(async () => {
      const f = file.files[0]; if (!f) return toast("Choose a file first.", true);
      const txt = await f.text(); let items = [];
      if (/\.json$/i.test(f.name)) { let j; try { j = JSON.parse(txt); } catch { return toast("That file is not valid JSON.", true); } items = (j.items || j).map((x) => ({ url: x.url, title: x.title, note: x.note, tags: x.tags, folder: x.collection })); }
      else { const doc = new DOMParser().parseFromString(txt, "text/html"); doc.querySelectorAll("a[href]").forEach((a) => { let folder = ""; const dl = a.closest("dl"); const hd = dl && dl.previousElementSibling; if (hd && hd.tagName === "H3") folder = hd.textContent; items.push({ url: a.getAttribute("href"), title: a.textContent, folder }); }); }
      if (!items.length) return toast("No links found in that file.", true);
      const r = await api("/api/import", { items }); m.close(); toast(`Imported ${r.added}, skipped ${r.skipped}`); await load(); library();
    }) }, "Import"),
    h("h3", {}, "Export"), h("div", { class: "row" },
      h("button", { class: "btn", onclick: () => dl("stash-export.json", "application/json", JSON.stringify({ exported: new Date().toISOString(), items: S.items.map((i) => ({ title: i.title, url: i.url, note: i.note, tags: i.tags, collection: (S.cols.find((c) => c.id === i.col) || {}).name || "" })) }, null, 2)) }, "Download JSON"),
      h("button", { class: "btn", onclick: () => { const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]); dl("stash-bookmarks.html", "text/html", `<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<TITLE>Bookmarks</TITLE><H1>Bookmarks</H1><DL><p>\n` + S.items.map((i) => `<DT><A HREF="${esc(i.url)}">${esc(i.title)}</A>`).join("\n") + `\n</DL><p>`); } }, "Download bookmarks HTML"))));
}
async function publicPage(slug) {
  let d; try { d = await api(`/api/public/${slug}`); } catch (e) { return publicShell(h("div", { class: "card empty" }, h("h2", {}, "Page not found"), h("p", {}, e.message), h("a", { class: "btn", href: "#/" }, "Go to Stash"))); }
  document.title = `${d.name} · Stash`;
  publicShell(h("div", { class: "stack", style: "max-width:760px;margin:0 auto" }, h("div", {}, h("h1", { style: "margin:0" }, h("span", { class: "dot c-" + d.color }), d.name), h("div", { class: "muted" }, `Shared by ${d.author} · ${d.items.length} link${d.items.length === 1 ? "" : "s"}`), d.descr ? h("p", {}, d.descr) : null),
    d.items.length ? d.items.map((i) => h("div", { class: "card link" }, h("div", { class: "fav", "aria-hidden": "true" }, host(i.url).charAt(0).toUpperCase()), h("div", { class: "grow stack", style: "gap:4px" }, h("a", { class: "t", href: i.url, target: "_blank", rel: "noopener noreferrer nofollow ugc" }, i.title), h("div", { class: "small muted" }, host(i.url)), i.note ? h("div", { class: "small" }, i.note) : null))) : h("div", { class: "card empty" }, "This collection is empty."),
    h("div", { class: "card row spread" }, h("span", { class: "muted" }, "Make your own shareable link collections."), h("a", { class: "btn pri", href: "#/" }, "Try Stash free"))));
}
async function plans() { const d = await api("/api/plans"); shell(h("div", { class: "stack" }, h("h1", {}, "Plans"), plansView(d.plans, S.user.plan), h("p", { class: "muted small" }, "Paid plans are not available yet. Everything on Free works today.")), "plans"); }
function account() {
  const name = h("input", { value: S.user.name, maxlength: 60 }), cur = h("input", { type: "password", autocomplete: "current-password" }), np = h("input", { type: "password", autocomplete: "new-password" });
  shell(h("div", { class: "stack", style: "max-width:520px" }, h("h1", {}, "Account"), h("div", { class: "muted" }, S.user.email + " · plan " + S.user.plan),
    h("form", { class: "card stack", onsubmit: (e) => { e.preventDefault(); guard(async () => { const r = await api("/api/auth/profile", { name: name.value }); S.user = r.user; toast("Saved"); }); } }, h("h2", {}, "Profile"), field("Name", name), h("button", { class: "btn pri" }, "Save")),
    h("form", { class: "card stack", onsubmit: (e) => { e.preventDefault(); guard(async () => { await api("/api/auth/password", { current: cur.value, password: np.value }); cur.value = np.value = ""; toast("Password changed"); }); } }, h("h2", {}, "Password"), field("Current password", cur), field("New password", np, "At least 8 characters"), h("button", { class: "btn" }, "Change password")),
    h("button", { class: "btn", onclick: () => guard(async () => { await api("/api/auth/logout", {}); S.user = null; S.items = []; route(); }) }, "Log out")), "account");
}
async function route() {
  if (location.pathname === "/by-mahmoud") { if (location.hash.length > 1) history.replaceState(null, "", "/" + location.hash); else return publicShell(byMahmoudView()); }
  const p = location.hash.replace(/^#/, "") || "/"; let m;
  if ((m = p.match(/^\/s\/([a-z0-9-]+)$/))) return publicPage(m[1]);
  if (!S.user) return landing();
  try {
    if (p === "/") return await library();
    if (p === "/plans") return await plans();
    if (p === "/account") return account();
    if (p === "/admin") return shell(adminView("Stash", (a) => h("div", { class: "grid" }, [["Saved links", a.items], ["Collections", a.collections], ["Shared pages", a.shared], ["Dead links", a.dead]].map(([l, n]) => h("div", { class: "card" }, h("div", { class: "stat" }, n), h("div", { class: "muted small" }, l))))), "admin");
    location.hash = "#/";
  } catch (e) {
    if (e.status === 401) { S.user = null; return landing(); }
    shell(h("div", { class: "card empty" }, h("h2", {}, "Couldn't load this page"), h("p", {}, e.message), h("a", { class: "btn", href: "#/" }, "Go home")), "home");
  }
}
addEventListener("hashchange", route);
(async () => { try { S.user = (await api("/api/auth/me")).user; } catch { /* offline */ } route(); })();
