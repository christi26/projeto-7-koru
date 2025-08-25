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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
