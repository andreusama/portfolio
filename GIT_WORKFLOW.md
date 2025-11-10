# Git Workflow Guide - Multi-CV Portfolio

## Overview

This portfolio uses a **data-driven architecture** to maintain 3 separate CV versions without merge conflicts. Content is stored in JSON files while the HTML structure and JavaScript remain shared.

## Branch Structure

```
main (template + all shared code)
├── casual-games (uses casual-games.json)
├── cpp-programming (uses cpp-programming.json)
└── freelance-tech (uses freelance-tech.json)
```

##Files That Differ Between Branches

Only **ONE** file differs per branch:
- `data/config.json` - Points to the appropriate JSON content file

All other files are **identical** across all branches.

## Initial Setup

### 1. Commit Current State to Main

```bash
git add .
git commit -m "Convert to data-driven architecture with content loader"
git push origin main
```

### 2. Create Content Branches

```bash
# Create casual-games branch (default content)
git checkout -b casual-games
git push -u origin casual-games

# Create cpp-programming branch
git checkout -b cpp-programming

# Edit data/config.json to point to cpp-programming.json
# Change line: "dataFile": "data/cpp-programming.json"

git add data/config.json
git commit -m "Configure for C++ programming portfolio"
git push -u origin cpp-programming

# Create freelance-tech branch
git checkout -b freelance-tech

# Edit data/config.json to point to freelance-tech.json
# Change line: "dataFile": "data/freelance-tech.json"

git add data/config.json
git commit -m "Configure for freelance tech solutions portfolio"
git push -u origin freelance-tech

# Return to main
git checkout main
```

## Daily Workflow

### Scenario 1: Updating Shared Code/Structure (CSS, JS, HTML Structure)

**Work in `main` branch** and merge to all content branches:

```bash
# 1. Make changes in main
git checkout main

# 2. Edit CSS, JS, or HTML template
# (Do NOT edit JSON content files)

# 3. Commit changes
git add .
git commit -m "Update navigation styling"
git push origin main

# 4. Merge to all content branches
git checkout casual-games
git merge main  # ✅ No conflicts! config.json untouched
git push origin casual-games

git checkout cpp-programming
git merge main  # ✅ No conflicts!
git push origin cpp-programming

git checkout freelance-tech
git merge main  # ✅ No conflicts!
git push origin freelance-tech

# 5. Return to main
git checkout main
```

### Scenario 2: Updating Content for One Portfolio Version

**Work directly in the content branch**:

```bash
# 1. Switch to the specific branch
git checkout casual-games

# 2. Edit the JSON content file
# Edit data/casual-games.json

# 3. Commit changes
git add data/casual-games.json
git commit -m "Update Hot Wheels project description"
git push origin casual-games

# 4. Return to main
git checkout main
```

### Scenario 3: Updating Content for ALL Versions

If you want to update the same section across all versions:

```bash
# 1. Update in main (affects all)
git checkout main

# Edit all three JSON files
# - data/casual-games.json
# - data/cpp-programming.json
# - data/freelance-tech.json

git add data/*.json
git commit -m "Update contact email across all versions"
git push origin main

# 2. Merge to all branches
git checkout casual-games && git merge main && git push
git checkout cpp-programming && git merge main && git push
git checkout freelance-tech && git merge main && git push
git checkout main
```

## Deployment

### Option 1: Separate URLs (Recommended)

Deploy each branch to its own URL:

```
casual.yoursite.com    → casual-games branch
cpp.yoursite.com        → cpp-programming branch
freelance.yoursite.com  → freelance-tech branch
```

### Option 2: Subdirectories

```
yoursite.com/casual/     → casual-games branch
yoursite.com/cpp/        → cpp-programming branch
yoursite.com/freelance/  → freelance-tech branch
```

### Option 3: Query Parameter (Single Deployment)

Deploy `main` branch and use URL parameters:

```
yoursite.com/?version=casual-games
yoursite.com/?version=cpp-programming
yoursite.com/?version=freelance-tech
```

**Modify** `js/modules/contentLoader.js` to check URL params:

```javascript
async loadConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get('version');

    const response = await fetch('data/config.json');
    this.config = await response.json();

    // Override with URL parameter if provided
    if (version && this.config.availableVersions[version]) {
        this.config.dataFile = this.config.availableVersions[version].dataFile;
    }
}
```

## Testing Locally

### Test Specific Version

1. **Edit** `data/config.json` temporarily:
```json
{
  "version": "cpp-programming",
  "dataFile": "data/cpp-programming.json",
  ...
}
```

2. **Open** `index.html` in browser

3. **Verify** content loads from correct JSON file

4. **Revert** config.json changes (or don't commit)

### Test All Versions

```bash
# Test casual-games
git checkout casual-games
# Open index.html in browser

# Test cpp-programming
git checkout cpp-programming
# Open index.html in browser

# Test freelance-tech
git checkout freelance-tech
# Open index.html in browser
```

## Content Management

### Adding a New Project

1. Switch to appropriate branch:
```bash
git checkout casual-games
```

2. Edit JSON file (`data/casual-games.json`):
```json
{
  "featuredProjects": {
    "projects": [
      {
        "id": "new-project",
        "title": "New Game Title",
        "tags": ["Unity", "C#"],
        ...
      }
    ]
  }
}
```

3. Commit:
```bash
git add data/casual-games.json
git commit -m "Add new project: New Game Title"
git push
```

### Updating Skills or Other Sections

Edit the appropriate section in the JSON file. All sections follow the same pattern.

## Troubleshooting

### Content Not Loading

1. **Check browser console** (F12) for errors
2. **Verify** JSON syntax is valid (use JSONLint.com)
3. **Check** `data/config.json` points to correct file
4. **Verify** all `data-content` attributes in HTML match JSON structure

### Merge Conflicts

**Should NEVER happen** if you follow the workflow. If they do:

```bash
# Usually in config.json
git checkout --ours data/config.json  # Keep branch version
git add data/config.json
git commit -m "Resolve config merge conflict"
```

### Wrong Content Showing

1. **Check** which branch you're on: `git branch`
2. **Verify** `data/config.json` content
3. **Clear** browser cache (Ctrl+Shift+R)

## Quick Reference

### See Current Branch
```bash
git branch
```

### Switch Version
```bash
git checkout casual-games        # or cpp-programming or freelance-tech
```

### Update Structure (Main → All Branches)
```bash
git checkout main
# make changes
git add . && git commit -m "Update"
git checkout casual-games && git merge main && git push
git checkout cpp-programming && git merge main && git push
git checkout freelance-tech && git merge main && git push
git checkout main
```

### Update Content (Single Branch)
```bash
git checkout casual-games
# edit data/casual-games.json
git add . && git commit -m "Update content"
git push
git checkout main
```

## Architecture Benefits

✅ **Zero Merge Conflicts** - Structure and content are separated
✅ **Easy Maintenance** - Update once, deploy everywhere
✅ **Content Isolation** - Each version's content is independent
✅ **Clean Git History** - Clear separation of concerns
✅ **Fast Updates** - Change structure across all versions instantly

## Notes

- **Never** edit HTML content directly - always use JSON files
- **Always** work in `main` for structure/style changes
- **Always** work in content branches for portfolio-specific changes
- **Test** locally before pushing to production
- **Backup** your JSON files before major changes

---

**Happy Portfolio Managing! 🎮✨**
