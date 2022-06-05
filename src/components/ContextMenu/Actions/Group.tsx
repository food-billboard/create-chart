import { useCallback } from 'react';
import { GroupOutlined } from '@ant-design/icons';
import { CommonActionType } from './type';

const GroupAction = (props: CommonActionType) => {
  const { value, select, onClick, setComponent, setSelect } = props;

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      let selectId = '';

      setComponent({
        action: 'group',
        id: [value.id, ...select.filter((item) => item !== value.id)].join(','),
        value,
        callback: (_, id) => {
          selectId = id;
        },
      });

      selectId && setSelect([selectId]);

      onClick();
    },
    [setSelect, setComponent, select, onClick, value],
  );

  return (
    <div key="group" onClick={handleClick}>
      <GroupOutlined className="m-r-4" />
      成组
    </div>
  );
};

export default GroupAction;
