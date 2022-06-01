import { useCallback } from 'react';
import { GroupOutlined } from '@ant-design/icons';
import { CommonActionType } from './type';

const GroupAction = (props: CommonActionType) => {
  const { value, components, select, onClick, setComponent } = props;

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      setComponent({
        action: 'group',
        id: [value.id, ...select.filter((item) => item !== value.id)].join(','),
        value,
      });

      onClick();
    },
    [components, setComponent, select, onClick],
  );

  return (
    <div key="group" onClick={handleClick}>
      <GroupOutlined className="m-r-4" />
      成组
    </div>
  );
};

export default GroupAction;
