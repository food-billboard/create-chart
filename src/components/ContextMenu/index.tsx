import { ReactNode, useEffect, useState, useMemo, useCallback } from 'react';
import { Dropdown, Menu } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import classnames from 'classnames';
import { connect } from 'dva';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { ActionItemType, ActionItem, DEFAULT_ACTION_LIST } from './action.map';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const ContextMenu = (
  props: {
    actionIgnore?: ActionItemType[];
    children?: ReactNode;
    value: ComponentData.TComponentData;
    path?: string;
    select: string[];
    clipboard: string[];
    components: ComponentData.TComponentData[];
    setSelect: (value: string[]) => void;
    setClipboard: (value: string[]) => void;
    setComponentAll: (value: ComponentData.TComponentData[]) => void;
    onClick?: (actionType: ActionItemType) => void;
    actionFrom: 'layer' | 'screen';
  } & Partial<DropDownProps>,
) => {
  const {
    actionIgnore,
    children,
    onVisibleChange: propsOnVisibleChange,
    value,
    path,
    select,
    setSelect,
    setComponentAll,
    components,
    overlayClassName,
    clipboard,
    setClipboard,
    onClick,
    actionFrom,
    ...nextProps
  } = props;
  const { id } = value;

  const [visible, setVisible] = useState<boolean>(false);
  const [actionList, setActionList] =
    useState<ActionItem[]>(DEFAULT_ACTION_LIST);

  const resetActionList = (actionIgnore?: ActionItemType[]) => {
    if (!actionIgnore) return;
    setActionList(
      DEFAULT_ACTION_LIST.filter((item) => !actionIgnore.includes(item.type)),
    );
  };

  const hiddenMenu = useCallback(
    (type: ActionItemType) => {
      setVisible(false);
      onClick?.(type);
    },
    [onClick],
  );

  const menu = useMemo(() => {
    return (
      <Menu
        items={actionList.map((item) => {
          const { type, children: Action } = item;
          return {
            label: (
              <Action
                key={type}
                value={value}
                select={select}
                path={path}
                setComponent={DataChangePool.setComponent}
                setSelect={setSelect}
                setComponentAll={setComponentAll}
                components={components}
                onClick={hiddenMenu.bind(null, type)}
                clipboard={clipboard}
                setClipboard={setClipboard}
                actionFrom={actionFrom}
              />
            ),
            key: type,
          };
        })}
      />
    );
  }, [
    actionList,
    value,
    select,
    setSelect,
    path,
    setComponentAll,
    components,
    clipboard,
    setClipboard,
    actionFrom,
  ]);

  useEffect(() => {
    resetActionList(actionIgnore);
  }, [actionIgnore]);

  const onVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        if (!select.includes(id)) {
          setSelect([id]);
        }
      }
      propsOnVisibleChange?.(visible);
      setVisible(visible);
    },
    [select, id, propsOnVisibleChange],
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['contextMenu']}
      onVisibleChange={onVisibleChange}
      visible={visible}
      overlayClassName={classnames(
        styles['context-menu-content'],
        overlayClassName,
      )}
      {...nextProps}
    >
      {children}
    </Dropdown>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
