/* ==============================================
   CONFIGURATION MODULE
   Centralized configuration for easy customization
   ============================================== */

const CONFIG = {
    // Window Management
    windows: {
        enableDragging: true,
        enableResize: true,
        animationDuration: 300,
        defaultZIndex: 300,
        focusedZIndex: 400,
        minWidth: 400,
        minHeight: 300,
    },

    // Animation Settings
    animations: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
        particles: {
            enabled: true,
            count: 50,
        },
    },

    // Taskbar Settings
    taskbar: {
        showTime: true,
        timeFormat: '24h', // '12h' or '24h'
        updateInterval: 1000,
        scrollToWindow: true, // Scroll to window when clicking taskbar button
        scrollOffset: 20, // Pixels offset from top when scrolling
    },

    // Performance
    performance: {
        reducedMotion: false,
        lazyLoadImages: true,
        lazyLoadVideos: true,
    },

    // Debug Mode
    debug: false,
};

// Check for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    CONFIG.performance.reducedMotion = true;
    CONFIG.animations.enabled = false;
}

// Log config in debug mode
if (CONFIG.debug) {
    console.log('Portfolio Config:', CONFIG);
}
