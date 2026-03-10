// Dark Mode Toggle
const darkModeSwitch = document.getElementById('dark-mode-switch');

darkModeSwitch.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Load dark mode preference on page load
window.addEventListener('DOMContentLoaded', function() {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }
});

// GPA Calculator Functionality
document.getElementById('calculate-gpa').addEventListener('click', function() {
    const grade1 = parseFloat(document.getElementById('course1-grade').value);
    const credits1 = parseInt(document.getElementById('course1-credits').value);
    const grade2 = parseFloat(document.getElementById('course2-grade').value);
    const credits2 = parseInt(document.getElementById('course2-credits').value);

    if (isNaN(grade1) || isNaN(credits1) || isNaN(grade2) || isNaN(credits2)) {
        document.getElementById('gpa-result').textContent = 'Please enter valid grades and credits.';
        return;
    }

    const totalGradePoints = (grade1 * credits1) + (grade2 * credits2);
    const totalCredits = credits1 + credits2;

    if (totalCredits === 0) {
        document.getElementById('gpa-result').textContent = 'Total credits cannot be zero.';
        return;
    }

    const gpa = totalGradePoints / totalCredits;
    document.getElementById('gpa-result').textContent = `Your GPA is: ${gpa.toFixed(2)}`;
});

// Pomodoro Timer Functionality
let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

updateTimerDisplay();

document.getElementById('start-timer').addEventListener('click', function() {
    if (timerInterval) return;
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('Pomodoro session complete! Take a break.');
        }
    }, 1000);
});

document.getElementById('reset-timer').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
});