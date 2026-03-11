document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const links = {
        gpa: document.getElementById('gpa-link'),
        timer: document.getElementById('timer-link'),
        idea: document.getElementById('idea-link')
    };
    const sections = {
        gpa: document.getElementById('gpa-section'),
        timer: document.getElementById('timer-section'),
        idea: document.getElementById('idea-section')
    };

    function switchView(activeKey) {
        Object.keys(sections).forEach(key => {
            sections[key].classList.add('hidden');
            sections[key].classList.remove('fade-in');
            links[key].classList.remove('active');
        });

        const activeSection = sections[activeKey];
        const activeLink = links[activeKey];

        activeSection.classList.remove('hidden');
        void activeSection.offsetWidth; // Trigger reflow for animation
        activeSection.classList.add('fade-in');
        activeLink.classList.add('active');
    }

    Object.keys(links).forEach(key => {
        links[key].addEventListener('click', (e) => {
            e.preventDefault();
            switchView(key);
        });
    });

    // --- Dark Mode ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    });

    // --- GPA Calculator ---
    const gpaBody = document.getElementById('gpa-body');
    const addCourseBtn = document.getElementById('add-course');
    const calculateGpaBtn = document.getElementById('calculate-gpa');
    const gpaValueDisplay = document.getElementById('gpa-value');

    addCourseBtn.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="e.g. Course" class="course-input"></td>
            <td><input type="number" placeholder="3" class="credit-input" min="0"></td>
            <td>
                <select class="grade-input">
                    <option value="4.0">A</option>
                    <option value="3.0">B</option>
                    <option value="2.0">C</option>
                    <option value="1.0">D</option>
                    <option value="0.0">F</option>
                </select>
            </td>
            <td><button class="remove-btn" style="background:none; border:none; cursor:pointer; color:red; font-size:1.2rem;">&times;</button></td>
        `;
        gpaBody.appendChild(newRow);
        newRow.querySelector('.remove-btn').addEventListener('click', () => newRow.remove());
    });

    calculateGpaBtn.addEventListener('click', () => {
        const courseInputs = document.querySelectorAll('.course-input');
        const credits = document.querySelectorAll('.credit-input');
        const grades = document.querySelectorAll('.grade-input');
        
        // Check for duplicate course names
        const courseNames = [];
        let hasDuplicates = false;
        
        for (let input of courseInputs) {
            const name = input.value.trim().toLowerCase();
            if (name === "") continue;
            if (courseNames.includes(name)) {
                hasDuplicates = true;
                break;
            }
            courseNames.push(name);
        }

        if (hasDuplicates) {
            alert("Duplicate courses detected. Please ensure each course has a unique name.");
            return;
        }

        let totalPoints = 0, totalCredits = 0;
        credits.forEach((input, i) => {
            const val = parseFloat(input.value);
            if (!isNaN(val) && val > 0) {
                totalPoints += val * parseFloat(grades[i].value);
                totalCredits += val;
            }
        });
        gpaValueDisplay.textContent = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    });

    // --- Pomodoro Timer ---
    let timerInterval, timeLeft = 25 * 60;
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('timer-start');
    const resetBtn = document.getElementById('timer-reset');

    function updateTimer() {
        const mins = Math.floor(timeLeft / 60), secs = timeLeft % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startBtn.addEventListener('click', () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            startBtn.textContent = "Start";
        } else {
            startBtn.textContent = "Pause";
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimer();
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    startBtn.textContent = "Start";
                    alert("Time's up! Take a break.");
                }
            }, 1000);
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = 25 * 60;
        updateTimer();
        startBtn.textContent = "Start";
    });

    // --- Idea Board ---
    const ideaGrid = document.getElementById('idea-grid');
    const addIdeaBtn = document.getElementById('add-idea-btn');

    function createIdeaCard(content = "") {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
            <button class="delete-idea" title="Delete">&times;</button>
            <textarea class="idea-content" placeholder="Type your idea...">${content}</textarea>
            <button class="save-idea" title="Save Idea">✓</button>
        `;

        const textarea = card.querySelector('.idea-content');
        const saveBtn = card.querySelector('.save-idea');

        textarea.addEventListener('input', () => {
            saveIdeas();
        });
        
        card.querySelector('.delete-idea').addEventListener('click', () => {
            card.remove();
            saveIdeas();
        });

        saveBtn.addEventListener('click', () => {
            if (textarea.value.trim() === "") {
                alert("Please enter some text before saving.");
                textarea.focus();
                return;
            }
            saveIdeas();
            saveBtn.classList.add('saved');
            setTimeout(() => saveBtn.classList.remove('saved'), 1000);
        });

        ideaGrid.appendChild(card);
    }

    function saveIdeas() {
        const ideas = Array.from(document.querySelectorAll('.idea-content'))
            .map(ta => ta.value.trim())
            .filter(val => val !== "");
        localStorage.setItem('student_toolkit_ideas', JSON.stringify(ideas));
    }

    function loadIdeas() {
        const ideas = JSON.parse(localStorage.getItem('student_toolkit_ideas') || "[]");
        if (ideas.length === 0) createIdeaCard();
        else ideas.forEach(text => createIdeaCard(text));
    }

    addIdeaBtn.addEventListener('click', () => {
        const textareas = document.querySelectorAll('.idea-content');
        if (textareas.length > 0) {
            const lastTextarea = textareas[textareas.length - 1];
            if (lastTextarea.value.trim() === "") {
                lastTextarea.focus();
                return;
            }
        }
        createIdeaCard();
    });

    loadIdeas();
});