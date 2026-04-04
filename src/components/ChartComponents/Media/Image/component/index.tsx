import { Image } from 'antd';
import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { useMemo, useRef, useCallback, useState } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { useClipPath } from '@/hooks';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TImageConfig } from '../type';
import styles from './index.less';

const ImageBasic = (
  props: ComponentData.CommonComponentProps<TImageConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const [visible, setVisible] = useState<boolean>(false);

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const {
    type,
    content,
    repeat,
    condition,
    preview,
    clipPath = 'circle',
  } = options;

  const clipPathStyle = useClipPath(clipPath);

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
  } = useComponent<TImageConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = useCallback(() => {
    if (preview.show && finalValue.value) {
      setVisible(true);
    }
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
    linkageMethod('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue, preview]);

  const componentStyle = useMemo(() => {
    const { x, y } = repeat;
    if (type === 'image')
      return {
        backgroundImage: `url(${finalValue.value || ''})`,
        backgroundRepeatX: x ? 'repeat' : 'no-repeat',
        backgroundRepeatY: y ? 'repeat' : 'no-repeat',
        backgroundSize: !x && !y ? '100% 100%' : '',
      };
    return {
      backgroundColor: finalValue.value,
    };
  }, [type, content, finalValue, repeat]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-media-image']);
  }, [className]);

  return (
    <>
      <ConditionComponent
        componentId={id}
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
      >
        <Wrapper border={border}>
          <div
            id={chartId.current}
            onClick={onClick}
            className="w-100 h-100"
            style={merge(componentStyle, clipPathStyle, {
              borderRadius: DEFAULT_BORDER_RADIUS,
            })}
          ></div>
          {children}
        </Wrapper>
      </ConditionComponent>
      <Image
        preview={{
          visible: visible,
          onVisibleChange: (value) => {
            setVisible(value);
          },
          src: finalValue.value || '',
        }}
      />
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={propsOnCondition}
        componentFilter={componentFilter}
        componentCondition={condition}
      />
    </>
  );
};

const WrapperImageBasic: typeof ImageBasic & {
  id: ComponentData.TComponentSelfType;
} = ImageBasic as any;

WrapperImageBasic.id = CHART_ID;

export default WrapperImageBasic;
