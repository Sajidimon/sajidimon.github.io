// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle with animation
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle.querySelector('i');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
            menuIcon.classList.add('animate-spin-once');
            
            // Remove the animation class after it completes
            setTimeout(() => {
                menuIcon.classList.remove('animate-spin-once');
            }, 300);
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }
    
    // Add animation class for menu icon spin
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spinOnce {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .animate-spin-once {
            animation: spinOnce 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scrolling for all anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's a non-anchor link
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Add active class to clicked link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('text-primary');
            });
            this.classList.add('text-primary');
            
            // Smooth scroll to target
            const headerOffset = 90;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Add hash to URL without jumping
            history.pushState(null, null, targetId);
        });
    });
    
    // Active link highlighting based on scroll position with intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('text-primary');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-primary');
                    }
                });
                
                // Add animation class to section
                entry.target.classList.add('animate-fadeIn');
                
                // Remove observer after first animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize first section as active
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.classList.add('animate-fadeIn');
    }
    
    // Animate skill bars with Intersection Observer for better performance
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    entry.target.style.width = width + '%';
                    entry.target.style.opacity = '1';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all skill bars
    skillBars.forEach(bar => {
        bar.style.width = '0';
        bar.style.opacity = '0';
        bar.style.transition = 'width 1.5s ease-in-out, opacity 0.5s ease-in-out';
        skillBarObserver.observe(bar);
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (window.innerWidth / 2 - clientX) / 100;
            const y = (window.innerHeight / 2 - clientY) / 100;
            
            const elements = heroSection.querySelectorAll('*');
            elements.forEach((element, index) => {
                const speed = (index + 1) * 0.1;
                element.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
    
    // Enhanced form submission with loading state and better UX
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            
            try {
                // Simulate form submission (replace with actual fetch/axios call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded relative';
                successMessage.innerHTML = `
                    <span class="block sm:inline">Thank you for your message! I'll get back to you soon.</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                        </svg>
                    </span>
                `;
                
                // Remove any existing messages
                const existingMessage = contactForm.querySelector('.mt-4');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Auto-remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
                
            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded';
                errorMessage.textContent = 'Something went wrong. Please try again later.';
                
                // Remove any existing messages
                const existingMessage = contactForm.querySelector('.mt-4');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                contactForm.appendChild(errorMessage);
                
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
        
        // Add input focus effects
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Add focus styles
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('ring-2', 'ring-blue-500');
            });
            
            // Remove focus styles
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('ring-2', 'ring-blue-500');
            });
        });
    }
    
    // Add scroll reveal animation for elements with data-animate attribute
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-animate]').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateOnScroll.observe(element);
    });
    
    // Add hover effect for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        const content = card.querySelector('.project-content');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            
            if (overlay) {
                overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.7) 100%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            if (overlay) {
                overlay.style.background = 'rgba(0,0,0,0.5)';
            }
        });
    });
});