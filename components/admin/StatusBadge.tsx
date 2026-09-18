const STATUS_STYLES: Record<string, string> = {
  NOVO: "bg-navy-100 text-navy-700",
  CONTATADO: "bg-amber-100 text-amber-700",
  COTACAO_ENVIADA: "bg-purple-100 text-purple-700",
  CONVERTIDO: "bg-green-100 text-green-700",
  PERDIDO: "bg-slate-200 text-slate-600",
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
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? ""}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
