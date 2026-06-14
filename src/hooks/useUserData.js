// src/hooks/useUserData.js
import { useState, useEffect, useCallback } from 'react'
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../contexts/AuthContext'

const DEFAULT_DATA = {
  onboardingDone: false,
  profile: {
    cigaretteBrand: '',
    packPrice: 12,
    cigarettesPerPack: 20,
    cigarettesPerDay: 20,
    smokingSince: '',
    quitDate: null,
    lastSmokeFreeStart: null,
  },
  smoking: {
    logByDay: {},       // { "2024-01-15": 5 }  — cigarros por dia
    totalLogged: 0,
  },
  medications: [],      // [{ id, name, dosage, times: ['08:00','20:00'], notes }]
  fagerScore: null,
  richScore: null,
  triggers: [],
  achievements: [],
  notificationsEnabled: false,
}

export function useUserData() {
  const { user } = useAuth()
  const [data, setData] = useState(DEFAULT_DATA)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!user) { setLoaded(true); return }
    const ref = doc(db, 'userData', user.uid)
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setData({ ...DEFAULT_DATA, ...snap.data() })
      } else {
        setDoc(ref, DEFAULT_DATA)
      }
      setLoaded(true)
    })
    return unsub
  }, [user])

  const update = useCallback(async (partial) => {
    if (!user) return
    const ref = doc(db, 'userData', user.uid)
    await updateDoc(ref, partial).catch(() => setDoc(ref, { ...DEFAULT_DATA, ...partial }))
  }, [user])

  const logCigarette = useCallback(async () => {
    if (!user) return
    const today = new Date().toISOString().split('T')[0]
    const ref = doc(db, 'userData', user.uid)
    const newCount = ((data.smoking.logByDay[today] || 0) + 1)
    await updateDoc(ref, {
      [`smoking.logByDay.${today}`]: newCount,
      'smoking.totalLogged': (data.smoking.totalLogged || 0) + 1,
      'profile.lastSmokeFreeStart': Date.now(),
    })
  }, [user, data])

  return { data, loaded, update, logCigarette }
}
