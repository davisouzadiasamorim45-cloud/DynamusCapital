"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api, getToken } from "@/lib/api";
import type { Lead, StatusLead } from "@/lib/types";
import { SummaryCards } from "@/components/admin/SummaryCards";
import { FilterTabs } from "@/components/admin/FilterTabs";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, string> = {};
      if (statusFilter) params.status = statusFilter;
      if (busca) params.busca = busca;
      const result = await api.listLeads(params);
      setLeads(result);
    } catch {
      setError("Não foi possível carregar os leads.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, busca]);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    loadLeads();
  }, [loadLeads, router]);

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

  function handleLogout() {
    window.localStorage.removeItem("dynamus_admin_token");
    window.localStorage.removeItem("dynamus_admin_nome");
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Logo className="mb-3" />
            <h1 className="text-2xl font-bold text-slate-900">Leads recebidos</h1>
            <p className="text-sm text-slate-500">Acompanhe e gerencie as cotações solicitadas.</p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        <div className="mb-6">
          <SummaryCards leads={leads} />
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs value={statusFilter} onChange={setStatusFilter} />
          <input
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-navy-700"
            placeholder="Buscar por nome ou CPF"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadLeads()}
          />
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {loading ? (
          <p className="text-slate-500">Carregando...</p>
        ) : (
          <LeadsTable leads={leads} onStatusChange={handleStatusChange} />
        )}
      </div>
    </div>
  );
}
