import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { merge, uniqueId } from 'lodash';
import classnames from 'classnames';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import ThemeUtil from '@/utils/Assist/Theme';
import { TStateListConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'STATE_LIST';

const StateList = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TStateListConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenType } = global;

  const {
    id,
    config: { options },
  } = value;
  const {
    margin,
    textStyle,
    stateList,
    condition,
    column,
    count,
    align,
    padding,
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
    onCondition,
  } = useComponent<TStateListConfig>(
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
  } = useCondition(onCondition);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = useCallback(
    (value, e) => {
      e.stopPropagation();
      syncInteractiveAction('click', value);
    },
    [syncInteractiveAction],
  );

  const componentClassName = useMemo(() => {
    return classnames(
      'w-100',
      'h-100',
      className,
      styles['component-other-state-list'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

  const componentStyle = useMemo(() => {
    return merge(
      style,
      {
        ...textStyle,
        color: getRgbaString(textStyle.color),
      },
      conditionStyle,
    );
  }, [style, conditionStyle, textStyle]);

  // 列表行
  const listItem = useCallback(
    (value: any, currIndex: number) => {
      const rate = Math.ceil(count / column);
      const { backgroundColor, borderRadius } = stateList[currIndex] || {
        backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(currIndex),
        borderRadius: [0, 0, 0, 0],
      };
      return (
        <div
          onClick={onClick.bind(null, value)}
          key={currIndex}
          className={classnames(
            styles['component-other-state-list-content-item'],
          )}
          style={{
            backgroundColor: getRgbaString(backgroundColor),
            marginTop: margin[1],
            marginLeft: margin[0],
            height: `calc( (100% - ${margin[1] * (rate + 1)}px) / ${rate} )`,
            width: `calc( ( 100% - ${
              margin[0] * (column + 1)
            }px ) / ${column} )`,
            padding: `${padding[0]}px ${padding[1]}px`,
            justifyContent: align.horizontal,
            alignItems: align.vertical,
            borderRadius: `${borderRadius[3]}px ${borderRadius[0]}px ${borderRadius[1]}px ${borderRadius[2]}px`,
          }}
        >
          {value.value}
        </div>
      );
    },
    [margin, onClick, align, column, count, padding],
  );

  // 列表内容
  const valueList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      return listItem(item, index);
    });
  }, [finalValue, listItem]);

  const listContent = useMemo(() => {
    return (
      <div className={styles['component-other-state-list-content']}>
        {valueList}
      </div>
    );
  }, [valueList]);

  return (
    <>
      <div
        className={componentClassName}
        style={componentStyle}
        id={chartId.current}
      >
        {listContent}
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

const WrapperStateList: typeof StateList & {
  id: ComponentData.TComponentSelfType;
} = StateList as any;

WrapperStateList.id = CHART_ID;

export default WrapperStateList;
