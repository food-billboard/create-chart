import { ReactNode, useEffect, useState, useMemo, useCallback } from 'react';
import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import classnames from 'classnames';
import { isEqual } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { getGlobalSelect } from '@/utils/Assist/GlobalDva';
import { ActionItemType, ActionItem, DEFAULT_ACTION_LIST } from './action.map';
import styles from './index.less';

const ContextMenu = (
  props: {
    actionIgnore?: ActionItemType[];
    children?: ReactNode;
    value: ComponentData.TComponentData;
    path?: string;
    onClick?: (actionType: ActionItemType) => void;
    actionFrom: 'layer' | 'screen';
  } & Partial<DropDownProps>,
) => {
  const {
    actionIgnore,
    children,
    onOpenChange: propsOnVisibleChange,
    value,
    path,
    overlayClassName,
    onClick,
    actionFrom,
    ...nextProps
  } = props;
  const { id } = value;

  const {
    global: {
      components,
      clipboard,
      screenData: {
        config: {
          flag: { type: flag },
        },
      },
      setComponentAll,
      setSelect,
      setClipboard,
    },
  } = useMobxContext();

  const [visible, setVisible] = useState<boolean>(false);
  const [internalSelect, setInternalSelect] = useState<string[]>([]);
  const [actionList, setActionList] =
    useState<ActionItem[]>(DEFAULT_ACTION_LIST);

  const resetActionList = (actionIgnore?: ActionItemType[]) => {
    const baseActionIgnore = flag === 'H5' ? ['group', 'un_group'] : [];
    const realActionIgnore = actionIgnore
      ? [...actionIgnore, ...baseActionIgnore]
      : [...baseActionIgnore];
    if (!actionIgnore) return;
    setActionList(
      DEFAULT_ACTION_LIST.filter(
        (item) => !realActionIgnore.includes(item.type),
      ),
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
    return actionList.map((item) => {
      const { type, children: Action } = item;
      return {
        label: (
          <Action
            key={type}
            value={value}
            path={path}
            setComponent={DataChangePool.setComponent}
            setSelect={setSelect}
            setComponentAll={setComponentAll}
            components={components}
            onClick={hiddenMenu.bind(null, type)}
            clipboard={clipboard}
            setClipboard={setClipboard}
            actionFrom={actionFrom}
            select={internalSelect}
            flag={flag}
            childrenType="menu"
          />
        ),
        key: type,
      };
    });
  }, [
    actionList,
    value,
    setSelect,
    path,
    setComponentAll,
    components,
    clipboard,
    setClipboard,
    actionFrom,
    internalSelect,
    flag,
  ]);

  useEffect(() => {
    resetActionList(actionIgnore);
  }, [actionIgnore, flag]);

  const onVisibleChange = useCallback(
    (visible: boolean) => {
      const select = getGlobalSelect();
      if (visible) {
        if (!select.includes(id)) {
          setSelect([id]);
          setInternalSelect([id]);
        } else if (!isEqual(select, internalSelect)) {
          setInternalSelect(select);
        }
      }
      propsOnVisibleChange?.(visible);
      setVisible(visible);
    },
    [id, propsOnVisibleChange, internalSelect],
  );

  return (
    <Dropdown
      menu={{
        items: menu,
      }}
      trigger={['contextMenu']}
      onOpenChange={onVisibleChange}
      open={visible}
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

export default observer(ContextMenu);
