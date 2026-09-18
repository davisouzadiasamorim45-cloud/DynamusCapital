import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" && "bg-navy-900 text-white hover:bg-navy-800",
        variant === "secondary" && "border border-navy-200 bg-white text-navy-700 hover:bg-navy-50",
        variant === "ghost" && "text-slate-600 hover:text-slate-900",
        className
      )}
      {...props}
    />
  );
}
