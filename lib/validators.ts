import type { TipoPessoa } from "./types";

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidCpf(value: string): boolean {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digits = cpf.split("").map(Number);

  const calcCheckDigit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += digits[i] * (length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return calcCheckDigit(9) === digits[9] && calcCheckDigit(10) === digits[10];
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidCelular(value: string): boolean {
  return onlyDigits(value).length >= 10;
}

export function isValidCep(value: string): boolean {
  return onlyDigits(value).length === 8;
}

export function isValidCnpj(value: string): boolean {
  const cnpj = onlyDigits(value);
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  const digits = cnpj.split("").map(Number);

  const calcCheckDigit = (length: number) => {
    const weights = length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, weight, i) => acc + digits[i] * weight, 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  return calcCheckDigit(12) === digits[12] && calcCheckDigit(13) === digits[13];
}

export function isValidDocumento(tipo: TipoPessoa, value: string): boolean {
  return tipo === "PJ" ? isValidCnpj(value) : isValidCpf(value);
}

// Valor monetário digitado (ex.: "R$ 500.000,00") → número em reais.
export function parseMoeda(value: string): number {
  const digits = onlyDigits(value);
  return digits ? Number(digits) / 100 : 0;
}
