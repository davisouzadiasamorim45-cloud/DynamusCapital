"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_COLUMN_IDS, LEAD_COLUMNS } from "./leadsColumns";

interface Props {
  value: string[];
  onChange: (ids: string[]) => void;
}

export function ColumnPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle(id: string) {
    const next = value.includes(id) ? value.filter((v) => v !== id) : [...value, id];
    // mantém a ordem original das colunas
    onChange(LEAD_COLUMNS.filter((c) => next.includes(c.id)).map((c) => c.id));
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-200 dark:hover:bg-navy-800"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="h-4 w-4">
          <path d="M4 6h16M4 12h16M4 18h16M9 4v4M15 10v4M8 16v4" />
        </svg>
        Colunas
        <span className="rounded-full bg-slate-100 px-1.5 text-xs text-slate-600 dark:bg-navy-800 dark:text-slate-300">
          {value.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-navy-700 dark:bg-navy-900">
          <p className="mb-2 px-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Colunas da tabela</p>
          <ul className="space-y-0.5">
            {LEAD_COLUMNS.map((col) => (
              <li key={col.id}>
                <label
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm ${
                    col.locked
                      ? "cursor-not-allowed text-slate-400 dark:text-slate-500"
                      : "cursor-pointer text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-navy-800"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-navy-700 dark:accent-gold-400"
                    checked={value.includes(col.id)}
                    disabled={col.locked}
                    onChange={() => toggle(col.id)}
                  />
                  {col.label}
                  {col.locked && <span className="ml-auto text-xs">fixa</span>}
                </label>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onChange(DEFAULT_COLUMN_IDS)}
            className="mt-2 w-full rounded-lg px-2 py-1.5 text-left text-sm font-medium text-navy-600 hover:bg-slate-50 dark:text-gold-300 dark:hover:bg-navy-800"
          >
            Restaurar padrão
          </button>
        </div>
      )}
    </div>
  );
}
