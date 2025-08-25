import { useState } from "react";
import "./TodoList.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
// alterações feitas para incluir o "updateTodo"
interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
}

export default function TodoList({
  todos,
  toggleComplete,
  removeTodo,
  updateTodo,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h2>Nenhuma tarefa</h2>
        <p>Adicione sua primeira tarefa acima para começar!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item${todo.completed ? " completed" : ""}`}
        >
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span className="custom-checkbox"></span>
          </label>

          {editingId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => {
                updateTodo(todo.id, editText);
                setEditingId(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateTodo(todo.id, editText);
                  setEditingId(null);
                }
              }}
              autoFocus
            />
          ) : (
            <>
              <span
                className="todo-text"
                onDoubleClick={() => {
                  setEditingId(todo.id);
                  setEditText(todo.text);
                }}
                title="Clique duas vezes para editar"
              >
                {todo.text}
              </span>
              <button
                className="remove-btn"
                onClick={() => removeTodo(todo.id)}
                title="Remover"
              >
                Remover
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

