import { useDeepCompareEffect } from 'ahooks';
import classnames from 'classnames';
import { merge, uniqueId } from 'lodash';
import lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';
import { useEffect, useRef } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { ComponentDemoTooltip } from '@/components/ChartComponents/Common/Marquee';
import { CHART_ID } from '../id';
import lottieDemoJson from '../lottie-demo.json';
import { TLottieAnimeConfig } from '../type';
import styles from './index.less';

lottie.loadAnimation;

const LottieAnime = (
  props: ComponentData.CommonComponentProps<TLottieAnimeConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;

  const { condition, value: lottieData, ...nextOptions } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<AnimationItem>();

  const { request, getValue, requestUrl, componentFilter, onCondition } =
    useComponent<TLottieAnimeConfig>({
      component: value,
      global,
    });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const setOption = async (needReCreate: boolean) => {
    const { loop, speed, direction } = nextOptions;

    const dom = document.getElementById(chartId.current);
    if (!dom) return;

    if (needReCreate) {
      chartInstance.current && chartInstance.current.destroy();

      chartInstance.current = lottie.loadAnimation({
        container: dom,
        name: chartId.current,
        renderer: 'svg',
        loop,
        autoplay: true,
        ...(lottieData || screenType !== 'edit'
          ? { path: lottieData }
          : { animationData: lottieDemoJson }),
      });
    } else {
      chartInstance.current?.setDirection(direction || 1);
      chartInstance.current?.setLoop(loop);
      chartInstance.current?.setSpeed(speed);
    }
  };

  // 数据发生变化时
  useDeepCompareEffect(() => {
    setOption(false);
  }, [nextOptions]);

  useEffect(() => {
    setOption(true);
  }, [lottieData, screenType]);

  return (
    <>
      <ConditionComponent
        componentId={id}
        className={classnames(
          className,
          styles['component-media-lottie-anime'],
        )}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
      >
        <Wrapper border={border}>
          <div id={chartId.current} className="w-100 h-100"></div>
          <ComponentDemoTooltip open={!lottieData && screenType === 'edit'} />
          {children}
        </Wrapper>
      </ConditionComponent>
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

const WrapperLottieAnime: typeof LottieAnime & {
  id: ComponentData.TComponentSelfType;
} = LottieAnime as any;

WrapperLottieAnime.id = CHART_ID;

export default WrapperLottieAnime;
