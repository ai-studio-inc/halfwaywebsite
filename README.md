# Halfway Landing Page

## Deep-Link Support

- Visit `https://halfway.one/invite/<INVITE_ID>`, `.../place/<PLACE_ID>`, or `.../profile/<PROFILE_ID>` to trigger the custom scheme `halfway://` flow.
- The page attempts to open the app immediately and falls back to the App Store URL (`https://apps.apple.com/bh/app/halfway-app/id6744035312`) if the app is not installed.
- `apple-itunes-app` metadata is injected dynamically so iOS knows which context (invite/place/profile) to open when universal links are tapped.
- The behaviour lives in `public/404.html`, which GitHub Pages serves for unknown paths such as `/invite/<id>` and acts as our deep-link router.

## Apple App Site Association (AASA)

- `public/apple-app-site-association` and `public/.well-known/apple-app-site-association` are published verbatim so iOS devices can validate universal links.
- Both files advertise the bundle `FU526M9P3E.com.zekuro.halfwayapp` with `/invite/*`, `/profile/*`, and `/place/*` paths.
