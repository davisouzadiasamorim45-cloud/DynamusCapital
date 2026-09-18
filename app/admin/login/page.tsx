"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { api, ApiError } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await api.adminLogin(email, senha);
      window.localStorage.setItem("dynamus_admin_token", result.access_token);
      window.localStorage.setItem("dynamus_admin_nome", result.nome);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <Logo className="mb-6" />
        <h1 className="text-xl font-bold text-slate-900">Painel administrativo</h1>
        <p className="mt-1 text-sm text-slate-500">Entre com suas credenciais.</p>

        <div className="mt-6 flex flex-col gap-4">
          <Field label="E-mail" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Field label="Senha" type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
