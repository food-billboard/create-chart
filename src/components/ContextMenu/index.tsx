import { useGlobalLoading } from '@/hooks';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { getGlobalSelect } from '@/utils/Assist/GlobalDva';
import type { DropDownProps } from 'antd/es/dropdown';
import { isEqual } from 'lodash';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'umi';
import Dropdown from '../ChartComponents/Common/Dropdown';
import { ActionItem, ActionItemType, DEFAULT_ACTION_LIST } from './action.map';
import { mapDispatchToProps, mapStateToProps } from './connect';

const ContextMenu = (
  props: {
    actionIgnore?: ActionItemType[];
    children?: ReactNode;
    value: ComponentData.TComponentData;
    path?: string;
    clipboard: ComponentClipboard.LocalClipboardType;
    components: ComponentData.TComponentData[];
    setSelect: (value: string[]) => void;
    setClipboard: (value: string[]) => void;
    setComponentAll: (value: ComponentData.TComponentData[]) => void;
    onClick?: (actionType: ActionItemType) => void;
    actionFrom: 'layer' | 'screen';
    flag: ComponentData.ScreenFlagType;
  } & Partial<DropDownProps>,
) => {
  const {
    actionIgnore,
    children,
    onOpenChange: propsOnVisibleChange,
    value,
    path,
    setSelect,
    setComponentAll,
    components,
    clipboard,
    setClipboard,
    onClick,
    actionFrom,
    flag,
    ...nextProps
  } = props;
  const { id } = value;

  const [visible, setVisible] = useState<boolean>(false);
  const [internalSelect, setInternalSelect] = useState<string[]>([]);
  const [actionList, setActionList] =
    useState<ActionItem[]>(DEFAULT_ACTION_LIST);

  const { isGlobalActionLoading } = useGlobalLoading();

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
      const label = (
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
      );
      return {
        label,
        key: type,
        style: {
          padding: 0,
        },
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
      const action = async () => {
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
      };
      if (visible) {
        isGlobalActionLoading({
          needLoading: false,
          globalLoadingAction: action,
        });
      } else {
        action();
      }
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
      {...nextProps}
    >
      {children}
    </Dropdown>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
