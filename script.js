document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.className = currentTheme + '-mode';
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '🌙';
            themeToggle.title = '切换到白天模式';
        } else {
            themeIcon.textContent = '☀️';
            themeToggle.title = '切换到黑夜模式';
        }
    }
    
    // Initialize theme icon
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.className = newTheme + '-mode';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a nice transition effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for active nav highlighting
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
                
                // Remove active class from all nav items
                navLinks.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to corresponding nav item
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Copy code functionality
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '📋';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: rgba(59, 130, 246, 0.8);
            border: none;
            border-radius: 4px;
            color: white;
            padding: 0.5rem;
            cursor: pointer;
            font-size: 0.875rem;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyBtn);
        
        // Show copy button on hover
        block.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
        
        // Copy functionality
        copyBtn.addEventListener('click', async () => {
            const code = block.querySelector('code');
            if (code) {
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    copyBtn.innerHTML = '✅';
                    copyBtn.style.background = 'rgba(16, 185, 129, 0.8)';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋';
                        copyBtn.style.background = 'rgba(59, 130, 246, 0.8)';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = code.textContent;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    copyBtn.innerHTML = '✅';
                    copyBtn.style.background = 'rgba(16, 185, 129, 0.8)';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋';
                        copyBtn.style.background = 'rgba(59, 130, 246, 0.8)';
                    }, 2000);
                }
            }
        });
    });
    
    // Back to top functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Mobile menu toggle functionality
    if (window.innerWidth <= 1024) {
        const sidebarNav = document.querySelector('.sidebar-nav');
        let isExpanded = false;
        
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '☰';
        toggleBtn.className = 'mobile-nav-toggle';
        toggleBtn.style.cssText = `
            display: block;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: white;
            padding: 0.5rem;
            margin-bottom: 1rem;
            cursor: pointer;
            width: 100%;
            font-size: 1rem;
        `;
        
        sidebarNav.parentNode.insertBefore(toggleBtn, sidebarNav);
        
        // Initially hide nav on mobile
        sidebarNav.style.maxHeight = '0';
        sidebarNav.style.overflow = 'hidden';
        sidebarNav.style.transition = 'max-height 0.3s ease';
        
        toggleBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                sidebarNav.style.maxHeight = sidebarNav.scrollHeight + 'px';
                toggleBtn.innerHTML = '✕';
            } else {
                sidebarNav.style.maxHeight = '0';
                toggleBtn.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when a nav item is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024 && isExpanded) {
                    sidebarNav.style.maxHeight = '0';
                    toggleBtn.innerHTML = '☰';
                    isExpanded = false;
                }
            });
        });
    }
    
    // Add parallax effect to background stars
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.body;
        const speed = scrolled * 0.5;
        
        parallax.style.backgroundPosition = `0 ${speed}px`;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Animate sections on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply animation to sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(section);
    });
    
    // Image click to enlarge functionality
    const clickableImages = document.querySelectorAll('.clickable-image');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal && modalImage && modalClose) {
        // Add click event to all clickable images
        clickableImages.forEach(image => {
            image.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImage.src = this.src;
                modalImage.alt = this.alt;
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            });
        });
        
        // Close modal when clicking the close button
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scroll
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scroll
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scroll
            }
        });
    }
});