import { TIPO_SEGURO_LABELS, type Lead } from "./types";

// Link que abre a conversa do WhatsApp direto com o número do lead.
// Formato: https://wa.me/<país><DDD><número>?text=<mensagem>
export function whatsappUrl(lead: Pick<Lead, "celular" | "nome" | "tipoSeguro" | "tipoPessoa">): string {
  const digits = lead.celular.replace(/\D/g, "");
  const phone = digits.startsWith("55") && digits.length >= 12 ? digits : `55${digits}`;

  const tipo = (TIPO_SEGURO_LABELS[lead.tipoSeguro] ?? lead.tipoSeguro).toLowerCase();
  const text =
    lead.tipoPessoa === "PJ"
      ? `Olá! Aqui é da Dynamus Capital. Recebemos a solicitação de cotação de seguro ${tipo} da ${lead.nome} e vamos ajudar.`
      : `Olá, ${lead.nome.trim().split(/\s+/)[0]}! Aqui é da Dynamus Capital. Recebemos sua solicitação de cotação de seguro ${tipo} e vamos te ajudar.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
