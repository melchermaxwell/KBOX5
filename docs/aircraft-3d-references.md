# Aircraft 3D reference notes

Research and refinement: September 27, 2026. These are original procedural illustrations, not imported or traced licensed 3D models. Reference PDFs/images are not redistributed with the site. Existing planform dimensions and 2D collision logic are unchanged. Heights, cross-sections, gear locations, glazing, and detailed profiles are visually estimated; they are not surveyed or engineering clearance envelopes.

| Aircraft | Reference consulted | Modeling changes |
| --- | --- | --- |
| King Air C90B | [FlightSafety C90A/B manual, three-view figure listed](https://www.scribd.com/doc/70691023/King-Air-C90-A-B), user's top-view drawing; [operator's C90B photos/specifications](https://www.aradian.com/beechcraft-king-air-c90b/) | Separate conventional/cruciform tail rather than B200 T-tail; wing nacelles, four-blade props, round cabin section. Exact side-profile outline remains approximate. |
| King Air B200 | [FlightSafety training manual](https://aviaco-va.es/WP/BE20_Technical_Manual.pdf), PDF page 25 / printed 1-17, Fig. 1-23 | Taller T-tail, outer wing dihedral, engine and main-gear spacing, longer cabin. |
| Citation Bravo | [FlightSafety Bravo training manual](https://www.scribd.com/document/419862255/Pilot-Training-Manual-Cessna-Citation-Bravo-pdf), Fig. 1-2 description and dimensions; user's top-view drawing | Rear-mounted turbofan pods and intakes, low wing, mid-fin horizontal tail, long fuselage. Full-resolution side drawing was not available; side loft remains approximate. |
| Phenom 300 | [Embraer 300E brochure](https://www.embraer.com/media/b4lchr5u/phenom-300e-electronic.pdf), PDF pages 8 and 22 | Manufacturer front/side/top views: T-tail, swept wing with winglets, high aft engines, cabin/nose profile. 300E reference used for the catalog's 300-family illustration. |
| TBM 850 | [Daher/Socata pilot handbook](https://www.flythetbm.com/pims/pim_850.pdf), PDF page 15 / printed 1.2.1 | Low wing with dihedral, conventional tail, long turbine cowling, four-blade propeller, elevated cabin crown. |
| PC-12 NG | [Pilatus NG fact sheet](https://airmen.ch/wp-content/uploads/2018/03/Pilatus-Aircraft-Ltd-PC-12NG-Factsheet.pdf), page 2 | Front and side drawings: T-tail, winglets, large body, long nose, wide main gear. Five-blade option depicted in this NG reference. |
| Cirrus Vision Jet | [Cirrus 2019 brochure](https://cirrusaircraft.com/wp-content/uploads/2019/01/vision-jet-brochure-2019.pdf), page 1 | Side/plan drawings and exterior view: rising V-tail surfaces (no central fin), dorsal engine/intake, rounded cabin and low wing. |
| Cessna 185 | [Cessna 180/185 service manual](https://www.mennen.org/airplanes/Logs46Q/C185service.pdf), PDF page 10 / printed 1-4, A185 side drawing | High strut-braced wing, tail-low parked stance, main wheels forward and small tailwheel, compact cabin. Earlier 185-series side reference; catalog still uses its existing 185F dimensions. |
| Cessna 206 | [Textron Stationair HD brochure](https://cessna.txtav.com/-/media/cessna/files/brochures/piston/turbo_stationair_hd.pdf), page 2; [manufacturer front image listing](https://media.txtav.com/assets/225579/) | Exterior side/oblique photo plus supplied plan: high wing and struts, upright cabin, tricycle gear and three-blade propeller. |
| P-51D Mustang | User-supplied three-view drawing; [USAF Museum reference](https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/196263/north-american-p-51d-mustang/) | Long inline-engine cowling, raised bubble canopy, belly radiator, four-blade prop, wing dihedral, main wheels and tailwheel. |

Some sources are primary manufacturer/training manuals hosted by third parties. The AEA deicing handbook was examined but its grouped King Air/Citation figures and coarse figures were not used as precise variant geometry.

Implementation: `dist/aircraft-3d.js` creates cached meshes with separate side stations for each model, shaded fuselage rings, thin wings/tails, nacelles, glazed surfaces, propellers and cylindrical wheels. `dist/planner-3d.js` transforms these meshes using the original layout positions and rotations. The renderer stays self-contained for offline `index.html` use.

### King Air 200 refinement — September 28
The user's supplied three-view diagram supersedes the earlier outline for this refinement. The planform now follows its center wing section, tapered outer panels, fuller cabin, swept horizontal tail, and nacelle spacing. The 3D mesh follows its swept T-tail, flatter inner wings, tapered nacelles, three-blade propellers, circular cabin-window treatment, and paired main wheels. Published overall span and length remain unchanged; interior heights and smaller details remain illustrative.

### King Air C90B refinement — September 28
The latest user-supplied image provides the new top-view wing, body, nacelle, and horizontal-tail landmarks, normalized to the C90B catalog wingspan and length. The user explicitly chose to retain the C90B's lower horizontal tail in 3D instead of the reference's high T-tail. The shared planform, tapered 3D nacelles, four-blade props, fuller cabin, round-window treatment, and paired main wheels were refined together. No tail-height or overall-dimension change was made.

### Phenom 300 refinement — September 28
The latest user-supplied top view sets the wing and horizontal-tail landmarks, rear nacelle spacing and size, swept winglet footprint, curved windshield band, entry-door outline, and cabin-window spacing. The revised planform feeds the 3D wings and tail; the 3D model also uses the narrower nacelles, explicit engine pylons, corresponding window stations, and swept winglets. Overall catalog dimensions remain unchanged.

### TBM 850 top-view refinement — September 28
The latest supplied reference sets the top-view landmarks for the broad straight wing, tapered tips, wider squared horizontal tail, long cowling, cabin, and rear fuselage. Split windshield glazing, side-window and door outlines, control-surface seams, dorsal-fin linework, and stationary propeller blades were redrawn. Catalog span and length are preserved. The shared wing/body/tail geometry also flows into the existing 3D mesh; no new height estimates were introduced.

### Pilatus PC-12 top-view refinement — September 28
The latest user reference supplies the straight tapered wing, wingtip profile, broad parallel cabin, long nose, tapering rear fuselage, and wider squared horizontal-tail landmarks. Cockpit panes, side windows, entry/cargo doors, roof details, and control-surface outlines are drawn separately from the collision geometry. Existing catalog span and length remain unchanged, and the shared planform is used by the 3D mesh as well.

### Cirrus SR22 addition — September 28
The user's three-view drawing supplies the low-wing planform, cabin glazing and doors, conventional tail, side-profile proportions, and fixed landing gear with wheel fairings. Scale uses Cirrus's [2026 SR22 specifications](https://cirrusaircraft.com/wp-content/uploads/2024/01/International_SR22_PriceList_2026.pdf): 38 ft 4 in wingspan and 26 ft length. The 3D illustration uses a three-blade propeller, low wing with dihedral, broad cabin windows, wheel fairings, and a conventional tail. Smaller details and component heights remain illustrative.

### King Air C90B 3D refinement — September 30
The user's [Sketchfab C90 reference by Paulo Henrique Almeida Delgado](https://sketchfab.com/3d-models/beechcraft-king-air-c90-ebc6f9decf4f4a62b767a4619b95d303) was viewed for shape and detail; its listing is non-downloadable and no model assets were imported. A dedicated original C90B mesh now uses a smoother radome/cabin/tailcone loft, curved wing and tail airfoils, tapered nacelles with intake fairings and exhausts, shaped four-blade props, round framed cabin windows, separate cockpit panes, door seams, and rounded tires with hubs and gear braces. Windows and paint regions partition the fuselage surface rather than overlap it, avoiding floating glazing intersections. The lower C90B tail is retained. This refinement affects only the 3D mesh: the approved 2D outline, collision geometry, catalog dimensions, layout coordinates and share format are unchanged. Fine detail and heights remain visually estimated, not certified clearance data.

The cockpit follow-up maps the approved 2D curved windshield band onto the 3D hull, with its center mullion and separate side panes. The local cockpit roof transition is adjusted to give the glazing a forward rake; the 2D artwork remains untouched.
