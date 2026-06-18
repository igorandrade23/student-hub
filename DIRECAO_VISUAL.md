# Direção Visual — Student Hub · Psicologia

> Documento de direção de arte para evoluir o frontend do hub da turma.
> Não é landing page: é um espaço de uso diário. Cada decisão abaixo serve à
> rotina (ver prova, achar material, revisar) **e** à identidade (humano,
> acadêmico, vivo). Implementação vem depois — aqui fica o norte.

---

## 1. Conceito visual central

**Metáfora-mãe: _Atlas da subjetividade_ — o caderno de campo de uma turma de Psicologia.**

O hub é metade **observatório** (mapas, constelações, relações entre ideias e
pessoas) e metade **caderno** (papel quente, anotação, marca-texto, recorte). A
Psicologia estuda o humano em relação; a interface deve _parecer_ um lugar onde
relações são mapeadas, não um painel de métricas.

**Três tensões que definem o tom (toda tela deve equilibrar as três):**

| Tensão | Lado A | Lado B |
|---|---|---|
| Emoção × Rigor | acolhedor, humano | acadêmico, preciso |
| Profundidade × Calor | fundo aubergine profundo | superfície marfim |
| Organização × Vida | grid claro, hierarquia | formas orgânicas, gente |

**O que a pessoa deve sentir ao entrar:** _"este é o nosso lugar — bonito,
sério e vivo; eu pertenço aqui e sei o que fazer agora."_

**Frase-norte (cola na parede):**
> Um campus digital quente, onde o conhecimento aparece como mapa de relações e
> a turma aparece como comunidade — nunca como dashboard.

**Evitar (lista negra, repetir sempre):** cérebro neon, sinapses clichê, clínica
branca fria, SaaS genérico, cards todos iguais, ilustração infantil/flat
corporativa, excesso de texto, gradiente arco-íris.

---

## 2. Fundações (o sistema por trás de tudo)

### 2.1 Modo: "moldura profunda + superfícies de marfim"

Não é dark mode puro nem light puro. É um **enquadramento escuro** (sidebar,
fundo da aplicação, faixas-herói) que segura **superfícies claras de papel**
(a maior parte do conteúdo do dia a dia). O escuro dá teatro e foco; o marfim dá
leitura confortável e ar de caderno.

- **Moldura / chrome** (sidebar, fundo, faixas especiais): `#0B1026`, `#22162F`, `#171A33`.
- **Conteúdo de trabalho** (a maioria dos cards, listas, leitura): `#F6EFE2`, `#FFF8EA`.
- Regra de ouro: **texto longo e tarefas vivem no claro**; **destaque, herói e
  navegação vivem no escuro**.

### 2.2 Paleta — papéis semânticos

| Papel | Hex | Onde usar |
|---|---|---|
| Background profundo | `#0B1026` | fundo da app, atrás de tudo |
| Aubergine acadêmico | `#22162F` | sidebar, faixas-herói, rodapés |
| Superfície escura | `#171A33` | cards sobre o fundo profundo, painéis de mapa |
| Superfície clara | `#F6EFE2` | cards de conteúdo, listas, leitura |
| Marfim quente | `#FFF8EA` | cards em destaque, modais, inputs |
| Texto escuro | `#23212A` | texto sobre claro |
| Texto claro | `#F8F3EA` | texto sobre escuro |
| Texto secundário | `#A8A0B6` | metadados, legendas, labels |
| Linha clara | `#E6D8C4` | divisórias sobre superfícies claras |
| Linha escura | `rgba(255,255,255,0.14)` | divisórias sobre superfícies escuras |

### 2.3 Cores por domínio — **cada cor é um significado, nunca decoração**

A paleta de acento é um **código de áreas**. Uma matéria/contexto = sempre a
mesma cor, em todo o app (chip, ponto na constelação, borda do card, marcador na
timeline). Isso transforma cor em navegação.

| Acento | Hex | Domínio / semântica |
|---|---|---|
| Roxo Psicologia | `#8B6FB5` | marca, identidade, "núcleo" |
| Teal estudo | `#2F8F8B` | cognição, revisão, conteúdo de estudo |
| Clay provas | `#C76557` | provas, prazos, alertas |
| Amber calendário | `#DCA64A` | eventos, aulas, agenda |
| Rose comunidade | `#D46A7E` | avisos, mural, gente |
| Verde progresso | `#6AAE8E` | quiz, acertos, evolução |
| Azul materiais | `#4C6FFF` | materiais, links, pesquisa |

**Proporção (regra 70/20/10):** 70% neutros (marfim + aubergine), 20% roxo da
marca, 10% somando todos os outros acentos. Acento é tempero — uma tela com 6
cores fortes vira festa, não atlas. Cor saturada **só** em: ponto de dado, chip
de categoria, 1 CTA, 1 barra de progresso.

**Texto sobre acento:** nunca preto puro nem cinza. Use a versão escurecida do
próprio acento (ex.: texto sobre chip roxo claro = roxo bem escuro), ou marfim.

### 2.4 Tipografia

Sistema de três vozes (já temos base com serifa + sans + mono — manter e refinar):

- **Display serifada humanista** (títulos, "Bem-vinda", nomes de seção): dá o ar
  acadêmico-literário. Candidatas: _Fraunces_ (atual, ótima), _Newsreader_,
  _Source Serif_. Peso 400–600, _nunca_ 800; tracking levemente negativo.
- **Sans de leitura** (corpo, UI, botões): _Plus Jakarta Sans_ (atual) ou _Inter
  Tight_. Limpa, sem personalidade competindo com a serifa.
- **Mono de etiqueta** (datas, labels, contadores, "QUA 15", chips de status):
  _Space Mono_ (atual). Dá detalhe de "ficha de pesquisa" / caderno técnico.

Regra: **uma serifa por tela como protagonista** (o maior título). O resto é
sans + mono. Sentence case sempre, exceto labels mono (versalete).

### 2.5 Forma, espaço e textura

- **Cantos:** 12–16px nos cards, 999px nos chips. Consistente, mas **uma borda
  superior colorida de 3px** por card identifica o domínio (recorte de caderno).
- **Sombra:** quase nula no claro (confie nas linhas `#E6D8C4`); no escuro,
  glow suave e frio. Nada de drop-shadow pesado de SaaS.
- **Textura (assinatura do produto):** grão de papel sutilíssimo (2–4% de ruído)
  nas superfícies marfim; nas faixas aubergine, **formas orgânicas** (folhas,
  silhuetas, blobs translúcidos) a 6–10% de opacidade. É o que separa "bonito"
  de "vivo". Ver §3 e §4.
- **Espaço:** generoso. Respiro entre seções > respiro dentro do card. Densidade
  de informação alta dentro do card, mas com ar ao redor.

### 2.6 Movimento

Discreto e orgânico, nunca "appy". Hover = leve subida + borda colorida acende.
Constelação/mapa = nós com _float_ lento (respiração). Progresso = preenche com
ease. Entradas = fade + 6px de subida, escalonado. Sem bounce, sem parallax
exagerado, sem confete.

---

## 3. Sistema de imagens

Imagem é o que mais aproxima do "campus de Psicologia" — e o que mais arrisca cair
no clichê. Curadoria rígida.

### 3.1 Que tipo de foto usar

- **Pessoas reais estudando em relação:** grupos pequenos conversando, dupla
  revisando, mãos sobre caderno, roda de conversa. Diversidade real (a turma é
  brasileira). Luz quente, natural, levemente desbotada.
- **Objetos de estudo humanos:** cadernos manuscritos, post-its, marca-texto,
  livros abertos, café, plantas na mesa, mapa mental no papel.
- **Texturas/ambiente:** biblioteca, mesa de estudo, folhagem, papel, tecido.

### 3.2 Onde usar (e onde NÃO)

| Usar imagem | Não usar imagem |
|---|---|
| faixa-herói da Home (1 foto da turma) | dentro de cards de dados/listas |
| bloco "Comunidade da turma" | atrás de texto que precisa ser lido |
| capa de "Revisão temática" (ilustração) | ícones (use traço, não foto) |
| vazios/onboarding (foto acolhedora) | repetir a mesma foto em 2 lugares na mesma tela |

Imagem é **evento**, não papel de parede. Uma foto forte > seis fracas.

### 3.3 O que evitar nas imagens

Cérebros 3D, sinapses, neurônios neon; consultório/divã clichê; stock corporativo
sorrindo pra câmera; gravata e aperto de mão; lousa com fórmulas; pessoas
isoladas e "produtivas". Nada que cheire a clínica fria ou a banco.

### 3.4 Termos de busca (Unsplash / Pexels)

```txt
study group university warm light
students talking together campus
hands writing notebook journal
diverse college friends studying
library reading warm tones
candid classroom discussion
notebook coffee plants desk flatlay
young people listening conversation
book pages close up warm
peer mentoring students
```

Filtros mentais: luz quente, candid (não posado), tom terroso/aubergine combinável,
sem branco clínico estourado.

### 3.5 Prompts para gerar ilustração com IA

Para as **silhuetas/abstrações** da referência (não usar IA para "fotos de pessoas
reais" — pra isso, banco de imagens):

```txt
1) "Editorial vector illustration, overlapping human profile silhouettes in
   warm aubergine, plum and ivory, soft organic foliage and leaves weaving
   between faces, abstract, calm, academic, muted palette #8B6FB5 #22162F
   #FFF8EA, flat with subtle grain, no faces detail, no neon"

2) "Abstract relational map / constellation of soft nodes connected by thin
   warm lines on deep indigo #0B1026 background, nodes in plum, teal, amber,
   rose; gentle, scholarly, hand-drawn ink feel, no glow, no sci-fi"

3) "Warm risograph-style illustration of diverse students in conversation,
   limited palette plum + ivory + clay, grainy texture, humanist, poster-like,
   no logos, no text"

4) "Botanical line-art motif: single sprig of leaves, fine warm ink stroke on
   ivory, decorative divider, academic notebook aesthetic"
```

### 3.6 Tratamento (para unificar bancos diferentes)

Toda foto passa por **um mesmo filtro**: leve duotone quente (sombras puxando
aubergine `#22162F`, luzes puxando marfim `#FFF8EA`) + overlay aubergine a
12–18% + grão sutil. Resultado: dez fotos de origens diferentes viram **uma
coleção coerente**. Cantos arredondados iguais aos cards.

---

## 4. Elementos visuais vivos (a alma do produto)

São os componentes-assinatura. Pelo menos **um** deve estar visível em cada tela
principal — é o que tira do "bonito porém genérico".

### 4.1 Constelação de matérias ("Conexões da Psicologia")

- **O quê:** grafo suave onde cada matéria é um nó (cor do domínio) ligado por
  fios finos; o símbolo Ψ no centro. Como o do mockup de referência.
- **Onde:** bloco grande na Home; versão expandida na página _Matérias_.
- **Dado real:** nós = matérias do semestre; tamanho do nó = nº de materiais ou
  proximidade da prova; aresta = pré-requisito/afinidade temática.
- **Interação:** hover destaca o nó e suas conexões; clique abre a matéria.
- **Regra:** parece desenhado a tinta, com _float_ lento. Nunca "rede neural".

### 4.2 Mapa de relações (revisão temática)

- **O quê:** versão "atlas" dentro de uma matéria — autores, conceitos e teorias
  como nós conectados ("Vínculo → Apego → Ainsworth"). É o cérebro do conteúdo,
  desenhado como mapa de ideias, não como dashboard.
- **Onde:** topo da página de revisão temática.
- **Dado:** tópicos do conteúdo de revisão (já existem no código).

### 4.3 Timeline do semestre

- **O quê:** linha horizontal do período (início → hoje → fim), com marcos
  (aulas, provas em clay, entregas em amber). "Você está aqui."
- **Onde:** Calendário (protagonista) e uma faixa fininha na Home.
- **Dado:** eventos do Google Calendar (já integrados). Multi-dia = barra, não ponto.

### 4.4 Mural de avisos

- **O quê:** menos "feed de notificação", mais **mural de cortiça/quadro da
  turma**: recados em cartões levemente girados, fita adesiva, cor rose para
  comunidade, clay para urgente. Autor com avatar.
- **Onde:** página Avisos; resumo na Home.
- **Cuidado:** urgência clara sem alarme; humano, não corporativo.

### 4.5 Cards de revisão

- **O quê:** cada matéria = um "caderno" com borda-topo na cor do domínio,
  progresso (verde), nº de questões, data da prova, chip "Prova feita" (clay/â mbar).
- **Onde:** Revisões e Home.

### 4.6 Quiz como treino de prova

- **O quê:** enquadrar como **simulado**, não jogo. Ambiente focado (faixa
  aubergine ao redor), cronômetro opcional, barra de confiança, gabarito
  comentado. Acerto = verde sóbrio; erro = clay; nunca vermelho de "errado".
- **Onde:** Quiz e dentro da revisão temática.

---

## 5. Direção por página

Cada página tem **um elemento-herói** e **uma cor dominante**. Não repetir o mesmo
layout em todas — variar densidade e protagonista.

### Home / Hub da turma
- **Objetivo:** "o que é meu agora?" + senso de pertencimento.
- **Herói:** saudação calorosa ("Bem-vinda, [nome]") + faixa com foto da turma +
  citação curta da semana sobre escuta/relação.
- **Blocos:** Semana da turma (mini-timeline) · Próxima prova (clay, progresso) ·
  Constelação de matérias · Revisão temática da semana · Aulas · Materiais em
  destaque · Comunidade. Mosaico assimétrico (tamanhos diferentes), não grade
  uniforme.
- **Cor dominante:** roxo + marfim; acentos pontuais por bloco.

### Revisões
- **Objetivo:** escolher o que revisar.
- **Herói:** grade de "cadernos" (cards de matéria) com progresso e estado.
- **Cor:** teal (estudo). Filtro por status (a revisar / em dia / prova feita).

### Calendário
- **Objetivo:** quando é o quê.
- **Herói:** **timeline do semestre** + embed do Google Calendar abaixo.
- **Cor:** amber. Provas em clay saltam na linha; chips de dia da semana.

### Avisos
- **Objetivo:** estar por dentro.
- **Herói:** mural (cards de recado, autor, urgência). Filtro liderança/turma.
- **Cor:** rose. Urgente = clay.

### Materiais
- **Objetivo:** achar e abrir arquivos.
- **Herói:** biblioteca por matéria/aula; ícone por tipo (PDF/slide/vídeo);
  embed do Drive. Capa visual por matéria.
- **Cor:** azul materiais. Não virar lista cinza de arquivos — dar capa e cor.

### Matérias
- **Objetivo:** entender o todo do semestre.
- **Herói:** **constelação expandida** + grade de matérias com professor, sala,
  próxima aula, cor do domínio.
- **Cor:** roxo (visão da marca).

### Quiz
- **Objetivo:** treinar para a prova.
- **Herói:** ambiente de simulado focado (faixa escura), 1 questão por vez,
  progresso e gabarito.
- **Cor:** verde progresso + clay nos erros.

### Página de revisão temática (por matéria)
- **Objetivo:** revisar conteúdo + treinar.
- **Herói:** **mapa de relações** do tema no topo; abaixo, conteúdo em "caderno"
  (tópicos, comparativos, autores) e o quiz da matéria.
- **Cor:** a cor do domínio daquela matéria, puxando a tela inteira.

---

## 6. Componentes principais (anatomia)

> Padrão de card: superfície marfim · borda `#E6D8C4` · **borda-topo 3px na cor do
> domínio** · título serifado · metadados em mono · 1 ação clara. Card escuro:
> superfície `#171A33` · linha `rgba(255,255,255,.14)` · glow frio sutil.

- **Sidebar / header:** sidebar aubergine fixa, logo Ψ + wordmark serifado,
  navegação com ícone de traço, item ativo com pílula clara + marcador colorido;
  rodapé com perfil + citação. Header claro: saudação + busca "Buscar no Hub" +
  avatares da turma + toggle tema.
- **Card de matéria:** borda-topo na cor do domínio · ícone do tema · professor ·
  sala · próxima aula (mono) · mini-progresso.
- **Card de aviso:** avatar do autor · selo de urgência (clay) · tempo relativo ·
  cor rose · leve rotação/fita (mural).
- **Card de prova:** clay · "Faltam X dias" · conteúdos principais (chips) ·
  barra de progresso de revisão · CTA "Ver detalhes" · chip "Prova feita" quando passou.
- **Card de material:** ícone por tipo (cor azul) · matéria/aula · quem enviou ·
  botão download/abrir · capa visual opcional.
- **Timeline:** trilho com hoje destacado · marcos por cor de domínio · multi-dia
  como barra · rótulo de dia da semana.
- **Quiz:** cabeçalho de progresso · questão serifada · opções com hover claro ·
  feedback verde/clay · painel lateral de revisão.
- **Progresso:** barra fina, fundo neutro, preenchimento verde; % em mono.
  Sempre com rótulo do que está medindo.

---

## 7. Plano de implementação em fases

> Aplicar sobre o app Next.js + Tailwind atual, migrando os tokens primeiro.

- **Fase 0 — Tokens & fundações (base de tudo).** Trocar a paleta no Tailwind para
  os papéis da §2.2/§2.3; definir o modo "moldura escura + superfície marfim";
  textura de grão; revisar tipografia. _Aceite:_ uma tela qualquer já "respira"
  marfim+aubergine sem mudar layout.
- **Fase 1 — Chrome.** Sidebar aubergine + header claro com saudação e busca;
  logo Ψ. _Aceite:_ navegação com cara de campus, item ativo claro.
- **Fase 2 — Cards & cor-código.** Padrão de card com borda-topo por domínio;
  card de prova, aviso, material, matéria. _Aceite:_ nenhum "card todo igual"; cor
  = significado.
- **Fase 3 — Elementos vivos.** Constelação na Home/Matérias; timeline no
  Calendário; mural nos Avisos. _Aceite:_ cada tela principal tem ≥1 elemento vivo.
- **Fase 4 — Imagens & alma.** Faixa-herói, bloco comunidade, capas, ilustrações
  de silhueta; tratamento duotone unificado. _Aceite:_ a Home emociona em 3s.
- **Fase 5 — Revisão temática & quiz.** Mapa de relações + caderno + simulado.
  _Aceite:_ revisar parece estudar num atlas, não num formulário.

Cada fase é entregável e reversível; nada quebra a funcionalidade já pronta
(calendário, sheets, drive, quiz).

---

## 8. Critérios de aceite visual (checklist)

Uma tela está "pronta" quando responde **sim** a tudo:

- [ ] Marfim e aubergine coexistem; o conteúdo de leitura está no claro.
- [ ] Há **um** título serifado protagonista; o resto é sans/mono.
- [ ] Cor saturada só aparece como **significado** (domínio, status, 1 CTA).
- [ ] Nenhuma fileira de "cards idênticos": tamanhos/heróis variam.
- [ ] Cada card mostra sua cor de domínio na borda-topo.
- [ ] A tela tem ≥1 elemento vivo (constelação, mapa, timeline, mural ou foto tratada).
- [ ] Imagem (se houver) passou pelo tratamento quente e não é clichê.
- [ ] Texto enxuto: a tela se entende sem parágrafos.
- [ ] Zero clichê da lista negra (§1).
- [ ] Em 3 segundos dá pra responder: "o que é meu agora?".
- [ ] Sensação final: campus/caderno/atlas — **não** dashboard.

---

### Anexo — mapeamento rápido de tokens (referência para implementação)

```txt
/* moldura */            bg #0B1026 · aubergine #22162F · surface-dark #171A33
/* superfícies */        surface #F6EFE2 · ivory #FFF8EA
/* texto */              ink #23212A · ink-inv #F8F3EA · muted #A8A0B6
/* linhas */             line #E6D8C4 · line-dark rgba(255,255,255,.14)
/* domínios (acento) */  psi #8B6FB5 · estudo #2F8F8B · prova #C76557
                         evento #DCA64A · comunidade #D46A7E
                         progresso #6AAE8E · material #4C6FFF
```

> Próximo passo sugerido: começar pela **Fase 0** (tokens) e revalidar a Home
> contra a §8 antes de seguir.
