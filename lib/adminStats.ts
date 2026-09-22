import { TIPO_SEGURO_LABELS, type Lead, type StatusLead } from "./types";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export const STATUS_ORDER: StatusLead[] = ["NOVO", "CONTATADO", "COTACAO_ENVIADA", "CONVERTIDO", "PERDIDO"];

export const STATUS_COLORS: Record<StatusLead, string> = {
  NOVO: "#64748b",
  CONTATADO: "#3b82f6",
  COTACAO_ENVIADA: "#a855f7",
  CONVERTIDO: "#22c55e",
  PERDIDO: "#ef4444",
};

export function pct(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

export function countByStatus(leads: Lead[]): Record<StatusLead, number> {
  const counts = { NOVO: 0, CONTATADO: 0, COTACAO_ENVIADA: 0, CONVERTIDO: 0, PERDIDO: 0 };
  for (const lead of leads) counts[lead.status]++;
  return counts;
}

export interface FunnelStep {
  key: string;
  label: string;
  count: number;
  color: string;
  rate: number;
  rateLabel: string;
}

// Funil cumulativo: cada etapa conta os leads que chegaram nela ou além.
export function buildFunnel(leads: Lead[]): FunnelStep[] {
  const c = countByStatus(leads);
  const total = leads.length;
  const contatados = total - c.NOVO;
  const cotacoes = c.COTACAO_ENVIADA + c.CONVERTIDO;

  return [
    { key: "total", label: "Total", count: total, color: STATUS_COLORS.NOVO, rate: 100, rateLabel: "de todos os leads" },
    {
      key: "contatados",
      label: "Contatados",
      count: contatados,
      color: STATUS_COLORS.CONTATADO,
      rate: pct(contatados, total),
      rateLabel: "% do total",
    },
    {
      key: "cotacoes",
      label: "Cotação enviada",
      count: cotacoes,
      color: STATUS_COLORS.COTACAO_ENVIADA,
      rate: pct(cotacoes, contatados),
      rateLabel: "% dos contatados",
    },
    {
      key: "convertidos",
      label: "Convertidos",
      count: c.CONVERTIDO,
      color: STATUS_COLORS.CONVERTIDO,
      rate: pct(c.CONVERTIDO, cotacoes),
      rateLabel: "% das cotações",
    },
    {
      key: "perdidos",
      label: "Perdidos",
      count: c.PERDIDO,
      color: STATUS_COLORS.PERDIDO,
      rate: pct(c.PERDIDO, contatados),
      rateLabel: "% dos contatados",
    },
  ];
}

export type Tone = "danger" | "warning" | "info" | "ok";

export interface Recommendation {
  tone: Tone;
  title: string;
  hint: string;
}

function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}

export function buildRecommendations(leads: Lead[], now = Date.now()): Recommendation[] {
  const recs: Recommendation[] = [];
  const c = countByStatus(leads);

  const novosAtrasados = leads.filter((l) => l.status === "NOVO" && now - new Date(l.createdAt).getTime() > DAY).length;
  if (novosAtrasados > 0) {
    recs.push({
      tone: "danger",
      title: `${novosAtrasados} ${plural(novosAtrasados, "lead novo", "leads novos")} há mais de 24h sem contato`,
      hint: "Quanto mais rápido o retorno, maior a chance de fechar.",
    });
  }

  const novosRecentes = c.NOVO - novosAtrasados;
  if (novosRecentes > 0) {
    recs.push({
      tone: "info",
      title: `${novosRecentes} ${plural(novosRecentes, "lead novo chegou", "leads novos chegaram")} nas últimas 24h`,
      hint: "Faça o primeiro contato ainda hoje.",
    });
  }

  const cotacoesParadas = leads.filter(
    (l) => l.status === "COTACAO_ENVIADA" && now - new Date(l.updatedAt).getTime() > 7 * DAY
  ).length;
  if (cotacoesParadas > 0) {
    recs.push({
      tone: "warning",
      title: `${cotacoesParadas} ${plural(cotacoesParadas, "cotação enviada", "cotações enviadas")} há mais de 7 dias sem retorno`,
      hint: "Vale um follow-up antes que o cliente esfrie.",
    });
  }

  const total = leads.length;
  if (total >= 5 && pct(c.CONVERTIDO, total) < 10) {
    recs.push({
      tone: "warning",
      title: "Conversão abaixo de 10%",
      hint: "Revise o tempo de resposta e o acompanhamento das cotações.",
    });
  }

  if (recs.length === 0) {
    recs.push({ tone: "ok", title: "Tudo em dia", hint: "Nenhum lead pendente de ação agora." });
  }

  return recs;
}

export interface TipoCount {
  tipo: string;
  label: string;
  count: number;
}

export function countByTipo(leads: Lead[]): TipoCount[] {
  const map = new Map<string, number>();
  for (const lead of leads) map.set(lead.tipoSeguro, (map.get(lead.tipoSeguro) ?? 0) + 1);
  return [...map.entries()]
    .map(([tipo, count]) => ({
      tipo,
      label: TIPO_SEGURO_LABELS[tipo as keyof typeof TIPO_SEGURO_LABELS] ?? tipo,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}
