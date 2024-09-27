const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const { TextEncoder, TextDecoder } = require('text-encoding');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


describe('Teste da lista de tarefas', () => {
    let document;

    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
        document = new JSDOM(html).window.document;
        global.document = document;
        require('./script.js'); // Carrega o script.js para que a funcionalidade seja testada
    });

    test('Adicionar uma nova tarefa', () => {
        const taskInput = document.getElementById('taskInput');
        const addTaskButton = document.getElementById('addTaskButton');
        const taskList = document.getElementById('taskList');

        taskInput.value = 'Tarefa 1';
        addTaskButton.dispatchEvent(new Event('click')); // Corrigido

        // Agora verifique o resultado
        expect(taskList.children.length).toBe(1);
        expect(taskList.children[0].textContent).toContain('Tarefa 1');
    });

    test('Remover uma tarefa', () => {
        const taskInput = document.getElementById('taskInput');
        const addTaskButton = document.getElementById('addTaskButton');
        const taskList = document.getElementById('taskList');

        taskInput.value = 'Tarefa 2';
        addTaskButton.dispatchEvent(new Event('click')); // Corrigido
        taskInput.value = 'Tarefa 3';
        addTaskButton.dispatchEvent(new Event('click')); // Corrigido

        expect(taskList.children.length).toBe(2);

        // Remover a primeira tarefa
        const removeButton = taskList.children[0].querySelector('button');
        removeButton.dispatchEvent(new Event('click')); // Corrigido

        expect(taskList.children.length).toBe(1);
        expect(taskList.children[0].textContent).toContain('Tarefa 3');
    });

    test('Adicionar múltiplas tarefas', () => {
        const taskInput = document.getElementById('taskInput');
        const addTaskButton = document.getElementById('addTaskButton');
        const taskList = document.getElementById('taskList');

        taskInput.value = 'Tarefa 1';
        addTaskButton.dispatchEvent(new Event('click')); // Corrigido
        taskInput.value = 'Tarefa 2';
        addTaskButton.dispatchEvent(new Event('click')); // Corrigido
        taskInput.value = 'Tarefa 3';
        addTaskButton.dispatchEvent(new Event('click')); // Corrigido

        expect(taskList.children.length).toBe(3);
    });
});
