# Care Less V1 media handoff

The experience lives only at `/new`. Do not edit the homepage's `_v2`, `components`, `lib` or `sections` folders to replace its media.

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

Use `/public/careless/images/` for posters. Preserve source originals outside public delivery if large. Hero and final CTA reuse `pool`; Scout's card reuses `scout`. No text should be baked into final images. If only 06 with typography exists, keep the placeholder until CLEAN is available.

Poster-only entry:

```json
{"id":"pool","image":"/careless/images/01-pool.webp","mobileImage":"/careless/images/01-pool-mobile.webp","position":"center","mode":"image"}
```

`mobileImage` is optional. The desktop image stays available if it fails. Fixed media geometry prevents layout shifts; native lazy loading applies below the hero. Missing files fall back to the local storyboard. Any missing scene entry falls back independently. External/path-traversal media URLs are rejected. Scene identity and content remain in the source, not in untrusted manifest fields.

## Founder videos

Put approved clips under `/public/careless/video/`. V1 deliberately avoids untested currentTime seeking. Convert a clip into a reversible optimized WebP sequence with the installed FFmpeg:

```
node scripts/prepare-careless-media.mjs coast public/careless/video/02-coast.mp4
```

Default 12 fps, width at most 1280, up to 180 frames (15 seconds). The helper creates a versioned folder, changes only that manifest entry and preserves the poster and previous sequences for rollback. It does not delete or overwrite founder source media. Set `mode` back to `image` to roll back. Frames within three behind/four ahead of the active frame are prefetched. Only adjacent scenes mount. Reduced-motion and data-saving preferences use posters. Browser/device testing with final frames remains required; current QA cannot establish final cinematic playback quality without those files.

Do not put an MP4 URL in `image`. The placeholder `video: null` fields are handoff slots, not an implemented MP4 player. The supported V1 delivery path is image sequences. If a later release adds direct MP4 scrubbing, validate encoding/keyframe intervals and device seeking before enabling it.

Targets: poster under 300 KB desktop / 180 KB mobile; each critical sequence ideally under 8 MB total. These are delivery budgets, not claims about absent final media. Inspect responsive crops at 320/390/768/1440 widths, forward/reverse scrub, fast scroll and missing files before publication. Text/skip/navigation remain accessible independently of cinematic success.

## Installed approved stills — 20 October 2026

Source originals: `D:/AI Automation/Service/Website/CARELESS-V1` (read only). Eight optimized desktop and mobile WebP derivatives now installed and mapped in media.json. Total desktop still delivery is about 2.1 MB; hero 211 KB desktop / 91 KB mobile. Originals are untouched.

Actual source mapping: pool=01_hero.png; coast=02_pool_turn.png; discovery=02A_anthill_discovery.png; entrance=02B_anthill_entrance.png; tunnel=03_tunnel.png; colony=04B_colony_reveal.png.png; scout=05_scout.png; hq=06_headquarters_clean.png. 03A/04A alternatives were inspected/retained in the source folder, not substituted into the chosen sequence.

The supplied HQ file still contains labels despite its name. It is used only as a softened environment beneath real HTML; a truly text-free replacement remains pending. `mobilePosition` sets the mobile focal point. The server imports this same manifest for the initial image, then the browser refreshes it at runtime. There is no initial storyboard flash. SVG storyboard files remain available for failures. Final videos have not been supplied or playback-tested.
