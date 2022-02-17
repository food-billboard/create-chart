import { useCallback } from 'react';
import { GroupOutlined } from '@ant-design/icons';
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
      <GroupOutlined className="m-r-4" />
      成组
    </div>
  );
};

export default GroupAction;
