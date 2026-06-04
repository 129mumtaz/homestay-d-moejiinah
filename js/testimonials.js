document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonial-track');
    const items = document.querySelectorAll('.slider-item');
    const prevBtn = document.getElementById('prev-testi');
    const nextBtn = document.getElementById('next-testi');
    
    if (!track || items.length === 0) return;

    let currentIndex = 0;
    const itemsCount = items.length;
    
    // Determine visible items based on screen size
    function getVisibleItems() {
        if (window.innerWidth >= 1024) return 3; // lg
        if (window.innerWidth >= 768) return 2;  // md
        return 1;                                // sm
    }

    function updateSlider() {
        const visibleItems = getVisibleItems();
        // Prevent sliding past the end
        if (currentIndex > itemsCount - visibleItems) {
            currentIndex = Math.max(0, itemsCount - visibleItems);
        }
        
        const itemWidth = 100 / visibleItems;
        track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    }

    window.addEventListener('resize', updateSlider);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const visibleItems = getVisibleItems();
            if (currentIndex < itemsCount - visibleItems) {
                currentIndex++;
                updateSlider();
            } else {
                // loop back to start
                currentIndex = 0;
                updateSlider();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            } else {
                // loop to end
                const visibleItems = getVisibleItems();
                currentIndex = Math.max(0, itemsCount - visibleItems);
                updateSlider();
            }
        });
    }

    // Auto slide
    let autoSlide = setInterval(() => {
        if (nextBtn) nextBtn.click();
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            if (nextBtn) nextBtn.click();
        }, 5000);
    });
});
