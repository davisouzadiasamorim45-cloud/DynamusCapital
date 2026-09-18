import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { WizardForm } from "@/components/wizard/WizardForm";
import { TIPO_SEGURO_OPTIONS, type TipoSeguro } from "@/lib/types";

export const metadata: Metadata = {
  title: "Solicitar Cotação de Seguro",
  description:
    "Peça sua cotação de seguro em Marília, SP em poucos minutos: vida, veicular, empresarial, residencial e mais.",
};

interface Props {
  searchParams: Promise<{ tipo?: string }>;
}

export default async function CotacaoPage({ searchParams }: Props) {
  const { tipo } = await searchParams;
  const initialTipo = TIPO_SEGURO_OPTIONS.some((o) => o.value === tipo) ? (tipo as TipoSeguro) : undefined;

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <div className="flex items-center justify-between px-6 py-5 sm:px-12">
        <Logo />
        <Link href="/" className="text-sm text-slate-500 transition hover:text-navy-700">
          Voltar ao site
        </Link>
      </div>
      <div className="flex flex-1 items-center px-6 pb-10 pt-2 sm:px-12">
        <WizardForm initialTipo={initialTipo} />
      </div>
    </main>
  );
}
