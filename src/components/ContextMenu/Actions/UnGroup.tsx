import { useCallback, useMemo } from 'react';
import { UngroupOutlined } from '@ant-design/icons';
import { isGroupComponent } from '@/utils/Assist/Component';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const UnGroupAction = (props: CommonActionType) => {
  const {
    onClick,
    value,
    components,
    select,
    setComponent,
    setSelect,
    childrenType,
    disabled,
  } = props;

  const isUnGroup = useMemo(() => {
    return select.length === 1 && isGroupComponent(value);
  }, [select, value]);

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      const components = value.components || [];
      setComponent({
        action: 'un_group',
        id: value.id,
        value,
      });
      setSelect(components.map((item) => item.id));
      onClick?.();
    },
    [onClick, setComponent, components, select, setSelect, value],
  );

  const children = useChildren(childrenType, {
    title: '取消成组',
    icon: <UngroupOutlined />,
    key: 'un_group',
    onClick: handleClick,
    disabled,
    style: isUnGroup ? {} : { display: 'none' },
  });

  return children;
};

export default UnGroupAction;
