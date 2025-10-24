# 🎮 Professional Project Window Template

This guide shows you how to add new professional game projects to your portfolio. Each project gets its own dedicated window with trailer video, contributions, and brand logos.

## 📋 Quick Start

1. **Copy the template** below
2. **Paste** it in `index.html` after line 165 (in the Professional Projects section)
3. **Replace** all PLACEHOLDER text with your actual content
4. **Add** your trailer video and brand logos
5. **Save** and refresh your browser!

---

## 🎯 Complete Project Template

```html
<!-- Professional Project: YOUR GAME NAME -->
<section class="window window--project" data-window="yourgame">
    <div class="window__titlebar">
        <span class="window__title">Your Game Name.exe</span>
        <div class="window__controls">
            <button class="window__control window__control--minimize">_</button>
            <button class="window__control window__control--maximize">□</button>
            <button class="window__control window__control--close">×</button>
        </div>
    </div>
    <div class="window__content">

        <!-- Project Header -->
        <div class="project-header">
            <h1 class="project-header__title">Your Game Name</h1>
            <div class="project-header__platforms">
                <span class="platform-badge">PC</span>
                <span class="platform-badge">PlayStation 5</span>
                <span class="platform-badge">Xbox Series X|S</span>
                <span class="platform-badge">Nintendo Switch</span>
                <!-- Add/remove platforms as needed -->
            </div>
        </div>

        <!-- Trailer Video -->
        <div class="project-video">
            <div class="project-video__container">

                <!-- OPTION 1: YouTube Video -->
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
                    <source src="assets/videos/your-game-trailer.mp4" type="video/mp4">
                </video> -->

                <!-- OPTION 4: Placeholder (while you get the video) -->
                <!-- <div class="project-video__placeholder">
                    🎬 GAME TRAILER VIDEO
                </div> -->

            </div>
        </div>

        <!-- Project Info Grid -->
        <div class="project-info">

            <!-- Responsibilities (LEFT COLUMN) -->
            <div class="project-responsibilities">
                <h2 class="project-responsibilities__title">My Contributions</h2>

                <h3 class="project-responsibilities__subtitle">Gameplay Programming</h3>
                <ul class="project-responsibilities__list">
                    <li>Implemented core combat mechanics and player controls</li>
                    <li>Developed AI behavior systems for NPCs</li>
                    <li>Created level progression and checkpoint systems</li>
                </ul>

                <h3 class="project-responsibilities__subtitle">UI Development</h3>
                <ul class="project-responsibilities__list">
                    <li>Designed and implemented main menu system</li>
                    <li>Created HUD and in-game interface elements</li>
                </ul>

                <h3 class="project-responsibilities__subtitle">Systems Design</h3>
                <ul class="project-responsibilities__list">
                    <li>Architected save/load system</li>
                    <li>Implemented achievement and progression tracking</li>
                </ul>

                <!-- ADD MORE SECTIONS AS NEEDED -->
            </div>

            <!-- Details Sidebar (RIGHT COLUMN) -->
            <div class="project-details">

                <!-- Role -->
                <div class="project-detail-box">
                    <h3 class="project-detail-box__title">Role</h3>
                    <div class="project-detail-box__content">
                        <p>Game Designer / Gameplay Programmer</p>
                    </div>
                </div>

                <!-- Technologies -->
                <div class="project-detail-box">
                    <h3 class="project-detail-box__title">Technologies</h3>
                    <div class="project-detail-box__content">
                        <div class="project-tech-tags">
                            <span class="tech-tag">Unity</span>
                            <span class="tech-tag">C#</span>
                            <span class="tech-tag">Photon</span>
                            <span class="tech-tag">PlayStation SDK</span>
                            <!-- Add/remove tech tags as needed -->
                        </div>
                    </div>
                </div>

                <!-- Timeline -->
                <div class="project-detail-box">
                    <h3 class="project-detail-box__title">Timeline</h3>
                    <div class="project-detail-box__content">
                        <p>2023 - 2024 (12 months)</p>
                    </div>
                </div>

                <!-- OPTIONAL: Add more detail boxes -->
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

                <!-- Brand 1 -->
                <div class="brand-logo">
                    <img src="assets/images/brands/brand1.png" alt="Brand Name">
                    <!-- While you don't have the logo yet:
                    <div class="brand-logo__placeholder">BRAND LOGO</div>
                    -->
                </div>

                <!-- Brand 2 -->
                <div class="brand-logo">
                    <img src="assets/images/brands/brand2.png" alt="Publisher Name">
                </div>

                <!-- Add more brands as needed -->

            </div>
        </div>

    </div>
</section>
```

---

## 🎨 Customization Options

### Platform Badges

Common platform badges you can use:

```html
<span class="platform-badge">PC</span>
<span class="platform-badge">Steam</span>
<span class="platform-badge">PlayStation 4</span>
<span class="platform-badge">PlayStation 5</span>
<span class="platform-badge">Xbox One</span>
<span class="platform-badge">Xbox Series X|S</span>
<span class="platform-badge">Nintendo Switch</span>
<span class="platform-badge">iOS</span>
<span class="platform-badge">Android</span>
<span class="platform-badge">Web</span>
<span class="platform-badge">VR</span>
```

### Technology Tags

Common tech tags:

```html
<span class="tech-tag">Unity</span>
<span class="tech-tag">Unreal Engine</span>
<span class="tech-tag">C#</span>
<span class="tech-tag">C++</span>
<span class="tech-tag">Python</span>
<span class="tech-tag">Photon</span>
<span class="tech-tag">Mirror</span>
<span class="tech-tag">PlayFab</span>
<span class="tech-tag">AWS</span>
<span class="tech-tag">Addressables</span>
<span class="tech-tag">DOTS</span>
```

### Responsibility Categories

Common sections:

- **Gameplay Programming**
- **UI Development** / **UI Programming**
- **Multiplayer Systems** / **Networking**
- **Systems Design**
- **Optimization** / **Performance**
- **Tools Development**
- **Audio Integration**
- **Level Design**
- **Game Design**
- **Technical Art**

---

## 🎬 Adding Videos

### YouTube Video

1. Go to your YouTube video
2. Click **Share** → **Embed**
3. Copy the video ID (the part after `embed/`)
4. Use:

```html
<iframe
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    allowfullscreen>
</iframe>
```

### Vimeo Video

1. Go to your Vimeo video
2. Click the **Share** button
3. Copy the video ID
4. Use:

```html
<iframe
    src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
    allowfullscreen>
</iframe>
```

### Self-Hosted Video

1. Place your video in `assets/videos/`
2. Use:

```html
<video controls>
    <source src="assets/videos/your-game.mp4" type="video/mp4">
</video>
```

---

## 🖼️ Adding Brand Logos

### Step 1: Add Logo Files

1. Save logo images in `assets/images/brands/`
2. Use PNG or SVG format
3. Recommended size: 300x100px or similar aspect ratio

### Step 2: Add to HTML

```html
<div class="brand-logo">
    <img src="assets/images/brands/company-name.png" alt="Company Name">
</div>
```

### Placeholder (temporary)

```html
<div class="brand-logo">
    <div class="brand-logo__placeholder">COMPANY LOGO</div>
</div>
```

---

## 🎯 Example: Complete Real Project

Here's a filled-in example:

```html
<!-- Professional Project: Cosmic Racer -->
<section class="window window--project" data-window="cosmicracer">
    <div class="window__titlebar">
        <span class="window__title">Cosmic Racer.exe</span>
        <div class="window__controls">
            <button class="window__control window__control--minimize">_</button>
            <button class="window__control window__control--maximize">□</button>
            <button class="window__control window__control--close">×</button>
        </div>
    </div>
    <div class="window__content">

        <div class="project-header">
            <h1 class="project-header__title">Cosmic Racer</h1>
            <div class="project-header__platforms">
                <span class="platform-badge">PC</span>
                <span class="platform-badge">PlayStation 5</span>
                <span class="platform-badge">Xbox Series X|S</span>
            </div>
        </div>

        <div class="project-video">
            <div class="project-video__container">
                <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    allowfullscreen>
                </iframe>
            </div>
        </div>

        <div class="project-info">
            <div class="project-responsibilities">
                <h2 class="project-responsibilities__title">My Contributions</h2>

                <h3 class="project-responsibilities__subtitle">Gameplay Programming</h3>
                <ul class="project-responsibilities__list">
                    <li>Implemented vehicle physics and handling systems</li>
                    <li>Created track hazards and power-up mechanics</li>
                    <li>Developed split-screen multiplayer mode</li>
                </ul>

                <h3 class="project-responsibilities__subtitle">UI Development</h3>
                <ul class="project-responsibilities__list">
                    <li>Designed and coded racing HUD with speedometer and lap timer</li>
                    <li>Created lobby and matchmaking interface</li>
                </ul>
            </div>

            <div class="project-details">
                <div class="project-detail-box">
                    <h3 class="project-detail-box__title">Role</h3>
                    <div class="project-detail-box__content">
                        <p>Senior Gameplay Programmer</p>
                    </div>
                </div>

                <div class="project-detail-box">
                    <h3 class="project-detail-box__title">Technologies</h3>
                    <div class="project-detail-box__content">
                        <div class="project-tech-tags">
                            <span class="tech-tag">Unreal Engine 5</span>
                            <span class="tech-tag">C++</span>
                            <span class="tech-tag">Blueprints</span>
                        </div>
                    </div>
                </div>

                <div class="project-detail-box">
                    <h3 class="project-detail-box__title">Timeline</h3>
                    <div class="project-detail-box__content">
                        <p>2023 - 2024 (18 months)</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="project-brands">
            <h2 class="project-brands__title">Partners & Publishers</h2>
            <div class="project-brands__grid">
                <div class="brand-logo">
                    <img src="assets/images/brands/studio.png" alt="Studio Name">
                </div>
                <div class="brand-logo">
                    <img src="assets/images/brands/publisher.png" alt="Publisher">
                </div>
            </div>
        </div>

    </div>
</section>
```

---

## 📍 Where to Add New Projects

In `index.html`, find this section (around line 166):

```html
<!-- ========================================
     PROFESSIONAL PROJECTS - Individual Windows
     ======================================== -->
```

Add your new project windows **here**, before the Skills Window section.

---

## 🎨 Styling Customization

All styles are in `css/components/project-window.css`. You can customize:

### Colors

```css
.project-responsibilities__title {
    color: var(--color-primary);  /* Change to any color */
    border-bottom: 2px solid var(--color-primary);
}
```

### Layout

```css
.project-info {
    grid-template-columns: 2fr 1fr;  /* Adjust column ratio */
}
```

### Spacing

```css
.project-header {
    margin-bottom: var(--space-3xl);  /* More/less space */
}
```

---

## ✅ Checklist for Adding a Project

- [ ] Copy the template
- [ ] Update `data-window="uniqueid"` (must be unique!)
- [ ] Update window title (e.g., "Your Game.exe")
- [ ] Add game name in header
- [ ] Add platform badges
- [ ] Add trailer video (YouTube/Vimeo/file)
- [ ] List your contributions (gameplay, UI, etc.)
- [ ] Add your role
- [ ] Add technology tags
- [ ] Add timeline/duration
- [ ] Add brand logos
- [ ] Test in browser!

---

## 🚀 Pro Tips

1. **Unique IDs**: Make sure `data-window="yourid"` is unique for each project
2. **Video Performance**: YouTube embeds are faster than self-hosted videos
3. **Logo Optimization**: Compress logo images to keep page fast
4. **Consistent Tone**: Keep responsibility descriptions in similar format
5. **Order Matters**: Put your best/most recent projects first

---

## 🆘 Troubleshooting

**Project window not showing?**
- Check that you closed all HTML tags properly
- Verify `data-window` ID is unique

**Video not loading?**
- Check video URL is correct
- Make sure it's a public video (not private)

**Taskbar button not appearing?**
- JavaScript auto-generates buttons
- Refresh the page (Ctrl+Shift+R)

**Styling looks wrong?**
- Clear browser cache
- Check `project-window.css` is linked in `index.html`

---

Need help? Check the examples in `index.html` (Hot Wheels, PJ Masks, Monster High)!
