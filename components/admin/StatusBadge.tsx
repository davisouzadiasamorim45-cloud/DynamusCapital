// Paleta de status alinhada à marca: dourado marca o desfecho valioso (convertido)
// e "perdido" é cinza, não vermelho — negócio encerrado não é erro.
export const STATUS_STYLES: Record<string, string> = {
  NOVO: "bg-navy-100 text-navy-800 dark:bg-navy-700/60 dark:text-navy-100",
  CONTATADO: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  COTACAO_ENVIADA: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
  CONVERTIDO: "bg-gold-100 text-gold-700 dark:bg-gold-400/20 dark:text-gold-200",
  PERDIDO: "bg-slate-200 text-slate-600 dark:bg-navy-800 dark:text-slate-400",
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
