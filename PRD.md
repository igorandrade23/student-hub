# PRD — TucTuc Study Hub

## Visão do produto

Hub de estudos para turmas universitárias. Começa como ferramenta pessoal da sala, evolui para SaaS com assinatura para líderes de turma em todo o Brasil.

**Problema:** Materiais espalhados no Drive, avisos perdidos no WhatsApp, nenhum lugar central para revisar conteúdo antes da prova.

**Solução:** Um hub leve, sem login, que centraliza tudo — links, calendário, avisos e revisão com quiz — alimentado por Google Sheets para que o líder atualize sem tocar no código.

---

## Fases do produto

| Fase | Escopo | Público-alvo |
|---|---|---|
| **MVP** | Hub da sala, sem login, dados via Google Sheets | Uma turma |
| **v1** | Multi-turma, login, roles, conteúdo editável em painel | Líderes beta |
| **v2** | SaaS, assinatura, onboarding self-service | Líderes de todo o Brasil |

---

## MVP — Escopo detalhado

### Princípios

- Sem login no MVP, mas arquitetura preparada para autenticação
- Google Sheets como CMS (CSV público, sem credenciais)
- Google Calendar embed para o calendário da turma
- Deploy no Vercel, domínio custom opcional
- Visual genérico/neutro por ora (brand depois)

### Páginas e rotas

| Rota | Descrição | Fonte de dados |
|---|---|---|
| `/` | Dashboard: próximos eventos, último aviso, atalhos rápidos | Sheets |
| `/materiais` | Links por aula → Google Drive, organizados por semana | Sheets |
| `/calendario` | Embed Google Calendar da turma | Google Calendar |
| `/avisos` | Mural de avisos com data e urgência | Sheets |
| `/revisao` | Lista de matérias/provas disponíveis | Sheets |
| `/revisao/[materia]` | Conteúdo de revisão + Quiz (10–15 perguntas) | Sheets |

### Google Sheets — estrutura do CMS

Uma planilha com abas:

| Aba | Colunas |
|---|---|
| `avisos` | id, data, titulo, texto, urgente (sim/não) |
| `materiais` | id, semana, aula, titulo, link, tipo (slides/pdf/video) |
| `eventos` | id, data, titulo, tipo (prova/aula/entrega/outro), descricao |
| `quiz` | id, materia, pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta, explicacao |
| `materias` | id, slug, titulo, descricao, data_prova |

### Camada de dados (`lib/data/`)

```
lib/
  sheets.ts       ← fetch genérico de CSV do Sheets
  avisos.ts       ← parse + tipos
  materiais.ts    ← parse + tipos
  eventos.ts      ← parse + tipos
  quiz.ts         ← parse + tipos
  materias.ts     ← parse + tipos
```

O fetch é feito client-side com SWR ou server-side com `cache: 'revalidate'` do Next.js. Ao migrar para banco, só a camada `lib/data/` muda.

---

## Arquitetura técnica

### Stack

- **Framework:** Next.js 15 (App Router)
- **Estilo:** Tailwind CSS v3
- **Linguagem:** TypeScript
- **Dados MVP:** Google Sheets (CSV público)
- **Calendário MVP:** Google Calendar embed
- **Deploy:** Vercel

### Estrutura de pastas

```
src/
  app/
    layout.tsx
    page.tsx                   ← dashboard
    materiais/
      page.tsx
    calendario/
      page.tsx
    avisos/
      page.tsx
    revisao/
      page.tsx
      [materia]/
        page.tsx
  components/
    layout/
      Sidebar.tsx
      Header.tsx
      MobileNav.tsx
    dashboard/
      NextEvents.tsx
      LastNotice.tsx
      QuickLinks.tsx
    materiais/
      MaterialCard.tsx
      WeekGroup.tsx
    avisos/
      NoticeCard.tsx
    revisao/
      MateriasGrid.tsx
      QuizEngine.tsx           ← migrado do MVP atual
      ReviewContent.tsx
    ui/                        ← componentes atômicos reutilizáveis
      Badge.tsx
      Card.tsx
      Button.tsx
  lib/
    data/
      sheets.ts
      avisos.ts
      materiais.ts
      eventos.ts
      quiz.ts
      materias.ts
    utils.ts
```

### Preparação para v1 (sem mudar a estrutura)

| Elemento | MVP | v1 |
|---|---|---|
| Auth | Nenhum | NextAuth.js (middleware sobre rotas protegidas) |
| Dados | Google Sheets CSV | Supabase (Postgres) |
| Roles | — | `leader > subleader > editor > member > guest` |
| Multi-tenancy | Uma turma | Slug da turma: `/[turma]/revisao/[materia]` |
| Conteúdo | Sheets editado pelo líder | Painel `/admin` com CRUD por role |

---

## Roles (v1 — referência para arquitetura)

| Role | Permissões |
|---|---|
| `leader` | Tudo: editar turma, promover membros, criar conteúdo |
| `subleader` | Editar avisos, eventos, materiais |
| `editor` | Editar quiz e conteúdo de revisão |
| `member` | Visualizar tudo |
| `guest` | Visualizar conteúdo público (sem avisos internos) |

---

## Roadmap

### MVP (sprint atual)
- [ ] Reestruturar rotas e layout base
- [ ] Implementar fetch do Google Sheets
- [ ] Migrar quiz existente para Sheets
- [ ] Página de materiais
- [ ] Página de avisos
- [ ] Embed Google Calendar
- [ ] Dashboard com dados reais
- [ ] Página de revisão com quiz expandido (10–15 perguntas)

### v1
- [ ] Autenticação com NextAuth.js
- [ ] Migração de dados para Supabase
- [ ] Sistema de roles
- [ ] Painel `/admin`
- [ ] Multi-turma / multi-tenant

### v2
- [ ] Onboarding self-service para líderes
- [ ] Stripe — assinatura por turma
- [ ] Domínios/slugs por turma
- [ ] Analytics de engajamento (quem fez o quiz, etc.)

---

## Métricas de sucesso (MVP)

- Toda a turma usa o hub antes da próxima prova
- Líder consegue atualizar conteúdo sem abrir o código
- Quiz completo com 10+ perguntas funcionando
