/* ============================================
   Background Pattern Follower
   Moves tiled background pattern based on cursor position
   ============================================ */

class BackgroundFollower {
    constructor(options = {}) {
        // Configuration
        this.config = {
            sensitivity: options.sensitivity || 0.05,
            smoothing: options.smoothing || 0.1,
            selector: options.selector || '.section--about, .section--experience, .section--projects, .section--skills',
            ...options
        };

        // State
        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        this.current = {
            x: 0,
            y: 0
        };

        this.animationFrame = null;
        this.targetElements = [];

        this.init();
    }

    init() {
        // Get all target elements
        this.targetElements = document.querySelectorAll(this.config.selector);

        if (this.targetElements.length === 0) {
            console.warn('BackgroundFollower: No elements found with selector:', this.config.selector);
            return;
        }

        // Set up event listeners
        this.setupEventListeners();

        // Start animation loop
        this.animate();

        console.log(`BackgroundFollower initialized for ${this.targetElements.length} elements`);
    }

    setupEventListeners() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Handle mouse leave
        document.addEventListener('mouseleave', () => {
            // Keep last position
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            // Reset to center on resize
            this.mouse.x = window.innerWidth / 2;
            this.mouse.y = window.innerHeight / 2;
        });
    }

    animate() {
        // Calculate target position based on mouse
        // Center the movement (0 when mouse is in center)
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const targetX = (this.mouse.x - centerX) * this.config.sensitivity;
        const targetY = (this.mouse.y - centerY) * this.config.sensitivity;

        // Smooth interpolation
        this.current.x += (targetX - this.current.x) * this.config.smoothing;
        this.current.y += (targetY - this.current.y) * this.config.smoothing;

        // Update background position for all target elements
        this.updateBackgroundPosition();

        // Continue animation loop
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    updateBackgroundPosition() {
        // Move background in opposite direction for parallax effect
        const bgX = -this.current.x;
        const bgY = -this.current.y;

        this.targetElements.forEach(element => {
            // Set CSS custom properties for pattern position
            element.style.setProperty('--pattern-x', `${bgX}px`);
            element.style.setProperty('--pattern-y', `${bgY}px`);
        });
    }

    destroy() {
        // Cancel animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        // Reset background positions
        this.targetElements.forEach(element => {
            element.style.backgroundPosition = '0 0';
        });

        console.log('BackgroundFollower destroyed');
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackgroundFollower;
}
