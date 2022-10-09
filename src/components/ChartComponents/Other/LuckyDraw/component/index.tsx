import { useMemo, useRef, useCallback, useState } from 'react';
import { merge, uniqueId, get, pick } from 'lodash';
import classnames from 'classnames';
import { connect } from 'dva';
import { useDebounceEffect } from 'ahooks';
// @ts-ignore
import { LuckyWheel } from '@lucky-canvas/react';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ConnectState } from '@/models/connect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TLuckyDrawConfig } from '../type';
import { BUTTON_MAP, BLOCK_MAP } from './util';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'LUCKY_DRAW';

const LuckyDrawBasic = (
  props: ComponentData.CommonComponentProps<TLuckyDrawConfig> & {
    componentBorder: ComponentData.TScreenData['config']['attr']['componentBorder'];
  },
) => {
  const {
    className,
    style,
    value,
    global,
    children,
    wrapper: Wrapper,
    componentBorder: { width: borderWidth, padding },
  } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border, width, height },
    },
  } = value;
  const {
    condition,
    global: { style: luckyStyle, config },
    buttons,
    prizes,
    blocks,
  } = options;

  const [componentSize, setComponentSize] = useState<{
    width: number;
    height: number;
  }>({
    width,
    height,
  });

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);
  const luckyDrawRef = useRef<any>();
  const loadingRef = useRef(false);

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
  } = useComponent<TLuckyDrawConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const luckySize = useMemo(() => {
    return Math.min(componentSize.width, componentSize.height);
  }, [componentSize]);

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

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      styles['component-other-lucky-draw'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

  const prizesList = useMemo(() => {
    const defaultRange = 100 / finalValue.length;
    const {
      size: { width, height },
      config,
    } = prizes;
    const colorLength = config.length;
    return finalValue.map((item: any, index: number) => {
      const { img, title, range } = item;
      const colorIndex = index % colorLength;
      const { background } = config[colorIndex];
      return {
        range: range || defaultRange,
        background: getRgbaString(background),
        fonts: [
          {
            text: title,
            top: 0,
          },
        ],
        imgs: [
          {
            src: img,
            width,
            height,
            top: 0,
          },
        ],
      };
    });
  }, [finalValue, prizes]);

  const onClick = useCallback(() => {
    linkageMethod('click', {});
  }, [linkageMethod]);

  const onLucky = useCallback(() => {
    if (loadingRef.current) return;
    luckyDrawRef.current?.play?.();
  }, []);

  const onStart = useCallback(() => {
    loadingRef.current = true;
    syncInteractiveAction('click', {});
  }, [syncInteractiveAction]);

  const onEnd = useCallback(
    async (prize) => {
      loadingRef.current = false;
      console.log(prize, 2222);
      syncInteractiveAction('end', prize);
    },
    [syncInteractiveAction],
  );

  const Button = BUTTON_MAP[buttons.type];

  useDebounceEffect(() => {
    const dom = document.querySelector(`.${chartId.current}`);
    if (dom) {
      const width = dom.clientWidth;
      const height = dom.clientHeight;
      setComponentSize({
        width,
        height,
      });
    }
  }, [width, height, borderWidth, padding]);

  return (
    <>
      <div
        className={componentClassName}
        style={merge(style, conditionStyle)}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          <div
            className={classnames(
              chartId.current,
              'w-100 h-100 pos-ab',
              styles['component-other-lucky-draw-main'],
            )}
          >
            <LuckyWheel
              width={luckySize}
              height={luckySize}
              ref={luckyDrawRef}
              defaultStyle={{
                wordWrap: true,
                lineClamp: Infinity,
                ...luckyStyle,
                background: getRgbaString(luckyStyle.background),
                fontStyle: luckyStyle.fontFamily,
                fontColor: getRgbaString(luckyStyle.color),
              }}
              defaultConfig={config}
              prizes={prizesList}
              blocks={BLOCK_MAP[blocks.type].value}
              onEnd={onEnd}
              onStart={onStart}
            />
            {!!Button && (
              <Button
                size={luckySize}
                onClick={onLucky}
                style={{
                  ...pick(buttons.textStyle, ['fontWeight', 'fontFamily']),
                  fontSize: buttons.textStyle.fontSize + 'px',
                  color: getRgbaString(buttons.textStyle.color),
                }}
              >
                {buttons.content}
              </Button>
            )}
          </div>
        </Wrapper>
      </div>
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
    </>
  );
};

const WrapperLuckyDrawBasic: typeof LuckyDrawBasic & {
  id: ComponentData.TComponentSelfType;
} = LuckyDrawBasic as any;

WrapperLuckyDrawBasic.id = CHART_ID;

export default connect(
  (state: ConnectState) => {
    return {
      componentBorder: get(
        state,
        'global.screenData.config.attr.componentBorder',
      ),
    };
  },
  () => ({}),
)(WrapperLuckyDrawBasic);
