// simple avatar lookup; can be extended to URLs or real images
// using pravatar service for sample avatars; replace with real paths as needed
const avatars = {
    Nimal: 'https://i.pravatar.cc/24?img=1',
    Sara: 'https://i.pravatar.cc/24?img=2',
    Alex: 'https://i.pravatar.cc/24?img=3'
};

function getInitials(name) {
    return name
        .split(' ')
        .map(n => n.charAt(0))
        .join('')
        .toUpperCase();
}

function updateIdeaCount() {
    const counter = document.getElementById('idea-counter');
    const ideaList = document.getElementById('idea-list');
    const count = ideaList.children.length;
    counter.textContent = `Total Ideas: ${count}`;
}

document.getElementById('add-idea-btn').addEventListener('click', function() {
    const nameSelect = document.getElementById('name-select');
    const ideaInput = document.getElementById('idea-input');
    const ideaList = document.getElementById('idea-list');

    const name = nameSelect.value;
    const idea = ideaInput.value.trim();

    if (!name || !idea) {
        alert('Please select your name and enter an idea.');
        return;
    }

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
    }

    const authorSpan = document.createElement('span');
    authorSpan.classList.add('author');
    authorSpan.appendChild(avatarSpan);

    const nameElem = document.createElement('em');
    nameElem.textContent = name;
    authorSpan.appendChild(nameElem);

    listItem.appendChild(ideaSpan);
    listItem.appendChild(document.createTextNode(' '));
    listItem.appendChild(authorSpan);

    ideaList.appendChild(listItem);

    // Clear inputs after adding
    ideaInput.value = '';
    nameSelect.selectedIndex = 0;

    // update counter
    updateIdeaCount();
});

// initialize counter on load
window.addEventListener('DOMContentLoaded', updateIdeaCount);

