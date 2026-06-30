/* ============================================================
   Presley Fine Arts — Site behavior
   - Hydrates [data-art] placeholders with generative SVG
   - Renders Artists, Artist detail, and Catalogue pages
   - Nav (mobile + active state), reveal-on-scroll, forms
   ============================================================ */
(function () {
  "use strict";

  var Art = window.PFAArt;
  var Data = window.PFAData;

  document.addEventListener("DOMContentLoaded", function () {
    loadCMSContent(function () {
      initNav();
      hydrateArt(document);
      var page = document.body.getAttribute("data-page");
      if (page === "artists") renderArtists();
      if (page === "artist") renderArtistDetail();
      if (page === "catalogue") renderCatalogue();
      if (page === "contact") initContactForm();
      initNewsletter();
      initReveal();
    });
  });

  /* ---------------- CMS content loader ---------------- */
  function loadCMSContent(done) {
    fetch("content/data.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("No CMS content found");
        return res.json();
      })
      .then(function (json) {
        if (json && window.PFAData) {
          window.PFAData.artists = json.artists || window.PFAData.artists;
          window.PFAData.catalogues = json.catalogues || window.PFAData.catalogues;
          window.PFAData.gallery = json.gallery || window.PFAData.gallery;
          window.PFAData.catalogueById = function (id) {
            return (window.PFAData.catalogues || []).find(function (c) { return c.id === id; }) || null;
          };
          window.PFAData.artistBySlug = function (slug) {
            return (window.PFAData.artists || []).find(function (a) { return a.slug === slug; }) || null;
          };
          Data = window.PFAData;
        }
      })
      .catch(function () {
        // If content/data.json is unavailable, the original js/data.js fallback still works.
      })
      .finally(done);
  }

  /* ---------------- Navigation ---------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", links.classList.contains("open"));
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("open"); });
      });
    }
    var current = document.body.getAttribute("data-page");
    document.querySelectorAll(".nav-links a[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === current) a.classList.add("is-active");
    });
  }

  /* ---------------- Art hydration ---------------- */
  function hydrateArt(root) {
    root.querySelectorAll("[data-art]").forEach(function (el) {
      if (el.getAttribute("data-art-done")) return;
      el.innerHTML = artFor(el);
      el.setAttribute("data-art-done", "1");
    });
  }

  function artFor(el) {
    var kind = el.getAttribute("data-art");
    var seed = el.getAttribute("data-seed") || kind;
    var opts = {};
    ["w", "h"].forEach(function (k) {
      var v = el.getAttribute("data-" + k);
      if (v) opts[k] = parseInt(v, 10);
    });
    switch (kind) {
      case "artwork": return Art.artwork(seed, opts);
      case "portrait": return Art.portrait(seed, el.getAttribute("data-name") || "", opts);
      case "book":
        opts.title = el.getAttribute("data-title") || "";
        opts.titleShort = el.getAttribute("data-title-short") || opts.title;
        opts.artist = el.getAttribute("data-artist") || "";
        opts.dark = el.getAttribute("data-dark") === "true";
        return Art.book(seed, opts);
      case "gallery": return Art.gallery(seed, opts);
      case "building": return Art.building(seed, opts);
      case "brush": return Art.brush(seed, opts);
      case "map": return Art.map(opts);
      default: return "";
    }
  }

  /* ---------------- Artists listing ---------------- */
  function renderArtists() {
    var grid = document.getElementById("artist-grid");
    if (!grid) return;
    grid.innerHTML = Data.artists.map(function (a) {
      return (
        '<a class="artist-card" data-reveal href="artist.html?artist=' + a.slug + '">' +
          '<div class="portrait" data-art="portrait" data-seed="' + a.portraitSeed + '" data-name="' + esc(a.name) + '"></div>' +
          '<div class="artist-card__name serif">' + esc(a.name) + '</div>' +
          '<div class="artist-card__meta">' + esc(a.discipline) + '</div>' +
          '<p class="artist-card__disc">' + esc(a.born) + '</p>' +
        '</a>'
      );
    }).join("");
    hydrateArt(grid);
    initReveal();
  }

  /* ---------------- Artist detail ---------------- */
  function renderArtistDetail() {
    var slug = new URLSearchParams(location.search).get("artist");
    var a = Data.artistBySlug(slug) || Data.artists[0];
    var mount = document.getElementById("artist-detail");
    if (!mount) return;

    document.title = a.name + " — Presley Fine Arts";

    var cat = Data.catalogueById(a.catalogue);
    var showHtml = a.currentShow
      ? '<div><span class="label">' + esc(a.currentShow.status) + '</span><p class="serif" style="font-style:italic">' +
        esc(a.currentShow.title) + ' · ' + esc(a.currentShow.dates) + '</p></div>'
      : "";

    var worksHtml = a.works.map(function (w) {
      return (
        '<figure class="work" data-reveal>' +
          '<div class="artframe"><div data-art="artwork" data-seed="' + w.seed + '"></div></div>' +
          '<figcaption><div class="work__title">' + esc(w.title) + ', ' + w.year + '</div>' +
          '<div class="work__meta">' + esc(w.medium) + ' · ' + esc(w.dim) + '</div></figcaption>' +
        '</figure>'
      );
    }).join("");

    var catHtml = cat ? (
      '<section class="assoc-cat section">' +
        '<div class="wrap assoc-cat__inner">' +
          '<div class="bookshot" data-reveal data-art="book" data-seed="' + cat.seed + '" data-artist="' + esc(cat.artist) +
            '" data-title="' + esc(cat.title) + '" data-dark="' + (cat.dark ? "true" : "false") + '"></div>' +
          '<div data-reveal>' +
            '<span class="eyebrow">Associated Catalogue</span>' +
            '<h2 class="assoc-cat__title display">' + esc(cat.title) + '</h2>' +
            '<div class="assoc-cat__by">' + esc(cat.artist) + ' · ' + cat.year + '</div>' +
            '<p class="assoc-cat__desc">' + esc(cat.description) + '</p>' +
            '<div class="assoc-cat__specs">' +
              '<div><span class="label">Essay</span><p>' + esc(cat.essay) + '</p></div>' +
              '<div><span class="label">Pages</span><p>' + cat.pages + '</p></div>' +
              '<div><span class="label">Format</span><p>' + esc(cat.dimensions) + '</p></div>' +
              '<div><span class="label">Price</span><p>' + esc(cat.price) + '</p></div>' +
            '</div>' +
            '<a class="btn btn--solid" href="catalogue.html">Browse the Catalogue <span class="arw">&rarr;</span></a>' +
          '</div>' +
        '</div>' +
      '</section>'
    ) : "";

    mount.innerHTML =
      '<section class="section page-head">' +
        '<div class="wrap">' +
          '<div class="breadcrumb"><a href="artists.html">Artists</a> &nbsp;/&nbsp; ' + esc(a.name) + '</div>' +
          '<div class="detail-hero">' +
            '<div class="portrait" data-reveal data-art="portrait" data-seed="' + a.portraitSeed + '" data-name="' + esc(a.name) + '" data-w="560" data-h="680"></div>' +
            '<div data-reveal>' +
              '<h1 class="detail-name display">' + esc(a.name) + '</h1>' +
              '<div class="detail-meta">' +
                '<div><span class="label">Born</span><p>' + esc(a.born) + '</p></div>' +
                '<div><span class="label">Based</span><p>' + esc(a.based) + '</p></div>' +
                '<div><span class="label">Discipline</span><p>' + esc(a.discipline) + '</p></div>' +
              '</div>' +
              showHtml +
              '<div class="detail-bio">' + a.bio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<hr class="rule">' +
      '<section class="section">' +
        '<div class="wrap">' +
          '<span class="eyebrow">Selected Works</span>' +
          '<div class="works-grid">' + worksHtml + '</div>' +
        '</div>' +
      '</section>' +
      catHtml;

    hydrateArt(mount);
    initReveal();
  }

  /* ---------------- Catalogue page ---------------- */
  function renderCatalogue() {
    var grid = document.getElementById("cat-grid");
    if (!grid) return;
    grid.innerHTML = Data.catalogues.map(function (c) {
      return (
        '<article class="cat-item" data-reveal>' +
          '<div class="bookshot" data-art="book" data-seed="' + c.seed + '" data-artist="' + esc(c.artist) +
            '" data-title="' + esc(c.title) + '" data-dark="' + (c.dark ? "true" : "false") + '"></div>' +
          '<div class="cat-item__title serif">' + esc(c.title) + '</div>' +
          '<div class="cat-item__by">' + esc(c.artist) + '</div>' +
          '<p style="font-size:.88rem;color:#5f574c;margin:.4em 0 1em">Essay by ' + esc(c.essay) + ' · ' + c.pages + ' pp · ' + esc(c.dimensions) + '</p>' +
          '<div class="cat-item__meta"><span>' + c.year + ' · ' + esc(c.edition) + '</span><span class="cat-item__price">' + esc(c.price) + '</span></div>' +
        '</article>'
      );
    }).join("");
    hydrateArt(grid);
    initReveal();
  }

  /* ---------------- Forms ---------------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = document.getElementById("contact-success");
      if (ok) ok.classList.add("show");
      form.reset();
    });
  }
  function initNewsletter() {
    document.querySelectorAll("form[data-newsletter]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input");
        var btn = form.querySelector("button");
        if (btn) btn.textContent = "Thank you";
        if (input) input.value = "";
      });
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
