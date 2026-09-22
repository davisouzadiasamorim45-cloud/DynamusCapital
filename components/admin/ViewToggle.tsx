"use client";

import clsx from "clsx";
import { IconGrid, IconTable } from "@/components/ui/icons";

export type LeadsView = "table" | "cards";

const VIEW_KEY = "dynamus_admin_leads_view";

export function loadView(): LeadsView {
  try {
    return window.localStorage.getItem(VIEW_KEY) === "cards" ? "cards" : "table";
  } catch {
    return "table";
  }
}

export function saveView(view: LeadsView): void {
  try {
    window.localStorage.setItem(VIEW_KEY, view);
  } catch {
    // ignora: a escolha só não fica salva
  }
}

const OPTIONS: { value: LeadsView; label: string; Icon: typeof IconTable }[] = [
  { value: "table", label: "Tabela", Icon: IconTable },
  { value: "cards", label: "Cards", Icon: IconGrid },
];

export function ViewToggle({ value, onChange }: { value: LeadsView; onChange: (v: LeadsView) => void }) {
  return (
    <div
      role="group"
      aria-label="Modo de visualização"
      className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 dark:border-navy-700 dark:bg-navy-900"
    >
      {OPTIONS.map(({ value: v, label, Icon }) => (
        <button
          key={v}
          type="button"
          aria-pressed={value === v}
          onClick={() => onChange(v)}
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition",
            value === v
              ? "bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
