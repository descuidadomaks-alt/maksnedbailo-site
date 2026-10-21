> Current mobile recovery: see CARELESS-MOBILE-RECOVERY.md. The earlier video-scrub release failed founder iPhone review. The scroll renderer now uses progressive AVIF frames with WebP fallback; physical-device acceptance and final-HD budgets remain pending.

# Care Less V1 media handoff

The experience lives only at `/new`. Do not edit the homepage's `_v2`, `components`, `lib` or `sections` folders to replace its media.

## Current: continuous master film (21 October)

The journey now uses one joined movie and one decoder. Source order is **2 -> 2a -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9**. `1_loop.mp4` remains the separate ambient hero/final sunset. All ten originals remain untouched in the founder's source folder.

Delivery: `public/careless/video/film-v2/journey.mp4`, 45.5 seconds, 31.03 MB, 624 square, H.264/yuv420p, 24 fps, every frame a keyframe, no B-frames/audio, fast-start. `film-first.webp` and `film-last.webp` support loading and the HQ transition. The optimized `2a.mp4` and its posters are also preserved here; previous v1 assets remain for rollback.

The centralized manifest now has `cinema.master` (src/posters/duration/fps/shots), `cinema.cues` (HTML cue windows), `cinema.journey` (editable source order/trims/scroll weights), and `cinema.hero`. Shot boundaries and cue start/end/fade values use master movie seconds. `master.settle` is false by default; optional near-stop settling is limited to Scout/HQ. No chapter/slider rail is rendered.

### Replace a journey clip

1. Keep all original source files in one folder, including 2a.mp4. Replace the desired source there, or change its basename in the corresponding journey manifest entry. Our tools read originals and never overwrite them.
2. Adjust that entry's duration and inPoint/outPoint to the new source. Keep its id/order; scrollLength sets reading/travel space. Current total is 2560 svh, with extra room at Scout and HQ.
3. Run `node scripts/prepare-careless-film.mjs "D:/AI Automation/Service/Website/CARELESS-V1/video" film-v3` from the repository. Use a new release name. FFmpeg/ffprobe must be installed. The helper encodes temporary normalized segments, joins a seekable master, creates posters and inspection metadata, and updates master/shot/cue timing. Previous releases and originals survive. Current temporary output is square; review delivery dimensions/crops before using different-aspect final footage.
4. Review custom cue edits: the helper recomputes default narrative windows relative to the source shots. Edit cinema.cues for precise entrance/hold/exit timing. Scene copy remains real HTML. No component rewrite is required.
5. Run both check scripts, type check, build and rendered forward/reverse/mobile/skip/failure QA. Deploy the manifest and new media together through existing GitHub/Vercel.

For the ambient hero only, `node scripts/prepare-careless-video.mjs hero source.mp4` remains supported. The older helper deliberately refuses individual journey replacements now, preventing silent master/clip mismatches.

For a media rollback, restore the previous complete cinema manifest and keep its referenced master/posters. Revert only the continuous-film PR for a full interaction rollback; preserve the homepage/unrelated work. See CARELESS-FILM-INSPECTION.json and CARELESS-CONTINUOUS-FILM.md.

## Previous per-clip release - historical reference

Runtime manifest: `public/careless/media.json`. URLs start `/careless/`. This JSON is fetched in the browser; upload/deploy it with its referenced files. No component changes are needed for poster or sequence replacements. Existing repository deployment still publishes files through Vercel.

| Scene ID | Founder asset | Suggested poster | Current fallback |
|---|---|---|---|
| pool | 01 Golden Sunset at the Oceanfront Infinity Pool | 01-pool.webp | pool-placeholder.svg |
| coast | 02 Sunset Infinity Pool Over Rocky Coast | 02-coast.webp | coast-placeholder.svg |
| discovery | 02A Anthill Discovery | 02a-discovery.webp | entrance-placeholder.svg |
| entrance | 02B Anthill Entrance | 02b-entrance.webp | entrance-placeholder.svg |
| tunnel | Transition into 03 Underground Ant Metropolis | 03-tunnel.webp | colony-placeholder.svg |
| colony | 03 Underground Ant Metropolis / 04 Amber Hive City Underground | 04-colony.webp | colony-placeholder.svg |
| scout | 05 Scout in the Amber Ant Colony | 05-scout.webp | colony-placeholder.svg |
| hq | 06 CLEAN Headquarters without typography | 06-hq-clean.webp | hq-placeholder.svg |

Use `/public/careless/images/` for posters. Preserve source originals outside public delivery if large. Legacy stills remain available; Scout's card reuses `scout`. The hero/final CTA now use the cinematic hero poster/video. No text should be baked into final images. Source labels remain a documented temporary-media limitation; keep HTML copy separate.

Poster-only entry:

```json
{"id":"pool","image":"/careless/images/01-pool.webp","mobileImage":"/careless/images/01-pool-mobile.webp","position":"center","mode":"image"}
```

`mobileImage` is optional. The desktop image stays available if it fails. Fixed media geometry prevents layout shifts; native lazy loading applies below the hero. Missing files fall back to the local storyboard. Any missing scene entry falls back independently. External/path-traversal media URLs are rejected. Scene identity and content remain in the source, not in untrusted manifest fields.

## Archived per-clip video delivery — 20 October 2026

All nine supplied clips from CARELESS_V1_VIDEOS.zip are installed. Originals remain untouched outside public delivery. Technical inspection, hashes, five sampled timestamps, camera notes and first/last poster URLs are recorded in CARELESS-VIDEO-INSPECTION.json.

`media.json.cinema` is the live video configuration. `hero` loops 1_loop.mp4 independently at the top and final sunset. `journey` scrubs 2.mp4 through 9.mp4 in order. Each entry controls src, duration, inPoint/outPoint, scrollLength (viewport-height units), poster/endPoster, desktop/mobile focal positions, cut/dissolve and transitionDuration. No component rewrite is needed. The last endPoster supplies the softened HQ environment beneath the existing HTML panel. `scenes` still supplies captions, the Scout card and emergency assets.

| File | Purpose | Duration | Delivered size |
|---|---|---:|---:|
| 1_loop.mp4 | Ambient pool / final sunset | 5.042 s | 1.41 MB |
| 2.mp4 | Pool turn / coastline | 5.083 s | 3.19 MB |
| 3.mp4 | Coast to anthill | 5.083 s | 4.76 MB |
| 4.mp4 | Anthill entrance | 5.208 s | 3.94 MB |
| 5.mp4 | Tunnel reveal | 5.083 s | 2.56 MB |
| 6.mp4 | Tunnel toward colony | 5.083 s | 2.97 MB |
| 7.mp4 | Colony reveal | 5.083 s | 3.42 MB |
| 8.mp4 | Scout arrival | 5.083 s | 3.38 MB |
| 9.mp4 | Scout to headquarters | 5.083 s | 4.65 MB |

Current delivery folder: `public/careless/video/v1/` with `posters/`. H.264/yuv420p, 24 fps, muted/no audio, fast-start MP4. Journey files have one keyframe per frame and no B-frames; hero uses a 48-frame GOP. Source clips 1–8 are only 624 square; clip 9 is delivered at 864 square. Cover crops necessarily enlarge/crop these temporary square sources. Total encoded media is about 30.3 MB, versus 67.8 MB originals; it is loaded progressively, not all on entry.

Native scroll schedules one animation frame per scroll event. A queued seek controller coalesces pending targets while a seek completes, then applies the latest target. Journey videos never play; reversing scroll reverses target time and stopping scroll holds the frame. At most the current and adjacent journey videos mount. Unmounting removes src and releases decoder resources. Ambient videos pause when covered/offscreen or the document is hidden. Reduced-motion/save-data use posters without requesting MP4s unless the visitor explicitly enables motion. Posters stay underneath loading/error video layers. Skip and business content remain available independently.

A local-browser nine-target seek benchmark measured original clip 3 mean 25.2 ms/max 52.4 ms, optimized clip 3 mean 4.1/max 8.5 ms and optimized clip 9 mean 5.4/max 18.9 ms. This supports direct MP4 delivery for V1 on the tested Chromium browser. It does not guarantee physical Safari/Android behavior. Use short optimized image sequences for a device class only if final footage fails its device QA; the older still-sequence helper is retained, but is not the current movie controller.

### Replace a clip

1. Keep the original source outside `public`. Install FFmpeg/ffprobe through the usual trusted tooling if absent.
2. From the repository run `node scripts/prepare-careless-video.mjs clip-3 "D:/path/to/3.mp4"` (or `hero`, `clip-2` through `clip-9`). It creates a new versioned directory, encodes fast-start/all-keyframe delivery, creates first/last WebP posters, probes duration and changes only that manifest entry. Previous files survive for rollback. No shell interpolation of source paths is used.
3. Review inPoint/outPoint, duration, crops, transitions and scrollLength in media.json. Clip 5 currently starts at 0.34 s to bypass its fully black lead; its fallback poster is a clearer source frame at 1.0 s. A replacement should be inspected again rather than inheriting that trim blindly.
4. Run both Care Less checks, type check and build; test forward/reverse, rapid scroll, pauses, mobile crops and loading errors in the browser. Deploy files and manifest together via the existing GitHub/Vercel workflow.
5. Roll back by restoring the previous manifest entry (and keeping referenced old media). Do not revert unrelated site changes.

Source imperfections retained: 2→3 viewpoint jump; changing tunnel/colony architecture; a brief dark entrance; Scout identity/position shifts; clip 9 contains baked typography. Short restrained dissolves/cuts do not repair generated continuity. Future final footage should align first/last frames and provide a genuinely clean HQ end frame. No footage was regenerated or concept changed.

## Installed approved stills — 20 October 2026

Source originals: `D:/AI Automation/Service/Website/CARELESS-V1` (read only). Eight optimized desktop and mobile WebP derivatives now installed and mapped in media.json. Total desktop still delivery is about 2.1 MB; hero 211 KB desktop / 91 KB mobile. Originals are untouched.

Actual source mapping: pool=01_hero.png; coast=02_pool_turn.png; discovery=02A_anthill_discovery.png; entrance=02B_anthill_entrance.png; tunnel=03_tunnel.png; colony=04B_colony_reveal.png.png; scout=05_scout.png; hq=06_headquarters_clean.png. 03A/04A alternatives were inspected/retained in the source folder, not substituted into the chosen sequence.

The supplied HQ file still contains labels despite its name. It is used only as a softened environment beneath real HTML; a truly text-free replacement remains pending. `mobilePosition` sets the mobile focal point. The server imports this same manifest for the initial image, then the browser refreshes it at runtime. There is no initial storyboard flash. SVG storyboard files remain available for failures. Temporary V1 clips have now been supplied and integrated as described above; final higher-resolution footage remains pending.
