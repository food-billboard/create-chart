import { useCallback, useMemo } from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { getComponentDefaultConfigByType } from '../../ChartComponents';
import { CommonActionType } from './type';

const RecoverDefaultAction = (props: CommonActionType) => {
  const { value, path, setComponent, components, select, onClick } = props;
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

  return (
    <div
      key="recover_default"
      onClick={handleClick}
      style={{
        display: canRecover ? 'block' : 'none',
      }}
    >
      <Loading3QuartersOutlined className="m-r-4" />
      恢复默认配置
    </div>
  );
};

export default RecoverDefaultAction;
