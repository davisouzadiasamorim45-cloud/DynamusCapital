import type { SVGProps } from "react";

function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props} />
  );
}

export function IconHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 20.5s-7.5-4.6-9.5-9.1C1 8 2.5 4.5 6 4.5c2 0 3.5 1.2 4.5 2.7 1-1.5 2.5-2.7 4.5-2.7 3.5 0 5 3.5 3.5 6.9-2 4.5-9.5 9.1-9.5 9.1Z" />
    </Icon>
  );
}

export function IconCar(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 16V11l2-5h12l2 5v5M4 16h16M6 11h12" />
      <circle cx="7" cy="16.5" r="1.5" />
      <circle cx="17" cy="16.5" r="1.5" />
    </Icon>
  );
}

export function IconBriefcase(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </Icon>
  );
}

export function IconHome(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 11.5 12 4l8 7.5M6 10v9h12v-9" />
    </Icon>
  );
}

export function IconShieldCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 5 6v5.5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-2.5Z" />
      <path d="m9.3 12 1.8 1.8 3.6-3.6" />
    </Icon>
  );
}

export function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  );
}

export function IconLock(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="5" y="10.5" width="14" height="9" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </Icon>
  );
}

export function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4v-10Z" />
    </Icon>
  );
}

export function IconCoin(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M9.5 9.75c0-1.1 1.1-2 2.5-2s2.5.9 2.5 2-1.1 1.5-2.5 1.5-2.5.4-2.5 1.5 1.1 2 2.5 2 2.5-.9 2.5-2" />
    </Icon>
  );
}

export function IconChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
    </Icon>
  );
}

export function IconChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
    </Icon>
  );
}
