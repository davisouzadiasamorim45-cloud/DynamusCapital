import type { ReactNode } from "react";
import { formatDocumentoLead, formatSeguroDetalhe, TIPO_SEGURO_LABELS, type Lead } from "@/lib/types";
import { whatsappUrl } from "@/lib/contact";
import { maskCelular, maskCep } from "@/lib/masks";
import { IconChat } from "@/components/ui/icons";

export interface LeadColumn {
  id: string;
  label: string;
  // Colunas fixas não podem ser ocultadas.
  locked?: boolean;
  defaultVisible: boolean;
  render: (lead: Lead) => ReactNode;
}

const muted = "text-xs text-slate-400 dark:text-slate-500";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

// A coluna "status" é renderizada pela própria tabela (precisa do handler de troca).
export const LEAD_COLUMNS: LeadColumn[] = [
  {
    id: "nome",
    label: "Nome",
    locked: true,
    defaultVisible: true,
    render: (l) => <span className="font-medium text-slate-900 dark:text-white">{l.nome}</span>,
  },
  {
    id: "documento",
    label: "CPF/CNPJ",
    defaultVisible: false,
    render: (l) => (
      <>
        <div className="whitespace-nowrap">{formatDocumentoLead(l)}</div>
        <div className={muted}>{l.tipoPessoa === "PJ" ? "Pessoa jurídica" : "Pessoa física"}</div>
      </>
    ),
  },
  {
    id: "seguro",
    label: "Seguro",
    defaultVisible: true,
    render: (l) => (
      <>
        <div className="font-medium text-slate-700 dark:text-slate-200">{TIPO_SEGURO_LABELS[l.tipoSeguro] ?? l.tipoSeguro}</div>
        <div className={muted}>{formatSeguroDetalhe(l)}</div>
      </>
    ),
  },
  {
    id: "cidade",
    label: "Cidade",
    defaultVisible: true,
    render: (l) => (
      <span className="whitespace-nowrap">
        {l.cidade} - {l.uf}
      </span>
    ),
  },
  { id: "bairro", label: "Bairro", defaultVisible: false, render: (l) => l.bairro },
  {
    id: "endereco",
    label: "Endereço",
    defaultVisible: false,
    render: (l) => (
      <>
        <div>
          {l.rua}, {l.numero}
          {l.complemento ? ` - ${l.complemento}` : ""}
        </div>
        <div className={muted}>
          {l.bairro}, {l.cidade} - {l.uf} · CEP {maskCep(l.cep)}
        </div>
      </>
    ),
  },
  {
    id: "celular",
    label: "Celular",
    defaultVisible: true,
    render: (l) => (
      <a
        href={whatsappUrl(l)}
        target="_blank"
        rel="noopener noreferrer"
        title="Abrir conversa no WhatsApp"
        className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-green-700 hover:underline dark:text-green-400"
      >
        <IconChat className="h-4 w-4 shrink-0" />
        {maskCelular(l.celular)}
      </a>
    ),
  },
  {
    id: "email",
    label: "E-mail",
    defaultVisible: true,
    render: (l) => (
      <a href={`mailto:${l.email}`} title={l.email} className="block max-w-[9rem] truncate hover:underline">
        {l.email}
      </a>
    ),
  },
  { id: "origem", label: "Origem", defaultVisible: false, render: (l) => l.origem ?? "—" },
  { id: "recebido", label: "Recebido em", defaultVisible: true, render: (l) => formatDate(l.createdAt) },
  { id: "atualizado", label: "Atualizado em", defaultVisible: false, render: (l) => formatDate(l.updatedAt) },
  { id: "status", label: "Status", defaultVisible: true, render: () => null },
];

export const DEFAULT_COLUMN_IDS = LEAD_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.id);

const STORAGE_KEY = "dynamus_admin_leads_columns";

export function loadColumnIds(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_COLUMN_IDS;
    let saved = JSON.parse(raw);
    if (!Array.isArray(saved)) return DEFAULT_COLUMN_IDS;
    // "contato" foi dividido em "celular" e "email"
    if (saved.includes("cpf")) saved = saved.map((id: string) => (id === "cpf" ? "documento" : id));
    if (saved.includes("contato")) saved = [...saved.filter((id: string) => id !== "contato"), "celular", "email"];
    const valid = LEAD_COLUMNS.filter((c) => c.locked || saved.includes(c.id)).map((c) => c.id);
    return valid.length > 0 ? valid : DEFAULT_COLUMN_IDS;
  } catch {
    return DEFAULT_COLUMN_IDS;
  }
}

export function saveColumnIds(ids: string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignora: a escolha só não fica salva
  }
}
