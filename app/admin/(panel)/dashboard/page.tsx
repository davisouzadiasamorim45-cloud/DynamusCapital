"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Lead } from "@/lib/types";
import { ConversionFunnel } from "@/components/admin/dashboard/ConversionFunnel";
import { StatusBars } from "@/components/admin/dashboard/StatusBars";
import { Recommendations } from "@/components/admin/dashboard/Recommendations";
import { RecentLeads } from "@/components/admin/dashboard/RecentLeads";
import { TipoBars } from "@/components/admin/dashboard/TipoBars";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .listLeads({})
      .then(setLeads)
      .catch(() => setError("Não foi possível carregar os dados."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Visão geral das cotações recebidas.</p>
      </header>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-slate-500 dark:text-slate-400">Carregando...</p>
      ) : (
        <div className="space-y-6">
          <ConversionFunnel leads={leads} />
          <div className="grid gap-6 lg:grid-cols-2">
            <StatusBars leads={leads} />
            <Recommendations leads={leads} />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <TipoBars leads={leads} />
            <RecentLeads leads={leads} />
          </div>
        </div>
      )}
    </>
  );
}
