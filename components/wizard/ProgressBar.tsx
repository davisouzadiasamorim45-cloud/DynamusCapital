import clsx from "clsx";

export function ProgressBar({ current, total = 4 }: { current: number; total?: number }) {
  return (
    <div
      className="flex items-center gap-4"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`Etapa ${current + 1} de ${total}`}
    >
      <span className="text-xs font-medium tabular-nums text-slate-400">0{current + 1}</span>
      <div className="flex flex-1 gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={clsx(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i <= current ? "bg-gold-500" : "bg-slate-200"
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium tabular-nums text-slate-400">0{total}</span>
    </div>
  );
}
