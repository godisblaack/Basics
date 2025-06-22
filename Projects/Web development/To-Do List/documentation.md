# To-Do List Application - Documentation

## Overview

This document provides a comprehensive overview of the To-Do List web application, including its purpose, features, file structure, technologies used, and detailed explanations of the HTML, CSS, and JavaScript code. This application allows users to manage their tasks efficiently by adding, completing, editing, removing, and reordering items in a list. The data is persisted locally using the browser's `localStorage`.

## Table of Contents

1.  **Purpose**
2.  **Features**
3.  **File Structure**
4.  **Technologies Used**
5.  **HTML Structure (index.html)**
    * Head Section
    * Body Section
        * Container
        * Heading
        * Input Section
        * To-Do List
        * JavaScript Inclusion
6.  **CSS Styling (styles.css)**
    * Body Styles
    * Container Styles
    * Heading Styles
    * Input Section Styles
    * Input Field Styles
    * Button Styles
    * Unordered List Styles
    * List Item Styles
    * Item Text Styles
    * Drag Handle Styles
    * Actions Styles
    * Action Button Styles
7.  **JavaScript Functionality (scripts.js)**
    * DOM Element Selection
    * Data Storage (localStorage)
    * `loadItems()` Function
    * `saveItems()` Function
    * `renderList()` Function
    * `addItem()` Function
    * `toggleComplete()` Function
    * `editItem()` Function
    * `removeItem()` Function
    * Drag and Drop Functionality
        * `addDragEventListeners()` Function
        * `handleDragStart()` Function
        * `handleDragOver()` Function
        * `handleDrop()` Function
    * Event Listener for Adding Items (Enter Key)
    * Initial Rendering
8.  **Setup and Usage**
9.  **Potential Enhancements**

## 1. Purpose

The primary purpose of this To-Do List application is to provide users with a simple and intuitive way to keep track of their tasks. It enables users to:

* Add new tasks to the list.
* Mark tasks as completed.
* Edit existing tasks.
* Remove tasks from the list.
* Reorder tasks using drag and drop.
* Persist the to-do list in their browser, so it's available even after closing and reopening the page.

## 2. Features

The application boasts the following key features:

* **Add New Items:** Users can input text and add new tasks to their to-do list.
* **Mark as Complete:** Checkboxes allow users to toggle the completion status of each task, visually striking through completed items.
* **Edit Items:** Users can modify the text of existing to-do items.
* **Remove Items:** A dedicated "Remove" button for each item allows users to delete tasks from the list.
* **Drag and Drop Reordering:** Users can rearrange the order of tasks by dragging and dropping them.
* **Local Storage Persistence:** The to-do list is saved in the browser's `localStorage`, ensuring that tasks are retained across sessions.
* **Responsive Design:** The basic styling ensures the application is usable on various screen sizes.

## 3. File Structure

The project consists of the following files:

```
├── index.html    // The main HTML file containing the structure of the application
├── styles.css    // The CSS file responsible for the visual styling
└── scripts.js    // The JavaScript file containing the application's logic and functionality
```

## 4. Technologies Used

* **HTML (HyperText Markup Language):** Used to structure the content and elements of the web page.
* **CSS (Cascading Style Sheets):** Used to style the appearance of the HTML elements, including layout, colors, and fonts.
* **JavaScript:** Used to implement the dynamic behavior and functionality of the application, such as adding, deleting, editing, and reordering items, as well as handling local storage.

## 5. HTML Structure (index.html)

The `index.html` file provides the basic structure of the To-Do List application.

### Head Section

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="./styles.css">
</head>
```

* `<meta charset="UTF-8">`: Specifies the character encoding for the document, ensuring proper display of various characters.
* `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Configures the viewport for responsive design, ensuring the page scales correctly on different devices.
* `<title>To-Do List</title>`: Sets the title that appears in the browser tab or window title bar.
* `<link rel="stylesheet" href="./styles.css">`: Links the external CSS file (`styles.css`) to style the HTML elements.

### Body Section

```html
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <div class="input-section">
            <input type="text" id="newItem" placeholder="Add new item">
            <button onclick="addItem()">Add</button>
        </div>
        <ul id="todoList"></ul>
    </div>

    <script src="./scripts.js"></script>
</body>
```

* `<div class="container">`: A main container element that wraps all the content of the to-do list.
* `<h1>To-Do List</h1>`: The main heading of the application.
* `<div class="input-section">`: A container for the input field and the "Add" button.
    * `<input type="text" id="newItem" placeholder="Add new item">`: The text input field where users can type new tasks. The `id="newItem"` is used to access this element in the JavaScript. The `placeholder` attribute provides a hint to the user.
    * `<button onclick="addItem()">Add</button>`: A button that, when clicked, triggers the `addItem()` JavaScript function to add a new item to the list.
* `<ul id="todoList"></ul>`: An unordered list element that will dynamically contain the to-do items. The `id="todoList"` is used to manipulate this list in the JavaScript.
* `<script src="./scripts.js"></script>`: Includes the external JavaScript file (`scripts.js`) at the end of the body. This ensures that the HTML elements are loaded before the script tries to interact with them.

## 6. CSS Styling (styles.css)

The `styles.css` file defines the visual presentation of the To-Do List application.

```css
body {
    font-family: sans-serif;
    margin: 0;
    background-color: #1e1e1e;
    color: #d4d4d4;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    background-color: #2c2c2c;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 80%;
    max-width: 800px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #a7a7a7;
}

.input-section {
    display: flex;
    margin-bottom: 15px;
}

input[type="text"] {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #555;
    border-radius: 4px 0 0 4px;
    background-color: #333;
    color: #d4d4d4;
    outline: none;
}

input[type="text"]:focus {
    border-color: #777;
    box-shadow: 0 0 5px rgba(119, 119, 119, 0.5);
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 0 4px 4px 0;
    background-color: #5e5e5e;
    color: #d4d4d4;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #777;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    align-items: flex-start; /* Align items to the top */
    padding: 10px 0;
    border-bottom: 1px solid #444;
}

li:last-child {
    border-bottom: none;
}

.item-text {
    flex-grow: 1;
    margin-left: 10px;
    overflow-wrap: break-word;
    width: 0; /* Ensure it takes full available width */
}

.item-text.completed {
    text-decoration: line-through;
    color: #777;
}

.item-text.editing {
    border: 1px solid #777;
    padding: 5px;
    border-radius: 4px;
    background-color: #333;
}

.drag-handle {
    cursor: grab;
    margin-left: 10px; /* Adjust margin if needed */
    color: #777;
}

.actions {
    display: flex; /* Arrange buttons horizontally */
    margin-left: auto; /* Push actions to the right */
}

.actions button {
    margin-left: 5px;
    border-radius: 4px;
    font-size: 0.9em;
    padding: 5px 10px;
}

.actions button:hover {
    opacity: 0.8;
}
```

* **`body`**: Sets the font family, removes default margins, sets a dark background color and light text color, and uses Flexbox to center the container on the page. `min-height: 100vh;` ensures the body takes up at least the full viewport height.
* **`.container`**: Styles the main container with a dark background, padding, rounded corners, a subtle box shadow, and sets a maximum width for better readability on larger screens.
* **`h1`**: Centers the main heading and adds some bottom margin.
* **`.input-section`**: Uses Flexbox to arrange the input field and button horizontally, with some bottom margin.
* **`input[type="text"]`**: Styles the text input field to take up available space, with padding, a dark background, light text, and rounded left corners. `:focus` styles provide visual feedback when the input field is active.
* **`button`**: Styles the "Add" button with padding, no border, rounded right corners, a dark background, light text, a pointer cursor, and a smooth transition for hover effects. `:hover` provides visual feedback on mouse hover.
* **`ul`**: Removes the default list styles (bullets and padding).
* **`li`**: Styles each list item as a Flexbox container to align its children, adds padding, and a subtle bottom border to separate items. `:last-child` removes the bottom border from the last item.
* **`.item-text`**: Allows the text to grow and wrap if it's too long, with some left margin. `.completed` class adds a strikethrough effect and a lighter color for completed items. `.editing` class styles the input field that appears when editing an item.
* **`.drag-handle`**: Styles the drag handle with a grab cursor and some left margin.
* **`.actions`**: Uses Flexbox to arrange the action buttons ("Edit" and "Remove") horizontally and pushes them to the right using `margin-left: auto;`.
* **`.actions button`**: Styles the action buttons with some left margin, rounded corners, a smaller font size, and padding. `:hover` provides a subtle opacity change on mouse hover.

## 7. JavaScript Functionality (scripts.js)

The `scripts.js` file contains the logic that makes the To-Do List application interactive.

```javascript
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
```

* **DOM Element Selection:**
    * `const newItemInput = document.getElementById('newItem');`: Selects the input field where new items are typed.
    * `const todoList = document.getElementById('todoList');`: Selects the unordered list where to-do items will be displayed.
    * `let items = loadItems();`: Initializes an array `items` by loading any existing to-do items from `localStorage`.

* **Data Storage (localStorage):**
    * **`loadItems()` Function:**
    * Retrieves the to-do items from the browser's `localStorage` using `localStorage.getItem('todoItems')`.
    * If there are stored items (the result is not `null`), it parses the JSON string back into a JavaScript array using `JSON.parse()`.
    * If no items are found in `localStorage`, it returns an empty array `[]`.

* **`saveItems()` Function:**
    * Takes the current `items` array and converts it into a JSON string using `JSON.stringify()`.
    * Stores this JSON string in the `localStorage` with the key `'todoItems'`. This ensures that the to-do list persists even after the browser window is closed or refreshed.

* **`renderList()` Function:**
    * Clears the existing content of the `todoList` (the `<ul>` element) by setting its `innerHTML` to an empty string. This prevents duplicate rendering of items.
    * Iterates through the `items` array using `forEach()`. For each `item` and its `index`:
        * Creates a new `<li>` element.
        * Sets the `draggable` attribute of the `<li>` to `true` to enable drag and drop functionality.
        * Adds a `data-index` attribute to the `<li>` to store the index of the item in the `items` array. This is crucial for identifying and manipulating the correct item during drag and drop and other operations.
        * Sets the `innerHTML` of the `<li>` to include:
            * An `<input type="checkbox">`. The `checked` attribute is dynamically set based on the `item.completed` property. The `onchange` event is attached to the `toggleComplete()` function, passing the current `index`.
            * A `<span>` element with the class `item-text`. If `item.completed` is `true`, the class `completed` is also added for strikethrough styling. The text content of the `<span>` is set to `item.text`.
            * A `<span>` element with the class `drag-handle` and the content "☰". This visually acts as a handle for dragging the list item.
            * A `<div class="actions">` containing two buttons:
                * An "Edit" button that, when clicked, calls the `editItem()` function with the current `index`.
                * A "Remove" button that, when clicked, calls the `removeItem()` function with the current `index`.
        * Appends the newly created `listItem` to the `todoList`.
    * After rendering all items, it calls the `addDragEventListeners()` function to attach the necessary event listeners for drag and drop functionality to each list item.

* **`addItem()` Function:**
    * Gets the value from the `newItemInput` field and removes any leading or trailing whitespace using `trim()`.
    * Checks if the trimmed input value is not empty.
    * If it's not empty, it creates a new object `{ text: newItemText, completed: false }` and pushes it to the `items` array. The `completed` property is initially set to `false`.
    * Clears the `newItemInput` field by setting its `value` to an empty string.
    * Calls `saveItems()` to update the `localStorage` with the new list of items.
    * Calls `renderList()` to update the displayed list on the page.

* **`toggleComplete()` Function:**
    * Takes the `index` of the item to be toggled as an argument.
    * Inverts the `completed` property of the item at the given `index` in the `items` array (`items[index].completed = !items[index].completed;`).
    * Calls `saveItems()` to persist the updated completion status.
    * Calls `renderList()` to re-render the list, visually updating the checkbox and text decoration.

* **`editItem()` Function:**
    * Takes the `index` of the item to be edited as an argument.
    * Gets the corresponding `listItem` from the `todoList`'s children.
    * Selects the `<span>` element containing the item text (`.item-text`).
    * Stores the original text content of the `<span>` in the `originalText` variable.
    * Creates a new `<input type="text">` element.
    * Sets the `type` to `'text'` and the `value` to the `originalText`.
    * Adds the classes `'item-text'` and `'editing'` to the new input field for styling.
    * Creates a "Save" button.
        * Sets its `textContent` to `'Save'`.
        * Attaches an `onclick` event listener that:
            * Updates the `text` property of the item at the given `index` in the `items` array with the trimmed value from the input field.
            * Calls `saveItems()` to save the changes.
            * Calls `renderList()` to re-render the list, displaying the edited text and restoring the action buttons.
    * Creates a "Cancel" button.
        * Sets its `textContent` to `'Cancel'`.
        * Attaches an `onclick` event listener that simply calls `renderList()`, effectively discarding the edit and reverting to the original display.
    * Selects the `<div class="actions">` within the list item.
    * Replaces the original `itemTextSpan` with the newly created `inputField`.
    * Clears the content of the `actionsDiv` and appends the "Save" and "Cancel" buttons to it.
    * Attaches a `keydown` event listener to the `inputField`. If the user presses the "Enter" key, it triggers the `click()` event of the "Save" button.
    * Sets the focus to the `inputField` so the user can immediately start typing.

* **`removeItem()` Function:**
    * Takes the `index` of the item to be removed as an argument.
    * Uses the `splice()` method to remove one item at the specified `index` from the `items` array.
    * Calls `saveItems()` to update the `localStorage`.
    * Calls `renderList()` to refresh the displayed list.

* **Drag and Drop Functionality:**
    * `let draggedItem = null;`: Initializes a variable to store the currently dragged list item.

    * **`addDragEventListeners()` Function:**
        * Selects all the `<li>` elements within the `todoList`.
        * Iterates through each `listItem` and attaches the following event listeners:
            * `dragstart`: Calls the `handleDragStart()` function when the user starts dragging an item.
            * `dragover`: Calls the `handleDragOver()` function when a dragged item is being dragged over another element.
            * `drop`: Calls the `handleDrop()` function when a dragged item is dropped onto another element.

    * **`handleDragStart()` Function:**
        * Takes the `dragstart` event object (`e`) as an argument.
        * Sets the `draggedItem` variable to the currently dragged HTML element (`e.target`).
        * Sets the data being transferred during the drag operation using `e.dataTransfer.setData('text/html', draggedItem.innerHTML)`. Although the HTML content is set, in this implementation, we primarily rely on the `draggedItem` reference and the `data-index` for reordering.

    * **`handleDragOver()` Function:**
        * Takes the `dragover` event object (`e`) as an argument.
        * Calls `e.preventDefault()` to allow the `drop` event to be triggered. By default, data cannot be dropped onto other elements.

    * **`handleDrop()` Function:**
        * Takes the `drop` event object (`e`) as an argument.
        * Checks if the target of the drop event is not the `draggedItem` itself and if it's a `<li>` element. This prevents dropping an item onto itself or other non-list-item elements.
        * Gets the `data-index` of the dragged item and the dropped-onto item using `parseInt()` on their respective `dataset.index` values.
        * Determines the insertion point based on whether the dragged item was moved up or down in the list:
            * If `draggedIndex < droppedIndex`, the `draggedItem` is inserted before the next sibling of the `e.target` (the element it was dropped onto).
            * Otherwise (`draggedIndex > droppedIndex`), the `draggedItem` is inserted before the `e.target`.
        * Updates the `items` array to reflect the new order:
            * `items.splice(draggedIndex, 1)` removes the dragged item from its original position and returns it as an array.
            * `items.splice(droppedIndex, 0, movedItem)` inserts the `movedItem` at the new `droppedIndex`.
        * Calls `renderList()` to update the visual order of the list items.
        * Calls `saveItems()` to persist the new order in `localStorage`.
        * Resets the `draggedItem` variable to `null`.

* **Event Listener for Adding Items (Enter Key):**
    * `newItemInput.addEventListener('keydown', function (event) { ... });`: Attaches a `keydown` event listener to the `newItemInput` field.
    * Inside the listener, it checks if the `event.key` is equal to `'Enter'`. If it is, it calls the `addItem()` function, allowing users to add new items by pressing the Enter key.

* **Initial Rendering:**
    * `renderList();`: Calls the `renderList()` function once when the script loads to initially display any items that were loaded from `localStorage`.

## 8. Setup and Usage

To use this To-Do List application:

1.  Save the HTML code as `index.html`, the CSS code as `styles.css`, and the JavaScript code as `scripts.js` in the same directory.
2.  Open the `index.html` file in any web browser.

You can then interact with the application by:

* Typing a new task in the input field and clicking the "Add" button or pressing the Enter key.
* Clicking the checkbox next to an item to mark it as complete or incomplete.
* Clicking the "Edit" button to modify the text of an existing item, then clicking "Save" or pressing Enter to confirm, or "Cancel" to discard the changes.
* Clicking the "Remove" button to delete an item.
* Clicking and dragging the "☰" icon of an item to reorder it in the list.

The to-do list will be saved in your browser's local storage and will be available even after you close and reopen the page.

## 9. Potential Enhancements

This To-Do List application provides a solid foundation and can be further enhanced with the following features:

* **Filtering Options:** Allow users to filter tasks (e.g., show all, show active, show completed).
* **Clear Completed Tasks:** Add a button to remove all completed tasks at once.
* **Priority Levels:** Allow users to assign priority levels to tasks and visually differentiate them.
* **Due Dates:** Implement the ability to set and display due dates for tasks.
* **More Robust Styling:** Improve the visual design and responsiveness for different screen sizes.
* **Error Handling:** Add validation for input fields and provide user feedback for errors.
* **Undo/Redo Functionality:** Allow users to undo or redo their last actions.
* **Keyboard Navigation:** Enhance keyboard accessibility for better user experience.
* **Integration with External Storage:** Instead of `localStorage`, integrate with a backend service or cloud storage for data synchronization across devices.