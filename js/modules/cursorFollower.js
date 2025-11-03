/* ==============================================
   CURSOR FOLLOWER
   Creates animated particles that follow the cursor
   ============================================== */

class CursorFollower {
    constructor(options = {}) {
        this.options = {
            particleCount: options.particleCount || 5,
            particleSize: options.particleSize || 12,
            particleColor: options.particleColor || 'rgba(45, 45, 95, 0.6)',
            lagAmount: options.lagAmount || [0.05, 0.08, 0.11, 0.14, 0.17],
            enabled: options.enabled !== false,
        };

        this.mouse = { x: 0, y: 0 };
        this.particles = [];
        this.animationFrame = null;

        if (this.options.enabled) {
            this.init();
        }
    }

    init() {
        // Create particles
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = this.createParticle(i);
            this.particles.push(particle);
        }

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Hide particles when mouse leaves window
        document.addEventListener('mouseleave', () => {
            this.particles.forEach(p => {
                p.element.style.opacity = '0';
            });
        });

        document.addEventListener('mouseenter', () => {
            this.particles.forEach(p => {
                p.element.style.opacity = '1';
            });
        });

        // Start animation loop
        this.animate();

        console.log('✅ CursorFollower initialized');
    }

    createParticle(index) {
        const element = document.createElement('div');
        element.className = 'cursor-particle';
        element.style.cssText = `
            position: fixed;
            width: ${this.options.particleSize}px;
            height: ${this.options.particleSize}px;
            background: ${this.options.particleColor};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: opacity 0.3s ease;
            mix-blend-mode: multiply;
        `;

        document.body.appendChild(element);

        return {
            element,
            x: 0,
            y: 0,
            lag: this.options.lagAmount[index] || 0.1,
            size: this.options.particleSize - (index * 1.5), // Decreasing size
        };
    }

    animate() {
        this.particles.forEach((particle, index) => {
            // Calculate target position with lag
            const targetX = this.mouse.x - (particle.size / 2);
            const targetY = this.mouse.y - (particle.size / 2);

            // Smooth interpolation
            particle.x += (targetX - particle.x) * particle.lag;
            particle.y += (targetY - particle.y) * particle.lag;

            // Update position
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;

            // Update size (optional - makes it more dynamic)
            particle.element.style.width = `${particle.size}px`;
            particle.element.style.height = `${particle.size}px`;

            // Fade out effect based on distance from cursor
            const distance = Math.sqrt(
                Math.pow(this.mouse.x - particle.x, 2) +
                Math.pow(this.mouse.y - particle.y, 2)
            );
            const maxDistance = 200;
            const opacity = Math.max(0, 1 - (distance / maxDistance));
            particle.element.style.opacity = opacity * 0.6;
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        // Remove all particles
        this.particles.forEach(particle => {
            particle.element.remove();
        });
        this.particles = [];

        // Cancel animation
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        console.log('❌ CursorFollower destroyed');
    }

    toggle(enabled) {
        this.options.enabled = enabled;

        if (enabled) {
            this.particles.forEach(p => {
                p.element.style.display = 'block';
            });
            if (!this.animationFrame) {
                this.animate();
            }
        } else {
            this.particles.forEach(p => {
                p.element.style.display = 'none';
            });
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }
        }
    }
}

// Make it available globally
if (typeof window !== 'undefined') {
    window.CursorFollower = CursorFollower;
}
