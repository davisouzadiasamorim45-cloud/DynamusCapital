import type { Lead } from "@/lib/types";
import { countByTipo } from "@/lib/adminStats";
import { Card } from "../Card";

export function TipoBars({ leads }: { leads: Lead[] }) {
  const tipos = countByTipo(leads);
  const max = Math.max(1, ...tipos.map((t) => t.count));

  return (
    <Card title="Leads por tipo de seguro">
      {tipos.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Sem dados ainda.</p>
      ) : (
        <ul className="space-y-3">
          {tipos.map((t) => (
            <li key={t.tipo} className="grid grid-cols-[130px_1fr_28px] items-center gap-3 text-sm">
              <span className="truncate text-slate-600 dark:text-slate-300">{t.label}</span>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-navy-800">
                <div
                  className="h-full rounded-full bg-navy-600 dark:bg-gold-400"
                  style={{ width: `${(t.count / max) * 100}%` }}
                />
              </div>
              <span className="text-right font-semibold text-slate-900 dark:text-white">{t.count}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
