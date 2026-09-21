"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "./ProgressBar";
import { StepIdentificacao } from "./steps/StepIdentificacao";
import { StepTipoSeguro } from "./steps/StepTipoSeguro";
import { StepEndereco } from "./steps/StepEndereco";
import { StepContato } from "./steps/StepContato";
import { detalhesSeguroValidos, emptyWizardData, tipoSeguroGrupo, type TipoSeguro, type WizardData } from "@/lib/types";
import { isValidCep, isValidDocumento, isValidEmail, isValidCelular, onlyDigits } from "@/lib/validators";
import { api, ApiError } from "@/lib/api";

// Tipos de seguro que têm o campo livre de observações.
const OBSERVACOES_TIPOS: TipoSeguro[] = ["EVENTOS", "EMPRESARIAL", "RESPONSABILIDADE_CIVIL"];

const STEP_CONTENT = [
  {
    headline: "Vamos começar com você",
    subtext: "Informe seu CPF ou CNPJ para agilizarmos o preenchimento automaticamente.",
  },
  {
    headline: "Qual seguro você procura?",
    subtext: "Selecione o tipo de cobertura e conte um pouco mais para nós.",
  },
  {
    headline: "Endereço:",
    subtext: "Use seu CEP para preenchermos o endereço automaticamente.",
  },
  {
    headline: "Quase lá",
    subtext: "Deixe seu contato para receber sua cotação personalizada.",
  },
];

export function WizardForm({ initialTipo }: { initialTipo?: TipoSeguro } = {}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(() =>
    initialTipo ? { ...emptyWizardData, tipoSeguro: initialTipo } : emptyWizardData
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);

  function patch(update: Partial<WizardData>) {
    setData((prev) => ({ ...prev, ...update }));
  }

  function canContinue(): boolean {
    switch (step) {
      case 0:
        return (
          isValidDocumento(data.tipoPessoa, data.documento) && data.nome.trim().length > 1 && !!data.dataNascimento
        );
      case 1:
        return detalhesSeguroValidos(data);
      case 2:
        return (
          isValidCep(data.cep) &&
          data.rua.trim().length > 1 &&
          data.numero.trim().length > 0 &&
          data.bairro.trim().length > 1 &&
          data.cidade.trim().length > 1 &&
          data.uf.length === 2
        );
      case 3:
        return isValidEmail(data.email) && isValidCelular(data.celular) && data.aceitaLgpd;
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const tipo = data.tipoSeguro as TipoSeguro;
      const isVeiculo = tipoSeguroGrupo(tipo) === "veiculo";
      await api.createLead({
        tipoPessoa: data.tipoPessoa,
        documento: onlyDigits(data.documento),
        nome: data.nome,
        dataNascimento: data.dataNascimento,
        tipoSeguro: tipo,
        placa: isVeiculo ? data.placa : undefined,
        modeloVeiculo: isVeiculo ? data.modeloVeiculo || undefined : undefined,
        anoVeiculo: isVeiculo ? data.anoVeiculo || undefined : undefined,
        numeroDependentes: tipo === "VIDA_EMPRESARIAL" ? Number(data.numeroDependentes) : undefined,
        valorCobertura: tipo === "VIDA" || tipo === "RESIDENCIAL" ? data.valorCobertura : undefined,
        profissao: tipo === "RC_PROFISSIONAL" ? data.profissao.trim() : undefined,
        valorRisco: tipo === "RC_PROFISSIONAL" ? data.valorRisco || undefined : undefined,
        observacoes: OBSERVACOES_TIPOS.includes(tipo) ? data.observacoes || undefined : undefined,
        cep: onlyDigits(data.cep),
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento || undefined,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        email: data.email,
        celular: onlyDigits(data.celular),
        origem: "instagram_campanha",
      });
      setDone(true);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : "Não foi possível enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto w-full max-w-xl py-24">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold-400 text-lg text-gold-600">
          ✓
        </div>
        <h2 className="text-4xl font-semibold tracking-tight text-navy-950">Cotação solicitada</h2>
        <p className="mt-3 text-lg text-slate-500">
          Recebemos seus dados. Nossa equipe vai entrar em contato em breve com sua cotação personalizada.
        </p>
      </div>
    );
  }

  const content = STEP_CONTENT[step];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-9">
      <ProgressBar current={step} />

      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">{content.headline}</h2>
        <p className="mt-2 text-base text-slate-500 sm:text-lg">{content.subtext}</p>
      </div>

      <div>
        {step === 0 && <StepIdentificacao data={data} onChange={patch} />}
        {step === 1 && <StepTipoSeguro data={data} onChange={patch} />}
        {step === 2 && <StepEndereco data={data} onChange={patch} />}
        {step === 3 && <StepContato data={data} onChange={patch} />}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="text-sm text-slate-400 transition hover:text-slate-700"
          >
            Voltar
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue()} className="rounded-full px-8">
            Continuar
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canContinue() || submitting} className="rounded-full px-8">
            {submitting ? "Enviando..." : "Solicitar Cotação"}
          </Button>
        )}
      </div>
    </div>
  );
}
