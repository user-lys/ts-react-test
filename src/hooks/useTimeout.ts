import { useRef, useCallback, useMemo } from 'react'
import useWillUnmount from './useWillUnmount'
export default function useTimeout (fn: Function, delay = 0) {
  const timerRef = useRef(0)
  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = 0
    }
  }, [])
  const set = useCallback(
    (...args) => {
      timerRef.current = setTimeout(fn, delay, ...args)
    },
    [fn, delay]
  )
  useWillUnmount(clear)
  const result = useMemo(() => {
    return [set, clear]
  }, [clear, set])
  return result
}
