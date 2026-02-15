enum FilterType {
  All = 'all',
  Done = 'done',
  Pending = 'pending'
}

interface ITask {
  text: string;
  done: boolean;
  createdAt?: number;
}

interface IDOMElements {
  input: HTMLInputElement;
  addBtn: HTMLButtonElement;
  taskList: HTMLUListElement;
}

function getDOMElements(): IDOMElements | null {
  const input = document.getElementById('taskInput') as HTMLInputElement | null;
  const addBtn = document.getElementById('addBtn') as HTMLButtonElement | null;
  const taskList = document.getElementById('taskList') as HTMLUListElement | null;

  if (!input || !addBtn || !taskList) {
    console.error('[TodoApp] Elementos do DOM não encontrados');
    return null;
  }

  return { input, addBtn, taskList };
}

function parseStorageData(raw: string | null): ITask[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
   
    if (!Array.isArray(data)) {
      console.warn('[TodoApp] Dados inválidos no localStorage, ignorando');
      return [];
    }
    return data.filter((item) => item.text && typeof item.done === 'boolean');
  } catch (error) {
    console.error('[TodoApp] Erro ao fazer parse do localStorage:', error);
    return [];
  }
}

class TodoApp {
  private input: HTMLInputElement;
  private addBtn: HTMLButtonElement;
  private taskList: HTMLUListElement;
  private currentFilter: FilterType = FilterType.All;
  private readonly STORAGE_KEY = 'todo_tasks_v1';

  constructor(elements: IDOMElements) {
    this.input = elements.input;
    this.addBtn = elements.addBtn;
    this.taskList = elements.taskList;

    this.init();
  }

  private init(): void {
    this.addBtn.addEventListener('click', () => this.onAddTask());
    this.input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') this.onAddTask();
    });

    (window as any).filterTasks = (type: string) => this.filterTasks(type as FilterType);

    this.loadTasks();
  }

  private loadTasks(): void {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    const tasks = parseStorageData(raw);

    this.taskList.innerHTML = '';
    tasks.forEach((task) => this.createTaskElement(task.text, task.done));
  }

  private saveTasks(): void {
    const tasks: ITask[] = Array.from(this.taskList.querySelectorAll('li')).map((li) => ({
      text: (li.querySelector('.text') as HTMLElement)?.textContent || '',
      done: li.classList.contains('done'),
      createdAt: parseInt(li.dataset.createdAt || '0')
    }));

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('[TodoApp] Erro ao salvar no localStorage:', error);
    }
  }

  private createTaskElement(text: string, done: boolean = false): void {
    const li = document.createElement('li');
    li.dataset.createdAt = String(Date.now());

    const radio = document.createElement('span');
    radio.className = 'radio';
    radio.addEventListener('click', (e) => {
      e.stopPropagation();
      li.classList.toggle('done');
      this.saveTasks();
    });
    li.appendChild(radio);

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = text;
    li.appendChild(span);

    if (done) li.classList.add('done');

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
  private enterEditMode(
    e: MouseEvent,
    li: HTMLLIElement,
    span: HTMLSpanElement
  ): void {
    e.stopPropagation();
    const current = span.textContent || '';

    const edit = document.createElement('input');
    edit.type = 'text';
    edit.value = current;
    edit.className = 'edit-input';

    li.replaceChild(edit, span);
    edit.focus();

    const finishEdit = (save: boolean): void => {
      const val = edit.value.trim();

      if (save && val !== '') {
        span.textContent = val;
        li.replaceChild(span, edit);
      } else if (!save) {
        li.replaceChild(span, edit);
      } else if (save && val === '') {
        li.remove();
      }

      this.saveTasks();
    };

    edit.addEventListener('keydown', (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') finishEdit(true);
      if (ev.key === 'Escape') finishEdit(false);
    });

    edit.addEventListener('blur', () => finishEdit(true));
  }

  /**
   * Adiciona nova tarefa
   */
  private onAddTask(): void {
    const taskText = this.input.value.trim();
    if (taskText !== '') {
      this.createTaskElement(taskText);
      this.input.value = '';
    }
  }

  /**
   * Filtra tarefas por tipo
   */
  public filterTasks(type: FilterType): void {
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

      (task as HTMLElement).style.display = show ? 'flex' : 'none';
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
