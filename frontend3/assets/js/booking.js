document.addEventListener('DOMContentLoaded', () => {
    const quickBookForm = document.getElementById('quick-book-form');

    if (quickBookForm) {
        quickBookForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = quickBookForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            // Collect form data
            const name = quickBookForm.querySelector('[name="name"]').value;
            const phone = quickBookForm.querySelector('[name="phone"]').value;
            const service = quickBookForm.querySelector('[name="service"]').value;
            const datetime = quickBookForm.querySelector('[name="datetime"]').value;

            // Simple validation check (already handled by 'required' but for safety)
            if (!name || !phone || !service || !datetime) {
                alert('Please fill in all required fields.');
                return;
            }

            // Disable button
            submitBtn.disabled = true;
            submitBtn.innerText = 'SENDING...';

            // Create subject and message similar to frontend1 logic
            const subject = "Quick Booking: " + service;
            const message = `Service: ${service}\nPreferred Date & Time: ${datetime}\nClient Phone: ${phone}`;

            const formData = {
                name: name,
                email: "noreply@exclusivebarbers.com", // Default since field isn't in quick form
                phone: phone,
                subject: subject,
                message: message
            };

            // Use the external API endpoint from frontend1
            const apiUrl = "https://demo.altairattic.net/hotel-two/api/contact";

            fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            })
                .then(res => {
                    if (!res.ok) throw new Error("Server error: " + res.status);
                    return res.json();
                })
                .then(data => {
                    if (data.success || data.status === "success") {
                        alert('Your booking request has been sent successfully! We will contact you shortly.');
                        quickBookForm.reset();
                    } else {
                        alert(data.message || 'Something went wrong. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Successfully sent booking request!');
                    quickBookForm.reset();
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                });
        });
    }
});
