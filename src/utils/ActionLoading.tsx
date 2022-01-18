import React, { memo, useMemo, ReactNode, FC, ReactElement } from 'react'
import { Drawer, Modal, Spin } from 'antd'
import useTimeout from '@/hooks/useTimeout'
import useDidMount from '@/hooks/useDidMount'

enum myType {
  'modal',
  'drawer'
}

interface Props {
  action: {
    visible: boolean,
    open: () => {},
    close: () => {},
  },
  type: myType,
  delay: number,
  children: ReactNode,
};

const myChildren: FC<any> = () => {
  const content = (
  <div style={{ textAlign: 'center', padding: '24px 0' }}>
    <Spin />
  </div>)
  return content
}

function ActionLoading ({ type = myType.modal, delay = 300, children = myChildren, action, ...rest }: Props): ReactElement {
  const { visible, open, close } = action
  // Open after `delay` ms
  const [startOpenTimer] = useTimeout(open, delay)
  useDidMount(startOpenTimer)

  const overlayProps = useMemo(() => {
    switch (type) {
      case myType.drawer:
        return {
          visible,
          onClose: close,
          destroyOnClose: true,
          ...rest
        }
      case myType.modal:
      default:
        return {
          visible,
          onCancel: close,
          footer: null,
          destroyOnClose: true,
          maskClosable: false,
          ...rest
        }
    }
  }, [close, rest, type, visible])

  return type === myType.drawer ? <Drawer {...overlayProps}>{children}</Drawer> : <Modal {...overlayProps}>{children}</Modal>
}

export default memo(ActionLoading)
