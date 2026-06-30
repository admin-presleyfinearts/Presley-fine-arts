# Presley Fine Arts

Website for **Presley Fine Arts**, a contemporary art gallery at The Grand Bedford, 165 Bedford Ave, Brooklyn. Built to match the brand guide and homepage design — warm editorial palette, GT Super–style serif (Fraunces) paired with Inter, and a terracotta accent.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage (matches the design mock) |
| `artists.html` | Artists listing grid |
| `artist.html?artist=<slug>` | Individual artist page — bio, selected works, and their **associated catalogue** at the bottom |
| `catalogue.html` | All publications / artist books |
| `contact.html` | Contact details, map, and contact form |

## Structure

```
css/styles.css   Brand design system (tokens, type, layout, responsive)
js/data.js       Content: artists, exhibitions, catalogue (single source of truth)
js/art.js        Deterministic SVG generator for on-brand placeholder visuals
js/main.js       Nav, art hydration, page rendering, forms, reveal-on-scroll
assets/          Brand + homepage reference images
```

## How it works

- **No build step.** Plain HTML/CSS/JS — open `index.html` or serve the folder.
- **Visuals are generative SVG** (artworks, portraits, book covers, gallery hero, map), seeded deterministically so they stay consistent. To use real photography, drop images into `assets/` and replace the matching `data-art` placeholders (or the `seed`/work entries in `js/data.js`).
- **Add an artist:** add an entry to `ARTISTS` in `js/data.js` and a matching catalogue in `CATALOGUES`. The artists grid, artist page, featured-artists block, and catalogue page update automatically. Each artist links to its catalogue via the `catalogue` id.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Brand reference

- **Palette:** Gallery White, Warm Paper, Cream, Stone, Graphite, Ink, Terracotta accent, Slate Blue
- **Type:** Fraunces (display serif), Inter (body), Caveat (handwritten notes)
- **Voice:** "A space for contemporary art, conversation, and connection. Rooted in Brooklyn. Open to the world."
