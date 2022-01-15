
export type ActionItemType = 'undo' | 'redo' | 'top' | 'bottom' | 'delete' | 'copy' | 'group' | 'show'

export type ActionItem = {
  type: ActionItemType
  multiple: boolean 
  onTitle: string 
  offTitle: string 
  disabled: boolean 
  on: boolean 
}

export const DEFAULT_ACTION_LIST: ActionItem[] = [
  {
    type: 'undo',
    multiple: false,
    onTitle: '撤销',
    offTitle: '撤销',
    disabled: true,
    on: true 
  },
  {
    type: 'redo',
    multiple: false,
    onTitle: '重做',
    offTitle: '重做',
    disabled: true,
    on: true 
  },
  {
    type: 'top',
    multiple: true,
    onTitle: '置顶',
    offTitle: '取消置顶',
    disabled: false,
    on: true 
  },
  {
    type: 'bottom',
    multiple: true,
    onTitle: '置底',
    offTitle: '取消置第',
    disabled: false,
    on: true 
  },
  {
    type: 'delete',
    multiple: false,
    onTitle: '删除',
    offTitle: '删除',
    disabled: false,
    on: true 
  },
  {
    type: 'copy',
    multiple: true,
    onTitle: '复制',
    offTitle: '粘贴',
    disabled: false,
    on: true 
  },
  {
    type: 'group',
    multiple: true,
    onTitle: '成组',
    offTitle: '取消成组',
    disabled: false,
    on: true 
  },
  {
    type: 'show',
    multiple: true,
    onTitle: '单独显示',
    offTitle: '取消单独显示',
    disabled: false,
    on: true 
  },
]

export const DEFAULT_ACTION_LIST_MAP = DEFAULT_ACTION_LIST.reduce<{
  [K in ActionItemType]: ActionItem
}>((acc, cur) => {
  const { type } = cur
  acc[type] = cur  
  return acc 
}, {} as any)