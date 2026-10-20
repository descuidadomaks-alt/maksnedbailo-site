# Temporary V1 cinematic video release — 20/21 October 2026

Release scope: only the existing `/new` cinematic media/controller and its documentation. Baseline main: `6eb639120e7fd3721288fc080d8b004a2313599d`. Branch: `care-less-video-v1`. Production destination: https://maksnedbailo.site/new. Deployment status is recorded in the release record in the existing Notion website page; do not infer deployment from a local build.

## Files and playback

All nine supplied MP4s were inspected with ffprobe and five sampled frames per clip. Originals/archive were preserved; original hashes and technical metadata are in CARELESS-VIDEO-INSPECTION.json. Hero/final sunset: independent muted 1_loop.mp4 loop. Journey: 2→3→4→5→6→7→8→9, paused native video with queued scroll seeking. Clip 9 reaches headquarters and its end poster supplies the existing softened HTML transition. No new footage or assistant was generated.

Delivered media is about 30.3 MB total; sources about 67.8 MB. Only neighboring journey videos mount (at most three); the ambient hero can remain mounted but paused while its sticky container is nearby. Moving far away removes the media elements. This is a decoder/resource-bound check, not a claim of measured phone heap usage.

## Verification evidence

- `node scripts/check-careless-v1.mjs`: homepage source tree, existing design/routing files, all eight fallback scenes, no /new redirect, Scout gate and verified conversion URLs pass.
- `node scripts/check-careless-video.mjs`: all nine source mappings/posters exist, trim bounds, monotonic weighted timeline in both directions, endpoint clamps and untrusted manifest URL rejection pass.
- TypeScript and optimized Next build pass. No additional runtime dependency.
- Built-site HTTP audit: `/new` returns 200 directly; `/projects/notd`, `/projects/parati`, `/projects/roman` return 200; 42 referenced media assets respond; all nine MP4s support 206 byte ranges. Homepage normalized visible text and JSON-LD match the fresh pre-change production baseline.
- Browser checks use the actual built page in Chromium, at 320×740, 390×844, 768×1024, 1280×720 and 1440×900. No horizontal overflow or broken loaded images was found. Hero, Scout and headquarters crops and HTML readability inspected visually. Square temporary sources necessarily crop/enlarge.
- Reduced-motion preference defaults to the shorter poster journey with no video elements. Explicit Enable motion mounts/decodes video. Reduce motion removes it. Skip and normal business navigation remain available.
- Every journey chapter was traversed. Journey elements remained paused, with readyState 4 after loading. Native wheel and Up key reversed target time. Example: clip 9 moved 2.575503→2.164216 seconds on an Up key; native downward scrolling advanced it.
- Frame-hold check: at scrollY 5208 on the 768-wide viewport, clip 9 stayed paused at exactly 0.919361 seconds across separate observations several minutes apart.
- Rapid chapter jumps mount only neighboring clips and remain responsive; HQ video end was observed at 5.033333 seconds and the existing HTML panel expands over the softened end-frame environment. No added film play/scale animation is used.
- Missing hero and tunnel MP4s were intentionally supplied through a temporary local runtime manifest. Posters stayed visible; the journey displayed an honest fallback notice; Skip and the full business page remained usable. Original manifest restored before commit. Clip 5 fallback poster uses a clearer source frame at 1.0 s rather than its dark lead.
- Paused Scout dialog and real booking/WhatsApp URLs inspected. Escape closes the dialog and returns focus to the triggering button. No live Scout or voice functionality enabled. No chat/CRM test records created for this media update.
- Four final actions remain present at compact phone width; stored appreciation persists on this device without a public count. No sales opportunity is created. Existing privacy controls remain intact.
- No console errors/warnings in the clean built-page flows. Intentional missing-media requests produced expected test-only failures, followed by a clean reload with the restored manifest.

Three defects found during QA were fixed: development Strict Mode removed a reused video's src without restoring it; an overlapping journey background covered the hero after returning to the top; sticky entry anchors needed explicit start alignment. Regression checks cover source restoration and hero visibility/click-through. The final built-page regression passed hero visibility, playing loop, clickable Explore, motion-off removal and Space-key re-enable. Final production verification must repeat those flows.

## Seeking decision and limits

Nine nonsequential targets, including reversals, were measured with seeked plus decoded-frame callbacks in the local browser. Original clip 3: mean 25.2 ms/max 52.4; optimized all-keyframe clip 3: mean 4.1/max 8.5; optimized clip 9: mean 5.4/max 18.9. These results justified MP4 seeking for this V1 instead of a much larger image sequence. The controller waits for completion and coalesces subsequent targets; it does not assume repeated currentTime assignments decode immediately.

Physical iOS Safari/Android, thermal/memory pressure, low-bandwidth cellular and numeric Web Vitals/CLS profiling have not been certified. Fixed cover media geometry was inspected for loading-related shifts, but no numerical CLS claim is made. A slow decoder can lag during fast scrolling; posters and Skip preserve access. Test final higher-resolution footage on actual target phones before promotion.

Source imperfections remain visible: 2→3 camera discontinuity, changing tunnel/colony geometry, brief dark entrance, Scout variations and baked labels in clip 9. Restrained cuts/dissolves preserve the supplied concept but cannot repair generated continuity. Final footage and a clean HQ end frame remain replacements, not completed work.

## Restart and rollback

Read the existing Notion website integration and Care Less initiative first. Keep Scout 21406/widget careless-scout-staging OFF until the documented privacy and activation gates are resolved. Reuse the existing project/tasks.

Use media.json and scripts/prepare-careless-video.mjs for replacements; instructions and exact scene mapping are in CARELESS-MEDIA-HANDOFF.md. Keep previous media folders and revert manifest entries for a media rollback. Revert only this video release PR to restore the previous still-based `/new`; preserve the original website PR, homepage and unrelated NOTD work. Re-run the two checks, type check, build and rendered browser QA before redeployment.

Local evidence is retained outside public delivery in `../artifacts/careless-video-v1/`: archive inventory, original metadata, review strips, seek-benchmark.json, build.log, local-http.json, production-http.json after deployment, browser checks and screenshots.
