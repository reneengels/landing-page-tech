// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = () => {
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            mobileMenuBtn.innerHTML = '<i class="w-6 h-6 text-white" data-lucide="x"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            mobileMenuBtn.innerHTML = '<i class="w-6 h-6 text-white" data-lucide="menu"></i>';
        }
        lucide.createIcons();
    };

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Prevent menu from closing when clicking inside it
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (!isHidden && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });
}

// Scroll Interactions (Smooth nav, fade-ins, active state)
(function () {
    if (!('IntersectionObserver' in window)) {
        // Fallback: show cards immediately
        document.querySelectorAll('.metodo-card, .fade-in-up').forEach(el => el.classList.add('is-visible'));
        return;
    }

    // --- 1. Fade-In Elements (Once per load) ---
    const cards = document.querySelectorAll('.metodo-card, .fade-in-up');
    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.dataset.staggerIndex || '0', 10);
                    setTimeout(() => entry.target.classList.add('is-visible'), idx * 300);
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        cards.forEach(card => cardObserver.observe(card));
    }

    // --- 2. Active Nav Highlight on Scroll ---
    const navLinks = document.querySelectorAll('a.ds-nav-link[href^="#"]');
    if (navLinks.length > 0) {
        const linkMap = {};
        navLinks.forEach(link => {
            const id = link.getAttribute('href').replace('#', '');
            if (id) linkMap[id] = true;
        });

        const sectionIds = Object.keys(linkMap);
        if (sectionIds.length > 0) {
            const visibility = {};
            const setActive = () => {
                let activeId = null;
                let maxRatio = 0;
                Object.entries(visibility).forEach(([id, ratio]) => {
                    if (ratio > maxRatio) {
                        maxRatio = ratio;
                        activeId = id;
                    }
                });

                navLinks.forEach(link => link.classList.remove('is-active'));
                if (activeId) {
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === '#' + activeId) {
                            link.classList.add('is-active');
                        }
                    });
                }
            };

            const navObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    visibility[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
                });
                setActive();
            }, {
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: '-80px 0px -40% 0px'
            });

            sectionIds.forEach(id => {
                const section = document.getElementById(id);
                if (section) navObserver.observe(section);
            });
        }
    }
})();
