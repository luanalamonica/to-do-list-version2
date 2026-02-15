# To-Do List (TypeScript Avançado)

Projeto To-Do List com TypeScript, arquitetura orientada a objetos e boas práticas.

## Como usar

### 1. Instale dependências:

```bash
npm install
```

### 2. Compile TypeScript para JavaScript:

```bash
npm run build
```

Isso gera `JS/first.js` a partir de `src/first.ts`.

### 3. Abra no navegador:

- Duplo clique em `index.html` ou arraste para o navegador.
- Force reload: **Ctrl+F5**.

## Desenvolvimento

### Modo watch (recompila automaticamente):

```bash
npm run watch
```

Deixe rodando enquanto edita o TypeScript.

## Estrutura do projeto

```
To-Do List/
├── index.html              ← Arquivo principal
├── CSS/
│   └── first.css          ← Estilos (tema escuro)
├── JS/
│   └── first.js           ← Compilado (não editar manualmente)
├── src/
│   ├── first.ts           ← Código principal (EDITAR AQUI)
│   └── first.test.ts      ← Testes unitários
├── tsconfig.json          ← Config TypeScript (strict mode)
├── package.json           ← Scripts npm
└── README.md              ← Este arquivo
```

## Melhorias implementadas

✅ **Tipos e Interfaces**
- Interface `ITask` para estrutura de tarefas
- Interface `IDOMElements` para elementos do DOM
- Tipos genéricos para maior segurança

✅ **Enums**
- `FilterType` para tipos de filtro ('all' | 'done' | 'pending')
- Evita typos e melhora autocomplete

✅ **Classe e OOP**
- `TodoApp`: classe que encapsula toda a lógica
- Métodos privados/públicos com responsabilidades claras
- Melhor manutenibilidade e testabilidade

✅ **Type Guards e Validações**
- `parseStorageData()`: parse seguro de JSON com validação de tipo
- `getDOMElements()`: valida presença de elementos do DOM
- Tratamento robusto de erros com try/catch

✅ **Strict Mode**
- Habilitado `"strict": true` em `tsconfig.json`
- `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`
- Detecta bugs em tempo de compilação

✅ **Logging e Debug**
- Console.error/warn para ajudar no debug
- Mensagens descritivas com prefixo `[TodoApp]`

✅ **Testes Unitários**
- Arquivo `src/first.test.ts` com exemplos
- Funções de teste para save/load, validações, tipos

## Próximos passos

- Integrar framework de testes (Jest/Vitest)
- Adicionar funcionalidades: prioridades, tags, datas de vencimento
- Extrair estilos CSS para componentes SCSS
- Criar versão com componentes (Web Components ou framework)

## Dicas rápidas

- Se editar `src/first.ts`, rode `npm run build` para recompilar.
- Verifique erros de tipo antes de compilar: TypeScript só roda no VSCode ou terminal.
- Use `Ctrl+Shift+B` no VSCode para rodar build task (se configurado).

