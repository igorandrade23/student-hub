# TASKS — TucTuc Study Hub MVP

Ordem de execução pensada para que cada task entregue algo visível e funcional.
Cada task é atômica: pode ser feita em uma sessão, testada isoladamente, e commitada.

---

## Fase 0 — Fundação

### TASK-01: Limpar e reorganizar estrutura de pastas
**Status:** `todo`
**Descrição:** Remover o componente monolítico `study-app.tsx` e reorganizar conforme a arquitetura do PRD. Criar pastas vazias com arquivos de índice placeholder.
**Entrega:** Estrutura de pastas correta, app ainda buildando (rota `/` pode ser 404 temporariamente).
**Arquivos afetados:**
- `src/app/` — criar rotas: `materiais/`, `calendario/`, `avisos/`, `revisao/`, `revisao/[materia]/`
- `src/components/` — criar subpastas: `layout/`, `dashboard/`, `materiais/`, `avisos/`, `revisao/`, `ui/`
- `src/lib/data/` — criar pasta e arquivos base

---

### TASK-02: Layout base — Sidebar + Header + MobileNav
**Status:** `todo`
**Descrição:** Extrair e generalizar o layout existente do `study-app.tsx`. Sidebar com navegação para todas as rotas. Header responsivo. MobileNav para telas pequenas.
**Entrega:** Layout funcional em todas as rotas, navegação entre páginas funcionando.
**Arquivos afetados:**
- `src/app/layout.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/MobileNav.tsx`

---

### TASK-03: Componentes UI atômicos
**Status:** `todo`
**Descrição:** Criar componentes reutilizáveis: `Card`, `Badge`, `Button`. Extraídos do design atual, sem dependências externas além do Tailwind.
**Entrega:** Componentes documentados com exemplos de uso em comentário JSDoc mínimo.
**Arquivos afetados:**
- `src/components/ui/Card.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Button.tsx`

---

## Fase 1 — Camada de dados (Google Sheets)

### TASK-04: Fetch genérico do Google Sheets
**Status:** `todo`
**Descrição:** Implementar `lib/data/sheets.ts` com função `fetchSheet(sheetId, tabName)` que busca o CSV público e retorna array de objetos. Usar `fetch` nativo com `next: { revalidate: 3600 }` (1h de cache). Tratar erros de rede e CSV malformado.
**Entrega:** Função testável via `console.log` em qualquer page.tsx. Documentar formato esperado do CSV.
**Arquivos afetados:**
- `src/lib/data/sheets.ts`
**Dependência:** Planilha do Google Sheets configurada (ver TASK-05)

---

### TASK-05: Configurar planilha Google Sheets
**Status:** `todo`  
**Tipo:** Manual (feito pelo usuário, não pelo código)
**Descrição:** Criar a planilha no Google Drive com as abas: `avisos`, `materiais`, `eventos`, `quiz`, `materias`. Preencher com dados de exemplo. Publicar como CSV público (Arquivo → Compartilhar → Publicar na web → CSV).
**Entrega:** URL base da planilha anotada em `.env.local` como `NEXT_PUBLIC_SHEETS_ID`.
**Arquivos afetados:**
- `.env.local` (criar)
- `.env.example` (criar, sem valores reais)

---

### TASK-06: Parsers de dados por entidade
**Status:** `todo`
**Descrição:** Implementar um arquivo por entidade com: tipo TypeScript, função de parse do CSV, e função de fetch usando `sheets.ts`.
**Entrega:** Funções `getAvisos()`, `getMateriais()`, `getEventos()`, `getQuiz(materia)`, `getMaterias()` prontas e tipadas.
**Arquivos afetados:**
- `src/lib/data/avisos.ts`
- `src/lib/data/materiais.ts`
- `src/lib/data/eventos.ts`
- `src/lib/data/quiz.ts`
- `src/lib/data/materias.ts`
**Dependência:** TASK-04, TASK-05

---

## Fase 2 — Páginas

### TASK-07: Página de Avisos (`/avisos`)
**Status:** `todo`
**Descrição:** Listar avisos da planilha ordenados por data (mais recente primeiro). Avisos urgentes têm badge visual destacado. Layout de cards com data, título e texto.
**Entrega:** Página funcional com dados reais da planilha.
**Arquivos afetados:**
- `src/app/avisos/page.tsx`
- `src/components/avisos/NoticeCard.tsx`
**Dependência:** TASK-06

---

### TASK-08: Página de Materiais (`/materiais`)
**Status:** `todo`
**Descrição:** Listar materiais agrupados por semana/aula. Cada item mostra título, tipo (slides/pdf/vídeo) com badge colorido e link externo para o Drive. Abre em nova aba.
**Entrega:** Página funcional com dados reais da planilha.
**Arquivos afetados:**
- `src/app/materiais/page.tsx`
- `src/components/materiais/MaterialCard.tsx`
- `src/components/materiais/WeekGroup.tsx`
**Dependência:** TASK-06

---

### TASK-09: Página de Calendário (`/calendario`)
**Status:** `todo`
**Descrição:** Embed do Google Calendar da turma via `<iframe>`. Responsivo (altura adaptável). Instruções no código de como obter a URL do embed. Abaixo do calendário: lista dos próximos 5 eventos puxada da aba `eventos` da planilha como fallback/complemento.
**Entrega:** Página funcional com calendário embedado e lista de eventos.
**Arquivos afetados:**
- `src/app/calendario/page.tsx`
**Dependência:** TASK-06

---

### TASK-10: Página de Revisão — lista de matérias (`/revisao`)
**Status:** `todo`
**Descrição:** Grid de cards por matéria/prova disponível. Cada card mostra: título, data da prova (com countdown "X dias"), status (disponível/em breve). Clique navega para `/revisao/[materia]`.
**Entrega:** Página funcional com dados reais da planilha.
**Arquivos afetados:**
- `src/app/revisao/page.tsx`
- `src/components/revisao/MateriasGrid.tsx`
**Dependência:** TASK-06

---

### TASK-11: Migrar quiz existente para o Sheets + nova engine
**Status:** `todo`
**Descrição:** Extrair a lógica de quiz do `study-app.tsx` para `QuizEngine.tsx`. Adaptar para receber perguntas via props (vindas da planilha). Manter: navegação por pergunta, feedback imediato, placar final, opção de refazer. Expandir para suportar 10–15 perguntas.
**Entrega:** Componente `QuizEngine` funcional com perguntas da planilha.
**Arquivos afetados:**
- `src/components/revisao/QuizEngine.tsx`
- `src/lib/data/quiz.ts`
**Dependência:** TASK-06

---

### TASK-12: Página de revisão por matéria (`/revisao/[materia]`)
**Status:** `todo`
**Descrição:** Conteúdo de revisão (texto estruturado por tópico) + QuizEngine ao final. Conteúdo de revisão pode vir da planilha como texto simples ou ser o componente atual de desenvolvimento infantil migrado. Tab ou seção separada para "Revisão" e "Quiz".
**Entrega:** Página funcional para a matéria de desenvolvimento infantil (dados reais).
**Arquivos afetados:**
- `src/app/revisao/[materia]/page.tsx`
- `src/components/revisao/ReviewContent.tsx`
**Dependência:** TASK-11

---

### TASK-13: Dashboard (`/`)
**Status:** `todo`
**Descrição:** Visão geral da turma com 3 seções: (1) próximos 3 eventos do calendário, (2) último aviso (urgente em destaque), (3) atalhos rápidos para materiais, revisão, calendário. Dados reais das planilhas.
**Entrega:** Dashboard funcional como página inicial.
**Arquivos afetados:**
- `src/app/page.tsx`
- `src/components/dashboard/NextEvents.tsx`
- `src/components/dashboard/LastNotice.tsx`
- `src/components/dashboard/QuickLinks.tsx`
**Dependência:** TASK-06, TASK-07, TASK-08, TASK-09, TASK-10

---

## Fase 3 — Qualidade e entrega

### TASK-14: Responsividade e polish mobile
**Status:** `todo`
**Descrição:** Revisar todas as páginas em viewport mobile (375px). Ajustar MobileNav, cards, quiz e embed do calendário. Garantir que nenhuma página quebre ou tenha scroll horizontal.
**Entrega:** App usável no celular sem ajustes.
**Dependência:** TASK-07 a TASK-13

---

### TASK-15: Loading states e tratamento de erro
**Status:** `todo`
**Descrição:** Adicionar `loading.tsx` para as rotas com fetch. Mensagem de erro amigável se a planilha estiver inacessível. Skeleton simples nos cards enquanto carrega.
**Entrega:** UX sem telas em branco durante carregamento.
**Dependência:** TASK-07 a TASK-13

---

### TASK-16: Deploy no Vercel + variáveis de ambiente
**Status:** `todo`
**Tipo:** Parcialmente manual
**Descrição:** Conectar repositório ao Vercel. Configurar variáveis de ambiente (`NEXT_PUBLIC_SHEETS_ID`, `NEXT_PUBLIC_CALENDAR_EMBED_URL`). Verificar build de produção sem erros.
**Entrega:** URL pública do app funcionando.
**Dependência:** TASK-01 a TASK-15

---

## Ordem de execução sugerida

```
TASK-01 → TASK-02 → TASK-03
              ↓
         TASK-05 (manual)
              ↓
         TASK-04 → TASK-06
              ↓
    TASK-07  TASK-08  TASK-09
              ↓
    TASK-10 → TASK-11 → TASK-12
              ↓
           TASK-13
              ↓
    TASK-14 → TASK-15 → TASK-16
```

---

## Legenda de status

| Status | Significado |
|---|---|
| `todo` | Não iniciado |
| `in_progress` | Em andamento |
| `blocked` | Aguardando dependência |
| `done` | Concluído e testado |
| `manual` | Feito pelo usuário, fora do código |
