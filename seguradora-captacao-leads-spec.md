---
status: pronto-para-dev
tipo: spec-tecnica
data: 2026-09-17
tags: [seguradora, captacao-leads, nextjs, fastapi, prisma, postgres]
---

# Sistema de Captação de Leads — Seguradora (Cliente Novo)

Referência visual: [[seguradora-captacao-leads]] (protótipo já validado no Artifact/Design — landing + formulário em wizard de 4 etapas + painel admin).

## 1. Contexto

Campanha no Instagram com CTA levando a um formulário de cotação. O lead preenche seus próprios dados (não é consulta de terceiros). Sistema entrega os leads capturados numa área admin pra equipe comercial da seguradora tratar/filtrar.

Cobre inicialmente **seguro veicular** e **seguro de vida** (campo condicional por tipo).

## 2. Stack

- **Frontend**: Next.js (App Router)
- **Backend**: FastAPI
- **ORM/DB**: Prisma + PostgreSQL
- **Auth admin**: JWT simples (email/senha)

## 3. Fluxo do formulário (wizard, 4 etapas)

**Etapa 1 — Identificação**
- Campo: CPF (validação de dígito verificador no client)
- Ao validar CPF → chama `/lookup/cpf/{cpf}` → preenche `nome` e `data_nascimento`
- Campos `nome` e `data_nascimento` ficam **sempre visíveis e editáveis**, vazios até a busca retornar; usuário pode preencher manualmente se preferir
- Botão "Continuar" habilita quando nome está preenchido (automático ou manual)

**Etapa 2 — Tipo de seguro**
- Seleção: Veicular ou Vida
- Se **Veicular**: campo placa → chama `/lookup/placa/{placa}` → preenche `modelo` e `ano` (mesma lógica de campo sempre visível/editável)
- Se **Vida**: campo `numero_dependentes`
- Botão "Continuar" habilita conforme o campo obrigatório do tipo escolhido

**Etapa 3 — Endereço**
- Campo: CEP → chama `/lookup/cep/{cep}` (proxy ViaCEP) → preenche `rua` e `bairro`
- Campos adicionais: `numero` (obrigatório), `complemento` (opcional)
- Mesma lógica de autopreenchimento visível/editável

**Etapa 4 — Contato**
- Campos: `email`, `celular`
- Checkbox de consentimento LGPD (obrigatório para envio)
- CTA final: "Solicitar Cotação" → `POST /leads`

Cada etapa tem cabeçalho dinâmico (eyebrow + headline + subtexto) que muda conforme o progresso, e barra de progresso segmentada (4 blocos) no topo do card.

## 4. Provedores de lookup

| Campo | Provedor sugerido | Custo | Observação |
|---|---|---|---|
| CPF → nome/nascimento | Assertiva, BigDataCorp ou Direct Data | ~R$0,15–0,80/consulta | Exige CNPJ contratante (da seguradora) + checkbox de consentimento LGPD |
| Placa → modelo/ano | WDAPI2, Apiplaca ou Placa FIPE API | ~R$0,05–0,30/consulta | Tem free tier em algumas |
| CEP → rua/bairro | ViaCEP ou BrasilAPI | Grátis | Sem limite prático |

As chaves de API (CPF e placa) devem ser fornecidas pela seguradora — configurar como variável de ambiente, nunca hardcoded.

## 5. Endpoints (FastAPI)

```
POST   /leads                     — cria lead (payload completo do wizard)
GET    /lookup/cep/{cep}           — proxy ViaCEP
GET    /lookup/placa/{placa}       — proxy API veicular
GET    /lookup/cpf/{cpf}           — proxy API de enriquecimento cadastral (stub configurável)

POST   /admin/auth/login           — login admin (retorna JWT)
GET    /admin/leads                — lista leads (filtros: status, tipo_seguro, cidade, data_inicio, data_fim, busca)
GET    /admin/leads/{id}           — detalhe do lead
PATCH  /admin/leads/{id}           — atualizar status (novo → contatado → cotação_enviada → convertido/perdido)
```

## 6. Schema Prisma (rascunho)

```prisma
model Lead {
  id               String   @id @default(cuid())
  cpf              String
  nome             String
  dataNascimento   String
  tipoSeguro       TipoSeguro
  placa            String?
  modeloVeiculo    String?
  anoVeiculo       String?
  numeroDependentes Int?
  cep              String
  rua              String
  numero           String
  complemento      String?
  bairro           String
  email            String
  celular          String
  status           StatusLead @default(NOVO)
  origem           String?    // ex: "instagram_campanha_x"
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
}

enum TipoSeguro {
  VEICULAR
  VIDA
}

enum StatusLead {
  NOVO
  CONTATADO
  COTACAO_ENVIADA
  CONVERTIDO
  PERDIDO
}

model Admin {
  id       String @id @default(cuid())
  email    String @unique
  senha    String // hash
  nome     String
}
```

## 7. Painel admin

- Cards de resumo: total de leads, aguardando contato, convertidos no mês
- Tabs de filtro por status (Todos / Novos / Contatados / Cotação enviada / Convertidos)
- Busca por nome ou CPF
- Tabela: nome, veículo (se aplicável), cidade, contato, data de recebimento, status (badge colorido)
- Ação de mudar status inline

## 8. Pendências a confirmar com o cliente antes de codar

- [ ] Qual provedor de CPF ele vai contratar (define o formato do stub em `/lookup/cpf`)
- [ ] Qual provedor de placa
- [ ] Domínio/hospedagem de destino
- [ ] Se vai ter múltiplos admins (equipe comercial) ou só um usuário
