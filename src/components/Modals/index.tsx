import React, { forwardRef, useCallback, ReactNode } from 'react'
import { Modal } from 'antd'

interface Props {
  action: any,
  onOk: any,
  children?: ReactNode,
  title: string
}

const ActionModal = ({ action, onOk, title, children, ...rest }: Props, ref?: any) => {
  const { visible, close } = action

  const handleOk = useCallback((e) => {
    if (onOk) {
      onOk(e)
    }
    close()
  }, [close, onOk])
  return (
    <Modal
      {...rest}
      ref={ref}
      title={title}
      visible={visible}
      onCancel={close}
      onOk={handleOk}
    >
      {children}
    </Modal>
  )
}

export default forwardRef(ActionModal)
