import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-navy-950 px-6 py-10 text-sm text-navy-200 sm:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/logo-branca.png" alt="" width={169} height={240} className="h-9 w-auto" />
            <p className="text-lg font-semibold tracking-tight text-white">Dynamus Capital</p>
          </div>
          <p className="mt-3">Corretora de seguros em Marília, SP</p>
          <p className="mt-3">Avenida das Esmeraldas, 820, sala 407</p>
          <p>Centro Empresarial Villas Boas, Marília, SP</p>
        </div>
        <p className="text-xs text-navy-300">© {new Date().getFullYear()} Dynamus Capital. Todos os direitos reservados.</p>
        <p className="text-xs text-navy-300">Desenvolvido por <a href="https://noxi-virid.vercel.app/" className="font-bold hover:underline">Noxi</a></p>
      </div>
    </footer>
  );
}
