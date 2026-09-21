import { formatDocumento } from "./masks";
import { parseMoeda } from "./validators";

export type TipoSeguro =
  | "VIDA"
  | "VIDA_EMPRESARIAL"
  | "VEICULAR"
  | "MOTO"
  | "CAMINHAO"
  | "EMPRESARIAL"
  | "RESPONSABILIDADE_CIVIL"
  | "RC_PROFISSIONAL"
  | "RESIDENCIAL"
  | "EVENTOS";

export type TipoSeguroGrupo = "veiculo" | "vida" | "outros";

export const TIPO_SEGURO_GRUPO_LABELS: Record<TipoSeguroGrupo, string> = {
  veiculo: "Veículos",
  vida: "Vida",
  outros: "Patrimônio e outros",
};

export interface TipoSeguroOption {
  value: TipoSeguro;
  label: string;
  grupo: TipoSeguroGrupo;
}

export const TIPO_SEGURO_OPTIONS: TipoSeguroOption[] = [
  { value: "VEICULAR", label: "Veicular", grupo: "veiculo" },
  { value: "MOTO", label: "Moto", grupo: "veiculo" },
  { value: "CAMINHAO", label: "Caminhão", grupo: "veiculo" },
  { value: "VIDA", label: "Vida", grupo: "vida" },
  { value: "VIDA_EMPRESARIAL", label: "Vida em Grupo (Empresa)", grupo: "vida" },
  { value: "EMPRESARIAL", label: "Empresarial", grupo: "outros" },
  { value: "RESIDENCIAL", label: "Residencial", grupo: "outros" },
  { value: "RESPONSABILIDADE_CIVIL", label: "Responsabilidade Civil", grupo: "outros" },
  { value: "RC_PROFISSIONAL", label: "RC Profissional", grupo: "outros" },
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

// PF = pessoa física (CPF), PJ = pessoa jurídica (CNPJ)
export type TipoPessoa = "PF" | "PJ";

export interface LeadPayload {
  tipoPessoa: TipoPessoa;
  // CPF ou CNPJ (só dígitos quando vem da API)
  documento: string;
  // Nome completo (PF) ou razão social (PJ)
  nome: string;
  // Data de nascimento (PF) ou de abertura da empresa (PJ)
  dataNascimento: string;
  tipoSeguro: TipoSeguro;
  placa?: string;
  modeloVeiculo?: string;
  anoVeiculo?: string;
  // Vida em Grupo: número de vidas na empresa
  numeroDependentes?: number;
  // Vida e Residencial
  valorCobertura?: string;
  // RC Profissional
  profissao?: string;
  valorRisco?: string;
  // Eventos e demais tipos
  observacoes?: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
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
  switch (lead.tipoSeguro) {
    case "VEICULAR":
    case "MOTO":
    case "CAMINHAO":
      return [lead.modeloVeiculo, lead.placa].filter(Boolean).join(" · ") || "—";
    case "VIDA":
    case "RESIDENCIAL":
      return lead.valorCobertura ? `Cobertura ${lead.valorCobertura}` : "—";
    case "VIDA_EMPRESARIAL":
      return `${lead.numeroDependentes ?? 0} vida(s) na empresa`;
    case "RC_PROFISSIONAL":
      return [lead.profissao, lead.valorRisco && `risco ${lead.valorRisco}`].filter(Boolean).join(" · ") || "—";
    default:
      return lead.observacoes ? lead.observacoes.slice(0, 60) : "—";
  }
}

export function formatDocumentoLead(lead: Pick<Lead, "documento">): string {
  return formatDocumento(lead.documento);
}

export interface WizardData {
  tipoPessoa: TipoPessoa;
  documento: string;
  nome: string;
  dataNascimento: string;
  tipoSeguro: TipoSeguro | "";
  placa: string;
  modeloVeiculo: string;
  anoVeiculo: string;
  numeroDependentes: string;
  valorCobertura: string;
  profissao: string;
  valorRisco: string;
  observacoes: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  email: string;
  celular: string;
  aceitaLgpd: boolean;
}

export const emptyWizardData: WizardData = {
  tipoPessoa: "PF",
  documento: "",
  nome: "",
  dataNascimento: "",
  tipoSeguro: "",
  placa: "",
  modeloVeiculo: "",
  anoVeiculo: "",
  numeroDependentes: "",
  valorCobertura: "",
  profissao: "",
  valorRisco: "",
  observacoes: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  email: "",
  celular: "",
  aceitaLgpd: false,
};

// Campos específicos de cada tipo de seguro que são obrigatórios para avançar.
export function detalhesSeguroValidos(data: WizardData): boolean {
  switch (data.tipoSeguro) {
    case "":
      return false;
    case "VEICULAR":
    case "MOTO":
    case "CAMINHAO":
      return data.placa.trim().length >= 7;
    case "VIDA":
    case "RESIDENCIAL":
      return parseMoeda(data.valorCobertura) > 0;
    case "VIDA_EMPRESARIAL":
      return data.numeroDependentes.trim().length > 0;
    case "RC_PROFISSIONAL":
      return data.profissao.trim().length > 1;
    default:
      return true;
  }
}
