# 🕊️ Desfume — Seu companheiro para parar de fumar

App completo baseado nos protocolos do INCA / Ministério da Saúde, com login Google, gamificação e suporte à crise.

## 🚀 Deploy em 5 passos

### 1. Criar projeto Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"** → dê um nome (ex: `desfume-app`)
3. Ative o **Google Analytics** (opcional)
4. No menu lateral: **Authentication → Provedores → Google → Ativar**
   - Adicione seu email de suporte
5. No menu lateral: **Firestore Database → Criar banco de dados**
   - Escolha modo **produção**
   - Selecione a região **southamerica-east1** (São Paulo)
6. Em **Configurações do projeto (⚙️) → Seus apps → Web `</>`**
   - Registre o app com o nome "Desfume"
   - Copie o objeto `firebaseConfig`

### 2. Configurar regras do Firestore

Em Firestore → Regras, cole:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /userData/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. Configurar variáveis de ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Preencha com as credenciais do Firebase.

### 4. Deploy na Vercel

```bash
# Instalar dependências
npm install

# Testar localmente
npm run dev

# Deploy via Vercel CLI
npx vercel --prod
```

Ou conecte o repositório GitHub na [vercel.com](https://vercel.com):
1. **New Project → Import Git Repository**
2. Em **Environment Variables**, adicione todas as variáveis do `.env.example`
3. Clique em **Deploy**

### 5. Adicionar domínio ao Firebase

Em **Firebase → Authentication → Domínios autorizados**, adicione:
- `seu-projeto.vercel.app`
- Seu domínio customizado (se tiver)

---

## 📱 Funcionalidades

### 🩺 Avaliação Clínica (Onboarding)
- **Teste de Fagerström** completo (6 perguntas, 0-10 pontos) — avalia dependência física à nicotina
- **Teste de Richmond** (4 perguntas) — avalia motivação para cessação
- Configuração do **perfil de fumante** com cálculo financeiro automático

### 🏠 Dashboard Principal
- Cronômetro em tempo real de quanto está sem fumar
- Métricas: cigarros hoje / não fumados / dinheiro economizado
- **Botão de pânico** com 4 estratégias de crise:
  - Respiração 4-7-8 (anti-ansiedade)
  - Jogo de palavras (distração mental)
  - Força filosófica (Estoicismo, espiritualidade, ciência)
  - Hidratação com contador regressivo
- Botão "Fumei" com confirmação e reinício do contador
- Insights rotativos contextuais
- Calendário de sequência de 30 dias

### 📈 Progresso
- Análise financeira completa (por cigarro, mês, ano, 5 anos)
- Gráfico de cigarros por dia (14 dias)
- Gráfico por mês
- Sistema de conquistas (8 badges temporais)
- Linha do tempo de recuperação do corpo (20min → 15 anos)

### 🩺 Testes Clínicos
- Fagerström com resultado e interpretação clínica
- Richmond com recomendações personalizadas
- Mapeamento de 12 gatilhos com estratégias TCC individualizadas

### 💊 Remédios
- Cadastro de medicamentos com dosagem e horários
- **Notificações push** nos horários configurados
- Catálogo de medicamentos comuns (bupropiona, vareniclina, TRN)
- Múltiplos horários por medicamento

### 📚 Cartilha
- 3 pilares: Fisiológico, Psicológico, Químico
- Accordion interativo com conteúdo científico
- Referências bibliográficas (INCA, OMS, estudos)

### 👤 Perfil
- Edição completa do perfil de fumante
- Estatísticas de vida (cigarros fumados, dinheiro gasto, minutos perdidos)
- Resumo de avaliações clínicas
- Logout

---

## 🔧 Stack

- **React 18** + **Vite**
- **Firebase** (Auth + Firestore)
- **React Router 6**
- **date-fns** para manipulação de datas
- **Web Notifications API** para lembretes de medicamentos
- CSS puro (sem framework UI) — design system próprio do Desfume

---

## 📁 Estrutura

```
src/
  contexts/AuthContext.jsx    # Login Google + estado do usuário
  hooks/
    useUserData.js            # Sync Firestore em tempo real
    useNotifications.js       # Notificações push
  pages/
    Login.jsx                 # Tela de entrada
    Onboarding.jsx            # Fagerström + perfil inicial
    Home.jsx                  # Dashboard principal
    Progress.jsx              # Gráficos e conquistas
    Tests.jsx                 # Testes clínicos + gatilhos
    Cartilha.jsx              # Conteúdo educativo
    Medications.jsx           # Remédios e lembretes
    Profile.jsx               # Perfil e configurações
  components/
    Shell.jsx                 # Layout + navegação
    PanicModal.jsx            # Modal de crise
  lib/firebase.js             # Configuração Firebase
  index.css                   # Design system
```

---

## 📊 Protocolos implementados

- **PCDT Tabagismo** — Protocolo Clínico e Diretrizes Terapêuticas do Tabagismo, MS/CONITEC 2020
- **Teste de Fagerström** — FTND (Heatherton et al., 1991) — padrão INCA/SUS
- **Teste de Richmond** — Avaliação de motivação
- **TCC para tabagismo** — protocolo cognitivo-comportamental INCA
- **Modelo de Prochaska e DiClemente** — estágios de mudança
- **Técnica de respiração 4-7-8** — Dr. Andrew Weil
- Timeline de recuperação corporal — OMS / CDC

---

## ⚠️ Aviso

Este aplicativo é uma ferramenta de apoio e não substitui acompanhamento médico profissional. Para tratamento farmacológico (bupropiona, vareniclina), consulte um médico ou a UBS mais próxima — o tratamento é **gratuito pelo SUS**.
