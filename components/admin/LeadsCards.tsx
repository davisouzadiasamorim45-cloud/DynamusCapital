"use client";

import { formatSeguroDetalhe, TIPO_SEGURO_LABELS, type Lead, type StatusLead } from "@/lib/types";
import { whatsappUrl } from "@/lib/contact";
import { maskCelular } from "@/lib/masks";
import { IconChat, IconMail, IconPhone, IconPin } from "@/components/ui/icons";
import { StatusSelect } from "./StatusSelect";
import { EmptyLeads } from "./EmptyLeads";

interface Props {
  leads: Lead[];
  onStatusChange: (id: string, status: StatusLead) => void;
  filtrado?: boolean;
}

const row = "flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300";
const rowIcon = "mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500";

export function LeadsCards({ leads, onStatusChange, filtrado }: Props) {
  if (leads.length === 0) return <EmptyLeads filtrado={filtrado} />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {leads.map((lead) => (
        <article
          key={lead.id}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">{lead.nome}</h3>
            <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
              {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-navy-800 dark:text-slate-200">
              {TIPO_SEGURO_LABELS[lead.tipoSeguro] ?? lead.tipoSeguro}
            </span>
            <StatusSelect lead={lead} onChange={(s) => onStatusChange(lead.id, s)} />
          </div>

          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{formatSeguroDetalhe(lead)}</p>

          <div className="mt-4 space-y-2">
            <p className={row}>
              <IconPhone className={rowIcon} />
              {maskCelular(lead.celular)}
            </p>
            <p className={row}>
              <IconMail className={rowIcon} />
              <span className="break-words">{lead.email}</span>
            </p>
            <p className={row}>
              <IconPin className={rowIcon} />
              <span>
                {lead.cidade} - {lead.uf}
                <span className="block text-xs text-slate-400 dark:text-slate-500">
                  {lead.rua}, {lead.numero} · {lead.bairro}
                </span>
              </span>
            </p>
          </div>

          <div className="mt-auto flex gap-2 pt-5">
            <a
              href={whatsappUrl(lead)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <IconChat className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`mailto:${lead.email}`}
              title="Enviar e-mail"
              aria-label={`Enviar e-mail para ${lead.nome}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3.5 text-slate-600 transition hover:bg-slate-50 dark:border-navy-700 dark:text-slate-300 dark:hover:bg-navy-800"
            >
              <IconMail className="h-4 w-4" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
