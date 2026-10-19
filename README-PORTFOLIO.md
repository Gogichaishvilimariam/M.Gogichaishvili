# Mariam Gogichaishvili — portfolio

A static portfolio hosted for free by GitHub Pages. Source: main. Publishing directory: /docs.

https://gogichaishvilimariam.github.io/M.Gogichaishvili/

## Design and editing

- Shared styles and design tokens: docs/site.css.
- Shared interactions: docs/site.js.
- Project copy and image lists: content/portfolio.json.
- Page generator: scripts/build_portfolio.py (Python standard library only).
- Regenerate HTML after copy changes: python scripts/build_portfolio.py.
- Images, fonts and video: docs/assets.

Keep generated HTML committed: Pages serves it directly without a build service.

The original Bebas Neue / Inter type pairing and neutral palette are retained. Every page uses the same heading scale, spacing, navigation, image viewer and contact area. Essential mobile text is at least 14px, body text is 16px; page titles are 32px and the hero title is 36px. Motion respects the reduced-motion setting and never blocks content without JavaScript.

## Content

All original project images are retained. The extra category-preview collection was removed at the owner’s request; the About portrait was replaced with the owner’s supplied photo. Software logos are stored locally under docs/assets/tool-logos. Duplicate placeholder descriptions have been removed. No new business results or experience figures have been invented. Testimonials are retained from the original portfolio. The old empty /vodka route leads to the Gurian Vodka project.

## Asset recovery

The Import portfolio content workflow restores missing images, fonts and video using migration/assets.json. Existing assets and page edits are preserved. It no longer overwrites HTML. The original migration archive is retained only as a historical backup.

## Verification

Checks cover internal routes and fragment links, local images/fonts, heading structure, image dimensions, preservation of original images, JavaScript syntax, shared CSS asset references and gallery behavior. Browser visual QA was unavailable in this environment. Review desktop/mobile layouts on the published site before relying on exact visual parity.
