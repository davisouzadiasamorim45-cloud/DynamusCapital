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

## Deploy no Render (banco + API)

O `render.yaml` na raiz cria o Postgres (`dynamus-db`) e a API (`dynamus-api`) de uma vez.

1. No Render, **New → Blueprint** e aponte para este repositório. Quando pedir, preencha
   `CORS_ORIGINS` com o domínio do site (ex.: `https://www.dynamuscapital.com.br`).
2. Após o primeiro deploy, abra o **Shell** do serviço `dynamus-api` e crie o admin:

   ```bash
   SEED_ADMIN_EMAIL=admin@dynamuscapital.com.br SEED_ADMIN_PASSWORD='senha-forte' python -m app.seed
   ```

   O banco só aceita conexões da rede interna do Render, então o seed roda por esse Shell, não do seu computador.
3. Teste `https://<url-da-api>/health` e `/docs`.
4. No front, defina `NEXT_PUBLIC_API_URL` com a URL da API e remova `NEXT_PUBLIC_USE_MOCK`.

> **Se aparecer `prisma.engine.errors.BinaryNotFoundError` no startup:** o query engine do
> Prisma foi baixado para `/opt/render/.cache`, que o container de runtime não enxerga. O
> `render.yaml` já resolve isso com `PRISMA_BINARY_CACHE_DIR` apontando para dentro do repo
> e `prisma py fetch` no build. Confirme também que o **Start Command** no painel do Render
> não foi editado à mão: ele deve ser apenas `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

## Provedores de lookup (CPF, CNPJ e Placa)

`/lookup/cep` (ViaCEP) e `/lookup/cnpj` (BrasilAPI, dados públicos da Receita) já funcionam
out-of-the-box, sem contratar nada. O CEP também devolve cidade e UF. `/lookup/cpf` e `/lookup/placa`
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
