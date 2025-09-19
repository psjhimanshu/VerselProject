// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contactForm');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a nav item is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
if (contactForm) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbznqyBrPdOgvOECbpe9GolDr1gZyik-sLKSwooC4xsHDg8kHqpi1LQydeRx76WiEhkpCg/exec'; // paste your own web app URL here

    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
  
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
  
      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        alert("Message sent successfully!");
        document.getElementById('contactForm').reset();
      })
      .catch(error => {
        alert("Something went wrong. Please try again.");
        console.error('Error!', error.message);
      });
    });
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form submission message
function showFormMessage(message, type) {
    // Check if a message element already exists
    let messageElement = document.querySelector('.form-message');
    
    // If it doesn't exist, create it
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        contactForm.appendChild(messageElement);
    }
    
    // Add appropriate class based on message type
    messageElement.className = `form-message ${type === 'error' ? 'error' : 'success'}`;
    messageElement.textContent = message;
    
    // Add styling
    messageElement.style.padding = '10px';
    messageElement.style.marginTop = '15px';
    messageElement.style.borderRadius = '5px';
    
    if (type === 'error') {
        messageElement.style.backgroundColor = '#ffebee';
        messageElement.style.color = '#c62828';
        messageElement.style.border = '1px solid #ffcdd2';
    } else {
        messageElement.style.backgroundColor = '#e8f5e9';
        messageElement.style.color = '#2e7d32';
        messageElement.style.border = '1px solid #c8e6c9';
    }
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Add animation for sections when they come into view
const sections = document.querySelectorAll('.section');

// Create observer for animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Observe all sections
sections.forEach(section => {
    // Add initial style to all sections (hidden until in view)
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    observer.observe(section);
});

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS rule for animation
    const style = document.createElement('style');
    style.textContent = `
        .section.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Auto-animate the first section
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        setTimeout(() => {
            firstSection.classList.add('animate');
        }, 300);
    }
});

// Add back-to-top button
window.addEventListener('DOMContentLoaded', () => {
    // Create button element
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);
    
    // Style the button
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.fontSize = '20px';
    backToTopButton.style.backgroundColor = 'var(--primary-color)';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.display = 'none';
    backToTopButton.style.alignItems = 'center';
    backToTopButton.style.justifyContent = 'center';
    backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    backToTopButton.style.transition = 'all 0.3s ease';
    
    // Add hover effect
    backToTopButton.addEventListener('mouseover', () => {
        backToTopButton.style.backgroundColor = 'var(--secondary-color)';
        backToTopButton.style.transform = 'translateY(-3px)';
        backToTopButton.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
    
    backToTopButton.addEventListener('mouseout', () => {
        backToTopButton.style.backgroundColor = 'var(--primary-color)';
        backToTopButton.style.transform = 'translateY(0)';
        backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    });
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add project filters (if there are more projects)
const addProjectFilters = () => {
    const projectsSection = document.querySelector('#projects .container');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Only add filters if there are more than 3 projects
    if (projectCards.length > 3) {
        // Create filter element
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        filterContainer.style.display = 'flex';
        filterContainer.style.justifyContent = 'center';
        filterContainer.style.marginBottom = '2rem';
        filterContainer.style.gap = '1rem';
        
        // Get unique technologies from projects
        const technologies = new Set();
        projectCards.forEach(card => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                technologies.add(tag.textContent);
            });
        });
        
        // Add "All" filter
        const allFilter = document.createElement('button');
        allFilter.textContent = 'All';
        allFilter.className = 'filter-btn active';
        filterContainer.appendChild(allFilter);
        
        // Add tech filters
        technologies.forEach(tech => {
            const filterBtn = document.createElement('button');
            filterBtn.textContent = tech;
            filterBtn.className = 'filter-btn';
            filterContainer.appendChild(filterBtn);
        });
        
        // Style the buttons
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.style.padding = '0.5rem 1rem';
            btn.style.backgroundColor = '#fff';
            btn.style.border = '1px solid #ddd';
            btn.style.borderRadius = '30px';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.3s ease';
            
            btn.addEventListener('mouseover', () => {
                if (!btn.classList.contains('active')) {
                    btn.style.backgroundColor = '#f0f0f0';
                }
            });
            
            btn.addEventListener('mouseout', () => {
                if (!btn.classList.contains('active')) {
                    btn.style.backgroundColor = '#fff';
                }
            });
        });
        
        // Style the active button
        const activeBtn = filterContainer.querySelector('.active');
        activeBtn.style.backgroundColor = 'var(--primary-color)';
        activeBtn.style.color = '#fff';
        activeBtn.style.borderColor = 'var(--primary-color)';
        
        // Insert filter at the beginning of the projects section
        projectsSection.insertBefore(filterContainer, projectsSection.querySelector('.projects-grid'));
        
        // Add filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.backgroundColor = '#fff';
                    b.style.color = '#333';
                    b.style.borderColor = '#ddd';
                });
                
                // Add active class to clicked button
                btn.classList.add('active');
                btn.style.backgroundColor = 'var(--primary-color)';
                btn.style.color = '#fff';
                btn.style.borderColor = 'var(--primary-color)';
                
                // Filter projects
                const filter = btn.textContent;
                
                projectCards.forEach(card => {
                    if (filter === 'All') {
                        card.style.display = 'block';
                    } else {
                        const techTags = Array.from(card.querySelectorAll('.tech-tag'));
                        const hasTag = techTags.some(tag => tag.textContent === filter);
                        
                        if (hasTag) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
};

// Initialize project filters (if needed)