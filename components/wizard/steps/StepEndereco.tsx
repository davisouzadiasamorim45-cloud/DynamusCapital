"use client";

import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { api } from "@/lib/api";
import { isValidCep } from "@/lib/validators";
import { maskCep, maskUf } from "@/lib/masks";
import type { WizardData } from "@/lib/types";

interface Props {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
}

export function StepEndereco({ data, onChange }: Props) {
  const [cepError, setCepError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCepBlur() {
    if (!data.cep) return;
    if (!isValidCep(data.cep)) {
      setCepError("CEP inválido");
      return;
    }
    setCepError("");
    setLoading(true);
    try {
      const result = await api.lookupCep(data.cep);
      onChange({
        rua: result.rua || data.rua,
        bairro: result.bairro || data.bairro,
        cidade: result.cidade || data.cidade,
        uf: result.uf || data.uf,
      });
    } catch {
      setCepError("CEP não encontrado, preencha manualmente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-6">
      <Field
        label="CEP"
        name="cep"
        placeholder="00000-000"
        value={maskCep(data.cep)}
        onChange={(e) => onChange({ cep: e.target.value })}
        onBlur={handleCepBlur}
        error={cepError}
        hint={loading ? "Buscando endereço..." : undefined}
        inputMode="numeric"
        autoComplete="postal-code"
        wrapperClassName="sm:col-span-2"
      />
      <Field
        label="Rua"
        name="rua"
        autoComplete="address-line1"
        value={data.rua}
        onChange={(e) => onChange({ rua: e.target.value })}
        wrapperClassName="sm:col-span-4"
      />
      <Field
        label="Número"
        name="numero"
        value={data.numero}
        onChange={(e) => onChange({ numero: e.target.value })}
        wrapperClassName="sm:col-span-2"
      />
      <Field
        label="Complemento (opcional)"
        name="complemento"
        value={data.complemento}
        onChange={(e) => onChange({ complemento: e.target.value })}
        wrapperClassName="sm:col-span-2"
      />
      <Field
        label="Bairro"
        name="bairro"
        value={data.bairro}
        onChange={(e) => onChange({ bairro: e.target.value })}
        wrapperClassName="sm:col-span-2"
      />
      <Field
        label="Cidade"
        name="cidade"
        autoComplete="address-level2"
        value={data.cidade}
        onChange={(e) => onChange({ cidade: e.target.value })}
        wrapperClassName="sm:col-span-4"
      />
      <Field
        label="Estado (UF)"
        name="uf"
        placeholder="SP"
        // Desligado: o navegador preencheria o nome do estado ("São Paulo") e o maskUf o estragaria.
        autoComplete="off"
        value={data.uf}
        onChange={(e) => onChange({ uf: maskUf(e.target.value) })}
        wrapperClassName="sm:col-span-2"
      />
    </div>
  );
}
