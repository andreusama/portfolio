/* ==============================================
   CIRCLE BACKGROUND
   Concentric circles that subtly follow cursor movement
   ============================================== */

class CircleBackground {
    constructor(options = {}) {
        // Find all circle background instances
        this.instances = [];
        const containers = document.querySelectorAll('.circle-background');

        if (containers.length === 0) {
            console.warn('Circle background elements not found');
            return;
        }

        // Configuration
        this.maxMovement = options.maxMovement || 30; // Maximum pixels to move
        this.enabled = options.enabled !== false;

        // Create an instance for each container
        containers.forEach(container => {
            const instance = {
                container: container,
                circleContainer: container.querySelector('.circle-background__container'),
                circles: container.querySelectorAll('.circle-background__circle'),
                section: container.closest('section'),
                currentX: 0,
                currentY: 0,
                targetX: 0,
                targetY: 0,
                isActive: false
            };
            this.instances.push(instance);
        });

        if (this.enabled) {
            this.init();
        }
    }

    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.onMouseMove(e);
        });

        // Start animation loop
        this.animate();

        console.log(`✅ Circle background initialized (${this.instances.length} instances)`);
    }

    onMouseMove(e) {
        // Check which section the mouse is in
        this.instances.forEach(instance => {
            if (!instance.section) return;

            const rect = instance.section.getBoundingClientRect();
            const isInSection = (
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom &&
                e.clientX >= rect.left &&
                e.clientX <= rect.right
            );

            if (isInSection) {
                instance.isActive = true;

                // Get section center
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Calculate offset from section center (normalized to -1 to 1)
                const offsetX = (e.clientX - centerX) / (rect.width / 2);
                const offsetY = (e.clientY - centerY) / (rect.height / 2);

                // Set target position (limited by maxMovement)
                instance.targetX = offsetX * this.maxMovement;
                instance.targetY = offsetY * this.maxMovement;
            } else {
                instance.isActive = false;
                // Reset to center when not in section
                instance.targetX = 0;
                instance.targetY = 0;
            }
        });
    }

    animate() {
        const ease = 0.08;

        this.instances.forEach(instance => {
            // Smooth interpolation towards target (easing)
            instance.currentX += (instance.targetX - instance.currentX) * ease;
            instance.currentY += (instance.targetY - instance.currentY) * ease;

            // Apply transforms to each circle with different intensities
            instance.circles.forEach((circle, index) => {
                // Smaller circles move more, larger circles move less
                const intensity = 1 - (index * 0.15);
                const x = instance.currentX * intensity;
                const y = instance.currentY * intensity;

                circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            });
        });

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
        // Reset all positions
        this.instances.forEach(instance => {
            instance.circles.forEach(circle => {
                circle.style.transform = 'translate(-50%, -50%)';
            });
        });
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CircleBackground;
}
