import { useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { Button as AntButton } from 'antd';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TButtonConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'BUTTON';

const Button = (props: ComponentData.CommonComponentProps<TButtonConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { backgroundColor, icon, borderRadius, type, textStyle, condition } =
    options;
  const { fontSize } = textStyle;
  const { screenType } = global;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    syncInteractiveAction,
    linkageMethod,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TButtonConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition, screenType);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = useCallback(() => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
    linkageMethod('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue]);

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-interactive-button'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

  const iconNode = useMemo(() => {
    return (
      <span
        className={classnames('bi', icon, 'm-r-4')}
        style={{ fontSize: fontSize + 'px' }}
      />
    );
  }, [icon, fontSize]);

  return (
    <div
      className={componentClassName}
      style={merge(
        {
          width: '100%',
          height: '100%',
        },
        style,
        conditionStyle,
      )}
      id={chartId.current}
    >
      <Wrapper border={border}>
        {children}
        <AntButton
          onClick={onClick}
          icon={iconNode}
          block
          type={type}
          className={classnames(
            'w-100 h-100',
            styles['component-interactive-button-main'],
          )}
          style={{
            ...textStyle,
            color: getRgbaString(textStyle.color),
            borderRadius,
            // @ts-ignore
            '--component-interactive-button-bg-color':
              getRgbaString(backgroundColor),
            '--component-interactive-button-text-color': getRgbaString(
              textStyle.color,
            ),
          }}
          disabled={!!finalValue.disabled}
          loading={!!finalValue.loading}
        >
          {finalValue.value}
        </AntButton>
      </Wrapper>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={propsOnCondition}
        componentFilter={componentFilter}
        componentCondition={condition}
      />
    </div>
  );
};

const WrapperButton: typeof Button & {
  id: ComponentData.TComponentSelfType;
} = Button as any;

WrapperButton.id = CHART_ID;

export default WrapperButton;
