import { TextareaHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, className, wrapperClassName, id, ...props }, ref) => {
    const fieldId = id ?? props.name;
    return (
      <div className={clsx("flex flex-col gap-1.5", wrapperClassName)}>
        <label htmlFor={fieldId} className="text-sm text-slate-400">
          {label}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={2}
          className={clsx(
            "resize-none border-0 border-b border-slate-200 bg-transparent py-2 text-lg text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-navy-800",
            className
          )}
          {...props}
        />
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
