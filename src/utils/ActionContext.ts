import { createContext } from 'react'

const ActionContext = createContext({
  actions: [],
  visibleActions: [],
  open: (type: String, props: Object, options: Object) => {},
  close: (type: String, id: String) => {}
})
export default ActionContext
