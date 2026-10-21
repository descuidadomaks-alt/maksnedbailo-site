# Care Less single-film delivery — 21 October 2026

Current candidate: cinema.version4, branch care-less-single-film-v4. Founder rejected the published version3 frame experience. This replacement uses the supplied full.mp4 rather than assembling individual clips or requesting AVIF/WebP frames. Release acceptance on a physical iPhone and with final HD footage remains pending. Check the existing Notion website record for deployment state.

## Files and playback

- app/new/_cinematic/SingleFilm.tsx mounts one HTML video as soon as cinematic motion is enabled. It chooses one rendition once, preloads behind the hero, and keeps its decoder through forward/reverse/restart. Resizing does not fetch another rendition. Reduced motion does not mount the video.
- filmController.ts accepts metadata-only startup, primes muted inline playback, pauses at the first decoded frame, coalesces scroll targets into a single in-flight seek, and has eight-second startup/seek deadlines. seeked/readyState govern presentation; requestVideoFrameCallback records compositor observations without blocking paused-video progress. Initial frame0 is explicitly presented. Late old seeks cannot reveal HQ after a reset to zero. Retry and native skip remain available.
- CinematicJourney.tsx derives the film clock directly from scroll progress through filmAt. No mutable tween start state or chapter switching. Captions follow presented video time, with independent clearing at the hero. Upper centered mobile text and48px actions leave the lower screen free for swiping. Native touch scrolling, keyboard, Lenis wheel smoothing, skip and static fallback remain.
- public/careless/media.json is the one manifest. master.delivery=video, master.src/mobileSrc/poster/endPoster/duration/fps/shots and cinema.cues drive this version. Runtime version3 manifests are rejected in favor of the bundled current manifest. Nine shot entries are chapter timing/fallback/copy markers; their old individual video URLs are historical, not loaded by the active journey.
- public/careless/video/film-v4/film-720.mp4:720×720,30fps,18,301,867bytes,1s GOP,no B-frames/audio,H264,yuv420p,fast-start. Mobile film-540.mp4:540×540,30fps,12,747,773bytes,.5s GOP,same content/codec. Only one is requested per mount. The separate existing1_loop remains the ambient hero/final sunset.
- chapter-0.webp through chapter-8.webp are fallback posters extracted from this film. film-last.webp bridges into the HTML HQ panel. Old versions/assets are retained for rollback and are not prefetched by the current journey.

Original source: D:/AI Automation/Service/Website/CARELESS-V1/video/full.mp4.45.866667s,720×720,30fps,21,025,051bytes. Keyframes up to8.33s apart and2 B-frames made the original poorly suited to frequent reverse seeks. Original SHA256 and exact encode inventory are in CARELESS-SINGLE-FILM-INSPECTION.json. Source remains untouched. It contains a short dark patch around20.47–20.77s, preserved. Baked HQ labels also remain. A720px square movie does not establish Full HD quality or performance.

## Replace the film

Run from the repository:

```powershell
node scripts/prepare-careless-single-film.mjs 'D:/AI Automation/Service/Website/CARELESS-V1/video/full.mp4' film-v5
```

Use a new unique release directory. FFmpeg/ffprobe are required. This tool reads the source, writes delivery versions/posters/inspection metadata, and updates the central manifest. Its current chapter markers describe the founder's45.866667-second edit; review/edit boundaries and caption windows whenever the cut changes. It does not overwrite originals or old releases. For final HD/widescreen footage, deliberately revisit dimensions, bitrate, aspect/crops and device benchmarks; the temporary script scales to square delivery dimensions and must not silently stretch a different-aspect final source.

## QA and restart

Run check-careless-v1.mjs (homepage/routing/Scout/conversion preservation), check-careless-video.mjs (asset mapping/timeline/cues/reverse), check-careless-single-film.mjs (metadata-only startup, initial0, cancelled startup deadline after readiness, stale HQ reset, latest-target coalescing, reverse, timeouts/retry/dispose), TypeScript and the production build. The old frame tests describe rollback code only.

Inspect actual browser forward/reverse, cold load, end→footer→hero→replay, resize, Scout/focus, reduced motion, skip and media failure. Save DOM video datasets, screenshots and console results under artifacts/careless-single-film outside the repository. A local Range-capable proxy there can simulate4Mbps per video response/150ms delay and stalled media; this is synthetic desktop Chromium evidence, not iPhone Safari or mobile-network certification. Video data-first-frame-ms and seek metrics are local DOM diagnostics only, not transmitted analytics.

Initial QA found a startup timer surviving readiness and incorrectly causing fallback at8s; it was fixed before release and covered by a regression. An attempted rebuild hit local machine memory exhaustion; preview processes were stopped and the build retried with a bounded Node memory limit. No shared fonts/layout/dependencies were changed.

Homepage and unrelated routes must remain unchanged; Scout remains OFF. Roll back by reverting this PR only, retaining all previous media and unrelated main work. The original homepage baseline and prior HTTP verification live under artifacts/careless-continuous-film. Notion remains the existing Website integration record in the Care Less initiative; no duplicate tracker.

## Recorded candidate results

- Final production build generated all77 routes, lint/types passed. Local retry succeeded with NODE_OPTIONS=--max-old-space-size=1024 --max-semi-space-size=8 after two machine-memory failures. No build config/package/font changes. All three current check scripts pass; both delivery MP4s fully decoded without errors. MP4 moov is at byte32, before media data, in both versions.
- Local HTTP:/new direct200, runtime manifest matches, homepage visible text and JSON-LD equal pre-change production baseline, five unrelated routes preserved,48 original/updated assets verified with11 MP4 Range206 responses. Mobile rendition receives a separate Range check in release QA.
- Actual Chrome390×760 via synthetic4Mbps-per-video-response/150ms-latency proxy: first frame374.7ms after controller startup, before whole-file download (buffer5.54s at observation). Forward20.933s, reverse15s, end45.833s, footer→hero time0/stage opacity0/no captions, replay4.033s. Across large unbuffered jumps, worst seek1060ms;33 seeks averaged80.11ms by end, cached replay reduced mean. These numbers do not establish a one-second maximum on every connection/device. No captured warnings/errors, overflow or broken loaded images in this normal constrained flow. Upper caption rect122–248px in760px viewport.
- Actual Chrome1440×900 chooses720px only: first frame182.7ms locally, forward16.9s,17 seeks averaged12.41ms/max74.6ms at that sample. These are desktop measurements, not physical mobile results.
- Synthetic media stream that sends no bytes: explicit fallback appears by8s; continue-to-website reaches/focuses experience. Media failure does not trap navigation. Retry path is also covered in controller regression tests.
- Browser automation scroll-into-view can fight Lenis when clicking a distant footer/sticky control; actual native scrolling until the footer was visible then clicking verified reset. No DOM-programmatic scrolling was used for browser QA.

Candidate evidence: artifacts/careless-single-film/build-final.log, constrained-browser.json, replay.json, constrained-replay.png, mp4-structure.json and source/detail contact sheets. Publication and physical-device acceptance are tracked separately in Notion; do not infer either from this local QA record.
