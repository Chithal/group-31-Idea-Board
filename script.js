const nameSelect = document.getElementById('name-select');
const ideaInput = document.getElementById('idea-input');
const addIdeaBtn = document.getElementById('add-idea-btn');
const ideaList = document.getElementById('idea-list');

function validateInputs() {
    const name = nameSelect.value;
    const idea = ideaInput.value.trim();
    addIdeaBtn.disabled = !name || !idea;
}

nameSelect.addEventListener('change', validateInputs);
ideaInput.addEventListener('input', validateInputs);

addIdeaBtn.addEventListener('click', function() {
    const name = nameSelect.value;
    const idea = ideaInput.value.trim();

    const listItem = document.createElement('li');
    listItem.innerHTML = `${idea} – suggested by <em>${name}</em>`;
    
    ideaList.appendChild(listItem);

    // Clear inputs and re-disable button
    ideaInput.value = '';
    nameSelect.selectedIndex = 0;
    validateInputs();
});
