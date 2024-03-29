import { useMemo, useRef, useCallback, useState } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import Select from 'react-select';
import { CaretRightOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import { TSelectConfig } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const SelectBasic = (
  props: ComponentData.CommonComponentProps<TSelectConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const {
    active,
    base,
    indicator,
    menu,
    baseHover,
    activeHover,
    activeSelect: activeSelectStyle,
    placeholder,
    defaultValue,
  } = options;

  const [activeSelect, setActiveSelect] = useState<any>(defaultValue);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TSelectConfig>({
    component: value,
    global,
  });

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const selectOptions = useMemo(() => {
    return finalValue.map((item: any) => ({
      ...item,
      label: item.name,
    }));
  }, [finalValue]);

  // 从外部传入字符串的value需要单独处理
  const realActiveSelect = useMemo(() => {
    if (typeof activeSelect === 'string') {
      return selectOptions.find((item: any) => item.value === activeSelect);
    }
    return activeSelect;
  }, [activeSelect, selectOptions]);

  const onClick = useCallback(
    (item: any) => {
      syncInteractiveAction('select', item);
      setActiveSelect(item);
    },
    [syncInteractiveAction],
  );

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-interactive-select']);
  }, [className]);

  const activeStyle: any = useMemo(() => {
    const { textStyle, backgroundColor, ...nextActive } = activeSelectStyle;
    return {
      ...nextActive,
      ...textStyle,
      color: getRgbaString(textStyle.color),
      backgroundColor: getRgbaString(backgroundColor),
    };
  }, [activeSelectStyle]);

  const baseStyle: any = useMemo(() => {
    const { textStyle, backgroundColor, ...nexBase } = base;
    return {
      ...nexBase,
      ...textStyle,
      color: getRgbaString(textStyle.color),
      backgroundColor: getRgbaString(backgroundColor),
    };
  }, [active]);

  const activeHoverStyle: any = useMemo(() => {
    const { textStyle, backgroundColor, ...nextActiveHover } = activeHover;
    return {
      ...nextActiveHover,
      ...textStyle,
      color: getRgbaString(textStyle.color),
      backgroundColor: getRgbaString(backgroundColor),
    };
  }, [activeHover]);

  const baseHoverStyle: any = useMemo(() => {
    const { textStyle, backgroundColor, ...nextBaseHover } = baseHover;
    return {
      ...nextBaseHover,
      ...textStyle,
      color: getRgbaString(textStyle.color),
      backgroundColor: getRgbaString(backgroundColor),
    };
  }, [baseHover]);

  const components = useMemo(() => {
    return {
      IndicatorsContainer: () => {
        return (
          <CaretRightOutlined
            style={{
              transform: selectOpen ? 'rotate(90deg)' : 'rotate(0)',
              fontSize: `${indicator.fontSize}px`,
              color: getRgbaString(indicator.color),
              transition: 'rotate .3s',
            }}
          />
        );
      },
    };
  }, [indicator, selectOpen]);

  useUpdateEffect(() => {
    setActiveSelect(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <div
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        id={chartId.current}
      >
        <Wrapper border={border}>
          {children}
          <Select
            placeholder="请选择..."
            value={realActiveSelect}
            onMenuOpen={setSelectOpen.bind(null, true)}
            onMenuClose={setSelectOpen.bind(null, false)}
            onChange={onClick}
            isSearchable={false}
            components={components}
            styles={{
              placeholder(styles) {
                return {
                  ...styles,
                  ...placeholder.textStyle,
                  color: getRgbaString(placeholder.textStyle.color),
                };
              },
              // 容器
              container(styles) {
                return {
                  ...styles,
                  height: '100%',
                };
              },
              // 常规显示框
              control(styles) {
                return {
                  ...styles,
                  backgroundColor: getRgbaString(active.backgroundColor),
                  height: '100%',
                  borderRadius: DEFAULT_BORDER_RADIUS,
                  border: `${active.border.width}px ${
                    active.border.type
                  } ${getRgbaString(active.border.color)}`,
                  boxShadow: `0 0 1px ${getRgbaString(active.border.color)}`,
                  ':hover': {
                    borderColor: getRgbaString(active.border.color),
                  },
                };
              },
              // 选择框内容
              singleValue(styles) {
                return {
                  ...styles,
                  ...active.textStyle,
                  color: getRgbaString(active.textStyle.color),
                };
              },
              // 下拉框列表
              menu(styles) {
                return {
                  ...styles,
                  height: menu.height,
                  backgroundColor: getRgbaString(menu.backgroundColor),
                };
              },
              // 下拉框内容
              option(styles, { isSelected }) {
                return {
                  ...styles,
                  ...(isSelected ? activeStyle : baseStyle),
                  height: base.height,
                  lineHeight: `${base.height - 16}px`,
                  ':hover': isSelected ? activeHoverStyle : baseHoverStyle,
                  borderRadius: DEFAULT_BORDER_RADIUS,
                  overflow: 'hidden',
                };
              },
              // 下拉列表内部
              menuList(styles) {
                return {
                  ...styles,
                  maxHeight: menu.height,
                };
              },
            }}
            options={selectOptions}
          ></Select>
        </Wrapper>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        componentFilter={componentFilter}
      />
    </>
  );
};

const WrapperSelectBasic: typeof SelectBasic & {
  id: ComponentData.TComponentSelfType;
} = SelectBasic as any;

WrapperSelectBasic.id = CHART_ID;

export default WrapperSelectBasic;
