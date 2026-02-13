/**
 * Main JavaScript File
 * Scuba Dive Center
 */

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');

            if (isActive) {
                // Mobile menu styling
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'fixed';
                navLinks.style.top = '0';
                navLinks.style.right = '0';
                navLinks.style.width = '300px';
                navLinks.style.height = '100vh';
                navLinks.style.backgroundColor = 'var(--light)';
                navLinks.style.padding = '80px 40px 40px';
                navLinks.style.boxShadow = '-10px 0 30px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '999';

                // Add closing button or handle clicks outside
                mobileToggle.innerHTML = '<i class="fa-solid fa-times"></i>';
                mobileToggle.style.position = 'fixed';
                mobileToggle.style.top = '15px';
                mobileToggle.style.right = '20px';
                mobileToggle.style.zIndex = '1001';
                mobileToggle.style.color = 'var(--dark)';

                if (window.innerWidth <= 550) {
                    let mobileAuth = navLinks.querySelector('.mobile-auth-container');
                    if (!mobileAuth) {
                        mobileAuth = document.createElement('div');
                        mobileAuth.className = 'mobile-auth-container';
                        const headerActions = document.querySelector('.header-actions');
                        if (headerActions) {
                            mobileAuth.innerHTML = headerActions.innerHTML;
                            const hiddenElements = mobileAuth.querySelectorAll('.d-none');
                            hiddenElements.forEach(el => el.classList.remove('d-none'));
                            // Append AFTER links
                            navLinks.appendChild(mobileAuth);
                        }
                    }
                }
            } else {
                navLinks.style.display = 'none';
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                mobileToggle.style.position = 'static';
                mobileToggle.style.color = 'var(--dark)';
            }
        });

        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                mobileToggle.style.position = 'static';
            });
        });
    }

    // Sticky Header Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            header.style.padding = '0'; // Compress slightly if needed
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animation classes (Simple intersection observer)
    // This allows elements to fade in as we scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section h2, .hero-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Inject styles for the animation
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme on load
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeToggle.innerHTML = next === 'dark'
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        });
    }

});
