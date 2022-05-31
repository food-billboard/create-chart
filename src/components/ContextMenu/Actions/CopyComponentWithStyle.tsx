import { useCallback, useMemo } from 'react';
import { SkinOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { getComponent } from '@/utils/Assist/Component';
import { getComponentDefaultConfigByType } from '../../ChartComponents';
import { CommonActionType } from './type';

const CopyComponentWithStyle = (props: CommonActionType) => {
  const { select, setComponent, onClick, components } = props;

  // 组件数据
  const component = useMemo(() => {
    return getComponent(select[0], components);
  }, [select, components]);

  const canChange = useMemo(() => {
    return (
      !!component &&
      select.length === 1 &&
      component.componentType !== 'GROUP_COMPONENT'
    );
  }, [select, component]);

  const handleClick = useCallback(() => {
    const defaultConfig: any = getComponentDefaultConfigByType(
      component?.componentType,
    );
    const id = nanoid();

    setComponent({
      value: {
        ...component,
        config: {
          ...component.config,
          data: {
            ...defaultConfig.data,
          },
          interactive: {
            ...defaultConfig.interactive,
          },
        },
        id,
      },
      id,
      path: '',
      action: 'add',
    });
    onClick?.();
  }, [component, onClick]);

  return (
    <>
      <div
        key="copy_component_with_style"
        onClick={handleClick}
        style={{
          display: canChange ? 'block' : 'none',
        }}
      >
        <SkinOutlined className="m-r-4" />
        复制组件样式
      </div>
    </>
  );
};

export default CopyComponentWithStyle;
