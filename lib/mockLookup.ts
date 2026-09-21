// Consultas públicas usadas no modo mock (NEXT_PUBLIC_USE_MOCK=true), quando não há backend.
// Em produção quem consulta é o backend (/lookup/cep e /lookup/cnpj).

export async function mockLookupCep(cep: string) {
  const digits = cep.replace(/\D/g, "");
  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  const data = await res.json();
  if (!res.ok || data.erro) throw new Error("CEP não encontrado");
  return {
    cep: digits,
    rua: data.logradouro ?? "",
    bairro: data.bairro ?? "",
    cidade: data.localidade ?? "",
    uf: data.uf ?? "",
  };
}

export async function mockLookupCnpj(cnpj: string) {
  const digits = cnpj.replace(/\D/g, "");
  const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`);
  if (!res.ok) throw new Error("CNPJ não encontrado");
  const data = await res.json();
  return {
    cnpj: digits,
    nome: data.razao_social ?? "",
    data_abertura: data.data_inicio_atividade ?? "",
  };
}
