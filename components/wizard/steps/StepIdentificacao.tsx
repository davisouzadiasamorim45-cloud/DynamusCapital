"use client";

import { useState } from "react";
import clsx from "clsx";
import { Field } from "@/components/ui/Field";
import { api } from "@/lib/api";
import { isValidDocumento } from "@/lib/validators";
import { maskDocumento } from "@/lib/masks";
import type { TipoPessoa, WizardData } from "@/lib/types";

interface Props {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
}

const TIPOS: { value: TipoPessoa; label: string }[] = [
  { value: "PF", label: "Pessoa física" },
  { value: "PJ", label: "Pessoa jurídica" },
];

export function StepIdentificacao({ data, onChange }: Props) {
  const [docError, setDocError] = useState("");
  const [loading, setLoading] = useState(false);
  const isPJ = data.tipoPessoa === "PJ";
  const docLabel = isPJ ? "CNPJ" : "CPF";

  function handleTipoChange(tipo: TipoPessoa) {
    if (tipo === data.tipoPessoa) return;
    // Os dados preenchidos (e os que vieram da busca) pertencem ao documento anterior.
    onChange({ tipoPessoa: tipo, documento: "", nome: "", dataNascimento: "" });
    setDocError("");
  }

  async function handleDocumentoBlur() {
    if (!data.documento) return;
    if (!isValidDocumento(data.tipoPessoa, data.documento)) {
      setDocError(`${docLabel} inválido`);
      return;
    }
    setDocError("");
    setLoading(true);
    try {
      if (isPJ) {
        const result = await api.lookupCnpj(data.documento);
        onChange({
          nome: result.nome || data.nome,
          dataNascimento: result.data_abertura || data.dataNascimento,
        });
      } else {
        const result = await api.lookupCpf(data.documento);
        onChange({
          nome: result.nome || data.nome,
          dataNascimento: result.data_nascimento || data.dataNascimento,
        });
      }
    } catch {
      // busca falhou — usuário preenche manualmente
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        role="group"
        aria-label="Tipo de pessoa"
        className="relative grid w-fit grid-cols-2 rounded-full bg-slate-100 p-1 shadow-[inset_0_2px_5px_rgba(15,23,42,0.14)]"
      >
        {/* Indicador que desliza entre as duas opções (largura = uma coluna, descontado o padding da trilha) */}
        <span
          aria-hidden
          className={clsx(
            "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-navy-900 shadow-md transition-transform duration-300 ease-out motion-reduce:transition-none",
            isPJ && "translate-x-full"
          )}
        />
        {TIPOS.map((tipo) => {
          const active = data.tipoPessoa === tipo.value;
          return (
            <button
              key={tipo.value}
              type="button"
              aria-pressed={active}
              onClick={() => handleTipoChange(tipo.value)}
              className={clsx(
                "relative z-10 rounded-full px-5 py-1.5 text-sm font-medium transition-colors duration-300 sm:px-6 sm:py-2",
                active ? "text-white" : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tipo.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <Field
          label={docLabel}
          name="documento"
          placeholder={isPJ ? "00.000.000/0000-00" : "000.000.000-00"}
          value={maskDocumento(data.tipoPessoa, data.documento)}
          onChange={(e) => onChange({ documento: e.target.value })}
          onBlur={handleDocumentoBlur}
          error={docError}
          // Só o CNPJ tem busca automática; para CPF o preenchimento vem do autocomplete do navegador.
          hint={
            isPJ ? (loading ? "Buscando seus dados..." : `Usamos seu ${docLabel} para agilizar o preenchimento`) : undefined
          }
          inputMode="numeric"
          autoComplete="off"
        />
        <Field
          label={isPJ ? "Data de abertura" : "Data de nascimento"}
          name="dataNascimento"
          type="date"
          value={data.dataNascimento}
          onChange={(e) => onChange({ dataNascimento: e.target.value })}
          autoComplete={isPJ ? "off" : "bday"}
        />
        <Field
          label={isPJ ? "Razão social" : "Nome completo"}
          name="nome"
          placeholder={isPJ ? "Razão social da empresa" : "Seu nome completo"}
          autoComplete={isPJ ? "organization" : "name"}
          value={data.nome}
          onChange={(e) => onChange({ nome: e.target.value })}
          wrapperClassName="sm:col-span-2"
        />
      </div>
    </div>
  );
}
