import clsx from "clsx";

const TABS = [
  { value: "", label: "Todos" },
  { value: "NOVO", label: "Novos" },
  { value: "CONTATADO", label: "Contatados" },
  { value: "COTACAO_ENVIADA", label: "Cotação enviada" },
  { value: "CONVERTIDO", label: "Convertidos" },
  { value: "PERDIDO", label: "Perdidos" },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
  // Contagem por status sobre a base inteira, não sobre o filtro atual.
  counts?: Record<string, number>;
  total?: number;
}

// Controle segmentado com sublinhado: ocupa menos peso visual que uma fileira de
// pílulas escuras e cabe mostrar a contagem junto, que é o que orienta a escolha.
export function FilterTabs({ value, onChange, counts, total }: Props) {
  return (
    <div className="-mb-px flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-navy-800">
      {TABS.map((tab) => {
        const active = value === tab.value;
        const count = tab.value === "" ? total : counts?.[tab.value];
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={clsx(
              "flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition",
              active
                ? "border-navy-900 font-semibold text-navy-900 dark:border-gold-400 dark:text-gold-300"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            {tab.label}
            {count !== undefined && (
              <span
                className={clsx(
                  "rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                  active
                    ? "bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950"
                    : "bg-slate-100 text-slate-500 dark:bg-navy-800 dark:text-slate-400"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
