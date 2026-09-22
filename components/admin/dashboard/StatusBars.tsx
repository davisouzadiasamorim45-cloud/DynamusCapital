import Link from "next/link";
import type { Lead } from "@/lib/types";
import { countByStatus, STATUS_COLORS, STATUS_ORDER } from "@/lib/adminStats";
import { STATUS_LABELS } from "../StatusBadge";
import { Card } from "../Card";

export function StatusBars({ leads }: { leads: Lead[] }) {
  const counts = countByStatus(leads);
  const max = Math.max(1, ...STATUS_ORDER.map((s) => counts[s]));

  return (
    <Card title="Funil de leads">
      <ul className="space-y-3">
        {STATUS_ORDER.map((status) => (
          <li key={status} className="grid grid-cols-[140px_1fr_28px] items-center gap-3 text-sm">
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[status] }} />
              {STATUS_LABELS[status]}
            </span>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-navy-800">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(counts[status] / max) * 100}%`, backgroundColor: STATUS_COLORS[status] }}
              />
            </div>
            <span className="text-right font-semibold text-slate-900 dark:text-white">{counts[status]}</span>
          </li>
        ))}
      </ul>
      <Link href="/admin/leads" className="mt-5 inline-block text-sm font-medium text-navy-600 hover:underline dark:text-gold-300">
        Ver leads
      </Link>
    </Card>
  );
}
