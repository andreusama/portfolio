/* ==============================================
   WINDOW MANAGER MODULE
   Handles window interactions, focus, minimize, maximize
   ============================================== */

class WindowManager {
    constructor() {
        this.windows = [];
        this.activeWindow = null;
        this.zIndexCounter = CONFIG.windows.defaultZIndex;
        this.init();
    }

    init() {
        // Get all windows
        this.windows = Array.from(document.querySelectorAll('.window'));

        // Set up window controls for each window
        this.windows.forEach(window => {
            this.setupWindow(window);
        });

        // Focus first window by default
        if (this.windows.length > 0) {
            this.focusWindow(this.windows[0]);
        }

        if (CONFIG.debug) {
            console.log('WindowManager initialized with', this.windows.length, 'windows');
        }
    }

    setupWindow(windowElement) {
        const titlebar = windowElement.querySelector('.window__titlebar');
        const minimizeBtn = windowElement.querySelector('.window__control--minimize');
        const maximizeBtn = windowElement.querySelector('.window__control--maximize');
        const closeBtn = windowElement.querySelector('.window__control--close');

        // Titlebar click to focus
        if (titlebar) {
            titlebar.addEventListener('click', (e) => {
                // Don't focus if clicking on control buttons
                if (!e.target.closest('.window__control')) {
                    this.focusWindow(windowElement);
                }
            });

            // Enable dragging if configured
            if (CONFIG.windows.enableDragging) {
                this.enableDragging(windowElement, titlebar);
            }
        }

        // Control buttons
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.minimizeWindow(windowElement);
            });
        }

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMaximize(windowElement);
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeWindow(windowElement);
            });
        }

        // Click anywhere on window to focus
        windowElement.addEventListener('mousedown', () => {
            this.focusWindow(windowElement);
        });
    }

    focusWindow(windowElement, shouldScroll = true) {
        // Remove focus from all windows
        this.windows.forEach(w => {
            w.classList.remove('window--focused');
            w.style.zIndex = CONFIG.windows.defaultZIndex;
        });

        // Add focus to clicked window
        windowElement.classList.add('window--focused');
        this.zIndexCounter++;
        windowElement.style.zIndex = this.zIndexCounter;
        this.activeWindow = windowElement;

        // Scroll to window if requested
        if (shouldScroll) {
            this.scrollToWindow(windowElement);
        }

        if (CONFIG.debug) {
            console.log('Focused window:', windowElement.dataset.window);
        }
    }

    scrollToWindow(windowElement) {
        // Check if scrolling is enabled
        if (!CONFIG.taskbar.scrollToWindow) return;

        // Get the desktop content container
        const desktopContent = document.querySelector('.desktop__content');

        if (!desktopContent || !windowElement) return;

        // Calculate the position of the window relative to the desktop content
        const windowTop = windowElement.offsetTop;

        // Scroll to the window with smooth behavior
        desktopContent.scrollTo({
            top: windowTop - CONFIG.taskbar.scrollOffset,
            behavior: 'smooth'
        });

        if (CONFIG.debug) {
            console.log('Scrolled to window:', windowElement.dataset.window);
        }
    }

    minimizeWindow(windowElement) {
        windowElement.classList.add('window--minimized');
        windowElement.classList.remove('window--focused');

        if (CONFIG.debug) {
            console.log('Minimized window:', windowElement.dataset.window);
        }

        // Update taskbar
        if (window.taskbarManager) {
            window.taskbarManager.updateWindowState(windowElement, 'minimized');
        }
    }

    toggleMaximize(windowElement) {
        windowElement.classList.toggle('window--maximized');

        if (CONFIG.debug) {
            const state = windowElement.classList.contains('window--maximized') ? 'maximized' : 'restored';
            console.log('Window', windowElement.dataset.window, state);
        }
    }

    closeWindow(windowElement) {
        if (CONFIG.animations.enabled) {
            windowElement.style.transition = `opacity ${CONFIG.animations.duration}ms, transform ${CONFIG.animations.duration}ms`;
            windowElement.style.opacity = '0';
            windowElement.style.transform = 'scale(0.8)';

            setTimeout(() => {
                windowElement.style.display = 'none';
            }, CONFIG.animations.duration);
        } else {
            windowElement.style.display = 'none';
        }

        if (CONFIG.debug) {
            console.log('Closed window:', windowElement.dataset.window);
        }

        // Update taskbar
        if (window.taskbarManager) {
            window.taskbarManager.removeWindow(windowElement);
        }
    }

    restoreWindow(windowElement) {
        windowElement.classList.remove('window--minimized');
        windowElement.style.display = '';
        windowElement.style.opacity = '1';
        windowElement.style.transform = 'scale(1)';
        this.focusWindow(windowElement);

        if (CONFIG.debug) {
            console.log('Restored window:', windowElement.dataset.window);
        }
    }

    enableDragging(windowElement, titlebar) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        titlebar.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            // Don't drag if clicking on control buttons
            if (e.target.closest('.window__control')) return;

            // Don't drag if window is maximized
            if (windowElement.classList.contains('window--maximized')) return;

            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === titlebar || titlebar.contains(e.target)) {
                isDragging = true;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, windowElement);
            }
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
    }
}

// Export for use in main.js
window.WindowManager = WindowManager;
