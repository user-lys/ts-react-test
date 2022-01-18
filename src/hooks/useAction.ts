import { useContext, useCallback } from 'react'
import ActionContext from '@/utils/ActionContext'
export default function useAction (defaultType: any, defaultOptions?: any) {
  const { open: openAction } = useContext(ActionContext)
  const open = useCallback(
    (type?: any, props?: any, options?: any) => {
      if (defaultType) {
        options = props
        props = type
        type = defaultType
      }
      if (defaultOptions) {
        options = { ...defaultOptions, ...options }
      }
      return openAction(type, props, options)
    },
    [defaultOptions, defaultType, openAction]
  )
  return open
}
