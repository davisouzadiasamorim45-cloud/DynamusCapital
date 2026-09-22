import { IconUsers } from "@/components/ui/icons";

// Dois vazios diferentes: "o filtro não achou nada" e "ainda não chegou nada"
// pedem reações opostas do usuário.
export function EmptyLeads({ filtrado }: { filtrado?: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center dark:border-navy-700 dark:bg-navy-900/40">
      <IconUsers className="mx-auto h-8 w-8 text-slate-300 dark:text-navy-700" />
      <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">
        {filtrado ? "Nenhum lead com esses filtros" : "Nenhum lead ainda"}
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {filtrado
          ? "Tente limpar a busca ou ampliar o período."
          : "Quando alguém pedir uma cotação pelo site, o pedido aparece aqui."}
      </p>
    </div>
  );
}
