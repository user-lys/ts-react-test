import { useEffect } from 'react'
export default function useWillUnmount (fn: any) {
  useEffect(() => {
    return fn
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
