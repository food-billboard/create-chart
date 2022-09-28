import {
  CSSProperties,
  useMemo,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { uniqueId, merge } from 'lodash';
import { Radio as AntRadio } from 'antd';
import classnames from 'classnames';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TRadioConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'RADIO';

const Radio = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TRadioConfig>;
  global: ComponentProps['global'];
  children?: ReactNode;
}) => {
  const { className, style, value, global, children } = props;

  const {
    id,
    config: { options },
  } = value;
  const {
    borderColor,
    backgroundColor,
    textStyle,
    size,
    defaultChecked,
    active,
    check,
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);
  const [checkedValue, setCheckedValue] = useState<string>(defaultChecked);

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TRadioConfig>(
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

  const onChange = (value: any) => {
    const target = value.target.value;
    syncInteractiveAction('change', {
      value: target,
    });
    setCheckedValue(target);
  };

  const componentClassName = useMemo(() => {
    return classnames(
      'dis-flex',
      className,
      styles['component-interactive-radio'],
    );
  }, [className]);

  useEffect(() => {
    setCheckedValue(defaultChecked);
  }, [defaultChecked]);

  useEffect(() => {
    onChange({
      target: {
        value: checkedValue,
      },
    });
  }, []);

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
        {children}
        <AntRadio.Group
          value={checkedValue}
          onChange={onChange}
          className={styles['component-interactive-radio-main']}
          style={{
            // @ts-ignore
            '--component-radio-size': size + 'px',
            '--component-radio-border-color': getRgbaString(borderColor),
            '--component-radio-background-color':
              getRgbaString(backgroundColor),
            '--component-radio-checked-border-color': getRgbaString(
              active.borderColor,
            ),
            '--component-radio-checked-background-color': getRgbaString(
              active.backgroundColor,
            ),
            '--component-radio-checked-color': getRgbaString(check.color),
            '--component-radio-checked-margin': -(size / 2) + 'px',
          }}
        >
          {(finalValue || []).map((item: any) => {
            const { name, value } = item;
            return (
              <AntRadio
                key={value}
                value={value}
                style={{
                  ...textStyle,
                  color: getRgbaString(textStyle.color),
                }}
              >
                {name}
              </AntRadio>
            );
          })}
        </AntRadio.Group>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={() => {}}
        componentFilter={componentFilter}
        componentCondition={{
          initialState: 'visible',
          value: [],
        }}
      />
    </>
  );
};

const WrapperRadio: typeof Radio & {
  id: ComponentData.TComponentSelfType;
} = Radio as any;

WrapperRadio.id = CHART_ID;

export default WrapperRadio;
