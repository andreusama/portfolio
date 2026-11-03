# Job-search portfolio: spec

Source: the job-search guide (3 Nov 2026) and the grilling session of the same day. Terms are defined in `GLOSSARY.md`.

## Decisions

- Headline (single, all channels): "Ingeniero de software full stack · Python/Django y TypeScript/React · experiencia en gameplay y tiempo real". English first, Spanish second.
- Location shown: Lleida. Contact says open to work, available from January 2027 (IRTA contract ends 31 Dec 2026).
- The Landing shows two Hero windows. Left: Software entry (short VibeComposer clip). Right: Games entry (Hot Wheels loop). Mobile stacks them, Software first.
- Direct links: `?version=software` and `?version=games` open an Entry directly. Language: `?lang=es` plus an EN/ES toggle, English default.
- Games entry content already exists (current `casual-games` data) and is kept.
- Software entry Flagship projects, in order: VibeComposer, Precision irrigation (product and program names withheld), Estalvia. Each one has its own section with windows and clips.
- Old `cpp-programming` and `freelance-tech` versions, backups and `LegacyContent/` are hidden, not deleted: moved to `archive/` and removed from `availableVersions`. No history rewrite, no force-push.
- Footer year 2026; GitHub link filled; personal phone number removed from the public CV PDFs.
- CVs: Google Docs is the source of truth; only the finished PDFs (no phone) go in `assets/cv/`.
- Petoons dates: Oct 2023 – Jan 2026, title "Unity Developer", first bullet "led the porting department".

## Build steps

Status: all done and live, except the Spanish files in step 1.

1. Data: create `software.en.json`, `games.en.json` from the current data; Spanish files follow.
2. Loader: `?version=` (done, untested on the live site), add `?lang=`, default Landing when no parameter.
3. Hero: make the two existing windows (`index.html`, `#hero`) clickable Entries; replace the hero copy.
4. Software entry content: three Case studies; asset `assets/software/precision-irrigation-map.jpg` is already cropped.
5. Contact and footer updates.
6. Archive old versions.
7. Check every asset path resolves for each Entry and language, run locally, then ask before pushing.

## Not in this repo

- Security checks of VibeComposer (`api/claude.js`) and Estalvia (git history), run by the owner with the prepared prompts.
- Both CVs (blocked on Google Docs access or pasted text), LinkedIn headline, GitHub bio and pinned repos.

## Honest caveats

- The "140+ hours" translation figure is an estimate (43,300 words at 300 words/hour) and must say "estimated".
- The map-optimization bullet has no measured number yet.
