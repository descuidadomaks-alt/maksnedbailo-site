# Care Less mobile recovery candidate

21 October 2026. Branch care-less-mobile-frame-renderer, based on production 0a9a847. Founder physical-iPhone screenshots reject PR #3: indefinite loading, stale headquarters frame/caption during return to hero, and lower-left copy in swipe area. Earlier emulated browser checks did not establish phone reliability. This record supersedes earlier claims of accepted V1 functionality; physical approval remains required.

## Evidence and corrections

1. Initial loading FAILED in supplied Safari screenshot. The previous paused video controller required loadeddata/readyState2 before seeking and had no initial-load timeout. Metadata-only preload can leave it waiting; the exact iPhone event trace is unavailable. Replacement uses independently fetched/decoded image frames on canvas, not paused-video seeking. Each request has a 6.5s deadline, cancellation and usable poster/content/skip fallback.
2. Return-to-hero FAILED in second supplied screenshot: old HQ image/text overlap hero. Previous GSAP to() values were implicit with invalidateOnRefresh, and old presented state remained visible while a new seek waited. Replacement derives film time directly from current scroll progress (no mutable tween start values), independent intro reset, immediate hiding on large target jumps, and late-response rejection. These guards do not depend on video decoder events.
3. Mobile reading position FAILED founder review. Captions/actions now occupy the centered upper region, with 48px actions and stronger top shading; lower viewport is free for swipes. Motion preference and normal scrolling remain; no forced section snapping. Dynamic viewport stage covers Safari toolbar changes. Focus return avoids scrolling.

## Runtime and media

FrameCanvas.tsx renders the target frame, frame-store.ts bounds decoded cache and concurrent requests. Normal canvas cache is 10 source frames (~15.6MB RGBA); future larger frames use at most12MP cached pixels (~48MB), plus two in-flight decodes and canvas. Network requests prioritize current target, cancel obsolete jumps and prefetch a small nearby window. Cache closes evicted image bitmaps; unmount releases all. Compressed HTTP cache may retain visited assets; this is not an assertion about total browser memory.

Central media.json master.sequence retains exact 45.5s/24fps/1092-frame timeline, including 2a. Existing master remains for rollback but is not requested by the scroll renderer. AVIF generated directly from original source footage; WebP fallback for unsupported AVIF decoding. Current sources remain624-square. No upscaling or creative regeneration. Mobile/desktop exports at up to960/1920 are generated automatically only when supplied originals support those dimensions. Final HD media is not available and has not been performance-certified.

Current primary AVIF full sequence36,437,580 bytes; first second677,973 bytes. WebP fallback full sequence76,818,200 bytes. Progressive window loading improves entry and arbitrary seek; image sequences still have higher transfer cost than interframe video at equivalent visual quality. A full traversal can transfer the whole sequence, plus assets visited during reverse/eviction as governed by HTTP caching. Constrained-network and final-HD budget need actual measurement, not extrapolated promises. These numbers do not include separate ambient sunset loops.

## Build and replacement

- npm ci; npm run build; npm run start -- -p3090.
- node scripts/check-careless-v1.mjs; node scripts/check-careless-video.mjs; node scripts/check-careless-frames.mjs.
- Update original source timing/master shots first if footage duration changes. Run prepare-careless-frames.mjs source-folder unique-release, then prepare-careless-avif.mjs source-folder same-release. Both preserve original sources. AVIF helper uses the retained WebP variants for fallback and can resume interrupted generation of that release; use a fresh release name for different source footage.
- Inspect frame source quality, first-window/full transfer, mobile crops and caption windows before publishing. The helper uses Sharp only during asset preparation, not the visitor runtime.
- Prior film builder replaces master; after it runs the sequence must be regenerated. Never leave an old sequence paired with changed shots/timing.
- Roll back only the mobile-recovery PR to restore previous interaction; retain existing previous delivery media. Homepage/shared config/other routes and Scout gate must stay unchanged.

## QA and release status

Automated checks passed for full source/asset mapping, all sequence frame files, deterministic end -> start -> half -> end -> start progress mapping and monotonic reverse, stale HQ request resolving after hero jump, backwards target cancellation and resource disposal. TypeScript passed. Production-mode render and deployed QA results/PR links are recorded in the existing Notion website page; no duplicate tracker. Initial local rendered tests show upper captions and correct frame0/no captions on return after viewport resize, followed by replay from opening footage. Local synthetic outage reaches explicit fallback after bounded timeout; final production-mode evidence is stored under artifacts/careless-mobile-recovery outside this repository.

Physical Safari/iPhone and Android acceptance, final-HD performance, cellular and founder pacing acceptance remain pending. No live Scout/voice activation. Existing human contact routes remain available.

Final local optimized-build checks: all77 routes generated with TypeScript validation. The first build failed on a transient existing Next font URL parse; original dependency restored and clean final build passed, no shared source changes. /new200, 48 original assets/11 video ranges and five unrelated routes pass, homepage text/JSON-LD match pre-change baseline. All2184 frame files exist; 56 first/middle/last HTTP samples cover both formats and all source shots. Built browser shows AVIF canvas, zero scrub-video elements, forward/reverse frame targets, repeated end -> hero -> replay after resize with frame0/no old cues, upper mobile Scout/actions, paused modal/Escape with stable focus/scroll, no overflow/broken loaded images or console errors. Synthetic frame outage reaches fallback after deadline; native Skip enters #experience and releases canvas. Browser dimensions tested390x760/660 and desktop1280; these do not certify physical Safari. Evidence: local-browser.json, local-frame-http.json, mobile-scout.png, build-final.log and synthetic outage proxy under local artifacts/careless-mobile-recovery.
