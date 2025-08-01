// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when page loads
    loadTasks();

    /**
     * Loads tasks from localStorage and renders them
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
        // false → don't save to localStorage again when loading
    }

    /**
     * Adds a new task to the list and optionally saves it to localStorage
     * @param {string} taskText Optional pre-filled text
     * @param {boolean} save Whether to save to localStorage
     */
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // Trim and validate input
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create the list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task on click
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
        });

        // Add button to the list item, and list item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input field
        taskInput.value = '';
    }

    /**
     * Removes a task from localStorage
     * @param {string} taskText 
     */
    function removeFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add task on button click
    addButton.addEventListener('click', () => addTask());

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
