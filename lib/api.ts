import type { Lead, LeadPayload } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.detail ?? "Erro na requisição", res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("dynamus_admin_token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  lookupCep: (cep: string) =>
    request<{ cep: string; rua: string; bairro: string; cidade: string; uf: string }>(`/lookup/cep/${cep}`),
  lookupPlaca: (placa: string) =>
    request<{ placa: string; modelo: string; ano: string; aviso?: string }>(`/lookup/placa/${placa}`),
  lookupCpf: (cpf: string) =>
    request<{ cpf: string; nome: string; data_nascimento: string; aviso?: string }>(`/lookup/cpf/${cpf}`),
  createLead: (payload: LeadPayload) =>
    request<Lead>("/leads", { method: "POST", body: JSON.stringify(payload) }),
  adminLogin: (email: string, senha: string) =>
    request<{ access_token: string; nome: string; email: string }>("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    }),
  listLeads: (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    return request<Lead[]>(`/admin/leads${query ? `?${query}` : ""}`, { headers: authHeaders() });
  },
  updateLeadStatus: (id: string, status: string) =>
    request<Lead>(`/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: authHeaders(),
    }),
};
