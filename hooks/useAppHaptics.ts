import { useCallback } from 'react'
import { haptics } from '@/utils/telegram'

export function useAppHaptics() {
  const successHaptic = useCallback(() => {
    haptics.notification('success')
  }, [])

  const errorHaptic = useCallback(() => {
    haptics.notification('error')
  }, [])

  const warningHaptic = useCallback(() => {
    haptics.notification('warning')
  }, [])

  const selectionHaptic = useCallback(() => {
    haptics.selection()
  }, [])

  const buttonPressHaptic = useCallback(() => {
    haptics.impact('light')
  }, [])

  return {
    successHaptic,
    errorHaptic,
    warningHaptic,
    selectionHaptic,
    buttonPressHaptic
  }
}

