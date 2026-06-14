// src/hooks/useNotifications.js
import { useEffect, useCallback } from 'react'

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }, [])

  const scheduleDaily = useCallback((medications) => {
    if (!('serviceWorker' in navigator) || Notification.permission !== 'granted') return
    medications.forEach(med => {
      med.times?.forEach(time => {
        const [h, m] = time.split(':').map(Number)
        const now = new Date()
        const target = new Date()
        target.setHours(h, m, 0, 0)
        if (target <= now) target.setDate(target.getDate() + 1)
        const delay = target - now
        setTimeout(() => {
          new Notification(`💊 ${med.name}`, {
            body: `Hora de tomar seu medicamento. Dosagem: ${med.dosage}`,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
          })
          scheduleDaily([med])
        }, delay)
      })
    })
  }, [])

  const sendCrisisEncouragement = useCallback(() => {
    if (Notification.permission !== 'granted') return
    const msgs = [
      'Você está mais forte do que pensa. A fissura passa em 3 minutos.',
      '"A disciplina é a maior forma de amor-próprio." — Epicteto',
      'Cada cigarro recusado é uma vitória real.',
    ]
    new Notification('💪 Desfume — Você consegue!', {
      body: msgs[Math.floor(Math.random() * msgs.length)],
      icon: '/icon-192.png',
    })
  }, [])

  return { requestPermission, scheduleDaily, sendCrisisEncouragement }
}
