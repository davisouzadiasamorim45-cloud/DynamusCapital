import type { LeadsView } from "./ViewToggle";

// Mantém a altura e o formato do conteúdo que vai chegar, para a tela não pular.
export function LeadsSkeleton({ view }: { view: LeadsView }) {
  const bar = "animate-pulse rounded bg-slate-200 dark:bg-navy-800";

  if (view === "cards") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-navy-800 dark:bg-navy-900">
            <div className={`${bar} h-4 w-2/3`} />
            <div className={`${bar} mt-3 h-3 w-1/3`} />
            <div className={`${bar} mt-6 h-3 w-full`} />
            <div className={`${bar} mt-2 h-3 w-5/6`} />
            <div className={`${bar} mt-6 h-10 w-full`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-navy-800 dark:bg-navy-900">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-slate-100 px-4 py-4 last:border-0 dark:border-navy-800/70"
        >
          <div className={`${bar} h-3 w-1/4`} />
          <div className={`${bar} h-3 w-1/6`} />
          <div className={`${bar} h-3 w-1/6`} />
          <div className={`${bar} ml-auto h-6 w-20 rounded-full`} />
        </div>
      ))}
    </div>
  );
}
