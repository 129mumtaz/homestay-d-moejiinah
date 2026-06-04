document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Trigger scroll logic for initial reveal after load
                window.dispatchEvent(new Event('scroll'));
            }, 500);
        }, 500); // minimum 500ms display for effect
    });

    // 2. Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();



    // 4. Lazy Loading Images
    const lazyImages = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // 5. Animated Counters
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const isDecimal = counter.hasAttribute('data-decimal');
                const count = +counter.innerText;
                const speed = 200; // lower is slower
                const inc = target / speed;

                if (count < target) {
                    const nextVal = count + inc;
                    counter.innerText = isDecimal ? nextVal.toFixed(1) : Math.ceil(nextVal);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const counterSection = document.querySelector('.counter');
    if (counterSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                runCounters();
                counted = true;
            }
        });
        observer.observe(counterSection);
    }
});
