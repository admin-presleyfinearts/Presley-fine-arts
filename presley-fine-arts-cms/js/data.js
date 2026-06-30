/* ============================================================
   Presley Fine Arts — Content data
   Artists, exhibitions, and catalogue publications.
   Each artist references their associated catalogue by id.
   ============================================================ */
(function (global) {
  "use strict";

  var CATALOGUES = [
    {
      id: "afterlight",
      title: "Afterlight",
      artist: "Maria Lorenzo",
      year: 2024,
      essay: "Thomas McEvilley",
      pages: 96,
      cover: "linen",
      dimensions: "9 × 11 in",
      edition: "Edition of 800",
      price: "$45",
      seed: "cat-afterlight",
      dark: false,
      description:
        "Published on the occasion of Maria Lorenzo's exhibition Afterlight, this monograph gathers a new body of paintings alongside an essay on memory, surface, and the slow work of transformation.",
    },
    {
      id: "new-works-hayes",
      title: "New Works",
      artist: "Jason Hayes",
      year: 2024,
      essay: "Dana Whitman",
      pages: 72,
      cover: "stone",
      dimensions: "8.5 × 10.5 in",
      edition: "Edition of 600",
      price: "$40",
      seed: "cat-hayes",
      dark: true,
      description:
        "Sculpture and works on paper from Jason Hayes, documenting an ongoing inquiry into the poetics of everyday materials and the architecture of the studio.",
    },
    {
      id: "interludes-fenley",
      title: "Interludes",
      artist: "Eliza Fenley",
      year: 2023,
      essay: "Robin Kessler",
      pages: 64,
      cover: "cream",
      dimensions: "8 × 10 in",
      edition: "Edition of 500",
      price: "$38",
      seed: "cat-fenley",
      dark: false,
      description:
        "A focused survey of Eliza Fenley's mixed-media practice — paper, pigment, and thread — produced for her first solo presentation with the gallery.",
    },
    {
      id: "ground-cole",
      title: "Ground",
      artist: "Adrian Cole",
      year: 2023,
      essay: "Marcus Reidel",
      pages: 80,
      cover: "stone",
      dimensions: "9 × 11 in",
      edition: "Edition of 550",
      price: "$42",
      seed: "cat-cole",
      dark: true,
      description:
        "Adrian Cole's earth-toned abstractions are collected here for the first time, with installation views from the gallery's south room and a conversation with the artist.",
    },
    {
      id: "tideline-okafor",
      title: "Tideline",
      artist: "Nadia Okafor",
      year: 2022,
      essay: "Priya Nair",
      pages: 88,
      cover: "linen",
      dimensions: "8.5 × 11 in",
      edition: "Edition of 700",
      price: "$44",
      seed: "cat-okafor",
      dark: false,
      description:
        "Painting and textile works by Nadia Okafor, tracing the meeting points of water, weave, and light across two years of studio practice in Brooklyn.",
    },
    {
      id: "quiet-room-bauer",
      title: "Quiet Room",
      artist: "Felix Bauer",
      year: 2022,
      essay: "Lena Hofmann",
      pages: 60,
      cover: "cream",
      dimensions: "8 × 10 in",
      edition: "Edition of 450",
      price: "$36",
      seed: "cat-bauer",
      dark: false,
      description:
        "Felix Bauer's spare interiors and still lifes, gathered into an intimate volume that lingers on stillness, shadow, and the ordinary object.",
    },
  ];

  var ARTISTS = [
    {
      slug: "maria-lorenzo",
      name: "Maria Lorenzo",
      born: "b. 1979, Mexico City",
      based: "Brooklyn, NY",
      discipline: "Painting",
      featured: true,
      portraitSeed: "p-maria",
      catalogue: "afterlight",
      currentShow: { title: "Afterlight", dates: "May 24 — July 13, 2024", status: "Now on view" },
      bio: [
        "Maria Lorenzo makes paintings that behave like weather — accumulating, eroding, and settling into surfaces that seem to hold time. Working in thin layers of oil and cold wax, she builds and scrapes back fields of color until a quiet image emerges from the residue.",
        "Her recent body of work, Afterlight, considers memory and place: the way a room remembers light long after the sun has moved. Lorenzo has exhibited across the United States and Mexico, and her work is held in private and institutional collections internationally.",
      ],
      works: [
        { title: "Afterlight I", year: 2024, medium: "Oil and cold wax on linen", dim: "60 × 48 in", seed: "w-maria-1" },
        { title: "Threshold", year: 2024, medium: "Oil on linen", dim: "48 × 40 in", seed: "w-maria-2" },
        { title: "Slow Room", year: 2023, medium: "Oil and cold wax on panel", dim: "36 × 36 in", seed: "w-maria-3" },
        { title: "Evening Index", year: 2023, medium: "Oil on linen", dim: "54 × 44 in", seed: "w-maria-4" },
        { title: "Residue (Blue)", year: 2024, medium: "Oil and pigment on panel", dim: "30 × 24 in", seed: "w-maria-5" },
        { title: "Afterlight VII", year: 2024, medium: "Oil and cold wax on linen", dim: "72 × 60 in", seed: "w-maria-6" },
      ],
    },
    {
      slug: "jason-hayes",
      name: "Jason Hayes",
      born: "b. 1982, Brooklyn",
      based: "Brooklyn, NY",
      discipline: "Sculpture & Painting",
      featured: true,
      portraitSeed: "p-jason",
      catalogue: "new-works-hayes",
      currentShow: { title: "New Works", dates: "Opens July 20, 2024", status: "Upcoming" },
      bio: [
        "Jason Hayes works in painting, drawing, and sculpture, exploring memory, architecture, and the poetics of everyday materials. His assemblages gather salvaged wood, plaster, and steel into upright, figure-like forms that feel both monumental and provisional.",
        "Recent solo exhibitions include MoMA PS1 (New York), the Contemporary Arts Center, Cincinnati, and The Power Plant, Toronto. Hayes lives and works in Brooklyn.",
      ],
      works: [
        { title: "Standard (Upright)", year: 2024, medium: "Salvaged wood, plaster, steel", dim: "84 × 22 × 18 in", seed: "w-jason-1" },
        { title: "Field Note", year: 2024, medium: "Oil and graphite on panel", dim: "40 × 30 in", seed: "w-jason-2" },
        { title: "Carrier", year: 2023, medium: "Steel and pigment", dim: "66 × 20 × 16 in", seed: "w-jason-3" },
        { title: "Untitled (Lean)", year: 2024, medium: "Plaster and wax", dim: "52 × 14 × 12 in", seed: "w-jason-4" },
        { title: "Studio Wall", year: 2023, medium: "Mixed media on canvas", dim: "48 × 60 in", seed: "w-jason-5" },
        { title: "Marker", year: 2024, medium: "Bronze, edition of 3", dim: "30 × 9 × 9 in", seed: "w-jason-6" },
      ],
    },
    {
      slug: "eliza-fenley",
      name: "Eliza Fenley",
      born: "b. 1988, Portland, OR",
      based: "Brooklyn, NY",
      discipline: "Mixed Media",
      featured: true,
      portraitSeed: "p-eliza",
      catalogue: "interludes-fenley",
      currentShow: null,
      bio: [
        "Eliza Fenley assembles paper, pigment, and thread into quiet, layered compositions. Drawing on collage, drawing, and textile traditions, she treats the page as a site of accumulation — stitched, torn, and re-joined.",
        "Her work has been shown in group exhibitions throughout the Northeast and is included in the gallery's program of artists working across painting, sculpture, and mixed media.",
      ],
      works: [
        { title: "Interlude (One)", year: 2023, medium: "Paper, pigment, thread", dim: "30 × 22 in", seed: "w-eliza-1" },
        { title: "Mending", year: 2023, medium: "Collage and stitch on paper", dim: "24 × 18 in", seed: "w-eliza-2" },
        { title: "Soft Index", year: 2022, medium: "Mixed media on paper", dim: "20 × 16 in", seed: "w-eliza-3" },
        { title: "Folded Light", year: 2023, medium: "Paper and pigment", dim: "28 × 20 in", seed: "w-eliza-4" },
        { title: "Quiet Seam", year: 2023, medium: "Thread on dyed paper", dim: "22 × 17 in", seed: "w-eliza-5" },
        { title: "Interlude (Six)", year: 2024, medium: "Paper, pigment, thread", dim: "32 × 24 in", seed: "w-eliza-6" },
      ],
    },
    {
      slug: "adrian-cole",
      name: "Adrian Cole",
      born: "b. 1975, Detroit",
      based: "Brooklyn, NY",
      discipline: "Painting",
      featured: false,
      portraitSeed: "p-adrian",
      catalogue: "ground-cole",
      currentShow: null,
      bio: [
        "Adrian Cole paints in earth tones drawn from the ground itself — clay, iron, ash. His large abstractions are built from horizontal sweeps that read as landscape and as pure material at once.",
        "Cole has exhibited widely in the United States and Europe. Ground, his most recent body of work, was presented in the gallery's south room.",
      ],
      works: [
        { title: "Ground I", year: 2023, medium: "Earth pigment on canvas", dim: "60 × 72 in", seed: "w-adrian-1" },
        { title: "Iron Field", year: 2023, medium: "Mixed media on canvas", dim: "48 × 60 in", seed: "w-adrian-2" },
        { title: "Ash Line", year: 2022, medium: "Pigment and wax on panel", dim: "40 × 40 in", seed: "w-adrian-3" },
        { title: "Clay Study", year: 2023, medium: "Earth pigment on paper", dim: "30 × 22 in", seed: "w-adrian-4" },
        { title: "Ground VI", year: 2023, medium: "Earth pigment on canvas", dim: "66 × 78 in", seed: "w-adrian-5" },
        { title: "Sediment", year: 2022, medium: "Mixed media on panel", dim: "36 × 48 in", seed: "w-adrian-6" },
      ],
    },
    {
      slug: "nadia-okafor",
      name: "Nadia Okafor",
      born: "b. 1990, Lagos",
      based: "Brooklyn, NY",
      discipline: "Painting & Textile",
      featured: false,
      portraitSeed: "p-nadia",
      catalogue: "tideline-okafor",
      currentShow: null,
      bio: [
        "Nadia Okafor weaves painting and textile into hybrid works where pigment meets thread. Her Tideline series follows the meeting of water and shore as both subject and method — washes that pool, recede, and leave their mark.",
        "Okafor's work has been exhibited internationally and is represented in several public collections. She lives and works in Brooklyn.",
      ],
      works: [
        { title: "Tideline I", year: 2022, medium: "Acrylic and woven cotton", dim: "54 × 48 in", seed: "w-nadia-1" },
        { title: "Low Water", year: 2022, medium: "Pigment on linen", dim: "44 × 40 in", seed: "w-nadia-2" },
        { title: "Weave (Salt)", year: 2021, medium: "Cotton, dye, pigment", dim: "36 × 30 in", seed: "w-nadia-3" },
        { title: "Shore Index", year: 2022, medium: "Mixed media on canvas", dim: "48 × 60 in", seed: "w-nadia-4" },
        { title: "Tideline IX", year: 2022, medium: "Acrylic and woven cotton", dim: "60 × 52 in", seed: "w-nadia-5" },
        { title: "Estuary", year: 2021, medium: "Dye and thread on linen", dim: "40 × 34 in", seed: "w-nadia-6" },
      ],
    },
    {
      slug: "felix-bauer",
      name: "Felix Bauer",
      born: "b. 1984, Leipzig",
      based: "Brooklyn, NY",
      discipline: "Painting",
      featured: false,
      portraitSeed: "p-felix",
      catalogue: "quiet-room-bauer",
      currentShow: null,
      bio: [
        "Felix Bauer paints spare interiors and still lifes that hold the viewer in a kind of held breath. A single chair, a window, a bowl of light — his subjects are ordinary, his attention is not.",
        "Bauer trained in Leipzig and now works in Brooklyn. Quiet Room, his recent series, was the subject of an intimate publication produced by the gallery.",
      ],
      works: [
        { title: "Quiet Room I", year: 2022, medium: "Oil on linen", dim: "40 × 32 in", seed: "w-felix-1" },
        { title: "Window, Afternoon", year: 2022, medium: "Oil on panel", dim: "30 × 24 in", seed: "w-felix-2" },
        { title: "Two Bowls", year: 2021, medium: "Oil on linen", dim: "24 × 30 in", seed: "w-felix-3" },
        { title: "Chair (Empty)", year: 2022, medium: "Oil on panel", dim: "36 × 28 in", seed: "w-felix-4" },
        { title: "Shadow Study", year: 2021, medium: "Oil on linen", dim: "20 × 16 in", seed: "w-felix-5" },
        { title: "Quiet Room VIII", year: 2022, medium: "Oil on linen", dim: "44 × 36 in", seed: "w-felix-6" },
      ],
    },
  ];

  function catalogueById(id) {
    for (var i = 0; i < CATALOGUES.length; i++) if (CATALOGUES[i].id === id) return CATALOGUES[i];
    return null;
  }
  function artistBySlug(slug) {
    for (var i = 0; i < ARTISTS.length; i++) if (ARTISTS[i].slug === slug) return ARTISTS[i];
    return null;
  }

  global.PFAData = {
    artists: ARTISTS,
    catalogues: CATALOGUES,
    catalogueById: catalogueById,
    artistBySlug: artistBySlug,
    gallery: {
      name: "Presley Fine Arts",
      venue: "The Grand Bedford",
      address: "165 Bedford Ave",
      city: "Brooklyn, NY 11211",
      hours: "Wednesday — Sunday, 11am — 6pm and by appointment",
      email: "info@presleyfinearts.com",
      phone: "+1 718 555 0110",
      instagram: "@presleyfinearts",
    },
  };
})(window);
