import { useCallback, useMemo } from 'react';
import GroupUtil from '@/utils/Assist/Group';
import { isGroupComponent } from '@/utils/Assist/Component';
import { CommonActionType } from './type';

const UnGroupAction = (props: CommonActionType) => {
  const { onClick, setComponentAll, value, components, select } = props;

  const isUnGroup = useMemo(() => {
    return select.length === 1 && isGroupComponent(value);
  }, [select, value]);

  const handleClick = useCallback(() => {
    const newComponents = GroupUtil.splitGroupConfig({
      clickTarget: value,
      components,
      select,
    });
    newComponents && setComponentAll(newComponents);

    onClick?.();
  }, [onClick, setComponentAll, components, select, value]);

  return (
    <div
      key="un_group"
      onClick={handleClick}
      style={{
        display: isUnGroup ? 'block' : 'none',
      }}
    >
      取消成组
    </div>
  );
};

export default UnGroupAction;
