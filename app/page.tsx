import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BenefitsCarousel } from "@/components/site/BenefitsCarousel";
import { PartnerLogos } from "@/components/site/PartnerLogos";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
import { TIPO_SEGURO_OPTIONS, type TipoSeguro } from "@/lib/types";
import { IconChat, IconClock, IconCoin, IconLock } from "@/components/ui/icons";

const BENEFITS = [
  {
    title: "Cotação rápida",
    desc: "CPF, CEP e placa preenchidos automaticamente. Leva poucos minutos e não pede nenhum documento.",
    icon: <IconClock className="h-5 w-5" />,
  },
  {
    title: "Dados protegidos",
    desc: "Seus dados são usados só para gerar sua cotação, seguindo a LGPD do início ao fim do processo.",
    icon: <IconLock className="h-5 w-5" />,
  },
  {
    title: "Atendimento humano",
    desc: "Depois do formulário, um especialista entra em contato para fechar os detalhes com você.",
    icon: <IconChat className="h-5 w-5" />,
  },
  {
    title: "Sem custo para você",
    desc: "A cotação e a consultoria são gratuitas. Você paga só a apólice, direto com a seguradora escolhida.",
    icon: <IconCoin className="h-5 w-5" />,
  },
];

const SEGUROS_DESTAQUE: { tipo: TipoSeguro; desc: string; image: string }[] = [
  {
    tipo: "VIDA",
    desc: "Proteção financeira para sua família em caso de imprevistos, do seu jeito e do seu tamanho.",
    image: "/seguro-vida.jpg",
  },
  {
    tipo: "VEICULAR",
    desc: "Cobertura completa para o seu carro, com assistência 24h e reposição em caso de perda total.",
    image: "/seguro-veicular.jpg",
  },
  {
    tipo: "EMPRESARIAL",
    desc: "Proteção para o patrimônio, os equipamentos e a operação do seu negócio.",
    image: "/seguro-empresarial.jpg",
  },
  {
    tipo: "RESIDENCIAL",
    desc: "Sua casa protegida contra incêndio, roubo, danos elétricos e muito mais.",
    image: "/seguro-residencial.jpg",
  },
  {
    tipo: "RC_PROFISSIONAL",
    desc: "Cobertura para erros ou danos causados a terceiros no exercício da sua profissão.",
    image: "/seguro-rc-profissional.jpg",
  },
];

function formatList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

const COMO_FUNCIONA = [
  {
    n: "01",
    title: "Preencha o formulário",
    desc: "Leva poucos minutos, com preenchimento automático para agilizar o processo de coleta de dados.",
  },
  {
    n: "02",
    title: "Nossa equipe analisa",
    desc: "Cruzamos seu perfil com as seguradoras parceiras para achar a condição que melhor atende às suas necessidades.",
  },
  {
    n: "03",
    title: "Você recebe a cotação",
    desc: "Entramos em contato por telefone ou e-mail com a proposta pronta para lhe apresentar.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="relative isolate overflow-hidden">
        <ParallaxBackground
          src="/hero-family.jpg"
          alt="Família caminhando tranquila na praia"
          objectPosition="44% 35%"
          strength={0.12}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-navy-950/35 to-navy-950/55" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-navy-950 sm:h-72" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center sm:py-40">
          <h1
            className="text-5xl font-light leading-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-6xl"
          >
            Proteção de verdade para <span className="font-bold text-gold-300">quem você ama.</span>
          </h1>
          <p className="mt-5 text-lg text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
            Vida, veicular e muito mais. Cote em poucos minutos.
          </p>
          <Link
            href="/cotacao"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-black/10 backdrop-blur-md transition hover:border-white/50 hover:bg-white/20"
          >
            Solicitar cotação gratuita
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="bg-navy-950 px-6 py-16 text-white sm:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-light leading-relaxed text-navy-100 sm:text-3xl">
            <span className="font-semibold text-white">Somos uma corretora independente sediada em Marília, SP</span>{" "}
            que trabalha para você, não para uma seguradora: comparamos as condições entre diversas seguradoras
            parceiras para encontrar a cobertura certa pelo preço certo, sem enrolação e sem custo extra para você.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-slate-900 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Receba sua cotação gratuita em 3 passos</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {COMO_FUNCIONA.map((step) => (
              <div key={step.n}>
                <span className="text-sm font-semibold tabular-nums text-gold-600">{step.n}</span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-16 text-slate-900 sm:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-600">Seguradoras parceiras</h2>
          <div className="mt-12">
            <PartnerLogos />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 text-slate-900 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mt-2 text-center text-3xl font-bold sm:text-4xl">Cotação Rápida e Gratuita</h2>
          <BenefitsCarousel items={BENEFITS} />
        </div>
      </section>

      <section className="relative isolate flex items-center overflow-hidden py-28 sm:py-36">
        <ParallaxBackground
          src="/cta-carro.jpg"
          alt="Carro estacionado com a porta aberta, cliente ao lado"
          objectPosition="50% 55%"
          strength={0.12}
        />
        <div className="absolute inset-0 bg-navy-950/70" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center text-white sm:px-12">
          <h2 className="text-3xl font-semibold leading-snug drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-4xl">
            Imprevistos acontecem, mas você não precisa <span className="text-gold-300">lidar com isso sozinho.</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
            Da cotação ao sinistro, você fala com gente de verdade: sem robô, sem espera, sem letra miúda.
          </p>
          <Link
            href="/cotacao"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-black/10 backdrop-blur-md transition hover:border-white/50 hover:bg-white/20"
          >
            Solicitar cotação gratuita
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-slate-900 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Cobertura para cada momento</h2>
          <p className="mt-3 max-w-2xl text-slate-500 text-sm">
            Os seguros que mais procurados por nossos clientes, com cotação rápida e atendimento humano. 
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {SEGUROS_DESTAQUE.map((item) => {
              const opt = TIPO_SEGURO_OPTIONS.find((o) => o.value === item.tipo)!;
              return (
                <Link
                  key={item.tipo}
                  href={`/cotacao?tipo=${item.tipo}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 transition hover:border-navy-200 hover:shadow-md"
                >
                  <div className="relative h-40 w-full overflow-hidden sm:h-44">
                    <Image
                      src={item.image}
                      alt={opt.label}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-3">
                    <h3 className="text-base font-semibold">{opt.label}</h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">{item.desc}</p>
                    <span className="mt-4 text-sm font-medium text-navy-700 transition group-hover:text-navy-900 bg-navy-50 rounded-full px-3 py-1 w-fit">
                      Cotar agora
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-5 text-xs text-slate-300">
            Também cotamos{" "}
            {formatList(
              TIPO_SEGURO_OPTIONS.filter((o) => !SEGUROS_DESTAQUE.some((d) => d.tipo === o.value)).map(
                (o) => o.label
              )
            )}
            . Escolha o seu tipo de seguro direto no formulário.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
