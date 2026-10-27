# /new12

Buildless page served by the rewrite `/new11 → /careless/new11/index.html` (next.config.js). noindex. It reuses /new5's film, fonts and Scout avatar (`BASE`); its media (`MEDIA`: the comic panels, the final-screen loop, the client story videos and Maks's avatar) is read from `/careless/new7/media/`, which is frozen, instead of keeping a second copy (the repo is already ~420 MB of public files). /new5 and /new6 stay untouched.

Files: `index.html`, `new11.css`, `new11.js` (readable, no build step), `es.js` (Spanish), `fonts/`.

## Languages
English and Spanish (Spain, tú). The header button (ES/EN, also on the gate) switches in place and is remembered in localStorage `cl-lang`; `?lang=es` / `?lang=en` forces one; otherwise a Spanish browser gets Spanish.
- Fixed page text: `es.js` maps a CSS selector to its Spanish (`html`, `text` for buttons with icons, `attr`). English stays in `index.html`; the originals are kept so the switch goes both ways.
- Text the script writes (gate greeting, hero lines, Scout's chat and call, offers, stories): `L('English', 'Spanish')` next to each other in `new11.js`.
- Written reviews shown in Spanish are translations and are labelled "Traducido del inglés"; the videos stay in English.
- A Spanish visitor's gate waits for its Spanish text (`i18n-wait` class set by the inline script in `<head>`), so it never flashes English.

## Film
- Default film = the rendered /new4 film (`FILMS.v4`), so the live page never shows the grey blockout.
- `?film=cam` (or `#cam`) plays the new Blender camera blockout (`media/film-720.mp4`, `media/film-540.mp4`, keyframe every 4 frames for smooth scrubbing). When its final render lands, swap the files and make `cam` the default again in `new11.js` (`filmKey`).
- **Swapping in the final Blender render:** encode the render the same way and overwrite `media/film-720.mp4` + `media/film-540.mp4`:
  ```sh
  ffmpeg -i render.mp4 -an -c:v libx264 -preset slow -crf 23 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/careless/new5/media/film-720.mp4
  ffmpeg -i render.mp4 -an -vf scale=-2:540 -c:v libx264 -preset slow -crf 25 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/careless/new5/media/film-540.mp4
  ```
  If the render's length differs from 30 s, update `FILMS.cam` in `new11.js` (`duration`, `map`, `captions`, `hold`).
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
"Hear it from clients" in "Say it once" opens a phone-story viewer: the two video testimonials, then the written reviews from /old2, then a closing card. Content lives in `STORIES` in `new11.js`. No platform is named on purpose; add each client's brand as `role` when Maks has it (Corinna is Edible Health).
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

## Added in /new10 (Hormozi pass)
- **The AI Map** card in "Say it once": 90-minute session, one-page ranked map within 48 h, Phase 1 quoted or an honest "not yet", "Free. Permanently.", and the live /ai-map promise ("the 90 minutes and the map are yours either way"). Keep it in step with `app/ai-map/new/lib/copy.ts`: no price anchor, no deadline, no €10k guarantee (those were retired with /ai-map/old).
- **5-second test, live**: the first chapter's offer runs `/api/site-check` (fetches the homepage server-side, public hosts only, 10 checks) and shows the score before asking for contact details. The lead note carries the URL, score and what was missing.
- **Missed-enquiry calculator**: the second chapter's offer shows a live monthly estimate (enquiries × % missed × % normally won × average sale); the numbers go into the lead note.
- **Last screen**: a reply promise line (needs Maks's OK), "One thing to care less about" email signup (offer id `letter` in the lead intake), and a like button in the footer.
- **Like button**: real count in the site's private Vercel Blob (`/api/likes`, `careless/likes.json`); the number shows only from 50 likes. No seeded number.
- **Film**: `/careless/shared/media/film-*-light.mp4` (keyframe every 8, CRF 28): 13 MB desktop / 8 MB phone instead of 38 / 23 MB.

## Changed in /new10
- The AI Map card is gone (Maks: nobody took it). "Say it once" goes back to "Book a call with me" until the new offer is chosen.
- Offer sheet scrolls on every screen (the smooth-wheel handler lets `.offer-card` scroll; the card caps at the window height).
- The page's scroll limit is re-read on every wheel and glide, so content that appears late (the "Rather talk?" button) never blocks the footer.
- Last screen is calmer: question, Scout, book link, reply line, sign-off. The email list and the like button moved into a proper footer band.
- Like button: the real count is always shown; tapping it ripples, pops, sparks and changes the note to a thank-you.
- Phones, chapters: the Scout pill glides from the corner to the bottom centre and back (`--dx` / `--mx`).

## Changed in /new11
- "Say it once" carries Option A from Notion ("care_less — offer options"): the agent built in 7 days, live free for 14, then kept for a monthly fee or switched off. "Start my free build" opens the offer sheet (`agent`), which asks where enquiries come in and how many a week.
- The capacity line reads from `CAPACITY` in `new11.js`. It stays general until Maks gives a real number; never put a made-up one there.
- Last screen: the question, the field, and one line ("Rather talk? Call Scout or book a call with Maks"), always shown so nothing jumps in later. The reply promise is gone until Maks confirms it.
- Footer is one slim line: the sign-off, a smaller like chip (thank-you floats above it for a few seconds after a tap), and "One email every two weeks →", which opens into the email field.

## Changed in /new11 (round 2, updated in place)
- Gate button fills with the italic amber (`--amber`) on hover, not the old orange.
- Desktop: "Say it once" pins on the left while the right column scrolls.
- The big agent card is gone. "Book a call with me" leads the section; under the client proof sits "Your first AI hire. Two weeks on us." with one email field (lead offer `agent`), for people not ready to call. `CAPACITY.perMonth` is 5.
- Booking pop-up (`#booking`) frames zcal's embed. zcal blocks framing of personal links (zcal.co/name/slug sends X-Frame-Options: DENY), so it uses the embed link `zcal.co/i/O0g63S4u` (`BOOKING_EMBED`); every book link points there too.
- Like chip carries its own words: "Liked the ride?" → "Thank you!" → heart + count.
- Footer list link: "Steal one fix every two weeks →".
- Own booking picker (`#bk`, `/api/booking`): free 30-minute slots from Maks's Google Calendar (Mon–Fri 10:00–18:00 Madrid, 12 h notice, 21 days ahead; set at the top of `app/api/booking/route.ts`), times shown in the visitor's zone, a short form, then a real event with a Meet link and Google's invite to the visitor. Needs `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` (optional `BOOKING_CALENDAR_ID`, default `primary`) in Vercel; without them the pop-up shows zcal. For local UI work, `BOOKING_MOCK=1` in `.env.development.local` serves sample slots and writes nothing (ignored in production).

## /new12: the designer's new film (2026-10-28)
- Source: NEW_MAIN_VIDEO.mp4 (37 s, 1080p). Re-cut to 34.5 s at 720p: the black frame after the ant hole (8.95–9.63 s) and the white flash before Scout's scene (16.6–17.45 s) became dissolves (0.35 s and 0.7 s). Files in `media/`: film-720.mp4 (13.6 MB) and film-540.mp4 (8.6 MB), CRF 28, keyframe every 8 frames for scrubbing; loop.mp4 is the film's first 2 s forward then back, so the idle loop hands over to the scroll without a jump; first.webp (poster) and last.webp.
- Scout faces the camera and waves from 16.4 to 17.3 s on the new cut. The hold is at 16.7 s (mid-wave); the card opens on the left (he's right of centre).
- Captions (film seconds): view 1.0–4.4 · takes 5.0–8.2 · jobs 9.2–13.4 · colony 13.6–15.6 · scout 15.8–16.7 · follow 17.5–19.9 · answers 20.3–22.4 · quotes 22.8–25.4 · unseen 25.8–28.6 · hq 31.0→. The three new ones fill the long ride behind Scout.
- Phones crop the 16:9 film; `FILM.focus` aims the crop at 62% while Scout is on screen, then back to centre.
- The film names the five teams itself, so the team chips under "Five teams. One conversation." show on phones only.
- Sound layers are timed to film moments (uAt), not fixed scroll positions.
- Includes the Scout live-chat safeguards from branch care-less-scout-v12 (inactive while SCOUT_MODE is preview).
- Narrow screens (aspect ≤ 4:3): the idle hero (poster + loop) pans 50% → 0% (sunset) → 100% → 50% on a 36 s sine curve (`@keyframes pan`). The first scroll pauses it (`.film.still`), and the film starts from that exact object-position (`panFrom`), easing to its own framing by ~7 s (the ant hill). Back at the top the pan resumes where it stopped.
- Last screen: LAST_VIDEO.mp4 (pool at sunset, 5 s loop, 832×464) as `media/final-loop.mp4` + `final-first.webp`; pans the same way on narrow screens (40 s cycle).
