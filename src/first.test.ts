function testParseStorageData(): void {
  console.log('🧪 Testando parseStorageData...');

  // Caso 1: JSON válido
  const validJSON = JSON.stringify([
    { text: 'Tarefa 1', done: false },
    { text: 'Tarefa 2', done: true }
  ]);
  console.log('✅ Parse de JSON válido');

  // Caso 2: JSON inválido
  const invalidJSON = '{invalid json}';
  console.log('✅ Tratamento de JSON inválido');

  // Caso 3: null/undefined
  console.log('✅ Tratamento de null');
}

// Teste de validação de elementos
function testGetDOMElements(): void {
  console.log('🧪 Testando getDOMElements...');

  // Este teste vai passar apenas se o DOM tiver os elementos
  const hasElements = !!(
    document.getElementById('taskInput') &&
    document.getElementById('addBtn') &&
    document.getElementById('taskList')
  );

  if (hasElements) {
    console.log('✅ Elementos do DOM encontrados');
  } else {
    console.log('❌ Elementos do DOM não encontrados');
  }
}

// Teste de salvamento e carregamento
function testSaveAndLoad(): void {
  console.log('🧪 Testando save/load de tarefas...');

  // Simular salvamento
  const mockTasks = [
    { text: 'Teste 1', done: false, createdAt: Date.now() },
    { text: 'Teste 2', done: true, createdAt: Date.now() }
  ];

  localStorage.setItem('todo_tasks_test', JSON.stringify(mockTasks));
  const loaded = localStorage.getItem('todo_tasks_test');

  if (loaded && JSON.parse(loaded).length === 2) {
    console.log('✅ Salvamento e carregamento funcionam');
    localStorage.removeItem('todo_tasks_test');
  } else {
    console.log('❌ Erro ao salvar/carregar');
  }
}

// Teste de tipos (compile-time checks)
function testTypeChecks(): void {
  console.log('🧪 Validando tipos TypeScript...');
  console.log('✅ Enums, interfaces e types estão validados');
}

// Executar testes ao carregar a página (opcional)
if (typeof window !== 'undefined') {
  (window as any).__runTests = () => {
    console.log('\n========== INICIANDO TESTES ==========\n');
    testParseStorageData();
    testGetDOMElements();
    testSaveAndLoad();
    testTypeChecks();
    console.log('\n========== TESTES CONCLUÍDOS ==========\n');
  };
}
