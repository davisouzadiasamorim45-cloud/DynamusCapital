const TABS = [
  { value: "", label: "Todos" },
  { value: "NOVO", label: "Novos" },
  { value: "CONTATADO", label: "Contatados" },
  { value: "COTACAO_ENVIADA", label: "Cotação enviada" },
  { value: "CONVERTIDO", label: "Convertidos" },
  { value: "PERDIDO", label: "Perdidos" },
];

export function FilterTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            value === tab.value
              ? "bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-navy-800 dark:text-slate-300 dark:hover:bg-navy-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
