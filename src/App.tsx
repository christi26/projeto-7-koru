import { useState } from "react";
import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filtro = "todas" | "pendentes" | "concluidas";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  function handleAdd(text: string) {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  }

  function toggleComplete(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function removeTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const pendingTasksCount = todos.filter((todo) => !todo.completed).length;
  const completedTasksCount = todos.filter((todo) => todo.completed).length;

  let todosFiltrados = todos;
  if (filtro === "pendentes")
    todosFiltrados = todos.filter((todo) => !todo.completed);
  if (filtro === "concluidas")
    todosFiltrados = todos.filter((todo) => todo.completed);

  return (
    <>
      <Header />
      <div className="app-container">
        <TodoInput onAdd={handleAdd} />
        <TodoFilter
          total={todos.length}
          pendentes={pendingTasksCount}
          concluidas={completedTasksCount}
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <TodoList
          todos={todosFiltrados}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      </div>
    </>
  );
}

export default App;
