import { useCallback, useMemo, useRef } from 'react';
import { SwitcherOutlined } from '@ant-design/icons';
import { get, omit } from 'lodash';
import ComponentSelect, {
  ComponentSelectRef,
} from '@/components/ComponentSelect';
import { getComponent } from '@/utils/Assist/Component';
import { getComponentDefaultConfigByType } from '../../ChartComponents';
import { CommonActionType } from './type';

const ChangeComponentWithData = (props: CommonActionType) => {
  const { select, setComponent, onClick, components } = props;

  const componentSelectRef = useRef<ComponentSelectRef>(null);

  // 组件数据
  const component = useMemo(() => {
    return getComponent(select[0], components);
  }, [select, components]);

  const canChange = useMemo(() => {
    return select.length === 1 && component.componentType !== 'GROUP_COMPONENT';
  }, [select, component]);

  // 组件类型
  const componentType = useMemo(() => {
    if (!canChange) return '';
    return component?.componentType || '';
  }, [canChange, component]);

  // 组件的数据字段
  const componentMap = useMemo(() => {
    if (!componentType) return [];
    const defaultConfig = getComponentDefaultConfigByType(componentType);
    return get(defaultConfig, 'data.filter.map') || [];
  }, [componentType]);

  // 过滤不合理的组件
  const filterComponent = useCallback(
    (value) => {
      const { type } = value;
      const defaultConfig = getComponentDefaultConfigByType(type);
      const map = get(defaultConfig, 'data.filter.map') || [];
      return (
        map.length === componentMap.length &&
        map.every((item: any) => {
          return componentMap.some((map: any) => {
            return map.field === item.field && map.type === item.type;
          });
        })
      );
    },
    [componentMap],
  );

  const handleClick = useCallback(() => {
    componentSelectRef.current?.open(componentType);
    onClick?.();
  }, [componentType, onClick]);

  const onChangeComponent = useCallback(
    (value, info = {}) => {
      if (!value || !component) return;
      const defaultConfig: any = getComponentDefaultConfigByType(value);
      setComponent({
        value: {
          ...component,
          ...omit(info, ['type']),
          componentType: info.type,
          config: {
            ...component.config,
            options: {
              ...defaultConfig.options,
            },
            interactive: {
              ...defaultConfig.interactive,
            },
          },
        },
        id: component.id,
        path: '',
        action: 'cover_update',
      });
    },
    [setComponent, component],
  );

  return (
    <>
      <div
        key="change_component_with_data"
        onClick={handleClick}
        style={{
          display: canChange ? 'block' : 'none',
        }}
      >
        <SwitcherOutlined className="m-r-4" />
        根据数据切换组件
      </div>
      <ComponentSelect
        ref={componentSelectRef}
        onChange={onChangeComponent}
        filter={filterComponent}
      />
    </>
  );
};

export default ChangeComponentWithData;
