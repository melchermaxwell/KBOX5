# KBOX5

A static hangar leasing website with locally stored images, a vector logo, an email contact pop-up, and an interactive hangar planner.

## Open the site

Double-click **dist/index.html** to open the complete site in your browser. No Node.js, installation, build step, or local server is needed. Keep the entire `dist` folder together so scripts, styles, and images remain available.

The site also works on any ordinary static web host: upload the contents of `dist`.

Google Fonts load when online, with system-font fallbacks when offline. The planner, local photos, and contact pop-up work offline; external maps and source links require internet access. Email links open your configured email application.

## AWS Amplify Hosting

Connect this repository and branch to Amplify. The root `amplify.yml` publishes the contents of `dist` at the website root. No npm install, Node build, backend, or SPA rewrite is needed. The build command only checks that `dist/index.html` exists.

For console-managed build settings, use the same configuration as `amplify.yml`: artifact base directory `dist` and files `**/*`. Redeploy after changing settings. Uploading the repository root instead puts the homepage under `/dist/index.html` rather than `/`.

## Files

- `dist/index.html`: page content
- `dist/style.css`: responsive styles
- `dist/app.js`: navigation and email pop-up source
- `dist/planner-geometry.js`: aircraft dimensions and overlap calculations
- `dist/planner-share.js`: versioned URL layout encoding and validation
- `dist/planner.js`: interactive planner source
- `dist/assets/`: local images and vector logo

## Hangar planner

The planner uses a 65 × 60 ft coordinate system with a 63 ft door opening, illustrated centered on the apron side. The opening width is shown; entry paths and door height are not simulated. Aircraft library: King Air C90B, King Air 200 (B200 dimensions), Citation Bravo, Phenom 300, TBM 850, Pilatus PC-12 (NG dimensions), Cirrus Vision Jet, Cessna 185F tailwheel, Cessna 206 (T206H Turbo Stationair HD dimensions), and P-51D Mustang. Dimensions and sources appear below the planner.

Add via drag or click; move via pointer or arrow keys; rotate using the round handle, slider, 15° buttons, or R. Multiple aircraft are supported, up to 12. Use Share layout to copy a URL containing aircraft models, positions, and rotations. Opening that URL restores the layout and scrolls to the planner, including empty layouts. Ordinary visits start with the default aircraft. The dialog can also save a 1200 × 630 PNG preview. Share from the deployed Amplify URL for links that other people can open; file:// links only refer to your local copy. No API or database is needed. Per-layout Open Graph cards are not generated; attach the saved image to a message instead.

Each aircraft has an individual top-view silhouette, with distinct wing and tail geometry, engine placement, cockpit glazing, and propellers. Collision detection uses triangulated versions of the same outlines. Silhouettes are illustrative rather than engineering drawings.

The planner is illustrative, excludes door/height/interior/maneuvering clearances, and does not certify real-world fit.

## Optional developer checks

Developers with Node.js can run `node --test planner.test.mjs planner-share.test.mjs aircraft-3d.test.mjs` to check the geometry. Node is only needed for these optional automated checks, never for using the site.

The six JavaScript source files are embedded in `dist/index.html` so the aircraft picker does not rely on loading adjacent scripts through `file://`. After editing a JavaScript source file, run `python3 scripts/embed-scripts.py` to refresh the inline copy. Visitors do not need Python or Node.

## Experimental 3D door view

Select 3D Door View to move the camera to the apron. Click the door or use its button to animate the two folding leaves. Return to Top View to edit the same aircraft arrangement. This offline canvas renderer uses the existing footprint geometry with illustrative aircraft volumes, a 9 ft restroom and an assumed 18 ft door/20 ft wall height. These heights are not specifications or clearance checks. No external 3D library or server is required. Scene source: `dist/planner-3d.js`; model meshes: `dist/aircraft-3d.js`. Aircraft now have individually estimated side profiles, tail types, propellers, engine intakes, glazing and round landing gear. See [reference notes](docs/aircraft-3d-references.md) for sources and per-model limitations.
