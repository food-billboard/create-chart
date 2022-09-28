import {
  CSSProperties,
  useMemo,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { uniqueId, merge } from 'lodash';
import { Checkbox as AntCheckbox } from 'antd';
import classnames from 'classnames';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TCheckboxConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'CHECKBOX';

const Checkbox = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TCheckboxConfig>;
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
    borderRadius,
    size,
    defaultChecked,
    active,
    check,
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);
  const [checkedValue, setCheckedValue] = useState<string[]>(() => {
    return defaultChecked.split(',').map((item) => item.trim());
  });

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TCheckboxConfig>(
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
    syncInteractiveAction('change', {
      value: value,
    });
    setCheckedValue(value);
  };

  const componentClassName = useMemo(() => {
    return classnames(
      'dis-flex',
      className,
      styles['component-interactive-checkbox'],
    );
  }, [className]);

  useEffect(() => {
    setCheckedValue(defaultChecked.split(',').map((item) => item.trim()));
  }, [defaultChecked]);

  useEffect(() => {
    onChange(checkedValue);
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
        <AntCheckbox.Group
          value={checkedValue}
          onChange={onChange}
          className={styles['component-interactive-checkbox-main']}
          style={{
            // @ts-ignore
            '--component-checkbox-size': size + 'px',
            '--component-checkbox-border-color': getRgbaString(borderColor),
            '--component-checkbox-background-color':
              getRgbaString(backgroundColor),
            '--component-checkbox-border-radius': borderRadius + 'px',
            '--component-checkbox-checked-border-color': getRgbaString(
              active.borderColor,
            ),
            '--component-checkbox-checked-background-color': getRgbaString(
              active.backgroundColor,
            ),
            '--component-checkbox-checked-color': getRgbaString(check.color),
            '--component-checkbox-checked-width': (size / 14) * 5 + 'px',
            '--component-checkbox-checked-height': (size / 14) * 8 + 'px',
          }}
        >
          {(finalValue || []).map((item: any) => {
            const { name, value } = item;
            return (
              <AntCheckbox
                key={value}
                value={value}
                style={{
                  ...textStyle,
                  color: getRgbaString(textStyle.color),
                }}
              >
                {name}
              </AntCheckbox>
            );
          })}
        </AntCheckbox.Group>
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

const WrapperCheckbox: typeof Checkbox & {
  id: ComponentData.TComponentSelfType;
} = Checkbox as any;

WrapperCheckbox.id = CHART_ID;

export default WrapperCheckbox;
