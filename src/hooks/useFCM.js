// src/hooks/useFCM.js
// Firebase Cloud Messaging — notificações reais com app fechado
import { useState, useCallback } from 'react'
import { messaging, getToken, onMessage, firebaseConfig_ } from '../lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY

export function useFCM(userId) {
  const [fcmToken, setFcmToken] = useState(null)
  const [supported, setSupported] = useState('serviceWorker' in navigator && 'Notification' in window)

  const requestFCMPermission = useCallback(async () => {
    if (!supported || !messaging) return { success: false, reason: 'not_supported' }

    try {
      // Registra o service worker
      const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js')

      // Envia a config Firebase para o SW
      reg.active?.postMessage({ type: 'FIREBASE_CONFIG', config: firebaseConfig_ })

      // Pede permissão
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return { success: false, reason: 'denied' }

      // Obtém o FCM token
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: reg
      })

      if (token) {
        setFcmToken(token)
        // Salva o token no Firestore para enviar notificações pelo backend
        if (userId) {
          await updateDoc(doc(db, 'userData', userId), { fcmToken: token })
        }
        return { success: true, token }
      }

      return { success: false, reason: 'no_token' }
    } catch (err) {
      console.error('FCM error:', err)
      return { success: false, reason: err.message }
    }
  }, [supported, userId])

  // Notificação local imediata (app aberto)
  const sendLocalNotification = useCallback((title, body, options = {}) => {
    if (Notification.permission !== 'granted') return
    new Notification(title, {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options
    })
  }, [])

  // Escuta mensagens com app aberto
  const onForegroundMessage = useCallback((callback) => {
    if (!messaging) return () => {}
    return onMessage(messaging, callback)
  }, [])

  return {
    supported,
    fcmToken,
    requestFCMPermission,
    sendLocalNotification,
    onForegroundMessage
  }
}
