/* ==============================================
   MODAL MANAGER
   Handles modal overlay windows (project details)
   ============================================== */

class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll('.modal-overlay');
        this.openButtons = document.querySelectorAll('[data-open-window]');
        this.closeButtons = document.querySelectorAll('[data-close-modal]');
        this.activeModal = null;

        this.init();
    }

    init() {
        // Set up open buttons
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = button.getAttribute('data-open-window');
                this.openModal(modalId);
            });
        });

        // Set up close buttons
        this.closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = button.getAttribute('data-close-modal');
                this.closeModal(modalId);
            });
        });

        // Close modal when clicking on overlay background
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    const modalId = modal.getAttribute('data-modal');
                    this.closeModal(modalId);
                }
            });
        });

        // Handle ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                const modalId = this.activeModal.getAttribute('data-modal');
                this.closeModal(modalId);
            }
        });

        console.log(`✅ ModalManager initialized with ${this.modals.length} modals`);
    }

    openModal(modalId) {
        const modal = document.querySelector(`[data-modal="${modalId}"]`);

        if (!modal) {
            console.error(`Modal with id "${modalId}" not found`);
            return;
        }

        // Close any open modal first
        if (this.activeModal) {
            this.closeModal(this.activeModal.getAttribute('data-modal'));
        }

        // Open the modal
        modal.classList.add('active');
        this.activeModal = modal;
        document.body.style.overflow = 'hidden';

        // Trigger animation
        const window = modal.querySelector('.window');
        if (window) {
            window.style.animation = 'none';
            setTimeout(() => {
                window.style.animation = '';
            }, 10);
        }

        console.log(`📂 Opened modal: ${modalId}`);
    }

    closeModal(modalId) {
        const modal = document.querySelector(`[data-modal="${modalId}"]`);

        if (!modal) {
            console.error(`Modal with id "${modalId}" not found`);
            return;
        }

        // Pause any videos in the modal
        const videos = modal.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0; // Reset to beginning
        });

        // Pause any iframes (YouTube videos)
        const iframes = modal.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            // Reset iframe src to stop playback
            const src = iframe.src;
            iframe.src = '';
            iframe.src = src;
        });

        // Close the modal
        modal.classList.remove('active');

        if (this.activeModal === modal) {
            this.activeModal = null;
        }

        document.body.style.overflow = '';

        console.log(`❌ Closed modal: ${modalId}`);
    }

    closeAllModals() {
        this.modals.forEach(modal => {
            // Pause any videos
            const videos = modal.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });

            // Pause any iframes
            const iframes = modal.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                const src = iframe.src;
                iframe.src = '';
                iframe.src = src;
            });

            modal.classList.remove('active');
        });
        this.activeModal = null;
        document.body.style.overflow = '';

        console.log('❌ Closed all modals');
    }
}

// Make it available globally if needed
if (typeof window !== 'undefined') {
    window.ModalManager = ModalManager;
}
