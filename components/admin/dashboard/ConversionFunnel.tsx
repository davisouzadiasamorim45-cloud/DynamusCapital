import type { Lead } from "@/lib/types";
import { buildFunnel, countByStatus, pct, STATUS_COLORS, STATUS_ORDER } from "@/lib/adminStats";
import { STATUS_LABELS } from "../StatusBadge";
import { Card } from "../Card";

const CHART_HEIGHT = 220;
const MIN_HEIGHT_PCT = 16;

function StatusDonut({ leads }: { leads: Lead[] }) {
  const counts = countByStatus(leads);
  const total = leads.length;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-32 w-32 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="12" className="stroke-slate-200 dark:stroke-navy-800" />
          {total > 0 &&
            STATUS_ORDER.map((status) => {
              const length = (counts[status] / total) * circumference;
              const segment = (
                <circle
                  key={status}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={STATUS_COLORS[status]}
                  strokeWidth="12"
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += length;
              return segment;
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{total}</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">leads</span>
        </div>
      </div>
      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
        {STATUS_ORDER.map((status) => (
          <li key={status} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[status] }} />
            {STATUS_LABELS[status]}
            <span className="font-semibold text-slate-900 dark:text-white">{counts[status]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConversionFunnel({ leads }: { leads: Lead[] }) {
  const steps = buildFunnel(leads);
  const total = leads.length;
  const heights = steps.map((s) => (total === 0 ? MIN_HEIGHT_PCT : Math.max(MIN_HEIGHT_PCT, (s.count / total) * 100)));

  const funnel = Object.fromEntries(steps.map((s) => [s.key, s]));
  const kpis = [
    {
      color: STATUS_COLORS.CONVERTIDO,
      name: "Taxa de conversão",
      formula: "Convertidos / Total",
      text: "É o KPI principal do funil de vendas.",
      value: pct(funnel.convertidos.count, total),
    },
    {
      color: STATUS_COLORS.CONTATADO,
      name: "Taxa de contato",
      formula: "Contatados / Total",
      text: "Mostra quanto do que chegou está sendo efetivamente trabalhado.",
      value: funnel.contatados.rate,
    },
    {
      color: STATUS_COLORS.COTACAO_ENVIADA,
      name: "Taxa de cotação",
      formula: "Cotações / Contatados",
      text: "Quantos dos contatos evoluíram para uma proposta enviada.",
      value: funnel.cotacoes.rate,
    },
    {
      color: STATUS_COLORS.PERDIDO,
      name: "Taxa de perda",
      formula: "Perdidos / Contatados",
      text: "Uma taxa alta pode indicar problema na abordagem ou no perfil dos leads.",
      value: funnel.perdidos.rate,
    },
  ];

  return (
    <Card title="Funil de conversão">
      <div className="overflow-x-auto">
        <div className="grid min-w-[560px] grid-cols-5 gap-2">
          {steps.map((step, i) => {
            const hCur = heights[i];
            const hPrev = i === 0 ? hCur : heights[i - 1];
            return (
              <div key={step.key}>
                <div className="relative" style={{ height: CHART_HEIGHT }}>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: step.color,
                      opacity: 0.85,
                      clipPath: `polygon(0 ${100 - hPrev}%, 100% ${100 - hCur}%, 100% 100%, 0 100%)`,
                    }}
                  />
                  <span
                    className="absolute inset-x-0 text-center text-3xl font-bold text-white drop-shadow"
                    style={{ bottom: `${Math.max(hCur / 2 - 6, 4)}%` }}
                  >
                    {step.count}
                  </span>
                </div>
                <div className="mt-3 text-center">
                  <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: step.color }} />
                    {step.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {i === 0 ? "base completa" : `${step.rate}${step.rateLabel}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6 border-t border-slate-200 pt-6 dark:border-navy-800 lg:grid-cols-[1fr_auto]">
        <ul className="space-y-2.5 text-sm">
          {kpis.map((kpi) => (
            <li key={kpi.name} className="text-slate-500 dark:text-slate-400">
              <span className="font-semibold" style={{ color: kpi.color }}>
                {kpi.name}
              </span>{" "}
              ({kpi.formula}) · <span className="font-semibold text-slate-900 dark:text-white">{kpi.value}%</span> · {kpi.text}
            </li>
          ))}
        </ul>
        <StatusDonut leads={leads} />
      </div>
    </Card>
  );
}
