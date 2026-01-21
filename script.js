// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');
    const themeToggle = document.getElementById('themeToggle');
    const downloadBtn = document.getElementById('downloadBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const resumeDownloadBtn = document.getElementById('resumeDownloadBtn');
    const contentEl = document.querySelector('.content');

    // Check for saved theme preference first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Navigation handling
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            pageSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding section
            const targetPage = this.getAttribute('data-page');
            const targetSection = document.getElementById(targetPage);
            if (targetSection) {
                targetSection.classList.add('active');
                if (contentEl) contentEl.scrollTop = 0;
            }
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        const body = document.body;
        const icon = this.querySelector('i');
        
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Download functionality - PDF
    function downloadResumePDF() {
        const link = document.createElement('a');
        link.href = 'resume/Meenakshi_Jha_resume.pdf';
        link.download = 'Meenakshi_Jha_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadBtn.addEventListener('click', function() {
        // Prefer showing the Resume section; user can download from there too.
        navItems.forEach(nav => nav.classList.remove('active'));
        pageSections.forEach(section => section.classList.remove('active'));

        const resumeNav = document.querySelector('[data-page="resume"]');
        const resumeSection = document.getElementById('resume');
        if (resumeNav && resumeSection) {
            resumeNav.classList.add('active');
            resumeSection.classList.add('active');
            if (contentEl) contentEl.scrollTop = 0;
            return;
        }

        downloadResumePDF();
    });

    if (resumeDownloadBtn) {
        resumeDownloadBtn.addEventListener('click', downloadResumePDF);
    }

    // Learn More button
    learnMoreBtn.addEventListener('click', function() {
        // Navigate to About section
        navItems.forEach(nav => nav.classList.remove('active'));
        pageSections.forEach(section => section.classList.remove('active'));
        
        document.querySelector('[data-page="about"]').classList.add('active');
        document.getElementById('about').classList.add('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (contentEl && heroSection) {
        contentEl.addEventListener('scroll', () => {
            const scrolled = contentEl.scrollTop || 0;
            heroSection.style.transform = `translateY(${scrolled * 0.12}px)`;
        });
    }

    // Add typing effect to name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                nameElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// Add intersection observer for animations
document.addEventListener('DOMContentLoaded', () => {
    const contentEl = document.querySelector('.content');
    const observerOptions = {
        threshold: 0.12,
        root: contentEl || null,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Add animate class for timeline items and education cards
                if (entry.target.classList.contains('timeline-item') ||
                    entry.target.classList.contains('education-card')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .skills-grid, .projects-grid');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Observe timeline items, education cards, skill categories, and project cards specifically
    const timelineItems = document.querySelectorAll('.timeline-item');
    const educationCards = document.querySelectorAll('.education-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    const projectCards = document.querySelectorAll('.project-card');
    
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    educationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(category);
    });
    
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Resume section reveal
    const resumeBits = document.querySelectorAll('.resume-card, .resume-note, .section-subtitle');
    resumeBits.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.12}s`;
        observer.observe(el);
    });
});
