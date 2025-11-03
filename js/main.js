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

    function init() {
        console.log('🎮 Game Designer Portfolio - Initializing...');

        // Initialize all modules
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
        // Check if we're in hybrid layout mode
        const isHybridLayout = document.body.classList.contains('hybrid-layout');

        if (isHybridLayout) {
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
                    selector: '.section--contact'
                });
            } else {
                console.error('BackgroundFollower not found');
            }

            // Initialize smooth scroll
            initSmoothScroll();
        } else {
            // Initialize Window Manager (old desktop layout)
            if (typeof WindowManager !== 'undefined') {
                window.windowManager = new WindowManager();
            } else {
                console.error('WindowManager not found');
            }

            // Initialize Taskbar Manager
            if (typeof TaskbarManager !== 'undefined') {
                window.taskbarManager = new TaskbarManager();
            } else {
                console.error('TaskbarManager not found');
            }
        }

        // Initialize Animation Manager (works for both layouts)
        if (typeof AnimationManager !== 'undefined') {
            window.animationManager = new AnimationManager();
        } else {
            console.error('AnimationManager not found');
        }
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

        // Reset maximized windows on resize
        const maximizedWindows = document.querySelectorAll('.window--maximized');
        maximizedWindows.forEach(window => {
            // Recalculate positions if needed
        });
    }

    function handleKeyboardShortcuts(e) {
        const isHybridLayout = document.body.classList.contains('hybrid-layout');

        // Escape key - handled by ModalManager in hybrid layout
        if (e.key === 'Escape' && !isHybridLayout) {
            if (window.windowManager && window.windowManager.activeWindow) {
                window.windowManager.minimizeWindow(window.windowManager.activeWindow);
            }
        }

        // Keyboard shortcuts for desktop layout only
        if (!isHybridLayout) {
            // Ctrl/Cmd + M - Minimize active window
            if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
                e.preventDefault();
                if (window.windowManager && window.windowManager.activeWindow) {
                    window.windowManager.minimizeWindow(window.windowManager.activeWindow);
                }
            }

            // Ctrl/Cmd + W - Close active window
            if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
                e.preventDefault();
                if (window.windowManager && window.windowManager.activeWindow) {
                    window.windowManager.closeWindow(window.windowManager.activeWindow);
                }
            }

            // F11 - Toggle fullscreen for active window
            if (e.key === 'F11') {
                e.preventDefault();
                if (window.windowManager && window.windowManager.activeWindow) {
                    window.windowManager.toggleMaximize(window.windowManager.activeWindow);
                }
            }

            // Tab - Cycle through windows
            if (e.key === 'Tab' && e.altKey) {
                e.preventDefault();
                cycleWindows(e.shiftKey);
            }
        }
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

    function cycleWindows(reverse = false) {
        if (!window.windowManager || window.windowManager.windows.length === 0) return;

        const windows = window.windowManager.windows;
        const currentIndex = windows.indexOf(window.windowManager.activeWindow);
        let nextIndex;

        if (reverse) {
            nextIndex = currentIndex === 0 ? windows.length - 1 : currentIndex - 1;
        } else {
            nextIndex = currentIndex === windows.length - 1 ? 0 : currentIndex + 1;
        }

        // Skip minimized windows
        while (windows[nextIndex].classList.contains('window--minimized')) {
            if (reverse) {
                nextIndex = nextIndex === 0 ? windows.length - 1 : nextIndex - 1;
            } else {
                nextIndex = nextIndex === windows.length - 1 ? 0 : nextIndex + 1;
            }
        }

        window.windowManager.focusWindow(windows[nextIndex]);
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

    // Expose API for external use
    window.PortfolioAPI = {
        focusWindow: (windowId) => {
            const window = document.querySelector(`[data-window="${windowId}"]`);
            if (window && window.windowManager) {
                window.windowManager.focusWindow(window);
            }
        },
        closeWindow: (windowId) => {
            const window = document.querySelector(`[data-window="${windowId}"]`);
            if (window && window.windowManager) {
                window.windowManager.closeWindow(window);
            }
        },
        minimizeWindow: (windowId) => {
            const window = document.querySelector(`[data-window="${windowId}"]`);
            if (window && window.windowManager) {
                window.windowManager.minimizeWindow(window);
            }
        },
        restoreWindow: (windowId) => {
            const window = document.querySelector(`[data-window="${windowId}"]`);
            if (window && window.windowManager) {
                window.windowManager.restoreWindow(window);
            }
        },
    };

    if (CONFIG.debug) {
        console.log('Portfolio API available via window.PortfolioAPI');
    }
})();
