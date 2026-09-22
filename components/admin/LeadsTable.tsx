"use client";

import type { Lead, StatusLead } from "@/lib/types";
import { StatusSelect } from "./StatusSelect";
import { LEAD_COLUMNS } from "./leadsColumns";
import { EmptyLeads } from "./EmptyLeads";

interface Props {
  leads: Lead[];
  visibleColumns: string[];
  onStatusChange: (id: string, status: StatusLead) => void;
  filtrado?: boolean;
}

export function LeadsTable({ leads, visibleColumns, onStatusChange, filtrado }: Props) {
  if (leads.length === 0) return <EmptyLeads filtrado={filtrado} />;

  const columns = LEAD_COLUMNS.filter((c) => visibleColumns.includes(c.id));

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-navy-800 dark:bg-navy-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-400 dark:border-navy-800 dark:text-slate-500">
          <tr>
            {columns.map((col) => (
              <th key={col.id} className="px-4 py-3 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-navy-800/70">
          {leads.map((lead) => (
            <tr key={lead.id} className="transition hover:bg-slate-50/80 dark:hover:bg-navy-800/40">
              {columns.map((col) => (
                <td key={col.id} className="px-4 py-3.5 align-middle text-slate-600 dark:text-slate-300">
                  {col.id === "status" ? (
                    <StatusSelect lead={lead} onChange={(s) => onStatusChange(lead.id, s)} />
                  ) : (
                    col.render(lead)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
