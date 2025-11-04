# 🎮 Game Designer Portfolio - Modern Playful Design

A vibrant, interactive portfolio with a modern hybrid design featuring floating project cards, macOS-inspired aesthetics, and stunning animations. Perfect for game designers who want to showcase their work in a unique and memorable way.

## 🚀 Features

- **Modern Hybrid Layout**: Seamless scrolling sections with floating card animations
- **macOS-Inspired Cards**: Floating project cards with colored window controls (red, yellow, green)
- **Interactive Modal Windows**: Click cards to view detailed project information
- **4-Color Button Animations**: Beautiful expanding circle ripple effects with Turquoise → Purple → Pink → Orange
- **Marquee Scrollers**: Animated text banners between sections
- **Mouse-Tracking Background**: Dynamic pattern that follows cursor on Projects section
- **Playful Color Palette**: Vibrant Turquoise, Purple, Pink, Orange with Deep Purple and Cream
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Performance Optimized**: Smooth animations with reduced motion support

## 🎨 Color Palette

```css
--color-base-dark: #2F1664;         /* Deep Purple - Main text/headings */
--color-base-light: #F9F4F2;        /* Cream - Backgrounds/light sections */

--color-accent-turquoise: #4ECDC4;  /* Mint/Turquoise */
--color-accent-purple: #7B68EE;     /* Purple */
--color-accent-pink: #FF6B9D;       /* Pink/Coral */
--color-accent-orange: #FFB088;     /* Orange/Peach */
```

## 📁 Project Structure

```
portfolio/
├── index.html                 # Main HTML file
├── css/
│   ├── fonts.css              # Custom font declarations
│   ├── variables.css          # All customizable variables (colors, spacing, fonts)
│   ├── base.css              # Base styles and resets
│   ├── layout/
│   │   ├── grid.css          # Flexible grid system
│   │   └── modern.css        # Modern hybrid layout
│   ├── components/
│   │   ├── navigation.css    # Navigation bar
│   │   ├── window.css        # Modal window styles
│   │   ├── section.css       # Section layouts & project cards
│   │   ├── hero.css          # Hero section
│   │   ├── marquee.css       # Animated marquee scrollers
│   │   ├── decorations.css   # Decorative elements
│   │   └── button-animations.css  # 4-color button ripple effect
│   └── utilities/
│       ├── spacing.css       # Margin and padding utilities
│       └── typography.css    # Text utilities
├── js/
│   ├── modules/
│   │   ├── config.js         # Configuration settings
│   │   ├── modalManager.js   # Modal window interactions
│   │   ├── cursorFollower.js # Cursor-based animations
│   │   ├── backgroundFollower.js  # Mouse-tracking background
│   │   └── animations.js     # Animation effects
│   └── main.js               # Main application entry
└── assets/
    ├── images/               # Your images
    ├── videos/               # Your videos
    └── fonts/                # Custom fonts
```

## 🎯 Key Components

### 1. Floating Project Cards

Project cards feature:
- **macOS colored circles** (red, yellow, green) in titlebar
- **Floating animation** with staggered delays
- **Eye icon hover effect** with brightness increase
- **Varied heights** for visual interest
- **Click to open** detailed modal window

### 2. Modal Windows

Clicking a project card opens a centered modal with:
- Full project details
- Video trailer embed
- Contributions breakdown
- Technology tags
- Brand/partner logos

### 3. Button Animations

All buttons feature a stunning 4-color expanding circle effect:
- **Circle 1**: Turquoise (starts at 0s)
- **Circle 2**: Purple (starts at 0.15s)
- **Circle 3**: Pink (starts at 0.3s)
- **Circle 4**: Orange (starts at 0.45s)
- Total duration: **1.25 seconds**
- Creates beautiful color overlap effect

### 4. Marquee Scrollers

Animated text banners between sections:
- **Double marquees** after Hero and Projects sections
- **Alternating directions** for visual variety
- **Customizable speed** (slow, normal, fast)
- **Cream and Dark variants**

### 5. Interactive Backgrounds

- **Projects Section**: Pattern background that follows mouse movement
- **Contact Section**: Rotating color wheel (roulette) with 4 accent colors
- Creates engaging, dynamic visual effects

## 📝 Adding Content

### Adding a New Project Card

1. Open `index.html`
2. Find the Projects Section (`<section id="projects">`)
3. Add this template inside `.projects-grid`:

```html
<article class="project-card" data-project="yourgame">
    <div class="project-card__titlebar">
        <div class="macos-dots">
            <span class="macos-dot macos-dot--red"></span>
            <span class="macos-dot macos-dot--yellow"></span>
            <span class="macos-dot macos-dot--green"></span>
        </div>
    </div>
    <div class="project-card__image">
        <div class="media-placeholder media-placeholder--image">GAME NAME</div>
    </div>
    <div class="project-card__content">
        <h3 class="project-card__title">Your Game Title</h3>
        <div class="project-card__platforms">
            <span class="platform-badge platform-badge--small">Platform</span>
        </div>
        <p class="project-card__description">Brief game description</p>
        <div class="project-card__tags">
            <span class="tag">Unity</span>
            <span class="tag">C#</span>
        </div>
        <button class="btn btn--primary btn--sm project-card__btn" data-open-window="yourgame">
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            View Details
        </button>
    </div>
</article>
```

### Adding a Modal Window for Your Project

After the Projects Section, add a modal window:

```html
<div class="modal-overlay" data-modal="yourgame">
    <section class="window window--project window--modal" data-window="yourgame">
        <div class="window__titlebar">
            <span class="window__title">Your Game.exe</span>
            <div class="window__controls">
                <button class="window__control window__control--close" data-close-modal="yourgame">×</button>
            </div>
        </div>
        <div class="window__content">
            <!-- Your project details here -->
        </div>
    </section>
</div>
```

See `PROJECT_TEMPLATE.md` for complete modal template.

### Adding Buttons with Animations

Always include 4 circle spans inside buttons:

```html
<a href="#section" class="btn btn--primary">
    <span class="btn__circle"></span>
    <span class="btn__circle"></span>
    <span class="btn__circle"></span>
    <span class="btn__circle"></span>
    Button Text
</a>
```

### Adding Marquee Scrollers

```html
<div class="marquee">
    <div class="marquee__content">
        <span class="marquee__item">Skill 1</span>
        <span class="marquee__item">Skill 2</span>
        <span class="marquee__item">Skill 3</span>
        <!-- Repeat items 3-4x for seamless loop -->
    </div>
</div>
```

Modifiers:
- `.marquee--reverse` - Scrolls right to left
- `.marquee--slow` - Slower animation
- `.marquee--fast` - Faster animation
- `.marquee--narrow` - Less vertical padding
- `.marquee--cream` - Cream background with dark text

## 🎨 Customization

### Change Colors

Edit `css/variables.css`:

```css
:root {
    --color-base-dark: #YOUR_COLOR;
    --color-base-light: #YOUR_COLOR;
    --color-accent-turquoise: #YOUR_COLOR;
    --color-accent-purple: #YOUR_COLOR;
    --color-accent-pink: #YOUR_COLOR;
    --color-accent-orange: #YOUR_COLOR;
}
```

### Adjust Card Heights

Edit `css/components/section.css`:

```css
.project-card:nth-child(1) { min-height: 520px; }
.project-card:nth-child(2) { min-height: 580px; }
.project-card:nth-child(3) { min-height: 550px; }
```

### Modify Button Animation Speed

Edit `css/components/button-animations.css`:

```css
.btn__circle {
    transition: width 0.8s ease; /* Change 0.8s to your preferred duration */
}
```

Change delays for circle start timing:
```css
.btn:hover .btn__circle:nth-child(1) { transition-delay: 0s; }
.btn:hover .btn__circle:nth-child(2) { transition-delay: 0.15s; }
.btn:hover .btn__circle:nth-child(3) { transition-delay: 0.3s; }
.btn:hover .btn__circle:nth-child(4) { transition-delay: 0.45s; }
```

### Change Marquee Speed

Edit `css/components/marquee.css`:

```css
.marquee__content {
    animation: marquee 30s linear infinite; /* Change 30s to adjust speed */
}
```

## ⚙️ Configuration (js/modules/config.js)

```javascript
const CONFIG = {
    animations: {
        enabled: true,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    },
    modal: {
        closeOnOverlayClick: true,
        animationDuration: 300,
    },
    backgroundFollower: {
        sensitivity: 0.05,
        smoothing: 0.1,
    },
};
```

## 📱 Responsive Behavior

- **Desktop (>1024px)**: Full floating cards grid, mouse tracking, all animations
- **Tablet (768px-1024px)**: 2 column grid, simplified animations
- **Mobile (<768px)**: Single column, cards stack vertically, reduced animations

## 🚀 Performance Tips

1. **Optimize images** - Use WebP format, compress before upload
2. **Lazy loading** - Already implemented for images
3. **Reduce motion** - Automatically detected via `prefers-reduced-motion`
4. **Modal efficiency** - Modals load on demand when clicked

## 📦 Deployment

1. Update personal info in `index.html`
2. Replace placeholder images/videos
3. Update meta tags for SEO
4. Test on multiple devices
5. Upload to web server maintaining directory structure

## 🛠️ Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 📄 Files Guide

- **README.md** - This file, overview and setup
- **CUSTOMIZATION_GUIDE.md** - Quick customization reference
- **PROJECT_TEMPLATE.md** - Template for adding new projects
- **THEME_SWITCHING.md** - (Legacy) Theme information

## 🎮 Perfect For

- Game Designers
- Game Developers
- Creative Portfolios
- Interactive Resumes
- Anyone who wants a playful, memorable portfolio

## 📄 License

Free to use for personal and commercial projects.

---

**Let's make something amazing! 🎮✨**
