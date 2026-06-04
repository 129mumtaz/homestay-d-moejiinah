document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    const sections = document.querySelectorAll('section, header');

    // 1. Sticky Navbar styling on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            if (document.documentElement.classList.contains('dark')) {
                navbar.classList.add('bg-[#1a1a1a]');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.add('bg-[#FAF7F2]'); // Warm Ivory
                navbar.classList.remove('bg-transparent');
            }
        } else {
            navbar.classList.remove('shadow-sm', 'bg-[#FAF7F2]', 'bg-[#1a1a1a]');
            navbar.classList.add('bg-transparent');
        }
        
        // Active state detection
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-accent');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-accent');
            }
        });
    });

    // 2. Mobile Menu Toggle
    let isMenuOpen = false;
    mobileBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileBtn.innerHTML = "<i class='bx bx-x'></i>";
        } else {
            mobileMenu.classList.add('hidden');
            mobileBtn.innerHTML = "<i class='bx bx-menu'></i>";
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileBtn.innerHTML = "<i class='bx bx-menu'></i>";
        });
    });
});
