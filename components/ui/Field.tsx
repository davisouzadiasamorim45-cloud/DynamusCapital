import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, hint, className, wrapperClassName, id, ...props }, ref) => {
    const fieldId = id ?? props.name;
    return (
      <div className={clsx("flex flex-col gap-1.5", wrapperClassName)}>
        <label htmlFor={fieldId} className="text-sm text-slate-400">
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          className={clsx(
            "border-0 border-b bg-transparent py-2 text-xl text-slate-900 outline-none transition placeholder:text-slate-300",
            error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-navy-800",
            className
          )}
          {...props}
        />
        {hint && !error && <span className="text-xs text-slate-400">{hint}</span>}
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  }
);
Field.displayName = "Field";
