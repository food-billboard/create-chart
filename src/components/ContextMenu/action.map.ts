import { ReactNode } from 'react';
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
  | 'lock';

export type ActionItem = {
  type: ActionItemType;
  children: any;
};

export const DEFAULT_ACTION_LIST: ActionItem[] = [
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
    type: 'show',
    children: ShowAction,
  },
  {
    type: 'lock',
    children: LockAction,
  },
];

export const DEFAULT_ACTION_LIST_MAP = DEFAULT_ACTION_LIST.reduce<{
  [K in ActionItemType]: ActionItem;
}>((acc, cur) => {
  const { type } = cur;
  acc[type] = cur;
  return acc;
}, {} as any);
