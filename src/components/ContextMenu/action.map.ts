import {
  UndoAction,
  RedoAction,
  GroupAction,
  ShowAction,
  TopAction,
  BottomAction,
  DeleteAction,
  CopyAction,
  LockAction,
  PasteAction,
  UnGroupAction,
  EditNameAction,
  NextOrderAction,
  PrevOrderAction,
  RecoverDefaultAction,
  ChangeComponentWithData,
  CopyComponentWithStyle,
} from './Actions';

export type ActionItemType =
  | 'undo'
  | 'redo'
  | 'top'
  | 'bottom'
  | 'delete'
  | 'copy'
  | 'group'
  | 'un_group'
  | 'paste'
  | 'show'
  | 'lock'
  | 'edit_name'
  | 'next_order'
  | 'prev_order'
  | 'recover_default'
  | 'change_component_with_data'
  | 'copy_component_with_style';

export type ActionItem = {
  type: ActionItemType;
  children: any;
};

export const DEFAULT_ACTION_LIST: ActionItem[] = [
  {
    type: 'next_order',
    children: NextOrderAction,
  },
  {
    type: 'prev_order',
    children: PrevOrderAction,
  },
  {
    type: 'undo',
    children: UndoAction,
  },
  {
    type: 'redo',
    children: RedoAction,
  },
  {
    type: 'top',
    children: TopAction,
  },
  {
    type: 'bottom',
    children: BottomAction,
  },
  {
    type: 'delete',
    children: DeleteAction,
  },
  {
    type: 'copy',
    children: CopyAction,
  },
  {
    type: 'paste',
    children: PasteAction,
  },
  {
    type: 'group',
    children: GroupAction,
  },
  {
    type: 'un_group',
    children: UnGroupAction,
  },
  {
    type: 'change_component_with_data',
    children: ChangeComponentWithData,
  },
  {
    type: 'copy_component_with_style',
    children: CopyComponentWithStyle,
  },
  {
    type: 'show',
    children: ShowAction,
  },
  {
    type: 'lock',
    children: LockAction,
  },
  {
    type: 'edit_name',
    children: EditNameAction,
  },
  {
    type: 'recover_default',
    children: RecoverDefaultAction,
  },
];

export const DEFAULT_ACTION_LIST_MAP = DEFAULT_ACTION_LIST.reduce<{
  [K in ActionItemType]: ActionItem;
}>((acc, cur) => {
  const { type } = cur;
  acc[type] = cur;
  return acc;
}, {} as any);
