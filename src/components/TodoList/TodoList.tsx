import "./TodoList.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
}

export default function TodoList({
  todos,
  toggleComplete,
  removeTodo,
}: TodoListProps) {
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
          <span className="todo-text">{todo.text}</span>
          <button
            className="remove-btn"
            onClick={() => removeTodo(todo.id)}
            title="Remover"
          >
            Remover
          </button>
        </li>
      ))}
    </ul>
  );
}
