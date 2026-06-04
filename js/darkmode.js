document.addEventListener('DOMContentLoaded', () => {
    const htmlEl = document.documentElement;
    const desktopToggle = document.getElementById('darkmode-toggle');
    const mobileToggle = document.getElementById('darkmode-toggle-mobile');

    // Check LocalStorage
    const storedTheme = localStorage.getItem('theme');
    
    // Check OS preference if no localStorage
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        htmlEl.classList.add('dark');
        updateIcons(true);
    } else {
        htmlEl.classList.remove('dark');
        updateIcons(false);
    }

    function updateIcons(isDark) {
        const iconHtml = isDark ? "<i class='bx bx-sun text-xl'></i>" : "<i class='bx bx-moon text-xl'></i>";
        if(desktopToggle) desktopToggle.innerHTML = iconHtml;
        if(mobileToggle) mobileToggle.innerHTML = iconHtml;
    }

    function toggleDarkMode() {
        htmlEl.classList.toggle('dark');
        const isDark = htmlEl.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcons(isDark);
        
        // Trigger scroll to update navbar background if needed
        window.dispatchEvent(new Event('scroll'));
    }

    if(desktopToggle) desktopToggle.addEventListener('click', toggleDarkMode);
    if(mobileToggle) mobileToggle.addEventListener('click', toggleDarkMode);
});
