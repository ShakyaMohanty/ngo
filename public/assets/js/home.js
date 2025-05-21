// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Active link functionality
const navLinksItems = document.querySelectorAll('.nav-links a');

// Function to handle smooth scrolling with offset
function smoothScrollTo(targetId) {
    // Special handling for home link
    if (targetId === '#home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const headerHeight = 110; // 38px (header-top) + 72px (navbar)
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px extra padding

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Set active class based on current URL
function setActiveLink() {
    const currentHash = window.location.hash || '#home';
    navLinksItems.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set initial active state
setActiveLink();

// Update active state when clicking links
navLinksItems.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // Check if the target is an internal anchor on the same page
        if (targetId.startsWith('#')) {
            e.preventDefault(); // Prevent default anchor behavior

            // Remove active class from all links
            navLinksItems.forEach(item => item.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Close mobile menu when clicking a link
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');

            // Update hash and smooth scroll
            window.location.hash = targetId;
            smoothScrollTo(targetId);
        } else {
            // For links to other HTML files, allow default navigation
            // No need to preventDefault() here

            // Close mobile menu when clicking a link, even for external links
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Update active state when using browser navigation
// This listener should ideally only be active on index.html
// A more robust solution might involve conditional logic based on the current page URL
// But for now, we'll keep it as is, assuming smoothScrollTo handles the #home case
window.addEventListener('hashchange', () => {
    setActiveLink();
    // Only attempt to smooth scroll if the hash corresponds to an element ID on the current page
    if (document.querySelector(window.location.hash)) {
      smoothScrollTo(window.location.hash);
    }
});

// Success Stories slider functionality
const slider = document.querySelector('.stories-slider');
const leftArrow = document.querySelector('.slider-arrow.left');
const rightArrow = document.querySelector('.slider-arrow.right');

if (slider && leftArrow && rightArrow) {
    function getCardWidth() {
        const card = slider.querySelector('.story-card');
        if (!card) return 340;
        const style = window.getComputedStyle(card);
        const gap = parseInt(style.marginRight || 0) + 32; // fallback gap
        return card.offsetWidth + 32; // 32px is the gap set in CSS
    }
    leftArrow.addEventListener('click', () => {
        slider.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', () => {
        slider.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });
}

// Partner Logos slider functionality
const partnerSlider = document.querySelector('.partner-logos-slider');
const partnerLeftArrow = document.querySelector('.partner-slider-arrow.left');
const partnerRightArrow = document.querySelector('.partner-slider-arrow.right');

if (partnerSlider && partnerLeftArrow && partnerRightArrow) {
    function getVisibleLogos() {
        return window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
    }

    function getScrollAmount() {
        const logos = partnerSlider.querySelectorAll('img');
        const logoWidth = logos[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(partnerSlider).gap);
        return logoWidth + gap;
    }

    function updateSliderPosition() {
        const logos = partnerSlider.querySelectorAll('img');
        const visibleLogos = getVisibleLogos();
        const totalLogos = logos.length;
        const maxScroll = (totalLogos - visibleLogos) * getScrollAmount();
        
        // Enable/disable arrows based on scroll position
        partnerLeftArrow.style.opacity = partnerSlider.scrollLeft > 0 ? '1' : '0.5';
        partnerRightArrow.style.opacity = partnerSlider.scrollLeft < maxScroll ? '1' : '0.5';
    }

    partnerLeftArrow.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        const newScrollLeft = Math.max(0, partnerSlider.scrollLeft - scrollAmount);
        partnerSlider.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    });

    partnerRightArrow.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        const maxScroll = partnerSlider.scrollWidth - partnerSlider.clientWidth;
        const newScrollLeft = Math.min(maxScroll, partnerSlider.scrollLeft + scrollAmount);
        partnerSlider.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    });

    // Update arrow states on scroll
    partnerSlider.addEventListener('scroll', updateSliderPosition);
    
    // Initial arrow state
    updateSliderPosition();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateSliderPosition();
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get counter elements
    const lifeImpactedCount = document.querySelector('#life-impacted-count');
    const projectCount = document.querySelector('#projects-count');
    const countriesCount = document.querySelector('#countries-count');

    // Function to animate number counting
    function animateNumber(element, target, duration) {
        if (!element) return;
        
        const start = 0;
        const range = target - start;
        const startTime = performance.now();
        const suffix = element.textContent.replace(/[0-9]/g, ''); // Extract suffix (K+ or +)
      
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
      
            element.textContent = Math.floor(start + range * progress) + suffix;
      
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
      
        requestAnimationFrame(update);
    }

    // Animate numbers if elements exist
    if (lifeImpactedCount) animateNumber(lifeImpactedCount, 50, 2000);
    if (projectCount) animateNumber(projectCount, 100, 2000);
    if (countriesCount) animateNumber(countriesCount, 25, 2000);
}); 