import "./ModalRemocao.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface ModalRemocaoProps {
  isOpen: boolean;
  todo: Todo | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalRemocao({ isOpen, todo, onClose, onConfirm }: ModalRemocaoProps) {
  if (!isOpen || !todo) return null;

  return (
    <div id="modal" className="show">
      <div className="content">
        <h2>Remover Tarefa</h2>
        <p>
          Tem certeza que deseja remover a tarefa <strong>"{todo.text}"</strong>?
          <br />
          Esta ação não pode ser desfeita.
        </p>
        <div className="modal-buttons-container">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm} className="botaoLimpar">
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
