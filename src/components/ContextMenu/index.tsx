import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ContextMenu as ReactContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import { nanoid } from 'nanoid'
import { merge } from 'lodash'
import { ActionItemType, ActionItem, DEFAULT_ACTION_LIST, DEFAULT_ACTION_LIST_MAP } from './action.map'

const ContextMenu = (props: {
  actionIgnore: ActionItemType[]
  onClick?: (value: ActionItem) => ({
    [K in ActionItemType]: {
      action: 'delete' | 'add' | 'update'
      value?: Partial<ActionItem>
    } 
  }) 
  children?: ReactNode
}) => {

  const { actionIgnore, onClick, children } = props 

  const contextId = useRef<string>(nanoid())
  const [
    actionList,
    setActionList
  ]= useState<ActionItem[]>([])

  const resetActionList = (actionIgnore: ActionItemType[]) => {
    setActionList(DEFAULT_ACTION_LIST.filter(item => !actionIgnore.includes(item.type)))
  }

  const handleClick = useCallback((value: ActionItem) => {
    const result = onClick?.(value)
    if(result) {
      let newActionList = [
        ...actionList
      ]
      // loop the update result 
      Object.entries(result).forEach(item => {
        const [ key, actionData ] = item
        const {
          action,
          value={}
        } = actionData

        let target!: ActionItem 

        newActionList = newActionList.filter(item => {
          const isEqual = item.type === key
          if(isEqual) target = item 
          return isEqual
        })
        switch(action) {
          case 'add':
          case 'update':
            newActionList.push(merge({}, DEFAULT_ACTION_LIST_MAP[key as ActionItemType], target || {}, value))
          default:
            return 
        }

      })

      setActionList(newActionList)

    }
  }, [onClick, actionList])

  useEffect(() => {
    resetActionList(actionIgnore)
  }, [actionIgnore])

  return (
    <>
      <ContextMenuTrigger id={contextId.current}>
        {children}
      </ContextMenuTrigger>
 
      <ReactContextMenu id={contextId.current}>
        {
          actionList.map(item => {
            const { on, onTitle, offTitle, type } = item 
            return (
              <MenuItem key={type} data={item} onClick={handleClick}>
                {
                  on ? onTitle : offTitle
                }
              </MenuItem>
            )
          })
        }
      </ReactContextMenu>
    </>
  )

}

export default ContextMenu