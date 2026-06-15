// Centraliza todos os cálculos de estatísticas do app

export function calcStats({ data, elapsed }) {
  const cpd = data.profile?.cigarettesPerDay || 20
  const packPrice = data.profile?.packPrice || 12
  const cpp = data.profile?.cigarettesPerPack || 20
  const pricePerCig = packPrice / cpp

  // Dias desde o início (desde o cadastro, não desde o último cigarro)
  const startTs = data.profile?.startedAt || data.profile?.lastSmokeFreeStart || Date.now()
  const totalDays = Math.max(1, (Date.now() - startTs) / 86400000)

  // Total esperado sem app (baseline)
  const expectedTotal = Math.floor(totalDays * cpd)

  // Total realmente fumado (registrado no app)
  const actualSmoked = data.smoking?.totalLogged || 0

  // Cigarros não fumados = o que deveria ter fumado menos o que fumou
  const cigsNotSmoked = Math.max(0, expectedTotal - actualSmoked)

  // Redução percentual
  const reductionPct = expectedTotal > 0 ? Math.round((cigsNotSmoked / expectedTotal) * 100) : 0

  // Dinheiro economizado
  const moneySaved = cigsNotSmoked * pricePerCig

  // Gasto extra se fumou mais do que o normal
  const extraSmoked = Math.max(0, actualSmoked - expectedTotal)
  const extraSpent = extraSmoked * pricePerCig

  // Tempo sem fumar (desde último registro)
  const lastSmokeFreeStart = data.profile?.lastSmokeFreeStart || Date.now()
  const cleanElapsed = Date.now() - lastSmokeFreeStart
  const cleanDays = Math.floor(cleanElapsed / 86400000)

  // Projeções financeiras
  const dailyAvgSmoked = totalDays > 0 ? actualSmoked / totalDays : cpd
  const monthlyNow = (dailyAvgSmoked / cpp) * packPrice * 30
  const monthlySaving = ((cpd - dailyAvgSmoked) / cpp) * packPrice * 30
  const yearlySaving = monthlySaving * 12

  // Custo baseline (sem parar)
  const monthlyCost = (cpd / cpp) * packPrice * 30
  const yearlyCost = monthlyCost * 12

  // Tempo de vida recuperado (5 min por cigarro não fumado)
  const minutesRecovered = cigsNotSmoked * 5
  const hoursRecovered = (minutesRecovered / 60).toFixed(1)

  // Hoje
  const todayKey = new Date().toISOString().split('T')[0]
  const todayCount = data.smoking?.logByDay?.[todayKey] || 0
  const todayDiff = todayCount - cpd // positivo = fumou mais, negativo = fumou menos

  return {
    cpd, packPrice, cpp, pricePerCig,
    expectedTotal, actualSmoked, cigsNotSmoked,
    reductionPct, moneySaved, extraSmoked, extraSpent,
    cleanElapsed, cleanDays,
    dailyAvgSmoked, monthlyNow, monthlySaving, yearlySaving,
    monthlyCost, yearlyCost,
    minutesRecovered, hoursRecovered,
    todayCount, todayDiff,
    totalDays: Math.floor(totalDays),
  }
}

// Formata moeda brasileira
export function brl(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Formata número com separador de milhar
export function num(value) {
  return new Intl.NumberFormat('pt-BR').format(Math.round(value))
}
