/* ==============================================
   MAIN APPLICATION
   Initializes all modules and handles global events
   ============================================== */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    async function init() {
        console.log('🎮 Game Designer Portfolio - Initializing...');

        // Initialize content loader FIRST
        if (typeof ContentLoader !== 'undefined') {
            window.contentLoader = new ContentLoader();
            try {
                await window.contentLoader.init();

                // Create project modals after content is loaded
                window.contentLoader.createProjectModals();

                console.log('✅ Content loaded successfully!');
            } catch (error) {
                console.error('❌ Failed to load content:', error);
                return; // Stop initialization if content fails to load
            }
        } else {
            console.error('ContentLoader not found');
            return;
        }

        // Initialize all other modules AFTER content is loaded
        initializeModules();

        // Set up global event listeners
        setupGlobalEvents();

        // Initialize lazy loading if enabled
        if (CONFIG.performance.lazyLoadImages) {
            initializeLazyLoading();
        }

        // Log completion
        console.log('✅ Portfolio initialized successfully!');
        if (CONFIG.debug) {
            console.log('Debug mode enabled');
            logPerformanceMetrics();
        }
    }

    function initializeModules() {
        // Initialize Modal Manager for hybrid layout
        if (typeof ModalManager !== 'undefined') {
            window.modalManager = new ModalManager();
        } else {
            console.error('ModalManager not found');
        }

        // Initialize cursor follower
        if (typeof CursorFollower !== 'undefined') {
            window.cursorFollower = new CursorFollower({
                particleCount: 5,
                particleSize: 12,
                particleColor: 'rgba(45, 45, 95, 0.3)',
                enabled: true,
            });
        } else {
            console.error('CursorFollower not found');
        }

        // Initialize background follower
        if (typeof BackgroundFollower !== 'undefined') {
            window.backgroundFollower = new BackgroundFollower({
                sensitivity: 0.05,
                smoothing: 0.1,
                selector: '.section--projects'
            });
        } else {
            console.error('BackgroundFollower not found');
        }

        // Initialize Animation Manager
        if (typeof AnimationManager !== 'undefined') {
            window.animationManager = new AnimationManager();
        } else {
            console.error('AnimationManager not found');
        }

        // Initialize circle background
        if (typeof CircleBackground !== 'undefined') {
            window.circleBackground = new CircleBackground({
                maxMovement: 30,
                enabled: true
            });
        } else {
            console.error('CircleBackground not found');
        }

        // Initialize smooth scroll
        initSmoothScroll();
    }

    function setupGlobalEvents() {
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                handleResize();
            }, 250);
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (CONFIG.debug) {
                console.log('Visibility changed:', document.hidden ? 'hidden' : 'visible');
            }
        });

        // Handle email copy button
        document.addEventListener('click', (e) => {
            const copyButton = e.target.closest('[data-email-copy]');
            if (copyButton) {
                const emailText = copyButton.querySelector('[data-content="contact-email-text"]');
                if (emailText) {
                    const email = emailText.textContent;
                    navigator.clipboard.writeText(email).then(() => {
                        copyButton.classList.add('copied');
                        setTimeout(() => {
                            copyButton.classList.remove('copied');
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy email:', err);
                    });
                }
            }
        });

        // Add click effect (optional)
        if (CONFIG.animations.particles.enabled) {
            document.addEventListener('click', (e) => {
                if (window.animationManager && !e.target.closest('button, a, .window__control')) {
                    window.animationManager.createParticles(e.clientX, e.clientY, 8);
                }
            });
        }
    }

    function handleResize() {
        if (CONFIG.debug) {
            console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
        }
    }

    function handleKeyboardShortcuts(e) {
        // Escape key - handled by ModalManager
        // No additional keyboard shortcuts needed for hybrid layout
    }

    function initSmoothScroll() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Don't prevent default for empty hash
                if (href === '#') return;

                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        console.log('✅ Smooth scroll initialized');
    }


    function initializeLazyLoading() {
        // Lazy load images and videos
        const lazyMediaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const media = entry.target;

                    if (media.dataset.src) {
                        media.src = media.dataset.src;
                        media.removeAttribute('data-src');
                    }

                    if (media.dataset.srcset) {
                        media.srcset = media.dataset.srcset;
                        media.removeAttribute('data-srcset');
                    }

                    lazyMediaObserver.unobserve(media);
                }
            });
        }, {
            rootMargin: '50px',
        });

        // Observe all images and videos with data-src
        document.querySelectorAll('img[data-src], video[data-src]').forEach(media => {
            lazyMediaObserver.observe(media);
        });

        if (CONFIG.debug) {
            console.log('Lazy loading initialized');
        }
    }

    function logPerformanceMetrics() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;

            console.log('⚡ Performance Metrics:');
            console.log(`  - Page Load Time: ${loadTime}ms`);
            console.log(`  - DOM Ready Time: ${domReadyTime}ms`);
        }
    }

})();
