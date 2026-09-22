"use client";

import type { Lead, StatusLead } from "@/lib/types";
import { StatusSelect } from "./StatusSelect";
import { LEAD_COLUMNS } from "./leadsColumns";

interface Props {
  leads: Lead[];
  visibleColumns: string[];
  onStatusChange: (id: string, status: StatusLead) => void;
}

export function LeadsTable({ leads, visibleColumns, onStatusChange }: Props) {
  if (leads.length === 0) {
    return <p className="py-10 text-center text-slate-500 dark:text-slate-400">Nenhum lead encontrado.</p>;
  }

  const columns = LEAD_COLUMNS.filter((c) => visibleColumns.includes(c.id));

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-navy-800 dark:bg-navy-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-navy-800 dark:bg-navy-800/50 dark:text-slate-400">
          <tr>
            {columns.map((col) => (
              <th key={col.id} className="px-3 py-3 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-slate-100 last:border-0 dark:border-navy-800">
              {columns.map((col) => (
                <td key={col.id} className="px-3 py-3 align-top text-slate-600 dark:text-slate-300">
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
