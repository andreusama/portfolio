/**
 * Content Loader Module
 * Loads JSON data and populates the HTML template with dynamic content
 */

class ContentLoader {
    constructor() {
        this.data = null;
        this.config = null;
    }

    /**
     * Initialize the content loader and load data
     */
    async init() {
        try {
            // Load config first
            await this.loadConfig();

            // Load the appropriate content file
            await this.loadContent();

            // Populate all sections
            this.populateMetadata();
            this.populateHero();
            this.populateMarquees();
            this.populateFeaturedProjects();
            this.populateSideProjects();
            this.populateSkills();
            this.populateThatsMe();
            this.populateFinalCta();
            this.populateContact();
            this.populateFooter();

            console.log('✅ Content loaded successfully');
        } catch (error) {
            console.error('❌ Error loading content:', error);
            throw error;
        }
    }

    /**
     * Load configuration file
     */
    async loadConfig() {
        const response = await fetch('data/config.json');
        if (!response.ok) {
            throw new Error(`Failed to load config: ${response.statusText}`);
        }
        this.config = await response.json();
    }

    /**
     * Load content data from JSON
     */
    async loadContent() {
        const dataFile = this.config.dataFile;
        const response = await fetch(dataFile);
        if (!response.ok) {
            throw new Error(`Failed to load content: ${response.statusText}`);
        }
        this.data = await response.json();
    }

    /**
     * Populate page metadata (title, description)
     */
    populateMetadata() {
        document.title = this.data.meta.title;

        // Update or create meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = this.data.meta.description;
    }

    /**
     * Populate hero section
     */
    populateHero() {
        const hero = this.data.hero;

        this.setTextContent('[data-content="hero-greeting"]', hero.greeting);
        this.setTextContent('[data-content="hero-headline"]', hero.headline);
        this.setTextContent('[data-content="hero-description"]', hero.description);
        this.setTextContent('[data-content="hero-cta-primary"]', hero.ctaPrimary);
        this.setTextContent('[data-content="hero-cta-secondary"]', hero.ctaSecondary);
    }

    /**
     * Populate all marquee sections
     */
    populateMarquees() {
        const marquees = this.data.marquees;

        this.populateMarquee('[data-content="marquee-skills1"]', marquees.skills1);
        this.populateMarquee('[data-content="marquee-skills2"]', marquees.skills2);
        this.populateMarquee('[data-content="marquee-platforms"]', marquees.platforms);
        this.populateMarquee('[data-content="marquee-genres"]', marquees.genres);
        this.populateMarquee('[data-content="marquee-types"]', marquees.types);
        this.populateMarquee('[data-content="marquee-misc"]', marquees.misc);
    }

    /**
     * Helper to populate a single marquee
     */
    populateMarquee(selector, items) {
        const container = document.querySelector(selector);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Repeat items 4 times for seamless scrolling
        for (let i = 0; i < 4; i++) {
            items.forEach(item => {
                const span = document.createElement('span');
                span.className = 'marquee__item';
                span.textContent = item;
                container.appendChild(span);
            });
        }
    }

    /**
     * Populate featured projects section
     */
    populateFeaturedProjects() {
        const section = this.data.featuredProjects;

        this.setTextContent('[data-content="featured-projects-title"]', section.sectionTitle);
        this.setTextContent('[data-content="featured-projects-subtitle"]', section.sectionSubtitle);

        const grid = document.querySelector('[data-content="featured-projects-grid"]');
        if (!grid) return;

        grid.innerHTML = '';

        section.projects.forEach(project => {
            grid.appendChild(this.createProjectCard(project));
        });
    }

    /**
     * Create a project card element
     */
    createProjectCard(project) {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('data-project', project.id);

        // Generate media content (image, video, or placeholder)
        let mediaHTML = '';
        if (project.mediaSrc && project.mediaSrc.trim() !== '') {
            if (project.mediaType === 'video') {
                // Video thumbnail - auto-playing, looping, muted
                const posterAttr = project.videoPoster ? `poster="${project.videoPoster}"` : '';
                mediaHTML = `<video
                    class="project-card__media"
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="auto"
                    ${posterAttr}
                    style="width: 100%; height: auto; object-fit: contain; display: block;">
                    <source src="${project.mediaSrc}" type="video/mp4">
                </video>`;
            } else {
                // Image thumbnail
                mediaHTML = `<img src="${project.mediaSrc}" alt="${project.title}" class="project-card__media" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
        } else {
            // Placeholder
            mediaHTML = `<div class="media-placeholder media-placeholder--video">${project.mediaPlaceholder}</div>`;
        }

        article.innerHTML = `
            <div class="project-card__titlebar">
                <div class="macos-dots">
                    <span class="macos-dot macos-dot--red"></span>
                    <span class="macos-dot macos-dot--yellow"></span>
                    <span class="macos-dot macos-dot--green"></span>
                </div>
            </div>
            <div class="project-card__video">
                ${mediaHTML}
            </div>
            <div class="project-card__content">
                <h3 class="project-card__title">${project.title}</h3>
                <div class="project-card__tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="btn btn--primary btn--sm project-card__btn" data-open-window="${project.id}">
                    <span class="btn__circle"></span>
                    <span class="btn__circle"></span>
                    <span class="btn__circle"></span>
                    <span class="btn__circle"></span>
                    View Details
                </button>
            </div>
        `;

        return article;
    }

    /**
     * Populate side projects section
     */
    populateSideProjects() {
        const section = this.data.sideProjects;

        this.setTextContent('[data-content="side-projects-title"]', section.sectionTitle);
        this.setTextContent('[data-content="side-projects-subtitle"]', section.sectionSubtitle);

        const grid = document.querySelector('[data-content="side-projects-grid"]');
        if (!grid) return;

        grid.innerHTML = '';

        section.projects.forEach((project, index) => {
            grid.appendChild(this.createProjectCard(project));
        });
    }

    /**
     * Populate skills section
     */
    populateSkills() {
        const section = this.data.skills;

        this.setTextContent('[data-content="skills-title"]', section.sectionTitle);
        this.setTextContent('[data-content="skills-subtitle"]', section.sectionSubtitle);

        const container = document.querySelector('[data-content="skills-list"]');
        if (!container) return;

        container.innerHTML = '';

        section.skillsList.forEach(skill => {
            const skillRow = document.createElement('div');
            skillRow.className = 'skill-row';
            skillRow.innerHTML = `
                <div class="skill-row__image">
                    <img src="${skill.image}" alt="${skill.title}">
                </div>
                <div class="skill-cloud cloud-container">
                    <h3 class="skill-cloud__title">${skill.title}</h3>
                    <p class="skill-cloud__description">${skill.description}</p>
                </div>
            `;
            container.appendChild(skillRow);
        });
    }

    /**
     * Populate That's Me section
     */
    populateThatsMe() {
        const section = this.data.thatsMe;

        this.setTextContent('[data-content="thatsme-title"]', section.sectionTitle);
        this.setTextContent('[data-content="thatsme-subtitle"]', section.sectionSubtitle);

        const grid = document.querySelector('[data-content="thatsme-grid"]');
        if (!grid) return;

        grid.innerHTML = '';

        section.roles.forEach(role => {
            const column = document.createElement('div');
            column.className = 'team-column';
            column.innerHTML = `
                <div class="team-window">
                    <div class="team-window__titlebar">
                        <div class="macos-dots">
                            <span class="macos-dot macos-dot--red"></span>
                            <span class="macos-dot macos-dot--yellow"></span>
                            <span class="macos-dot macos-dot--green"></span>
                        </div>
                    </div>
                    <div class="team-window__content">
                        <img src="${role.image}" alt="${role.name}" class="team-window__photo">
                    </div>
                    <div class="team-window__info">
                        <h3 class="team-window__role">${role.role}</h3>
                        <p class="team-window__name">${role.name}</p>
                    </div>
                </div>
                <img src="column.svg" alt="Decorative column" class="team-column__image">
            `;
            grid.appendChild(column);
        });
    }

    /**
     * Populate final CTA section
     */
    populateFinalCta() {
        const cta = this.data.finalCta;

        this.setTextContent('[data-content="final-cta-title"]', cta.title);
        this.setTextContent('[data-content="final-cta-text"]', cta.text);
        this.setTextContent('[data-content="final-cta-button"]', cta.buttonText);
    }

    /**
     * Populate contact modal
     */
    populateContact() {
        const contact = this.data.contact;

        this.setTextContent('[data-content="contact-title"]', contact.modalTitle);
        this.setTextContent('[data-content="contact-description"]', contact.modalDescription);

        // Contact links
        this.setAttribute('[data-content="contact-email"]', 'href', `mailto:${contact.email}`);
        this.setTextContent('[data-content="contact-email-text"]', contact.email);

        this.setAttribute('[data-content="contact-linkedin"]', 'href', contact.linkedin);
        this.setTextContent('[data-content="contact-linkedin-text"]', contact.linkedinText);

        this.setAttribute('[data-content="contact-twitter"]', 'href', contact.twitter);
        this.setTextContent('[data-content="contact-twitter-text"]', contact.twitterHandle);

        this.setAttribute('[data-content="contact-github"]', 'href', contact.github);
        this.setTextContent('[data-content="contact-github-text"]', contact.githubText);

        // Availability
        this.setTextContent('[data-content="contact-location"]', contact.availability.location);
        this.setTextContent('[data-content="contact-status"]', contact.availability.status);
        this.setTextContent('[data-content="contact-preferred"]', contact.availability.preferredProjects);
    }

    /**
     * Populate footer
     */
    populateFooter() {
        const footer = this.data.footer;

        this.setTextContent('[data-content="footer-copyright"]', footer.copyright);
        this.setTextContent('[data-content="footer-tagline"]', footer.tagline);
    }

    /**
     * Helper: Set text content of an element
     */
    setTextContent(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }

    /**
     * Helper: Set attribute of an element
     */
    setAttribute(selector, attr, value) {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute(attr, value);
        }
    }

    /**
     * Generate video HTML based on video type
     */
    generateVideoHTML(modalData) {
        // Check if video source is provided
        if (modalData.videoSrc && modalData.videoSrc.trim() !== '') {
            if (modalData.videoType === 'youtube') {
                // YouTube embed
                return `<iframe
                    src="${modalData.videoSrc}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                </iframe>`;
            } else if (modalData.videoType === 'video' || modalData.videoType === 'local') {
                // Local video file
                return `<video
                    controls
                    style="width: 100%; height: 100%; object-fit: contain;"
                    poster="${modalData.videoPoster || ''}">
                    <source src="${modalData.videoSrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
            }
        }

        // Fallback to placeholder
        return `<div class="project-video__placeholder">
            ${modalData.videoPlaceholder || '🎬 VIDEO COMING SOON'}
        </div>`;
    }

    /**
     * Create project modals after content is loaded
     * This should be called after the DOM manipulation for project cards
     */
    createProjectModals() {
        // Remove existing modals
        const existingModals = document.querySelectorAll('.modal-overlay[data-modal]:not([data-modal="contact"])');
        existingModals.forEach(modal => modal.remove());

        // Create modals for featured projects
        const modalContainer = document.querySelector('main');
        if (!modalContainer) return;

        this.data.featuredProjects.projects.forEach(project => {
            const modal = this.createProjectModal(project);
            modalContainer.appendChild(modal);
        });

        // Create modals for side projects
        this.data.sideProjects.projects.forEach(project => {
            if (project.modal) {
                const modal = this.createProjectModal(project, true);
                modalContainer.appendChild(modal);
            }
        });
    }

    /**
     * Create a project modal element
     */
    createProjectModal(project, isSideProject = false) {
        const modalData = project.modal;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.setAttribute('data-modal', project.id);

        // Build contributions HTML
        const contributionsHTML = modalData.contributions.map(contrib => `
            <div class="project-modal-contribution-group">
                <h3 class="project-modal-contribution-group__title">${contrib.category}</h3>
                <ul class="project-modal-contribution-group__list">
                    ${contrib.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        // Build platforms HTML if available
        const platformsHTML = modalData.platforms ? `
            <div class="project-header__platforms">
                <span class="platform-text">${modalData.platforms.join(' / ')}</span>
            </div>
        ` : '';

        // Build brands HTML
        const brandsHTML = modalData.brands && modalData.brands.length > 0 ? `
            <div class="project-modal-brands">
                ${modalData.brands.map(brand => {
                    if (brand.logo && brand.logo.trim() !== '') {
                        return `<div class="brand-logo">
                            <img src="${brand.logo}" alt="${brand.name}" class="brand-logo__image">
                        </div>`;
                    } else {
                        return `<div class="brand-logo">
                            <div class="brand-logo__placeholder">${brand.name}</div>
                        </div>`;
                    }
                }).join('')}
            </div>
        ` : '';


        // Build features section for side projects (image + description like skills section)
        const featuresHTML = isSideProject && modalData.features && modalData.features.length > 0 ? `
            <div class="project-modal-features">
                <h2 class="project-modal__section-title">Project Highlights</h2>
                ${modalData.features.map(feature => `
                    <div class="project-feature-row">
                        <div class="project-feature-row__image">
                            <img src="${feature.image}" alt="${feature.title}">
                        </div>
                        <div class="project-feature-cloud cloud-container">
                            <h3 class="project-feature-cloud__title">${feature.title}</h3>
                            <p class="project-feature-cloud__description">${feature.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : '';

        overlay.innerHTML = `
            <section class="window window--project window--modal" data-window="${project.id}">
                <div class="window__titlebar">
                    <div class="macos-dots">
                        <span class="macos-dot macos-dot--red"></span>
                        <span class="macos-dot macos-dot--yellow"></span>
                        <span class="macos-dot macos-dot--green"></span>
                    </div>
                    <div class="window__controls">
                        <button class="window__control window__control--close" data-close-modal="${project.id}">×</button>
                    </div>
                </div>
                <div class="window__content">
                    <div class="project-modal-header">
                        <h1 class="project-modal-header__title">${modalData.title}</h1>
                        ${platformsHTML}
                    </div>

                    <div class="project-modal-video">
                        <div class="project-modal-video__container">
                            ${this.generateVideoHTML(modalData)}
                        </div>
                    </div>

                    ${brandsHTML}

                    ${featuresHTML}

                    <div class="project-modal-grid">
                        <div class="cloud-container project-modal-contributions">
                            <h2 class="project-modal__section-title">My Contributions</h2>
                            ${contributionsHTML}
                        </div>

                        <div class="project-modal-sidebar">
                            <div class="cloud-container project-modal-info-box">
                                <h3 class="project-modal-info-box__title">Role</h3>
                                <p class="project-modal-info-box__content">${modalData.role}</p>
                            </div>

                            <div class="cloud-container project-modal-info-box">
                                <h3 class="project-modal-info-box__title">Technologies</h3>
                                <div class="project-modal-info-box__tags">
                                    ${modalData.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                                </div>
                            </div>

                            <div class="cloud-container project-modal-info-box">
                                <h3 class="project-modal-info-box__title">Timeline</h3>
                                <p class="project-modal-info-box__content">${modalData.timeline}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        return overlay;
    }
}

// Export for use in main.js
window.ContentLoader = ContentLoader;
