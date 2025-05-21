// Smooth scroll to story when clicking from index page
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        // Get the target element
        const targetElement = document.querySelector(window.location.hash);
        
        if (targetElement) {
            // Calculate the header height (header-top + navbar)
            const headerHeight = 110; // 38px (header-top) + 72px (navbar)
            
            // Scroll to the element with a smooth behavior and offset
            setTimeout(() => {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});
