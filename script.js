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
    listItem.innerHTML = `${idea} – suggested by <em>${name}</em>`;
    
    ideaList.appendChild(listItem);

    // Clear inputs after adding
    ideaInput.value = '';
    nameSelect.selectedIndex = 0;
});
