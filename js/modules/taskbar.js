/* ==============================================
   TASKBAR MODULE
   Manages taskbar time, window buttons, and interactions
   ============================================== */

class TaskbarManager {
    constructor() {
        this.timeElement = document.getElementById('taskbar-time');
        this.windowsContainer = document.getElementById('taskbar-windows');
        this.windows = [];
        this.init();
    }

    init() {
        // Initialize time display
        if (CONFIG.taskbar.showTime && this.timeElement) {
            this.updateTime();
            setInterval(() => this.updateTime(), CONFIG.taskbar.updateInterval);
        }

        // Initialize window buttons
        this.initializeWindowButtons();

        if (CONFIG.debug) {
            console.log('TaskbarManager initialized');
        }
    }

    updateTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = '';

        if (CONFIG.taskbar.timeFormat === '12h') {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
        }

        // Add leading zeros
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');

        this.timeElement.textContent = `${hours}:${minutes}${ampm}`;
    }

    initializeWindowButtons() {
        const windowElements = document.querySelectorAll('.window');

        windowElements.forEach(window => {
            this.addWindowButton(window);
        });
    }

    addWindowButton(windowElement) {
        const windowId = windowElement.dataset.window;
        const windowTitle = windowElement.querySelector('.window__title')?.textContent || 'Window';

        // Create button
        const button = document.createElement('button');
        button.className = 'taskbar-window';
        button.textContent = windowTitle;
        button.dataset.windowId = windowId;

        // Click handler - scroll to window and focus
        button.addEventListener('click', () => {
            if (windowElement.classList.contains('window--minimized')) {
                window.windowManager.restoreWindow(windowElement);
                button.classList.add('taskbar-window--active');
            } else if (windowElement.classList.contains('window--focused')) {
                // If already focused, scroll to it anyway
                this.scrollToWindow(windowElement);
            } else {
                window.windowManager.focusWindow(windowElement);
                this.updateActiveButton(button);
            }

            // Always scroll to the window when clicking taskbar button
            this.scrollToWindow(windowElement);
        });

        this.windowsContainer.appendChild(button);
        this.windows.push({ element: windowElement, button });

        // Set active if this is the focused window
        if (windowElement.classList.contains('window--focused')) {
            button.classList.add('taskbar-window--active');
        }
    }

    updateWindowState(windowElement, state) {
        const windowData = this.windows.find(w => w.element === windowElement);
        if (!windowData) return;

        if (state === 'minimized') {
            windowData.button.classList.remove('taskbar-window--active');
        } else if (state === 'focused') {
            this.updateActiveButton(windowData.button);
        }
    }

    updateActiveButton(activeButton) {
        // Remove active class from all buttons
        const allButtons = this.windowsContainer.querySelectorAll('.taskbar-window');
        allButtons.forEach(btn => btn.classList.remove('taskbar-window--active'));

        // Add active class to clicked button
        activeButton.classList.add('taskbar-window--active');
    }

    removeWindow(windowElement) {
        const windowData = this.windows.find(w => w.element === windowElement);
        if (!windowData) return;

        // Remove button from taskbar
        windowData.button.remove();

        // Remove from windows array
        this.windows = this.windows.filter(w => w.element !== windowElement);
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
}

// Export for use in main.js
window.TaskbarManager = TaskbarManager;
