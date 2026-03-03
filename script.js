/* ============================================
   ELORA — Luxury Women's Fashion
   script.js — Complete Interactivity
   ============================================ */

(function () {
    'use strict';

    /* ==================== DOM REFERENCES ==================== */
    const DOM = {
        loader: document.getElementById('loader'),
        navbar: document.getElementById('navbar'),
        navLinks: document.querySelectorAll('.nav-link'),
        hamburger: document.getElementById('hamburger'),
        mobileMenu: document.getElementById('mobile-menu'),
        mobileLinks: document.querySelectorAll('.mobile-link'),
        cursorGlow: document.getElementById('cursor-glow'),
        heroParticles: document.getElementById('hero-particles'),
        heroFadeIns: document.querySelectorAll('.fade-in'),
        lightbox: document.getElementById('lightbox'),
        lightboxImg: document.getElementById('lightbox-img'),
        lightboxClose: document.getElementById('lightbox-close'),
        lightboxPrev: document.getElementById('lightbox-prev'),
        lightboxNext: document.getElementById('lightbox-next'),
        lookbookItems: document.querySelectorAll('.lookbook-item'),
        contactForm: document.getElementById('contact-form'),
        formSubmit: document.getElementById('form-submit'),
        newsletterForm: document.getElementById('newsletter-form'),
        musicToggle: document.getElementById('music-toggle'),
        toast: document.getElementById('toast'),
        toastMessage: document.getElementById('toast-message'),
        statNumbers: document.querySelectorAll('.stat-number'),
        animatedUnderline: document.querySelector('.animated-underline'),
        addBagBtns: document.querySelectorAll('.btn-add-bag'),
    };

    /* ==================== LOADING SCREEN ==================== */
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.loader.classList.add('hidden');
            startHeroAnimations();
        }, 2000);
    });

    /* ==================== HERO FADE-IN ANIMATIONS ==================== */
    function startHeroAnimations() {
        DOM.heroFadeIns.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('animate');
            }, 200 + i * 180);
        });
    }

    /* ==================== HERO PARTICLES ==================== */
    function createParticles() {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = (60 + Math.random() * 40) + '%';
            particle.style.width = (3 + Math.random() * 6) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (6 + Math.random() * 10) + 's';
            particle.style.animationDelay = (Math.random() * 8) + 's';
            DOM.heroParticles.appendChild(particle);
        }
    }
    createParticles();

    /* ==================== CURSOR GLOW ==================== */
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;
    let isTouchDevice = 'ontouchstart' in window;

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            DOM.cursorGlow.classList.add('active');
        });

        function animateCursorGlow() {
            glowX += (cursorX - glowX) * 0.08;
            glowY += (cursorY - glowY) * 0.08;
            DOM.cursorGlow.style.left = glowX + 'px';
            DOM.cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateCursorGlow);
        }
        animateCursorGlow();

        document.addEventListener('mouseleave', () => {
            DOM.cursorGlow.classList.remove('active');
        });
        document.addEventListener('mouseenter', () => {
            DOM.cursorGlow.classList.add('active');
        });
    }

    /* ==================== NAVBAR SCROLL ==================== */
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    /* ==================== ACTIVE NAV LINK ==================== */
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    DOM.navLinks.forEach((l) => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });

    /* ==================== HAMBURGER MENU ==================== */
    DOM.hamburger.addEventListener('click', () => {
        DOM.hamburger.classList.toggle('active');
        DOM.mobileMenu.classList.toggle('open');
        document.body.style.overflow = DOM.mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    DOM.mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            DOM.hamburger.classList.remove('active');
            DOM.mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ==================== SMOOTH SCROLL FOR NAV LINKS ==================== */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ==================== INTERSECTION OBSERVER — SCROLL REVEALS ==================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px',
        }
    );

    revealElements.forEach((el, index) => {
        el.style.transitionDelay = (index % 4) * 0.1 + 's';
        revealObserver.observe(el);
    });

    /* ==================== ANIMATED UNDERLINE ==================== */
    if (DOM.animatedUnderline) {
        const underlineObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        DOM.animatedUnderline.classList.add('visible');
                        underlineObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        underlineObserver.observe(DOM.animatedUnderline);
    }

    /* ==================== COUNTER ANIMATION ==================== */
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current >= target) {
                el.textContent = target;
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        update();
    }

    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    numbers.forEach((n) => animateCounter(n));
                    statsObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }

    /* ==================== LIGHTBOX ==================== */
    let currentLightboxIndex = 0;
    const lookbookImages = [];

    DOM.lookbookItems.forEach((item) => {
        const img = item.querySelector('.lookbook-img');
        if (img) lookbookImages.push(img.src);

        item.addEventListener('click', () => {
            currentLightboxIndex = parseInt(item.getAttribute('data-index'), 10);
            openLightbox(currentLightboxIndex);
        });
    });

    function openLightbox(index) {
        DOM.lightboxImg.src = lookbookImages[index];
        DOM.lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        DOM.lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    DOM.lightboxClose.addEventListener('click', closeLightbox);
    DOM.lightbox.addEventListener('click', (e) => {
        if (e.target === DOM.lightbox) closeLightbox();
    });

    DOM.lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + lookbookImages.length) % lookbookImages.length;
        DOM.lightboxImg.src = lookbookImages[currentLightboxIndex];
    });

    DOM.lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % lookbookImages.length;
        DOM.lightboxImg.src = lookbookImages[currentLightboxIndex];
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!DOM.lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') DOM.lightboxPrev.click();
        if (e.key === 'ArrowRight') DOM.lightboxNext.click();
    });

    /* ==================== BUTTON RIPPLE EFFECT ==================== */
    document.querySelectorAll('.btn').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    /* ==================== ADD TO BAG BUTTONS ==================== */
    DOM.addBagBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            showToast(`${name} added to bag!`);
        });
    });

    /* ==================== TOAST NOTIFICATION ==================== */
    let toastTimeout;

    function showToast(message) {
        DOM.toastMessage.textContent = message;
        DOM.toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            DOM.toast.classList.remove('show');
        }, 3000);
    }

    /* ==================== CONTACT FORM ==================== */
    DOM.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) {
            showToast('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            showToast('Please enter a valid email.');
            return;
        }

        // Loading state
        DOM.formSubmit.classList.add('loading');
        DOM.formSubmit.disabled = true;

        setTimeout(() => {
            DOM.formSubmit.classList.remove('loading');
            DOM.formSubmit.classList.add('success');
            showToast('Message sent successfully!');

            setTimeout(() => {
                DOM.formSubmit.classList.remove('success');
                DOM.formSubmit.disabled = false;
                DOM.contactForm.reset();
            }, 2000);
        }, 1500);
    });

    /* ==================== NEWSLETTER FORM ==================== */
    DOM.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value.trim();
        if (!email || !isValidEmail(email)) {
            showToast('Please enter a valid email.');
            return;
        }
        showToast('Thanks for subscribing! ✨');
        DOM.newsletterForm.reset();
    });

    /* ==================== EMAIL VALIDATION ==================== */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /* ==================== PARALLAX EFFECT ==================== */
    const heroImage = document.querySelector('.hero-image');

    function handleParallax() {
        const scrollY = window.scrollY;
        if (heroImage && scrollY < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollY * 0.12}px)`;
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    /* ==================== MUSIC TOGGLE ==================== */
    let musicPlaying = false;
    let audioCtx = null;
    let oscillator = null;

    DOM.musicToggle.addEventListener('click', () => {
        if (!musicPlaying) {
            // Create a very soft ambient tone
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.start();
                musicPlaying = true;
                DOM.musicToggle.classList.add('playing');
                showToast('Ambient sound playing 🎵');
            } catch (err) {
                showToast('Audio not supported on this browser.');
            }
        } else {
            if (oscillator) {
                oscillator.stop();
                oscillator = null;
            }
            if (audioCtx) {
                audioCtx.close();
                audioCtx = null;
            }
            musicPlaying = false;
            DOM.musicToggle.classList.remove('playing');
            showToast('Music paused');
        }
    });

    /* ==================== STAGGERED REVEAL FOR PRODUCT CARDS ==================== */
    const productCards = document.querySelectorAll('.product-card');

    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 120);
                    cardObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    productCards.forEach((card) => cardObserver.observe(card));

    /* ==================== LOOKBOOK STAGGER ==================== */
    const lookbookObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.getAttribute('data-index'), 10);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, idx * 100);
                    lookbookObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    DOM.lookbookItems.forEach((item) => lookbookObserver.observe(item));

})();
