import { BaseHub, makeWorker, bad, clean, rid, now } from "./core.js";

const LIMITS = { free: { items: 200, cols: 5, shared: 2 }, pro: { items: 5000, cols: 100, shared: 100 } };
function normUrl(u) {
  u = String(u || "").trim(); if (!u) bad("Enter a link.");
  if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = "https://" + u;
  let x; try { x = new URL(u); } catch { bad("That link doesn't look valid."); }
  if (!["http:", "https:"].includes(x.protocol)) bad("Only http and https links can be saved.");
  if (x.username || x.password) bad("Links with a username or password inside can't be saved.");
  if (u.length > 2000) bad("That link is too long.");
  return x.toString();
}
function safeHost(h) {
  h = h.toLowerCase();
  return !(h === "localhost" || h.endsWith(".local") || h.endsWith(".internal") || /^\[/.test(h) || /^(0|10|127|169\.254|172\.(1[6-9]|2\d|3[01])|192\.168)\./.test(h) || !h.includes("."));
}
const tagList = (s) => (s ? s.split(",").filter(Boolean) : []);
const normTags = (t) => [...new Set((Array.isArray(t) ? t : String(t || "").split(",")).map((x) => clean(x, 24).toLowerCase().replace(/[,\s]+/g, "-")).filter(Boolean))].slice(0, 8).join(",");

export class Hub extends BaseHub {
  adminHash() { return this.env.ADMIN_HASH || null; }
  schemaSQL() {
    return `CREATE TABLE IF NOT EXISTS cols(id TEXT PRIMARY KEY, owner TEXT NOT NULL, name TEXT NOT NULL, color TEXT NOT NULL DEFAULT 'blue', slug TEXT UNIQUE, descr TEXT NOT NULL DEFAULT '', created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS items(id TEXT PRIMARY KEY, owner TEXT NOT NULL, col TEXT, title TEXT NOT NULL, url TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', tags TEXT NOT NULL DEFAULT '', fav INTEGER NOT NULL DEFAULT 0, opens INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT '', checked INTEGER, created INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS items_owner ON items(owner)`;
  }
  lim(u) { return LIMITS[u.plan] || LIMITS.free; }
  adminStats() { return { items: this.one("SELECT COUNT(*) n FROM items").n, collections: this.one("SELECT COUNT(*) n FROM cols").n, shared: this.one("SELECT COUNT(*) n FROM cols WHERE slug IS NOT NULL").n, dead: this.one("SELECT COUNT(*) n FROM items WHERE status='dead'").n }; }
  out(i) { return { ...i, tags: tagList(i.tags) }; }
  host(url) { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; } }
  addItem(u, d) {
    const url = normUrl(d.url); const title = clean(d.title, 200) || this.host(url) || url;
    let col = null; if (d.col) { const c = this.one("SELECT id FROM cols WHERE id=? AND owner=?", String(d.col), u.id); if (!c) bad("Collection not found.", 404); col = c.id; }
    const id = rid(7);
    this.run("INSERT INTO items(id,owner,col,title,url,note,tags,fav,created) VALUES(?,?,?,?,?,?,?,?,?)", id, u.id, col, title, url, clean(d.note, 1000), normTags(d.tags), d.fav ? 1 : 0, now());
    return id;
  }
  purgeUsers(ids) { const n = ids.map(() => "?").join(","); this.run(`DELETE FROM items WHERE owner IN (${n})`, ...ids); this.run(`DELETE FROM cols WHERE owner IN (${n})`, ...ids); }
  usage(u) { const l = this.lim(u), n = (sql) => this.one(sql, u.id).n; return [["Saved links", n("SELECT COUNT(*) n FROM items WHERE owner=?"), l.items], ["Collections", n("SELECT COUNT(*) n FROM cols WHERE owner=?"), l.cols], ["Public pages", n("SELECT COUNT(*) n FROM cols WHERE owner=? AND slug IS NOT NULL"), l.shared]]; }
  exportData(u) {
    return { collections: this.q("SELECT * FROM cols WHERE owner=? LIMIT 2000", u.id), links: this.q("SELECT * FROM items WHERE owner=? LIMIT 20000", u.id) };
  }
  async app(c) {
    const { path, method, body } = c; let m;
    if (path === "/api/plans" && method === "GET") return { plans: [
      { id: "free", name: "Free", price: "$0", features: ["200 saved links", "5 collections", "2 public share pages", "Import, export, link checker"] },
      { id: "pro", name: "Pro", price: "$4/mo", features: ["5,000 saved links", "100 collections", "100 public pages", "Priority support"] }] };
    if ((m = path.match(/^\/api\/public\/([a-z0-9-]+)$/)) && method === "GET") {
      const col = this.one("SELECT c.*,u.name author FROM cols c JOIN users u ON u.id=c.owner WHERE c.slug=?", m[1]);
      if (!col) bad("This page doesn't exist or is no longer shared.", 404);
      return { name: col.name, descr: col.descr, color: col.color, author: col.author, items: this.q("SELECT id,title,url,note,tags FROM items WHERE col=? ORDER BY created DESC LIMIT 500", col.id).map((i) => this.out(i)) };
    }
    const u = this.need(c);
    if (path === "/api/data" && method === "GET") {
      const items = this.q("SELECT * FROM items WHERE owner=? ORDER BY created DESC", u.id).map((i) => this.out(i));
      const cols = this.q("SELECT id,name,color,slug,descr FROM cols WHERE owner=? ORDER BY created", u.id);
      return { items, cols, limits: this.lim(u) };
    }
    if (path === "/api/items" && method === "POST") {
      if (this.one("SELECT COUNT(*) n FROM items WHERE owner=?", u.id).n >= this.lim(u).items) bad(`Your ${u.plan} plan holds ${this.lim(u).items} links. Pro is coming soon.`, 402);
      this.limit("add:" + u.id, 120, 600e3);
      return { id: this.addItem(u, body) };
    }
    if ((m = path.match(/^\/api\/items\/([a-f0-9]+)$/))) {
      const it = this.one("SELECT * FROM items WHERE id=? AND owner=?", m[1], u.id); if (!it) bad("Link not found.", 404);
      if (method === "DELETE") { this.run("DELETE FROM items WHERE id=?", it.id); return { ok: true }; }
      if (method === "POST") {
        const url = body.url !== undefined ? normUrl(body.url) : it.url;
        let col = it.col; if (body.col !== undefined) { if (body.col) { if (!this.one("SELECT 1 x FROM cols WHERE id=? AND owner=?", String(body.col), u.id)) bad("Collection not found.", 404); col = String(body.col); } else col = null; }
        this.run("UPDATE items SET title=?,url=?,note=?,tags=?,fav=?,col=?,status=CASE WHEN url<>? THEN '' ELSE status END WHERE id=?", body.title !== undefined ? (clean(body.title, 200) || it.title) : it.title, url, body.note !== undefined ? clean(body.note, 1000) : it.note, body.tags !== undefined ? normTags(body.tags) : it.tags, body.fav !== undefined ? (body.fav ? 1 : 0) : it.fav, col, url, it.id);
        return { ok: true };
      }
    }
    if ((m = path.match(/^\/api\/items\/([a-f0-9]+)\/open$/)) && method === "POST") { this.run("UPDATE items SET opens=opens+1 WHERE id=? AND owner=?", m[1], u.id); return { ok: true }; }
    if (path === "/api/collections" && method === "POST") {
      const name = clean(body.name, 50); if (name.length < 2) bad("Give the collection a name.");
      if (this.one("SELECT COUNT(*) n FROM cols WHERE owner=?", u.id).n >= this.lim(u).cols) bad(`Your ${u.plan} plan allows ${this.lim(u).cols} collections.`, 402);
      const id = rid(6); this.run("INSERT INTO cols(id,owner,name,color,created) VALUES(?,?,?,?,?)", id, u.id, name, ["blue", "green", "orange", "pink", "purple", "teal"].includes(body.color) ? body.color : "blue", now()); return { id };
    }
    if ((m = path.match(/^\/api\/collections\/([a-f0-9]+)$/))) {
      const col = this.one("SELECT * FROM cols WHERE id=? AND owner=?", m[1], u.id); if (!col) bad("Collection not found.", 404);
      if (method === "DELETE") { this.run("UPDATE items SET col=NULL WHERE col=?", col.id); this.run("DELETE FROM cols WHERE id=?", col.id); return { ok: true }; }
      if (method === "POST") {
        const name = body.name !== undefined ? clean(body.name, 50) : col.name; if (name.length < 2) bad("Give the collection a name.");
        let slug = col.slug;
        if (body.shared === true && !slug) {
          if (this.one("SELECT COUNT(*) n FROM cols WHERE owner=? AND slug IS NOT NULL", u.id).n >= this.lim(u).shared) bad(`Your ${u.plan} plan allows ${this.lim(u).shared} public pages.`, 402);
          slug = (name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "list") + "-" + rid(3); this.audit(u.id, "share_on", slug);
        } else if (body.shared === false) { slug = null; this.audit(u.id, "share_off", col.name); }
        this.run("UPDATE cols SET name=?,descr=?,color=?,slug=? WHERE id=?", name, body.descr !== undefined ? clean(body.descr, 300) : col.descr, ["blue", "green", "orange", "pink", "purple", "teal"].includes(body.color) ? body.color : col.color, slug, col.id);
        return { ok: true, slug };
      }
    }
    if (path === "/api/import" && method === "POST") {
      const list = Array.isArray(body.items) ? body.items.slice(0, 1000) : []; if (!list.length) bad("Nothing to import.");
      let room = this.lim(u).items - this.one("SELECT COUNT(*) n FROM items WHERE owner=?", u.id).n; let added = 0, skipped = 0;
      const have = new Set(this.q("SELECT url FROM items WHERE owner=?", u.id).map((r) => r.url));
      const colIds = {};
      for (const it of list) {
        let url; try { url = normUrl(it.url); } catch { skipped++; continue; }
        if (have.has(url) || room <= 0) { skipped++; continue; }
        let col = null;
        if (it.folder) { const fname = clean(it.folder, 50); if (fname.length >= 2) { if (!(fname in colIds)) { const ex = this.one("SELECT id FROM cols WHERE owner=? AND name=?", u.id, fname); if (ex) colIds[fname] = ex.id; else if (this.one("SELECT COUNT(*) n FROM cols WHERE owner=?", u.id).n < this.lim(u).cols) { const id = rid(6); this.run("INSERT INTO cols(id,owner,name,created) VALUES(?,?,?,?)", id, u.id, fname, now()); colIds[fname] = id; } else colIds[fname] = null; } col = colIds[fname]; } }
        this.run("INSERT INTO items(id,owner,col,title,url,note,tags,created) VALUES(?,?,?,?,?,?,?,?)", rid(7), u.id, col, clean(it.title, 200) || this.host(url), url, clean(it.note, 1000), normTags(it.tags), now());
        have.add(url); room--; added++;
      }
      this.audit(u.id, "import", `${added} added`); return { added, skipped };
    }
    if (path === "/api/check" && method === "POST") {
      this.limit("chk:" + u.id, 10, 600e3);
      const ids = Array.isArray(body.ids) ? body.ids.slice(0, 15) : [];
      const res = [];
      await Promise.all(ids.map(async (id) => {
        const it = this.one("SELECT id,url FROM items WHERE id=? AND owner=?", String(id), u.id); if (!it) return;
        let st = "dead";
        try { const x = new URL(it.url); if (!safeHost(x.hostname)) st = "skipped"; else {
          const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
          let r = await fetch(it.url, { method: "HEAD", redirect: "follow", signal: ctl.signal, headers: { "user-agent": "StashLinkChecker/1.0" } });
          if (r.status === 405 || r.status === 403 || r.status === 501) r = await fetch(it.url, { method: "GET", redirect: "follow", signal: ctl.signal, headers: { "user-agent": "StashLinkChecker/1.0" } });
          clearTimeout(t); st = r.status < 400 || r.status === 403 || r.status === 429 ? "ok" : "dead"; } } catch { st = "dead"; }
        if (st !== "skipped") this.run("UPDATE items SET status=?,checked=? WHERE id=?", st, now(), it.id);
        res.push({ id: it.id, status: st });
      }));
      return { results: res };
    }
    return null;
  }
}
export default makeWorker("HUB");
