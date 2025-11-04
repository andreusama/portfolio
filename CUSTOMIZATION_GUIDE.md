# 🎨 Quick Customization Guide

This guide shows you exactly where to edit to customize your portfolio.

## 🎯 Most Common Customizations

### 1. Change Colors (5 minutes)

**File**: `css/variables.css` (lines 7-18)

```css
/* Base Colors */
--color-base-dark: #2F1664;         /* Deep Purple - Main text/headings */
--color-base-light: #F9F4F2;        /* Cream - Backgrounds/light sections */

/* Accent Colors */
--color-accent-turquoise: #4ECDC4;  /* Mint/Turquoise */
--color-accent-purple: #7B68EE;     /* Purple */
--color-accent-pink: #FF6B9D;       /* Pink/Coral */
--color-accent-orange: #FFB088;     /* Orange/Peach */
```

**Quick color palettes for game designers**:

**Energetic/Action Games**:
```css
--color-base-dark: #1a1a1a;         /* Deep Black */
--color-base-light: #f5f5f5;        /* Off White */
--color-accent-turquoise: #00ffff;  /* Cyan */
--color-accent-purple: #ff00ff;     /* Magenta */
--color-accent-pink: #ff4654;       /* Red */
--color-accent-orange: #ffd93d;     /* Yellow */
```

**Adventure/Fantasy**:
```css
--color-base-dark: #1a1a3e;         /* Deep Blue */
--color-base-light: #e8e0d5;        /* Parchment */
--color-accent-turquoise: #4de0b6;  /* Teal */
--color-accent-purple: #6b4de0;     /* Royal Purple */
--color-accent-pink: #e04da7;       /* Magenta Pink */
--color-accent-orange: #e09a4d;     /* Gold */
```

**Retro/Casual**:
```css
--color-base-dark: #2d2d2d;         /* Dark Gray */
--color-base-light: #fffdf7;        /* Cream White */
--color-accent-turquoise: #39d9b1;  /* Mint */
--color-accent-purple: #a78bfa;     /* Lavender */
--color-accent-pink: #ff6b9d;       /* Bubblegum */
--color-accent-orange: #ffa07a;     /* Coral */
```

### 2. Change Fonts (3 minutes)

**File**: `css/variables.css` (lines 66-68)

```css
--font-primary: 'LT Avocado', 'Segoe UI', sans-serif;
--font-heading: 'LT Avocado', 'Segoe UI', sans-serif;
```

**Recommended game designer fonts**:
```css
/* Modern & Clean */
--font-primary: 'Inter', 'Helvetica Neue', sans-serif;
--font-heading: 'Montserrat', 'Arial Black', sans-serif;

/* Playful & Fun */
--font-primary: 'Poppins', 'Verdana', sans-serif;
--font-heading: 'Fredoka One', 'Impact', sans-serif;

/* Tech/Sci-fi */
--font-primary: 'Roboto', sans-serif;
--font-heading: 'Orbitron', 'Arial', sans-serif;
```

**Add font link in `index.html` head**:
```html
<head>
    ...
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    ...
</head>
```

### 3. Adjust Spacing (2 minutes)

**File**: `css/variables.css` (lines 54-62)

```css
/* Default spacing */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
--space-4xl: 6rem;      /* 96px */
```

### 4. Button Animation Speed (2 minutes)

**File**: `css/components/button-animations.css`

Change expansion duration:
```css
.btn__circle {
    transition: width 0.8s ease; /* Change 0.8s to 0.5s for faster, 1.2s for slower */
}
```

Change delay between circles:
```css
.btn:hover .btn__circle:nth-child(1) { transition-delay: 0s; }
.btn:hover .btn__circle:nth-child(2) { transition-delay: 0.15s; } /* Change 0.15s */
.btn:hover .btn__circle:nth-child(3) { transition-delay: 0.3s; }  /* Change 0.3s */
.btn:hover .btn__circle:nth-child(4) { transition-delay: 0.45s; } /* Change 0.45s */
```

### 5. Project Card Heights (1 minute)

**File**: `css/components/section.css` (search for `.project-card:nth-child`)

```css
.project-card:nth-child(1) { min-height: 520px; } /* Adjust height */
.project-card:nth-child(2) { min-height: 580px; }
.project-card:nth-child(3) { min-height: 550px; }
```

### 6. Floating Animation Speed (2 minutes)

**File**: `css/components/section.css`

```css
@keyframes cardFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); } /* Change -8px to -12px for more movement */
}

.project-card {
    animation: cardFloat 4s ease-in-out infinite; /* Change 4s for speed */
}
```

### 7. Marquee Speed (1 minute)

**File**: `css/components/marquee.css`

```css
.marquee__content {
    animation: marquee 30s linear infinite; /* Change 30s (higher = slower) */
}

.marquee--slow .marquee__content {
    animation-duration: 45s; /* Adjust slow variant */
}

.marquee--fast .marquee__content {
    animation-duration: 20s; /* Adjust fast variant */
}
```

## 📝 Content Updates

### Update Hero Section

**File**: `index.html` (lines 46-63)

```html
<div class="hero__content">
    <h1 class="hero__title">
        <span class="hero__greeting">Hi, I'm</span>
        <span class="hero__name">YOUR NAME</span>
    </h1>
    <p class="hero__subtitle">Game Designer & Developer</p>
    <p class="hero__description">Your bio here</p>
    <div class="hero__cta">
        <a href="#projects" class="btn btn--primary">
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            View My Work
        </a>
    </div>
</div>
```

### Add Your Projects

**File**: `index.html` (Projects Section, around line 213)

1. Add project card:
```html
<article class="project-card" data-project="mygame">
    <div class="project-card__titlebar">
        <div class="macos-dots">
            <span class="macos-dot macos-dot--red"></span>
            <span class="macos-dot macos-dot--yellow"></span>
            <span class="macos-dot macos-dot--green"></span>
        </div>
    </div>
    <div class="project-card__image">
        <div class="media-placeholder">MY GAME</div>
    </div>
    <div class="project-card__content">
        <h3 class="project-card__title">Game Title</h3>
        <div class="project-card__platforms">
            <span class="platform-badge platform-badge--small">PC</span>
        </div>
        <p class="project-card__description">Brief description</p>
        <div class="project-card__tags">
            <span class="tag">Unity</span>
            <span class="tag">C#</span>
        </div>
        <button class="btn btn--primary btn--sm" data-open-window="mygame">
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            <span class="btn__circle"></span>
            View Details
        </button>
    </div>
</article>
```

2. Add corresponding modal window (see PROJECT_TEMPLATE.md)

### Customize Marquee Content

**File**: `index.html` (search for `.marquee`)

```html
<div class="marquee">
    <div class="marquee__content">
        <span class="marquee__item">YOUR SKILL 1</span>
        <span class="marquee__item">YOUR SKILL 2</span>
        <span class="marquee__item">YOUR SKILL 3</span>
        <!-- Repeat items 3-4 times for seamless scrolling -->
    </div>
</div>
```

### Update Contact Info

**File**: `index.html` (Contact Section, around line 737)

```html
<a href="mailto:your@email.com" class="contact-link">
    <span class="contact-link__icon">📧</span>
    <span class="contact-link__text">your@email.com</span>
</a>
<a href="https://linkedin.com/in/yourprofile" class="contact-link">
    <span class="contact-link__icon">💼</span>
    <span class="contact-link__text">LinkedIn Profile</span>
</a>
```

## 🎨 Advanced Styling

### macOS Circles Color Customization

**File**: `css/components/section.css` (search for `.macos-dot`)

```css
.macos-dot--red { background: #FF5F57; }    /* Change red */
.macos-dot--yellow { background: #FFBD2E; } /* Change yellow */
.macos-dot--green { background: #28CA42; }  /* Change green */
```

### Card Hover Effect Intensity

**File**: `css/components/section.css`

```css
.project-card:hover .project-card__image {
    filter: brightness(1.15); /* Change 1.15 to 1.3 for more brightness */
}

.project-card:hover .project-card__image::before {
    opacity: 1; /* Eye icon - change to 0.8 for semi-transparent */
}
```

### Background Pattern Sensitivity

**File**: `js/main.js` (around line 30)

```javascript
window.backgroundFollower = new BackgroundFollower({
    sensitivity: 0.05,  // Change to 0.1 for faster movement
    smoothing: 0.1,     // Change to 0.2 for smoother transitions
    selector: '.section--projects'
});
```

### Rotating Roulette Speed (Contact Section)

**File**: `css/components/section.css` (search for `@keyframes rotate`)

```css
@keyframes rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

.section--contact::before {
    animation: rotate 20s linear infinite; /* Change 20s for speed */
}
```

## 🎬 Adding Media

### Add an Image to Project Card

1. Place image in `assets/images/`
2. Replace placeholder:

```html
<div class="project-card__image">
    <img src="assets/images/your-game.jpg" alt="Game Name">
</div>
```

### Add Video Trailer to Modal

**YouTube**:
```html
<div class="project-video__container">
    <iframe
        src="https://www.youtube.com/embed/VIDEO_ID"
        allowfullscreen>
    </iframe>
</div>
```

**Self-hosted**:
```html
<div class="project-video__container">
    <video controls>
        <source src="assets/videos/trailer.mp4" type="video/mp4">
    </video>
</div>
```

## 🔧 Behavior Settings

### Disable Floating Animation

**File**: `css/components/section.css`

```css
.project-card {
    /* animation: cardFloat 4s ease-in-out infinite; */ /* Comment this out */
}
```

### Disable Mouse-Following Background

**File**: `js/main.js`

```javascript
// window.backgroundFollower = new BackgroundFollower({ /* Comment out */
```

### Change Modal Animation Speed

**File**: `js/modules/config.js`

```javascript
modal: {
    animationDuration: 300,  // Change to 150 for faster, 500 for slower
}
```

## 📱 Mobile Customization

### Adjust Mobile Card Width

**File**: `css/components/section.css` (media query section)

```css
@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr; /* Always single column on mobile */
    }
}
```

### Mobile Marquee Speed

**File**: `css/components/marquee.css` (media query)

```css
@media (max-width: 768px) {
    .marquee__content {
        animation-duration: 25s; /* Faster on mobile */
    }
}
```

## 🚀 Quick Tips

1. **Always test in browser** after making changes
2. **Use browser DevTools** (F12) to experiment with CSS live
3. **Keep backups** before major changes
4. **Use Ctrl+Shift+R** to hard refresh and see changes
5. **Check mobile view** using DevTools device emulator

## 🎯 Common Issues

**Colors not changing?**
- Clear browser cache (Ctrl+Shift+R)
- Check if you're editing the right CSS variable

**Button circles not animating?**
- Ensure all 4 `<span class="btn__circle"></span>` are inside button
- Check transitions aren't disabled

**Cards not floating?**
- Verify animation isn't commented out
- Check `prefers-reduced-motion` isn't enabled in OS

**Marquee not scrolling?**
- Check content is duplicated 3-4 times
- Verify animation isn't paused

**Modal not opening?**
- Ensure `data-project` on card matches `data-modal` on overlay
- Check JavaScript is loading (F12 console)

**Images not showing?**
- Verify file paths are correct
- Check images are in `assets/images/` folder

---

**Need more help?** Check the main README.md file for detailed documentation!
