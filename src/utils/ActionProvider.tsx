import React, { useState, useCallback, useMemo, Suspense, ReactElement, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { uuid } from './index'
import ActionContext from './ActionContext'
import useDidUpdate from '@/hooks/useDidUpdate'
import ActionLoading from './ActionLoading'
import ActionVisible from './ActionVisiable'

const DEFAULT_OPTIONS = {
  removeDelay: 300,
  initialVisible: true,
  Loading: ActionLoading,
  loadingProps: undefined
}

const NOOP = { update: () => {}, close: () => {} }

const isDevEnv = process.env.NODE_ENV === 'production'

if (isDevEnv) Object.freeze(NOOP)

interface Props {
  actions: {
    type: string
    component: Function
  }[],
  removeDelay?: number,
  initialVisible?: boolean,
  Loading?: any,
  loadingProps?: any,
  children?: ReactNode
}

export const ActionProvider = ({
  actions,
  removeDelay,
  initialVisible,
  Loading,
  loadingProps,
  children }: Props): ReactElement => {
  const {
    pathname
  } = useLocation()

  // Override default options
  const providerOptions = useMemo(() => {
    const result = { ...DEFAULT_OPTIONS }
    if (initialVisible !== undefined) result.initialVisible = initialVisible
    if (removeDelay !== undefined) result.removeDelay = removeDelay
    if (Loading !== undefined) result.Loading = Loading
    if (loadingProps !== undefined) result.loadingProps = loadingProps
    return result
  }, [Loading, initialVisible, loadingProps, removeDelay])

  const [visibleActions, setVisibleActions] = useState<any[]>([])
  // If `type` and `id` are undefined, close all actions,
  // otherwise close specified action
  const close = useCallback((type?:string, id?:string) => {
    if (type === undefined && id === undefined) {
      setVisibleActions([])
    } else {
      if (type !== undefined && id !== undefined) {
        setVisibleActions(visibleActions =>
          visibleActions.filter(
            visibleAction =>
              !(visibleAction.type === type && visibleAction.id === id)
          )
        )
      } else if (type !== undefined) {
        setVisibleActions(visibleActions =>
          visibleActions.filter(visibleAction => visibleAction.type !== type)
        )
      } else if (id !== undefined) {
        setVisibleActions(visibleActions =>
          visibleActions.filter(visibleAction => visibleAction.id !== id)
        )
      }
    }
  }, [])
  const open = useCallback(
    (type, props, options) => {
      if (isDevEnv) {
        if (typeof type !== 'string' || type === '') {
          console.error('`type` muse be an non-empty string')
        }
        if (props !== undefined) {
          if (typeof props !== 'object' || props === null) {
            console.error('`props` must be an object')
          }
          if (props.action !== undefined) {
            console.error(
              "You can't provide a prop named `action` for a global action component"
            )
          }
        }
        if (options !== undefined) {
          if (typeof options !== 'object' || options === null) {
            console.error('`options` must be an object')
          }
          if (options.id !== undefined) {
            if (typeof options.id !== 'string' || options.id === '') {
              console.error('`options.id` must be an non-empty string')
            }
          }
          if (options.removeDelay !== undefined) {
            if (
              typeof options.removeDelay !== 'number' ||
              options.removeDelay < 0 ||
              isNaN(options.removeDelay)
            ) {
              console.error(
                '`options.removeDelay` must be an integer greater than or equal to zero'
              )
            }
          }
        }
      }
      // Create a visible action object
      const newVisibleAction = {
        type,
        props,
        id: options && options.id !== undefined ? options.id : uuid(),
        ref: options && options.ref,
        initialVisible:
          options && options.initialVisible !== undefined
            ? options.initialVisible
            : providerOptions.initialVisible,
        removeDelay:
          options && options.removeDelay !== undefined
            ? options.removeDelay
            : providerOptions.removeDelay,
        Loading:
          options && options.Loading !== undefined
            ? options.Loading
            : providerOptions.Loading,
        loadingProps:
          options && options.loadingProps !== undefined
            ? options.loadingProps
            : providerOptions.loadingProps
      }
      // Can't open action of the same `type` and `id`
      if (
        visibleActions.find(
          visibleAction =>
            visibleAction.type === newVisibleAction.type &&
            visibleAction.id === newVisibleAction.id
        )
      ) {
        if (isDevEnv) {
          console.error(
            `Can't open action of the same \`type\`(${newVisibleAction.type}) and \`id\`(${newVisibleAction.id})`
          )
        }
      } else {
        setVisibleActions(visibleActions => [
          ...visibleActions,
          newVisibleAction
        ])
        return {
          update: (newProps: any) => {
            setVisibleActions(visibleActions => {
              visibleActions = [...visibleActions]
              const action = visibleActions.find(item => {
                return (
                  item.type === newVisibleAction.type &&
                  item.id === newVisibleAction.id
                )
              })
              if (action) {
                if (typeof newProps === 'function') {
                  action.props = newProps({ ...action.props })
                } else if (typeof newProps === 'object' && newProps != null) {
                  action.props = { ...action.props, ...newProps }
                } else {
                  if (isDevEnv) {
                    console.error('`newProps` must be an object or a function')
                  }
                }
              }
              return visibleActions
            })
          },
          close: () => {
            close(newVisibleAction.type, newVisibleAction.id)
          }
        }
      }
      // If open with hints, return a noop
      return NOOP
    },
    [
      close,
      providerOptions.Loading,
      providerOptions.initialVisible,
      providerOptions.loadingProps,
      providerOptions.removeDelay,
      visibleActions
    ]
  )
  // Cache provider value avoid generating different value on every update

  const providerValue = useMemo(
    () => ({
      actions,
      visibleActions,
      open,
      close
    }),
    [actions, close, open, visibleActions]
  )
  // Render visible actions
  const renderVisibleActions = useMemo(() => {
    return providerValue.visibleActions
      .map(visibleAction => {
        const action = actions.find(
          (_action: any) => {
            return _action.type === visibleAction.type
          }
        )

        if (action) {
          return (
            <Suspense
              key={visibleAction.id}
              fallback={
                <ActionVisible
                  id={visibleAction.id}
                  type={visibleAction.type}
                  initialVisible={false}
                  removeDelay={visibleAction.removeDelay}
                  Component={visibleAction.Loading}
                  componentProps={visibleAction.loadingProps}
                  closeAction={close}
                />
              }
            >
              <ActionVisible
                id={visibleAction.id}
                type={visibleAction.type}
                initialVisible={visibleAction.initialVisible}
                removeDelay={visibleAction.removeDelay}
                Component={action.component}
                componentProps={visibleAction.props}
                closeAction={close}
                forwardRef={visibleAction.ref}
              />
            </Suspense>
          )
        } else {
          if (isDevEnv) {
            console.error(`Can't find the \`${visibleAction.type}\` action.`)
          }
        }
        return null
      })
      .filter(Boolean)
  }, [actions, close, providerValue.visibleActions])
  // Close all actions when router pathname changing.
  useDidUpdate(() => {
    close()
  }, [pathname] as any)

  return (
    <ActionContext.Provider value={providerValue as any}>
      {children}
      {renderVisibleActions}
    </ActionContext.Provider>
  )
}
