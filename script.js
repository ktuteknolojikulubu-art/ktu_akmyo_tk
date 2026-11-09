(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = (u) => (/^https?:\/\//i.test(u || "") ? u : "");

  /* const CATS: etkinlik turlerini renk/icon etiketleriyle eslestirir */
  const CATS = {
    workshop: { label: "Atölye", icon: "🛠️" },
    talk: { label: "Konuşma", icon: "🎤" },
    hackathon: { label: "Hackathon", icon: "💻" },
    training: { label: "Eğitim", icon: "📚" },
    social: { label: "Sosyal", icon: "🎉" }
  };
  const cat = (k) => CATS[k] || { label: "Etkinlik", icon: "✨" };

  const parseDate = (s) => {
    const [y, m, d] = String(s).split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };
  const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
  const fmtLong = (d) => d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" });
  const monthShort = (d) => d.toLocaleDateString("tr-TR", { month: "short" });

  /* WEB SITESININ BILGILERI */
  document.title = SITE.name + " · " + SITE.university;
  $$("[data-site]").forEach((el) => (el.textContent = SITE[el.dataset.site] || ""));
  $("#year").textContent = new Date().getFullYear();

  /* LOGO VE FAVICON YUKLEME (GORSEL YOKSA </> EKLER) */
  if (SITE.logo) {
    const probe = new Image();
    probe.alt = "";
    probe.onload = () => {
      const box = $("#brandLogo");
      box.classList.add("has-img");
      box.textContent = "";
      box.appendChild(probe);
      const fav = $('link[rel="icon"]');
      if (fav) { fav.removeAttribute("type"); fav.href = SITE.logo; }
    };
    probe.src = SITE.logo;
  }

  /* ETKINLIKLER */
  const now = new Date();
  const events = EVENTS.map((e, i) => {
    const d = parseDate(e.date);
    return Object.assign({}, e, { _i: i, _d: d, _past: endOfDay(d) < now });
  });

  /* HAKKIMIZDA */
  $("#aboutText").innerHTML = (SITE.about || []).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#focus").innerHTML = (SITE.focus || [])
    .map((f) => `<div class="focus-item"><i>${esc(f.icon)}</i><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></div>`)
    .join("");

  /* ETKINLIK LISTESI (EN YENI ETKINLIK EN USTE GELIR) */
  const slug = (s) =>
    String(s).toLocaleLowerCase("tr").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  events.forEach((e) => (e._id = e.date + "-" + slug(e.title)));
  const byId = (id) => events.find((e) => e._id === id);

  const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysUntil = (e) => Math.round((e._d - today0) / 86400000);
  const cap = (s) => s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);

  // Yalnızca henüz yapılmamış etkinliklerde "14 gün kaldı" gibi bir etiket gösterilir
  function status(e) {
    if (e._past) return null;
    const n = daysUntil(e);
    if (n <= 0) return { text: "Bugün", cls: "now" };
    if (n === 1) return { text: "Yarın", cls: "soon" };
    if (n <= 30) return { text: n + " gün kaldı", cls: n <= 7 ? "soon" : "" };
    return { text: "Yaklaşıyor", cls: "" };
  }
  const pill = (e) => {
    const s = status(e);
    return s ? `<span class="pill ${s.cls}">${esc(s.text)}</span>` : "";
  };
  const facts = (e) =>
    [
      e.participants ? `👥 ${esc(e.participants)} katılımcı` : "",
      e.gallery && e.gallery.length ? `📷 ${e.gallery.length} fotoğraf` : ""
    ].filter(Boolean);

  const sorted = events.slice().sort((a, b) => b._d - a._d);
  let query = "";

  // eski HTML tasarımlarından kalmış olabilecek kullanılmayan arayüz elementlerini temizler
  $$(".tabs, #chips").forEach((el) => el.remove());

  // Kapak: önce image, yoksa galerinin ilk fotoğrafı
  const coverOf = (e) => e.image || (e.gallery && e.gallery[0]) || "";
  function coverStyle(e) {
    const im = coverOf(e);
    return im ? ` style="background-image:url('${esc(im)}')"` : "";
  }

  // etkinlik nesnesini alarak; kapak gorseli,tarihi,kategorisi,basligi,diger detaylari iceren HTML formatinda tiklanabilir kart uretir
  function cardHtml(e) {
    const f = facts(e);
    const im = coverOf(e);
    return `<button class="card${e._past ? "" : " is-next"}" data-id="${esc(e._id)}" aria-label="${esc(e.title)} detayları">
      <div class="cover ${esc(e.category)}${im ? " has-img" : ""}"${coverStyle(e)}>
        ${im ? "" : `<span aria-hidden="true">${cat(e.category).icon}</span>`}
        <div class="datebox"><b>${e._d.getDate()}</b><small>${esc(monthShort(e._d))}</small></div>
      </div>
      <div class="card-body">
        <div class="card-top"><span class="badge">${esc(cat(e.category).label)}</span>${pill(e)}</div>
        <h3>${esc(e.title)}</h3>
        <p class="desc">${esc(e.description)}</p>
        <p class="info">📍 ${esc(e.location)}${e.time ? " · 🕒 " + esc(e.time) : ""}</p>
        ${f.length ? `<p class="facts">${f.map((x) => `<span>${x}</span>`).join("")}</p>` : ""}
        <span class="more">Detayları gör →</span>
      </div>
    </button>`;
  }

  //arama filtresine gore etkinlikleri filtreler, ay/yillara gore gruplandirarark sayfaya basar, sonuc bulunamazsa uyari mesaji verir
  function render() {
    const list = sorted.filter((e) => {
      if (!query) return true;
      const hay = [e.title, e.description, e.location, e.speaker, cat(e.category).label].join(" ").toLocaleLowerCase("tr");
      return hay.includes(query);
    });
    const box = $("#cards");
    box.className = "cards archive";
    const groups = new Map();
    list.forEach((e) => {
      const k = cap(e._d.toLocaleDateString("tr-TR", { month: "long", year: "numeric" }));
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(e);
    });
    let html = "";
    groups.forEach((items, k) => {
      html += `<h3 class="group-title">${esc(k)}</h3>` + items.map(cardHtml).join("");
    });
    box.innerHTML = html;
    const empty = $("#empty");
    empty.hidden = list.length > 0;
    if (!list.length) {
      empty.textContent = query ? "Aramanıza uyan etkinlik bulunamadı." : "Henüz etkinlik eklenmedi. Bizi takip etmeye devam edin!";
    }
  }

  $("#q").addEventListener("input", (ev) => {
    query = ev.target.value.trim().toLocaleLowerCase("tr");
    render();
  });
  render();

  /* ETKINLIKTEKI FOTOGRAFLARI BUYUTME */
  let gal = [], gi = 0;
  const lb = $("#lightbox");
  function showLb(i) {
    if (!gal.length) return;
    gi = (i + gal.length) % gal.length;
    $("#lbImg").src = gal[gi];
    $("#lbCount").textContent = gi + 1 + " / " + gal.length;
    const multi = gal.length > 1;
    $("#lbPrev").hidden = $("#lbNext").hidden = !multi;
  }
  function openLb(i) {
    showLb(i);
    if (typeof lb.showModal === "function") lb.showModal();
    else lb.setAttribute("open", "");
  }
  $("#mGallery").addEventListener("click", (ev) => {
    const t = ev.target.closest(".thumb");
    if (t) openLb(Number(t.dataset.n));
  });
  $("#lbPrev").addEventListener("click", () => showLb(gi - 1));
  $("#lbNext").addEventListener("click", () => showLb(gi + 1));
  $("#lbClose").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (ev) => { if (ev.target === lb) lb.close(); });
  lb.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowLeft") showLb(gi - 1);
    if (ev.key === "ArrowRight") showLb(gi + 1);
  });

  /* ETKINLIKTEKI DETAY PENCERESI */
  const modal = $("#modal");
  // etkinlige tiklandiginda detay penceresini etkinlik bilgileriyle doldurur,tarayici adres cubugunu gunceller, pencereyi ekranda acar
  function openModal(e) {
    const c = cat(e.category);
    const cover = $("#mCover");
    const im = coverOf(e);
    cover.className = "m-cover cover " + e.category + (im ? " has-img" : "");
    cover.style.backgroundImage = im ? `url('${im.replace(/'/g, "%27")}')` : "";
    cover.textContent = im ? "" : c.icon;
    const st = status(e);
    $("#mBadge").textContent = c.label + (st ? " · " + st.text : "");
    $("#mTitle").textContent = e.title;
    const tile = (k, v) => `<li><span>${k}</span><b>${v}</b></li>`;
    $("#mMeta").innerHTML =
      tile("Tarih", esc(fmtLong(e._d))) +
      (e.time ? tile("Saat", esc(e.time)) : "") +
      tile("Yer", esc(e.location)) +
      (e.speaker ? tile("Konuşmacı", esc(e.speaker)) : "") +
      (e.participants ? tile("Katılımcı", esc(e.participants) + " kişi") : "");
    $("#mDesc").textContent = e.description;
    const rep = Array.isArray(e.report) ? e.report : e.report ? [e.report] : [];
    $("#mReport").innerHTML = rep.length
      ? `<h4>${e._past ? "Etkinlikte neler yaptık?" : "Programda neler var?"}</h4>` + rep.map((p) => `<p>${esc(p)}</p>`).join("")
      : "";
    gal = e.gallery || [];
    $("#mGallery").innerHTML = gal.length
      ? `<h4>Fotoğraflar <small>${gal.length}</small></h4><div class="g-grid">` +
        gal.map((g, n) => `<button type="button" class="thumb" data-n="${n}" aria-label="${n + 1}. fotoğrafı büyüt"><img src="${esc(g)}" alt="${esc(e.title)} fotoğrafı ${n + 1}" loading="lazy"></button>`).join("") +
        `</div>`
      : "";

    const actions = [];
    const link = safeUrl(e.link);
    if (link) actions.push(`<a class="btn primary" href="${esc(link)}" target="_blank" rel="noopener noreferrer">${e._past ? "Daha fazla bilgi" : "Kayıt / Bilgi"}</a>`);
    $("#mActions").innerHTML = actions.join("");
    $(".modal-in", modal).scrollTop = 0;
    try { history.replaceState(null, "", "#etkinlik=" + e._id); } catch (err) {}
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  $("#etkinlikler").addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-id]");
    if (t) { const e = byId(t.dataset.id); if (e) openModal(e); }
  });
  $("#mClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (ev) => {
    if (ev.target === modal) modal.close();
  });
  modal.addEventListener("close", () => {
    try { history.replaceState(null, "", location.pathname + location.search); } catch (err) {}
  });

  // dogrudan paylasilan bir etkinlik baglantisiyla acildiginda o etkinligin detay penceresini acar
  (function openFromHash() {
    const m = location.hash.match(/^#etkinlik=(.+)$/);
    const e = m && byId(decodeURIComponent(m[1]));
    if (!e) return;
    openModal(e);
  })();

  /* EKIP */
  //const initials: bas harf ayarlama
  const initials = (n) =>
    String(n).replace(/^(Danışman|Öğr\.|Gör\.|Dr\.|Doç\.|Prof\.)\s*/gi, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toLocaleUpperCase("tr");
  $("#team").innerHTML = TEAM.map((m) => {
    const url = safeUrl(m.link);
    //const site: sosyal medya tespiti
    const site = (u) => {
      const h = u.toLowerCase();
      if (h.includes("linkedin.")) return "LinkedIn";
      if (h.includes("github.")) return "GitHub";
      if (h.includes("instagram.")) return "Instagram";
      if (h.includes("twitter.") || h.includes("x.com")) return "X";
      return "Profil";
    };
    const inner =
      `<div class="avatar" aria-hidden="true">${esc(initials(m.name) || "?")}</div><h4>${esc(m.name)}</h4><p>${esc(m.role)}</p>` +
      (url ? `<span class="m-link">${site(url)} ↗</span>` : "");
    return url
      ? `<a class="member" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
      : `<div class="member">${inner}</div>`;
  }).join("");

  /* ILETISIM */
  //e-posta adresini iletisim baglantisina baglar, sosyal medya hesaplarini filtreleyerek web sayfasina dinamik olarak ekler
  const mailHref = SITE.email ? "mailto:" + SITE.email : "#iletisim";
  $("#mailLink").href = mailHref;
  $("#mailLink").textContent = SITE.email || "";
  const names = { instagram: "Instagram", github: "GitHub", linkedin: "LinkedIn", discord: "Discord", youtube: "YouTube" };
  $("#socials").innerHTML = Object.keys(names)
    .filter((k) => safeUrl(SITE.social && SITE.social[k]))
    .map((k) => `<a href="${esc(SITE.social[k])}" target="_blank" rel="noopener noreferrer">${names[k]}</a>`)
    .join("");

  /* NAV DAVRANISI */
  const nav = $("#nav"), menu = $("#menu"), burger = $("#burger");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", (ev) => {
    if (ev.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });
  if ("IntersectionObserver" in window) {
    const links = $$("#menu a");
    const spy = new IntersectionObserver(
      (en) =>
        en.forEach((x) => {
          if (x.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + x.target.id));
        }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    $$("main section[id]").forEach((s) => spy.observe(s));
  }

  /* TEMA */
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = saved || (prefersDark ? "dark" : "light");
  $("#themeBtn").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* HAFIF GIRIS ANIMASYONU */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const rv = new IntersectionObserver(
      (en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); rv.unobserve(x.target); } }),
      { threshold: 0.12 }
    );
    $$(".section-head, .focus-item, .member, .about-text, .band-in").forEach((el) => { el.classList.add("reveal"); rv.observe(el); });
  }
})();
