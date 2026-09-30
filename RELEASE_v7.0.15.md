# CLB v7.0.15 — Spotify Fast Atomic Sync

- Cumulative upgrade from the currently deployed v7.0.11.
- Keeps Spotify as the master playback clock: the platter starts only after confirmed Spotify playback.
- Starts the first Spotify controller from the early head bootstrap and adopts it in Music instead of creating a second controller.
- Adds focused Spotify preconnects.
- Queues the first Play tap if readiness is finishing, avoiding a needless second press where browser policy permits API playback.
- Reduces the silent command/fallback wait from 1.8s to 1.2s.
- Keeps the native Spotify player as the direct-gesture fallback for Safari/iOS policy restrictions.
