"use client";

import type { Lead, StatusLead } from "@/lib/types";
import { STATUS_LABELS, STATUS_STYLES } from "./StatusBadge";

const STATUS_OPTIONS: StatusLead[] = ["NOVO", "CONTATADO", "COTACAO_ENVIADA", "CONVERTIDO", "PERDIDO"];

// Um único controle: o próprio select aparece como badge colorido.
export function StatusSelect({ lead, onChange }: { lead: Lead; onChange: (s: StatusLead) => void }) {
  return (
    <select
      aria-label={`Alterar status de ${lead.nome}`}
      value={lead.status}
      onChange={(e) => onChange(e.target.value as StatusLead)}
      className={`cursor-pointer rounded-full border-0 py-1 pl-3 pr-2 text-xs font-semibold outline-none ${STATUS_STYLES[lead.status]}`}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-navy-900 dark:text-white">
          {STATUS_LABELS[opt]}
        </option>
      ))}
    </select>
  );
}
