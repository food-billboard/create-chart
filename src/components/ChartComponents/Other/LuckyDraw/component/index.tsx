import { LuckyWheel } from '@lucky-canvas/react';
import classnames from 'classnames';
import { get, omit, pick, uniqueId } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import { connect } from 'umi';
// @ts-ignore
import {
  useComponent,
  useComponentSize,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { ConnectState } from '@/models/connect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TLuckyDrawConfig } from '../type';
import styles from './index.less';
import { BACKGROUND_PADDING, BLOCK_MAP, BUTTON_MAP } from './util';

const { getRgbaString } = ColorSelect;

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
  const { stop, speed } = config;

  const chartId = useRef<string>(uniqueId(CHART_ID));
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
  } = useComponent<TLuckyDrawConfig>({
    component: value,
    global,
  });

  const componentSize = useComponentSize(
    `.${chartId.current}`,
    { width, height },
    [width, height, borderWidth, padding],
  );

  const luckySize = useMemo(() => {
    return Math.min(componentSize.width, componentSize.height);
  }, [componentSize]);

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

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-other-lucky-draw']);
  }, [className]);

  const prizesList = useMemo(() => {
    const defaultRange = 100 / finalValue.length;
    const { config } = prizes;
    const radial = luckySize / 2 - BACKGROUND_PADDING;
    const imgWidth = 0.4 * radial;
    const imgHeight = 0.4 * radial;
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
            top: '45%',
            ...omit(luckyStyle, ['background']),
            fontStyle: luckyStyle.fontFamily,
            fontColor: getRgbaString(luckyStyle.color),
          },
        ],
        imgs: img
          ? [
              {
                src: img,
                width: imgWidth,
                height: imgHeight,
                top: '5%',
              },
            ]
          : [],
      };
    });
  }, [finalValue, prizes, luckyStyle, luckySize]);

  const onClick = useCallback(() => {
    linkageMethod('click', {});
  }, [linkageMethod]);

  const onLucky = useCallback(() => {
    if (loadingRef.current) return;
    luckyDrawRef.current?.play?.();
    setTimeout(() => {
      luckyDrawRef.current?.stop?.();
    }, stop);
  }, [stop]);

  const onStart = useCallback(() => {
    loadingRef.current = true;
    syncInteractiveAction('click', {});
  }, [syncInteractiveAction]);

  const onEnd = useCallback(
    async (prize) => {
      loadingRef.current = false;
      const { fonts, imgs, range } = prize;
      syncInteractiveAction('end', {
        title: get(fonts, '0.text'),
        img: get(imgs, '0.src'),
        range,
      });
    },
    [syncInteractiveAction],
  );

  const Button = BUTTON_MAP[buttons.type];

  return (
    <>
      <ConditionComponent
        componentId={id}
        className={componentClassName}
        style={style}
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
                background: getRgbaString(luckyStyle.background),
              }}
              defaultConfig={{
                speed,
              }}
              prizes={prizesList}
              blocks={BLOCK_MAP[blocks.type].value}
              onEnd={onEnd}
              onStart={onStart}
            />
            {!!Button && (
              <Button
                size={luckySize}
                onClick={onLucky}
                color={getRgbaString(buttons.color)}
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
