document.addEventListener('DOMContentLoaded', () => {
    const gpaLink = document.getElementById('gpa-link');
    const timerLink = document.getElementById('timer-link');
    const gpaSection = document.getElementById('gpa-section');
    const timerSection = document.getElementById('timer-section');

    function switchView(showSection, activeLink) {
        // Hide all sections
        gpaSection.classList.add('hidden');
        timerSection.classList.add('hidden');
        
        // Remove active class from all links
        gpaLink.classList.remove('active');
        timerLink.classList.remove('active');

        // Show target section and activate link
        showSection.classList.remove('hidden');
        activeLink.classList.add('active');
    }

    gpaLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(gpaSection, gpaLink);
    });

    timerLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(timerSection, timerLink);
    });
});