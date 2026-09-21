import { onlyDigits } from "./validators";

export function maskCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCep(value: string): string {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.replace(/(\d{5})(\d)/, "$1-$2");
}

export function maskCelular(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "");
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "");
}

export function maskPlaca(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
}

export function maskCnpj(value: string): string {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export function maskDocumento(tipo: "PF" | "PJ", value: string): string {
  return tipo === "PJ" ? maskCnpj(value) : maskCpf(value);
}

// Formata um documento vindo da API (só dígitos) deduzindo CPF ou CNPJ pelo tamanho.
export function formatDocumento(value: string): string {
  return onlyDigits(value).length > 11 ? maskCnpj(value) : maskCpf(value);
}

// Máscara de moeda: os dígitos preenchem da direita para a esquerda (centavos).
export function maskMoeda(value: string): string {
  const digits = onlyDigits(value).slice(0, 12);
  if (!digits) return "";
  const reais = (Number(digits) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `R$ ${reais}`;
}

export function maskUf(value: string): string {
  return value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
}
