# Dynamus Capital — Captação de Leads (Seguradora)

Sistema de captação de leads para campanha de Instagram: landing page + formulário em wizard
de 4 etapas + painel admin para a equipe comercial. Spec completa em
[seguradora-captacao-leads-spec.md](seguradora-captacao-leads-spec.md).

## Stack

- **Frontend**: Next.js 15 (App Router) + Tailwind CSS — raiz do repositório
- **Backend**: FastAPI — `backend/`
- **ORM/DB**: Prisma (prisma-client-py) + PostgreSQL
- **Auth admin**: JWT (email/senha)

## Estrutura

```
app/                    # rotas Next.js (landing, /cotacao, /admin/login, /admin/dashboard)
components/wizard/      # etapas do formulário de cotação
components/admin/       # tabela, filtros e cards do painel
lib/                    # tipos, validações (CPF), máscaras e cliente da API
backend/app/            # FastAPI: routers, schemas, auth, config
backend/prisma/         # schema.prisma
```

## Rodando o frontend

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Abre em `http://localhost:3000`. Landing em `/`, formulário em `/cotacao`, painel em `/admin/login`.

## Rodando o backend

Pré-requisitos: Python 3.11+, PostgreSQL rodando localmente (ou uma URL de conexão).

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env           # preencha DATABASE_URL e JWT_SECRET
prisma generate --schema=prisma/schema.prisma
prisma db push --schema=prisma/schema.prisma   # cria as tabelas (ou use migrate para produção)
```

Criar o primeiro admin:

```bash
set SEED_ADMIN_EMAIL=admin@dynamuscapital.com.br
set SEED_ADMIN_PASSWORD=troque-esta-senha
python -m app.seed
```

Subir a API:

```bash
uvicorn app.main:app --reload --port 8000
```

Docs interativas em `http://localhost:8000/docs`.

## Provedores de lookup (CPF e Placa)

`/lookup/cep` já funciona out-of-the-box (ViaCEP, gratuito). `/lookup/cpf` e `/lookup/placa`
ficam em modo "stub" (retornam vazio, o usuário preenche manualmente) até que as variáveis
`CPF_LOOKUP_URL`/`CPF_LOOKUP_API_KEY` e `PLACA_LOOKUP_URL`/`PLACA_LOOKUP_API_KEY` sejam
configuradas em `backend/.env`, conforme o provedor que a seguradora contratar (ver seção 4 da
spec).

## Pendências (ver seção 8 da spec)

- Provedor de CPF a contratar
- Provedor de placa a contratar
- Domínio/hospedagem de destino
- Múltiplos admins ou usuário único

## Notas de segurança para produção

- O token JWT do admin fica em `localStorage` no MVP atual — endurecer para cookie
  `httpOnly` + `SameSite` antes de ir para produção.
- `CORS_ORIGINS` no backend deve ser restrito ao domínio real do frontend em produção.
