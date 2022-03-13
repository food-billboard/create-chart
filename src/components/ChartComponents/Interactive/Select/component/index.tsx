import { CSSProperties, useMemo, useRef, useCallback, useState } from 'react';
import { Select } from 'antd';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
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
    config: { options },
  } = value;
  const { active, base } = options;
  const { screenType } = global;

  const [activeSelect, setActiveSelect] = useState<number>(0);

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
    (item: any, option: any) => {
      syncInteractiveAction('select', option);
      setActiveSelect(item);
    },
    [syncInteractiveAction],
  );

  const activeStyle = useMemo(() => {
    const { border, textStyle, backgroundColor, ...nextActiveStyle } = active;
    return {
      ...nextActiveStyle,
      ...textStyle,
      color: getRgbaString(textStyle.color),
      backgroundColor: getRgbaString(backgroundColor),
      border: `${border.width}px ${border.type} ${getRgbaString(border.color)}`,
    };
  }, [active]);

  const baseStyle = useMemo(() => {
    const { border, textStyle, backgroundColor, ...nextBaseStyle } = base;
    return {
      ...nextBaseStyle,
      ...textStyle,
      color: getRgbaString(textStyle.color),
      backgroundColor: getRgbaString(backgroundColor),
      border: `${border.width}px ${border.type} ${getRgbaString(border.color)}`,
    };
  }, [base]);

  const domList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      const { name, value } = item;
      return {
        label: name,
        value,
      };
    });
  }, [finalValue]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-interactive-select']);
  }, [className]);

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
          allowClear={false}
          value={activeSelect}
          onChange={onClick}
          options={domList}
          // dropdownRender
        ></Select>
      </div>
      <FetchFragment
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
