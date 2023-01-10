import { useCallback, useMemo } from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { getComponentDefaultConfigByType } from '../../ChartComponents';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const RecoverDefaultAction = (props: CommonActionType) => {
  const {
    value,
    path,
    setComponent,
    components,
    select,
    onClick,
    childrenType,
    disabled,
  } = props;
  const { id, componentType } = value;

  const canRecover = useMemo(() => {
    return select.length === 1;
  }, [select]);

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      const defaultConfig: any = getComponentDefaultConfigByType(componentType);
      const { options } = defaultConfig;
      setComponent({
        value: {
          config: {
            options,
          },
        },
        id,
        path,
        action: 'update',
      });
      onClick();
    },
    [id, path, componentType, components, select, onClick],
  );

  const children = useChildren(childrenType, {
    title: '恢复默认配置',
    icon: <Loading3QuartersOutlined />,
    key: 'recover_default',
    onClick: handleClick,
    disabled,
    style: canRecover ? {} : { display: 'none' },
  });

  return children;
};

export default RecoverDefaultAction;
