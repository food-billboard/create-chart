import { useCallback } from 'react';
import { GroupOutlined } from '@ant-design/icons';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const GroupAction = (props: CommonActionType) => {
  const {
    value,
    select,
    onClick,
    setComponent,
    setSelect,
    childrenType,
    disabled,
    flag,
  } = props;

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

  const children = useChildren(childrenType, {
    title: '成组',
    icon: <GroupOutlined />,
    key: 'group',
    onClick: handleClick,
    disabled,
    style: flag === 'PC' ? {} : { display: 'none' },
  });

  return children;
};

export default GroupAction;
