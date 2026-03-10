document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeSwitch = document.getElementById('dark-mode-switch');
    const body = document.body;

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
        }
    });

    // --- GPA Calculator Logic ---
    const courseList = document.getElementById('course-list');
    const addCourseBtn = document.getElementById('add-course-btn');
    const calculateGpaBtn = document.getElementById('calculate-gpa-btn');
    const gpaScoreDisplay = document.getElementById('gpa-score');

    addCourseBtn.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.className = 'course-row';
        newRow.innerHTML = `
            <input type="text" placeholder="Course Name" class="course-name">
            <input type="number" placeholder="Credits" class="course-credits" min="1" step="0.5">
            <input type="number" placeholder="Grade (0.0-4.0)" class="course-grade" min="0" max="4" step="0.1">
        `;
        courseList.appendChild(newRow);
    });

    calculateGpaBtn.addEventListener('click', () => {
        const rows = document.querySelectorAll('.course-row');
        let totalPoints = 0;
        let totalCredits = 0;

        rows.forEach(row => {
            const credits = parseFloat(row.querySelector('.course-credits').value);
            const grade = parseFloat(row.querySelector('.course-grade').value);

            if (!isNaN(credits) && !isNaN(grade)) {
                totalPoints += grade * credits;
                totalCredits += credits;
            }
        });

        if (totalCredits > 0) {
            const gpa = totalPoints / totalCredits;
            gpaScoreDisplay.textContent = gpa.toFixed(2);
        } else {
            gpaScoreDisplay.textContent = '0.00';
            alert('Please enter valid credits and grades.');
        }
    });

    // --- Pomodoro Timer Logic ---
    let timerInterval;
    let timeLeft = 1500; // 25 minutes in seconds
    let isRunning = false;

    const minutesDisplay = document.getElementById('timer-minutes');
    const secondsDisplay = document.getElementById('timer-seconds');
    const startBtn = document.getElementById('timer-start');
    const resetBtn = document.getElementById('timer-reset');

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    function startTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startBtn.textContent = 'Start';
            isRunning = false;
        } else {
            isRunning = true;
            startBtn.textContent = 'Pause';
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startBtn.textContent = 'Start';
                    timeLeft = 1500;
                    alert('Time is up! Take a break.');
                    updateTimerDisplay();
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = 1500;
        startBtn.textContent = 'Start';
        updateTimerDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Initial display
    updateTimerDisplay();

    // --- Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
