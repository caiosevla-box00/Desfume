// src/lib/stats.js — Cálculos centralizados do Desfume

export function calcStats({ data, elapsed }) {
  const cpd = data.profile?.cigarettesPerDay || 20
  const packPrice = data.profile?.packPrice || 12
  const cpp = data.profile?.cigarettesPerPack || 20
  const pricePerCig = packPrice / cpp
  const dailyGoal = data.settings?.dailyGoal || cpd

  // Datas
  const startedAt = data.profile?.startedAt || data.profile?.lastSmokeFreeStart || Date.now()
  const totalDaysUsing = Math.max(1, (Date.now() - startedAt) / 86400000)
  const totalDaysFloor = Math.max(1, Math.floor(totalDaysUsing))

  // Total fumado registrado
  const actualSmoked = data.smoking?.totalLogged || 0

  // Média real diária de cigarros fumados
  const dailyAvgSmoked = actualSmoked / totalDaysFloor

  // Cigarros esperados sem redução (baseline)
  const expectedTotal = Math.floor(totalDaysFloor * cpd)

  // Cigarros não fumados = baseline - fumado real
  const cigsNotSmoked = Math.max(0, expectedTotal - actualSmoked)

  // Percentual de redução
  const reductionPct = expectedTotal > 0 ? Math.round((cigsNotSmoked / expectedTotal) * 100) : 0

  // Dinheiro economizado baseado na redução real
  const moneySaved = cigsNotSmoked * pricePerCig

  // Gasto extra se fumou acima do padrão
  const extraSmoked = Math.max(0, actualSmoked - expectedTotal)
  const extraSpent = extraSmoked * pricePerCig

  // === LÓGICA META DIÁRIA ===
  // Cigarros por hora com base na meta diária (assumindo 16h acordado)
  const cigsPerHour = dailyGoal / 16
  const minutesPerCig = Math.round(60 / cigsPerHour)

  // Hoje
  const todayKey = new Date().toISOString().split('T')[0]
  const todayCount = data.smoking?.logByDay?.[todayKey] || 0

  // Cigarros não fumados HOJE = meta diária - fumados hoje (se fumou menos)
  const todaySaved = Math.max(0, dailyGoal - todayCount)
  const todayOverGoal = Math.max(0, todayCount - dailyGoal)
  const todaySavedMoney = todaySaved * pricePerCig
  const todayExtraMoney = todayOverGoal * pricePerCig

  // === ECONOMIA SEMANAL E MENSAL REAL ===
  // Baseada na diferença entre média atual e padrão original
  const dailyReduction = Math.max(0, cpd - dailyAvgSmoked)
  const weeklySaving = dailyReduction * 7 * pricePerCig
  const monthlySaving = dailyReduction * 30 * pricePerCig
  const yearlySavingCurrent = dailyReduction * 365 * pricePerCig

  // Custo baseline (se não estivesse usando o app)
  const monthlyCost = (cpd / cpp) * packPrice * 30
  const yearlyCost = monthlyCost * 12

  // Projeção anos fumando
  const yearsSmking = data.profile?.smokingSince
    ? new Date().getFullYear() - parseInt(data.profile.smokingSince)
    : 0
  const lifetimeCigs = yearsSmking > 0 ? cpd * 365 * yearsSmking : null
  const lifetimeCost = lifetimeCigs ? lifetimeCigs * pricePerCig : null
  const lifetimeMinutes = lifetimeCigs ? lifetimeCigs * 5 : null

  // Tempo sem fumar desde último
  const lastSmokeFreeStart = data.profile?.lastSmokeFreeStart || Date.now()
  const cleanElapsed = Date.now() - lastSmokeFreeStart
  const cleanDays = Math.floor(cleanElapsed / 86400000)

  // Tempo de vida recuperado
  const minutesRecovered = cigsNotSmoked * 5
  const hoursRecovered = (minutesRecovered / 60).toFixed(1)

  return {
    cpd, packPrice, cpp, pricePerCig, dailyGoal,
    startedAt, totalDaysFloor,
    actualSmoked, expectedTotal, cigsNotSmoked,
    reductionPct, moneySaved, extraSmoked, extraSpent,
    dailyAvgSmoked: Math.round(dailyAvgSmoked * 10) / 10,
    cigsPerHour, minutesPerCig,
    todayCount, todaySaved, todayOverGoal, todaySavedMoney, todayExtraMoney,
    dailyReduction, weeklySaving, monthlySaving, yearlySavingCurrent,
    monthlyCost, yearlyCost,
    yearsSmking, lifetimeCigs, lifetimeCost, lifetimeMinutes,
    cleanElapsed, cleanDays,
    minutesRecovered, hoursRecovered,
  }
}

export function brl(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL',
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(value || 0)
}

export function num(value) {
  return new Intl.NumberFormat('pt-BR').format(Math.round(value || 0))
}
