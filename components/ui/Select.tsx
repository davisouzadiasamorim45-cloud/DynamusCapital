import { SelectHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  wrapperClassName?: string;
}

// Mesmo visual do Field (linha embaixo), com seta própria no lugar da nativa.
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, className, wrapperClassName, id, children, ...props }, ref) => {
    const fieldId = id ?? props.name;
    return (
      <div className={clsx("flex flex-col gap-1.5", wrapperClassName)}>
        <label htmlFor={fieldId} className="text-sm text-slate-400">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            className={clsx(
              "w-full cursor-pointer appearance-none border-0 border-b border-slate-200 bg-transparent py-2 pr-8 text-xl text-slate-900 outline-none transition focus:border-navy-800",
              !props.value && "text-slate-300",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";
