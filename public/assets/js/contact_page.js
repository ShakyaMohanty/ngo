document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('mainContactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };

            // Here you would typically send this data to your backend or email service
            console.log('Contact form data:', data);

            // For now, we'll just show an alert and clear the form
            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
        });
    }
}); 