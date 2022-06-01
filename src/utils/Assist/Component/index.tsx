import { CSSProperties } from 'react';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import { useIdPathMap } from '@/hooks';
import { getComponentDefaultConfigByType } from '@/components/ChartComponents';
import ColorSelect from '@/components/ColorSelect';
import { DEFAULT_CONDITION_CONFIG } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import { mergeWithoutArray } from '../../tool';
import { EComponentType, EComponentSelfType } from '../../index';
import { DEFAULT_CONFIG } from '../../constants/screenData';
import ThemeUtil from '../Theme';
import ComponentUtil, { getParentPath } from './ComponentUtil';

const { getRgbaString } = ColorSelect;

export { getParentPath } from './ComponentUtil';

const componentUtil = new ComponentUtil();

// generate template component
export const createComponent: (
  component: SuperPartial<ComponentData.TComponentData> & {
    componentType: ComponentData.TComponentSelfType;
  },
) => ComponentData.TComponentData = (component) => {
  const defaultConfig = getComponentDefaultConfigByType(
    component.componentType,
  );
  return mergeWithoutArray(
    {},
    {
      description: component.name || `component-${Date.now()}`,
      type: EComponentType.COMPONENT,
      config: mergeWithoutArray(
        {},
        DEFAULT_CONFIG,
        {
          interactive: {
            base: [],
          },
          data: {
            request: {
              url: '',
              method: 'POST',
              headers: '{}',
              body: '{}',
              frequency: {
                show: false,
                value: 15,
              },
              type: 'static',
              value: [],
              valueType: 'array',
            },
            filter: {
              show: false,
              fields: [],
              value: {},
              map: [],
            },
          },
        },
        defaultConfig,
      ),
      components: [],
    },
    component,
    {
      id: nanoid(),
    },
  );
};

// generate template group component
export const createGroupComponent = (
  component: SuperPartial<ComponentData.TComponentData>,
) => {
  const name = `组-${Date.now()}`;
  return mergeWithoutArray(
    {},
    {
      id: nanoid(),
      description: name,
      name,
      type: EComponentType.GROUP_COMPONENT,
      componentType: EComponentSelfType.GROUP_COMPONENT,
      config: {
        ...DEFAULT_CONFIG,
        options: {
          condition: [DEFAULT_CONDITION_CONFIG()],
        },
      },
    },
    component,
  );
};

export const getParentComponent = (
  components: ComponentData.TComponentData[],
  path: string,
) => {
  return get(components, getParentPath(path));
};

export const getPath = (select: string) => {
  const idPathMap = useIdPathMap();
  return (idPathMap[select] || {}).path;
};

export const getComponent = (
  select: string,
  components: ComponentData.TComponentData[],
) => {
  return get(components, getPath(select)) as ComponentData.TComponentData;
};

export const isGroupComponent = (
  component: SuperPartial<ComponentData.TComponentData> & {
    type: ComponentData.TComponentType;
  },
) => {
  return EComponentType.GROUP_COMPONENT === component.type;
};

// 组件是否锁定
export const isComponentDisabled = (select: string) => {
  const idPathMap = useIdPathMap();
  const target = idPathMap[select];
  return !target || !!target.lock;
};

// 组件在不同 screenType 下的样式
export const getComponentStyleInScreenType: (
  screenType: ComponentData.ScreenType,
) => CSSProperties = (screenType) => {
  if (screenType === 'preview') {
    return {};
  }
  return {
    pointerEvents: 'none',
    borderColor: getRgbaString(ThemeUtil.generateNextColor4CurrentTheme(0)),
  };
};

export default componentUtil;
