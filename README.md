# Hub de Estudos da Turma

Hub central de estudos: materiais, calendário, avisos e revisão com quiz. MVP sem login,
com conteúdo editável diretamente em arquivos de código (fácil de versionar e de migrar
para um backend depois).

Stack: **Next.js 16 + TypeScript + Tailwind CSS**.

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

## De onde vem cada conteúdo (fonte única por domínio)

| Domínio | Fonte | Como atualizar |
|---|---|---|
| **Eventos** | Google Calendar da turma | Crie o evento no calendário (visibilidade **pública**, senão aparece como "Busy") |
| **Materiais** | Pasta do Google Drive | Jogue o arquivo na pasta — aparece embutido na página |
| **Avisos** | Google Sheets, aba `avisos` | Edite a planilha |
| **Quiz** | Google Sheets, aba `quiz` | Edite a planilha (importe `quiz.csv` para começar) |
| **Texto de revisão** | Código (`src/lib/study-data.ts`) | Edite o arquivo |

As integrações têm cache de **5 min** (ISR). Calendário e Drive precisam estar
compartilhados como **"qualquer pessoa com o link pode ver"**; a planilha também.

### Abas do Google Sheets

Primeira linha = cabeçalho, com estes nomes exatos:

| Aba | Colunas |
|---|---|
| `avisos` | `id, data, titulo, texto, urgente, autor` |
| `quiz` | `materia, tipo, pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta, explicacao` |

- `data`: formato `AAAA-MM-DD`; `urgente`: `sim` ou vazio
- quiz `materia`: slug (ex: `desenvolvimento-infantil`); `resposta`: letra (`A`–`D`);
  opções vazias são ignoradas (V/F usa A/B; discursiva usa só A)

Se a planilha estiver vazia/indisponível, o app usa um conteúdo-semente de fallback,
então nunca quebra. Gere o `quiz.csv` inicial com `node scripts/gen-quiz-csv.mjs`.

### Configuração (código)

| Arquivo | O que controla |
|---|---|
| `src/lib/data/turma.ts` | IDs do **Calendar**, **Drive** e **Sheets**; curso, instituição e início da turma |
| `src/lib/data/materias.ts` | Matérias disponíveis para revisão |
| `src/lib/study-data.ts` | Texto de revisão e quiz-semente de Desenvolvimento Infantil |

### Configurar o Google Calendar

Em `turma.ts`, troque `calendarEmbedUrl`. No Google Calendar:
Configurações → sua agenda → **Integrar agenda** → copie o `src` do código `<iframe>`.

### Configurar o Drive

Em `turma.ts`, troque `driveUrl` e os campos `url` em `materiais.ts` pelos links reais
das pastas/arquivos no Google Drive.

## Estrutura

```
src/
  app/                    # rotas (App Router)
    page.tsx              # Dashboard
    materiais/            # /materiais
    calendario/           # /calendario
    avisos/               # /avisos
    revisao/              # /revisao e /revisao/[materia]
  components/
    layout/               # HubShell, PageHeader, navegação
    ui/                   # Card, Badge
    revisao/              # QuizEngine, conteúdo das matérias
  lib/
    data/                 # conteúdo editável (ver tabela acima)
    study-data.ts         # dados de Desenvolvimento Infantil
    utils.ts              # formatação de datas
```

## Deploy no Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com), **Add New → Project** e importe o repositório.
3. O Vercel detecta Next.js automaticamente — não há variáveis de ambiente obrigatórias.
4. **Deploy**. A cada `git push` na branch principal, o Vercel publica a nova versão.

## Próximos passos (roadmap)

Veja [PRD.md](PRD.md) e [TASKS.md](TASKS.md). Em resumo:

- **v1:** login (NextAuth), banco (Supabase), papéis (líder/sublíder/editor), painel de edição
- **v2:** SaaS multi-turma com assinatura por líder

A arquitetura atual já isola o conteúdo em `lib/data/`, então a migração para banco
substitui essa camada sem reescrever as páginas.
