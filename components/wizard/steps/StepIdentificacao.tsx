"use client";

import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { api } from "@/lib/api";
import { isValidCpf } from "@/lib/validators";
import { maskCpf } from "@/lib/masks";
import type { WizardData } from "@/lib/types";

interface Props {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
}

export function StepIdentificacao({ data, onChange }: Props) {
  const [cpfError, setCpfError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCpfBlur() {
    if (!data.cpf) return;
    if (!isValidCpf(data.cpf)) {
      setCpfError("CPF inválido");
      return;
    }
    setCpfError("");
    setLoading(true);
    try {
      const result = await api.lookupCpf(data.cpf);
      onChange({
        nome: result.nome || data.nome,
        dataNascimento: result.data_nascimento || data.dataNascimento,
      });
    } catch {
      // busca falhou — usuário preenche manualmente
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field
        label="CPF"
        name="cpf"
        placeholder="000.000.000-00"
        value={maskCpf(data.cpf)}
        onChange={(e) => onChange({ cpf: e.target.value })}
        onBlur={handleCpfBlur}
        error={cpfError}
        hint={loading ? "Buscando seus dados..." : "Usamos seu CPF para agilizar o preenchimento"}
        inputMode="numeric"
      />
      <Field
        label="Data de nascimento"
        name="dataNascimento"
        type="date"
        value={data.dataNascimento}
        onChange={(e) => onChange({ dataNascimento: e.target.value })}
      />
      <Field
        label="Nome completo"
        name="nome"
        placeholder="Seu nome completo"
        value={data.nome}
        onChange={(e) => onChange({ nome: e.target.value })}
        wrapperClassName="sm:col-span-2"
      />
    </div>
  );
}
