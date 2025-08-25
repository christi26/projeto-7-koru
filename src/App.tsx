import { useState } from "react";
import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import TodoList from "./components/TodoList/TodoList";
import ModalRemocao from "./components/Modal/ModalRemocao";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToRemove, setTodoToRemove] = useState<Todo | null>(null); // guarda tarefa inteira


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

  // abre o modal e guarda o item
  function handleOpenRemoveModal(todo: Todo) {
    setTodoToRemove(todo);
    setIsModalOpen(true);
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
          removeTodo={(id) => {
            const todo = todos.find((t) => t.id === id);
            if (todo) handleOpenRemoveModal(todo);
          }}
        />
         <ModalRemocao
          isOpen={isModalOpen}
          todo={todoToRemove}
          onClose={() => {
            setIsModalOpen(false);
            setTodoToRemove(null);
          }}
          onConfirm={() => {
            if (todoToRemove) {
              removeTodo(todoToRemove.id);
              setTodoToRemove(null);
            }
            setIsModalOpen(false);
          }}
        />
      </div>
    </>
  );
}

export default App;
