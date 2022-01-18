import { useEffect } from 'react'
export default function useDidMount (fn: Function) {
  useEffect(
    () => {
      fn()
    },
    // Deps must be empty.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
