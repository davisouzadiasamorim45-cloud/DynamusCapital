"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/icons";

interface CarouselItem {
  title: string;
  desc: string;
  icon: ReactNode;
}

function cyclicDiff(i: number, active: number, n: number) {
  let diff = i - active;
  if (diff > n / 2) diff -= n;
  if (diff < -n / 2) diff += n;
  return diff;
}

export function BenefitsCarousel({ items }: { items: CarouselItem[] }) {
  const [active, setActive] = useState(0);
  const n = items.length;

  function go(delta: number) {
    setActive((a) => (a + delta + n) % n);
  }

  return (
    <div className="mt-10">
      <div className="relative">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-slate-500 transition hover:border-navy-300 hover:text-navy-900"
        >
          <IconChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo"
          className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-slate-500 transition hover:border-navy-300 hover:text-navy-900"
        >
          <IconChevronRight className="h-6 w-6" />
        </button>

        <div className="relative h-[320px] overflow-hidden sm:h-[280px]">
        {items.map((item, i) => {
          const diff = cyclicDiff(i, active, n);
          const isCenter = diff === 0;
          const visible = Math.abs(diff) <= 1;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => !isCenter && setActive(i)}
              tabIndex={visible ? 0 : -1}
              aria-hidden={!visible}
              className={clsx(
                "absolute left-1/2 top-1/2 w-64 rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm transition-all duration-500 ease-out sm:w-72",
                isCenter ? "z-20 cursor-default shadow-lg" : "z-10 cursor-pointer"
              )}
              style={{
                transform: `translate(calc(-50% + ${diff * 320}px), -50%) scale(${isCenter ? 1 : 0.82})`,
                opacity: visible ? (isCenter ? 1 : 0.5) : 0,
                pointerEvents: visible && !isCenter ? "auto" : "none",
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </button>
          );
        })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ir para ${item.title}`}
            className={clsx(
              "h-1.5 rounded-full transition-all",
              i === active ? "w-6 bg-navy-900" : "w-1.5 bg-slate-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
