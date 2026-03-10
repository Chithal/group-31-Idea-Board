// --- Dark Mode Toggle ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// --- GPA Calculator ---
const gpaInputsContainer = document.getElementById('gpa-inputs-container');
const addCourseBtn = document.getElementById('add-course-btn');
const calculateGpaBtn = document.getElementById('calculate-gpa-btn');
const gpaResult = document.getElementById('gpa-result');

addCourseBtn.addEventListener('click', () => {
    const newRow = document.createElement('div');
    newRow.classList.add('course-row');
    newRow.innerHTML = `
        <input type="text" placeholder="Course Name" class="course-name">
        <input type="number" placeholder="Credits" class="course-credits" min="0">
        <select class="course-grade">
            <option value="4.0">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3.0">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2.0">C</option>
            <option value="1.7">C-</option>
            <option value="1.3">D+</option>
            <option value="1.0">D</option>
            <option value="0.0">F</option>
        </select>
    `;
    gpaInputsContainer.appendChild(newRow);
});

calculateGpaBtn.addEventListener('click', () => {
    const creditsInputs = document.querySelectorAll('.course-credits');
    const gradeSelects = document.querySelectorAll('.course-grade');
    
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < creditsInputs.length; i++) {
        const credits = parseFloat(creditsInputs[i].value);
        const grade = parseFloat(gradeSelects[i].value);

        if (!isNaN(credits) && credits > 0) {
            totalPoints += credits * grade;
            totalCredits += credits;
        }
    }

    if (totalCredits > 0) {
        const gpa = (totalPoints / totalCredits).toFixed(2);
        gpaResult.textContent = `Your overall GPA is: ${gpa}`;
        gpaResult.style.color = '#800000'; // Maroon
        if (document.body.classList.contains('dark-mode')) {
            gpaResult.style.color = '#FFD700'; // Gold in dark mode
        }
    } else {
        gpaResult.textContent = 'Please enter valid credits.';
        gpaResult.style.color = 'red';
    }
});

// --- Study Timer (Pomodoro) ---
let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds
const timerDisplay = document.getElementById('timer-display');
const startTimerBtn = document.getElementById('start-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startTimerBtn.addEventListener('click', () => {
    if (timerInterval) {
        // If already running, pause it
        clearInterval(timerInterval);
        timerInterval = null;
        startTimerBtn.textContent = 'Start';
    } else {
        // Start the timer
        startTimerBtn.textContent = 'Pause';
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                startTimerBtn.textContent = 'Start';
                alert('Time is up! Take a break.');
            }
        }, 1000);
    }
});

resetTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
    startTimerBtn.textContent = 'Start';
});

// Initialize display
updateTimerDisplay();
