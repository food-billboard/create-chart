import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { uniqueId } from 'lodash';
import { useMemo, useRef, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import ScrollText from '@/components/ScrollText';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TListConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const MarkText = ({
  value,
  positiveColor,
  negativeColor,
  animation = true,
}: {
  value: number;
  positiveColor: string;
  negativeColor: string;
  animation: boolean;
}) => {
  const realValue = parseFloat(value as any) || 0;
  return (
    <div
      className={classnames(styles['component-other-list-item-mark'], 'w-100', {
        [styles['component-other-list-item-mark-animation-positive']]:
          animation && realValue > 0,
        [styles['component-other-list-item-mark-animation-negative']]:
          animation && realValue < 0,
      })}
      style={{
        color:
          realValue > 0
            ? positiveColor
            : realValue < 0
            ? negativeColor
            : 'currentcolor',
        // @ts-ignore
        '--animation-direction': realValue / Math.abs(realValue),
      }}
    >
      {realValue > 0 && (
        <ArrowUpOutlined
          className={classnames(
            'm-r-4',
            styles['component-other-list-item-mark-animation-icon'],
          )}
        />
      )}
      {realValue < 0 && (
        <ArrowDownOutlined
          className={classnames(
            'm-r-4',
            styles['component-other-list-item-mark-animation-icon'],
          )}
        />
      )}
      <strong>{value}</strong>
    </div>
  );
};

const ListBasic = (props: ComponentData.CommonComponentProps<TListConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { height, border },
    },
  } = value;
  const {
    global: { animation, column, numberPoint },
    index,
    columns: { data, margin, even, odd },
    header,
    condition,
  } = options;

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
  } = useComponent<TListConfig>({
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

  const onColumnClick = useCallback(
    (value) => {
      syncInteractiveAction('click-column', {
        value,
      });
      linkageMethod('click-column', {
        value,
      });
    },
    [syncInteractiveAction, finalValue, linkageMethod],
  );

  const onItemClick = useCallback(
    (value, e) => {
      e.stopPropagation();
      syncInteractiveAction('click-item', value);
      linkageMethod('click-item', value);
    },
    [syncInteractiveAction, linkageMethod],
  );

  const autoplay = useMemo(() => {
    const { show } = animation;
    return show && finalValue.length > column && screenType !== 'edit';
  }, [finalValue, column, animation, screenType]);

  // 内容高度
  const contentHeight = useMemo(() => {
    return height - header.height;
  }, [height, header]);

  // 列表单行高度
  const listItemHeight = useMemo(() => {
    return contentHeight / column - margin;
  }, [contentHeight, column, margin]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-other-list']);
  }, [className, animation]);

  // 列表行
  const listItem = useCallback(
    (value: any, currIndex: number) => {
      const { animation, positiveColor, negativeColor } = numberPoint;
      return (
        <div key={currIndex}>
          <div
            className={styles['component-other-list-content-column']}
            style={{
              height: listItemHeight,
              marginBottom: margin,
              backgroundColor:
                currIndex % 2 === 0
                  ? getRgbaString(odd.backgroundColor)
                  : getRgbaString(even.backgroundColor),
            }}
            onClick={onColumnClick.bind(null, value)}
          >
            {/* index索引 */}
            {index.show && (
              <div
                className={classnames(
                  styles['component-other-list-item'],
                  styles['component-other-list-item-text'],
                  styles['component-other-list-item-index'],
                )}
                style={{
                  width: index.width + '%',
                  minWidth: index.width + '%',
                  ...index.textStyle,
                  color: getRgbaString(index.textStyle.color),
                  textAlign: 'center',
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    backgroundColor: getRgbaString(index.backgroundColor),
                    borderRadius: index.radius + '%',
                    width: index.size,
                    height: index.size,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="dis-flex"
                >
                  {currIndex + 1}
                </div>
              </div>
            )}
            {data.map((item) => {
              const {
                type,
                key,
                name,
                textStyle,
                width,
                scroll: { show },
              } = item;
              return (
                <div
                  className={classnames(styles['component-other-list-item'], {
                    [styles['component-other-list-item-text']]: type === 'text',
                    [styles['component-other-list-item-image']]:
                      type === 'image',
                  })}
                  key={key}
                  style={{
                    width: width + '%',
                    minWidth: width + '%',
                    lineHeight: listItemHeight + 'px',
                    ...textStyle,
                    color: getRgbaString(textStyle.color),
                  }}
                  onClick={onItemClick.bind(null, {
                    name: key,
                    value: value[key],
                  })}
                >
                  {type === 'image' && <img src={value[key]} alt={name} />}
                  {type === 'text' &&
                    (show ? <ScrollText>{value[key]}</ScrollText> : value[key])}
                  {type === 'number-point' && (
                    <MarkText
                      value={value[key]}
                      positiveColor={getRgbaString(positiveColor)}
                      negativeColor={getRgbaString(negativeColor)}
                      animation={animation}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    },
    [data, listItemHeight, index, onItemClick, margin, numberPoint],
  );

  // 列表内容
  const valueList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      return listItem(item, index);
    });
  }, [finalValue, listItem]);

  const scrollList = useMemo(() => {
    const { speed, autoplaySpeed, type } = animation;
    return (
      <Slider
        dots={false}
        infinite
        speed={speed}
        autoplaySpeed={autoplaySpeed}
        slidesToShow={column}
        slidesToScroll={type === 'column' ? 1 : column}
        vertical
        verticalSwiping
        swipeToSlide={false}
        autoplay
        arrows={false}
        touchMove={false}
        easing="ease-in"
      >
        {valueList}
      </Slider>
    );
  }, [animation, column, valueList]);

  const listContent = useMemo(() => {
    return (
      <div className={styles['component-other-list-content']}>
        {autoplay ? scrollList : valueList}
      </div>
    );
  }, [scrollList, valueList, autoplay]);

  const headerDom = useMemo(() => {
    if (!header.show) return null;
    const { height, backgroundColor, textStyle } = header;
    return (
      <div
        className={styles['component-other-list-header']}
        style={{
          ...textStyle,
          color: getRgbaString(textStyle.color),
          backgroundColor: getRgbaString(backgroundColor),
          height,
        }}
      >
        {(index.show
          ? [
              {
                key: '__index__',
                name: '',
                width: index.width,
                textStyle: {
                  textAlign: 'center' as any,
                },
              },
              ...data,
            ]
          : data
        ).map((item) => {
          const {
            key,
            name,
            width,
            textStyle: { textAlign },
          } = item;
          return (
            <div
              className={styles['component-other-list-header-item']}
              style={{
                width: width + '%',
                minWidth: width + '%',
                textAlign,
                lineHeight: height + 'px',
              }}
              key={key}
            >
              {name}
            </div>
          );
        })}
      </div>
    );
  }, [header, data, index]);

  return (
    <>
      <ConditionComponent
        componentId={id}
        className={componentClassName}
        style={style}
        id={chartId.current}
      >
        <Wrapper border={border}>
          {children}
          {headerDom}
          {listContent}
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

const WrapperListBasic: typeof ListBasic & {
  id: ComponentData.TComponentSelfType;
} = ListBasic as any;

WrapperListBasic.id = CHART_ID;

export default WrapperListBasic;
