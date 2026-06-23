import { useState, useEffect, useCallback } from 'react'
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { localDateKey } from '../lib/stats'
import { useAuth } from '../contexts/AuthContext'

const DEFAULT_DATA = {
  onboardingDone: false,
  profile: {
    cigaretteBrand: '',
    packPrice: 12,
    cigarettesPerPack: 20,
    cigarettesPerDay: 20,
    smokingSince: '',
    startedAt: Date.now(),
    lastSmokeFreeStart: null,
    quitDate: null,
  },
  smoking: { logByDay: {}, totalLogged: 0 },
  medications: [],
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
        const initial = { ...DEFAULT_DATA, profile: { ...DEFAULT_DATA.profile, startedAt: Date.now(), lastSmokeFreeStart: Date.now() } }
        setDoc(ref, initial)
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
    const today = localDateKey()
    const ref = doc(db, 'userData', user.uid)
    const newCount = ((data.smoking?.logByDay?.[today] || 0) + 1)
    await updateDoc(ref, {
      [`smoking.logByDay.${today}`]: newCount,
      'smoking.totalLogged': (data.smoking?.totalLogged || 0) + 1,
      'profile.lastSmokeFreeStart': Date.now(),
    })
  }, [user, data])

  return { data, loaded, update, logCigarette }
}
