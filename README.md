# 🎮 Game Designer Portfolio - Windows 7 Style

A highly modular, interactive portfolio with a Windows 7-inspired design system. Perfect for game designers who want to showcase their work in a unique, professional, and colorful way.

## 🚀 Features

- **Windows 7 Aesthetic**: Professional, familiar interface with glassmorphic effects
- **Highly Modular Architecture**: Easy to customize every aspect
- **Interactive Windows**: Draggable, minimizable, maximizable, and closable windows
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Performance Optimized**: Lazy loading, reduced motion support, smooth animations
- **Easy Content Management**: Simple structure for adding projects, skills, and media

## 📁 Project Structure

```
portfolio/
├── index.html                 # Main HTML file
├── css/
│   ├── variables.css          # All customizable variables (colors, spacing, fonts)
│   ├── base.css              # Base styles and resets
│   ├── layout/
│   │   ├── grid.css          # Flexible grid system
│   │   └── windows7.css      # Desktop and taskbar layout
│   ├── components/
│   │   ├── navigation.css    # Navigation components
│   │   ├── window.css        # Window component styles
│   │   ├── card.css          # Project and skill cards
│   │   └── media.css         # Image and video components
│   └── utilities/
│       ├── spacing.css       # Margin and padding utilities
│       └── typography.css    # Text utilities
├── js/
│   ├── modules/
│   │   ├── config.js         # Configuration settings
│   │   ├── windowManager.js  # Window interactions
│   │   ├── taskbar.js        # Taskbar functionality
│   │   └── animations.js     # Animation effects
│   └── main.js               # Main application entry
└── assets/
    ├── images/               # Your images
    └── videos/               # Your videos
```

## 🎨 Customization Guide

### 1. Colors (css/variables.css)

Change the entire color scheme by editing these variables:

```css
--color-primary: #0078d7;        /* Main brand color */
--color-secondary: #f7630c;      /* Accent color */
--color-bg-desktop: #3a6ea5;     /* Desktop background */
--color-bg-window: #f0f0f0;      /* Window background */
```

### 2. Spacing (css/variables.css)

Adjust spacing throughout the site:

```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
```

### 3. Typography (css/variables.css)

Change fonts and sizes:

```css
--font-primary: 'Segoe UI', sans-serif;
--font-size-base: 1rem;
--font-size-xl: 1.5rem;
--line-height-normal: 1.5;
```

### 4. Grid System (css/layout/grid.css)

The grid system is flexible and controlled via data attributes:

```html
<!-- 2 columns -->
<div class="content-grid" data-grid-columns="2">

<!-- 3 columns -->
<div class="content-grid" data-grid-columns="3">

<!-- 4 columns -->
<div class="content-grid" data-grid-columns="4">
```

Span multiple columns:

```html
<div class="grid-item--span-2">Spans 2 columns</div>
<div class="grid-item--full">Spans all columns</div>
```

## 📝 Adding Content

### Adding a New Project

1. Open `index.html`
2. Find the Projects Window section
3. Copy this template:

```html
<article class="card card--project">
    <div class="card__media">
        <img src="assets/images/your-project.jpg" alt="Project Name">
        <!-- OR for video -->
        <video src="assets/videos/your-project.mp4" controls></video>
    </div>
    <div class="card__content">
        <h3 class="card__title">Your Project Title</h3>
        <p class="card__description">Your project description here.</p>
        <div class="card__tags">
            <span class="tag">Unity</span>
            <span class="tag">C#</span>
            <span class="tag">Multiplayer</span>
        </div>
    </div>
</article>
```

### Adding Images/Videos

**Option 1: Direct (loads immediately)**
```html
<img src="assets/images/photo.jpg" alt="Description">
<video src="assets/videos/gameplay.mp4" controls></video>
```

**Option 2: Lazy Loading (better performance)**
```html
<img data-src="assets/images/photo.jpg" alt="Description">
<video data-src="assets/videos/gameplay.mp4" controls></video>
```

### Using Media Placeholders

During development, use placeholders:

```html
<div class="media-placeholder media-placeholder--image">
    PROJECT IMAGE 1
</div>

<div class="media-placeholder media-placeholder--video">
    VIDEO PLACEHOLDER 1
</div>
```

## 🎯 Utility Classes

### Spacing

```html
<!-- Margins -->
<div class="mt-lg mb-xl">Content with top and bottom margin</div>

<!-- Padding -->
<div class="p-md">Content with padding</div>

<!-- Gap (for flex/grid) -->
<div class="flex gap-md">Items with gap</div>
```

### Typography

```html
<h1 class="text-4xl font-bold text-center">Large Centered Title</h1>
<p class="text-lg text-muted leading-relaxed">Large muted paragraph</p>
```

### Flexbox

```html
<div class="flex flex--between flex--center gap-md">
    <div>Left</div>
    <div>Right</div>
</div>
```

## ⚙️ Configuration (js/modules/config.js)

Customize behavior:

```javascript
const CONFIG = {
    windows: {
        enableDragging: true,      // Allow window dragging
        enableResize: true,        // Allow window resizing
        animationDuration: 300,    // Animation speed
    },
    animations: {
        enabled: true,             // Enable/disable animations
        particles: {
            enabled: true,         // Particle effects on click
        },
    },
    taskbar: {
        showTime: true,           // Show time in taskbar
        timeFormat: '24h',        // '12h' or '24h'
    },
    debug: false,                 // Enable console logging
};
```

## ⌨️ Keyboard Shortcuts

- **Escape**: Minimize focused window
- **Ctrl/Cmd + M**: Minimize active window
- **Ctrl/Cmd + W**: Close active window
- **F11**: Toggle maximize active window
- **Alt + Tab**: Cycle through windows

## 🎨 Creating New Sections

To add a new section:

1. **Add Window in HTML**:

```html
<section class="window window--newsection" data-window="newsection">
    <div class="window__titlebar">
        <span class="window__title">New Section.exe</span>
        <div class="window__controls">
            <button class="window__control window__control--minimize">_</button>
            <button class="window__control window__control--maximize">□</button>
            <button class="window__control window__control--close">×</button>
        </div>
    </div>
    <div class="window__content">
        <h2>YOUR CONTENT HERE</h2>
        <div class="content-grid" data-grid-columns="2">
            <!-- Your grid items -->
        </div>
    </div>
</section>
```

2. **Style if needed** (css/components/window.css):

```css
.window--newsection {
    max-width: 1000px;
}
```

## 📱 Responsive Behavior

The portfolio automatically adapts:

- **Desktop (>1024px)**: Full window system with dragging
- **Tablet (768px-1024px)**: Simplified windows, 2-3 column grids
- **Mobile (<768px)**: Single column, stacked windows

## 🚀 Performance Tips

1. **Use lazy loading** for images/videos:
   ```html
   <img data-src="path/to/image.jpg">
   ```

2. **Optimize images** before uploading (use WebP format)

3. **Minimize video sizes** (compress and use appropriate resolution)

4. **Enable caching** in your web server

## 📦 Deployment

1. Upload all files to your web server
2. Ensure directory structure is maintained
3. Test on different devices
4. Update meta tags in `index.html` for SEO

## 🛠️ Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 📄 License

Free to use for personal and commercial projects.

---

**Happy Coding! 🎮**
