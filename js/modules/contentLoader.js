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
            this.setupCollageVideos();
            this.populateThatsMe();
            this.populateFinalCta();
            this.populateContact();
            this.populateFooter();
            this.populateNav();
            this.populateHeroEntries();
            this.setupLangToggle();
            this.applyView();

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
        const params = new URLSearchParams(window.location.search);
        const versions = this.config.availableVersions || {};

        // ?version=<key> opens one Entry; anything else (or nothing) shows the Landing
        const requested = params.get('version');
        const isEntry = requested && Object.prototype.hasOwnProperty.call(versions, requested);
        this.view = isEntry ? requested : 'landing';
        this.config.version = this.view;
        const template = isEntry ? versions[requested].dataFile : this.config.dataFile;

        // ?lang=<code>; a missing translation falls back to the default language
        const languages = this.config.languages || ['en'];
        const defaultLang = this.config.defaultLanguage || 'en';
        const requestedLang = params.get('lang');
        this.lang = languages.includes(requestedLang) ? requestedLang : defaultLang;

        let response = await fetch(template.replace('{lang}', this.lang));
        if (!response.ok && this.lang !== defaultLang) {
            this.lang = defaultLang;
            response = await fetch(template.replace('{lang}', this.lang));
        }
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
        // The Landing can override the entry's hero text with a neutral one (hero.landing)
        const base = this.data.hero;
        const hero = this.view === 'landing' && base.landing ? { ...base, ...base.landing } : base;

        this.setTextContent('[data-content="hero-greeting"]', hero.greeting);
        this.setTextContent('[data-content="hero-headline"]', hero.headline);
        this.setTextContent('[data-content="hero-description"]', hero.description);
        this.setTextContent('[data-content="hero-cta-primary"]', hero.ctaPrimary);
        this.setTextContent('[data-content="hero-cta-secondary"]', hero.ctaSecondary);

        const workCta = document.querySelector('.hero__cta a[href="#projects"]');
        if (workCta) {
            workCta.hidden = this.view === 'landing';
        }
    }

    /**
     * Populate the two Hero windows that open each Entry
     */
    populateHeroEntries() {
        const entries = (this.data.hero && this.data.hero.entries) || {};

        ['software', 'games'].forEach(key => {
            const link = document.querySelector(`[data-entry="${key}"]`);
            const entry = entries[key];
            if (!link || !entry) return;

            const url = new URL(window.location.href);
            url.searchParams.set('version', key);
            link.setAttribute('href', url.search);
            link.classList.toggle('hero-entry--active', this.view === key);
            if (this.view === key) {
                link.setAttribute('aria-current', 'page');
            }

            this.setTextContent(`[data-content="hero-entry-${key}-label"]`, entry.label);
            this.setTextContent(`[data-content="hero-entry-${key}-caption"]`, entry.caption);
            if (entry.placeholder) {
                this.setTextContent(`[data-content="hero-entry-${key}-placeholder"]`, entry.placeholder);
            }
        });
    }

    /**
     * Populate navbar labels and the CV link from the data file.
     * An empty label (or empty CV file) hides the item.
     */
    populateNav() {
        const nav = this.data.nav || {};
        const keys = {
            '#hero': 'home',
            '#projects': 'projects',
            '#student-projects': 'sideProjects',
            '#skills': 'skills',
            '#thats-me': 'about',
            '#contact': 'contact'
        };
        const landingKeys = ['home', 'contact'];

        document.querySelectorAll('.navbar__link').forEach(link => {
            const key = keys[link.getAttribute('href')];
            const label = key && nav[key];
            const item = link.closest('li');
            const hidden = !label || (this.view === 'landing' && !landingKeys.includes(key));
            if (item) item.hidden = hidden;
            if (label) link.textContent = label;

            // In an entry, Home goes back to the Landing (same language, no version)
            if (key === 'home' && this.view !== 'landing') {
                const url = new URL(window.location.href);
                url.searchParams.delete('version');
                url.hash = '';
                link.setAttribute('href', url.pathname + url.search);
            }
        });

        const cv = this.data.cv;
        const cvLink = document.querySelector('.navbar__cv-download');
        if (cvLink) {
            cvLink.hidden = !(cv && cv.file);
            if (cv && cv.file) {
                cvLink.setAttribute('href', cv.file);
                cvLink.textContent = cv.label;
            }
        }
    }

    /**
     * Point the EN/ES toggle at the current URL with the other language
     */
    setupLangToggle() {
        document.querySelectorAll('[data-lang]').forEach(link => {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', link.dataset.lang);
            link.setAttribute('href', url.search);

            const active = link.dataset.lang === this.lang;
            link.classList.toggle('is-active', active);
            if (active) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Show the sections that belong to the current view.
     * Landing: hero and contact only. Entry: sections with content.
     */
    applyView() {
        document.body.dataset.view = this.view;
        document.documentElement.lang = this.lang;

        const landing = this.view === 'landing';
        const visibility = {
            '.marquee-double, main > .marquee': !landing,
            '#projects': !landing && this.data.featuredProjects.projects.length > 0,
            '#student-projects': !landing && this.data.sideProjects.projects.length > 0,
            '#skills': !landing && (this.data.skills.skillsList.length > 0 || (this.data.skills.projects || []).length > 0),
            '#thats-me': !landing
        };
        Object.entries(visibility).forEach(([selector, visible]) => {
            document.querySelectorAll(selector).forEach(element => {
                element.hidden = !visible;
            });
        });
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
    populateMarquee(target, items) {
        const container = typeof target === 'string' ? document.querySelector(target) : target;
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Repeat items for seamless scrolling (at least 4 times, more for short lists)
        const list = items || [];
        const repeats = Math.max(4, 2 * Math.ceil(20 / Math.max(list.length, 1)));
        for (let i = 0; i < repeats; i++) {
            list.forEach(item => {
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
            if (project.collage) {
                this.appendCollage(grid, project);
                return;
            }

            const card = this.createProjectCard(project);
            grid.appendChild(card);

            // Add click handler to video section to open modal
            const videoSection = card.querySelector('.project-card__video');
            if (videoSection && project.modal) {
                videoSection.style.cursor = 'pointer';
                videoSection.addEventListener('click', () => {
                    const modalManager = window.modalManager;
                    if (modalManager) {
                        modalManager.openModal(project.id);
                    }
                });
            }
        });
    }

    /**
     * Add a project's collage to a section's grid
     */
    appendCollage(grid, project) {
        grid.classList.add('projects-grid--collage');
        grid.appendChild(this.createProjectCollage(project));
    }

    /**
     * Create a project block: evenly spaced columns of project cards
     */
    createProjectCollage(project) {
        const collage = project.collage;
        const block = document.createDocumentFragment();

        if (collage.links) {
            const links = document.createElement('div');
            links.className = 'project-card__tags';
            links.style.justifyContent = 'center';
            links.style.marginBottom = '3rem';
            links.innerHTML = collage.links.map(link =>
                `<a class="tag" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
            ).join('');
            block.appendChild(links);
        }

        const columns = document.createElement('article');
        columns.className = 'project-collage';
        columns.setAttribute('data-project', project.id);

        collage.columns.forEach(column => {
            const el = document.createElement('div');
            el.className = 'project-collage__column';
            el.style.setProperty('--grow', column.grow || 1);
            el.style.setProperty('--y', `${column.y || 0}rem`);
            if (column.narrow) el.classList.add('project-collage__column--narrow');
            column.items.forEach(item => el.appendChild(this.createCollageCard(project, item)));
            columns.appendChild(el);
        });

        block.appendChild(columns);
        return block;
    }

    /**
     * Create one window of a collage, same structure as the project cards
     */
    createCollageCard(project, win) {
        const article = document.createElement('div');
        article.className = 'project-card';
        if (!win.main) article.style.cursor = 'default';

        article.innerHTML = `
            <div class="project-card__titlebar">
                <div class="macos-dots">
                    <span class="macos-dot macos-dot--red"></span>
                    <span class="macos-dot macos-dot--yellow"></span>
                    <span class="macos-dot macos-dot--green"></span>
                </div>
            </div>
            ${this.generateCollageMedia(win)}
            <div class="project-card__content">
                <div class="project-card__header">
                    <h3 class="project-card__title">${win.title}</h3>
                </div>
                ${win.caption ? `<p style="margin: 0; text-align: center;">${win.caption}</p>` : ''}
                ${win.main ? `<button class="btn btn--primary btn--sm project-card__btn" data-open-window="${project.id}">
                    <span class="btn__circle"></span>
                    <span class="btn__circle"></span>
                    <span class="btn__circle"></span>
                    <span class="btn__circle"></span>
                    View Details
                </button>` : ''}
            </div>
        `;

        const media = article.querySelector('.project-card__video');
        if (!win.main) media.classList.add('project-card__video--static');

        if (win.main) {
            media.addEventListener('click', () => {
                const modalManager = window.modalManager;
                if (modalManager) {
                    modalManager.openModal(project.id);
                }
            });
        }

        return article;
    }

    /**
     * Generate the media of a collage window based on its type
     */
    generateCollageMedia(win) {
        if (win.type === 'clip') {
            const playback = win.controls ? 'controls' : 'data-autoplay';
            return `<div class="project-card__video" style="aspect-ratio: 720 / 1600;">
                <video class="project-card__media" muted loop playsinline preload="none" poster="${win.src}-poster.jpg" ${playback}>
                    <source src="${win.src}.webm" type="video/webm">
                    <source src="${win.src}.mp4" type="video/mp4">
                </video>
            </div>`;
        }
        if (win.type === 'image') {
            return `<div class="project-card__video">
                <img class="project-card__media" src="${win.src}" alt="${win.title}" loading="lazy" style="width: 100%; display: block;">
            </div>`;
        }
        if (win.type === 'stat') {
            return `<div class="project-card__video" style="padding: 2rem 1rem; text-align: center; background: none;">
                <span class="section__title" style="margin: 0; font-size: clamp(2.2rem, 4.5vw, 5rem);">${win.value}</span>
            </div>`;
        }
        if (win.type === 'readme') {
            return `<div class="project-card__video" style="padding: 1.5rem; background: none;">
                ${this.generateContributionsHTML(win.contributions)}
            </div>`;
        }
        return `<div class="project-card__video">
            <div class="media-placeholder media-placeholder--video">${win.text}</div>
        </div>`;
    }

    /**
     * Clips play only while visible. With reduced motion, viewers see the posters.
     */
    setupCollageVideos() {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const video = entry.target;
                if (!entry.isIntersecting) {
                    video.pause();
                } else if (video.hasAttribute('data-autoplay') && !reducedMotion) {
                    video.play().catch(() => {});
                }
            });
        }, { rootMargin: '100px' });

        document.querySelectorAll('.project-collage video').forEach(video => observer.observe(video));
    }

    /**
     * Create a project card element
     */
    createProjectCard(project) {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('data-project', project.id);

        // Generate media content (image, video, youtube, or placeholder)
        let mediaHTML = '';
        if (project.mediaSrc && project.mediaSrc.trim() !== '') {
            if (project.mediaType === 'youtube') {
                // YouTube embed
                const youtubeId = this.extractYoutubeId(project.mediaSrc);
                if (youtubeId) {
                    mediaHTML = `
                        <div class="video-container" style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0;">
                            <iframe
                                class="project-card__media"
                                src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1"
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                                allow="autoplay; encrypted-media"
                                allowfullscreen>
                            </iframe>
                        </div>`;
                } else {
                    mediaHTML = `<div class="media-placeholder media-placeholder--video">Invalid YouTube URL</div>`;
                }
            } else if (project.mediaType === 'video') {
                // Video thumbnail - auto-playing, looping, muted
                const posterAttr = project.videoPoster ? `poster="${project.videoPoster}"` : '';
                mediaHTML = `
                    <div class="video-container" style="position: relative; width: 100%;">
                        <div class="video-loading" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem; z-index: 10; width: 80%; max-width: 300px;">
                            <span style="color: var(--color-cream, #fff); font-size: 0.875rem; margin-bottom: 0.5rem;">Loading...</span>
                            <div style="width: 100%; height: 4px; background-color: rgba(255, 255, 255, 0.1); border-radius: 2px; overflow: hidden;">
                                <div style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--color-primary), var(--color-accent)); border-radius: 2px; animation: loading 2s ease-in-out infinite;"></div>
                            </div>
                        </div>
                        <video
                            class="project-card__media"
                            autoplay
                            muted
                            loop
                            playsinline
                            preload="auto"
                            ${posterAttr}
                            onloadeddata="this.parentElement.querySelector('.video-loading').style.display='none'"
                            style="width: 100%; height: auto; object-fit: contain; display: block;">
                            <source src="${project.mediaSrc}" type="video/mp4">
                        </video>
                    </div>`;
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
                <div class="project-card__header">
                    <h3 class="project-card__title">${project.title}</h3>
                    ${project.genre ? `<span class="genre-label">${project.genre}</span>` : ''}
                </div>
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
            if (project.collage) {
                this.appendCollage(grid, project);
                return;
            }

            const card = this.createProjectCard(project);
            grid.appendChild(card);

            // Add click handler to video section to open modal
            const videoSection = card.querySelector('.project-card__video');
            if (videoSection && project.modal) {
                videoSection.style.cursor = 'pointer';
                videoSection.addEventListener('click', () => {
                    const modalManager = window.modalManager;
                    if (modalManager) {
                        modalManager.openModal(project.id);
                    }
                });
            }
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

        (section.projects || []).forEach(project => this.appendCollage(container, project));

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

            // Check if it's a decoration item
            if (role.isDecoration) {
                column.innerHTML = `
                    <div class="team-window team-window--decoration">
                        <div class="team-window__titlebar">
                            <div class="macos-dots">
                                <span class="macos-dot macos-dot--red"></span>
                                <span class="macos-dot macos-dot--yellow"></span>
                                <span class="macos-dot macos-dot--green"></span>
                            </div>
                        </div>
                        <div class="team-window__content team-window__content--decoration">
                            <img src="${role.image}" alt="Decoration" class="team-window__decoration-icon">
                        </div>
                    </div>
                    <img src="column.svg" alt="Decorative column" class="team-column__image">
                `;
            } else {
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
            }

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
     * Generate the grouped lists used by project modals and README windows
     */
    generateContributionsHTML(contributions) {
        return contributions.map(contrib => `
            <div class="project-modal-contribution-group">
                <h3 class="project-modal-contribution-group__title">${contrib.category}</h3>
                <ul class="project-modal-contribution-group__list">
                    ${contrib.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
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
            } else if (modalData.videoType === 'image') {
                return `<img
                    src="${modalData.videoSrc}"
                    alt="${modalData.title}"
                    style="width: 100%; height: 100%; object-fit: contain;">`;
            } else if (modalData.videoType === 'video' || modalData.videoType === 'local') {
                // Local video file
                return `<video
                    controls
                    preload="${modalData.videoPoster ? 'none' : 'metadata'}"
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

        // Create modals for side projects and for projects shown in the skills section
        [...this.data.sideProjects.projects, ...(this.data.skills.projects || [])].forEach(project => {
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
        const contributionsHTML = this.generateContributionsHTML(modalData.contributions);

        // Build platforms HTML if available
        const platformsHTML = modalData.platforms ? `
            <div class="project-header__platforms">
                <span class="platform-text">${modalData.platforms.join(' / ')}</span>
            </div>
        ` : '';

        // Optional one-paragraph summary and external links
        const summaryHTML = modalData.summary
            ? `<p class="project-modal-header__summary">${modalData.summary}</p>`
            : '';
        const linksHTML = modalData.links && modalData.links.length > 0 ? `
            <div class="cloud-container project-modal-info-box">
                <h3 class="project-modal-info-box__title">Links</h3>
                <div class="project-modal-info-box__tags">
                    ${modalData.links.map(link => `<a class="tag" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join('')}
                </div>
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


        // Build features section for side projects (image/video + description like skills section)
        const featuresHTML = isSideProject && modalData.features && modalData.features.length > 0 ? `
            <div class="project-modal-features">
                <h2 class="project-modal__section-title">Project Highlights</h2>
                ${modalData.features.map(feature => {
                    // Check if the feature media is a video (mp4) or image
                    const isVideo = feature.image && feature.image.toLowerCase().endsWith('.mp4');
                    const mediaHTML = isVideo
                        ? `<video
                            autoplay
                            muted
                            loop
                            playsinline
                            preload="auto"
                            style="width: 100%; height: 100%; object-fit: contain;">
                            <source src="${feature.image}" type="video/mp4">
                        </video>`
                        : `<img src="${feature.image}" alt="${feature.title}">`;

                    return `
                    <div class="project-feature-row">
                        <div class="project-feature-row__image">
                            ${mediaHTML}
                        </div>
                        <div class="project-feature-cloud cloud-container">
                            <h3 class="project-feature-cloud__title">${feature.title}</h3>
                            <p class="project-feature-cloud__description">${feature.description}</p>
                        </div>
                    </div>
                    `;
                }).join('')}
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
                        ${summaryHTML}
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

                            ${linksHTML}
                        </div>
                    </div>
                </div>
            </section>
        `;

        return overlay;
    }

    /**
     * Helper: Extract YouTube video ID from URL
     */
    extractYoutubeId(url) {
        // Handle different YouTube URL formats:
        // - https://www.youtube.com/watch?v=VIDEO_ID
        // - https://youtu.be/VIDEO_ID
        // - https://www.youtube.com/embed/VIDEO_ID
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
            /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }

        return null;
    }
}

// Export for use in main.js
window.ContentLoader = ContentLoader;
