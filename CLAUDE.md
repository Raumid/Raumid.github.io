# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`Raumid.github.io` is a GitHub Pages **user site** that hosts several unrelated static sites, one per top-level directory. There is no root `index.html`, no `package.json`, no build step, no bundler, no linter, and no tests — every directory is plain HTML/CSS/JS served as-is.

Each directory deploys to `https://raumid.github.io/<dir>/` on push to `main`. Directories are fully independent: no shared CSS, JS, or assets. A change in one never affects another, and there is no place to put "common" code.

## Running things locally

Open the target `index.html` with the VS Code **Live Server** extension (`.vscode/settings.json` pins port 5501), or any static file server. Relative asset paths (`./assets/...`) assume the site's own directory is the server root or that you browse into it.

`basslim/` is the exception — it needs PHP for the contact form (see below), so use `php -S localhost:8000` from inside `basslim/` when testing that flow.

Deploy = `git commit` + `git push` to `main`. Nothing else. (Except `basslim/`, below.)

## The sites

| Dir | What it is | Notable |
|---|---|---|
| `basslim/` | Landing page for Basslim, an industrial-solutions company | Only site with server-side code; deploys to a separate PHP host, not GitHub Pages |
| `CV/` | Résumé page with client-side PDF export | Content is hardcoded in `index.html` |
| `portafolio/` | Current personal portfolio (Spanish); this is the one linked from the CV | |
| `portfolio/` | Older English portfolio, superseded by `portafolio/` | Don't add features here |
| `invitacionBoda/` | Wedding invitation with RSVP; talks to an external API | jQuery-era code, vendored plugins |
| `interview/` | Small chat-widget UI demo | Static markup, no real chat |
| `menu_isometric/` | Isometric CSS menu experiment | ~100 lines total |

## Cross-cutting conventions

- **UI copy, commit messages, and most comments are in Spanish.** Match that when editing existing sites.
- **All third-party libraries come from CDNs** (`cdnjs`, `jsdelivr`, `unpkg`) via `<script>`/`<link>` tags — there is no npm install. The exception is `invitacionBoda/assets/js/`, which vendors jQuery 1.11 and its plugins as files.
- **ScrollReveal animation convention** (used by `portafolio/`, `invitacionBoda/`, and `basslim/`): markup carries semantic classes — `.rv-title`, `.rv-subtitle`, `.rv-box-left`, `.rv-box-right`, `.rv-box-top` — and a script registers `ScrollReveal().reveal()` for each. To animate a new element, add the class; don't write a new reveal call. See [portafolio/assets/js/reveal.js](portafolio/assets/js/reveal.js) and [invitacionBoda/assets/js/carta.js](invitacionBoda/assets/js/carta.js) (which defers reveal setup until the envelope is clicked).

## basslim — the one with a backend

`basslim/` is served from the client's own Apache/PHP host (`serviciosbasslim.com.mx`), **not** from GitHub Pages — GitHub Pages will not execute [basslim/send_mail.php](basslim/send_mail.php), so the contact form is dead on the `raumid.github.io/basslim/` copy. Changes here must be uploaded to that host to take effect.

Contact form flow: [basslim/js/main.js](basslim/js/main.js) intercepts submit, POSTs a `FormData` to `send_mail.php` via `fetch`, then **detects success by substring-matching the HTML response text** for "mensaje enviado"/"correctamente" before showing a SweetAlert. Changing the PHP success message string breaks the frontend success path — the two files must be edited together.

[basslim/.htaccess](basslim/.htaccess) denies GET on `send_mail.php` (POST only) and sets security headers; it only takes effect on the Apache host.

Other basslim notes:
- Scroll animations here do **not** use ScrollReveal for the main effects — [basslim/js/scroll-animations.js](basslim/js/scroll-animations.js) is a hand-rolled `IntersectionObserver` that adds `.visible` to `.animate-on-scroll`, `.animate-left`, `.animate-right`, `.section-reveal`. (A small ScrollReveal block for the contact form also exists inline in `index.html`.)
- CSS is split by concern across `styles.css` (base + `:root` color variables), `animations.css`, `carousel.css`, `gloves.css` — all four are linked; pick the right one rather than appending to `styles.css`.
- The Google Maps script tag in `index.html` still carries a literal `YOUR_API_KEY` placeholder.
- [basslim/README.md](basslim/README.md) documents the color variables and animation classes.

## CV — hardcoded content, not data-driven

[CV/index.html](CV/index.html) contains the résumé content as static markup. **[CV/assets/js/data.js](CV/assets/js/data.js) is not loaded by the page** — it's a leftover from an earlier data-driven version (it has `age()` / `experience()` helpers that compute from a DOB and a start date). Edits to the CV go in the HTML; editing `data.js` has no effect. Delete or wire it up rather than leaving both in sync by hand.

[CV/assets/js/index.js](CV/assets/js/index.js) implements the download button: `html2canvas` rasterizes `#contenido` at a forced 2000×4000 window size, then jsPDF embeds that PNG into one page. Layout changes to the CV can silently break the PDF's proportions — check the exported file after touching `#contenido`'s size or structure.

## invitacionBoda — external API

RSVP logic lives in [invitacionBoda/assets/js/http.js](invitacionBoda/assets/js/http.js). It reads a `?token=` query param, `GET`s `/getOne-by-token` and `PUT`s `/put-status` against `https://rauneth.com/backend/api/guests` (a backend in a different repo), with the token as a bearer header. `URLDEV` (`http://localhost:3500/api/guests`) is defined alongside `URLPROD` but unused — swap it in manually to test locally.

Guest-count options are generated from `c_totalguest`; `c_statusguest !== 1` means already confirmed and hides the form. Without a `?token=`, the page renders but the RSVP section does nothing.

This site is jQuery 1.11 + `$(window).load()` + `noConflict()`, with inline `<script>` blocks at the bottom of `index.html` doing the arctext/owl-carousel/dropdown wiring. Keep new code in the same style rather than mixing in modern module patterns.
