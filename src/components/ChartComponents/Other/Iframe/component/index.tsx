import { CSSProperties, useMemo, useRef } from 'react';
import { uniqueId, merge } from 'lodash';

import 'echarts-wordcloud';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TIFrameConfig } from '../type';

const CHART_ID = 'IFRAME';

const IframeBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TIFrameConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TIFrameConfig>(
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

  return (
    <>
      <div
        className={className}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        id={chartId.current}
      >
        <iframe
          src={finalValue.value}
          width="100%"
          height="100%"
          frameBorder="0"
        />
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

const WrapperIframeBasic: typeof IframeBasic & {
  id: ComponentData.TComponentSelfType;
} = IframeBasic as any;

WrapperIframeBasic.id = CHART_ID;

export default WrapperIframeBasic;
