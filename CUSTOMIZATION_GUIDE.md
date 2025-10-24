# 🎨 Quick Customization Guide

This guide shows you exactly where to edit to customize your portfolio.

## 🎯 Most Common Customizations

### 1. Change Colors (5 minutes)

**File**: `css/variables.css` (lines 7-30)

```css
/* Your brand colors */
--color-primary: #0078d7;           /* Change this to your primary color */
--color-secondary: #f7630c;         /* Change this to your accent color */
--color-bg-desktop: #3a6ea5;        /* Desktop background color */
```

**Quick color palettes for game designers**:

**Energetic/Action Games**:
```css
--color-primary: #ff4654;           /* Red */
--color-secondary: #ffd93d;         /* Yellow */
--color-bg-desktop: #2d2d2d;        /* Dark gray */
```

**Adventure/Fantasy**:
```css
--color-primary: #6b4de0;           /* Purple */
--color-secondary: #4de0b6;         /* Teal */
--color-bg-desktop: #1a1a3e;        /* Deep blue */
```

**Retro/Casual**:
```css
--color-primary: #ff6b9d;           /* Pink */
--color-secondary: #c449c2;         /* Magenta */
--color-bg-desktop: #4a5568;        /* Slate */
```

### 2. Change Fonts (3 minutes)

**File**: `css/variables.css` (lines 70-72)

```css
--font-primary: 'Segoe UI', Tahoma, sans-serif;
--font-heading: 'Segoe UI', Arial, sans-serif;
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

**Don't forget to add the font link in `index.html`**:
```html
<head>
    ...
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    ...
</head>
```

### 3. Adjust Spacing (2 minutes)

**File**: `css/variables.css` (lines 50-58)

Make everything tighter or more spacious:

```css
/* Tight spacing (compact design) */
--space-xs: 0.125rem;   /* 2px */
--space-sm: 0.25rem;    /* 4px */
--space-md: 0.5rem;     /* 8px */
--space-lg: 1rem;       /* 16px */

/* Loose spacing (airy design) */
--space-xs: 0.5rem;     /* 8px */
--space-sm: 1rem;       /* 16px */
--space-md: 2rem;       /* 32px */
--space-lg: 3rem;       /* 48px */
```

### 4. Change Grid Columns (1 minute)

**File**: `index.html`

Change `data-grid-columns` attribute:

```html
<!-- Projects section - 3 columns -->
<div class="content-grid" data-grid-columns="3">

<!-- Change to 2 columns -->
<div class="content-grid" data-grid-columns="2">

<!-- Change to 4 columns -->
<div class="content-grid" data-grid-columns="4">
```

### 5. Modify Window Sizes

**File**: `css/variables.css` (lines 144-152)

```css
--window-width-sm: 400px;    /* Small window */
--window-width-md: 600px;    /* Medium window */
--window-width-lg: 800px;    /* Large window */
--window-width-xl: 1000px;   /* Extra large window */
```

## 📝 Content Updates

### Update Hero Section

**File**: `index.html` (lines 45-55)

```html
<div class="hero">
    <h1 class="hero__title">YOUR NAME</h1>
    <p class="hero__subtitle">Game Designer | Developer | Creator</p>
    <div class="hero__cta">
        <button class="btn btn--primary">View My Work</button>
        <button class="btn btn--secondary">Contact Me</button>
    </div>
</div>
```

### Add Your Projects

**File**: `index.html` (lines 100+)

Replace placeholder cards with your projects:

```html
<article class="card card--project">
    <div class="card__media">
        <img src="assets/images/project1.jpg" alt="Project Name">
    </div>
    <div class="card__content">
        <h3 class="card__title">Game Title Here</h3>
        <p class="card__description">Brief description of your game, your role, and key achievements.</p>
        <div class="card__tags">
            <span class="tag">Unity</span>
            <span class="tag">C#</span>
            <span class="tag">Multiplayer</span>
        </div>
    </div>
</article>
```

### Add Your Skills

**File**: `index.html` (Skills Window section)

```html
<div class="card card--skill">
    <h3>Game Design</h3>
    <ul>
        <li>Level Design</li>
        <li>Game Mechanics</li>
        <li>Systems Design</li>
        <li>Player Psychology</li>
    </ul>
</div>
```

### Update Contact Info

**File**: `index.html` (Contact Window section)

```html
<div class="contact-links">
    <a href="mailto:your@email.com" class="contact-link">
        📧 your@email.com
    </a>
    <a href="https://linkedin.com/in/yourprofile" class="contact-link">
        💼 LinkedIn Profile
    </a>
    <a href="https://twitter.com/yourhandle" class="contact-link">
        🐦 @yourhandle
    </a>
</div>
```

## 🎬 Adding Media

### Add an Image

1. Place image in `assets/images/`
2. Reference in HTML:

```html
<img src="assets/images/your-image.jpg" alt="Description">
```

### Add a Video

1. Place video in `assets/videos/`
2. Reference in HTML:

```html
<video src="assets/videos/gameplay.mp4" controls></video>
```

### Add a YouTube/Vimeo Video

```html
<div class="video-container">
    <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/VIDEO_ID"
        frameborder="0"
        allowfullscreen>
    </iframe>
</div>
```

## 🔧 Behavior Settings

### Disable Window Dragging

**File**: `js/modules/config.js` (line 9)

```javascript
enableDragging: false,
```

### Change Animation Speed

**File**: `js/modules/config.js` (line 18)

```javascript
duration: 300,  // Change to 150 for faster, 500 for slower
```

### Disable Particle Effects

**File**: `js/modules/config.js` (line 21)

```javascript
particles: {
    enabled: false,
},
```

### Change Taskbar Time Format

**File**: `js/modules/config.js` (line 28)

```javascript
timeFormat: '12h',  // or '24h'
```

## 🎨 Advanced Styling

### Add a Background Pattern

**File**: `css/layout/windows7.css` (line 9)

```css
.desktop {
    background: var(--color-bg-desktop);
    background-image:
        url('data:image/svg+xml,...'), /* Add your pattern */
        linear-gradient(135deg, #2b5876 0%, #4e7ba5 100%);
}
```

### Customize Card Hover Effects

**File**: `css/components/card.css` (line 13)

```css
.card:hover {
    box-shadow: var(--shadow-xl);     /* Make shadow bigger */
    transform: translateY(-4px);      /* Lift higher */
    border-color: var(--color-secondary); /* Different border color */
}
```

### Change Window Titlebar Style

**File**: `css/components/window.css` (line 37)

```css
.window__titlebar {
    background: var(--color-primary);  /* Solid color instead of gradient */
    color: white;
}
```

## 📱 Mobile Customization

### Adjust Mobile Breakpoints

**File**: `css/variables.css` (lines 161-166)

```css
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop */
```

### Modify Mobile Spacing

**File**: `css/layout/windows7.css` (media query section)

```css
@media (max-width: 768px) {
    .desktop__content {
        padding: var(--space-sm);  /* Less padding on mobile */
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
- Check if you're editing the right variable name

**Grid not working?**
- Verify `data-grid-columns` attribute is set
- Check for typos in class names

**JavaScript not working?**
- Open browser console (F12) for error messages
- Ensure all script files are properly linked in HTML

**Images not showing?**
- Check file paths are correct
- Verify images are in `assets/images/` folder

---

**Need more help?** Check the main README.md file for detailed documentation!
