import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useUpdateEffect, useUnmount } from 'ahooks';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import MessageUtil from './MessageUitl';
import { TIFrameConfig } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const IframeBasic = (
  props: ComponentData.CommonComponentProps<TIFrameConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const {
    id,
    config: {
      options: { scrolling, scale, pointEvent, relationParams },
      style: { border },
    },
  } = value;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartLoaded = useRef<boolean>(false);

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    syncInteractiveAction,
  } = useComponent<TIFrameConfig>({
    component: value,
    global,
  });

  const messageUtil = useRef(
    new MessageUtil(chartId.current, syncInteractiveAction),
  );

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    })?.value;
  }, [processedValue, componentFilterMap]);

  const onLoad = useCallback(() => {
    chartLoaded.current = true;
    initIFrame(finalValue);
  }, [finalValue]);

  const reParams = useCallback(
    (targetParams: ComponentData.TParams, newValue: any) => {
      if (!finalValue) return;
      messageUtil.current?.onParamsChange(targetParams, newValue);
    },
    [],
  );

  const initIFrame = (value: any) => {
    if (!value || !chartLoaded.current) return;
    messageUtil.current?.create(value, relationParams);
  };

  useUpdateEffect(() => {
    initIFrame(finalValue);
  }, [finalValue]);

  useUnmount(() => {
    messageUtil.current?.destroy();
  });

  return (
    <>
      <div
        className={classnames(className, styles['component-other-iframe'])}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        id={chartId.current}
      >
        <div
          className="w-100 h-100"
          style={merge(
            {
              transform: `scale(${scale})`,
            },
            pointEvent
              ? {}
              : ({
                  pointerEvents: 'none',
                } as CSSProperties),
          )}
        >
          <Wrapper border={border}>
            {children}
            <iframe
              src={finalValue}
              name={chartId.current}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling={scrolling}
              onLoad={onLoad}
              style={
                pointEvent
                  ? {}
                  : ({
                      pointerEvents: 'none',
                    } as CSSProperties)
              }
            />
          </Wrapper>
        </div>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        reParams={reParams}
        componentFilter={componentFilter}
        componentParams={relationParams}
      />
    </>
  );
};

const WrapperIframeBasic: typeof IframeBasic & {
  id: ComponentData.TComponentSelfType;
} = IframeBasic as any;

WrapperIframeBasic.id = CHART_ID;

export default WrapperIframeBasic;
