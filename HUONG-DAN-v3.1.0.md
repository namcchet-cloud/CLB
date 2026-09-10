# CLB v3.1.0 - Music polish

This build keeps the v3 architecture and refines only the music corner.

Changes:
- album sleeve + exposed vinyl proportions rebalanced; mobile uses horizontal album shelf
- album 1 artwork cropped to remove white outer corners
- turntable rebuilt visually: platter, strobe ring, spindle, tonearm base/tube/headshell/needle, power LED, speed switch, knob
- record and platter use a JS spin engine with smooth acceleration/deceleration instead of abrupt CSS animation
- tonearm lowers/moves in after a record is loaded and moves further during playback
- floating comic music notes only appear during playback
- v3.1.0 cache/build keys synchronized

Replace these files in the current v3 repository:
- index.html
- style.css
- music.css
- script.js
- js/music-v3.js

content.js and assets remain unchanged.
