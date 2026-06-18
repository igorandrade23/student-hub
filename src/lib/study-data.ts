export type Phase = {
  id: "primeira" | "segunda" | "terceira";
  label: string;
  age: string;
  colorClass: string;
  accentClass: string;
  thesis: string;
  physical: string[];
  cognitive: string[];
  psychosocial: string[];
  language: string[];
  example: string;
};

export type Question = {
  type: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const phases: Phase[] = [
  {
    id: "primeira",
    label: "Primeira infância",
    age: "0 a 3 anos",
    colorClass: "text-first",
    accentClass: "bg-first",
    thesis: "Do reflexo à ação intencional: corpo, vínculo e exploração sensorial organizam a entrada no mundo.",
    physical: ["Crescimento acelerado", "Plasticidade cerebral intensa", "Controle postural", "Marcha", "Preensão em pinça"],
    cognitive: ["Estágio sensório-motor", "Esquemas de ação", "Causa e efeito", "Permanência do objeto", "Reações circulares"],
    psychosocial: ["Apego", "Confiança básica", "Autonomia inicial", "Ansiedade de separação", "Regulação mútua"],
    language: ["Choro", "Balbucio", "Primeiras palavras", "Holofrases", "Fala telegráfica"],
    example: "A criança que solta o brinquedo repetidas vezes testa causalidade e observa a resposta do adulto."
  },
  {
    id: "segunda",
    label: "Segunda infância",
    age: "3 a 6 anos",
    colorClass: "text-second",
    accentClass: "bg-second",
    thesis: "A fase do símbolo: linguagem, faz de conta e iniciativa crescem, mas o pensamento ainda se prende à aparência.",
    physical: ["Corpo mais esguio", "Lateralidade em definição", "Correr e pular", "Desenhar", "Usar tesoura"],
    cognitive: ["Pré-operatório", "Função simbólica", "Egocentrismo", "Animismo", "Centração"],
    psychosocial: ["Iniciativa vs. culpa", "Autoconceito inicial", "Papéis sociais", "Agressão instrumental", "Brincadeira simbólica"],
    language: ["Explosão vocabular", "Pragmática", "Discurso particular", "Sintaxe mais complexa"],
    example: "Usar uma fatia de maçã como aspirador de pó mostra função simbólica e faz de conta."
  },
  {
    id: "terceira",
    label: "Terceira infância",
    age: "6 a 12 anos",
    colorClass: "text-third",
    accentClass: "bg-third",
    thesis: "A lógica concreta entra em cena: escola, pares, regras e competência passam a organizar a vida infantil.",
    physical: ["Crescimento lento e regular", "Ganho de força", "Coordenação refinada", "Esportes com regras", "Resistência"],
    cognitive: ["Operações concretas", "Conservação", "Reversibilidade", "Seriação", "Classificação"],
    psychosocial: ["Produtividade vs. inferioridade", "Corregulação", "Grupo de pares", "Autoestima", "Competência escolar"],
    language: ["Leitura", "Escrita", "Vocabulário acadêmico", "Comunicação mais estratégica"],
    example: "Organizar lápis por tamanho e cor ao mesmo tempo revela seriação, classificação e descentração."
  }
];

export const theories = [
  ["Jean Piaget", "Estágios cognitivos: sensório-motor, pré-operatório e operatório-concreto. Conceitos: esquemas, assimilação, acomodação e equilibração."],
  ["Lev Vygotsky", "Aprendizagem mediada pela cultura. ZDP e andaime explicam como a ajuda adequada amplia o desempenho infantil."],
  ["Erik Erikson", "Crises psicossociais: confiança, autonomia, iniciativa e produtividade, sempre em interação com demandas sociais."],
  ["Urie Bronfenbrenner", "Teoria bioecológica: a criança se desenvolve em sistemas interdependentes, do microssistema ao macrossistema."],
  ["Mary Ainsworth", "Situação Estranha e padrões de apego, úteis para compreender segurança emocional inicial."],
  ["Baumrind", "Estilos parentais. O autoritativo combina afeto e regras claras, geralmente associado a melhores resultados no contexto ocidental."],
  ["Kohlberg", "Raciocínio moral, com destaque para níveis pré-convencional e convencional nas fontes estudadas."]
] as const;

export const examFocus = [
  "Egocentrismo em Piaget não é egoísmo moral.",
  "Pré-operatório erra conservação por centração e irreversibilidade.",
  "Assimilação incorpora; acomodação modifica estruturas.",
  "ZDP é potencial com ajuda; andaime é suporte temporário.",
  "Terceira infância combina operações concretas, escola e pares.",
  "Corregulação substitui controle direto constante dos pais."
];

export const quiz: Question[] = [
  {
    type: "Múltipla escolha",
    question: "Segundo Piaget, uma criança de 4 anos que acredita que a lua a segue quando anda de carro demonstra qual característica cognitiva?",
    options: ["Conservação", "Seriação", "Animismo e egocentrismo", "Reações circulares primárias"],
    answer: 2,
    explanation: "O egocentrismo dificulta considerar perspectivas externas, e o animismo atribui intenção a algo inanimado."
  },
  {
    type: "Verdadeiro ou falso",
    question: "Na terceira infância, o ritmo de crescimento físico acelera drasticamente em comparação com a primeira infância.",
    options: ["Verdadeiro", "Falso"],
    answer: 1,
    explanation: "O crescimento é mais rápido na primeira infância e mais lento e regular na terceira."
  },
  {
    type: "Discursiva curta",
    question: "Explique a Zona de Desenvolvimento Proximal de Vygotsky e o papel do adulto.",
    options: ["Revelar resposta esperada"],
    answer: 0,
    explanation: "A ZDP é a distância entre o que a criança faz sozinha e o que faz com ajuda. O adulto oferece andaime temporário até que a criança ganhe autonomia."
  },
  {
    type: "Estudo de caso",
    question: "Maria, 8 meses, chora quando a mãe a deixa no berçário. Que marco ela demonstra?",
    options: ["Iniciativa vs. culpa", "Ansiedade de separação", "Retardo no apego", "Desinteresse social"],
    answer: 1,
    explanation: "A ansiedade de separação aparece quando há apego específico e percepção da ausência do cuidador."
  },
  {
    type: "Comparação",
    question: "Diferencie crianças pré-operatórias e operatório-concretas no teste de conservação da água.",
    options: ["Revelar resposta esperada"],
    answer: 0,
    explanation: "A pré-operatória centra-se na aparência e não usa reversibilidade; a operatório-concreta considera mais de uma dimensão e entende que a quantidade se mantém."
  },
  {
    type: "Múltipla escolha",
    question: "O desenvolvimento da cabeça antes dos membros inferiores segue qual princípio?",
    options: ["Próximo-distal", "Cefalocaudal", "Sensório-motor", "Genético-ambiental"],
    answer: 1,
    explanation: "Cefalocaudal significa da cabeça para baixo."
  },
  {
    type: "Verdadeiro ou falso",
    question: "A abordagem do processamento de informação confirmou que bebês não têm nenhuma permanência do objeto antes dos 18 meses.",
    options: ["Verdadeiro", "Falso"],
    answer: 1,
    explanation: "Estudos posteriores sugerem competências rudimentares mais precoces do que Piaget propôs."
  },
  {
    type: "Múltipla escolha",
    question: "Em Erikson, o desafio central da terceira infância é:",
    options: ["Confiança vs. desconfiança", "Autonomia vs. vergonha", "Iniciativa vs. culpa", "Produtividade vs. inferioridade"],
    answer: 3,
    explanation: "A criança escolar busca competência em tarefas valorizadas socialmente."
  },
  {
    type: "Múltipla escolha",
    question: "Frases como 'quer mamar' e 'cachorro auau' caracterizam:",
    options: ["Discurso particular", "Pragmática avançada", "Fala telegráfica", "Holofrase"],
    answer: 2,
    explanation: "A fala telegráfica usa palavras essenciais, omitindo conectivos."
  },
  {
    type: "Verdadeiro ou falso",
    question: "O manhês prejudica o desenvolvimento da linguagem.",
    options: ["Verdadeiro", "Falso"],
    answer: 1,
    explanation: "A fala dirigida à criança pode favorecer atenção e aquisição da linguagem."
  },
  {
    type: "Discursiva curta",
    question: "O que é discurso particular e qual sua utilidade segundo Vygotsky?",
    options: ["Revelar resposta esperada"],
    answer: 0,
    explanation: "É a fala da criança consigo mesma em voz alta. Para Vygotsky, ajuda na autorregulação e resolução de problemas."
  },
  {
    type: "Estudo de caso",
    question: "Pedro, 4 anos, joga um brinquedo na irmã para pegar o tablet. Qual tipo de agressão aparece?",
    options: ["Hostil, atípica", "Relacional, atípica", "Instrumental, típica", "Crônica, típica"],
    answer: 2,
    explanation: "A agressão instrumental busca obter um objetivo, comum na pré-escola."
  },
  {
    type: "Verdadeiro ou falso",
    question: "Brincadeiras impetuosas na terceira infância são sempre sinais de comportamento antissocial grave.",
    options: ["Verdadeiro", "Falso"],
    answer: 1,
    explanation: "Podem ser jogo físico vigoroso normal, diferente de agressão real."
  },
  {
    type: "Múltipla escolha",
    question: "A divisão gradual do controle entre pais e criança na terceira infância chama-se:",
    options: ["Punição indutiva", "Parentalidade autoritária", "Corregulação", "Condicionamento operante"],
    answer: 2,
    explanation: "Corregulação envolve supervisão parental e autorregulação crescente da criança."
  },
  {
    type: "Discursiva curta",
    question: "Como estilos parentais de Baumrind afetam o desenvolvimento?",
    options: ["Revelar resposta esperada"],
    answer: 0,
    explanation: "Afetam autoestima, limites e competência. O estilo autoritativo, com afeto e regras claras, costuma ser associado a melhores resultados no contexto ocidental."
  },
  {
    type: "Comparação",
    question: "Diferencie teste psicométrico tradicional e teste dinâmico em Vygotsky.",
    options: ["Revelar resposta esperada"],
    answer: 0,
    explanation: "O tradicional mede desempenho já consolidado; o dinâmico avalia potencial de aprendizagem com mediação."
  },
  {
    type: "Múltipla escolha",
    question: "Perder interesse após exposição repetida a um estímulo é:",
    options: ["Reforço positivo", "Habituação", "Condicionamento clássico", "Poda neural"],
    answer: 1,
    explanation: "Habituação é redução de resposta diante de estímulo familiar."
  },
  {
    type: "Verdadeiro ou falso",
    question: "Na terceira infância, pares têm pouca influência, pois a criança foca quase só nos pais.",
    options: ["Verdadeiro", "Falso"],
    answer: 1,
    explanation: "Pares tornam-se fundamentais para regras sociais, pertencimento e identidade."
  },
  {
    type: "Estudo de caso",
    question: "Um professor elogia João sempre dizendo 'você é muito inteligente'. Após nota ruim, o que pode ocorrer?",
    options: ["Revelar resposta esperada"],
    answer: 0,
    explanation: "João pode interpretar a falha como perda de inteligência. Elogiar esforço tende a favorecer persistência e motivação."
  },
  {
    type: "Múltipla escolha",
    question: "Por volta dos 7 anos, a criança integra características do eu em:",
    options: ["Reações circulares", "Discurso social", "Sistemas representacionais", "Causalidade indireta"],
    answer: 2,
    explanation: "Sistemas representacionais integram múltiplos aspectos do autoconceito."
  }
];
