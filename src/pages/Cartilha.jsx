// src/pages/Cartilha.jsx
import { useState } from 'react'

const SECTIONS = {
  fisio: {
    label: 'Fisiológico',
    emoji: '🫁',
    color: 'var(--forest)',
    bg: 'var(--forest-pale)',
    cards: [
      {
        title: 'O que a nicotina faz ao seu cérebro',
        tag: 'Dependência química',
        body: 'A nicotina chega ao cérebro em 7 segundos após a inalação. Ela ativa receptores de acetilcolina e dispara a liberação de dopamina — o neurotransmissor do prazer e recompensa. Com o uso repetido, o cérebro reduz a produção natural de dopamina e cria novos receptores nicotínicos. O resultado: você precisa de nicotina só para se sentir normal.',
      },
      {
        title: 'Síndrome de abstinência — o que esperar',
        tag: 'Primeiras 72 horas',
        body: 'Nas primeiras 24-72 horas: irritabilidade, ansiedade, dificuldade de concentração, aumento de apetite e insônia são comuns. Esses sintomas atingem o pico entre 24-48h e vão diminuindo gradualmente. São sinais de cura — não de fracasso. O pico de abstinência física dura em média 1-2 semanas.',
      },
      {
        title: 'Seu corpo se recupera mais rápido do que você imagina',
        tag: 'Recuperação',
        body: '20 min: pressão normaliza • 8h: CO cai pela metade • 24h: risco cardíaco começa a cair • 48h: olfato e paladar se regeneram • 72h: respiração mais fácil • 2 semanas: circulação melhora • 1 mês: tosse diminui • 1 ano: risco cardíaco cai 50% • 10 anos: risco de câncer cai à metade • 15 anos: risco igual ao de não fumante.',
      },
      {
        title: 'Exercício físico como aliado',
        tag: 'Estratégia',
        body: 'Pesquisas mostram que 5 minutos de atividade física moderada reduzem significativamente o desejo de fumar. O exercício libera dopamina naturalmente, compensando a queda causada pela abstinência. Uma caminhada de 10 minutos pode neutralizar uma fissura inteira.',
      },
    ],
  },
  psico: {
    label: 'Psicológico',
    emoji: '🧠',
    color: 'var(--sky)',
    bg: 'var(--sky-pale)',
    cards: [
      {
        title: 'O cigarro como resposta condicionada',
        tag: 'TCC — INCA',
        body: 'O tabagismo é mantido por condicionamento clássico: situações como café, estresse, álcool ou uma ligação se associam automaticamente ao cigarro ao longo dos anos. Essa associação é tão forte que o simples cheiro de cigarro ativa o sistema de recompensa. A TCC (terapia cognitivo-comportamental) — protocolo oficial do INCA — é a abordagem mais eficaz para desfazer esses laços.',
      },
      {
        title: 'Quebrando crenças automáticas',
        tag: 'Reestruturação cognitiva',
        body: '"O cigarro me relaxa" → A nicotina cria a tensão que alivia. Sem o cigarro, você ficaria ainda mais relaxado. "Fumar me ajuda a concentrar" → É abstinência sendo saciada, não concentração real. "Só um não faz mal" → Reativa fisicamente o ciclo de dependência. Identificar e questionar essas crenças é o núcleo da TCC para tabagismo.',
      },
      {
        title: 'O modelo de Prochaska — estágios de mudança',
        tag: 'Motivação',
        body: 'Pré-contemplação: "não quero parar" • Contemplação: "penso em parar" • Preparação: "estou me preparando" • Ação: "parei" • Manutenção: "continuo sem fumar" • Recaída: normal e esperada. Recaídas são parte do processo — a maioria das pessoas bem-sucedidas tentou 8-10 vezes antes do sucesso definitivo.',
      },
      {
        title: 'Técnicas eficazes de enfrentamento (protocolo INCA)',
        tag: 'Ferramentas',
        body: '1) Respiração diafragmática — a mais citada por ex-fumantes como eficaz • 2) Cartões de enfrentamento (lembre seus motivos) • 3) Distração ativa: mudar de ambiente imediatamente • 4) Monitoramento de atividades e gatilhos • 5) Reforço positivo por cada conquista, por menor que seja • 6) Grupos de apoio — dobram a taxa de sucesso.',
      },
    ],
  },
  quim: {
    label: 'Químico',
    emoji: '⚗️',
    color: 'var(--ember)',
    bg: 'var(--ember-pale)',
    cards: [
      {
        title: 'O que você inala em cada cigarro',
        tag: '+5.000 substâncias',
        body: 'Cada cigarro contém mais de 5.000 substâncias químicas, das quais cerca de 70 são cancerígenas comprovadas. Entre as principais: alcatrão (agente carcinogênico que paralisa os cílios pulmonares), monóxido de carbono (bloqueia o transporte de oxigênio), nicotina (cria a dependência), arsênio, cianeto de hidrogênio, benzeno, formaldeído e amônia.',
      },
      {
        title: 'O monóxido de carbono — o sequestrador de oxigênio',
        tag: 'CO',
        body: 'O monóxido de carbono (CO) tem afinidade 200 vezes maior que o oxigênio pela hemoglobina. Isso significa que fumantes literalmente carregam menos oxigênio no sangue, causando cansaço crônico, falta de ar, pressão elevada e comprometimento de todos os órgãos. Em 8 horas sem fumar, o CO cai pela metade.',
      },
      {
        title: 'Como a nicotina cria dependência',
        tag: 'Neurociência',
        body: 'A nicotina se liga aos receptores nicotínicos de acetilcolina (nAChRs) no cérebro, especialmente no núcleo accumbens — o centro de recompensa. Isso libera dopamina, noradrenalina, serotonina e acetilcolina. Com o uso repetido, o cérebro aumenta o número de receptores (upregulation) para compensar o excesso de estimulação. Quando você para, esses receptores ficam sem estímulo — causando os sintomas de abstinência.',
      },
      {
        title: 'Cigarro eletrônico (vape) — mais perigoso que parece',
        tag: 'Atenção',
        body: 'Vapes produzem partículas ultrafinas que penetram diretamente nos alvéolos pulmonares e entram na corrente sanguínea. O efeito inflamatório é mais rápido que o do tabaco convencional. Jovens precisaram de transplante de pulmão após menos de 1 ano de uso. Não é uma alternativa segura — é uma dependência diferente com riscos próprios. O INCA não recomenda como ferramenta de cessação.',
      },
    ],
  },
}

export default function Cartilha() {
  const [activeTab, setActiveTab] = useState('fisio')
  const [openCard, setOpenCard] = useState(null)

  const section = SECTIONS[activeTab]

  return (
    <div className="page-padded">
      <h1 style={{ marginBottom: '0.25rem' }}>Cartilha Desfume</h1>
      <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>Baseada nos protocolos do INCA / Ministério da Saúde</p>

      <div className="tabs">
        {Object.entries(SECTIONS).map(([id, sec]) => (
          <button key={id} className={`tab-btn ${activeTab === id ? 'active' : ''}`} onClick={() => { setActiveTab(id); setOpenCard(null) }}>
            {sec.emoji} {sec.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        {section.cards.map((card, i) => {
          const isOpen = openCard === i
          return (
            <div key={i} style={{ marginBottom: 10, border: `1px solid ${isOpen ? section.color : 'var(--border)'}`, borderRadius: 12, overflow: 'hidden', background: 'var(--surface-card)', transition: 'border-color 0.15s' }}>
              <button
                onClick={() => setOpenCard(isOpen ? null : i)}
                style={{ width: '100%', padding: '14px 16px', background: isOpen ? section.bg : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, fontFamily: 'inherit', textAlign: 'left' }}
              >
                <div>
                  <span className="tag" style={{ background: section.bg, color: section.color, marginBottom: 4, fontSize: '0.6875rem' }}>{card.tag}</span>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{card.title}</p>
                </div>
                <span style={{ color: section.color, fontSize: '1.25rem', flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>↓</span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 16px 16px' }}>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--ink-mid)' }}>{card.body}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="card card-pale" style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--forest)', marginBottom: 8 }}>📚 Fontes e referências</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            'INCA — Protocolo Clínico e Diretrizes Terapêuticas do Tabagismo (PCDT), Ministério da Saúde, 2020',
            'Heatherton et al. — The Fagerström Test for Nicotine Dependence. Br J Addiction, 1991',
            'Prochaska & DiClemente — Modelo Transteórico de Mudança de Comportamento',
            'Pawlina et al. — TCC e tabagismo. Psicologia em Estudo, 2014',
            'OMS — WHO Report on the Global Tobacco Epidemic, 2023',
          ].map(ref => (
            <p key={ref} style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', lineHeight: 1.4, paddingLeft: 12, borderLeft: '2px solid var(--forest-muted)' }}>{ref}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
