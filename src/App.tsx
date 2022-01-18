import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Drag from '@/pages/Drag'
import Redux from '@/pages/Redux'
import D3 from '@/pages/D3'
import MyModal from '@/pages/MyModal'
import useAction from '@/hooks/useAction'

const App: React.FC = function () {
  // const state = useSelector((state) => state);
  // const dispatch = useDispatch();
  // console.log(state);
  const openModal = useAction('TestModal')

  const handleClick = React.useCallback(() => {
    openModal()
  }, [openModal])
  return (
    <Routes>
      <Route path="/" element={<Drag />}></Route>
      <Route path="/count" element={<Redux />}></Route>
      <Route path="/d3" element={<D3 />}></Route>
      <Route path="/modal" element={<MyModal handleClick={handleClick}/>}></Route>
    </Routes>
  )
}

export default App
