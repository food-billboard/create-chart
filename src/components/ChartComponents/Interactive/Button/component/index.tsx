import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { API_CONTAIN_PARAMS_IMMEDIATELY_REQUEST_URL_FLAG } from '@/utils/constants';
import { Button as AntButton } from 'antd';
import classnames from 'classnames';
import { merge, uniqueId } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import { CHART_ID } from '../id';
import { TButtonConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Button = (props: ComponentData.CommonComponentProps<TButtonConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const {
    backgroundColor,
    icon,
    borderRadius,
    type,
    textStyle,
    condition,
    actionType,
  } = options;
  const { fontSize } = textStyle;
  const { screenType } = global;

  const chartId = useRef<string>(uniqueId(CHART_ID));

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
  } = useComponent<TButtonConfig>({
    component: value,
    global,
  });

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
      value:
        finalValue.value +
        (actionType === 'submit'
          ? `${API_CONTAIN_PARAMS_IMMEDIATELY_REQUEST_URL_FLAG}(${Date.now()})`
          : ''),
    });
    linkageMethod('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue, actionType]);

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
