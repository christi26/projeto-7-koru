import "./TodoFilter.css";

interface TodoFilterProps {
  total: number;
  pendentes: number;
  concluidas: number;
  filtro: "todas" | "pendentes" | "concluidas";
  setFiltro: (f: "todas" | "pendentes" | "concluidas") => void;
}

export default function TodoFilter({
  total,
  pendentes,
  concluidas,
  filtro,
  setFiltro,
}: TodoFilterProps) {
  return (
    <div className="todo-filter">
      <button
        className={filtro === "todas" ? "active" : ""}
        onClick={() => setFiltro("todas")}
      >
        Todas <span className="badge">{total}</span>
      </button>
      <button
        className={filtro === "pendentes" ? "active" : ""}
        onClick={() => setFiltro("pendentes")}
      >
        Pendentes <span className="badge">{pendentes}</span>
      </button>
      <button
        className={filtro === "concluidas" ? "active" : ""}
        onClick={() => setFiltro("concluidas")}
      >
        Concluídas <span className="badge">{concluidas}</span>
      </button>
    </div>
  );
}
