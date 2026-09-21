import type { Lead, LeadPayload, StatusLead, TipoSeguro } from "./types";

// Dados fictícios para desenvolver o painel admin sem backend/banco.
// Ativado com NEXT_PUBLIC_USE_MOCK=true (ver lib/api.ts).

const DAY = 24 * 60 * 60 * 1000;

function daysAgo(n: number): string {
  return new Date(Date.now() - n * DAY).toISOString();
}

type Seed = Pick<Lead, "nome" | "documento" | "tipoSeguro" | "status" | "bairro" | "email" | "celular"> &
  Partial<Lead> & { criadoHa: number; atualizadoHa?: number };

const seeds: Seed[] = [
  {
    nome: "Ana Paula Ferreira",
    documento: "123.456.789-09",
    tipoSeguro: "VEICULAR",
    status: "NOVO",
    bairro: "Centro",
    email: "ana.ferreira@email.com",
    celular: "(14) 91234-5678",
    modeloVeiculo: "Honda Civic",
    placa: "ABC1D23",
    anoVeiculo: "2021",
    criadoHa: 0,
  },
  {
    nome: "Carlos Eduardo Lima",
    documento: "987.654.321-00",
    tipoSeguro: "VIDA",
    status: "NOVO",
    bairro: "Jardim Paulista",
    email: "carlos.lima@email.com",
    celular: "(14) 99876-5432",
    valorCobertura: "R$ 500.000,00",
    criadoHa: 1,
  },
  {
    nome: "Mariana Souza",
    documento: "111.222.333-96",
    tipoSeguro: "MOTO",
    status: "CONTATADO",
    bairro: "Vila Mariana",
    email: "mariana.souza@email.com",
    celular: "(14) 98765-4321",
    modeloVeiculo: "Yamaha MT-03",
    placa: "QWE4R56",
    criadoHa: 2,
    atualizadoHa: 1,
  },
  {
    nome: "Transportes Rota Sul Ltda",
    tipoPessoa: "PJ",
    documento: "12.345.678/0001-95",
    tipoSeguro: "CAMINHAO",
    status: "COTACAO_ENVIADA",
    bairro: "Distrito Industrial",
    cidade: "Bauru",
    email: "contato@rotasul.com.br",
    celular: "(14) 3456-7890",
    modeloVeiculo: "Scania R450",
    placa: "RTS4C21",
    anoVeiculo: "2020",
    criadoHa: 4,
    atualizadoHa: 1,
  },
  {
    nome: "Roberto Almeida",
    documento: "333.444.555-16",
    tipoSeguro: "CAMINHAO",
    status: "CONVERTIDO",
    bairro: "Vila Guilherme",
    email: "roberto.almeida@email.com",
    celular: "(14) 97654-3210",
    modeloVeiculo: "Volvo FH 460",
    placa: "TRK9A87",
    criadoHa: 9,
    atualizadoHa: 2,
  },
  {
    nome: "Juliana Martins",
    documento: "444.555.666-27",
    tipoSeguro: "RESIDENCIAL",
    status: "CONTATADO",
    bairro: "Fragata",
    email: "juliana.martins@email.com",
    celular: "(14) 96543-2109",
    valorCobertura: "R$ 350.000,00",
    criadoHa: 5,
    atualizadoHa: 3,
  },
  {
    nome: "Padaria Pão Quente ME",
    tipoPessoa: "PJ",
    documento: "23.456.789/0001-95",
    tipoSeguro: "EMPRESARIAL",
    status: "PERDIDO",
    bairro: "Cascata",
    email: "financeiro@paoquente.com.br",
    celular: "(14) 95432-1098",
    observacoes: "Cobertura de incêndio e roubo para o estabelecimento.",
    criadoHa: 15,
    atualizadoHa: 8,
  },
  {
    nome: "Agência X Comunicação Ltda",
    tipoPessoa: "PJ",
    documento: "34.567.890/0001-30",
    tipoSeguro: "VIDA_EMPRESARIAL",
    status: "NOVO",
    bairro: "Palmital",
    email: "fernanda.costa@agenciax.com",
    celular: "(14) 94321-0987",
    numeroDependentes: 18,
    criadoHa: 0,
  },
  {
    nome: "Dr. Henrique Barbosa",
    documento: "777.888.999-50",
    tipoSeguro: "RC_PROFISSIONAL",
    status: "COTACAO_ENVIADA",
    bairro: "Somenzari",
    email: "henrique.barbosa@clinica.com",
    celular: "(14) 93210-9876",
    profissao: "Médico ortopedista",
    valorRisco: "R$ 1.000.000,00",
    criadoHa: 6,
    atualizadoHa: 2,
  },
  {
    nome: "Beatriz Nogueira",
    documento: "888.999.000-61",
    tipoSeguro: "EVENTOS",
    status: "CONVERTIDO",
    bairro: "Barbosa",
    cidade: "Garça",
    email: "beatriz.nogueira@email.com",
    celular: "(14) 92109-8765",
    observacoes: "Casamento com 150 convidados, previsto para novembro.",
    criadoHa: 12,
    atualizadoHa: 1,
  },
  {
    nome: "Lucas Pereira",
    documento: "999.000.111-72",
    tipoSeguro: "VEICULAR",
    status: "NOVO",
    bairro: "Alto Cafezal",
    email: "lucas.pereira@email.com",
    celular: "(14) 99123-4567",
    modeloVeiculo: "Toyota Corolla",
    placa: "LPE5F67",
    criadoHa: 3,
  },
  {
    nome: "Camila Rocha",
    documento: "101.202.303-83",
    tipoSeguro: "VIDA",
    status: "CONTATADO",
    bairro: "Fragata",
    email: "camila.rocha@email.com",
    celular: "(14) 99234-5678",
    valorCobertura: "R$ 300.000,00",
    criadoHa: 6,
    atualizadoHa: 5,
  },
  {
    nome: "Marcelo Tavares",
    documento: "202.303.404-94",
    tipoSeguro: "VEICULAR",
    status: "COTACAO_ENVIADA",
    bairro: "Centro",
    cidade: "Tupã",
    email: "marcelo.tavares@email.com",
    celular: "(14) 99345-6789",
    modeloVeiculo: "Jeep Compass",
    placa: "MTV7H89",
    criadoHa: 14,
    atualizadoHa: 10,
  },
  {
    nome: "Patrícia Duarte",
    documento: "303.404.505-05",
    tipoSeguro: "RESIDENCIAL",
    status: "CONVERTIDO",
    bairro: "Palmital",
    email: "patricia.duarte@email.com",
    celular: "(14) 99456-7890",
    valorCobertura: "R$ 450.000,00",
    criadoHa: 18,
    atualizadoHa: 6,
  },
  {
    nome: "Auto Peças Marília Ltda",
    tipoPessoa: "PJ",
    documento: "45.678.901/0001-75",
    tipoSeguro: "EMPRESARIAL",
    status: "CONTATADO",
    bairro: "Cascata",
    email: "compras@autopecasmarilia.com.br",
    celular: "(14) 3402-1234",
    observacoes: "Estoque de aproximadamente R$ 400 mil.",
    criadoHa: 8,
    atualizadoHa: 7,
  },
  {
    nome: "Thiago Mendes",
    documento: "505.606.707-27",
    tipoSeguro: "MOTO",
    status: "PERDIDO",
    bairro: "Barbosa",
    cidade: "Assis",
    email: "thiago.mendes@email.com",
    celular: "(14) 99567-8901",
    modeloVeiculo: "Honda CG 160",
    placa: "TMN2B34",
    criadoHa: 20,
    atualizadoHa: 16,
  },
  {
    nome: "Renata Figueiredo",
    documento: "606.707.808-38",
    tipoSeguro: "VIDA",
    status: "NOVO",
    bairro: "Jardim Maria Izabel",
    email: "renata.figueiredo@email.com",
    celular: "(14) 99678-9012",
    valorCobertura: "R$ 200.000,00",
    criadoHa: 0,
  },
  {
    nome: "Fábio Nascimento",
    documento: "707.808.909-49",
    tipoSeguro: "RESPONSABILIDADE_CIVIL",
    status: "COTACAO_ENVIADA",
    bairro: "Banzato",
    email: "fabio.nascimento@email.com",
    celular: "(14) 99789-0123",
    observacoes: "Empresa de eventos, cobertura para até 500 pessoas.",
    criadoHa: 11,
    atualizadoHa: 9,
  },
  {
    nome: "Débora Campos",
    documento: "808.909.010-50",
    tipoSeguro: "VEICULAR",
    status: "CONVERTIDO",
    bairro: "Autonomistas",
    email: "debora.campos@email.com",
    celular: "(14) 99890-1234",
    modeloVeiculo: "VW T-Cross",
    placa: "DCM8J90",
    criadoHa: 22,
    atualizadoHa: 12,
  },
  {
    nome: "Salvador Logística Ltda",
    tipoPessoa: "PJ",
    documento: "56.789.012/0001-00",
    tipoSeguro: "EMPRESARIAL",
    status: "CONTATADO",
    bairro: "Distrito Industrial",
    email: "igor@salvadorlog.com.br",
    celular: "(14) 3433-5678",
    observacoes: "Galpão de armazenagem com cerca de R$ 800 mil em estoque.",
    criadoHa: 5,
    atualizadoHa: 4,
  },
];

const onlyDigits = (s: string) => s.replace(/\D/g, "");

// Normaliza como o backend: documento, celular e CEP são gravados só com dígitos.
function toLead(seed: Seed, index: number): Lead {
  const { criadoHa, atualizadoHa, ...rest } = seed;
  return {
    tipoPessoa: "PF",
    dataNascimento: "1988-05-14",
    cep: "17500000",
    rua: "Avenida Sampaio Vidal",
    numero: String(100 + index * 37),
    cidade: "Marília",
    uf: "SP",
    origem: "instagram",
    ...rest,
    documento: onlyDigits(rest.documento),
    celular: onlyDigits(rest.celular),
    id: `mock-${index + 1}`,
    createdAt: daysAgo(criadoHa),
    updatedAt: daysAgo(atualizadoHa ?? criadoHa),
  };
}

// Estado em memória: alterações valem enquanto a aba estiver aberta.
let store: Lead[] = seeds.map(toLead);

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function mockListLeads(params: Record<string, string>): Promise<Lead[]> {
  let result = store;

  if (params.status) {
    result = result.filter((l) => l.status === (params.status as StatusLead));
  }
  if (params.tipo_seguro) {
    result = result.filter((l) => l.tipoSeguro === (params.tipo_seguro as TipoSeguro));
  }
  if (params.data_inicio) {
    const inicio = new Date(params.data_inicio).getTime();
    result = result.filter((l) => new Date(l.createdAt).getTime() >= inicio);
  }
  if (params.busca) {
    const termo = params.busca.trim().toLowerCase();
    const digits = onlyDigits(termo);
    result = result.filter(
      (l) => l.nome.toLowerCase().includes(termo) || (digits && onlyDigits(l.documento).includes(digits))
    );
  }

  const sorted = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return delay(sorted);
}

export function mockUpdateLeadStatus(id: string, status: StatusLead): Promise<Lead> {
  const current = store.find((l) => l.id === id);
  if (!current) return Promise.reject(new Error("Lead não encontrado"));

  const updated: Lead = { ...current, status, updatedAt: new Date().toISOString() };
  store = store.map((l) => (l.id === id ? updated : l));
  return delay(updated, 150);
}

// Simula o POST /leads do formulário público: entra no topo da lista com status NOVO.
export function mockCreateLead(payload: LeadPayload): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = {
    ...payload,
    documento: onlyDigits(payload.documento),
    celular: onlyDigits(payload.celular),
    id: `mock-${Date.now()}`,
    status: "NOVO",
    createdAt: now,
    updatedAt: now,
  };
  store = [lead, ...store];
  return delay(lead, 400);
}
