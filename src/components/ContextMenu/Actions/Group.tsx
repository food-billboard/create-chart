import { useCallback } from 'react';
import GroupUtil from '@/utils/Assist/Group';
import { CommonActionType } from './type';

const GroupAction = (props: CommonActionType) => {
  const { value, setComponentAll, components, select, onClick } = props;

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      const newComponents = GroupUtil.generateGroupConfig({
        select,
        components,
        clickTarget: value,
      });

      newComponents && setComponentAll(newComponents);
      onClick();
    },
    [components, setComponentAll, select, onClick],
  );

  return (
    <div key="group" onClick={handleClick}>
      成组
    </div>
  );
};

export default GroupAction;
