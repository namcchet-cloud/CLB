# Verification - Comic Studio 2.3.0

## Scope

- 28 layout cases: 14 widths (320, 360, 375, 390, 414, 430, 600, 768, 800, 820, 1024, 1280, 1440, 1920), each in VI and EN.
- 26 desktop/runtime interaction checks.
- 12 additional touch, orientation, lifecycle, fallback and packaging checks.
- All listed assertions passed on the final tested build.

## Measured regression

The attached v2.1 archive rendered at a 390px mobile viewport expanded its layout to 448px. The final 2.3 render stays at 390px. Off-screen horizontal reveal transforms in the old source contribute to this overflow. The fix uses shrinkable tracks, bounded containers and non-hidden progressive reveals; it does not translate the whole page sideways.

## What was actually tested

Sources were loaded into Chromium using Playwright set_content. The environment blocks network navigation, including localhost, so these are local DOM rendering tests, not end-to-end HTTP or deployed-site tests. Local CSS and JavaScript were inlined in their deferred execution order. Images were embedded from matching local assets; external Google Fonts were omitted to test font fallbacks. Relative deployment paths were verified separately on disk.

Spotify transport tests used a mock implementing official-shaped ready/playback_started/playback_update events. They prove that the supplied code drives the visual motor and ignores stale controllers; they do NOT prove that Spotify allows real playback on a particular account/browser.

No real iPhone/Safari or Firefox test was performed. No authenticated Spotify or LRCLIB network test was performed. No commit or push was made. Published page content and the repository file listing were read through web tools; direct current source download failed, so source patches derive from the matching attached v2.1/v2.2 archives.

## Runtime interaction checks

- PASS: System reduced motion is respected
- PASS: Full mode explicitly overrides reduced OS preference
- PASS: Off mode stops the orbit
- PASS: Gentle mode is animated and explicitly selected
- PASS: Real desktop pointer tilts cards
- PASS: Hover settles smoothly back to neutral
- PASS: Off-screen orbit pauses
- PASS: Orbit resumes when brought on screen
- PASS: Mascot opens accessible card and emits comic particles
- PASS: Escape closes mascot
- PASS: Particles are removed after animation
- PASS: Mocked Spotify controller is ready
- PASS: playback_started spins disc without waiting for duration
- PASS: Arm uses a fixed pivot and eased movement
- PASS: Arm gently lands and stays down
- PASS: Pausing decelerates rather than snapping to 0
- PASS: Needle returns to its resting pivot
- PASS: Changing records retires stale controller events
- PASS: Pink record uses the supplied image and playlist
- PASS: Silent demo is clearly labelled
- PASS: English brand
- PASS: Vietnamese brand
- PASS: Both join links preserve provided form
- PASS: Gallery lightbox opens
- PASS: Gallery lightbox closes and unlocks scrolling
- PASS: Runtime has no uncaught module or page errors
- PASS: Mobile portrait is exactly viewport-wide
- PASS: Mobile menu opens
- PASS: Selecting a menu link closes the mobile menu
- PASS: Actual touch opens the mascot
- PASS: Mascot interaction does not expand mobile layout
- PASS: Orientation change preserves width
- PASS: Script and style agree on the new version
- PASS: Page restore clears the paused flag and resumes
- PASS: Missing animation APIs do not hide content or crash modules
- PASS: Every local asset referenced by index.html exists
- PASS: No separate motion.css or js/ dependency remains
- PASS: Content data is byte-for-byte preserved

## Preserved content

content.js is byte-for-byte identical across the supplied 2.1, 2.2 and full 2.3 packages. The patch ZIP does not include content.js or images, to avoid overwriting any later user edits. No font files are bundled.

Machine-readable results: ket-qua-kiem-thu.json.
