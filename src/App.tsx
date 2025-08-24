import { useState } from 'react';
import './App.css';

// Contador de tarefas Christiane Gomes
function App() {
  const [todos, setTodos] = useState([]); // Estado para a lista de tarefas
  const [input, setInput] = useState(''); // Estado para o input da nova tarefa
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput(''); // Limpa o input após adicionar a tarefa
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const pendingTasksCount = todos.filter(todo => !todo.completed).length; // Contador de tarefas pendentes
  
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <h6>Organize as suas tarefas de forma simples e eficiente</h6>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Adicionar nova tarefa"
      />
      <button onClick={addTodo}>Adicionar</button>

      

      <h6>Todas: {pendingTasksCount}</h6> {/* Exibe o contador */}
      

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
