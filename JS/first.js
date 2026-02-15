"use strict";
// ===== TIPOS E INTERFACES =====
/**
 * Tipos de filtro para tarefas
 */
var FilterType;
(function (FilterType) {
    FilterType["All"] = "all";
    FilterType["Done"] = "done";
    FilterType["Pending"] = "pending";
})(FilterType || (FilterType = {}));
// ===== UTILIDADES =====
/**
 * Valida e obtém elementos do DOM com type safety
 */
function getDOMElements() {
    const input = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    if (!input || !addBtn || !taskList) {
        console.error('[TodoApp] Elementos do DOM não encontrados');
        return null;
    }
    return { input, addBtn, taskList };
}
/**
 * Parse seguro de JSON com validação de tipo
 */
function parseStorageData(raw) {
    if (!raw)
        return [];
    try {
        const data = JSON.parse(raw);
        // Validação básica de tipo
        if (!Array.isArray(data)) {
            console.warn('[TodoApp] Dados inválidos no localStorage, ignorando');
            return [];
        }
        return data.filter((item) => item.text && typeof item.done === 'boolean');
    }
    catch (error) {
        console.error('[TodoApp] Erro ao fazer parse do localStorage:', error);
        return [];
    }
}
// ===== CLASSE PRINCIPAL =====
/**
 * Gerencia toda a lógica do To-Do List
 */
class TodoApp {
    constructor(elements) {
        this.currentFilter = FilterType.All;
        this.STORAGE_KEY = 'todo_tasks_v1';
        this.input = elements.input;
        this.addBtn = elements.addBtn;
        this.taskList = elements.taskList;
        this.init();
    }
    /**
     * Inicializa event listeners
     */
    init() {
        this.addBtn.addEventListener('click', () => this.onAddTask());
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                this.onAddTask();
        });
        // Expõe filterTasks globalmente para onclick HTML
        window.filterTasks = (type) => this.filterTasks(type);
        this.loadTasks();
    }
    /**
     * Carrega tarefas do localStorage
     */
    loadTasks() {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        const tasks = parseStorageData(raw);
        this.taskList.innerHTML = '';
        tasks.forEach((task) => this.createTaskElement(task.text, task.done));
    }
    /**
     * Salva tarefas no localStorage
     */
    saveTasks() {
        const tasks = Array.from(this.taskList.querySelectorAll('li')).map((li) => {
            var _a;
            return ({
                text: ((_a = li.querySelector('.text')) === null || _a === void 0 ? void 0 : _a.textContent) || '',
                done: li.classList.contains('done'),
                createdAt: parseInt(li.dataset.createdAt || '0')
            });
        });
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        }
        catch (error) {
            console.error('[TodoApp] Erro ao salvar no localStorage:', error);
        }
    }
    /**
     * Cria elemento de tarefa no DOM
     */
    createTaskElement(text, done = false) {
        const li = document.createElement('li');
        li.dataset.createdAt = String(Date.now());
        // Círculo marcador
        const radio = document.createElement('span');
        radio.className = 'radio';
        radio.addEventListener('click', (e) => {
            e.stopPropagation();
            li.classList.toggle('done');
            this.saveTasks();
        });
        li.appendChild(radio);
        // Texto da tarefa
        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = text;
        li.appendChild(span);
        if (done)
            li.classList.add('done');
        // Duplo clique para editar
        span.addEventListener('dblclick', (e) => this.enterEditMode(e, li, span));
        // Botão de deletar
        const delBtn = document.createElement('button');
        delBtn.textContent = 'X';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            this.saveTasks();
        });
        li.appendChild(delBtn);
        this.taskList.appendChild(li);
        this.saveTasks();
    }
    /**
     * Ativa modo de edição para uma tarefa
     */
    enterEditMode(e, li, span) {
        e.stopPropagation();
        const current = span.textContent || '';
        const edit = document.createElement('input');
        edit.type = 'text';
        edit.value = current;
        edit.className = 'edit-input';
        li.replaceChild(edit, span);
        edit.focus();
        const finishEdit = (save) => {
            const val = edit.value.trim();
            if (save && val !== '') {
                span.textContent = val;
                li.replaceChild(span, edit);
            }
            else if (!save) {
                li.replaceChild(span, edit);
            }
            else if (save && val === '') {
                li.remove();
            }
            this.saveTasks();
        };
        edit.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter')
                finishEdit(true);
            if (ev.key === 'Escape')
                finishEdit(false);
        });
        edit.addEventListener('blur', () => finishEdit(true));
    }
    /**
     * Adiciona nova tarefa
     */
    onAddTask() {
        const taskText = this.input.value.trim();
        if (taskText !== '') {
            this.createTaskElement(taskText);
            this.input.value = '';
        }
    }
    /**
     * Filtra tarefas por tipo
     */
    filterTasks(type) {
        this.currentFilter = type;
        const tasks = this.taskList.querySelectorAll('li');
        tasks.forEach((task) => {
            const isDone = task.classList.contains('done');
            let show = false;
            switch (type) {
                case FilterType.All:
                    show = true;
                    break;
                case FilterType.Done:
                    show = isDone;
                    break;
                case FilterType.Pending:
                    show = !isDone;
                    break;
            }
            task.style.display = show ? 'flex' : 'none';
        });
    }
}
// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    const elements = getDOMElements();
    if (elements) {
        new TodoApp(elements);
    }
});
