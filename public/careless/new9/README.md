# /new9

Buildless page served by the rewrite `/new9 → /careless/new9/index.html` (next.config.js). noindex. It reuses /new5's film, fonts and Scout avatar (`BASE`); its media (`MEDIA`: the comic panels, the final-screen loop, the client story videos and Maks's avatar) is read from `/careless/new7/media/`, which is frozen, instead of keeping a second copy (the repo is already ~420 MB of public files). /new5 and /new6 stay untouched.

Files: `index.html`, `new9.css`, `new9.js` (readable, no build step), `es.js` (Spanish), `fonts/`.

## Languages
English and Spanish (Spain, tú). The header button (ES/EN, also on the gate) switches in place and is remembered in localStorage `cl-lang`; `?lang=es` / `?lang=en` forces one; otherwise a Spanish browser gets Spanish.
- Fixed page text: `es.js` maps a CSS selector to its Spanish (`html`, `text` for buttons with icons, `attr`). English stays in `index.html`; the originals are kept so the switch goes both ways.
- Text the script writes (gate greeting, hero lines, Scout's chat and call, offers, stories): `L('English', 'Spanish')` next to each other in `new9.js`.
- Written reviews shown in Spanish are translations and are labelled "Traducido del inglés"; the videos stay in English.
- A Spanish visitor's gate waits for its Spanish text (`i18n-wait` class set by the inline script in `<head>`), so it never flashes English.

## Film
- Default film = the rendered /new4 film (`FILMS.v4`), so the live page never shows the grey blockout.
- `?film=cam` (or `#cam`) plays the new Blender camera blockout (`media/film-720.mp4`, `media/film-540.mp4`, keyframe every 4 frames for smooth scrubbing). When its final render lands, swap the files and make `cam` the default again in `new9.js` (`filmKey`).
- **Swapping in the final Blender render:** encode the render the same way and overwrite `media/film-720.mp4` + `media/film-540.mp4`:
  ```sh
  ffmpeg -i render.mp4 -an -c:v libx264 -preset slow -crf 23 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/careless/new5/media/film-720.mp4
  ffmpeg -i render.mp4 -an -vf scale=-2:540 -c:v libx264 -preset slow -crf 25 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/careless/new5/media/film-540.mp4
  ```
  If the render's length differs from 30 s, update `FILMS.cam` in `new9.js` (`duration`, `map`, `captions`, `hold`).
- Scroll mapping: `map` is `[scroll in viewport heights, film seconds]`. Caption windows get more scroll per second (dwell), transitions less. After the user stops, a soft settle glides to the nearest beat if it's within 30% of a screen.

## Scout
- `SCOUT_MODE` (`window.CARELESS_SCOUT_MODE`): `preview` (default, labelled scripted demo; confirmed contacts are posted to `/api/new5-lead`), `live` (MCB widget transport), `off` (WhatsApp handoff).
- Voice: define `window.CarelessVoice.start({ onState, onLevel, onCaption })` → `Promise<{ mute(bool), end() }>` and set mode `live`. The call screen is already wired to it.
- Agent instructions: `docs/scout-website-prompt.md`.

## Leads
`app/api/new5-lead/route.ts` — same MCB channel as /api/new4-offer; accepts website, email or phone; offers `look`, `leak`, `shopper`, `needs_me`, `scout_chat`, `final_note`.

## Sound, rail, greeting
- Sound is generated live with Web Audio (no files): sea → underground hum → colony chord, scroll-speed air, Scout chime, chapter ticks, ducking under chat/call/offers. On by default from the "I'm ready" click; "Enter in silence" and the top-bar toggle turn it off (remembered in localStorage `cl5-sound`). Tune levels in `sound.update()`.
- Journey rail (desktop) jumps between beats; positions come from `RAIL` in `layout()`. Phones get a thin progress line instead.
- The gate's first line reacts to local time, weekends and return visits (`greeting()`).

## Client stories
"Hear it from clients" in "Say it once" opens a phone-story viewer: the two video testimonials, then the written reviews from /old2, then a closing card. Content lives in `STORIES` in `new9.js`. No platform is named on purpose; add each client's brand as `role` when Maks has it (Corinna is Edible Health).
- Videos are self-hosted (`media/story-garrett.mp4`, `media/story-aj.mp4`, posters `story-*.webp`, header faces `face-*.webp`), taken from the YouTube originals (3Gzbg1rI5Tg, pVgC-3GciSw). They start on their own: with sound if the site's sound is on, muted if it's off; the speaker button (or `M`) toggles it. One `<video>` element is reused for both, so a sound unlock on iPhone carries over.
- Instagram behaviour: tap right for next, left for back, press and hold to pause (the header hides), swipe down to close. Space/K pauses, arrows step on desktop. A video moves on when it ends.
- `fit: true` shows a clip whole on a blurred copy of itself (Garrett's is 4:5 with burned-in subtitles).

## Final screen
Background is `media/final-loop-*.mp4`: the colony push-in from `video/v1/7.mp4`, slowed and played forward-then-back so it loops without a cut. It only loads when the screen is near.

## Scout on phones
Through the four chapters the avatar folds into a solid Scout-green pill in the same corner (`#dock-pill`: Maks's Scout symbol SVG + "scout_" in dark ink, slow glow). Solid on purpose, so it never reads as one of the outlined team chips. Tapping it, opening chat/call, or leaving the chapters brings the avatar back. Short-phone CSS keeps every chapter button at least ~12px above it (checked 360–430 wide, 553–760 tall, EN and ES).
On the last screen the corner Scout steps aside (`.dock.away`), since "Rather talk? Call Scout" is right there; that button shows after ~2 s on screen or 1 s after focusing the field. On phones the corner Scout also hides while any text field has focus, so the keyboard never half-covers him.
A sideways swipe over the chapters turns exactly one chapter (`stepChapter`), past the last one it carries on to "Say it once".

## Comic
`/careless/new7/media/comic-*.webp` (shared with /new7) are print-style treatments of the HQ and Scout stills (halftone + ink). Replace with drawn comic art when available, same size (640×545).

## Content slots still empty
- Maks video in "Say it once" (`.human-video` is `hidden` and `.human-inner` has `no-video`; remove both when the video is in).
- Client logos and brand names for the written reviews.
- Comic images use crops of the existing HQ and Scout stills (`/careless/new7/media/comic-*.webp`), replace with the new art when ready.

## Added in /new9 (Hormozi pass)
- **The Care Less Map** card in "Say it once": 90-minute session, one-page ROI-ranked map within 48 h, Phase 1 quoted or an honest "not yet", €1,470 struck through, "Free for now", and the €10k "tell you straight" guarantee. Wording comes from Maks's own /ai-map offer; the price line and guarantee need his OK before this goes wide.
- **5-second test, live**: the first chapter's offer runs `/api/site-check` (fetches the homepage server-side, public hosts only, 10 checks) and shows the score before asking for contact details. The lead note carries the URL, score and what was missing.
- **Missed-enquiry calculator**: the second chapter's offer shows a live monthly estimate (enquiries × % missed × % normally won × average sale); the numbers go into the lead note.
- **Last screen**: a reply promise line (needs Maks's OK), "One thing to care less about" email signup (offer id `letter` in the lead intake), and a like button in the footer.
- **Like button**: real count in the site's private Vercel Blob (`/api/likes`, `careless/likes.json`); the number shows only from 50 likes. No seeded number.
- **Film**: `/careless/shared/media/film-*-light.mp4` (keyframe every 8, CRF 28): 13 MB desktop / 8 MB phone instead of 38 / 23 MB.
