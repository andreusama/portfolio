# Multi-CV Portfolio Implementation Guide

Complete documentation of the data-driven, multi-CV portfolio system implementation.

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Git Workflow](#git-workflow)
3. [Content Management](#content-management)
4. [Asset Organization](#asset-organization)
5. [Video Integration](#video-integration)
6. [Brand Logos](#brand-logos)
7. [Adding New Projects](#adding-new-projects)
8. [Troubleshooting](#troubleshooting)

---

## System Architecture

### Overview
The portfolio uses a **data-driven architecture** where content is stored in JSON files, completely separated from the HTML structure and JavaScript functionality.

### Key Components

**Data Layer:**
- `data/config.json` - Specifies which content file to load
- `data/casual-games.json` - Casual games portfolio content
- `data/cpp-programming.json` - C++ programming portfolio content
- `data/freelance-tech.json` - Freelance tech solutions content

**Application Layer:**
- `js/modules/contentLoader.js` - Loads and populates content dynamically
- `js/modules/modalManager.js` - Handles project modals (pauses videos on close)
- `js/main.js` - Initializes content loader before other modules

**Template Layer:**
- `index.html` - Template with `data-content` attributes
- All CSS files - Shared styling across all versions
- All other JS modules - Shared functionality

### How It Works

1. **Page loads** → `main.js` initializes
2. **Content loader starts** → Reads `data/config.json`
3. **Loads appropriate JSON** → Based on config setting
4. **Populates template** → Injects content into HTML via `data-content` attributes
5. **Creates project modals** → Dynamically generates modal windows
6. **Initializes other modules** → Modal manager, animations, etc.

---

## Git Workflow

### Branch Structure

```
main (template + all shared code + all 3 JSON files)
├── casual-games (config points to casual-games.json)
├── cpp-programming (config points to cpp-programming.json)
└── freelance-tech (config points to freelance-tech.json)
```

### Files That Differ Between Branches

**Only ONE file should differ per branch:**
- `data/config.json` - Points to the appropriate JSON content file

**Example for casual-games branch:**
```json
{
  "version": "casual-games",
  "dataFile": "data/casual-games.json",
  ...
}
```

### Workflow: Updating Shared Code

When updating HTML structure, CSS, or JavaScript:

```bash
# 1. Work in main branch
git checkout main

# 2. Make changes (HTML, CSS, JS)
# Edit files...

# 3. Commit changes
git add .
git commit -m "Update navigation styling"
git push origin main

# 4. Merge to all content branches (ZERO CONFLICTS!)
git checkout casual-games && git merge main && git push
git checkout cpp-programming && git merge main && git push
git checkout freelance-tech && git merge main && git push
git checkout main
```

### Workflow: Updating Content

When updating portfolio-specific content:

```bash
# 1. Switch to specific branch
git checkout casual-games

# 2. Edit JSON file
# Edit data/casual-games.json

# 3. Commit changes
git add data/casual-games.json
git commit -m "Add new project: Dracamar"
git push origin casual-games

# 4. Return to main
git checkout main
```

---

## Content Management

### JSON Structure

Each portfolio JSON file contains:

```json
{
  "meta": { "title": "...", "description": "..." },
  "hero": { "greeting": "...", "headline": "...", "description": "..." },
  "marquees": { "skills1": [...], "skills2": [...], ... },
  "featuredProjects": {
    "sectionTitle": "...",
    "projects": [...]
  },
  "sideProjects": {
    "projects": [...]
  },
  "skills": { "skillsList": [...] },
  "thatsMe": { "roles": [...] },
  "contact": { ... },
  "footer": { ... }
}
```

### Featured Project Structure

```json
{
  "id": "project-id",
  "title": "Project Title",
  "tags": ["Unity", "C#", "Photon"],
  "mediaType": "video",
  "mediaSrc": "assets/casualGames/FeaturedProjects/videos/project.mp4",
  "mediaPlaceholder": "🎬 PROJECT TRAILER",
  "modal": {
    "title": "Full Project Title",
    "windowTitle": "Project.exe",
    "platforms": ["PC", "PlayStation 5", "Xbox"],
    "videoType": "video",
    "videoSrc": "assets/.../videos/project.mp4",
    "brands": [
      { "name": "Brand", "logo": "assets/.../logos/brand.png" }
    ],
    "contributions": [
      {
        "category": "Category Name",
        "items": ["Item 1", "Item 2"]
      }
    ],
    "role": "Role Name",
    "technologies": ["Tech1", "Tech2"],
    "timeline": "2023 - 6 months"
  }
}
```

### Side Project Structure

```json
{
  "id": "side-project-id",
  "title": "Project Title",
  "description": "Short description",
  "tags": ["Tag1", "Tag2"],
  "mediaType": "image",
  "mediaSrc": "assets/.../SideProjects/thumbnail.jpg",
  "mediaPlaceholder": "🎮 PROJECT",
  "modal": {
    "title": "Project Title",
    "windowTitle": "Project.exe",
    "videoType": "youtube",
    "videoSrc": "",
    "brands": [],
    "contributions": [
      {
        "category": "Project Details",
        "items": ["Description here"]
      }
    ],
    "role": "Developer",
    "technologies": ["Tech1", "Tech2"],
    "timeline": "Personal Project"
  }
}
```

---

## Asset Organization

### Folder Structure

```
assets/
├── casualGames/
│   ├── FeaturedProjects/
│   │   ├── videos/
│   │   │   ├── hotWheels.mp4
│   │   │   ├── pjMasks.mp4
│   │   │   ├── monsterHigh.mp4
│   │   │   └── dracamar.mp4
│   │   ├── logos/
│   │   │   ├── HotWheels/
│   │   │   ├── PJMasks/
│   │   │   ├── MonsterHigh/
│   │   │   └── Dracamar/
│   │   └── thumbnails/
│   ├── SideProjects/
│   │   ├── apigalypsis-thumbnail.jpg
│   │   ├── kofi-engine-thumbnail.jpg
│   │   ├── the-tower-thumbnail.jpg
│   │   ├── pengo-thumbnail.jpg
│   │   └── fire-fighters-thumbnail.jpg
│   ├── Skills/
│   │   ├── game-design-icon.png
│   │   ├── programming-icon.png
│   │   └── platforms-tools-icon.png
│   └── PersonalPhotos/
│       ├── role-president.jpg
│       ├── role-sales.jpg
│       ├── role-creative.jpg
│       └── role-developer.jpg
├── cppProgramming/
│   └── [same structure]
└── freelanceTech/
    └── [same structure]
```

### Asset Naming Conventions

- **Videos**: `projectName.mp4` (lowercase, camelCase)
- **Logos**: Descriptive names in brand-specific folders
- **Thumbnails**: `project-name-thumbnail.jpg` (lowercase, kebab-case)
- **Icons**: `skill-name-icon.png` (lowercase, kebab-case)
- **Photos**: `role-description.jpg` (lowercase, kebab-case)

---

## Video Integration

### Project Card Videos

Videos on project cards are **auto-playing, muted, and looping**:

```json
{
  "mediaType": "video",
  "mediaSrc": "assets/casualGames/FeaturedProjects/videos/project.mp4"
}
```

**Features:**
- Auto-plays when page loads
- Muted (required for autoplay)
- Loops continuously
- Uses first frame as poster
- `preload="auto"` for smooth playback

### Modal Videos

Videos in modals have **full player controls**:

```json
{
  "videoType": "video",
  "videoSrc": "assets/.../videos/project.mp4"
}
```

**Features:**
- Play/pause controls
- Volume control
- Fullscreen support
- Automatically pauses when modal closes
- Resets to beginning on close

### Video Types Supported

1. **Local MP4 Video:**
```json
{
  "videoType": "video",
  "videoSrc": "assets/.../video.mp4"
}
```

2. **YouTube Embed:**
```json
{
  "videoType": "youtube",
  "videoSrc": "https://www.youtube.com/embed/VIDEO_ID"
}
```

3. **No Video (Placeholder):**
```json
{
  "videoType": "youtube",
  "videoSrc": "",
  "videoPlaceholder": "🎬 COMING SOON"
}
```

### Video Specifications

**Project Card Videos:**
- Format: MP4
- Codec: H.264
- Recommended size: 4-20 MB
- Recommended length: 10-30 seconds
- Resolution: 1280x720 or higher

**Modal Videos:**
- Same as project cards
- Can be longer (30-90 seconds)
- Audio should be included

---

## Brand Logos

### Auto-Detection from Folders

Logos are organized in project-specific folders:

```
assets/casualGames/FeaturedProjects/logos/
├── HotWheels/
│   ├── [CITYPNG.COM]HD Hot Wheels Logo Transparent Background - 3000x3000.png
│   ├── [CITYPNG.COM]BMW White Logo HD PNG - 8000x8000.png
│   └── airConsole.png
├── PJMasks/
│   ├── PJ-Masks-logo-2.png
│   └── Hasbro_logo.svg.png
├── MonsterHigh/
│   ├── Monster-High-Logo-2010.png
│   └── Mattel_logo.svg.png
└── Dracamar/
    └── 3cat.png
```

### Logo Configuration

In JSON:

```json
"brands": [
  {
    "name": "Hot Wheels",
    "logo": "assets/casualGames/FeaturedProjects/logos/HotWheels/[CITYPNG.COM]HD Hot Wheels Logo Transparent Background - 3000x3000.png"
  },
  {
    "name": "BMW",
    "logo": "assets/casualGames/FeaturedProjects/logos/HotWheels/[CITYPNG.COM]BMW White Logo HD PNG - 8000x8000.png"
  }
]
```

### Logo Styling

Logos are automatically sized and styled:
- **Max height**: 60px
- **Max width**: 200px
- **Object-fit**: contain (maintains aspect ratio)
- **Background**: Light cream color
- **Border**: 2px dark purple
- **Border-radius**: 12px
- **Padding**: 0.5rem 1rem

### Logo Specifications

**Format**: PNG (with transparency preferred)
**Resolution**: High-res (1000px+ width recommended)
**File size**: <500KB per logo
**Background**: Transparent or white

---

## Adding New Projects

### Featured Project

1. **Add video file:**
```bash
# Place video in appropriate folder
assets/casualGames/FeaturedProjects/videos/new-project.mp4
```

2. **Add logos (optional):**
```bash
# Create folder and add logos
assets/casualGames/FeaturedProjects/logos/NewProject/
```

3. **Edit JSON:**
```bash
# Edit data/casual-games.json
# Add new project object to featuredProjects.projects array
```

4. **Test:**
```bash
# Refresh browser (Ctrl + Shift + R)
# Check project card appears
# Click "View Details" to test modal
```

### Side Project

1. **Add thumbnail:**
```bash
assets/casualGames/SideProjects/project-name-thumbnail.jpg
```

2. **Edit JSON:**
```bash
# Edit data/casual-games.json
# Add new project to sideProjects.projects array
```

3. **Test:**
```bash
# Refresh browser
# Check side project appears
# Click "View Details" to test modal
```

---

## Platform Display Format

Platforms are displayed with slashes in modals:

**Example:** `PC / PlayStation 4 / PlayStation 5 / Xbox One / Xbox Series X|S / Nintendo Switch`

```json
"platforms": ["PC", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "Nintendo Switch"]
```

The `contentLoader.js` automatically formats them with ` / ` separators.

---

## Troubleshooting

### Videos Not Playing

**Problem:** Videos don't appear on project cards

**Solutions:**
1. Hard refresh: `Ctrl + Shift + R`
2. Check video file path in JSON
3. Verify video file exists in folder
4. Check browser console (F12) for errors
5. Ensure `mediaType: "video"` is set

### Videos Keep Playing After Modal Close

**Problem:** Video audio continues after closing modal

**Solution:**
- Already fixed in `modalManager.js`
- Videos pause and reset on modal close
- Hard refresh if issue persists

### 404 Errors for Images

**Problem:** Console shows 404 errors for missing images

**Solutions:**
1. Check file path matches JSON exactly
2. Verify file exists in assets folder
3. Check file extension (.jpg vs .png)
4. Ensure case matches (case-sensitive on some systems)

### Logos Too Large

**Problem:** Brand logos display at full resolution

**Solution:**
- Already fixed with CSS constraints
- Max height: 60px, Max width: 200px
- Hard refresh to see changes

### Content Not Updating

**Problem:** Changes to JSON don't appear

**Solutions:**
1. Hard refresh: `Ctrl + Shift + R`
2. Check JSON syntax (use JSONLint.com)
3. Clear browser cache completely
4. Check browser console for JSON parse errors

### Merge Conflicts

**Problem:** Git merge conflicts when merging main to content branches

**Solution:**
- Should NEVER happen if workflow is followed correctly
- Only `data/config.json` should differ between branches
- If conflicts occur:
```bash
git checkout --ours data/config.json
git add data/config.json
git commit
```

---

## Testing Checklist

### Before Committing

- [ ] Hard refresh browser (`Ctrl + Shift + R`)
- [ ] All project cards load
- [ ] Videos autoplay on cards
- [ ] Project modals open correctly
- [ ] Modal videos play with controls
- [ ] Videos pause when modal closes
- [ ] Brand logos display correctly
- [ ] Side projects have modals
- [ ] No 404 errors in console
- [ ] No JavaScript errors in console

### Before Deploying

- [ ] Test all 3 portfolio versions
- [ ] Check responsive design (mobile/tablet)
- [ ] Verify all videos load
- [ ] Verify all images load
- [ ] Test modal functionality
- [ ] Test navigation
- [ ] Test contact form modal
- [ ] Check browser compatibility

---

## Current Portfolio Content

### Casual Games Featured Projects

1. **Hot Wheels Xtreme Overdrive**
   - Video: hotWheels.mp4
   - Logos: Hot Wheels, BMW, airConsole

2. **Dracamar**
   - Video: dracamar.mp4
   - Logo: 3Cat

3. **PJ Masks Power Heroes**
   - Video: pjMasks.mp4
   - Logos: PJ Masks, Hasbro

4. **Monster High Skulltimate Secrets**
   - Video: monsterHigh.mp4
   - Logos: Monster High, Mattel

### Casual Games Side Projects

1. **Apigalypsis** - Unity experiment on game feel
2. **Ko-Fi Engine** - C/C++ Low Level Programming
3. **The Tower** - Android Casual Clicker
4. **Pengo** - C/C++ Based Pengo Clone
5. **Fire Fighters** - Network Programming (TCP/UDP Multiplayer)

---

## Quick Reference Commands

### Local Development

```bash
# Start local server (required for JSON loading)
npx serve -p 3000

# Alternative
python -m http.server 3000
```

### Git Workflow

```bash
# Update shared code
git checkout main
# Make changes...
git add . && git commit -m "Update"
git checkout casual-games && git merge main && git push
git checkout cpp-programming && git merge main && git push
git checkout freelance-tech && git merge main && git push
git checkout main

# Update content for one version
git checkout casual-games
# Edit data/casual-games.json...
git add data/casual-games.json
git commit -m "Add new project"
git push
git checkout main
```

### File Operations

```bash
# Find all videos
find assets -name "*.mp4"

# Find all logos
find assets -name "*.png" -path "*/logos/*"

# Check JSON syntax
node -e "JSON.parse(require('fs').readFileSync('data/casual-games.json'))"
```

---

## File Reference

### Core Files

| File | Purpose | Shared/Variant |
|------|---------|----------------|
| `index.html` | Template with data attributes | Shared |
| `data/config.json` | Version selector | Variant |
| `data/casual-games.json` | Casual games content | Shared |
| `data/cpp-programming.json` | C++ content | Shared |
| `data/freelance-tech.json` | Freelance content | Shared |
| `js/modules/contentLoader.js` | Content population | Shared |
| `js/modules/modalManager.js` | Modal functionality | Shared |
| `js/main.js` | App initialization | Shared |
| All CSS files | Styling | Shared |

### Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Project overview |
| `CUSTOMIZATION_GUIDE.md` | Quick customization guide |
| `PROJECT_TEMPLATE.md` | Project template |
| `THEME_SWITCHING.md` | Theme information |
| `GIT_WORKFLOW.md` | Git branching strategy |
| `ASSET_PATHS.md` | Asset organization |
| `IMPLEMENTATION_GUIDE.md` | This file |

---

## Support & Resources

- **GitHub Issues**: [Report bugs/issues](https://github.com/your-repo/issues)
- **JSONLint**: [Validate JSON syntax](https://jsonlint.com/)
- **Can I Use**: [Check browser compatibility](https://caniuse.com/)
- **MDN Docs**: [Web development reference](https://developer.mozilla.org/)

---

**Last Updated:** 2024-11-10
**Version:** 1.0.0
**System Status:** ✅ Fully Operational
