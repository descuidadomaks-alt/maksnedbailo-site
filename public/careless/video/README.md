Founder-approved video clips belong here. No video is requested until configured.

For reliable reversible scrolling, convert each approved clip into a short WebP sequence:

    node scripts/prepare-careless-media.mjs coast public/careless/video/02-coast.mp4

The helper preserves the scene poster, creates up to 180 optimized frames in a versioned directory, and updates media.json. Commit/deploy those files together. The app never relies on repeated video.currentTime seeking. Reduced-motion uses posters. Use MEDIA-HANDOFF.md for scene mapping and release QA.
