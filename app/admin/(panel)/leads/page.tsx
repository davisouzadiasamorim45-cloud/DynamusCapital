"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { TIPO_SEGURO_OPTIONS, type Lead, type StatusLead } from "@/lib/types";
import { SummaryCards } from "@/components/admin/SummaryCards";
import { FilterTabs } from "@/components/admin/FilterTabs";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadsCards } from "@/components/admin/LeadsCards";
import { ColumnPicker } from "@/components/admin/ColumnPicker";
import { ViewToggle, loadView, saveView, type LeadsView } from "@/components/admin/ViewToggle";
import { DEFAULT_COLUMN_IDS, loadColumnIds, saveColumnIds } from "@/components/admin/leadsColumns";

const DAY = 24 * 60 * 60 * 1000;

const PERIODOS = [
  { value: "", label: "Todo o período" },
  { value: "hoje", label: "Hoje" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
];

function periodoToDataInicio(periodo: string): string | undefined {
  if (!periodo) return undefined;
  if (periodo === "hoje") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return start.toISOString();
  }
  return new Date(Date.now() - Number(periodo) * DAY).toISOString();
}

const controlClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-navy-700 dark:border-navy-700 dark:bg-navy-900 dark:text-white dark:focus:border-gold-400";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [tipoFilter, setTipoFilter] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [busca, setBusca] = useState("");
  const [debouncedBusca, setDebouncedBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [columns, setColumns] = useState<string[]>(DEFAULT_COLUMN_IDS);

  const [view, setView] = useState<LeadsView>("table");

  useEffect(() => {
    setColumns(loadColumnIds());
    setView(loadView());
  }, []);

  function handleViewChange(next: LeadsView) {
    setView(next);
    saveView(next);
  }

  function handleColumnsChange(ids: string[]) {
    setColumns(ids);
    saveColumnIds(ids);
  }

  useEffect(() => {
    const t = setTimeout(() => setDebouncedBusca(busca), 300);
    return () => clearTimeout(t);
  }, [busca]);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, string> = {};
      if (statusFilter) params.status = statusFilter;
      if (tipoFilter) params.tipo_seguro = tipoFilter;
      const dataInicio = periodoToDataInicio(periodo);
      if (dataInicio) params.data_inicio = dataInicio;
      if (debouncedBusca) params.busca = debouncedBusca;
      setLeads(await api.listLeads(params));
    } catch {
      setError("Não foi possível carregar os leads.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, tipoFilter, periodo, debouncedBusca]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  async function handleStatusChange(id: string, status: StatusLead) {
    const previous = leads;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await api.updateLeadStatus(id, status);
    } catch {
      setLeads(previous);
      setError("Não foi possível atualizar o status.");
    }
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leads recebidos</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Acompanhe e gerencie as cotações solicitadas.</p>
      </header>

      <div className="mb-6">
        <SummaryCards leads={leads} />
      </div>

      <div className="mb-3">
        <FilterTabs value={statusFilter} onChange={setStatusFilter} />
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          className={`${controlClass} sm:w-64`}
          placeholder="Buscar por nome, CPF ou CNPJ"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select className={controlClass} value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)} aria-label="Tipo de seguro">
          <option value="">Todos os seguros</option>
          {TIPO_SEGURO_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select className={controlClass} value={periodo} onChange={(e) => setPeriodo(e.target.value)} aria-label="Período">
          {PERIODOS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2 sm:ml-auto">
          {view === "table" && <ColumnPicker value={columns} onChange={handleColumnsChange} />}
          <ViewToggle value={view} onChange={handleViewChange} />
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-slate-500 dark:text-slate-400">Carregando...</p>
      ) : view === "cards" ? (
        <LeadsCards leads={leads} onStatusChange={handleStatusChange} />
      ) : (
        <LeadsTable leads={leads} visibleColumns={columns} onStatusChange={handleStatusChange} />
      )}
    </>
  );
}
