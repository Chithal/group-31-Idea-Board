// simple avatar lookup; can be extended to URLs or real images
const avatars = {
    Nimal: 'https://i.pravatar.cc/24?img=1',
    Sara: 'https://i.pravatar.cc/24?img=2',
    Alex: 'https://i.pravatar.cc/24?img=3'
};

function getInitials(name) {
    return name
        .trim()
        .split(' ')
        .map(n => n.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function updateIdeaCount() {
    const counter = document.getElementById('idea-counter');
    const ideaList = document.getElementById('idea-list');
    const count = ideaList.children.length;
    counter.textContent = `Total Ideas: ${count}`;
}

const nameInput = document.getElementById('name-input');
const ideaInput = document.getElementById('idea-input');
const addIdeaBtn = document.getElementById('add-idea-btn');
const themeToggle = document.getElementById('theme-toggle');

function validateInputs() {
    const name = nameInput.value.trim();
    const idea = ideaInput.value.trim();
    addIdeaBtn.disabled = !name || !idea;
}

nameInput.addEventListener('input', validateInputs);
ideaInput.addEventListener('input', validateInputs);

addIdeaBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();
    const idea = ideaInput.value.trim();
    const ideaList = document.getElementById('idea-list');

    const listItem = document.createElement('li');

    // create a highlighted idea text element
    const ideaSpan = document.createElement('span');
    ideaSpan.classList.add('idea-text');
    ideaSpan.textContent = `"${idea}"`;

    // create an avatar element (image or initials)
    const avatarSpan = document.createElement('span');
    avatarSpan.classList.add('avatar');
    if (avatars[name]) {
        avatarSpan.style.backgroundImage = `url(${avatars[name]})`;
    } else {
        avatarSpan.textContent = getInitials(name);
        // Generate a random background color for new names
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#ff5722'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        avatarSpan.style.backgroundColor = randomColor;
    }

    const authorSpan = document.createElement('span');
    authorSpan.classList.add('author');
    authorSpan.appendChild(avatarSpan);

    const nameElem = document.createElement('em');
    nameElem.textContent = name;
    authorSpan.appendChild(nameElem);

    listItem.appendChild(ideaSpan);
    listItem.appendChild(authorSpan);

    ideaList.appendChild(listItem);

    // Clear inputs and re-disable button
    ideaInput.value = '';
    validateInputs();

    // update counter
    updateIdeaCount();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'Switch to Light' : 'Switch to Dark';
});

// initialize counter on load
window.addEventListener('DOMContentLoaded', updateIdeaCount);
