"use client";

import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { api } from "@/lib/api";
import { maskMoeda, maskPlaca } from "@/lib/masks";
import {
  TIPO_SEGURO_GRUPO_LABELS,
  TIPO_SEGURO_OPTIONS,
  tipoSeguroGrupo,
  type TipoSeguro,
  type TipoSeguroGrupo,
  type WizardData,
} from "@/lib/types";

interface Props {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
}

const GRUPOS: TipoSeguroGrupo[] = ["veiculo", "vida", "outros"];

export function StepTipoSeguro({ data, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const grupo = tipoSeguroGrupo(data.tipoSeguro);

  async function handlePlacaBlur() {
    if (!data.placa || data.placa.length < 7) return;
    setLoading(true);
    try {
      const result = await api.lookupPlaca(data.placa);
      onChange({
        modeloVeiculo: result.modelo || data.modeloVeiculo,
        anoVeiculo: result.ano || data.anoVeiculo,
      });
    } catch {
      // busca falhou — usuário preenche manualmente
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Select
        label="Tipo de seguro"
        name="tipoSeguro"
        value={data.tipoSeguro}
        onChange={(e) => onChange({ tipoSeguro: e.target.value as TipoSeguro })}
      >
        <option value="" disabled>
          Selecione o tipo de seguro
        </option>
        {GRUPOS.map((g) => (
          <optgroup key={g} label={TIPO_SEGURO_GRUPO_LABELS[g]}>
            {TIPO_SEGURO_OPTIONS.filter((o) => o.grupo === g).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>

      {grupo === "veiculo" && (
        <div className="grid gap-x-6 gap-y-5 grid-cols-2 sm:grid-cols-3">
          <Field
            label="Placa do veículo"
            name="placa"
            placeholder="ABC1D23"
            value={maskPlaca(data.placa)}
            onChange={(e) => onChange({ placa: e.target.value })}
            onBlur={handlePlacaBlur}
            hint={loading ? "Buscando dados do veículo..." : undefined}
          />
          <Field
            label="Modelo"
            name="modeloVeiculo"
            placeholder="Modelo do veículo"
            value={data.modeloVeiculo}
            onChange={(e) => onChange({ modeloVeiculo: e.target.value })}
            wrapperClassName="order-3 col-span-2 sm:order-none sm:col-span-1"
          />
          <Field
            label="Ano"
            name="anoVeiculo"
            placeholder="Ano do veículo"
            value={data.anoVeiculo}
            onChange={(e) => onChange({ anoVeiculo: e.target.value })}
            wrapperClassName="order-2 sm:order-none"
          />
        </div>
      )}

      {(data.tipoSeguro === "VIDA" || data.tipoSeguro === "RESIDENCIAL") && (
        <Field
          label="Valor de cobertura"
          name="valorCobertura"
          placeholder="R$ 0,00"
          value={data.valorCobertura}
          onChange={(e) => onChange({ valorCobertura: maskMoeda(e.target.value) })}
          inputMode="numeric"
        />
      )}

      {data.tipoSeguro === "VIDA_EMPRESARIAL" && (
        <Field
          label="Número de vidas na empresa"
          name="numeroDependentes"
          type="number"
          min={0}
          placeholder="0"
          value={data.numeroDependentes}
          onChange={(e) => onChange({ numeroDependentes: e.target.value })}
        />
      )}

      {data.tipoSeguro === "RC_PROFISSIONAL" && (
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field
            label="Qual a sua profissão?"
            name="profissao"
            placeholder="Ex.: médico, advogado, engenheiro"
            value={data.profissao}
            onChange={(e) => onChange({ profissao: e.target.value })}
          />
          <Field
            label="Valor de risco (opcional)"
            name="valorRisco"
            placeholder="R$ 0,00"
            value={data.valorRisco}
            onChange={(e) => onChange({ valorRisco: maskMoeda(e.target.value) })}
            inputMode="numeric"
          />
        </div>
      )}

      {data.tipoSeguro === "EVENTOS" && (
        <Textarea
          label="Conte mais sobre o evento (opcional)"
          name="observacoes"
          placeholder="Ex.: tipo de evento, data, local e número de convidados"
          value={data.observacoes}
          onChange={(e) => onChange({ observacoes: e.target.value })}
        />
      )}

      {(data.tipoSeguro === "EMPRESARIAL" || data.tipoSeguro === "RESPONSABILIDADE_CIVIL") && (
        <Textarea
          label="Conte um pouco mais sobre o que você precisa (opcional)"
          name="observacoes"
          placeholder="Ex.: atividade da empresa, bens a proteger..."
          value={data.observacoes}
          onChange={(e) => onChange({ observacoes: e.target.value })}
        />
      )}
    </div>
  );
}
