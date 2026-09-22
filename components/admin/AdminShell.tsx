"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { getToken, USE_MOCK } from "@/lib/api";
import { Logo } from "@/components/ui/Logo";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDashboard,
  IconLogout,
  IconMenu,
  IconMoon,
  IconSun,
  IconUsers,
} from "@/components/ui/icons";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: IconDashboard },
  { href: "/admin/leads", label: "Leads", Icon: IconUsers },
];

const THEME_KEY = "dynamus_admin_theme";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("Administrador");

  useEffect(() => {
    if (!USE_MOCK && !getToken()) {
      router.replace("/admin/login");
      return;
    }
    try {
      setDark(window.localStorage.getItem(THEME_KEY) === "dark");
      setUserName(window.localStorage.getItem("dynamus_admin_nome") || "Administrador");
    } catch {
      // localStorage indisponível: segue com os padrões
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    try {
      window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // ignora
    }
  }

  function handleLogout() {
    window.localStorage.removeItem("dynamus_admin_token");
    window.localStorage.removeItem("dynamus_admin_nome");
    router.replace("/admin/login");
  }

  if (!ready) return null;

  const showLabels = !collapsed || mobileOpen;

  return (
    <div className={clsx(dark && "dark")}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-navy-950 dark:text-slate-100">
        {/* Topbar mobile */}
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 dark:border-navy-800 dark:bg-navy-900 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800"
          >
            <IconMenu className="h-6 w-6" />
          </button>
          <Logo href="/admin/dashboard" variant={dark ? "light" : "dark"} />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden />
        )}

        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-200 dark:border-navy-800 dark:bg-navy-900",
            collapsed ? "lg:w-[76px]" : "lg:w-64",
            "w-64",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className={clsx("flex items-center px-4 py-5", showLabels ? "justify-between" : "justify-center")}>
            {showLabels ? (
              <Logo href="/admin/dashboard" variant={dark ? "light" : "dark"} />
            ) : (
              <Link href="/admin/dashboard" aria-label="Dynamus Capital">
                <Image src="/logoSF.png" alt="Dynamus Capital" width={32} height={32} />
              </Link>
            )}
            {showLabels && (
              <button
                type="button"
                aria-label="Recolher menu"
                onClick={() => setCollapsed(true)}
                className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-navy-800 dark:hover:text-slate-200 lg:block"
              >
                <IconChevronLeft className="h-5 w-5" />
              </button>
            )}
          </div>

          {!showLabels && (
            <button
              type="button"
              aria-label="Expandir menu"
              onClick={() => setCollapsed(false)}
              className="mx-auto mb-2 hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-navy-800 dark:hover:text-slate-200 lg:block"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          )}

          <nav className="flex-1 space-y-1 px-3 py-2">
            {NAV.map(({ href, label, Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  title={label}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    !showLabels && "justify-center",
                    active
                      ? "bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {showLabels && label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-1 border-t border-slate-200 px-3 py-4 dark:border-navy-800">
            <button
              type="button"
              onClick={toggleTheme}
              title={dark ? "Tema claro" : "Tema escuro"}
              className={clsx(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800",
                !showLabels && "justify-center"
              )}
            >
              {dark ? <IconSun className="h-5 w-5 shrink-0" /> : <IconMoon className="h-5 w-5 shrink-0" />}
              {showLabels && (dark ? "Tema claro" : "Tema escuro")}
            </button>

            {!USE_MOCK && (
              <button
                type="button"
                onClick={handleLogout}
                title="Sair"
                className={clsx(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800",
                  !showLabels && "justify-center"
                )}
              >
                <IconLogout className="h-5 w-5 shrink-0" />
                {showLabels && "Sair"}
              </button>
            )}

            <div className={clsx("flex items-center gap-3 px-3 pt-3", !showLabels && "justify-center")}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-gold-300 dark:bg-gold-400 dark:text-navy-950">
                {userName.charAt(0).toUpperCase()}
              </div>
              {showLabels && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{userName}</p>
                  {USE_MOCK && <p className="text-xs text-amber-600 dark:text-amber-400">Modo demonstração</p>}
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className={clsx("transition-all duration-200", collapsed ? "lg:pl-[76px]" : "lg:pl-64")}>
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
