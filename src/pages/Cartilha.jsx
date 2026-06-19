import { useState } from 'react'

const MODULES = [
  {
    id: 1, icon: '🔬', title: 'O que é a dependência ao tabaco', tag: 'Fundamentos',
    intro: 'Entender o inimigo é o primeiro passo para vencê-lo. O tabagismo não é fraqueza — é uma doença reconhecida pela OMS.',
    color: '#1A6B42', bg: '#DCF0E7',
    sections: [
      {
        title: 'Por que parar é tão difícil — a ciência explica',
        content: `O tabagismo é classificado pela OMS na CID-11 como transtorno por uso de substâncias — uma doença crônica real, não falta de força de vontade. O INCA estima que apenas 3% das pessoas conseguem parar sozinhas sem nenhum tipo de suporte. Isso não é fraqueza: é neurobiologia.

A nicotina é considerada uma das substâncias com maior potencial de dependência conhecidas, comparável à heroína em mecanismo de ação cerebral. Ela age em segundos e cria uma armadilha química sofisticada que dura anos.

No Brasil, são cerca de 25 milhões de fumantes ativos. 80% deles querem parar. A maioria tenta 8 a 10 vezes antes de conseguir. Cada tentativa aumenta o aprendizado e as chances de sucesso na próxima.`
      },
      {
        title: 'Os três pilares da dependência — você precisa combater todos',
        content: `DEPENDÊNCIA QUÍMICA (a mais imediata):
A nicotina chega ao cérebro em 7 segundos após a primeira tragada. Ela se liga a receptores de acetilcolina no núcleo accumbens — o centro de recompensa — e dispara uma cascata de dopamina, noradrenalina e serotonina. Com o uso repetido, o cérebro cria novos receptores nicotínicos (upregulation) para compensar o excesso de estimulação. Resultado: você precisa do cigarro só para se sentir normal. Sem ele, os receptores ficam sem estímulo — causando a abstinência.

DEPENDÊNCIA PSICOLÓGICA (a mais duradoura):
Após anos fumando, o cérebro cria associações automáticas entre o cigarro e situações cotidianas. Café da manhã, estresse, álcool, dirigir, após refeições — cada uma dessas situações foi "gravada" no cérebro junto com a sensação de alívio do cigarro. Esse condicionamento pode durar anos após parar e é o principal responsável pelas recaídas tardias.

DEPENDÊNCIA COMPORTAMENTAL (a mais subestimada):
O ritual em si — pegar o maço, tirar o cigarro, acender, segurar — vira um hábito motor independente. O corpo sente falta do movimento, não só da substância. É por isso que muitas pessoas sentem necessidade de "fazer algo com as mãos" quando param de fumar.`
      },
      {
        title: 'O modelo de Prochaska — em qual estágio você está?',
        content: `James Prochaska e Carlo DiClemente mapearam os estágios de mudança de comportamento — hoje usados pelo INCA em todos os programas de cessação:

1. PRÉ-CONTEMPLAÇÃO: "não penso em parar"
Fumante não vê o problema ou não acredita que consegue. Pressionar não funciona. O que ajuda: informação sem julgamento.

2. CONTEMPLAÇÃO: "penso em parar um dia"
Ambivalência — vê os custos mas não está pronto. O que ajuda: explorar motivações pessoais, aumentar a percepção dos benefícios.

3. PREPARAÇÃO: "estou me preparando para parar"
Fase crítica: definir data, estratégias e suporte. O que ajuda: plano concreto, retirada de cigarros do ambiente, comunicar a decisão.

4. AÇÃO: "parei de fumar"
Os primeiros 6 meses — os mais difíceis. O que ajuda: suporte contínuo, medicação se indicada, técnicas de enfrentamento.

5. MANUTENÇÃO: "continuo sem fumar há mais de 6 meses"
O risco de recaída ainda existe, especialmente em situações de estresse intenso. O que ajuda: identificar situações de risco e ter planos prontos.

6. RECAÍDA: parte natural do processo
A maioria das pessoas bem-sucedidas recaiu várias vezes antes do sucesso definitivo. Recaída não é fracasso — é aprendizado obrigatório.`
      },
      {
        title: 'Vozes de quem conseguiu — relatos reais de ex-fumantes brasileiros',
        content: `"Fumei dos 14 aos 35 anos, um maço por dia. Parei no dia em que minha mãe se aproximou e disse: filho, pare de fumar… por mim. Meu pai tinha falecido cinco anos antes por causa do cigarro. Fiquei com isso martelando na cabeça por uma semana até resolver parar." — fumante de Bauru, SP

"Mesmo após ter uma pneumonia, não parei — fumava escondida dentro do hospital. Quem é viciado sabe como é difícil. Só parei quando descobri que estava com DPOC e tossia 15 a 20 minutos após cada tragada. Percebi que estava me afastando das pessoas que amava." — Rita de Cássia, ex-fumante

"Faz 14 dias que estou sem fumar. Percebi que vivia nos dois lados: peguei toda a publicidade glamourosa do cigarro e depois todo o reverso. Minha consciência pediu para eu parar, passo a passo. Cada cigarro que eu fumava deixava uma culpa que virou mola propulsora." — ex-fumante anônimo

"Não fique no pé de quem fuma, não critique. Acolher e apoiar é o melhor caminho. Se a pessoa tentar e desistir, esteja ao lado. Quanto mais perguntas, mais a vontade de fumar se aproxima." — ex-fumante que virou conselheiro voluntário

LIÇÃO DOS RELATOS: O momento de virada é diferente para cada pessoa. Para alguns é uma doença, para outros é uma frase da família. Para você pode ser este app. O que importa é que o momento chegou.`
      }
    ]
  },
  {
    id: 2, icon: '🫁', title: 'O que o cigarro faz ao seu corpo', tag: 'Fisiologia',
    intro: 'O tabagismo é responsável por mais de 50 doenças. Cada órgão é afetado de uma forma diferente — e todos se recuperam quando você para.',
    color: '#E05C2A', bg: '#FFF0EB',
    sections: [
      {
        title: 'Os 5.000 venenos de cada cigarro',
        content: `Cada cigarro contém mais de 5.000 substâncias químicas identificadas. Cerca de 70 são cancerígenas comprovadas. Aqui estão as principais:

NICOTINA: a substância que cria a dependência. Age em 7 segundos. Aumenta pressão arterial, acelera batimentos cardíacos, causa vasoconstrição.

MONÓXIDO DE CARBONO (CO): tem afinidade 200x maior que o oxigênio pela hemoglobina. Fumantes literalmente transportam menos oxigênio no sangue. Causa cansaço crônico, falta de ar e pressão alta. Em 8 horas sem fumar, o CO cai pela metade.

ALCATRÃO: agente cancerígeno que se deposita nos pulmões, paralisa os cílios (a "vassoura" pulmonar) e causa a tosse do fumante. É o responsável pelos pulmões negros vistos em autópsias.

ARSÊNIO, BENZENO, FORMALDEÍDO: cancerígenos industriais presentes em pesticidas e produtos químicos. Cada tragada os introduz diretamente no seu sangue.

CIANETO DE HIDROGÊNIO: o mesmo veneno usado em câmaras de gás. Presente em cada cigarro.

AMÔNIA: acelera a absorção de nicotina pelo cérebro, tornando o cigarro mais viciante. A indústria adicionou amônia propositalmente.

RADIOATIVIDADE: o tabaco absorve polônio-210 do solo — um elemento radioativo. Fumantes de um maço por dia absorvem o equivalente a 300 radiografias por ano.`
      },
      {
        title: 'O cigarro órgão por órgão — o ataque é total',
        content: `PULMÕES: responsável por 80% dos casos de DPOC (doença pulmonar obstrutiva crônica), a segunda causa de mortalidade no mundo. O risco de câncer de pulmão é 15 a 30x maior em fumantes. Os cílios pulmonares são paralisados pelo alcatrão — sem eles, muco, bactérias e partículas ficam presos.

CORAÇÃO E VASOS: a nicotina causa vasoconstrição e aumenta o risco de infarto em 2 a 4x. O CO reduz o oxigênio no sangue. O tabagismo é responsável por 30% de todas as mortes por doenças cardiovasculares. Risco de AVC é 2 a 4x maior.

CÉREBRO: além da dependência, o cigarro aumenta risco de AVC, demência e comprometimento cognitivo. A nicotina afeta o desenvolvimento cerebral em jovens — por isso a OMS chama o tabagismo de doença pediátrica.

BOCA E GARGANTA: câncer de boca, laringe e faringe são até 15x mais comuns em fumantes. Problemas dentários, perda de osso maxilar, halitose crônica.

ESTÔMAGO E INTESTINO: aumenta risco de úlcera péptica, câncer de esôfago, estômago e pâncreas. A nicotina relaxa o esfíncter esofágico, causando refluxo crônico.

RIM E BEXIGA: substâncias cancerígenas filtradas pelos rins ficam em contato com a mucosa vesical. Risco de câncer de bexiga é 4x maior.

FERTILIDADE E SEXUALIDADE: homens fumantes têm maior risco de disfunção erétil (a nicotina compromete a circulação). Mulheres têm menopausa mais precoce e maior risco de complicações na gravidez.

PELE: a vasoconstrição crônica priva a pele de oxigênio e nutrientes. Fumantes envelhecem mais rápido — o fenômeno tem nome: "face do fumante". Cicatrização mais lenta após cirurgias.

O tabagismo mata mais de 8 milhões de pessoas por ano no mundo (OMS, 2023). No Brasil, são 443 mortes por dia — uma a cada 3 minutos.`
      },
      {
        title: 'O custo para o Brasil — e para você',
        content: `O Brasil gasta R$ 125 bilhões por ano para combater doenças ligadas ao cigarro (INCA, 2023). Esse é o custo do tratamento de câncer, doenças cardíacas, DPOC e outros problemas causados pelo tabagismo no SUS.

Traduzindo em números pessoais:
• Um fumante de 1 maço por dia gasta em média R$ 4.380 por ano só em cigarros
• Em 10 anos: R$ 43.800 — suficiente para um carro popular
• Em 20 anos: R$ 87.600 — suficiente para uma entrada de apartamento
• Cada cigarro custa em média 5 minutos de vida (CDC)
• Um maço por dia = 1h40 de vida perdida por dia = 25 dias por ano

E o custo invisível:
• Planos de saúde mais caros (algumas seguradoras cobram até 50% a mais de fumantes)
• Produtividade reduzida por doenças associadas
• Custos de tratamento de câncer, que podem ultrapassar R$ 100.000
• Impacto na renda por afastamentos do trabalho`
      },
      {
        title: 'A recuperação é real — o que muda quando você para',
        content: `20 minutos: pressão arterial e frequência cardíaca voltam ao normal
8 horas: monóxido de carbono no sangue cai à metade; oxigenação melhora
24 horas: risco de infarto começa a cair; CO quase normalizado
48 horas: terminações nervosas do olfato e paladar se regeneram — a comida vai ter outro sabor
72 horas: bronquíolos relaxam; respirar fica visivelmente mais fácil; nicotina sai completamente do corpo
2 semanas: circulação melhora significativamente; função pulmonar aumenta até 30%
1 a 9 meses: tosse diminui ou desaparece; cílios pulmonares se recuperam; risco de infecções cai
1 ano: risco de doença cardíaca coronária é metade do de um fumante ativo
2 anos: risco de infarto cai para próximo de não fumante
5 anos: risco de AVC igual ao de não fumante; risco de câncer de boca, garganta e esôfago cai pela metade
10 anos: risco de câncer de pulmão cai à metade; risco de câncer de bexiga, rim e pâncreas diminui
15 anos: risco de doença cardíaca igual ao de quem nunca fumou

Independentemente de quanto tempo você fumou, parar sempre vale a pena. Mesmo aos 60 anos, parar de fumar adiciona anos de vida com qualidade.`
      }
    ]
  },
  {
    id: 3, icon: '🧠', title: 'Psicologia e TCC — como a mente funciona', tag: 'Psicologia',
    intro: 'A Terapia Cognitivo-Comportamental tem a maior evidência científica para cessação do tabagismo. Entenda como ela funciona.',
    color: '#1A6B9A', bg: '#EAF4FB',
    sections: [
      {
        title: 'Por que a mente sabota — o condicionamento pavloviano',
        content: `Ivan Pavlov mostrou em 1890 que comportamentos podem ser condicionados a estímulos neutros. O que acontece com fumantes é exatamente isso, ao longo de anos:

Café da manhã + cigarro = prazer → o cérebro grava: "café = cigarro"
Estresse + cigarro = alívio → o cérebro grava: "estresse = cigarro"
Álcool + cigarro = prazer → o cérebro grava: "álcool = cigarro"
Após refeição + cigarro = relaxamento → "depois de comer = cigarro"

Após anos repetindo esses padrões, a associação torna-se automática e inconsciente. Você nem percebe o momento em que o desejo surge — ele simplesmente está lá, ativado pelo gatilho.

O simples cheiro de fumaça, ver alguém fumando, ou mesmo passar na frente de um local onde costumava fumar pode ativar o desejo. Isso não é fraqueza — é neuroplasticidade.

A boa notícia: assim como o cérebro aprendeu essas associações, ele pode desaprender. Mas leva tempo e exposição repetida sem a resposta esperada (o cigarro).`
      },
      {
        title: 'As crenças automáticas que mantêm o vício',
        content: `A TCC identifica pensamentos automáticos que sustentam o tabagismo. Conhecê-los é o primeiro passo para questioná-los:

"O cigarro me relaxa"
REALIDADE: A nicotina CAUSA a tensão que parece aliviar. Sem o cigarro, você sentiria menos ansiedade basal, não mais. O alívio que sente é apenas a abstinência sendo saciada — como tomar analgésico para uma dor que o próprio analgésico causou.

"Fumar me ajuda a concentrar"
REALIDADE: A nicotina não melhora cognição em não-fumantes. Em fumantes, ela apenas restaura a função cognitiva comprometida pela abstinência. Em 2-4 semanas sem fumar, a concentração volta ao normal — ou melhor.

"Só um não faz mal"
REALIDADE: Um cigarro é o suficiente para reativar os receptores nicotínicos e reiniciar o ciclo de dependência. Não existe "fumante social" para quem já foi dependente.

"Estou muito estressado para parar agora"
REALIDADE: Não existe momento perfeito. O estresse que você sente "precisando" fumar é em grande parte causado pela própria dependência. Parar reduz o estresse basal a médio prazo.

"Não consigo parar"
REALIDADE: Milhões de brasileiros pararam. Seu cérebro é neuroplástico — pode se reorganizar. O que você ainda não encontrou é a combinação certa de estratégias.

"Vou engordar"
REALIDADE: O ganho médio é de 2-4 kg temporários. Controlável com exercício moderado. Os benefícios de saúde superam em muito esse risco.`
      },
      {
        title: 'As 7 técnicas mais eficazes — protocolo INCA',
        content: `1. AUTOMONITORAMENTO
Registre cada cigarro que fuma: hora, local, emoção. Esse simples ato aumenta a consciência e reduz o consumo automaticamente. É o que você faz no Desfume.

2. RESPIRAÇÃO DIAFRAGMÁTICA (4-7-8)
A técnica mais citada por ex-fumantes como eficaz. Inspire 4s, segure 7s, expire 8s. Ativa o sistema nervoso parassimpático, reduzindo ansiedade em 60 segundos. Pratique 3x por dia — não só na crise.

3. CARTÕES DE ENFRENTAMENTO
Escreva seus motivos para parar em um cartão. Seja específico: "quero ver meus filhos se casar", não "quero saúde". Leia quando sentir fissura. Funciona porque ativa o córtex pré-frontal, que compete com o sistema de recompensa.

4. DISTRAÇÃO ATIVA
Mude de ambiente IMEDIATAMENTE ao sentir a fissura. Levante, vá a outro cômodo, ligue para alguém, faça 10 agachamentos. A mudança física interrompe o automatismo neural do gatilho.

5. REESTRUTURAÇÃO COGNITIVA
Identifique o pensamento automático ("preciso de um cigarro") e questione: "É verdade? Vou morrer sem esse cigarro? O que acontece se eu aguentar 3 minutos?"

6. RESOLUÇÃO DE PROBLEMAS
Antecipe situações difíceis. Para cada gatilho mapeado, crie um plano específico ANTES que aconteça. "Quando estiver no bar com amigos fumando, vou segurar um copo na mão e usar o botão de pânico."

7. SUPORTE SOCIAL
Dizer às pessoas próximas que está parando aumenta significativamente as chances de sucesso. O apoio social é protetor mesmo que as pessoas não façam nada — só saber que alguém está torcendo por você já ajuda.`
      },
      {
        title: 'O papel das emoções — o triângulo CBA',
        content: `A TCC usa o modelo ABC para entender como pensamentos e emoções se conectam ao comportamento:

A — ANTECEDENTE (gatilho): o café da manhã
B — BELIEFS (crença): "depois do café, sempre fumo um cigarro"
C — CONSEQUENCE (consequência): acende o cigarro automaticamente

A intervenção acontece em B — questionando a crença antes de chegar em C.

EMOÇÕES DE RISCO — o modelo HALT:
Hungry (com fome) — o desconforto da fome ativa o sistema de recompensa
Angry (com raiva) — emoções negativas intensas aumentam a fissura
Lonely (solitário) — isolamento é um dos maiores gatilhos de recaída
Tired (cansado) — a fadiga reduz a capacidade de autorregulação

Quando sentir qualquer dessas quatro emoções, eleve o nível de alerta. Não é o momento de "só um".

MANEJO DA TRISTEZA E ANSIEDADE:
O cigarro nunca resolveu um problema real — ele adiou e complicou. Para tristeza: exercício físico tem evidência forte como antidepressivo natural. Para ansiedade: respiração 4-7-8, exposição gradual a situações temidas, técnicas de atenção plena.`
      }
    ]
  },
  {
    id: 4, icon: '💊', title: 'Tratamento farmacológico', tag: 'Medicamentos',
    intro: 'O uso de medicamentos aumenta em até 3x as chances de parar com sucesso. Entenda as opções disponíveis gratuitamente no SUS.',
    color: '#C47E00', bg: '#FFFBEB',
    sections: [
      {
        title: 'Por que medicamentos ajudam — a base científica',
        content: `Estudos consolidados mostram que:
• Apenas TCC (sem medicação): taxa de sucesso em 1 ano de ~10-15%
• TCC + TRN (adesivos/gomas): ~25-30%
• TCC + Bupropiona: ~30-35%
• TCC + Vareniclina: ~35-45%
• TCC + combinação de medicações: até 50%+

Isso não significa que medicamentos são obrigatórios. Significa que, quanto maior a dependência física (Fagerström ≥5), maiores os benefícios de combinar tratamentos.

IMPORTANTE: Todos esses medicamentos estão disponíveis gratuitamente pelo SUS no Programa Nacional de Controle do Tabagismo. Procure sua UBS com CPF e diga que quer parar de fumar.`
      },
      {
        title: 'Terapia de Reposição de Nicotina (TRN)',
        content: `A TRN fornece nicotina sem os outros 4.999 compostos do cigarro, reduzindo os sintomas de abstinência enquanto você trabalha os aspectos psicológicos e comportamentais.

ADESIVO DE NICOTINA (Nicoderm, genéricos):
Como funciona: liberação lenta e constante de nicotina pela pele. Reduz a ansiedade basal sem picos.
Como usar: aplique em área sem pelos (braço, ombro, costas). Troque de local diariamente. Durações: 24h ou 16h.
Doses: 21mg → 14mg → 7mg (redução gradual em 8-12 semanas).
Efeitos adversos: irritação local, sonhos vívidos (se usar à noite).

GOMA DE NICOTINA (Nicorette, genéricos):
Como funciona: TRN de ação rápida. Use no momento da fissura.
Como usar: mastigue lentamente até sentir formigamento na boca, depois "estacione" entre bochecha e gengiva. NÃO mastigue continuamente — reduz absorção.
Quando usar: em situações de gatilho ou fissura intensa.

PASTILHA DE NICOTINA:
Dissolve lentamente na boca. Não mastigar. Boa opção para quem não gosta de gomas. Mesma lógica: use na fissura.

COMBINAÇÃO TRN: adesivo (controle basal) + goma/pastilha (resgate na crise) é mais eficaz que qualquer um isolado.`
      },
      {
        title: 'Bupropiona — o antidepressivo que ajuda a parar',
        content: `A bupropiona foi o primeiro medicamento não-nicotínico aprovado para cessação do tabagismo. Originalmente desenvolvida como antidepressivo, descobriu-se que reduzia significativamente o desejo de fumar.

COMO FUNCIONA: inibe a recaptação de dopamina e noradrenalina, compensando parcialmente a queda desses neurotransmissores durante a abstinência. Também bloqueia receptores nicotínicos.

COMO USAR:
• Dose inicial: 150mg/dia por 3 dias
• Dose de manutenção: 150mg 2x/dia (manhã e tarde — não à noite)
• Iniciar 1-2 semanas ANTES da data de parada
• Duração: 7 a 12 semanas
• Disponível gratuitamente no SUS

EFICÁCIA: dobra as chances de parar comparado a placebo.

EFEITOS ADVERSOS COMUNS: boca seca, insônia, cefaleia. Raramente: convulsões (contraindicado em epilepsia, transtornos alimentares).

CONTRAINDICAÇÕES: histórico de convulsões, transtorno bipolar não controlado, uso de IMAOs. Necessita prescrição médica.`
      },
      {
        title: 'Vareniclina (Champix) — a mais eficaz das opções',
        content: `A vareniclina é considerada a farmacoterapia mais eficaz disponível para cessação do tabagismo. Aumenta em 2-3x as chances de parar comparado a placebo.

COMO FUNCIONA: agonista parcial dos receptores nicotínicos α4β2. Age de duas formas simultâneas:
1. Ativa parcialmente os receptores → reduz sintomas de abstinência
2. Bloqueia a nicotina de se ligar completamente → reduz o prazer de fumar

Resultado: você ainda pode fumar durante os primeiros dias, mas vai achar o cigarro menos prazeroso.

COMO USAR:
• Semana 1: 0,5mg/dia (3 dias) → 0,5mg 2x/dia (4 dias)
• Semana 2 em diante: 1mg 2x/dia
• Data de parada: entre a 1ª e 2ª semana de tratamento
• Duração: 12 semanas (pode estender por mais 12 para maior segurança)

EFEITOS ADVERSOS: náusea (mais comum, diminui com o tempo), sonhos vívidos, insônia. Tomar com comida e água reduz a náusea.

IMPORTANTE: A vareniclina tem histórico de alertas sobre alterações de humor. Avise seu médico sobre qualquer histórico de depressão ou transtornos psiquiátricos. Necessita prescrição médica.

Disponível gratuitamente no SUS para fumantes com indicação médica.`
      }
    ]
  },
  {
    id: 5, icon: '🛡️', title: 'Prevenção de recaída', tag: 'Manutenção',
    intro: 'A maioria das recaídas acontece nos primeiros 6 meses. Conhecer os padrões é a melhor defesa.',
    color: '#7C3AED', bg: '#F5F3FF',
    sections: [
      {
        title: 'Por que as recaídas acontecem — os padrões mais comuns',
        content: `Pesquisas com ex-fumantes que recaíram identificaram os cenários mais comuns:

1. SITUAÇÕES SOCIAIS COM ÁLCOOL (40% das recaídas)
O álcool reduz a inibição, diminui a atividade do córtex pré-frontal (a parte "racional" do cérebro) e ativa fortemente memórias associativas. Uma cerveja com amigos fumantes é a situação de maior risco.

2. ESTRESSE INTENSO E INESPERADO (25%)
Morte de familiar, demissão, separação, acidente. O sistema límbico (emocional) sobrepõe o córtex pré-frontal. Planeje com antecedência: "se algo muito difícil acontecer, vou fazer X em vez de fumar."

3. O PENSAMENTO "SÓ UM" (20%)
"Faz 3 meses que não fumo, já posso fumar um na festa." Um cigarro reativa os receptores nicotínicos imediatamente. A recaída total ocorre em 95% das vezes após o "só um".

4. TÉDIO E SOLIDÃO (10%)
Ambientes novos, férias, mudança de rotina sem estrutura. O vício preenchia o tempo. Planeje atividades substitutivas.

5. PRAZO DOS 4 MESES (alta incidência documentada)
Estudos brasileiros mostram pico de recaída no quarto mês — quando o fumante se sente "seguro" mas o cérebro ainda está se reconfigurando. Não baixe a guarda antes de 1 ano.`
      },
      {
        title: 'O plano de crise — construa o seu agora',
        content: `A diferença entre quem mantém a cessação e quem recai geralmente está no preparo prévio, não na força de vontade.

CONSTRUA SEU PLANO DE CRISE:

1. Liste seus 3 principais gatilhos (use a aba Testes)
2. Para cada gatilho, defina UMA ação alternativa específica:
   → Gatilho: café da manhã | Ação: trocar por chá verde por 30 dias
   → Gatilho: estresse no trabalho | Ação: 5 respirações 4-7-8 antes de qualquer reação
   → Gatilho: bebida com amigos | Ação: avisar antecipadamente que parei, segurar copo na mão

3. Tenha uma frase âncora — repita quando vier a fissura:
"Essa fissura vai passar em 3 minutos. Sempre passa. Eu já provei isso antes."

4. Liste 3 pessoas que você pode ligar agora mesmo:
   → Nome 1: ___
   → Nome 2: ___
   → Nome 3: ___

5. Remova os cigarros do ambiente — isqueiros, cinzeiros, maços escondidos.

6. Mude sua rota se necessário — evite a banca, o boteco, os locais onde comprava.`
      },
      {
        title: 'Se houve recaída — o protocolo correto',
        content: `Recaída não é o fim. É parte documentada e esperada do processo de cessação. O que você faz DEPOIS é o que determina se foi um deslize ou uma volta ao vício.

PROTOCOLO PÓS-RECAÍDA:

1. NÃO CATASTROFIZE
"Fumei um cigarro, então já era" → armadilha do "tudo ou nada". Um cigarro é um deslize. Voltar a fumar um maço por dia é uma recaída. São coisas diferentes.

2. REGISTRE NO APP (imediatamente)
Honestidade é essencial. Registrar e reiniciar o contador não é punição — é dados para aprender.

3. ANALISE O QUE ACONTECEU (nas próximas 24 horas)
Qual foi o gatilho? Qual a emoção? Qual o contexto? O que você estava pensando? Havia álcool envolvido? Você estava no modelo HALT?

4. RETOME IMEDIATAMENTE
Não espere segunda-feira, não espere "o momento certo". O próximo cigarro não é inevitável — é uma escolha. Faça a escolha diferente agora.

5. AJUSTE O PLANO
O que você vai fazer diferente na próxima vez que esse gatilho aparecer? Seja específico.

Estudos mostram que ex-fumantes bem-sucedidos usaram suas recaídas como aprendizado e retomaram mais preparados. Recaída com análise é um investimento, não um fracasso.`
      },
      {
        title: 'Construindo a identidade de não fumante',
        content: `A última e mais poderosa transformação: deixar de ser "um fumante que está tentando parar" e tornar-se "uma pessoa que não fuma".

A diferença é fundamental. Pesquisas de psicologia comportamental mostram que:

"Estou tentando parar de fumar" → foco na privação, no esforço, no que está perdendo
"Eu não fumo" → foco na identidade, em quem você é, não no que você está evitando

COMO CONSTRUIR ESSA IDENTIDADE:

Linguagem: substitua "não posso fumar" por "não fumo". A primeira é uma limitação externa, a segunda é uma escolha.

Narrativa: quando alguém oferecer um cigarro, diga "obrigado, não fumo" — não "estou tentando parar". Quem está tentando pode ceder. Quem não fuma, simplesmente não fuma.

Identidade social: diga às pessoas ao seu redor que você é um não fumante. Compromisso público ativa o senso de consistência.

Recompensas: celebre explicitamente cada conquista. Um dia, uma semana, um mês. Você está se tornando uma pessoa diferente — isso merece reconhecimento.

Paciência: a identidade de não fumante leva de 6 meses a 2 anos para se consolidar completamente. É normal ter momentos de nostalgia. Eles passam.`
      }
    ]
  },
  {
    id: 6, icon: '🌱', title: 'A vida após o cigarro', tag: 'Benefícios',
    intro: 'Parar de fumar não é apenas evitar doenças — é ganhar uma vida completamente diferente.',
    color: '#1A6B42', bg: '#DCF0E7',
    sections: [
      {
        title: 'O que você vai notar nos primeiros dias',
        content: `DIAS 1-3 (a abstinência física):
Os mais difíceis. Irritabilidade, ansiedade, dificuldade de concentração, aumento do apetite e insônia são normais. A nicotina sai completamente do corpo em 72 horas. O que você sente é o cérebro se reorganizando — não está piorando, está se curando.

Estratégias para esses dias:
→ Beba muita água — ajuda a eliminar toxinas e substitui o ritual de "fazer algo com a boca"
→ Coma frutas, especialmente as cítricas — vitamina C ajuda na eliminação de nicotina
→ Evite café e álcool nos primeiros dias — ativam gatilhos
→ Diga às pessoas ao seu redor que você pode estar irritado — peça paciência
→ Use o botão de pânico do Desfume sempre que sentir fissura

DIAS 4-14 (a reorganização):
A abstinência física começa a ceder. Surgem os desafios psicológicos: "falta algo", "quando vou parar de pensar no cigarro?". Normal. Continue.

Boas notícias dessa fase:
→ Em 48h você já sente o cheiro das coisas melhor
→ Em 72h respirar fica notavelmente mais fácil
→ A comida começa a ter sabores que você esqueceu`
      },
      {
        title: 'Os ganhos que ninguém conta',
        content: `Além dos benefícios de saúde, ex-fumantes relatam consistentemente:

OLFATO E PALADAR TRANSFORMADOS
"Foi como acordar de um sonho. A comida tem um sabor completamente diferente. Flores, perfumes, o cheiro de chuva — coisas que eu havia perdido." A regeneração começa em 48h e continua por meses.

ENERGIA E DISPOSIÇÃO
O CO deixa de bloquear o oxigênio. Em 2-4 semanas, muitos relatam energia que não sentiam há anos. Subir escadas sem ficar sem ar. Jogar com os filhos sem cansar.

SONO DE QUALIDADE
A nicotina é estimulante e fragmenta o sono. Sem ela, o sono torna-se mais profundo e reparador. As primeiras semanas podem ser difíceis, mas melhora consistentemente.

PELE E APARÊNCIA
Com mais oxigênio e nutrientes chegando à pele, o envelhecimento desacelera. Muitos notam a pele mais hidratada e corada em 1-2 meses.

DINHEIRO NO BOLSO
R$ 300 a R$ 500 extras por mês. Em 1 ano: suficiente para uma viagem. Em 5 anos: suficiente para um carro usado.

LIBERDADE
Ex-fumantes frequentemente citam a liberdade como o benefício mais subestimado. Não precisar sair no frio. Não interromper conversas. Não planejar viagens pensando em "onde vou fumar". Não se sentir constrangido. Não depender de uma substância para funcionar.

EXEMPLO PARA OS FILHOS
Pesquisas mostram que filhos de fumantes têm 3x mais chance de se tornar fumantes. Cada dia sem fumar é uma proteção real para quem você ama.`
      },
      {
        title: 'Lidando com o ganho de peso — sem catastrofizar',
        content: `O ganho de peso é uma preocupação legítima e comum. A realidade:

O QUE ACONTECE: a nicotina suprimia o apetite e acelerava o metabolismo em ~200 kcal/dia. Sem ela, o apetite aumenta e o metabolismo desacelera temporariamente. O ganho médio documentado é de 2-4 kg nos primeiros 3-6 meses.

POR QUE NÃO É CATÁSTROFE:
→ Os benefícios de parar de fumar superam enormemente os riscos de 2-4 kg
→ É temporário — o metabolismo se estabiliza em 6-12 meses
→ Exercício físico resolve simultaneamente o ganho de peso E reduz a fissura

ESTRATÉGIAS PRÁTICAS:
→ Tenha lanches saudáveis sempre disponíveis (cenoura, maçã, castanhas)
→ Beba água antes das refeições
→ Coma em horários regulares para evitar picos de fome
→ Substitua o cigarro por caminhadas de 10 minutos — exercício libera dopamina naturalmente
→ Mastigue chiclete sem açúcar para satisfazer a necessidade oral

NÃO faça dieta restritiva ao mesmo tempo que para de fumar. É muito estresse para o organismo. Um objetivo por vez.`
      },
      {
        title: 'Exercício físico — o aliado subestimado',
        content: `O exercício físico tem evidência científica sólida como suporte à cessação do tabagismo. Não é apenas sobre peso.

COMO FUNCIONA:
→ 5 minutos de caminhada moderada reduzem a fissura tão eficazmente quanto um cigarro (estudos da University of Exeter, 2012)
→ O exercício libera dopamina e endorfinas — os mesmos neurotransmissores que o cigarro ativava
→ Reduz ansiedade e estresse — os principais gatilhos
→ Melhora o humor e a qualidade do sono
→ Ocupa o tempo que antes era de cigarro

COMEÇANDO DO ZERO:
Não precisa de academia. Comece com 10 minutos de caminhada quando sentir fissura. Vá aumentando gradualmente. A função pulmonar melhora notavelmente nas primeiras semanas — você vai sentir a diferença.

META REALISTA: 30 minutos de caminhada por dia é suficiente para ter benefícios documentados tanto para a cessação quanto para o ganho de peso.

PARA OS MAIS AVANÇADOS: corrida, ciclismo, natação e musculação têm benefícios adicionais. Muitos ex-fumantes relatam que se tornaram ativos fisicamente DEPOIS de parar — como se precisassem "fazer algo" com a energia recuperada.`
      }
    ]
  },
  {
    id: 7, icon: '🤝', title: 'Apoio, recursos e próximos passos', tag: 'Suporte',
    intro: 'Você não precisa fazer isso sozinho. Existe uma rede de suporte gratuita e eficaz no Brasil.',
    color: '#DC2626', bg: '#FEF2F2',
    sections: [
      {
        title: 'O que a pesquisa diz sobre suporte social',
        content: `Estudos consistentemente mostram que suporte social é um dos preditores mais fortes de cessação bem-sucedida:

→ Fumantes com pelo menos uma pessoa de apoio têm 2x mais chance de parar
→ Participar de grupos de cessação aumenta as taxas de sucesso em 70% comparado a tentativas individuais
→ Apenas 37% dos fumantes que tentam parar informam alguém — um erro estratégico

O suporte não precisa ser especializado. Alguém que:
→ Não ofereça cigarros
→ Não faça julgamentos sobre recaídas
→ Esteja disponível para uma ligação quando a fissura for intensa
→ Comemore as conquistas com você

...já faz uma diferença enorme.

SOBRE FAMILIARES QUE FUMAM:
Se você vive com fumantes, converse com eles antes. Peça que não fumem na sua presença, pelo menos nos primeiros 3 meses. Não é exigência — é sobrevivência.`
      },
      {
        title: 'Recursos gratuitos no Brasil',
        content: `SISTEMA ÚNICO DE SAÚDE (SUS):
O Programa Nacional de Controle do Tabagismo oferece gratuitamente:
→ Consultas com equipe multiprofissional
→ Grupos de cessação presenciais
→ Bupropiona, vareniclina e TRN (com indicação médica)
→ Acompanhamento por até 1 ano

COMO ACESSAR: vá à sua UBS (Unidade Básica de Saúde) com CPF e diga que quer participar do programa de cessação do tabagismo. Se não houver grupo na sua UBS, pergunte sobre encaminhamento.

DISQUE SAÚDE: 136
Linha gratuita do Ministério da Saúde com informações sobre tabagismo e encaminhamento para serviços locais.

INCA (Instituto Nacional de Câncer):
→ Site: inca.gov.br/controle-do-tabagismo
→ Materiais educativos, encontre serviços na sua cidade

GRUPOS DE APOIO ONLINE:
→ Comunidades no Reddit (r/stopsmoking — em inglês) com milhares de relatos
→ Grupos no Facebook específicos para cessação do tabagismo no Brasil
→ Alcoólicos Anônimos tem programa paralelo para tabagismo em algumas cidades`
      },
      {
        title: 'Seu plano de ação — as próximas 48 horas',
        content: `Conhecimento sem ação não muda nada. Aqui está o que fazer nas próximas 48 horas:

HOJE:
1. Defina uma data de parada — preferencialmente nos próximos 7 dias. Anote no Desfume.
2. Complete os testes de Fagerström e Richmond na aba Testes.
3. Mapeie seus 3 principais gatilhos na aba Testes → Gatilhos.
4. Diga para pelo menos 1 pessoa próxima que você vai parar. Hoje.

AMANHÃ:
5. Se Fagerström ≥ 5: marque consulta na sua UBS para avaliar medicação.
6. Remova os cigarros, isqueiros e cinzeiros do seu ambiente.
7. Compre lanches saudáveis para substituir o cigarro.
8. Instale o Desfume na tela inicial do seu celular (botão compartilhar → adicionar à tela inicial).

NA DATA DE PARADA:
9. Fume o último cigarro com consciência — diga a si mesmo que é o último.
10. Use o app TODA VEZ que sentir fissura — não só quando for grave.
11. Beba 2-3L de água no primeiro dia.
12. Durma mais cedo se possível — a fadiga reduz a resistência.

LEMBRE-SE:
A maioria das fissuras dura menos de 3 minutos.
Você já aguentou cada uma das fissuras que já teve — todas passaram.
Cada cigarro que você não fuma é uma vitória real e mensurável.
O Desfume foi feito para ser seu parceiro nessa jornada — use todos os recursos.`
      },
      {
        title: 'Para quem vive com um fumante — como ajudar de verdade',
        content: `Se você está lendo isso para ajudar alguém que fuma, aqui está o que a pesquisa diz sobre o que funciona:

O QUE AJUDA:
→ Expressar apoio sem pressão: "estou aqui se precisar, no seu tempo"
→ Não fumar na presença da pessoa quando ela pedir
→ Celebrar conquistas explicitamente: "que orgulho, uma semana!"
→ Estar disponível para ligações durante fissuras
→ Não perguntar o tempo todo "você ainda está sem fumar?" — aumenta a pressão e, paradoxalmente, a vontade

O QUE NÃO AJUDA (e muitas vezes piora):
→ Pressionar, cobrar, fazer ultimatos
→ Comentários negativos sobre recaídas: "sabia que você não ia conseguir"
→ Esconder ou jogar fora cigarros sem permissão
→ Fazer a cessação parecer fácil: "é só ter força de vontade"

A pesquisa mostra que a crítica e o julgamento são fatores de risco para recaída — não de proteção. Quem para de fumar precisa de encorajamento, não de pressão.

SE VOCÊ TAMBÉM FUMA:
Parar juntos aumenta as chances de ambos. Mas tenha cuidado: se um recair, o outro tende a recair também. Planeje para essa possibilidade.`
      }
    ]
  }

  ,
  {
    id: 8, icon: '🧘', title: 'Mindfulness e ACT — a terceira onda', tag: 'Novas terapias',
    intro: 'Além da TCC, duas abordagens baseadas em evidências estão transformando o tratamento do tabagismo: Mindfulness e Terapia de Aceitação e Compromisso.',
    color: '#7C3AED', bg: '#F5F3FF',
    sections: [
      {
        title: 'O que é Mindfulness aplicado ao tabagismo',
        content: `Mindfulness — atenção plena — é a prática de observar pensamentos, emoções e sensações físicas no momento presente, sem julgamento. Para fumantes, essa habilidade é revolucionária porque a maioria dos cigarros é fumada no "piloto automático" — sem consciência real.

O programa MTS (Mindfulness Training for Smokers), desenvolvido na Universidade de Wisconsin, mostrou que fumantes treinados em mindfulness têm maior taxa de abstinência semanas após o tratamento do que aqueles que usaram apenas TCC ou quitline (Davis et al., 2014).

COMO O MINDFULNESS AJUDA:

1. SURFAR A FISSURA (Urge Surfing):
Em vez de lutar contra a fissura ou ceder a ela, você a observa como uma onda. Ela surge, cresce, atinge o pico e diminui — sempre. Você não precisa fazer nada. Apenas observar.

Técnica: quando sentir fissura, pause. Observe onde ela está no corpo (aperto no peito? tensão na garganta?). Dê um nome: "isso é uma fissura". Observe sem reagir. Em 3 minutos, ela começa a diminuir.

2. DESFUSÃO COGNITIVA:
Quando o pensamento "preciso de um cigarro" aparecer, não o trate como um comando. Trate como um evento mental: "estou tendo o pensamento de que preciso de um cigarro." A simples mudança de linguagem cria distância entre você e o impulso.

3. ATENÇÃO PLENA NO ATO DE FUMAR:
Paradoxalmente, uma técnica usada no início do tratamento é fumar com total atenção — sem celular, sem distração. Muitos fumantes relatam que, ao realmente prestar atenção no sabor, cheiro e sensações, o cigarro perde muito do apelo.`
      },
      {
        title: 'ACT — Terapia de Aceitação e Compromisso',
        content: `A ACT (Acceptance and Commitment Therapy) é uma das abordagens com crescente evidência para cessação tabágica. Revisão sistemática publicada em 2026 na Revista Portuguesa de Psiquiatria sugere benefícios especialmente na aceitação dos cravings e na associação entre maior aceitação e abstinência.

OS 6 PROCESSOS DA ACT PARA FUMANTES:

1. ACEITAÇÃO: aceitar que a fissura existe, que é desconfortável, sem precisar eliminá-la imediatamente. "Eu posso ter essa fissura e ainda escolher não fumar."

2. DESFUSÃO: separar-se dos pensamentos. "Minha mente está me dizendo para fumar" — não "eu preciso fumar."

3. MOMENTO PRESENTE: focar no agora, não no "e se eu fumar amanhã" ou "não consigo ficar sem fumar para sempre." Apenas: "não fumo neste momento."

4. EU OBSERVADOR: você é mais do que seus pensamentos e impulsos. Existe um "eu" que observa a fissura, mas não é a fissura.

5. VALORES: conectar a decisão de parar com seus valores mais profundos. Não "devo parar" mas "parar está alinhado com quem eu quero ser e o que importa para mim."

6. AÇÃO COMPROMETIDA: agir de acordo com seus valores mesmo quando a fissura está presente. "Mesmo sentindo vontade de fumar, vou agir como a pessoa que escolhi ser."

EXERCÍCIO PRÁTICO — A METÁFORA DO ÔNIBUS:
Imagine que você é o motorista de um ônibus e os passageiros são seus pensamentos e impulsos. Os passageiros (fissura, memórias do cigarro) podem fazer barulho, ameaçar, pedir para parar. Mas você é o motorista — você decide para onde vai. Os passageiros não controlam o volante.`
      },
      {
        title: 'Exercícios práticos de atenção plena para o dia a dia',
        content: `Esses exercícios foram extraídos de programas validados de cessação baseados em mindfulness. Pratique diariamente, não só na crise.

EXERCÍCIO 1 — RESPIRAÇÃO ÂNCORA (5 minutos, manhã)
Sente-se confortavelmente. Feche os olhos. Foque apenas na sensação do ar entrando e saindo pelas narinas. Quando a mente divagar (e vai), gentilmente traga de volta para a respiração. Sem julgamento. Apenas observando. Faça por 5 minutos.

Por que funciona: treine o músculo da atenção — o mesmo músculo que você vai usar para redirecionar o foco durante a fissura.

EXERCÍCIO 2 — SCAN CORPORAL (10 minutos, antes de dormir)
Deite. Lentamente, mova a atenção da cabeça até os pés, observando as sensações em cada parte do corpo. Sem tentar mudar nada. Apenas observar. Quando chegar à área do peito (onde muitos sentem a fissura), observe sem reagir.

EXERCÍCIO 3 — URGE SURFING (quando sentir fissura)
1. Pare o que está fazendo
2. Observe: onde no corpo você sente a fissura? Que formato tem? Que temperatura?
3. Imagine que a fissura é uma onda no oceano
4. Você está em cima da onda, surfando — não lutando, não cedendo
5. Observe a onda crescer, atingir o pico, e começar a diminuir
6. Repita mentalmente: "isso é temporário, vou deixar passar"

EXERCÍCIO 4 — PAUSA RAISIN (3 minutos)
Pegue uma passa de uva (ou qualquer alimento pequeno). Observe-a por 30 segundos como se nunca tivesse visto antes. Sinta o peso na palma. Cheire. Coloque na boca sem mastigar. Sinta a textura. Então mastigue lentamente, com total atenção.

Por que funciona: reativa a capacidade de sentir prazer em coisas simples — a mesma capacidade que o cigarro havia embotado.`
      },
      {
        title: 'Como integrar com o que você já está fazendo',
        content: `Mindfulness e ACT não substituem a TCC ou os medicamentos — elas complementam. O conjunto ideal:

TCC + ACT/Mindfulness + Medicação (se indicada) = maiores taxas de sucesso

QUANDO USAR CADA ABORDAGEM:

Durante fissuras intensas: Urge Surfing (observe sem reagir) + respiração 4-7-8
Quando pensamentos automáticos aparecerem: Desfusão cognitiva ("minha mente está dizendo X")
Quando a motivação cair: Valores (por que isso importa para mim?)
Quando houver recaída: Autocompaixão (sem julgamento, com análise)
Diariamente: 5 min de respiração âncora pela manhã

APLICATIVOS DE MINDFULNESS QUE AJUDAM:
Headspace, Calm e Insight Timer têm meditações específicas para cessação do tabagismo e controle de impulsos. Use como complemento ao Desfume.

EVIDÊNCIAS: Revisão de 2020 na Revista Brasileira de Terapias Cognitivas mostra que mindfulness aplicado a substâncias aumenta a flexibilidade psicológica — a capacidade de agir de acordo com valores mesmo na presença de impulsos — que é o fator mais preditivo de sucesso a longo prazo.`
      }
    ]
  },
  {
    id: 9, icon: '📱', title: 'O que a ciência diz sobre apps de cessação', tag: 'Tecnologia',
    intro: 'Pesquisas de 2022 a 2024 analisaram o que realmente funciona — e o que atrapalha — em apps para parar de fumar.',
    color: '#1A6B9A', bg: '#EAF4FB',
    sections: [
      {
        title: 'O que os usuários mais valorizam (pesquisa PLOS 2024)',
        content: `Estudo publicado no PLOS Digital Health (novembro 2024) entrevistou 38 fumantes sobre experiências com apps de cessação. Os achados mostram o que de fato faz diferença:

O QUE FUNCIONA MAIS:

1. AUTO-MONITORAMENTO CONFIÁVEL
Usuários querem que o registro de cigarros seja fácil e preciso. O que importa: rapidez do registro, histórico visível, gráficos que mostram tendência ao longo do tempo — não apenas hoje.

2. FEEDBACK PERSONALIZADO E OPORTUNO
Mensagens genéricas ("você está indo bem!") são ignoradas. O que engaja: feedback baseado nos dados reais do usuário ("você fumou 3 cigarros a menos que ontem"), notificações no momento certo, e reconhecimento de marcos específicos.

3. CONTEÚDO EDUCATIVO SOB DEMANDA
Usuários não querem ser bombardeados com informação. Querem ter acesso quando precisam — especialmente no momento da fissura ou após uma recaída.

4. PERSONALIZAÇÃO DO PLANO
Apps altamente personalizáveis têm maior engajamento. Poder definir a meta, o ritmo de redução e as estratégias preferidas aumenta a sensação de controle.

O QUE ATRAPALHA:

→ Conteúdo repetitivo: as mesmas dicas aparecendo sempre cansam o usuário
→ Interface complexa: se registrar um cigarro demora mais de 2 toques, o usuário abandona
→ Excesso de notificações: perturbam e são ignoradas — menos é mais
→ Falta de resposta a recaídas: apps que "reiniciam tudo" após uma recaída geram frustração`
      },
      {
        title: 'O que usuários pedem que ainda não existe na maioria dos apps',
        content: `Análise de 1.414 avaliações de apps de cessação (PubMed, 2022) identificou os pedidos mais frequentes de usuários:

OS 5 PEDIDOS MAIS COMUNS:

1. SUPORTE HUMANO REAL
A maioria dos apps é automática. Usuários querem poder falar com alguém — um profissional, um coach, ou pelo menos uma comunidade de pessoas no mesmo processo. "Quero saber que não estou sozinho."

2. MODO REDUÇÃO GRADUAL (não só parada imediata)
A maioria dos apps assume parada total. Usuários querem reduzir gradualmente — e ter um app que apoie essa abordagem sem tratar como "fracasso." Evidências mostram que redução gradual tem taxas de sucesso semelhantes à parada imediata.

3. INTEGRAÇÃO COM WEARABLES
Monitorar frequência cardíaca, sono e nível de stress em tempo real para correlacionar com o consumo. Fumantes querem ver objetivamente como o cigarro afeta seu corpo.

4. SESSÕES DE ÁUDIO GUIADO
Meditações, hipnose guiada e exercícios de respiração em áudio foram os recursos mais elogiados quando presentes. Usuários agradecem explicitamente — e os recomendam como o diferencial do app.

5. COMUNIDADE E GAMIFICAÇÃO SOCIAL
Rankings, desafios entre amigos, conquistas compartilháveis. A dimensão social aumenta o comprometimento e a motivação. Saber que outras pessoas estão na mesma jornada reduz o isolamento.`
      },
      {
        title: 'Como usar o Desfume de forma mais eficaz',
        content: `Com base nas pesquisas sobre o que funciona, aqui estão as práticas que maximizam o seu sucesso com o app:

USE O REGISTRO DE CIGARROS COMO FERRAMENTA, NÃO PUNIÇÃO
O objetivo não é "não errar" — é ter dados. Cada cigarro registrado honestamente é informação valiosa sobre seus padrões. Usuários que registram consistentemente têm melhores resultados do que os que só registram quando estão "bem."

OLHE O GRÁFICO DE 14 DIAS SEMANALMENTE
Não diariamente — isso pode causar ansiedade. Uma vez por semana, olhe a tendência. Está diminuindo? Mantenha. Está subindo? Identifique o que mudou nessa semana.

USE O BOTÃO DE PÂNICO ANTES DE CEDER, NÃO DEPOIS
A maioria dos usuários aperta o botão de pânico depois de já ter fumado. Ele foi projetado para ser usado DURANTE a fissura, antes da decisão. Três minutos de qualquer das estratégias é suficiente para a fissura passar.

AJUSTE A META E O INTERVALO A CADA SEMANA
O app foi construído para acompanhar sua evolução. Se você manteve o intervalo de 1h por uma semana inteira, aumente para 1h30. Se a meta de 15 cigarros está fácil, reduza para 12. Progresso incremental é mais sustentável que mudanças radicais.

COMPLETE OS MÓDULOS DO GUIA AOS POUCOS
Pesquisas mostram que conteúdo educativo consumido aos poucos (não de uma vez) tem melhor retenção. Um módulo por semana é mais eficaz do que ler tudo em um dia.`
      }
    ]
  },
  {
    id: 10, icon: '🌍', title: 'Tabagismo no Brasil — dados e contexto', tag: 'Contexto',
    intro: 'Entender o cenário nacional ajuda a perceber que você não está sozinho e que existem recursos públicos disponíveis.',
    color: '#1A6B42', bg: '#DCF0E7',
    sections: [
      {
        title: 'O Brasil e o cigarro — onde estamos',
        content: `O Brasil é considerado referência internacional em políticas de controle do tabagismo — mas ainda tem muito a avançar.

NÚMEROS ATUAIS (INCA/IBGE):
→ Aproximadamente 25 milhões de fumantes ativos no Brasil
→ Taxa de tabagismo: 12,6% da população adulta (queda de 34% em 1989 para ~13% hoje)
→ 443 mortes por dia atribuíveis ao tabagismo — uma a cada 3 minutos
→ 200.000 mortes por ano por doenças relacionadas ao cigarro
→ R$ 125 bilhões/ano em custos para o sistema de saúde

O QUE O BRASIL FEZ CERTO:
→ Proibição de publicidade de cigarros (2000) — uma das primeiras no mundo
→ Advertências visuais nas embalagens (1988, expandidas várias vezes)
→ Proibição de fumar em locais fechados (Lei Antifrmo, 2014)
→ Programa Nacional de Controle do Tabagismo (PNCT) com tratamento gratuito no SUS
→ Aumento progressivo dos impostos sobre o cigarro

POR QUE AINDA É UM PROBLEMA:
→ Cigarro eletrônico (vape) em expansão, especialmente entre jovens
→ Acesso fácil e preço ainda acessível comparado a outros países
→ Marketing disfarçado nas redes sociais
→ Baixa adesão ao tratamento disponível gratuitamente no SUS`
      },
      {
        title: 'O Programa Nacional de Controle do Tabagismo (PNCT)',
        content: `O PNCT é um dos programas mais abrangentes do mundo para cessação tabágica e está disponível gratuitamente no SUS para todos os brasileiros.

O QUE OFERECE:
→ Consultas com equipe multiprofissional (médico, psicólogo, enfermeiro, farmacêutico)
→ Grupos de cessação presenciais — encontros semanais por 12 meses
→ Bupropiona e vareniclina com prescrição médica — custo zero no SUS
→ TRN (adesivos, gomas de nicotina) em algumas unidades
→ Apoio para recaídas sem julgamento

COMO ACESSAR:
1. Vá à sua UBS (Unidade Básica de Saúde) mais próxima
2. Leve CPF e cartão do SUS
3. Diga: "quero participar do Programa de Cessação do Tabagismo"
4. Faça a consulta de avaliação e inscrição no grupo

Se não houver grupo na sua UBS, pergunte sobre encaminhamento para o CAPS ou hospital de referência.

DISQUE SAÚDE: 136 — gratuito, disponível 24h.

INCA: inca.gov.br/controle-do-tabagismo — encontre unidades na sua cidade.

IMPORTANTE: o tratamento combinado (grupo + medicação) tem taxas de sucesso de 35-45% — muito superiores às tentativas individuais (3-5%).`
      },
      {
        title: 'Para ajudar outras pessoas — se tornar multiplicador',
        content: `Se você está usando o Desfume, provavelmente conhece outros fumantes que gostariam de parar. Aqui está como ajudar de forma eficaz — e o que evitar.

COMO APOIAR SEM PRESSIONAR:

A pesquisa é clara: pressão e crítica são fatores de risco para recaída, não de proteção. O que funciona:

→ Oferecer o app sem forçar: "tem um app que está me ajudando muito, se quiser te passo"
→ Estar disponível para ligações durante fissuras — sem fazer perguntas, apenas presença
→ Celebrar cada conquista sem minimizar: "uma semana é enorme"
→ Não fumar na presença da pessoa quando ela pedir — pelo menos nos primeiros 3 meses
→ Não perguntar toda hora se a pessoa ainda está sem fumar

SE VOCÊ TRABALHA NA SAÚDE:
O protocolo INCA de "abordagem breve" recomenda que todo profissional de saúde pergunte sobre tabagismo em qualquer consulta e ofereça encaminhamento. A simples pergunta "você fuma?" seguida de "já pensou em parar?" é suficiente para iniciar o processo.

DADOS QUE MOTIVAM:
→ Apenas 3% dos fumantes recebem aconselhamento formal para parar
→ Uma única orientação médica aumenta em 2-3x a taxa de tentativa
→ Você pode ser essa orientação para alguém próximo

O Desfume foi construído para ser mais do que um app — foi construído para ser um ponto de partida de uma conversa sobre saúde, liberdade e qualidade de vida.`
      }
    ]
  }

]

export default function Cartilha() {
  const [activeModule, setActiveModule] = useState(null)
  const [openSection, setOpenSection] = useState(null)
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem('desfume_cartilha_completed') || '[]') } catch { return [] }
  })

  const markCompleted = (idx) => {
    const updated = [...new Set([...completed, idx])]
    setCompleted(updated)
    try { localStorage.setItem('desfume_cartilha_completed', JSON.stringify(updated)) } catch {}
  }

  if (activeModule !== null) {
    const mod = MODULES[activeModule]
    return (
      <div style={{ background: '#F4FAF7', minHeight: '100dvh', paddingBottom: 88 }}>
        <div style={{ background: mod.bg, padding: '1.5rem 1rem 1rem', borderBottom: `1px solid ${mod.bg}` }}>
          <button onClick={() => setActiveModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: mod.color, fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4, padding: 0, fontFamily: 'inherit', fontWeight: 600 }}>← Voltar ao guia</button>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>{mod.icon}</span>
            <div>
              <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 99, fontSize: '0.6875rem', fontWeight: 700, background: mod.color, color: 'white', marginBottom: 6 }}>{mod.tag}</span>
              <h1 style={{ fontSize: '1.25rem', color: '#0A3D2B', margin: 0 }}>{mod.title}</h1>
              <p style={{ fontSize: '0.875rem', color: '#4A8C6F', marginTop: 4, fontStyle: 'italic' }}>{mod.intro}</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '1rem' }}>
          {mod.sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: 10, border: `1.5px solid ${openSection === i ? mod.color : '#DCF0E7'}`, borderRadius: 14, overflow: 'hidden', background: 'white', boxShadow: '0 2px 8px rgba(10,61,43,0.06)', transition: 'border-color .15s' }}>
              <button
                onClick={() => setOpenSection(openSection === i ? null : i)}
                style={{ width: '100%', padding: '14px 16px', background: openSection === i ? mod.bg : 'white', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, fontFamily: 'inherit', textAlign: 'left', transition: 'background .15s' }}
              >
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0A3D2B', lineHeight: 1.3 }}>{sec.title}</span>
                <span style={{ color: mod.color, fontSize: '1.25rem', flexShrink: 0, transform: openSection === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>↓</span>
              </button>
              {openSection === i && (
                <div style={{ padding: '0 16px 16px' }}>
                  {sec.content.split('\n').map((line, j) => {
                    const isBold = /^[A-ZÇÃÕÁÉÍÓÚÀÈÌÒÙ][A-ZÇÃÕÁÉÍÓÚÀÈÌÒÙ\s]+:/.test(line) || line.startsWith('→') || /^\d+\./.test(line)
                    return line.trim() === '' ? (
                      <div key={j} style={{ height: '0.75rem' }} />
                    ) : (
                      <p key={j} style={{ fontSize: '0.875rem', lineHeight: 1.75, color: isBold ? '#0A3D2B' : '#4A8C6F', fontWeight: isBold ? 700 : 400, marginBottom: 2, paddingLeft: line.startsWith('→') ? 4 : 0 }}>
                        {line}
                      </p>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          {!completed.includes(activeModule) ? (
            <button className="btn btn-green btn-full btn-lg" style={{ marginTop: '1rem' }}
              onClick={() => { markCompleted(activeModule); setActiveModule(null) }}>
              ✅ Módulo concluído!
            </button>
          ) : (
            <div style={{ marginTop: '1rem', background: '#DCF0E7', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
              <p style={{ fontWeight: 700, color: '#0A3D2B' }}>✅ Módulo já concluído</p>
              <button onClick={() => setActiveModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A6B42', fontWeight: 600, marginTop: 6, fontFamily: 'inherit' }}>← Voltar</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page-padded">
      <h1 style={{ marginBottom: '0.25rem' }}>Guia Desfume</h1>
      <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Tudo que você precisa saber para parar de fumar de vez</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem', background: '#DCF0E7', borderRadius: 12, padding: '10px 14px' }}>
        <div className="progress-track" style={{ flex: 1 }}>
          <div className="progress-fill" style={{ width: `${Math.round(completed.length / MODULES.length * 100)}%` }} />
        </div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#1A6B42', flexShrink: 0 }}>{completed.length}/{MODULES.length} módulos</span>
      </div>

      {MODULES.map((mod, i) => (
        <div key={mod.id}
          onClick={() => setActiveModule(i)}
          style={{ background: 'white', border: `1.5px solid ${completed.includes(i) ? '#2ECC71' : '#DCF0E7'}`, borderRadius: 14, padding: '1rem 1.25rem', marginBottom: 10, cursor: 'pointer', boxShadow: '0 2px 8px rgba(10,61,43,0.06)', transition: 'all .15s' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: mod.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              {completed.includes(i) ? '✅' : mod.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: '0.6875rem', fontWeight: 700, background: mod.bg, color: mod.color }}>{mod.tag}</span>
                {completed.includes(i) && <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#2ECC71' }}>Concluído</span>}
              </div>
              <h3 style={{ marginBottom: 3, fontSize: '0.9375rem' }}>{mod.title}</h3>
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.4, margin: 0 }}>{mod.intro}</p>
            </div>
            <span style={{ color: '#DCF0E7', fontSize: '1.25rem', flexShrink: 0 }}>→</span>
          </div>
        </div>
      ))}

      <div className="card card-mint" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A3D2B', marginBottom: 8 }}>📚 Fontes e referências</p>
        {[
          'INCA — Protocolo Clínico e Diretrizes Terapêuticas do Tabagismo (PCDT), MS/CONITEC 2020',
          'OMS — WHO Report on the Global Tobacco Epidemic, 2023',
          'Heatherton et al. — The Fagerström Test for Nicotine Dependence. Br J Addiction, 1991',
          'Prochaska & DiClemente — Modelo Transteórico de Mudança de Comportamento',
          'West R. — Theory of Addiction. Blackwell/Addiction Press, 2006',
          'CDC — Health Effects of Cigarette Smoking, 2023',
          'JMIR Human Factors — Quit smoking apps success rates, Goldgof et al., 2024',
          'ScienceDirect — Smokers user experience of cessation apps: systematic review, 2023',
        ].map(ref => (
          <p key={ref} style={{ fontSize: '0.6875rem', color: '#6B8A74', lineHeight: 1.4, paddingLeft: 10, borderLeft: '2px solid #DCF0E7', marginBottom: 6 }}>{ref}</p>
        ))}
      </div>
    </div>
  )
}
