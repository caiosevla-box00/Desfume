// src/hooks/useSmokingSchedule.js
// Gerencia o intervalo entre cigarros e meta diária
import { useEffect, useCallback, useRef } from 'react'
import { localDateKey } from '../lib/stats'

const INTERVAL_OPTIONS = [
  { label: '30 minutos', value: 30, description: 'Redução leve' },
  { label: '45 minutos', value: 45, description: 'Redução moderada' },
  { label: '1 hora', value: 60, description: 'Recomendado para começar' },
  { label: '1h 30min', value: 90, description: 'Bom progresso' },
  { label: '2 horas', value: 120, description: 'Redução significativa' },
  { label: '2h 30min', value: 150, description: 'Quase lá' },
  { label: '3 horas', value: 180, description: 'Excelente controle' },
]

export { INTERVAL_OPTIONS }

export function useSmokingSchedule({ data, update, sendLocalNotification }) {
  const timerRef = useRef(null)

  const interval = data.settings?.smokingInterval || 60 // minutos
  const dailyGoal = data.settings?.dailyGoal || data.profile?.cigarettesPerDay || 20
  const lastSmoked = data.profile?.lastSmokeFreeStart || null
  const notificationsEnabled = data.notificationsEnabled || false

  const todayKey = localDateKey()
  const todayCount = data.smoking?.logByDay?.[todayKey] || 0

  // Quando pode fumar o próximo
  const nextSmokeTime = lastSmoked ? lastSmoked + interval * 60 * 1000 : null
  const now = Date.now()
  const msUntilNext = nextSmokeTime ? Math.max(0, nextSmokeTime - now) : 0
  const canSmokeNow = !nextSmokeTime || now >= nextSmokeTime
  const minutesUntilNext = Math.ceil(msUntilNext / 60000)

  // Progresso da meta diária
  const goalProgress = Math.min(100, Math.round((todayCount / dailyGoal) * 100))
  const remainingToday = Math.max(0, dailyGoal - todayCount)
  const overGoal = todayCount > dailyGoal
  const overBy = Math.max(0, todayCount - dailyGoal)

  // Agenda notificação quando será hora de fumar
  useEffect(() => {
    if (!notificationsEnabled || !lastSmoked || canSmokeNow) return
    clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      sendLocalNotification?.(
        '🕐 Desfume — Intervalo cumprido',
        `Você aguentou ${interval} min. Se quiser fumar, pode. Se não quiser, ótimo — espere mais!`,
        { tag: 'smoke-interval', renotify: true }
      )
    }, msUntilNext)

    return () => clearTimeout(timerRef.current)
  }, [lastSmoked, interval, notificationsEnabled, msUntilNext, canSmokeNow])

  const updateInterval = useCallback(async (minutes) => {
    await update({ 'settings.smokingInterval': minutes })
  }, [update])

  const updateDailyGoal = useCallback(async (goal) => {
    await update({ 'settings.dailyGoal': goal })
  }, [update])

  return {
    interval,
    dailyGoal,
    todayCount,
    nextSmokeTime,
    canSmokeNow,
    minutesUntilNext,
    goalProgress,
    remainingToday,
    overGoal,
    overBy,
    updateInterval,
    updateDailyGoal,
  }
}
