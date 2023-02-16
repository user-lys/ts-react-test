import 'tslib'
import './index.css'
import App from './App'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'
import { ActionProvider } from './utils/ActionProvider'
// 可以通过向仓库派发动作的方式实现路由跳转。
// 每次路径发生变化时可以把最新的路径放到仓库里面，以便随时在仓库中获取。
import { store } from './store'
import { actions } from '@/store/actions'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ActionProvider actions={actions}>
                    <App />
                </ActionProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
// reportWebVitals(console.log) // 性能监控 https://www.jianshu.com/p/9d75592edb9e
serviceWorker.unregister()
