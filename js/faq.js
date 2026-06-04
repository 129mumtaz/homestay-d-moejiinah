document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.faq-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Find parent item and the content
            const item = toggle.closest('.faq-item');
            const content = item.querySelector('.faq-content');
            const icon = toggle.querySelector('i');

            // Check if current is already active
            const isActive = content.style.maxHeight;

            // Close all other open items first
            document.querySelectorAll('.faq-content').forEach(c => {
                c.style.maxHeight = null;
            });
            document.querySelectorAll('.faq-toggle i').forEach(i => {
                i.style.transform = 'rotate(0deg)';
                i.parentElement.classList.remove('text-primary');
            });

            // If it wasn't active, open it
            if (!isActive) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
                toggle.classList.add('text-primary');
            }
        });
    });
});
