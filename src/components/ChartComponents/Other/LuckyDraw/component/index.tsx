import { useMemo, useRef, useCallback } from 'react';
import { merge, uniqueId } from 'lodash';
import classnames from 'classnames';
// @ts-ignore
import { LuckyWheel } from '@lucky-canvas/react';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
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
  props: ComponentData.CommonComponentProps<TLuckyDrawConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const {
    condition,
    global: { style: luckyStyle, config },
    buttons,
    prizes,
    blocks,
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);
  const luckyDrawRef = useRef<any>();

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

  const onStart = useCallback(() => {
    syncInteractiveAction('click', {});
  }, [syncInteractiveAction]);

  const onEnd = useCallback(
    async (prize) => {
      syncInteractiveAction('end', {
        title: '',
      });
    },
    [syncInteractiveAction],
  );

  return (
    <>
      <div
        className={componentClassName}
        style={merge(style, conditionStyle)}
        id={chartId.current}
      >
        <Wrapper border={border}>
          {children}
          <LuckyWheel
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
            blocks={BLOCK_MAP[blocks.type]}
            buttons={BUTTON_MAP[buttons.type]}
            onEnd={onEnd}
            onStart={onStart}
          />
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

export default WrapperLuckyDrawBasic;
