# To-Do List (TypeScript Avançado)

Projeto To-Do List com TypeScript, arquitetura orientada a objetos e boas práticas.

## Como usar

### 1. Instale dependências:

<h1>To-Do List</h1>

Aplicação de lista de tarefas feita com **HTML**, **CSS** (tema dark) e **TypeScript** orientado a objetos, com persistência em **localStorage** e filtros de tarefas.

---

## 📸 Preview

![To-Do List Preview](https://github.com/luanalamonica/to-do-list-version2/blob/main/home.png?raw=true)

---

## ✨ Funcionalidades

- Adicionar novas tarefas pelo campo de input ou tecla **Enter**.
- Marcar tarefas como concluídas com o círculo à esquerda.
- Editar o texto de uma tarefa com **duplo clique**.
- Excluir tarefas com o botão **X** à direita.
- Filtros de visualização: **All**, **Done** e **Pending**.
- Salvamento automático das tarefas no **localStorage** (persistem ao recarregar a página).
- Interface em tema escuro, centralizada, com fonte Inter.

---

## 🛠 Tecnologias utilizadas

- **HTML5** – estrutura da página.
- **CSS3** – estilização e layout do tema dark ([CSS/first.css](CSS/first.css)).
- **TypeScript** – lógica da aplicação ([src/first.ts](src/first.ts)).
- **LocalStorage** – persistência simples no navegador.
- **npm + TypeScript Compiler (tsc)** – build do código.

---

## 🚀 Como rodar o projeto

1. **Instalar as dependências**

	```bash
	npm install
	```

2. **Gerar o JavaScript a partir do TypeScript**

	```bash
	npm run build
	```

	Isso compila o arquivo [src/first.ts](src/first.ts) e gera [JS/first.js](JS/first.js).

3. **Abrir no navegador**

	- Abra o arquivo [index.html](index.html) clicando duas vezes ou arrastando para o navegador.
	- Para garantir que não está usando cache, use **Ctrl + F5**.

### Modo desenvolvimento (watch)

Se quiser que o TypeScript seja recompilado automaticamente a cada alteração:

```bash
npm run watch
```

Deixe esse comando rodando enquanto edita os arquivos em `src/`.

---

## 📂 Estrutura de pastas

```bash
To-Do List/
├── index.html              # Arquivo principal da aplicação
├── CSS/
│   └── first.css           # Estilos (tema escuro)
├── JS/
│   └── first.js            # Arquivo compilado (não editar direto)
├── src/
│   ├── first.ts            # Código TypeScript principal
│   └── first.test.ts       # Arquivo reservado para testes
├── tsconfig.json           # Configurações do TypeScript (strict mode)
├── package.json            # Scripts npm e dependências
└── README.md               # Documentação do projeto
```

---

## 🧠 Detalhes técnicos

- Uso de **enum `FilterType`** para controlar os filtros (`all`, `done`, `pending`).
- Interface **`ITask`** para tipar as tarefas salvas no localStorage.
- Interface **`IDOMElements`** para tipar elementos do DOM usados pela aplicação.
- Classe **`TodoApp`** encapsula toda a lógica da lista de tarefas.
- Função **`parseStorageData`** garante que os dados vindos do localStorage são válidos.
- Configuração de TypeScript com **`"strict": true`** para pegar erros em tempo de compilação.

---

## 💡 Possíveis melhorias futuras

- Adicionar prioridade, tags e data de vencimento às tarefas.
- Criar contadores de tarefas totais, feitas e pendentes.
- Implementar testes automatizados (ex.: Jest ou Vitest) em [src/first.test.ts](src/first.test.ts).
- Adicionar animações suaves nas transições e feedback visual de erro no input.

---

## 📄 Licença

Projeto criado para estudo/prática. Fique à vontade para clonar e adaptar.

