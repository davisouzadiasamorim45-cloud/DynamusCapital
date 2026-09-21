"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { maskCelular } from "@/lib/masks";
import { TIPO_SEGURO_LABELS, type WizardData } from "@/lib/types";

interface Props {
  data: WizardData;
  onReset: () => void;
}

function primeiroNome(nome: string): string {
  const first = nome.trim().split(/\s+/)[0] ?? "";
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

export function ConfirmationScreen({ data, onReset }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isPJ = data.tipoPessoa === "PJ";
  const tipo = data.tipoSeguro ? TIPO_SEGURO_LABELS[data.tipoSeguro] : "";

  // Leva o foco para o título: leitores de tela anunciam o resultado do envio.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const intro = isPJ
    ? "Recebemos os dados da sua empresa e nossa equipe vai preparar uma cotação personalizada."
    : `Obrigado, ${primeiroNome(data.nome)}. Recebemos seus dados e nossa equipe vai preparar sua cotação personalizada.`;

  const steps = [
    { title: "Pedido recebido", text: "Seus dados já estão com a nossa equipe.", done: true },
    {
      title: "Análise da cotação",
      text: tipo ? `Avaliamos o seguro ${tipo.toLowerCase()} e buscamos as melhores opções para você.` : "Avaliamos seu pedido e buscamos as melhores opções para você.",
      done: false,
    },
    { title: "Nosso contato", text: "Falamos com você pelo celular ou e-mail informado.", done: false },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl py-16 sm:py-24">
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-16 w-16 text-gold-600">
        <circle className="draw-circle" cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          className="draw-check"
          d="M20 33.5l8 8 16-18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-8 text-4xl font-semibold tracking-tight text-navy-950 outline-none sm:text-5xl"
      >
        Cotação solicitada
      </h2>
      <p className="mt-3 text-lg text-slate-500">{intro}</p>

      <ol className="fade-up mt-12 flex flex-col">
        {steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
            {i < steps.length - 1 && <span aria-hidden className="absolute left-[13px] top-8 bottom-1 w-px bg-slate-200" />}
            <span
              aria-hidden
              className={clsx(
                "relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                step.done ? "bg-gold-600 text-white" : "border border-slate-300 bg-white text-slate-400"
              )}
            >
              {step.done ? (
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <div>
              <p className={clsx("font-semibold", step.done ? "text-navy-950" : "text-slate-700")}>{step.title}</p>
              <p className="mt-0.5 text-sm text-slate-500">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <dl className="fade-up mt-12 grid gap-x-8 gap-y-5 border-t border-slate-200 pt-6 text-sm sm:grid-cols-2">
        {tipo && (
          <div>
            <dt className="text-slate-400">Seguro solicitado</dt>
            <dd className="mt-1 text-base text-navy-950">{tipo}</dd>
          </div>
        )}
        <div>
          <dt className="text-slate-400">Contato informado</dt>
          <dd className="mt-1 break-words text-base text-navy-950">
            {maskCelular(data.celular)}
            <br />
            {data.email}
          </dd>
        </div>
      </dl>

      <div className="fade-up mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-navy-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          Voltar ao site
        </Link>
        <button type="button" onClick={onReset} className="text-sm text-slate-500 transition hover:text-navy-700">
          Fazer outra cotação
        </button>
      </div>
    </div>
  );
}
