# KBOX5

A static hangar leasing website with locally stored images, a vector logo, an email contact pop-up, and an interactive hangar planner.

## Open the site

Double-click **dist/index.html** to open the complete site in your browser. No Node.js, installation, build step, or local server is needed. Keep the entire `dist` folder together so scripts, styles, and images remain available.

The site also works on any ordinary static web host: upload the contents of `dist`.

Google Fonts load when online, with system-font fallbacks when offline. The planner, local photos, and contact pop-up work offline; external maps and source links require internet access. Email links open your configured email application.

## Files

- `dist/index.html`: page content
- `dist/style.css`: responsive styles
- `dist/app.js`: navigation and email pop-up source
- `dist/planner-geometry.js`: aircraft dimensions and overlap calculations
- `dist/planner.js`: interactive planner source
- `dist/assets/`: local images and vector logo

## Hangar planner

The planner uses a 65 × 60 ft coordinate system. Aircraft library: King Air C90B, King Air 200 (B200 dimensions), Citation Bravo, Phenom 300, TBM 850, Pilatus PC-12 (NG dimensions), Cirrus Vision Jet, Cessna 185F tailwheel, and P-51D Mustang. Dimensions and sources appear below the planner.

Add via drag or click; move via pointer or arrow keys; rotate using the round handle, slider, 15° buttons, or R. Multiple aircraft are supported, up to 12. Layout is session-only and resets on reload.

Each aircraft has an individual top-view silhouette, with distinct wing and tail geometry, engine placement, cockpit glazing, and propellers. Collision detection uses triangulated versions of the same outlines. Silhouettes are illustrative rather than engineering drawings.

The planner is illustrative, excludes door/height/interior/maneuvering clearances, and does not certify real-world fit.

## Optional developer checks

Developers with Node.js can run `node --test planner.test.mjs` to check the geometry. Node is only needed for these optional automated checks, never for using the site.

The three JavaScript source files are embedded in `dist/index.html` so the aircraft picker does not rely on loading adjacent scripts through `file://`. After editing a JavaScript source file, run `python3 scripts/embed-scripts.py` to refresh the inline copy. Visitors do not need Python or Node.
