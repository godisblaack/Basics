const newItemInput = document.getElementById('newItem');
const todoList = document.getElementById('todoList');
let items = loadItems();

renderList();

newItemInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

function loadItems() {
    const storedItems = localStorage.getItem('todoItems');
    return storedItems ? JSON.parse(storedItems) : [];
}

function saveItems() {
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function renderList() {
    todoList.innerHTML = '';
    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.draggable = true;
        listItem.dataset.index = index;
        listItem.innerHTML = `
            <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
            <span class="item-text${item.completed ? ' completed' : ''}">${item.text}</span>
            <span class="drag-handle">☰</span>
            <div class="actions">
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        todoList.appendChild(listItem);
    });

    addDragEventListeners();
}

function addItem() {
    const newItemText = newItemInput.value.trim();
    if (newItemText !== '') {
        items.push({ text: newItemText, completed: false });
        newItemInput.value = '';
        saveItems();
        renderList();
    }
}

function toggleComplete(index) {
    items[index].completed = !items[index].completed;
    saveItems();
    renderList();
}

function editItem(index) {
    const listItem = todoList.children[index];
    const itemTextSpan = listItem.querySelector('.item-text');
    const originalText = itemTextSpan.textContent;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = originalText;
    inputField.classList.add('item-text', 'editing');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => {
        items[index].text = inputField.value.trim();
        saveItems();
        renderList();
    };

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = () => {
        renderList();
    };

    const actionsDiv = listItem.querySelector('.actions');
    itemTextSpan.replaceWith(inputField);
    actionsDiv.innerHTML = '';
    actionsDiv.appendChild(saveButton);
    actionsDiv.appendChild(cancelButton);

    inputField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            saveButton.click();
        }
    });

    inputField.focus();
}

function removeItem(index) {
    items.splice(index, 1);
    saveItems();
    renderList();
}

let draggedItem = null;

function addDragEventListeners() {
    const listItems = document.querySelectorAll('#todoList li');

    listItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/html', draggedItem.innerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    if (e.target !== draggedItem && e.target.nodeName === 'LI') {
        const draggedIndex = parseInt(draggedItem.dataset.index);
        const droppedIndex = parseInt(e.target.dataset.index);

        if (draggedIndex < droppedIndex) {
            todoList.insertBefore(draggedItem, e.target.nextSibling);
        } else {
            todoList.insertBefore(draggedItem, e.target);
        }

        const [movedItem] = items.splice(draggedIndex, 1);
        items.splice(droppedIndex, 0, movedItem);

        renderList();
        saveItems();
    }
    draggedItem = null;
}