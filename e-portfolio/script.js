// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Scroll to section when clicking on navigation links
    const navLinks = document.querySelectorAll('nav a, .hero-btns a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process links with hash
            if (this.hash !== '') {
                const hash = this.hash;
                const targetSection = document.querySelector(hash);
                
                // Only process if target section exists and it's on the same page
                if (targetSection && !this.href.includes('html')) {
                    e.preventDefault();
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking
                    if (menu && menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // Add active class to current section in navigation
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight && sectionId) {
                currentSectionId = '#' + sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Call setActiveNavLink on scroll
    window.addEventListener('scroll', function() {
        setActiveNavLink();
    });

    // Recommendation Slider
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Function to show a specific slide
    window.currentSlide = function(n) {
        showSlide(n);
    };

    function showSlide(n) {
        recommendationCards.forEach(card => {
            card.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        recommendationCards[n].classList.add('active');
        dots[n].classList.add('active');
        
        currentSlide = n;
    }

    // Auto change slides every 5 seconds
    if (recommendationCards.length > 0) {
        setInterval(function() {
            currentSlide = (currentSlide + 1) % recommendationCards.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Lifestyle Page Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Social Media Tabs
    const socialTabs = document.querySelectorAll('.social-tab');
    const socialContents = document.querySelectorAll('.social-feed-content');

    socialTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const socialId = this.getAttribute('data-social');
            
            socialTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            socialContents.forEach(content => {
                content.classList.remove('active');
            });
            
            this.classList.add('active');
            document.getElementById(socialId + '-feed').classList.add('active');
        });
    });

    // Poll Form Submission
    const pollForm = document.getElementById('poll-form');
    const pollResults = document.getElementById('poll-results');

    if (pollForm) {
        pollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            pollForm.style.display = 'none';
            pollResults.style.display = 'block';
        });
    }

    // Comment Form Submission
    const commentForm = document.getElementById('comment-form');

    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your comment, ' + name + '! It has been submitted successfully.');
                
                // Reset form
                commentForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            this.classList.add('active');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery Modal Functionality
    const galleryViewButtons = document.querySelectorAll('.gallery-view');
    const galleryModal = document.getElementById('gallery-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Gallery project data
    const galleryProjects = [
        {
            id: 1,
            title: 'E-commerce Website',
            description: 'A fully responsive e-commerce website built from scratch using HTML, CSS, and JavaScript. Features include product filtering, shopping cart functionality, and user authentication.',
            image: '/api/placeholder/800/600',
            date: 'March 2025',
            category: 'Web Development',
            tools: 'HTML, CSS, JavaScript, Node.js',
            link: '#',
            github: '#'
        },
        {
            id: 2,
            title: 'Portfolio Template',
            description: 'A customizable portfolio theme designed for creative professionals. Clean, modern design with easy customization options.',
            image: '/api/placeholder/800/600',
            date: 'February 2025',
            category: 'Web Development',
            tools: 'HTML, CSS, JavaScript, Bootstrap',
            link: '#',
            github: '#'
        },
        {
            id: 3,
            title: 'Blog Platform',
            description: 'A responsive blog template with dark mode toggle, search functionality, and category filtering.',
            image: '/api/placeholder/800/600',
            date: 'January 2025',
            category: 'Web Development',
            tools: 'HTML, CSS, JavaScript, React',
            link: '#',
            github: '#'
        },
        {
            id: 4,
            title: 'Brand Identity',
            description: 'Logo and brand identity design for a local coffee shop. The project included logo design, color palette selection, typography choices, and brand guidelines.',
            image: '/api/placeholder/800/600',
            date: 'December 2024',
            category: 'Design',
            tools: 'Adobe Illustrator, Adobe Photoshop',
            link: '#',
            github: '#'
        },
        {
            id: 5,
            title: 'Mobile App UI',
            description: 'User interface design for a fitness tracking app. The design focuses on intuitive navigation and clear data visualization.',
            image: '/api/placeholder/800/600',
            date: 'November 2024',
            category: 'UI/UX Design',
            tools: 'Figma, Adobe XD',
            link: '#',
            github: '#'
        },
        {
            id: 6,
            title: 'Event Poster',
            description: 'Promotional poster design for a tech conference. The design emphasizes bold typography and modern geometric elements.',
            image: '/api/placeholder/800/600',
            date: 'October 2024',
            category: 'Design',
            tools: 'Adobe Illustrator, Adobe Photoshop',
            link: '#',
            github: '#'
        },
        {
            id: 7,
            title: 'Kuala Lumpur, Malaysia',
            description: 'A photo collection from my exploration of Kuala Lumpur\'s vibrant streets, iconic landmarks, and rich cultural scene.',
            image: '/api/placeholder/800/600',
            date: 'September 2024',
            category: 'Travel Photography',
            tools: 'Sony A7III, Adobe Lightroom',
            link: '#',
            github: '#'
        },
        {
            id: 8,
            title: 'Penang, Malaysia',
            description: 'Documenting the historic streets, street art, and culinary delights of Penang through photography.',
            image: '/api/placeholder/800/600',
            date: 'August 2024',
            category: 'Travel Photography',
            tools: 'Sony A7III, Adobe Lightroom',
            link: '#',
            github: '#'
        },
        {
            id: 9,
            title: 'Langkawi, Malaysia',
            description: 'Capturing the natural beauty, beaches, and landscapes of Langkawi Island.',
            image: '/api/placeholder/800/600',
            date: 'July 2024',
            category: 'Travel Photography',
            tools: 'Sony A7III, Adobe Lightroom',
            link: '#',
            github: '#'
        },
        {
            id: 10,
            title: 'Urban Photography',
            description: 'A series of urban landscape photographs exploring the interplay of architecture, light, and human presence in city environments.',
            image: '/api/placeholder/800/600',
            date: 'June 2024',
            category: 'Photography',
            tools: 'Sony A7III, Adobe Lightroom',
            link: '#',
            github: '#'
        },
        {
            id: 11,
            title: 'Digital Illustrations',
            description: 'A collection of digital art pieces exploring modern themes and abstract concepts through vibrant colors and geometric forms.',
            image: '/api/placeholder/800/600',
            date: 'May 2024',
            category: 'Digital Art',
            tools: 'Procreate, Adobe Illustrator',
            link: '#',
            github: '#'
        },
        {
            id: 12,
            title: 'Concept Sketches',
            description: 'Hand-drawn concept art and sketches for various design projects, showcasing the ideation and development process.',
            image: '/api/placeholder/800/600',
            date: 'April 2024',
            category: 'Illustration',
            tools: 'Traditional Media, Digital Scanning',
            link: '#',
            github: '#'
        }
    ];

    galleryViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = galleryProjects.find(p => p.id === projectId);
            
            if (project) {
                document.getElementById('modal-img').src = project.image;
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-date').textContent = project.date;
                document.getElementById('modal-category').textContent = project.category;
                document.getElementById('modal-tools').textContent = project.tools;
                document.getElementById('modal-link').href = project.link;
                document.getElementById('modal-github').href = project.github;
                
                galleryModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside the content
    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal && galleryModal.style.display === 'flex') {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message, ' + name + '! It has been sent successfully.');
                
                // Reset form
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Highlight active page in navigation based on current page
    function setActivePageNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            
            if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Call setActivePageNav on page load
    setActivePageNav();

    // Weather API Integration (Simulated)
    const weatherWidget = document.getElementById('weather');
    
    if (weatherWidget) {
        // In a real application, you would fetch this data from a weather API
        // For this assignment, we're using simulated data
        const weatherData = {
            location: 'Changlun, Kedah',
            temperature: '32°C',
            condition: 'Sunny',
            icon: 'fa-sun',
            forecast: [
                { day: 'Sun', temp: '31°C', icon: 'fa-cloud-sun' },
                { day: 'Mon', temp: '30°C', icon: 'fa-cloud' },
                { day: 'Tue', temp: '29°C', icon: 'fa-cloud-rain' },
                { day: 'Wed', temp: '32°C', icon: 'fa-sun' }
            ]
        };
        
        // Update weather widget with data
        const weatherInfo = `
            <div class="weather-info">
                <div class="weather-icon">
                    <i class="fas ${weatherData.icon}"></i>
                </div>
                <div class="weather-details">
                    <h3>${weatherData.location}</h3>
                    <p class="temperature">${weatherData.temperature}</p>
                    <p class="condition">${weatherData.condition}</p>
                </div>
            </div>
            <div class="weather-forecast">
                ${weatherData.forecast.map(day => `
                    <div class="forecast-day">
                        <p>${day.day}</p>
                        <i class="fas ${day.icon}"></i>
                        <p>${day.temp}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        weatherWidget.innerHTML = weatherInfo;
    }

    // Smooth scroll to top for 'back to top' button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }

    // Add animation classes when elements come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimation() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Call checkAnimation on scroll
    window.addEventListener('scroll', checkAnimation);
    
    // Call checkAnimation on page load
    checkAnimation();

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference to localStorage
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Image lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});