"use client";

import { Field } from "@/components/ui/Field";
import { maskCelular } from "@/lib/masks";
import type { WizardData } from "@/lib/types";

interface Props {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
}

export function StepContato({ data, onChange }: Props) {
  return (
    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field
        label="E-mail"
        name="email"
        type="email"
        placeholder="voce@email.com"
        autoComplete="email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
      />
      <Field
        label="Celular"
        name="celular"
        placeholder="(00) 00000-0000"
        value={maskCelular(data.celular)}
        onChange={(e) => onChange({ celular: e.target.value })}
        inputMode="tel"
        // tel-national vem sem o +55; com "tel" o maskCelular pegaria o código do país como DDD.
        autoComplete="tel-national"
      />
      <label className="flex items-start gap-3 text-sm text-slate-600 sm:col-span-2">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300"
          checked={data.aceitaLgpd}
          onChange={(e) => onChange({ aceitaLgpd: e.target.checked })}
        />
        <span>
          Autorizo o uso dos meus dados para fins de cotação e contato comercial, conforme a Lei Geral de Proteção de
          Dados (LGPD).
        </span>
      </label>
    </div>
  );
}
