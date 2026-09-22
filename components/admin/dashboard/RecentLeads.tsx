import Link from "next/link";
import { TIPO_SEGURO_LABELS, type Lead } from "@/lib/types";
import { StatusBadge } from "../StatusBadge";
import { Card } from "../Card";

export function RecentLeads({ leads }: { leads: Lead[] }) {
  const recent = [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);

  return (
    <Card
      title="Leads recentes"
      action={
        <Link href="/admin/leads" className="text-sm font-medium text-navy-600 hover:underline dark:text-gold-300">
          Ver todos
        </Link>
      }
    >
      {recent.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum lead recebido ainda.</p>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-navy-800">
          {recent.map((lead) => (
            <li key={lead.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{lead.nome}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {TIPO_SEGURO_LABELS[lead.tipoSeguro] ?? lead.tipoSeguro} · {lead.bairro}
                </p>
              </div>
              <StatusBadge status={lead.status} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
