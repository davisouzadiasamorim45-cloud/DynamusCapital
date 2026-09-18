import Image from "next/image";
import { PARTNERS } from "@/lib/partners";

export function PartnerLogos() {
  return (
    <ul
      aria-label="Seguradoras parceiras"
      className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-9 gap-y-8 text-[9.5px] sm:gap-x-12 sm:gap-y-10 sm:text-[11.5px] lg:text-sm"
    >
      {PARTNERS.map((p) => (
        <li key={p.slug} className="flex items-center justify-center">
          <Image
            src={`/parceiros/${p.slug}.png`}
            alt={p.name}
            width={p.w}
            height={p.h}
            // Já são PNGs pequenos e do tamanho certo (~3x o exibido): dispensa o otimizador do Next.
            unoptimized
            // Largura em em para escalar junto com o font-size do <ul> (menor no mobile).
            style={{ width: `${p.width / 16}em`, height: "auto" }}
          />
        </li>
      ))}
    </ul>
  );
}
