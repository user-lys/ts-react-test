import React, { memo, useState, useCallback, useMemo, ReactElement } from 'react'
import useTimeout from '@/hooks/useTimeout'
// ActionVisible's props are injected by ActionProvider,
// all of them can't be undefined

interface Props {
  id: string,
  type: string,
  Component: any,
  initialVisible: boolean,
  componentProps: any,
  closeAction: any,
  removeDelay: number,
  forwardRef?: any
}

function ActionVisiable ({
  id,
  type,
  Component,
  initialVisible,
  componentProps,
  closeAction,
  removeDelay,
  forwardRef
}: Props): ReactElement {
  const [visible, setVisible] = useState(!!initialVisible)
  const closeActionDelay = useCallback(() => {
    closeAction(type, id)
  }, [closeAction, id, type])
  const [setCloseActionTimeout] = useTimeout(closeActionDelay, removeDelay)
  const open = useCallback(() => {
    setVisible(true)
  }, [])
  const close = useCallback(() => {
    setVisible(false)
    setCloseActionTimeout()
  }, [setCloseActionTimeout])
  const injectedActionProps = useMemo(() => {
    return { visible, open, close, id, type }
  }, [close, id, open, type, visible])

  const content = (
    <Component
      {...componentProps}
      ref={forwardRef}
      action={injectedActionProps}
    />
  )
  return content
}

export default memo(ActionVisiable)
