import { useCallback, useMemo } from 'react';
import { SkinOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { getComponent } from '@/utils/Assist/Component';
import { getComponentDefaultConfigByType } from '../../ChartComponents';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const CopyComponentWithStyle = (props: CommonActionType) => {
  const { select, setComponent, onClick, components, childrenType, disabled } =
    props;

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

  const children = useChildren(childrenType, {
    title: '复制组件样式',
    icon: <SkinOutlined />,
    key: 'copy_component_with_style',
    onClick: handleClick,
    disabled,
    style: canChange ? {} : { display: 'none' },
  });

  return children;
};

export default CopyComponentWithStyle;
