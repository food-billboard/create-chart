import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TListConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'LIST';

const ListBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TListConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    config: {
      options,
      style: { height },
    },
  } = value;
  const {
    global: { animation, column },
    index,
    columns: { data, margin, even, odd },
    header,
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TListConfig>(
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

  const onClick = useCallback(() => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue]);

  const contentHeight = useMemo(() => {
    return height - header.height;
  }, [height, header]);

  const listItemHeight = useMemo(() => {
    return contentHeight / column - margin;
  }, [contentHeight, column, margin]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-other-list']);
  }, [className, animation]);

  const listItem = useCallback(
    (value: any, currIndex: number) => {
      return (
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
          key={currIndex}
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
                lineHeight: listItemHeight + 'px',
                ...index.textStyle,
                color: getRgbaString(index.textStyle.color),
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: getRgbaString(index.backgroundColor),
                  borderRadius: index.radius + '%',
                  width: index.size,
                  height: index.size,
                }}
              >
                {currIndex + 1}
              </div>
            </div>
          )}
          {data.map((item) => {
            const { type, key, name, textStyle, width } = item;
            return (
              <div
                className={classnames(styles['component-other-list-item'], {
                  [styles['component-other-list-item-text']]: type === 'text',
                  [styles['component-other-list-item-image']]: type === 'image',
                })}
                key={key}
                style={{
                  width: width + '%',
                  minWidth: width + '%',
                  lineHeight: listItemHeight + 'px',
                  ...textStyle,
                  color: getRgbaString(textStyle.color),
                }}
              >
                {type === 'image' && <img src={value[key]} alt={name} />}
                {type === 'text' && value[key]}
              </div>
            );
          })}
        </div>
      );
    },
    [data, listItemHeight, index],
  );

  const listContent = useMemo(() => {
    return (
      <div className={styles['component-other-list-content']}>
        {finalValue.map((item: any, index: number) => {
          return listItem(item, index);
        })}
      </div>
    );
  }, [finalValue]);

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
      <div
        className={componentClassName}
        style={style}
        id={chartId.current}
        onClick={onClick}
      >
        {headerDom}
        {listContent}
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

const WrapperListBasic: typeof ListBasic & {
  id: ComponentData.TComponentSelfType;
} = ListBasic as any;

WrapperListBasic.id = CHART_ID;

export default WrapperListBasic;
