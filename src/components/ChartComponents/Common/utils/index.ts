import { merge } from 'lodash';
import ColorSelect from '@/components/ColorSelect';
import { useAnyDva } from '@/hooks';
import { RadialGradient, LinearGradient } from '@/utils/Assist/EchartsLoader';
import InteractiveUtil from '@/utils/Assist/Interactive';

const { getRgbaString } = ColorSelect;

export function radialGradientColor(value: ComponentData.TGradientColorConfig) {
  if (!value) return false;
  const { start, end, radialPosition, linearPosition, type } = value;
  const commonStepColor = [
    {
      offset: 0,
      color: getRgbaString(start),
    },
    {
      offset: 1,
      color: getRgbaString(end),
    },
  ];

  if (type === 'radial') {
    return RadialGradient(
      radialPosition.x,
      radialPosition.y,
      radialPosition.r,
      commonStepColor,
    );
  }

  return LinearGradient(
    linearPosition.startX,
    linearPosition.startY,
    linearPosition.endX,
    linearPosition.endY,
    commonStepColor,
  );
}

export function boxShadow(value: ComponentData.TBoxShadow) {
  if (!value) return false;
  const { hShadow, vShadow, blur, spread, color } = value;
  return `${hShadow}px ${vShadow}px ${blur}px ${spread}px ${getRgbaString(
    color,
  )}`;
}

type Params = {
  // 是否更改的是默认值(也可能是variable)
  isDefaultValue?: true | 'variable';
  // base
  interactive: ComponentData.TBaseInteractiveConfig[];
  // 新值
  newValue: string;
  // 目标更改的交互，不传就检索所有
  targetInteractiveName?: string;
  // 组件的id
  componentId: string;
  // 自定义更改field
  callback?: (
    field: ComponentData.TBaseInteractiveConfigField,
    updateExtra: SuperPartial<ComponentData.TBaseInteractiveConfigField>,
  ) => SuperPartial<ComponentData.TBaseInteractiveConfigField> | boolean;
};
// 处理需要从基础配置同步默认值的情况
export function updateInteractiveAndSyncParams(
  params: Params,
): SuperPartial<ComponentData.TComponentData> | null {
  const {
    interactive,
    targetInteractiveName,
    callback,
    newValue,
    isDefaultValue = true,
    componentId,
  } = params;
  const { dispatch, getState } = useAnyDva();
  const setParams: ComponentData.SetParamsFunction = (params, changeParams) =>
    dispatch({
      type: 'global/setParams',
      value: params,
      changeValue: changeParams,
    });
  try {
    const params = getState().global.screenData.config.attr.params;
    return {
      config: {
        interactive: {
          base: interactive.map((interactive) => {
            if (
              !!targetInteractiveName &&
              interactive.name !== targetInteractiveName
            )
              return interactive;

            return {
              ...interactive,
              fields: interactive.fields.map((item) => {
                // 默认值或者自定义
                const key =
                  isDefaultValue === true ? 'defaultValue' : isDefaultValue;
                // 当前值
                const updateValue = item[key];
                // 变量名称
                // ? 如果variable为空可能无法绑定到params上，看是否后续支持没有variable直接绑定到key上
                const variable = key === 'variable' ? newValue : item.variable;
                // 默认值
                const realValue =
                  key === 'defaultValue' ? newValue : item.defaultValue;
                let mapId = item.mapId;

                // 直接中断更新
                if (updateValue === newValue) throw new Error();

                function genMapId() {
                  if (['defaultValue', 'variable'].includes(key)) {
                    // sync the global params
                    mapId = InteractiveUtil.updateBaseInteractiveVariable(
                      {
                        params,
                        setParams,
                      },
                      {
                        variable,
                        id: item.mapId,
                        origin: componentId,
                        key: item.key,
                        show: interactive.show,
                        originId: interactive.type,
                        value: realValue,
                      },
                    );
                  }
                }

                if (callback) {
                  let newItem = item;
                  const result = callback(item, { mapId });
                  if (typeof result === 'boolean') {
                    if (result) {
                      genMapId();
                      newItem = {
                        ...newItem,
                        mapId,
                        [key]: newValue,
                      };
                    }
                  } else {
                    newItem = {
                      ...newItem,
                      ...result,
                    };
                  }
                  return newItem;
                }
                genMapId();
                return {
                  ...item,
                  [key]: newValue,
                  mapId,
                };
              }),
            };
          }),
        },
      },
    };
  } catch (err) {
    return null;
  }
}

// 根据上面的函数的包装，专门用于组件设置默认值时的情况
export function updateInteractiveAndSyncParams4Component<T extends object = {}>(
  params: {
    props: ComponentData.ComponentConfigProps<T>;
    newValue: any;
    key: keyof T;
    defaultValueKey: (keyof T)[] | keyof T;
  } & Pick<Params, 'callback'>,
) {
  const { props, newValue, callback, key, defaultValueKey } = params;
  let updateData: SuperPartial<ComponentData.TComponentData<T>> = {
    config: {
      // @ts-ignore
      options: {
        [key]: newValue,
      },
    },
  };
  const realDefaultValueKey = Array.isArray(defaultValueKey)
    ? defaultValueKey
    : [defaultValueKey];
  if (realDefaultValueKey.includes(key)) {
    const { config, id } = props.value;
    const { base = [] } = config.interactive || {};
    const result = updateInteractiveAndSyncParams({
      componentId: id,
      interactive: base,
      newValue,
      callback,
    });
    if (result) updateData = merge(updateData, result);
  }
  return updateData;
}

// 公共处理文字样式
export function parseTextStyle(textStyle: ComponentData.TFontConfig) {
  return {
    ...textStyle,
    color: getRgbaString(textStyle.color),
  };
}
