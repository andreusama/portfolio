/* ==============================================
   ANIMATIONS MODULE
   Handles visual effects and animations
   ============================================== */

class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        if (!CONFIG.animations.enabled) {
            if (CONFIG.debug) {
                console.log('Animations disabled');
            }
            return;
        }

        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupWindowAnimations();

        if (CONFIG.debug) {
            console.log('AnimationManager initialized');
        }
    }

    setupScrollAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe cards
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity ${CONFIG.animations.duration}ms ${CONFIG.animations.easing} ${index * 100}ms,
                                     transform ${CONFIG.animations.duration}ms ${CONFIG.animations.easing} ${index * 100}ms`;
            observer.observe(card);
        });
    }

    setupHoverEffects() {
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.card--project, .btn, .tag');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                if (CONFIG.performance.reducedMotion) return;

                e.target.style.transition = `transform ${CONFIG.animations.duration / 2}ms ${CONFIG.animations.easing}`;
            });
        });
    }

    setupWindowAnimations() {
        // Animate windows on load
        const windows = document.querySelectorAll('.window');

        windows.forEach((window, index) => {
            window.style.opacity = '0';
            window.style.transform = 'scale(0.95)';

            setTimeout(() => {
                window.style.transition = `opacity ${CONFIG.animations.duration}ms ${CONFIG.animations.easing},
                                           transform ${CONFIG.animations.duration}ms ${CONFIG.animations.easing}`;
                window.style.opacity = '1';
                window.style.transform = 'scale(1)';
            }, index * 150);
        });
    }

    // Utility function for animating elements
    animate(element, properties, duration = CONFIG.animations.duration) {
        if (!CONFIG.animations.enabled || CONFIG.performance.reducedMotion) {
            // Apply properties immediately if animations disabled
            Object.assign(element.style, properties);
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            const startTime = performance.now();
            const startProperties = {};

            // Get current values
            for (let prop in properties) {
                startProperties[prop] = getComputedStyle(element)[prop];
            }

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-in-out function
                const eased = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                // Apply interpolated values
                for (let prop in properties) {
                    const start = parseFloat(startProperties[prop]);
                    const end = parseFloat(properties[prop]);
                    const current = start + (end - start) * eased;
                    element.style[prop] = current + 'px';
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    // Particle effect for clicks (optional enhancement)
    createParticles(x, y, count = 10) {
        if (!CONFIG.animations.particles.enabled || CONFIG.performance.reducedMotion) {
            return;
        }

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.borderRadius = '50%';
            particle.style.background = 'var(--color-primary)';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';

            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / count;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let px = x;
            let py = y;
            let opacity = 1;

            const animateParticle = () => {
                px += vx;
                py += vy;
                opacity -= 0.02;

                particle.style.left = px + 'px';
                particle.style.top = py + 'px';
                particle.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            };

            requestAnimationFrame(animateParticle);
        }
    }
}

// Export for use in main.js
window.AnimationManager = AnimationManager;
