import { CSSProperties, useMemo, useRef, useCallback, useState } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import Select from 'react-select';
import { CaretRightOutlined } from '@ant-design/icons';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TSelectConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'SELECT';

const SelectBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TSelectConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    id,
    config: { options },
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
  } = options;

  const [activeSelect, setActiveSelect] = useState<number>(0);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TSelectConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

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
        <Select
          placeholder="?????????..."
          value={activeSelect}
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
            // ??????
            container(styles) {
              return {
                ...styles,
                height: '100%',
              };
            },
            // ???????????????
            control(styles) {
              return {
                ...styles,
                backgroundColor: getRgbaString(active.backgroundColor),
                height: '100%',
                border: `${active.border.width}px ${
                  active.border.type
                } ${getRgbaString(active.border.color)}`,
                boxShadow: `0 0 1px ${getRgbaString(active.border.color)}`,
                ':hover': {
                  borderColor: getRgbaString(active.border.color),
                },
              };
            },
            // ???????????????
            singleValue(styles) {
              return {
                ...styles,
                ...active.textStyle,
                color: getRgbaString(active.textStyle.color),
              };
            },
            // ???????????????
            menu(styles) {
              return {
                ...styles,
                height: menu.height,
                backgroundColor: getRgbaString(menu.backgroundColor),
              };
            },
            // ???????????????
            option(styles, { isSelected }) {
              return {
                ...styles,
                ...(isSelected ? activeStyle : baseStyle),
                height: base.height,
                lineHeight: `${base.height - 16}px`,
                ':hover': isSelected ? activeHoverStyle : baseHoverStyle,
              };
            },
            // ??????????????????
            menuList(styles) {
              return {
                ...styles,
                maxHeight: menu.height,
              };
            },
          }}
          options={finalValue.map((item: any) => ({
            label: item.name,
            value: item.value,
          }))}
        ></Select>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
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
