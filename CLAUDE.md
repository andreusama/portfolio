# Portfolio: working context

Job-search portfolio. Static HTML/CSS/JS on Vercel, one page, driven by JSON. See `README.md` for layout and how to run it, and `GLOSSARY.md` for terms. Talk to the user in Spanish unless they write in English; site copy is in English.

## Rules from the owner

- **Never commit or push without approval.** Commit messages and PR bodies carry no mention of Claude and no co-author line.
- **Reuse the existing structure.** No new CSS or components when an existing one fits, and no change that breaks other pages. Test the Landing, both Entries and every project section after shared changes, at desktop and phone widths.
- **This repo and site are public, and the owner's IRTA work is under NDA.** Never publish screenshots or other non-public material from it. Describe the platform only from public sources (irridesk.com, the IRRILANDS factsheet, the SEGRE article; the site no longer links them), and what the owner did only in words. If unsure, ask.
- **Original design screenshots are not for the repo.** They live in a local-only folder under `assets/software/`, excluded through `.git/info/exclude`, which does not travel between machines. Re-add the exclusion before any `git add -A` if that folder is copied to a new PC.
- **Only verified claims.** Check numbers, stacks and features against the source repo. Don't invent figures. Show what the product does today, and say so when something is unfinished.
- Copy stays brief, visual and achievement-centred. Each Software project opens with a "Problem: … Solution: …" subtitle. The user writes the problem; the solution can be drafted.

## Site structure

- Software entry sections reuse the data keys: `featuredProjects` = VibeComposer, `sideProjects` = Precision irrigation, `skills` = Estalvia, and `expertise` = its own Skills & Expertise section, which Games doesn't use (Games uses `skills.skillsList`).
- The Landing shows Hero, a ribbon, My approach to the AI revolution (data key `approach` in `data/software.en.json`, reusing the That's Me windows) and Contact, with no ribbon before Contact.
- `generateCollageMedia` and `createProjectCollage` in `js/modules/contentLoader.js` render the windows.
- Precision irrigation has size overrides in `css/components/section.css`, scoped by `data-project`.
- On mobile (768 px and below) the navbar shows only Home. The full menu overflows between about 769 and 950 px; this is a known open issue.
- `?lang=es` loads `data/software.es.json` and `data/games.es.json`, which mirror the English files. Any copy change must be made in both. Interface labels live under `ui` in the data file (`uiText` in the loader, `data-ui` in `index.html`), with the English text as the default. Both languages share the same English CV PDFs.

## Git on a new machine

- Prior commits use `andreusama <andreusama@users.noreply.github.com>`. Check `git config user.name` and `user.email` first, so a work identity doesn't end up in public history.
- Vercel deploys `main` to production.

## Recording clips

Clips are mobile demos recorded with Playwright (Pixel 7 profile, DSF 2) using Chrome DevTools Protocol screencast frames, joined with the ffmpeg concat demuxer using the real frame timings. Browser extension automation can't produce a phone-sized window.

```bash
ffmpeg -i clip.mp4 -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -an clip.webm
ffmpeg -ss <t> -i clip.mp4 -frames:v 1 -q:v 4 clip-poster.jpg
```

- VibeComposer clips are 720×1280 (the default aspect). Estalvia clips are 390×844 viewports at 720×1558, so they set `"aspect": "720 / 1558"`.
- Estalvia demos run only on its demo database (`ESTALVIA_SQLITE=db.demo.sqlite3`). Never use the real database, `DATABASE_URL`, `.env` or its private data folder. Reload the demo before each take with `manage.py cargar_demo`, after confirming that Django points at the demo database.
- Keep VibeComposer's demo song intact: undo anything a take changes.

## State

- Done: Landing, Software and Games entries, and all three Software sections with media.
- "Match the bank" (Estalvia clip 2) shows older demo data with warnings. The owner chose to keep it.
- The supplier name in Estalvia's clips is real, and the owner is fine with it.
- Not done: Spanish CVs, hamburger menu, tablet navbar fix.
