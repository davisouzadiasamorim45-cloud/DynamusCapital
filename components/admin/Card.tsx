import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Card({ title, action, className, children }: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900 sm:p-6",
        className
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-base font-bold text-slate-900 dark:text-white">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
