document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donationForm');
    const customAmountInput = document.getElementById('customAmount');
    const customAmountDiv = document.querySelector('.custom-amount');
    const amountInputs = document.querySelectorAll('input[name="amount"]');

    // Handle custom amount selection
    amountInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                customAmountDiv.style.display = 'block';
                customAmountInput.required = true;
            } else {
                customAmountDiv.style.display = 'none';
                customAmountInput.required = false;
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            userType: formData.get('userType'),
            campaign: formData.get('campaign') || 'general',
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            amount: formData.get('amount') === 'custom' 
                ? formData.get('customAmount') 
                : formData.get('amount')
        };

        // Here you would typically send this data to your payment gateway
        console.log('Form data:', data);
        
        // For now, we'll just show an alert
        alert('Thank you for your donation! This would proceed to payment gateway in production.');
    });

    // Add hover effects for amount options
    const amountOptions = document.querySelectorAll('.amount-option');
    amountOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            if (!option.querySelector('input[type="radio"]').checked) {
                option.querySelector('span').style.borderColor = 'var(--primary-light)';
            }
        });

        option.addEventListener('mouseleave', () => {
            if (!option.querySelector('input[type="radio"]').checked) {
                option.querySelector('span').style.borderColor = 'var(--gray-light)';
            }
        });
    });
});
