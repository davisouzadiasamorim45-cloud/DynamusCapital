import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dynamuscapital.com.br";

const title = "Dynamus Capital | Corretora de Seguros em Marília, SP";
const description =
  "Corretora de seguros independente em Marília, SP. Cotação de seguro de vida, veicular, empresarial, residencial e mais, comparando as melhores condições entre seguradoras parceiras, sem custo para você.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Dynamus Capital",
  },
  description,
  keywords: [
    "seguros Marília",
    "corretora de seguros SP",
    "seguro de vida Marília",
    "seguro veicular Marília",
    "seguro empresarial SP",
    "seguro residencial",
    "cotação de seguro online",
    "corretora de seguros independente",
  ],
  authors: [{ name: "Dynamus Capital" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Dynamus Capital",
    title,
    description,
    images: [
      {
        url: "/hero-family.jpg",
        width: 1200,
        height: 630,
        alt: "Dynamus Capital — corretora de seguros em Marília, SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero-family.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Dynamus Capital",
  description,
  url: siteUrl,
  image: `${siteUrl}/hero-family.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida das Esmeraldas, 820, sala 407, Centro Empresarial Villas Boas",
    addressLocality: "Marília",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "State",
    name: "São Paulo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body className="antialiased font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
