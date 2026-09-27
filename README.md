# KBOX5

Responsive hangar leasing website with locally stored images and a vector navbar logo.

The contact pop-up currently shows Pete’s email directly, with a mailto link. CAPTCHA is paused; the server verification code is retained for possible future use. The frontend does not call it.

## Local preview

Requires Node.js 20.6 or newer. From this folder:

```sh
node server.mjs
```

Open http://127.0.0.1:4173. The server serves only `dist/`; never expose the project root as static files.

## Paused: protected email reveal

1. Register reCAPTCHA v2 **I'm not a robot checkbox** keys at https://www.google.com/recaptcha/admin for your site. Use separate development keys with `localhost` allowed.
2. Copy `.env.example` to `.env` and set the site and secret keys. Keep the secret on the server; do not put it in `dist/` or commit it.
3. Start with `node --env-file=.env server.mjs`. For local CAPTCHA testing, visit http://localhost:4173 using a localhost-registered key.
4. Production needs a Node backend/reverse proxy (or a port of the API to the host's server runtime), HTTPS, and the same server-only environment variables. The default server binds to loopback for local use. Keep production RECAPTCHA_HOSTNAMES limited to the actual production domain(s).

The retained API keeps the email hidden without keys, but the current frontend intentionally displays the email directly. Reconnect the frontend verification flow before enabling CAPTCHA again. There is no fake CAPTCHA or insecure fallback. `/api/contact-email` verifies tokens with Google and checks the returned hostname before revealing the address. Google's verification rejects expired or reused tokens. API responses are not cached. CAPTCHA reduces automated harvesting but cannot stop a person or a bot that successfully solves it from copying a revealed address.

## Files

- `dist/index.html`, `style.css`, `app.js`: editable frontend
- `dist/assets/hangars.jpeg`, `original-brand.png`: original locally stored site images
- `dist/assets/kbox5-logo.svg`: vector recreation of supplied logo
- `server.mjs`: static server and protected email API

Run checks with `node --test server.test.mjs`. Tests stub Google's response to cover both rejection and success; a live challenge requires configured keys and a human tester.

## Hangar planner

The section at `/#planner` uses a 65 × 60 ft SVG coordinate system. Aircraft library: King Air C90B, King Air 200 (B200 dimensions), Citation Bravo, Phenom 300, TBM 850, Pilatus PC-12 (NG dimensions), Cirrus Vision Jet, Cessna 185F tailwheel, and P-51D Mustang. Dimensions and sources appear below the planner. Add via drag or click; move via pointer or arrow keys; rotate using the round handle, slider, 15° buttons, or R. Multiple aircraft are supported, up to 12. Layout is session-only and resets on reload.

`dist/planner-geometry.js` contains dimensioned schematic geometry and convex-polygon overlap checks. `dist/planner.js` manages UI interactions. Geometry checks: `node --test planner.test.mjs`. The planner is illustrative, excludes door/height/interior/maneuvering clearances, and does not certify real-world fit.
