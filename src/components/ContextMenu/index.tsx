import { ReactNode, useCallback, useEffect, useState, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import { merge } from 'lodash';
import {
  ActionItemType,
  ActionItem,
  DEFAULT_ACTION_LIST,
  DEFAULT_ACTION_LIST_MAP,
} from './action.map';

const ContextMenu = (
  props: {
    actionIgnore?: ActionItemType[];
    onClick?: (value: ActionItem) => {
      [K in ActionItemType]: {
        action: 'delete' | 'add' | 'update';
        value?: Partial<ActionItem>;
      };
    };
    children?: ReactNode;
  } & Partial<DropDownProps>,
) => {
  const { actionIgnore, onClick, children, ...nextProps } = props;

  const [actionList, setActionList] =
    useState<ActionItem[]>(DEFAULT_ACTION_LIST);

  const resetActionList = (actionIgnore?: ActionItemType[]) => {
    if (!actionIgnore) return;
    setActionList(
      DEFAULT_ACTION_LIST.filter((item) => !actionIgnore.includes(item.type)),
    );
  };

  const handleClick = useCallback(
    (value, e) => {
      e.domEvent.stopPropagation();
      const result = onClick?.(value);
      if (result) {
        let newActionList = [...actionList];
        // loop the update result
        Object.entries(result).forEach((item) => {
          const [key, actionData] = item;
          const { action, value = {} } = actionData;

          let target!: ActionItem;

          newActionList = newActionList.filter((item) => {
            const isEqual = item.type === key;
            if (isEqual) target = item;
            return isEqual;
          });
          switch (action) {
            case 'add':
            case 'update':
              newActionList.push(
                merge(
                  {},
                  DEFAULT_ACTION_LIST_MAP[key as ActionItemType],
                  target || {},
                  value,
                ),
              );
            default:
              return;
          }
        });

        setActionList(newActionList);
      }
    },
    [onClick, actionList],
  );

  const menu = useMemo(() => {
    return (
      <Menu>
        {actionList.map((item) => {
          const { on, onTitle, offTitle, type } = item;
          return (
            <Menu.Item key={type} onClick={handleClick.bind(null, item)}>
              {on ? onTitle : offTitle}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }, []);

  useEffect(() => {
    resetActionList(actionIgnore);
  }, [actionIgnore]);

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']} {...nextProps}>
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
