// redux store 常规配置方法
// import { applyMiddleware, createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunkMiddleware from 'redux-thunk'

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
// import rootReducer from './reducers'

// export default function configureStore(preloadedState) {
//   const middlewares = [loggerMiddleware, thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)

//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//   const composedEnhancers = composeWithDevTools(...enhancers)

//   const store = createStore(rootReducer, preloadedState, composedEnhancers)

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
//   }

//   return store
// }

// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import * as reducer from './reducer'
// const composeEnhancers =
//   (typeof window !== 'undefined' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose
// export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
import { configureStore
  // MiddlewareArray
} from '@reduxjs/toolkit'
import counter from './features/counter/counter'
import counterReducer from './features/counter/counterSlice'
// import logger from 'redux-logger'
// import additionalMiddleware from 'additional-middleware'
// import monitorReducersEnhancer from './enhancers/monitorReducers'
// // @ts-ignore
// import untypedMiddleware from 'untyped-middleware'

export const store: any = configureStore({
  reducer: {
    counter: counterReducer,
    counter2: counter
  }
  // 中间件
  // 如果你提供了 middleware 参数，则 configureStore 将仅使用你列出的 middleware。
  // 如果你想同时拥有自定义的 以及 默认的 middleware，
  // 你可以调用 getDefaultMiddleware 并将结果包括在你提供的 middleware 数组中。
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware()
  //     .prepend(
  //     // correctly typed middlewares can just be used
  //       additionalMiddleware,
  //     // you can also type middlewares manually
  //     untypedMiddleware as Middleware<
  //       (action: Action<'specialAction'>) => number,
  //       RootState
  //     >
  //     )
  //   // prepend and concat calls can be chained
  //     .concat(logger),

  // middleware: new MiddlewareArray().concat(additionalMiddleware, logger),
  // 写法不同,与上述写法功能相同
  // middleware: [additionalMiddleware, logger] as const

  // preloadedState(初始化state)是如何控制单一或通过combineReducer组合生成的reducer中
  // 手动加的state的默认值是否生效的
  // preloadedState,

  // enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。
  // 这与 middleware 相似，它也允许你通过复合函数改变 store 接口。
  // enhancers: [monitorReducersEnhancer]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
