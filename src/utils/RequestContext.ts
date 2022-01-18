import { createContext } from 'react'
import axios from 'axios'
const RequestContext = createContext(axios)
export default RequestContext
