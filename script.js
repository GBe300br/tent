document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // Remova espaços em branco
        if (taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                taskList.removeChild(li);
            });

            li.appendChild(removeButton);
            taskList.appendChild(li);
            taskInput.value = ''; // Limpa o campo de entrada
        }
    });
});
