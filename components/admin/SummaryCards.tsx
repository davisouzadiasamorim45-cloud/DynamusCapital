import type { Lead } from "@/lib/types";

function isSameMonth(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

export function SummaryCards({ leads }: { leads: Lead[] }) {
  const total = leads.length;
  const aguardando = leads.filter((l) => l.status === "NOVO").length;
  const convertidosNoMes = leads.filter((l) => l.status === "CONVERTIDO" && isSameMonth(l.updatedAt)).length;

  const cards = [
    { label: "Total de leads", value: total },
    { label: "Aguardando contato", value: aguardando },
    { label: "Convertidos no mês", value: convertidosNoMes },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
