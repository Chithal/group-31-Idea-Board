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

    function calculateGPA() {
        const rows = gpaBody.querySelectorAll('tr');
        let totalPoints = 0;
        let totalCredits = 0;
        const courseNames = [];
        let hasDuplicates = false;

        rows.forEach(row => {
            const nameInput = row.querySelector('.course-input');
            const creditInput = row.querySelector('.credit-input');
            const gradeSelect = row.querySelector('.grade-input');

            if (!nameInput || !creditInput || !gradeSelect) return;

            const name = nameInput.value.trim().toLowerCase();
            if (name !== "") {
                if (courseNames.includes(name)) {
                    hasDuplicates = true;
                }
                courseNames.push(name);
            }

            const credits = parseFloat(creditInput.value);
            const grade = parseFloat(gradeSelect.value);

            if (!isNaN(credits) && credits > 0) {
                totalPoints += credits * grade;
                totalCredits += credits;
            }
        });

        if (hasDuplicates) {
            // We don't alert here to avoid annoying the user while they type
            // But we can mark the inputs or just calculate anyway.
            // For now, let's just calculate but we'll check it on the explicit button click.
        }

        gpaValueDisplay.textContent = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    }

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
        
        // Add listeners for automatic calculation
        newRow.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('input', calculateGPA);
        });

        newRow.querySelector('.remove-btn').addEventListener('click', () => {
            newRow.remove();
            calculateGPA();
        });
    });

    // Initial row listeners
    gpaBody.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', calculateGPA);
    });

    calculateGpaBtn.addEventListener('click', () => {
        const rows = gpaBody.querySelectorAll('tr');
        const courseNames = [];
        let hasDuplicates = false;

        rows.forEach(row => {
            const nameInput = row.querySelector('.course-input');
            if (nameInput) {
                const name = nameInput.value.trim().toLowerCase();
                if (name !== "") {
                    if (courseNames.includes(name)) hasDuplicates = true;
                    courseNames.push(name);
                }
            }
        });

        if (hasDuplicates) {
            alert("Duplicate courses detected. Please ensure each course has a unique name.");
            return;
        }

        calculateGPA();
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

    function countWords(str) {
        return str.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    function isValidSubject(subject) {
        // Cannot start with spaces
        if (subject.startsWith(' ')) return false;
        // Cannot contain special characters (only alphanumeric and spaces allowed)
        const specialChars = /[^a-zA-Z0-9 ]/g;
        return !specialChars.test(subject);
    }

    function createIdeaCard(subject = "", content = "") {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
            <button class="delete-idea" title="Delete">&times;</button>
            <input type="text" class="idea-subject" placeholder="Subject" value="${subject}">
            <textarea class="idea-content" placeholder="Type your idea...">${content}</textarea>
            <div class="word-count">0/250 words</div>
            <button class="save-idea" title="Save Idea">✓</button>
        `;

        const subjectInput = card.querySelector('.idea-subject');
        const textarea = card.querySelector('.idea-content');
        const saveBtn = card.querySelector('.save-idea');
        const wordCountDisplay = card.querySelector('.word-count');

        function updateWordCount() {
            const count = countWords(textarea.value);
            wordCountDisplay.textContent = `${count}/250 words`;
            if (count > 250) {
                wordCountDisplay.style.color = 'red';
            } else {
                wordCountDisplay.style.color = 'inherit';
            }
        }

        updateWordCount();

        textarea.addEventListener('input', () => {
            updateWordCount();
            saveIdeas();
        });

        subjectInput.addEventListener('input', () => {
            if (subjectInput.value !== "" && !isValidSubject(subjectInput.value)) {
                subjectInput.classList.add('invalid');
            } else {
                subjectInput.classList.remove('invalid');
            }
            saveIdeas();
        });
        
        card.querySelector('.delete-idea').addEventListener('click', () => {
            card.remove();
            saveIdeas();
        });

        saveBtn.addEventListener('click', () => {
            const currentSubject = subjectInput.value;
            const currentContent = textarea.value;

            if (currentSubject.trim() === "" && currentContent.trim() === "") {
                alert("Please enter a subject or some text before saving.");
                return;
            }

            if (!isValidSubject(currentSubject)) {
                alert("Subject name cannot start with spaces and cannot contain special characters.");
                subjectInput.focus();
                return;
            }

            if (countWords(currentContent) > 250) {
                alert("Idea content exceeds the 250-word limit.");
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
        const cards = Array.from(document.querySelectorAll('.idea-card'));
        const ideas = cards.map(card => {
            const subject = card.querySelector('.idea-subject').value;
            const content = card.querySelector('.idea-content').value;
            return { subject, content };
        }).filter(idea => idea.subject.trim() !== "" || idea.content.trim() !== "");
        
        localStorage.setItem('student_toolkit_ideas_v2', JSON.stringify(ideas));
    }

    function loadIdeas() {
        // Try loading v2 format first
        let ideas = JSON.parse(localStorage.getItem('student_toolkit_ideas_v2') || "null");
        
        if (!ideas) {
            // Fallback to v1 format if v2 doesn't exist
            const oldIdeas = JSON.parse(localStorage.getItem('student_toolkit_ideas') || "[]");
            ideas = oldIdeas.map(text => ({ subject: "", content: text }));
        }

        if (ideas.length === 0) createIdeaCard();
        else ideas.forEach(idea => createIdeaCard(idea.subject, idea.content));
    }

    addIdeaBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.idea-card');
        if (cards.length > 0) {
            const lastCard = cards[cards.length - 1];
            const lastSubject = lastCard.querySelector('.idea-subject').value.trim();
            const lastContent = lastCard.querySelector('.idea-content').value.trim();
            if (lastSubject === "" && lastContent === "") {
                lastCard.querySelector('.idea-subject').focus();
                return;
            }
        }
        createIdeaCard();
    });

    loadIdeas();
});