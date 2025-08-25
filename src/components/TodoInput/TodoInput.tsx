import { useState } from "react";
import "./TodoInput.css";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");

  function handleAdd() {
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim()) handleAdd();
  }

  const isDisabled = value.trim().length === 0;

  return (
    <div className="todo-input">
      <input
        type="text"
        placeholder="Digite uma nova tarefa... (Enter para adicionar)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="add-btn"
        onClick={handleAdd}
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        <span className="btn-plus">+</span>
        <span className="btn-text"> Adicionar</span>
      </button>
    </div>
  );
}
