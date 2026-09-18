export type TipoSeguro =
  | "VIDA"
  | "VIDA_EMPRESARIAL"
  | "VEICULAR"
  | "MOTO"
  | "CAMINHAO"
  | "CARGA"
  | "EMPRESARIAL"
  | "RESPONSABILIDADE_CIVIL"
  | "RC_PROFISSIONAL"
  | "RESIDENCIAL"
  | "EVENTOS";

export type TipoSeguroGrupo = "veiculo" | "vida" | "carga" | "outros";

export interface TipoSeguroOption {
  value: TipoSeguro;
  label: string;
  grupo: TipoSeguroGrupo;
}

export const TIPO_SEGURO_OPTIONS: TipoSeguroOption[] = [
  { value: "VIDA", label: "Vida", grupo: "vida" },
  { value: "VEICULAR", label: "Veicular", grupo: "veiculo" },
  { value: "MOTO", label: "Moto", grupo: "veiculo" },
  { value: "CAMINHAO", label: "Caminhão", grupo: "veiculo" },
  { value: "CARGA", label: "Carga", grupo: "carga" },
  { value: "EMPRESARIAL", label: "Empresarial", grupo: "outros" },
  { value: "VIDA_EMPRESARIAL", label: "Vida em Grupo (Empresa)", grupo: "vida" },
  { value: "RESPONSABILIDADE_CIVIL", label: "Responsabilidade Civil", grupo: "outros" },
  { value: "RC_PROFISSIONAL", label: "RC Profissional", grupo: "outros" },
  { value: "RESIDENCIAL", label: "Residencial", grupo: "outros" },
  { value: "EVENTOS", label: "Eventos", grupo: "outros" },
];

export const TIPO_SEGURO_LABELS: Record<TipoSeguro, string> = TIPO_SEGURO_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.value]: opt.label }),
  {} as Record<TipoSeguro, string>
);

export function tipoSeguroGrupo(tipo: TipoSeguro | ""): TipoSeguroGrupo | undefined {
  return TIPO_SEGURO_OPTIONS.find((o) => o.value === tipo)?.grupo;
}

export type StatusLead = "NOVO" | "CONTATADO" | "COTACAO_ENVIADA" | "CONVERTIDO" | "PERDIDO";

export interface LeadPayload {
  cpf: string;
  nome: string;
  dataNascimento: string;
  tipoSeguro: TipoSeguro;
  placa?: string;
  modeloVeiculo?: string;
  anoVeiculo?: string;
  numeroDependentes?: number;
  valorCarga?: string;
  observacoes?: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  email: string;
  celular: string;
  origem?: string;
}

export interface Lead extends LeadPayload {
  id: string;
  status: StatusLead;
  createdAt: string;
  updatedAt: string;
}

export function formatSeguroDetalhe(lead: Lead): string {
  const grupo = tipoSeguroGrupo(lead.tipoSeguro);
  if (grupo === "veiculo") {
    return [lead.modeloVeiculo, lead.placa].filter(Boolean).join(" · ") || "—";
  }
  if (grupo === "carga") {
    return lead.valorCarga || "—";
  }
  if (grupo === "vida") {
    const n = lead.numeroDependentes ?? 0;
    return lead.tipoSeguro === "VIDA_EMPRESARIAL" ? `${n} vida(s) na empresa` : `${n} dependente(s)`;
  }
  return lead.observacoes ? lead.observacoes.slice(0, 60) : "—";
}

export interface WizardData {
  cpf: string;
  nome: string;
  dataNascimento: string;
  tipoSeguro: TipoSeguro | "";
  placa: string;
  modeloVeiculo: string;
  anoVeiculo: string;
  numeroDependentes: string;
  valorCarga: string;
  observacoes: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  email: string;
  celular: string;
  aceitaLgpd: boolean;
}

export const emptyWizardData: WizardData = {
  cpf: "",
  nome: "",
  dataNascimento: "",
  tipoSeguro: "",
  placa: "",
  modeloVeiculo: "",
  anoVeiculo: "",
  numeroDependentes: "",
  valorCarga: "",
  observacoes: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  email: "",
  celular: "",
  aceitaLgpd: false,
};
