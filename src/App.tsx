import { useState } from "react";
import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput/TodoInput";
import "./App.css";

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleAdd(text: string) {
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  }
  return (
    <>
      <Header />
      <div className="app-container">
        <TodoInput onAdd={handleAdd} />
        {todos.length === 0 && (
          <div className="empty-state">
            <h2>Nenhuma tarefa ainda</h2>
            <p>Adicione sua primeira tarefa acima para começar!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
