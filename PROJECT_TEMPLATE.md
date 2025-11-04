# 🎮 Project Template - Floating Cards + Modal Windows

This guide shows you how to add new game projects to your portfolio. Each project needs TWO parts: a floating card and a detailed modal window.

## 📋 Quick Start

1. **Copy Part 1** (Project Card) - Add to Projects Section
2. **Copy Part 2** (Modal Window) - Add after Projects Section
3. **Replace** PLACEHOLDER text with your content
4. **Add** media (images, videos, logos)
5. **Save** and refresh!

---

## 🎯 Part 1: Project Card (Grid Display)

### Where to Add
**File**: `index.html`
**Location**: Inside `<div class="projects-grid">` (around line 213)
**Position**: After existing project cards

### Complete Card Template

```html
<!-- YOUR GAME NAME Project Card -->
<article class="project-card" data-project="yourgameid">
    <!-- macOS Titlebar with colored circles -->
    <div class="project-card__titlebar">
        <div class="macos-dots">
            <span class="macos-dot macos-dot--red"></span>
            <span class="macos-dot macos-dot--yellow"></span>
            <span class="macos-dot macos-dot--green"></span>
        </div>
    </div>

    <!-- Game Image/Thumbnail -->
    <div class="project-card__image">
        <!-- OPTION 1: Placeholder (while developing) -->
        <div class="media-placeholder media-placeholder--image">YOUR GAME NAME</div>

        <!-- OPTION 2: Actual Image (when ready) -->
        <!-- <img src="assets/images/your-game.jpg" alt="Your Game Name"> -->
    </div>

    <!-- Card Content -->
    <div class="project-card__content">
        <h3 class="project-card__title">Your Game Name</h3>

        <!-- Platform Badges -->
        <div class="project-card__platforms">
            <span class="platform-badge platform-badge--small">PC</span>
            <span class="platform-badge platform-badge--small">PlayStation 5</span>
            <!-- Add/remove platforms as needed -->
        </div>

        <!-- Brief Description (2-3 sentences) -->
        <p class="project-card__description">
            Brief, engaging description of your game. Mention genre, your role, and key features.
        </p>

        <!-- Technology Tags -->
        <div class="project-card__tags">
            <span class="tag">Unity</span>
            <span class="tag">C#</span>
            <span class="tag">Multiplayer</span>
            <!-- Add relevant tags -->
        </div>

        <!-- View Details Button (with 4 circles for animation) -->
        <button class="btn btn--primary btn--sm project-card__btn" data-open-window="yourgameid">
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            View Details
        </button>
    </div>
</article>
```

---

## 🪟 Part 2: Modal Window (Detailed View)

### Where to Add
**File**: `index.html`
**Location**: After the Projects Section (around line 347)
**Position**: After existing modal overlays

### Complete Modal Template

```html
<!-- YOUR GAME NAME Modal Window -->
<div class="modal-overlay" data-modal="yourgameid">
    <section class="window window--project window--modal" data-window="yourgameid">

        <!-- Window Titlebar -->
        <div class="window__titlebar">
            <span class="window__title">Your Game Name.exe</span>
            <div class="window__controls">
                <button class="window__control window__control--close" data-close-modal="yourgameid">×</button>
            </div>
        </div>

        <!-- Window Content -->
        <div class="window__content">

            <!-- Project Header -->
            <div class="project-header">
                <h1 class="project-header__title">Your Game Name</h1>
                <div class="project-header__platforms">
                    <span class="platform-badge">PC</span>
                    <span class="platform-badge">PlayStation 4</span>
                    <span class="platform-badge">PlayStation 5</span>
                    <span class="platform-badge">Xbox One</span>
                    <span class="platform-badge">Xbox Series X|S</span>
                    <span class="platform-badge">Nintendo Switch</span>
                    <!-- Add/remove platforms -->
                </div>
            </div>

            <!-- Trailer Video -->
            <div class="project-video">
                <div class="project-video__container">

                    <!-- OPTION 1: YouTube Video (RECOMMENDED) -->
                    <iframe
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                        allowfullscreen>
                    </iframe>

                    <!-- OPTION 2: Vimeo Video -->
                    <!-- <iframe
                        src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
                        allowfullscreen>
                    </iframe> -->

                    <!-- OPTION 3: Self-hosted Video -->
                    <!-- <video controls>
                        <source src="assets/videos/your-trailer.mp4" type="video/mp4">
                    </video> -->

                    <!-- OPTION 4: Placeholder (while getting video) -->
                    <!-- <div class="project-video__placeholder">
                        🎬 GAME TRAILER VIDEO
                    </div> -->

                </div>
            </div>

            <!-- Project Info Grid (2 columns) -->
            <div class="project-info">

                <!-- LEFT COLUMN: Your Contributions -->
                <div class="project-responsibilities">
                    <h2 class="project-responsibilities__title">My Contributions</h2>

                    <!-- Category 1: Gameplay Programming -->
                    <h3 class="project-responsibilities__subtitle">Gameplay Programming</h3>
                    <ul class="project-responsibilities__list">
                        <li>Implemented core combat mechanics and player controls</li>
                        <li>Developed enemy AI behavior systems</li>
                        <li>Created progression and leveling systems</li>
                        <li>Built checkpoint and save/load functionality</li>
                    </ul>

                    <!-- Category 2: UI Development -->
                    <h3 class="project-responsibilities__subtitle">UI Development</h3>
                    <ul class="project-responsibilities__list">
                        <li>Designed and coded main menu system</li>
                        <li>Created in-game HUD and health/stamina displays</li>
                        <li>Implemented inventory and equipment UI</li>
                    </ul>

                    <!-- Category 3: Systems Design (ADD MORE AS NEEDED) -->
                    <h3 class="project-responsibilities__subtitle">Systems Design</h3>
                    <ul class="project-responsibilities__list">
                        <li>Architected upgrade and skill tree system</li>
                        <li>Balanced gameplay difficulty and pacing</li>
                    </ul>

                    <!-- Add more categories as needed -->
                </div>

                <!-- RIGHT COLUMN: Project Details Sidebar -->
                <div class="project-details">

                    <!-- Role Box -->
                    <div class="project-detail-box">
                        <h3 class="project-detail-box__title">Role</h3>
                        <div class="project-detail-box__content">
                            <p>Game Designer / Gameplay Programmer</p>
                        </div>
                    </div>

                    <!-- Technologies Box -->
                    <div class="project-detail-box">
                        <h3 class="project-detail-box__title">Technologies</h3>
                        <div class="project-detail-box__content">
                            <div class="project-tech-tags">
                                <span class="tech-tag">Unity</span>
                                <span class="tech-tag">C#</span>
                                <span class="tech-tag">Photon</span>
                                <span class="tech-tag">Addressables</span>
                                <!-- Add technologies used -->
                            </div>
                        </div>
                    </div>

                    <!-- Timeline Box -->
                    <div class="project-detail-box">
                        <h3 class="project-detail-box__title">Timeline</h3>
                        <div class="project-detail-box__content">
                            <p>2023 - 2024 (12 months)</p>
                        </div>
                    </div>

                    <!-- OPTIONAL: Team Size Box -->
                    <!-- <div class="project-detail-box">
                        <h3 class="project-detail-box__title">Team Size</h3>
                        <div class="project-detail-box__content">
                            <p>15 developers</p>
                        </div>
                    </div> -->

                </div>
            </div>

            <!-- Brand Logos -->
            <div class="project-brands">
                <h2 class="project-brands__title">Partners & Publishers</h2>
                <div class="project-brands__grid">

                    <!-- Brand/Publisher Logo 1 -->
                    <div class="brand-logo">
                        <!-- OPTION 1: Actual logo image -->
                        <img src="assets/images/brands/company-logo.png" alt="Company Name">

                        <!-- OPTION 2: Placeholder while getting logo -->
                        <!-- <div class="brand-logo__placeholder">COMPANY LOGO</div> -->
                    </div>

                    <!-- Brand/Publisher Logo 2 -->
                    <div class="brand-logo">
                        <img src="assets/images/brands/publisher-logo.png" alt="Publisher Name">
                    </div>

                    <!-- Add more logos as needed -->
                </div>
            </div>

        </div>
    </section>
</div>
```

---

## ⚠️ IMPORTANT: Matching IDs

The `data-project` and `data-modal` attributes **MUST match** for the modal to open correctly:

```html
<!-- Card -->
<article class="project-card" data-project="yourgameid">
    <button data-open-window="yourgameid">...</button>
</article>

<!-- Modal -->
<div class="modal-overlay" data-modal="yourgameid">
    <section data-window="yourgameid">
        <button data-close-modal="yourgameid">×</button>
    </section>
</div>
```

All three must use the **same unique ID** (e.g., `yourgameid`).

---

## 🎨 Customization Options

### Platform Badges

**Small badges** (for card):
```html
<span class="platform-badge platform-badge--small">PC</span>
```

**Regular badges** (for modal):
```html
<span class="platform-badge">PlayStation 5</span>
```

Common platforms:
- PC / Steam
- PlayStation 4 / PlayStation 5
- Xbox One / Xbox Series X|S
- Nintendo Switch
- iOS / Android
- Mobile / Web / VR

### Technology Tags

```html
<!-- Card (2-3 tags) -->
<div class="project-card__tags">
    <span class="tag">Unity</span>
    <span class="tag">C#</span>
</div>

<!-- Modal (all technologies) -->
<div class="project-tech-tags">
    <span class="tech-tag">Unity</span>
    <span class="tech-tag">C#</span>
    <span class="tech-tag">Photon</span>
    <span class="tech-tag">Addressables</span>
</div>
```

Common tech tags:
- Unity / Unreal Engine / Godot
- C# / C++ / Python
- Photon / Mirror / Netcode
- PlayFab / AWS / Firebase
- Addressables / DOTS / ECS

### Contribution Categories

Common responsibility sections:
- **Gameplay Programming**
- **UI Development / UI Programming**
- **Multiplayer Systems / Networking**
- **Systems Design**
- **Optimization / Performance**
- **Tools Development**
- **Audio Integration**
- **Level Design**
- **Technical Art**

---

## 🎬 Adding Media

### YouTube Video

1. Go to your YouTube video
2. Click **Share** → **Embed**
3. Copy the video ID (the part after `embed/`)
4. Use in modal:

```html
<iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    allowfullscreen>
</iframe>
```

### Project Card Image

1. Save image to `assets/images/` (recommended: 600x400px, JPG/PNG/WebP)
2. Replace placeholder in card:

```html
<div class="project-card__image">
    <img src="assets/images/your-game-screenshot.jpg" alt="Your Game Name">
</div>
```

### Brand Logos

1. Save logos to `assets/images/brands/` (recommended: PNG with transparency, 300x100px)
2. Add to modal:

```html
<div class="brand-logo">
    <img src="assets/images/brands/company-logo.png" alt="Company Name">
</div>
```

---

## ✅ Project Addition Checklist

### Card (Part 1)
- [ ] Copy card template to `<div class="projects-grid">`
- [ ] Set unique `data-project="yourID"`
- [ ] Add game title
- [ ] Add platform badges
- [ ] Write brief description (2-3 sentences)
- [ ] Add technology tags
- [ ] Update button `data-open-window="yourID"`
- [ ] Add project image or keep placeholder

### Modal (Part 2)
- [ ] Copy modal template after Projects Section
- [ ] Match `data-modal="yourID"` to card ID
- [ ] Update window title
- [ ] Match close button `data-close-modal="yourID"`
- [ ] Add full game title
- [ ] Add platform badges
- [ ] Embed trailer video
- [ ] List all contributions by category
- [ ] Add role
- [ ] Add all technology tags
- [ ] Add timeline
- [ ] Add brand/publisher logos

### Testing
- [ ] Save `index.html`
- [ ] Refresh browser (Ctrl+Shift+R)
- [ ] Card appears in Projects grid
- [ ] Card has floating animation
- [ ] macOS circles are visible
- [ ] Eye icon appears on hover
- [ ] Button animation works (4 colors)
- [ ] Clicking card opens modal
- [ ] Modal content displays correctly
- [ ] Close button works
- [ ] Test on mobile view

---

## 🎯 Real Example

Here's the Hot Wheels project from the portfolio:

### Card (Part 1)
```html
<article class="project-card" data-project="hotwheels">
    <div class="project-card__titlebar">
        <div class="macos-dots">
            <span class="macos-dot macos-dot--red"></span>
            <span class="macos-dot macos-dot--yellow"></span>
            <span class="macos-dot macos-dot--green"></span>
        </div>
    </div>
    <div class="project-card__image">
        <div class="media-placeholder media-placeholder--image">HOT WHEELS</div>
    </div>
    <div class="project-card__content">
        <h3 class="project-card__title">Hot Wheels Xtreme Overdrive</h3>
        <div class="project-card__platforms">
            <span class="platform-badge platform-badge--small">Android Automotive</span>
        </div>
        <p class="project-card__description">High-speed racing game with multiplayer support and vehicle customization</p>
        <div class="project-card__tags">
            <span class="tag">Unity</span>
            <span class="tag">C#</span>
            <span class="tag">Photon</span>
        </div>
        <button class="btn btn--primary btn--sm project-card__btn" data-open-window="hotwheels">
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            View Details
        </button>
    </div>
</article>
```

### Modal (Part 2) - See existing code in `index.html` starting at line 349

---

## 🚀 Pro Tips

1. **Keep card descriptions brief** - Save details for the modal
2. **Use high-quality images** - First impressions matter
3. **Compress media** - Keep page loading fast
4. **YouTube for videos** - Faster than self-hosted
5. **Update regularly** - Keep portfolio fresh with latest work
6. **Test responsively** - Check on mobile and tablet

---

## 🆘 Troubleshooting

**Card not appearing?**
- Check you added it inside `<div class="projects-grid">`
- Verify HTML tags are closed properly

**Modal not opening?**
- Ensure `data-project`, `data-open-window`, and `data-modal` all match
- Check browser console (F12) for JavaScript errors

**Button animation not working?**
- Verify all 4 `<span class="btn__circle"></span>` are present
- Check button has class `btn btn--primary`

**Images broken?**
- Verify image file paths are correct
- Ensure images are in `assets/images/` folder
- Check image file names match exactly (case-sensitive)

**macOS circles missing?**
- Ensure `.macos-dots` div is in card titlebar
- Check all 3 dot spans are present

---

Need more examples? Check the existing 3 projects (Hot Wheels, PJ Masks, Monster High) in `index.html`!
