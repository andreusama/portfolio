# Asset Organization Structure

This document lists all the asset paths referenced in your JSON files. Create these folders and add your media files following this structure.

## Folder Structure

```
assets/
├── casualGames/
│   ├── FeaturedProjects/
│   ├── SideProjects/
│   ├── Skills/
│   └── PersonalPhotos/
├── cppProgramming/
│   ├── FeaturedProjects/
│   ├── SideProjects/
│   ├── Skills/
│   └── PersonalPhotos/
└── freelanceTech/
    ├── FeaturedProjects/
    ├── SideProjects/
    ├── Skills/
    └── PersonalPhotos/
```

---

## Casual Games Portfolio

### Featured Projects (`assets/casualGames/FeaturedProjects/`)
- `hotwheels-thumbnail.jpg` - Thumbnail for Hot Wheels project card
- `hotwheels-brand-logo.png` - Hot Wheels brand logo for modal
- `mattel-logo.png` - Mattel logo for modals
- `pjmasks-thumbnail.jpg` - Thumbnail for PJ Masks project card
- `pjmasks-brand-logo.png` - PJ Masks brand logo for modal
- `monsterhigh-thumbnail.jpg` - Thumbnail for Monster High project card
- `monsterhigh-brand-logo.png` - Monster High brand logo for modal

### Side Projects (`assets/casualGames/SideProjects/`)
- `student1-thumbnail.jpg`
- `student2-thumbnail.jpg`
- `student3-thumbnail.jpg`
- `student4-thumbnail.jpg`
- `student5-thumbnail.jpg`

### Skills (`assets/casualGames/Skills/`)
- `game-design-icon.png`
- `programming-icon.png`
- `platforms-tools-icon.png`

### Personal Photos (`assets/casualGames/PersonalPhotos/`)
- `role-president.jpg`
- `role-sales.jpg`
- `role-creative.jpg`
- `role-developer.jpg`

---

## C++ Programming Portfolio

### Featured Projects (`assets/cppProgramming/FeaturedProjects/`)
- `custom-engine-thumbnail.jpg` - Custom game engine thumbnail
- `graphics-renderer-thumbnail.jpg` - Graphics renderer thumbnail
- `physics-engine-thumbnail.jpg` - Physics engine thumbnail

### Side Projects (`assets/cppProgramming/SideProjects/`)
- `raytracer-thumbnail.jpg`
- `pathtracer-thumbnail.jpg`
- `voxel-engine-thumbnail.jpg`
- `ecs-framework-thumbnail.jpg`
- `memory-allocator-thumbnail.jpg`

### Skills (`assets/cppProgramming/Skills/`)
- `systems-programming-icon.png`
- `graphics-programming-icon.png`
- `tools-platforms-icon.png`

### Personal Photos (`assets/cppProgramming/PersonalPhotos/`)
- `role-engine-programmer.jpg`
- `role-graphics-programmer.jpg`
- `role-technical-architect.jpg`
- `role-performance-engineer.jpg`

---

## Freelance Tech Solutions Portfolio

### Featured Projects (`assets/freelanceTech/FeaturedProjects/`)
- `web-app-thumbnail.jpg` - Web application thumbnail
- `game-tool-thumbnail.jpg` - Unity tool thumbnail
- `data-dashboard-thumbnail.jpg` - Dashboard thumbnail

### Side Projects (`assets/freelanceTech/SideProjects/`)
- `portfolio-builder-thumbnail.jpg`
- `game-jam-tool-thumbnail.jpg`
- `automation-scripts-thumbnail.jpg`
- `api-wrapper-thumbnail.jpg`
- `mobile-app-thumbnail.jpg`

### Skills (`assets/freelanceTech/Skills/`)
- `web-development-icon.png`
- `game-development-icon.png`
- `consulting-solutions-icon.png`

### Personal Photos (`assets/freelanceTech/PersonalPhotos/`)
- `role-fullstack-developer.jpg`
- `role-technical-consultant.jpg`
- `role-project-manager.jpg`
- `role-solutions-architect.jpg`

---

## Image Recommendations

### Thumbnails (Project Cards)
- **Format**: JPG or PNG
- **Dimensions**: 800x450px (16:9 aspect ratio)
- **File Size**: <200KB
- **Content**: Screenshot of game/project, or key visual

### Brand Logos
- **Format**: PNG with transparency
- **Dimensions**: 200x80px (or proportional)
- **File Size**: <50KB
- **Content**: Brand logo on transparent background

### Skill Icons
- **Format**: PNG with transparency
- **Dimensions**: 128x128px
- **File Size**: <30KB
- **Content**: Simple icon representing the skill

### Personal Photos
- **Format**: JPG
- **Dimensions**: 400x500px (portrait orientation)
- **File Size**: <150KB
- **Content**: Professional photos in different contexts/roles

---

## Video Content (Optional)

For project modals, you can add YouTube video URLs in the JSON:

```json
"videoType": "youtube",
"videoSrc": "https://www.youtube.com/embed/YOUR_VIDEO_ID"
```

Or leave empty to show placeholder:
```json
"videoType": "youtube",
"videoSrc": "",
"videoPlaceholder": "🎬 GAME TRAILER VIDEO"
```

---

## Quick Setup Script (Bash)

Run this to create all folders:

```bash
cd D:\Fork\portfolio\assets

# Casual Games
mkdir -p casualGames/{FeaturedProjects,SideProjects,Skills,PersonalPhotos}

# C++ Programming
mkdir -p cppProgramming/{FeaturedProjects,SideProjects,Skills,PersonalPhotos}

# Freelance Tech
mkdir -p freelanceTech/{FeaturedProjects,SideProjects,Skills,PersonalPhotos}
```

---

## Notes

1. **Placeholders Show When Missing**: If an image file doesn't exist, the placeholder emoji/text will show instead
2. **Add Images Gradually**: Start with featured projects, then add others as needed
3. **Use Consistent Naming**: Follow the naming convention in this document
4. **Optimize Images**: Compress images before adding to improve load times
5. **Test Locally**: Check http://localhost:3000 after adding images

---

**Total Assets Needed**: ~60 image files across all 3 portfolios
