import { lazy } from 'react'
export const actions = [
  {
    type: 'TestModal',
    component: lazy(() => import('@/components/Modals/index'))
  }
]
