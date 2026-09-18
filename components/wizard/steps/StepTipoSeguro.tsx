"use client";

import { useState } from "react";
import clsx from "clsx";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import { api } from "@/lib/api";
import { maskPlaca } from "@/lib/masks";
import { TIPO_SEGURO_OPTIONS, tipoSeguroGrupo, type WizardData } from "@/lib/types";

interface Props {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
}

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
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {TIPO_SEGURO_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange({ tipoSeguro: opt.value })}
            className={clsx(
              "rounded-full border px-4 py-1.5 text-sm sm:py-2 font-medium transition",
              data.tipoSeguro === opt.value
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-slate-200 text-slate-600 hover:border-slate-400"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

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

      {grupo === "carga" && (
        <Field
          label="Valor estimado da carga"
          name="valorCarga"
          placeholder="R$ 0,00"
          value={data.valorCarga}
          onChange={(e) => onChange({ valorCarga: e.target.value })}
        />
      )}

      {grupo === "vida" && (
        <Field
          label={data.tipoSeguro === "VIDA_EMPRESARIAL" ? "Número de vidas na empresa" : "Número de dependentes"}
          name="numeroDependentes"
          type="number"
          min={0}
          placeholder="0"
          value={data.numeroDependentes}
          onChange={(e) => onChange({ numeroDependentes: e.target.value })}
        />
      )}

      {grupo === "outros" && (
        <Textarea
          label="Conte um pouco mais sobre o que você precisa (opcional)"
          name="observacoes"
          placeholder="Ex.: tamanho do imóvel, tipo de evento, atividade da empresa..."
          value={data.observacoes}
          onChange={(e) => onChange({ observacoes: e.target.value })}
        />
      )}
    </div>
  );
}
