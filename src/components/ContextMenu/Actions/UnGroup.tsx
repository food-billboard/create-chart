import { useCallback, useMemo } from 'react';
import { UngroupOutlined } from '@ant-design/icons';
import { isGroupComponent } from '@/utils/Assist/Component';
import { CommonActionType } from './type';

const UnGroupAction = (props: CommonActionType) => {
  const { onClick, value, components, select, setComponent } = props;

  const isUnGroup = useMemo(() => {
    return select.length === 1 && isGroupComponent(value);
  }, [select, value]);

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      setComponent({
        action: 'un_group',
        id: value.id,
        value,
      });
      onClick?.();
    },
    [onClick, setComponent, components, select, value],
  );

  return (
    <div
      key="un_group"
      onClick={handleClick}
      style={{
        display: isUnGroup ? 'block' : 'none',
      }}
    >
      <UngroupOutlined className="m-r-4" />
      取消成组
    </div>
  );
};

export default UnGroupAction;
