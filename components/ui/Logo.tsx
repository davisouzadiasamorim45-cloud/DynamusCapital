import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface LogoProps {
  href?: string;
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ href = "/", variant = "dark", className }: LogoProps) {
  return (
    <Link href={href} className={clsx("flex items-center gap-2.5", className)}>
      <Image src="/logoSF.png" alt="Dynamus Capital" width={32} height={32} priority />
      <span className={clsx("text-lg font-semibold tracking-tight", variant === "dark" ? "text-navy-900" : "text-white")}>
        Dynamus Capital
      </span>
    </Link>
  );
}
