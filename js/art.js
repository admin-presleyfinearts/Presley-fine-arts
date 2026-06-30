/* ============================================================
   Presley Fine Arts — Generative SVG visuals
   Deterministic, on-brand placeholder art (weathered abstract
   canvases, portraits, book covers, gallery scene, map).
   Drop in real photography by replacing the .svg outputs.
   ============================================================ */
(function (global) {
  "use strict";

  // --- Brand palette ---
  var PAL = {
    galleryWhite: "#faf7f0",
    warmPaper: "#efeae0",
    cream: "#f4efe7",
    stone: "#d8d0c5",
    graphite: "#2a2622",
    ink: "#14110e",
    terracotta: "#c0552f",
    terracottaSoft: "#d97e5c",
    slate: "#54605a",
    slateBlue: "#4f5d63",
  };

  // Curated weathered-canvas palettes (Afterlight-style)
  var ART_PALETTES = [
    ["#cdbfa6", "#b89f7e", "#8f7a5c", "#d8cbb3", "#a9b0a6"], // ochre / sage
    ["#c8b6a0", "#9aa6a0", "#7e8c86", "#d6c8b4", "#b86a44"], // slate + terracotta
    ["#d3c6b0", "#bfa98a", "#9c8467", "#e0d6c2", "#7d8a86"], // warm parchment
    ["#b9b0a3", "#8f9a93", "#6f6256", "#cabfae", "#c0552f"], // graphite drift
    ["#d8cdb8", "#c2a98c", "#a78a6b", "#c9c0b0", "#5b6b66"], // dusk linen
  ];

  // --- Deterministic PRNG (mulberry32) ---
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s |= 0; s = (s + 0x6d2b79f5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(str) {
    var h = 2166136261 >>> 0;
    str = String(str);
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function rnd(r, a, b) { return a + (b - a) * r(); }

  function uid(seed) { return "g" + (hash(seed) % 1e6).toString(36); }

  /* ---------------------------------------------------------
     ARTWORK — weathered abstract canvas
     --------------------------------------------------------- */
  function artwork(seed, opts) {
    opts = opts || {};
    var w = opts.w || 800, h = opts.h || (opts.ratio ? Math.round(w / opts.ratio) : 600);
    var r = rng(hash(seed));
    var pal = ART_PALETTES[Math.floor(r() * ART_PALETTES.length)];
    var id = uid(seed);
    var base = pal[0];
    var parts = [];

    // layered washes
    var bands = 4 + Math.floor(r() * 4);
    for (var i = 0; i < bands; i++) {
      var bx = rnd(r, -0.1, 0.6) * w;
      var by = rnd(r, -0.1, 0.7) * h;
      var bw = rnd(r, 0.4, 0.9) * w;
      var bh = rnd(r, 0.25, 0.7) * h;
      var col = pal[1 + Math.floor(r() * (pal.length - 1))];
      parts.push('<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) +
        '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) +
        '" fill="' + col + '" opacity="' + rnd(r, 0.32, 0.7).toFixed(2) + '"/>');
    }

    // a few quiet marks / lines
    var marks = 2 + Math.floor(r() * 4);
    for (var m = 0; m < marks; m++) {
      var x1 = rnd(r, 0.1, 0.9) * w, y1 = rnd(r, 0.1, 0.9) * h;
      var x2 = x1 + rnd(r, -0.25, 0.25) * w, y2 = y1 + rnd(r, -0.3, 0.3) * h;
      parts.push('<line x1="' + x1.toFixed(0) + '" y1="' + y1.toFixed(0) + '" x2="' +
        x2.toFixed(0) + '" y2="' + y2.toFixed(0) + '" stroke="' + PAL.graphite +
        '" stroke-width="' + rnd(r, 0.6, 2.4).toFixed(1) + '" opacity="' + rnd(r, 0.12, 0.4).toFixed(2) + '"/>');
    }

    // occasional terracotta accent
    if (r() > 0.45) {
      var ax = rnd(r, 0.1, 0.8) * w, ay = rnd(r, 0.1, 0.8) * h;
      var as = rnd(r, 0.04, 0.12) * w;
      parts.push('<rect x="' + ax.toFixed(0) + '" y="' + ay.toFixed(0) + '" width="' +
        as.toFixed(0) + '" height="' + as.toFixed(0) + '" fill="' + PAL.terracotta +
        '" opacity="' + rnd(r, 0.5, 0.85).toFixed(2) + '"/>');
    }

    var seedNum = (hash(seed) % 100);
    return svg(w, h,
      '<defs>' +
        '<filter id="' + id + 'n"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="3" seed="' + seedNum + '" result="n"/>' +
        '<feColorMatrix in="n" type="saturate" values="0"/>' +
        '<feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>' +
        '<feComposite operator="in" in2="SourceGraphic"/></filter>' +
        '<filter id="' + id + 'g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + (seedNum + 7) + '"/>' +
        '<feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.06"/></feComponentTransfer></filter>' +
      '</defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="' + base + '"/>' +
      '<g>' + parts.join("") + '</g>' +
      // weathering noise overlay
      '<rect width="' + w + '" height="' + h + '" fill="' + PAL.cream + '" filter="url(#' + id + 'n)" opacity="0.5"/>' +
      '<rect width="' + w + '" height="' + h + '" filter="url(#' + id + 'g)"/>' +
      // inner border
      '<rect x="0.5" y="0.5" width="' + (w - 1) + '" height="' + (h - 1) + '" fill="none" stroke="rgba(20,17,14,0.12)"/>'
    );
  }

  /* ---------------------------------------------------------
     PORTRAIT — duotone abstract with serif initials
     --------------------------------------------------------- */
  function portrait(seed, name, opts) {
    opts = opts || {};
    var w = opts.w || 480, h = opts.h || 560;
    var r = rng(hash(seed + "·p"));
    var id = uid(seed + "p");
    var duos = [
      [PAL.graphite, PAL.stone],
      [PAL.slate, PAL.cream],
      [PAL.ink, "#cabfae"],
      ["#3a342d", "#d8cdb8"],
    ];
    var duo = pick(r, duos);
    var initials = (name || "").split(/\s+/).map(function (s) { return s[0]; }).join("").slice(0, 2).toUpperCase();

    // soft shoulders/head silhouette
    var cx = w / 2, headR = w * 0.2;
    var headY = h * 0.38;
    var sil = '<g opacity="0.5">' +
      '<circle cx="' + cx + '" cy="' + headY + '" r="' + headR + '" fill="' + duo[0] + '"/>' +
      '<path d="M ' + (cx - headR * 1.9) + ' ' + h + ' C ' + (cx - headR * 1.7) + ' ' + (headY + headR * 1.2) +
        ', ' + (cx - headR * 0.8) + ' ' + (headY + headR * 0.7) + ', ' + cx + ' ' + (headY + headR * 0.7) +
        ' C ' + (cx + headR * 0.8) + ' ' + (headY + headR * 0.7) + ', ' + (cx + headR * 1.7) + ' ' + (headY + headR * 1.2) +
        ', ' + (cx + headR * 1.9) + ' ' + h + ' Z" fill="' + duo[0] + '"/></g>';

    return svg(w, h,
      '<defs><filter id="' + id + 'g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="' + (hash(seed) % 90) +
        '"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.08"/></feComponentTransfer></filter>' +
        '<linearGradient id="' + id + 'lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + duo[1] + '"/><stop offset="1" stop-color="' +
        shade(duo[1], -10) + '"/></linearGradient></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'lg)"/>' +
      sil +
      '<rect width="' + w + '" height="' + h + '" filter="url(#' + id + 'g)"/>' +
      '<text x="' + (w - 18) + '" y="' + (h - 18) + '" text-anchor="end" font-family="Fraunces, Georgia, serif" font-size="' +
        (w * 0.16) + '" fill="' + PAL.galleryWhite + '" opacity="0.92">' + initials + '</text>'
    );
  }

  /* ---------------------------------------------------------
     BOOK COVER — catalogue mockup
     --------------------------------------------------------- */
  function book(seed, opts) {
    opts = opts || {};
    var w = opts.w || 420, h = opts.h || 540;
    var r = rng(hash(seed + "·b"));
    var title = (opts.title || "Catalogue").toUpperCase();
    var artist = (opts.artist || "").toUpperCase();
    var coverBg = opts.dark ? PAL.graphite : PAL.cream;
    var fg = opts.dark ? PAL.galleryWhite : PAL.graphite;
    var spineW = Math.round(w * 0.06);
    var id = uid(seed + "bk");

    // inset artwork plate on the cover
    var plateX = w * 0.16, plateY = h * 0.32, plateW = w * 0.68, plateH = h * 0.42;
    var inner = artworkInner(rng(hash(seed)), plateW, plateH);

    return svg(w + spineW, h,
      '<defs><filter id="' + id + 's"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="rgba(20,17,14,0.3)"/></filter></defs>' +
      // spine
      '<rect x="0" y="2" width="' + spineW + '" height="' + (h - 4) + '" fill="' + shade(coverBg, -14) + '"/>' +
      // cover
      '<g filter="url(#' + id + 's)"><rect x="' + spineW + '" y="0" width="' + w + '" height="' + h + '" fill="' + coverBg + '"/></g>' +
      '<g transform="translate(' + spineW + ',0)">' +
        '<text x="' + (w / 2) + '" y="' + (h * 0.16) + '" text-anchor="middle" font-family="Inter, sans-serif" font-size="' +
          (w * 0.035) + '" letter-spacing="3" fill="' + (opts.dark ? "rgba(255,255,255,.7)" : PAL.muted || "#8a8175") + '">PRESLEY FINE ARTS</text>' +
        '<text x="' + (w / 2) + '" y="' + (h * 0.25) + '" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="' +
          (w * 0.07) + '" fill="' + fg + '">' + esc(artist) + '</text>' +
        '<g transform="translate(' + plateX + ',' + plateY + ')">' + inner + '</g>' +
        '<text x="' + (w / 2) + '" y="' + (h * 0.86) + '" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="' +
          (w * 0.052) + '" fill="' + fg + '">' + esc(opts.titleShort || title) + '</text>' +
      '</g>'
    );
  }

  function artworkInner(r, w, h) {
    var pal = ART_PALETTES[Math.floor(r() * ART_PALETTES.length)];
    var s = '<rect width="' + w + '" height="' + h + '" fill="' + pal[0] + '"/>';
    for (var i = 0; i < 5; i++) {
      s += '<rect x="' + (rnd(r, -0.1, 0.6) * w).toFixed(0) + '" y="' + (rnd(r, -0.1, 0.6) * h).toFixed(0) +
        '" width="' + (rnd(r, 0.4, 0.9) * w).toFixed(0) + '" height="' + (rnd(r, 0.3, 0.7) * h).toFixed(0) +
        '" fill="' + pal[1 + Math.floor(r() * (pal.length - 1))] + '" opacity="' + rnd(r, 0.35, 0.7).toFixed(2) + '"/>';
    }
    s += '<rect x="0.5" y="0.5" width="' + (w - 1) + '" height="' + (h - 1) + '" fill="none" stroke="rgba(20,17,14,0.18)"/>';
    return s;
  }

  /* ---------------------------------------------------------
     GALLERY SCENE — atmospheric hero (gallery wall)
     --------------------------------------------------------- */
  function gallery(seed, opts) {
    opts = opts || {};
    var w = opts.w || 1600, h = opts.h || 900;
    var r = rng(hash(seed + "·hall"));
    var id = uid(seed + "hall");
    var floorY = h * 0.78;

    // big artworks on the wall
    function plate(x, y, pw, ph) {
      return '<g transform="translate(' + x + ',' + y + ')">' +
        '<rect x="-10" y="-10" width="' + (pw + 20) + '" height="' + (ph + 20) + '" fill="' + PAL.warmPaper + '"/>' +
        artworkInner(rng(hash(seed + x + y)), pw, ph) +
        '</g>';
    }

    return svg(w, h,
      '<defs>' +
      '<linearGradient id="' + id + 'wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e2d4"/><stop offset="1" stop-color="#d9cfbe"/></linearGradient>' +
      '<linearGradient id="' + id + 'floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfc6b6"/><stop offset="1" stop-color="#b7ac98"/></linearGradient>' +
      '<filter id="' + id + 'g"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="11"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer></filter>' +
      '</defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'wall)"/>' +
      // window light on left
      '<rect x="0" y="0" width="' + (w * 0.28) + '" height="' + floorY + '" fill="#f2ecdd" opacity="0.6"/>' +
      '<line x1="' + (w * 0.14) + '" y1="0" x2="' + (w * 0.14) + '" y2="' + floorY + '" stroke="#b9af9c" stroke-width="3"/>' +
      '<line x1="0" y1="' + (floorY * 0.45) + '" x2="' + (w * 0.28) + '" y2="' + (floorY * 0.45) + '" stroke="#b9af9c" stroke-width="3"/>' +
      // floor
      '<rect x="0" y="' + floorY + '" width="' + w + '" height="' + (h - floorY) + '" fill="url(#' + id + 'floor)"/>' +
      // artworks
      plate(w * 0.40, h * 0.20, w * 0.16, h * 0.40) +
      plate(w * 0.66, h * 0.16, w * 0.24, h * 0.50) +
      // a sculpture plinth center
      '<rect x="' + (w * 0.30) + '" y="' + (floorY - h * 0.16) + '" width="' + (w * 0.06) + '" height="' + (h * 0.16) + '" fill="#e7e0d2"/>' +
      '<g transform="translate(' + (w * 0.30) + ',' + (floorY - h * 0.34) + ')">' + sculpture(rng(hash(seed + "s")), w * 0.06, h * 0.18) + '</g>' +
      // grain
      '<rect width="' + w + '" height="' + h + '" filter="url(#' + id + 'g)"/>'
    );
  }

  function sculpture(r, w, h) {
    var s = '';
    var blocks = 5;
    var y = h;
    for (var i = 0; i < blocks; i++) {
      var bw = w * rnd(r, 0.7, 1.3);
      var bh = h / blocks * rnd(r, 0.7, 1.1);
      var x = (w - bw) / 2 + rnd(r, -0.2, 0.2) * w;
      y -= bh;
      s += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="' + bw.toFixed(0) + '" height="' + bh.toFixed(0) +
        '" fill="' + shade("#b3a589", i % 2 ? -8 : 6) + '" transform="rotate(' + rnd(r, -6, 6).toFixed(1) + ' ' + (x + bw / 2) + ' ' + (y + bh / 2) + ')"/>';
    }
    return s;
  }

  /* ---------------------------------------------------------
     BUILDING facade tile
     --------------------------------------------------------- */
  function building(seed, opts) {
    opts = opts || {};
    var w = opts.w || 400, h = opts.h || 300;
    var id = uid(seed + "bld");
    var rows = 3, cols = 4, s = '';
    var mx = w * 0.1, my = h * 0.16;
    var gw = (w - mx * 2) / cols, gh = (h - my * 2) / rows;
    for (var rI = 0; rI < rows; rI++) {
      for (var c = 0; c < cols; c++) {
        s += '<rect x="' + (mx + c * gw + 6).toFixed(0) + '" y="' + (my + rI * gh + 6).toFixed(0) +
          '" width="' + (gw - 12).toFixed(0) + '" height="' + (gh - 12).toFixed(0) + '" fill="#2f2a24" opacity="0.78"/>';
      }
    }
    return svg(w, h,
      '<defs><filter id="' + id + 'g"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="5"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.06"/></feComponentTransfer></filter></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="#6f6557"/>' +
      '<rect x="0" y="0" width="' + w + '" height="' + (h * 0.14) + '" fill="' + PAL.graphite + '"/>' +
      '<text x="' + (w / 2) + '" y="' + (h * 0.1) + '" text-anchor="middle" font-family="Fraunces, serif" font-size="' + (w * 0.05) +
        '" fill="' + PAL.galleryWhite + '" letter-spacing="2">THE GRAND BEDFORD</text>' +
      s +
      '<rect width="' + w + '" height="' + h + '" filter="url(#' + id + 'g)"/>'
    );
  }

  /* ---------------------------------------------------------
     BRUSHSTROKE tile
     --------------------------------------------------------- */
  function brush(seed, opts) {
    opts = opts || {};
    var w = opts.w || 300, h = opts.h || 300;
    var r = rng(hash(seed + "·brush"));
    var d = 'M ' + (w * 0.3) + ' ' + (h * 0.1);
    for (var i = 0; i < 6; i++) {
      d += ' C ' + (rnd(r, 0.1, 0.9) * w).toFixed(0) + ' ' + (rnd(r, 0.1, 0.9) * h).toFixed(0) + ', ' +
        (rnd(r, 0.1, 0.9) * w).toFixed(0) + ' ' + (rnd(r, 0.1, 0.9) * h).toFixed(0) + ', ' +
        (rnd(r, 0.3, 0.7) * w).toFixed(0) + ' ' + (rnd(r, 0.2, 0.95) * h).toFixed(0);
    }
    return svg(w, h,
      '<rect width="' + w + '" height="' + h + '" fill="' + PAL.galleryWhite + '"/>' +
      '<path d="' + d + '" fill="none" stroke="' + PAL.ink + '" stroke-width="' + (w * 0.09) +
        '" stroke-linecap="round" opacity="0.92"/>'
    );
  }

  /* ---------------------------------------------------------
     MAP — stylized Williamsburg block
     --------------------------------------------------------- */
  function map(opts) {
    opts = opts || {};
    var w = opts.w || 520, h = opts.h || 420;
    return svg(w, h,
      '<rect width="' + w + '" height="' + h + '" fill="' + PAL.cream + '"/>' +
      // blocks
      gridBlocks(w, h) +
      // diagonal Bedford Ave
      '<line x1="' + (w * 0.05) + '" y1="' + (h * 0.7) + '" x2="' + (w * 0.95) + '" y2="' + (h * 0.32) +
        '" stroke="#cfc6b6" stroke-width="16"/>' +
      '<text transform="translate(' + (w * 0.58) + ',' + (h * 0.46) + ') rotate(-21)" font-family="Inter, sans-serif" font-size="13" letter-spacing="2" fill="#8a8175">BEDFORD AVE</text>' +
      // cross streets
      streetLabel(w * 0.32, h, "N 8TH ST") +
      streetLabel(w * 0.68, h, "N 7TH ST") +
      // marker
      '<rect x="' + (w * 0.46) + '" y="' + (h * 0.46) + '" width="34" height="34" fill="' + PAL.terracotta + '"/>' +
      '<text x="' + (w * 0.46 + 17) + '" y="' + (h * 0.46 + 23) + '" text-anchor="middle" font-family="Fraunces, serif" font-size="15" fill="#fff">P</text>'
    );
  }
  function gridBlocks(w, h) {
    var s = '', i;
    for (i = 1; i < 4; i++) {
      s += '<line x1="' + (w * i / 4) + '" y1="0" x2="' + (w * i / 4) + '" y2="' + h + '" stroke="#e4ddd1" stroke-width="10"/>';
    }
    for (i = 1; i < 3; i++) {
      s += '<line x1="0" y1="' + (h * i / 3) + '" x2="' + w + '" y2="' + (h * i / 3) + '" stroke="#e4ddd1" stroke-width="10"/>';
    }
    return s;
  }
  function streetLabel(x, h, label) {
    return '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + h + '" stroke="#ded6c8" stroke-width="9"/>' +
      '<text transform="translate(' + (x + 6) + ',' + (h * 0.9) + ') rotate(-90)" font-family="Inter, sans-serif" font-size="11" letter-spacing="2" fill="#9a9081">' + label + '</text>';
  }

  /* ---------------------------------------------------------
     helpers
     --------------------------------------------------------- */
  function svg(w, h, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h +
      '" width="' + w + '" height="' + h + '" preserveAspectRatio="xMidYMid slice" role="img">' + body + '</svg>';
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function shade(hex, pct) {
    var c = hex.replace("#", "");
    var n = parseInt(c, 16);
    var rr = (n >> 16) & 255, gg = (n >> 8) & 255, bb = n & 255;
    rr = clamp(rr + pct); gg = clamp(gg + pct); bb = clamp(bb + pct);
    return "#" + ((1 << 24) + (rr << 16) + (gg << 8) + bb).toString(16).slice(1);
  }
  function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

  global.PFAArt = {
    artwork: artwork,
    portrait: portrait,
    book: book,
    gallery: gallery,
    building: building,
    brush: brush,
    map: map,
    palette: PAL,
  };
})(window);
