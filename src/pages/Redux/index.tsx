import React, { ReactElement } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux'
import {
  // decrement,
  // increment,
  incrementByAmount } from '../../store/features/counter/counterSlice'

export default function Redux (): ReactElement {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const add = () => {
    // dispatch(increment())
    // dispatch.counter.decrement()
    dispatch(incrementByAmount(3))
  }
  return (
    <div>
      {count}
      <button onClick={add}>按钮</button>
    </div>
  )
}
