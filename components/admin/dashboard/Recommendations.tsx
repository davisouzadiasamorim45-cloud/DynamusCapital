import type { Lead } from "@/lib/types";
import { buildRecommendations, type Tone } from "@/lib/adminStats";
import { Card } from "../Card";

const TONE_DOT: Record<Tone, string> = {
  danger: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
  ok: "bg-green-500",
};

export function Recommendations({ leads }: { leads: Lead[] }) {
  const recs = buildRecommendations(leads);

  return (
    <Card title="Recomendações">
      <ul className="space-y-3">
        {recs.map((rec) => (
          <li key={rec.title} className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-navy-800/60">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <span className={`h-2 w-2 shrink-0 rounded-full ${TONE_DOT[rec.tone]}`} />
              {rec.title}
            </p>
            <p className="mt-0.5 pl-4 text-xs text-slate-500 dark:text-slate-400">{rec.hint}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
