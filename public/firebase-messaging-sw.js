// public/firebase-messaging-sw.js
// Service Worker para Firebase Cloud Messaging — notificações com app fechado

importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js')

// Configuração Firebase — será substituída pelas variáveis de ambiente no build
// O SW não tem acesso a import.meta.env, então usamos um config separado
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    const app = firebase.initializeApp(event.data.config)
    const messaging = firebase.messaging()

    messaging.onBackgroundMessage((payload) => {
      const { title, body, icon } = payload.notification || {}
      self.registration.showNotification(title || 'Desfume', {
        body: body || '',
        icon: icon || '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        data: payload.data,
        actions: [
          { action: 'open', title: 'Abrir app' },
          { action: 'dismiss', title: 'Dispensar' }
        ]
      })
    })
  }
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow('/'))
  }
})

// Cache básico para offline
const CACHE_NAME = 'desfume-v1'
self.addEventListener('install', (e) => {
  self.skipWaiting()
})
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim())
})
