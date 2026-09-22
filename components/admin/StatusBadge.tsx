export const STATUS_STYLES: Record<string, string> = {
  NOVO: "bg-navy-100 text-navy-700 dark:bg-slate-500/20 dark:text-slate-300",
  CONTATADO: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  COTACAO_ENVIADA: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
  CONVERTIDO: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
  PERDIDO: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
};

export const STATUS_LABELS: Record<string, string> = {
  NOVO: "Novo",
  CONTATADO: "Contatado",
  COTACAO_ENVIADA: "Cotação enviada",
  CONVERTIDO: "Convertido",
  PERDIDO: "Perdido",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? ""}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
