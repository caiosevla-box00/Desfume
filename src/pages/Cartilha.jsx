import { useState } from 'react'

const MODULES = [
  {
    id: 1, icon: '🧬', title: 'O que é a dependência', tag: 'Fundamentos',
    intro: 'Entender o vício é o primeiro passo para quebrá-lo.',
    sections: [
      { title: 'Por que parar é tão difícil?', content: 'O tabagismo é uma doença crônica reconhecida pela OMS e CID-10. Não é falta de força de vontade — é uma dependência química, psicológica e comportamental simultânea. O INCA estima que apenas 3% das pessoas conseguem parar sem ajuda. Isso não é fraqueza: é biologia.' },
      { title: 'Os três pilares da dependência', content: 'QUÍMICA: A nicotina chega ao cérebro em 7 segundos e libera dopamina — o neurotransmissor do prazer. Com uso repetido, o cérebro reduz a produção natural de dopamina e cria novos receptores. Resultado: você precisa do cigarro só para se sentir normal.\n\nPSICOLÓGICA: Após anos fumando, situações cotidianas — café, stress, álcool, dirigir — ficam associadas ao cigarro por condicionamento clássico. O simples cheiro de fumaça pode ativar o desejo.\n\nCOMPORTAMENTAL: O ritual em si — acender, segurar, dar a primeira tragada — vira um hábito independente. O corpo sente falta do movimento, não só da substância.' },
      { title: 'O modelo de Prochaska', content: 'Cientistas mapearam os estágios de quem para de fumar:\n1. Pré-contemplação: "não quero parar"\n2. Contemplação: "penso em parar um dia"\n3. Preparação: "estou me preparando"\n4. Ação: "parei"\n5. Manutenção: "continuo sem fumar"\n6. Recaída: normal e esperada — a maioria tenta 8 a 10 vezes antes do sucesso definitivo.\n\nSaber em qual estágio você está ajuda a escolher a abordagem certa.' },
    ]
  },
  {
    id: 2, icon: '🫁', title: 'Seu corpo e o cigarro', tag: 'Fisiologia',
    intro: 'O cigarro ataca todos os sistemas do corpo — e todos se recuperam quando você para.',
    sections: [
      { title: 'O que você inalou em cada cigarro', content: 'Cada cigarro contém mais de 5.000 substâncias químicas, das quais ~70 são cancerígenas comprovadas:\n\n• Alcatrão: paralisa os cílios pulmonares e causa câncer\n• Monóxido de carbono (CO): tem 200x mais afinidade com a hemoglobina do que o oxigênio — você literalmente transportava menos O₂ no sangue\n• Nicotina: cria e mantém a dependência\n• Arsênio, benzeno, formaldeído, cianeto de hidrogênio: presentes em pesticidas e produtos industriais\n• Amônia: acelera a absorção de nicotina pelo cérebro' },
      { title: 'A linha do tempo da recuperação', content: '20 minutos: pressão arterial e frequência cardíaca normalizam\n8 horas: CO no sangue cai à metade; oxigenação normaliza\n24 horas: risco de infarto começa a diminuir\n48 horas: terminações nervosas do olfato e paladar se regeneram\n72 horas: bronquíolos relaxam, respirar fica mais fácil\n2 semanas: circulação melhora significativamente\n1 a 9 meses: tosse diminui; cílios pulmonares se recuperam\n1 ano: risco de doença cardíaca coronária é metade do de um fumante\n5 anos: risco de AVC igual ao de não fumante\n10 anos: risco de câncer de pulmão cai à metade\n15 anos: risco cardíaco igual ao de quem nunca fumou' },
      { title: 'A síndrome de abstinência', content: 'Nas primeiras 24-72 horas: irritabilidade, ansiedade, dificuldade de concentração, aumento de apetite e insônia são normais e esperados. Esses sintomas atingem o pico entre 24-48h e melhoram progressivamente. São sinais de que seu corpo está se curando — não de que você está falhando.' },
    ]
  },
  {
    id: 3, icon: '🧠', title: 'Estratégias TCC validadas', tag: 'Psicologia',
    intro: 'A Terapia Cognitivo-Comportamental é o tratamento psicológico com maior evidência científica para tabagismo.',
    sections: [
      { title: 'Identificando seus gatilhos', content: 'Gatilhos são situações que automaticamente acionam o desejo de fumar. Classifique os seus:\n\nINTERNOS: ansiedade, tédio, tristeza, raiva, cansaço\nEXTERNOS: café, álcool, dirigir, após refeições, trabalho, pessoas fumando\n\nCada gatilho identificado é uma oportunidade de criar uma resposta alternativa antes que o desejo apareça.' },
      { title: 'Reestruturação cognitiva', content: 'A TCC identifica e desafia crenças automáticas sobre o cigarro:\n\n"O cigarro me relaxa" → A nicotina cria a tensão que parece aliviar. Sem o cigarro, você ficaria mais relaxado.\n\n"Fumar me ajuda a concentrar" → É abstinência sendo saciada, não concentração real. Em 2 semanas a concentração volta ao normal.\n\n"Só um não faz mal" → Reativa fisicamente o ciclo de dependência. O "só um" raramente fica em um.\n\n"Não consigo parar" → 70% das tentativas fracassam, mas a maioria das pessoas bem-sucedidas tentou várias vezes antes.' },
      { title: 'As 5 técnicas mais eficazes (protocolo INCA)', content: '1. RELAXAMENTO: respiração diafragmática — a técnica mais citada como eficaz por ex-fumantes. Pratique 3x por dia, não só na crise.\n\n2. CARTÕES DE ENFRENTAMENTO: escreva seus motivos para parar em um papel e leia quando sentir fissura. Seja específico: "quero ver meu filho crescer" é mais poderoso que "quero ter saúde".\n\n3. DISTRAÇÃO ATIVA: mude de ambiente imediatamente. Levante, vá a outro cômodo, ligue para alguém. A mudança física quebra o ciclo automático.\n\n4. MONITORAMENTO: registre cada cigarro que fuma. Isso aumenta a consciência sobre padrões e gatilhos.\n\n5. REFORÇO POSITIVO: celebre cada conquista, por menor que seja. Um dia limpo merece reconhecimento.' },
    ]
  },
  {
    id: 4, icon: '🛡️', title: 'Prevenção de recaída', tag: 'Manutenção',
    intro: 'Saber como recaídas acontecem é a melhor forma de evitá-las.',
    sections: [
      { title: 'Por que recaídas acontecem', content: 'A recaída não é uma falha de caráter — é uma parte previsível do processo de parar de fumar. As situações de maior risco são:\n\n• HALT: Hungry (com fome), Angry (com raiva), Lonely (solitário), Tired (cansado)\n• Situações sociais com outros fumantes\n• Consumo de álcool — reduz a inibição e ativa gatilhos\n• Momentos de estresse intenso e inesperado\n• O pensamento "só um não vai fazer mal"' },
      { title: 'O plano de crise (TCC)', content: 'Tenha um plano antes que a crise chegue:\n\n1. Identifique seus 3 principais gatilhos\n2. Para cada um, defina uma ação substituta específica\n3. Tenha um "time out" — uma frase que você repete: "Essa fissura vai passar em 3 minutos"\n4. Liste 3 pessoas que você pode ligar quando sentir vontade de fumar\n5. Remova os cigarros, isqueiros e cinzeiros do seu ambiente\n\nCarta de enfrentamento modelo: "Eu escolhi parar porque [seu motivo]. Agora estou sentindo fissura. Sei que vai passar em 3 minutos. Vou [sua ação alternativa] até passar."' },
      { title: 'Se houve recaída: o que fazer', content: 'Se você fumou um cigarro, não transforme isso em "fracasso total":\n\n1. Registre no app — honestidade ajuda a identificar padrões\n2. Analise: o que aconteceu? Qual foi o gatilho? Qual o contexto?\n3. Retome imediatamente — não espere "segunda-feira" ou "próximo mês"\n4. Aprenda: cada recaída dá informações sobre onde você precisa de mais suporte\n\nO erro mais comum é tratar um deslize como uma derrota total. Um cigarro fumado não apaga dias de conquista.' },
    ]
  },
  {
    id: 5, icon: '🌱', title: 'A vida após o cigarro', tag: 'Futuro',
    intro: 'O que muda quando você para de fumar — além do óbvio.',
    sections: [
      { title: 'O que você vai ganhar (além da saúde)', content: 'OLFATO E PALADAR: em 48h esses sentidos se regeneram. A comida vai ter um sabor completamente diferente. Muitos ex-fumantes dizem que foi uma das maiores surpresas.\n\nDINHEIRO: um fumante que fuma 1 maço por dia gasta ~R$ 4.380 por ano. Em 5 anos, são R$ 21.900. Em 10 anos, R$ 43.800.\n\nTEMPO: cada cigarro dura ~5 minutos e rouba ~5 minutos de vida. Um maço por dia é 1h40 por dia, 25 dias por ano, gastos com o vício.\n\nPELE E APARÊNCIA: a circulação melhora, a pele recebe mais oxigênio, o envelhecimento precoce desacelera.\n\nDISPONIBILIDADE: você nunca mais vai sair no frio, na chuva, ou interromper conversas por causa de uma dependência química.' },
      { title: 'Lidando com o ganho de peso', content: 'É comum ganhar 2-4 kg nos primeiros meses após parar — a nicotina suprimia o apetite e acelerava o metabolismo. Isso é temporário e geralmente normaliza em 6 meses.\n\nESTRATÉGIAS: aumento moderado de atividade física (que também reduz a fissura), comer em horários regulares, ter lanches saudáveis disponíveis, beber água quando sentir fome fora do horário.\n\nIMPORTANTE: os ganhos de saúde ao parar de fumar são muito maiores do que os riscos de um pequeno ganho de peso temporário.' },
      { title: 'Construindo uma identidade de não fumante', content: 'A última etapa — e a mais poderosa — é internalizar uma nova identidade:\n\nEm vez de "estou tentando parar de fumar" → "eu não fumo"\nEm vez de "resistindo ao cigarro" → "cigarro não faz parte de quem eu sou"\n\nEssa mudança de narrativa, documentada em pesquisas de psicologia comportamental, aumenta significativamente as taxas de sucesso. Você não está se privando de algo — você está se tornando quem você quer ser.' },
    ]
  },
]

export default function Cartilha() {
  const [activeModule, setActiveModule] = useState(null)
  const [openSection, setOpenSection] = useState(null)
  const [completed, setCompleted] = useState([])

  if (activeModule !== null) {
    const mod = MODULES[activeModule]
    return (
      <div className="page-padded">
        <button onClick={() => setActiveModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B8A74', fontSize: '0.875rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>← Voltar</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.75rem' }}>{mod.icon}</span>
          <div>
            <span className="tag tag-green" style={{ marginBottom: 4 }}>{mod.tag}</span>
            <h1 style={{ fontSize: '1.375rem', margin: 0 }}>{mod.title}</h1>
          </div>
        </div>
        <p style={{ fontSize: '0.9375rem', color: '#4A8C6F', marginBottom: '1.5rem', fontStyle: 'italic' }}>{mod.intro}</p>

        {mod.sections.map((sec, i) => (
          <div key={i} className="accordion-item">
            <button className={`accordion-head ${openSection === i ? 'open' : ''}`} onClick={() => setOpenSection(openSection === i ? null : i)}>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0A3D2B' }}>{sec.title}</span>
              <span style={{ color: '#1A6B42', fontSize: '1.125rem', transition: 'transform 0.2s', transform: openSection === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>↓</span>
            </button>
            {openSection === i && (
              <div className="accordion-body">
                {sec.content.split('\n').map((line, j) => (
                  <p key={j} style={{ marginBottom: line === '' ? '0.5rem' : '0.25rem', fontWeight: line.startsWith('•') || /^[A-ZÇÃÕÁÉÍÓÚÀÈÌÒÙ\d]+:/.test(line) ? 600 : 400, color: line.startsWith('•') ? '#0A3D2B' : undefined }}>
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        {!completed.includes(activeModule) && (
          <button className="btn btn-green btn-full btn-lg" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}
            onClick={() => { setCompleted(c => [...c, activeModule]); setActiveModule(null) }}>
            ✅ Módulo concluído!
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="page-padded">
      <h1 style={{ marginBottom: '0.25rem' }}>Guia Desfume</h1>
      <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Mini curso completo sobre tabagismo e cessação</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
        <div className="progress-track" style={{ flex: 1 }}>
          <div className="progress-fill" style={{ width: `${Math.round(completed.length / MODULES.length * 100)}%` }} />
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A6B42' }}>{completed.length}/{MODULES.length}</span>
      </div>

      {MODULES.map((mod, i) => (
        <div key={mod.id} className={`module-card ${completed.includes(i) ? 'done' : ''}`} onClick={() => setActiveModule(i)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: '2rem', flexShrink: 0 }}>{completed.includes(i) ? '✅' : mod.icon}</div>
            <div style={{ flex: 1 }}>
              <span className="tag tag-green" style={{ marginBottom: 4 }}>{mod.tag}</span>
              <h3>{mod.title}</h3>
              <p style={{ fontSize: '0.8125rem', marginTop: 3 }}>{mod.intro}</p>
            </div>
            <span style={{ color: '#1A6B42', fontSize: '1.25rem', flexShrink: 0 }}>→</span>
          </div>
        </div>
      ))}

      <div className="card card-mint" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A3D2B', marginBottom: 8 }}>📚 Referências científicas</p>
        {['INCA — Protocolo Clínico e Diretrizes Terapêuticas do Tabagismo, MS/CONITEC 2020', 'Heatherton et al. — The Fagerström Test for Nicotine Dependence, 1991', 'Prochaska & DiClemente — Modelo Transteórico de Mudança de Comportamento', 'OMS — WHO Report on the Global Tobacco Epidemic, 2023'].map(ref => (
          <p key={ref} style={{ fontSize: '0.75rem', color: '#6B8A74', lineHeight: 1.4, paddingLeft: 10, borderLeft: '2px solid #DCF0E7', marginBottom: 6 }}>{ref}</p>
        ))}
      </div>
    </div>
  )
}
