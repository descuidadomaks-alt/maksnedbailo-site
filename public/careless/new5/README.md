# /new5

Buildless page served by the rewrite `/new5 → /careless/new5/index.html` (next.config.js). noindex. /new4 and older stay untouched.

Files: `index.html`, `new5.css`, `new5.js` (readable, no build step), `media/`, `fonts/`.

## Film
- Default film = the new Blender camera (`media/film-720.mp4`, `media/film-540.mp4`, keyframe every 4 frames for smooth scrubbing).
- `?film=v4` (or `#v4`) plays the rendered /new4 film with the same beats.
- **Swapping in the final render:** encode the render the same way and overwrite `media/film-720.mp4` + `media/film-540.mp4`:
  ```sh
  ffmpeg -i render.mp4 -an -c:v libx264 -preset slow -crf 23 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/careless/new5/media/film-720.mp4
  ffmpeg -i render.mp4 -an -vf scale=-2:540 -c:v libx264 -preset slow -crf 25 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/careless/new5/media/film-540.mp4
  ```
  If the render's length differs from 30 s, update `FILMS.cam` in `new5.js` (`duration`, `map`, `captions`, `hold`).
- Scroll mapping: `map` is `[scroll in viewport heights, film seconds]`. Caption windows get more scroll per second (dwell), transitions less. After the user stops, a soft settle glides to the nearest beat if it's within 30% of a screen.

## Scout
- `SCOUT_MODE` (`window.CARELESS_SCOUT_MODE`): `preview` (default, labelled scripted demo; confirmed contacts are posted to `/api/new5-lead`), `live` (MCB widget transport), `off` (WhatsApp handoff).
- Voice: define `window.CarelessVoice.start({ onState, onLevel, onCaption })` → `Promise<{ mute(bool), end() }>` and set mode `live`. The call screen is already wired to it.
- Agent instructions: `docs/scout-website-prompt.md`.

## Leads
`app/api/new5-lead/route.ts` — same MCB channel as /api/new4-offer; accepts website, email or phone; offers `look`, `leak`, `shopper`, `needs_me`, `scout_chat`, `final_note`.

## Content slots still empty
- Maks video in "Say it once" (`.human-video`, data attributes reserved).
- Client logos and testimonials (not placed yet).
- Comic images use crops of the existing HQ and Scout stills (`media/comic-*.webp`), replace with the new art when ready.
