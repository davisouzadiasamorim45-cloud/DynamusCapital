"use client";

import { formatSeguroDetalhe, TIPO_SEGURO_LABELS, type Lead, type StatusLead } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

const STATUS_OPTIONS: StatusLead[] = ["NOVO", "CONTATADO", "COTACAO_ENVIADA", "CONVERTIDO", "PERDIDO"];

interface Props {
  leads: Lead[];
  onStatusChange: (id: string, status: StatusLead) => void;
}

export function LeadsTable({ leads, onStatusChange }: Props) {
  if (leads.length === 0) {
    return <p className="py-10 text-center text-slate-500">Nenhum lead encontrado.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">Seguro</th>
            <th className="px-4 py-3">Bairro</th>
            <th className="px-4 py-3">Contato</th>
            <th className="px-4 py-3">Recebido em</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-3 font-medium text-slate-900">{lead.nome}</td>
              <td className="px-4 py-3 text-slate-600">
                <div className="font-medium text-slate-700">{TIPO_SEGURO_LABELS[lead.tipoSeguro] ?? lead.tipoSeguro}</div>
                <div className="text-xs text-slate-400">{formatSeguroDetalhe(lead)}</div>
              </td>
              <td className="px-4 py-3 text-slate-600">{lead.bairro}</td>
              <td className="px-4 py-3 text-slate-600">
                <div>{lead.email}</div>
                <div className="text-xs text-slate-400">{lead.celular}</div>
              </td>
              <td className="px-4 py-3 text-slate-600">{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={lead.status} />
                  <select
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead.id, e.target.value as StatusLead)}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
