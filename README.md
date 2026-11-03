# Portfolio

Personal portfolio of Andrés Sánchez, one site for two kinds of employer: software and games.

**Live:** https://portfolio-swart-kappa-75.vercel.app

| URL | Page |
| --- | --- |
| `/` | Landing, with one Hero window per Entry and the AI approach section |
| `/?version=software` | Software entry: VibeComposer, Precision irrigation, Estalvia |
| `/?version=games` | Games entry: shipped commercial titles and side projects |

Add `lang=es`, or click ES in the navbar, for the Spanish version.

## Run it

It is a static site with no build step. Serve the folder and open the page:

```bash
python3 -m http.server 8791
```

Then go to http://localhost:8791. Use Ctrl+Shift+R after changing CSS.

## Deploy

Vercel deploys `main` to production on every push, and other branches to preview URLs.

## How it is organised

- `index.html`: the single page. Sections are shown or hidden by view.
- `data/config.json`: available Entries and languages.
- `data/software.{en,es}.json`, `data/games.{en,es}.json`: all the content of each Entry, per language. Keep both languages in step.
- `js/modules/contentLoader.js`: reads the URL and the data, then renders the page.
- `css/`: styles. `css/components/section.css` holds the project windows.
- `assets/software/`: clips and screenshots of the Software entry. Each clip has `.mp4`, `.webm` and `-poster.jpg`.
- `assets/cv/`: the public CV PDFs.
- `archive/`, `LegacyContent/`: old versions, kept but not served by the current page.

## Add a project window

Software projects are drawn from `project.collage.columns` in the data file. A column is either a chapter heading or a list of windows:

```json
{ "heading": "1. What it does" }
```

```json
{
  "narrow": true,
  "maxWidth": 290,
  "y": 2,
  "items": [
    {
      "type": "clip",
      "title": "Check the paperwork",
      "caption": "Short description.",
      "src": "assets/software/estalvia/clip-review",
      "aspect": "720 / 1558",
      "main": true
    }
  ]
}
```

Window types are `clip`, `image`, `stat`, `icon`, `readme` and `placeholder`. `main: true` adds the "View Details" button that opens the modal. `aspect` is optional and defaults to `720 / 1280`.

## Documentation

- `GLOSSARY.md`: the words this project uses.
- `CLAUDE.md`: working rules and project state, for Claude Code and anyone maintaining the site.
- `docs/job-search-spec.md`: the decisions behind the current structure.

The other guides at the root (`GIT_WORKFLOW.md`, `IMPLEMENTATION_GUIDE.md`, `CUSTOMIZATION_GUIDE.md`, `PROJECT_TEMPLATE.md`, `ASSET_PATHS.md`, `THEME_SWITCHING.md`) describe the old multi-branch CV setup and are out of date.
