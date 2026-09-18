"use client";

import Image from "next/image";
import { useParallax } from "@/lib/useParallax";

interface ParallaxBackgroundProps {
  src: string;
  alt: string;
  objectPosition?: string;
  strength?: number;
}

export function ParallaxBackground({ src, alt, objectPosition = "center", strength = 0.15 }: ParallaxBackgroundProps) {
  const { ref, offset } = useParallax(strength);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-x-0 -top-[15%] -bottom-[15%] will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}
