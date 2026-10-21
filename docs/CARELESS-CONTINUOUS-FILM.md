# Care Less continuous film correction

21 October 2026. Release branch: care-less-continuous-film. Scope: /new only. Existing GitHub -> Vercel deployment; homepage, shared layout/styles, redirects and unrelated routes are unchanged. Scout public activation remains OFF.

## Implemented

One joined 45.5-second film replaces per-clip swapping and chapter controls. Source order is 2, 2a, 3, 4, 5, 6, 7, 8, 9; 1_loop remains ambient hero/final sunset. 2a was inspected at five timestamps and fills the pool-to-rocky-coast movement. All founder originals remain untouched.

Route-local Lenis smooths wheel input; touch stays native. GSAP ScrollTrigger maps 2560 svh of reversible travel to one paused H.264 decoder. Frame targets are quantized to 24 fps and coalesced around decoded-frame callbacks. HTML captions and actions follow the presented frame clock, with separate entrance/hold/exit windows and quiet travel intervals. Focused actions remain visible. No slider rail or forced section snapping. Optional Scout/HQ settling exists but is disabled in the manifest.

Motion preference is explicit and remembered; OS reduced motion/data saving default to stills. Enable cinematic motion restores the full experience. Skip controls and normal content remain available. Master loads only after journey intent and releases offscreen. Missing video preserves stills and displays an honest notice. No autoplay audio.

## Files and media

- app/new/_cinematic/CareLess.tsx: route-local smooth scrolling, anchor/focus navigation and motion preference.
- CinematicJourney.tsx, VideoMedia.tsx, cinema.ts, careless.module.css: master clock, decoder, cues, fallbacks and responsive stage.
- public/careless/media.json: cinema.master, shots, cues and editable source list.
- public/careless/video/film-v2/journey.mp4: 31.03 MB, 624 square, 24 fps, every frame keyframe, faststart, no B-frames/audio; first/last posters and optimized 2a derivative alongside it. Previous v1 media retained.
- scripts/prepare-careless-film.mjs and docs/CARELESS-MEDIA-HANDOFF.md: repeatable replacement workflow.
- docs/CARELESS-FILM-INSPECTION.json: source hashes, trims and master boundaries.

## Recorded QA

- Optimized production build passed (77 routes); build includes TypeScript checks.
- check-careless-v1.mjs passed homepage source/style/routing preservation, assets, Scout gate and conversion destinations.
- check-careless-video.mjs passed ten source mappings, 2a placement, timeline/cue boundaries, monotonic clock, asset and manifest validation.
- Local production HTTP: /new direct 200, 48 assets, 11 video range responses 206 (includes rollback assets), five selected unrelated routes 200. Homepage visible text and JSON-LD match fresh pre-change production baseline.
- Rendered IAB testing: wheel travel presented intermediate frames; one measured 432px gesture produced 21 distinct composited frames through 0.125-1.2083 seconds. Reverse returned through decreasing intermediate frames. Final quantized build rechecked master playback and 2a; decoded-frame callback samples and seek metrics saved.
- Mobile 390x844 Scout cue and both actions fit. Paused dialog states no chat started, Escape closes, focus returns; focused cue stays readable during scroll. At 320x740 the hero fits without horizontal overflow. Desktop 1280 and earlier 1440 checks retained; viewport emulation is not physical-device certification.
- Missing-master injection showed fallback poster/notice and accessible skip/content. Original manifest restored and HTTP/manifest checks rerun.
- Reduced mode mounts zero videos; preference persists into fresh document. Full mode can be restored from the hero. End-of-page releases master and plays only muted ambient sunset. Tested normal-flow console had zero errors/warnings; deliberate missing-media test is separate.
- Local evidence outside repository: ../artifacts/careless-continuous-film/ contains build.log, browser-qa.json, local-http.json, 2a-review.jpg and mobile-scout.png.

## Limits and remaining review

The source is 624-square at 24 fps; it cannot acquire new detail or 60 unique frames by changing the player. A 31 MB seekable master favors decoding consistency over smallest transfer. Existing source-camera cuts, architecture/Scout changes and baked HQ labels remain. Physical Safari/iOS, Android and constrained cellular testing remain unverified. Founder still needs to review actual scroll feel and narrative pacing; technical QA is not founder creative acceptance. No live Scout/voice activation is claimed.

## Release and restart

Build and local production QA passed; publish through this branch PR after Vercel succeeds. Deployment status and PR/commit links are maintained on the existing Notion website record, with initiative checkpoint; no duplicate tracker. Run npm ci, npm run build, npm run start -- -p 3090 for an optimized local preview. Run node scripts/check-careless-v1.mjs and node scripts/check-careless-video.mjs before release. For replacement use the film helper with a new release directory, review cue timing and test forward/reverse/mobile. Revert only this PR to roll back interaction, preserving unrelated main changes; old v1 media remains available.
