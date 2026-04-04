import classnames from 'classnames';
import { merge, uniqueId } from 'lodash';
import { useMemo, useRef, useCallback } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import ThemeUtil from '@/utils/Assist/Theme';
import { CHART_ID } from '../id';
import { TStateListConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const StateList = (
  props: ComponentData.CommonComponentProps<TStateListConfig>,
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

  const {
    request,
    syncInteractiveAction,
    linkageMethod,
    getValue,
    requestUrl = '',
    componentFilter = [],
    value: processedValue = [],
    componentFilterMap = [],
    onCondition,
  } = useComponent<TStateListConfig>({
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

  const onClick = useCallback(
    (value, e) => {
      e.stopPropagation();
      syncInteractiveAction('click', value);
      linkageMethod('click-item', value);
    },
    [syncInteractiveAction, linkageMethod],
  );

  const componentClassName = useMemo(() => {
    return classnames(
      'w-100',
      'h-100',
      className,
      styles['component-other-state-list'],
    );
  }, [className]);

  const componentStyle = useMemo(() => {
    return merge(style, {
      ...textStyle,
      color: getRgbaString(textStyle.color),
    });
  }, [style, textStyle]);

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
    return finalValue.slice(0, count).map((item: any, index: number) => {
      return listItem(item, index);
    });
  }, [finalValue, listItem, count]);

  const listContent = useMemo(() => {
    return (
      <div className={styles['component-other-state-list-content']}>
        {valueList}
      </div>
    );
  }, [valueList]);

  return (
    <>
      <ConditionComponent
        componentId={id}
        className={componentClassName}
        style={componentStyle}
        id={chartId.current}
      >
        <Wrapper border={border}>
          {children}
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

const WrapperStateList: typeof StateList & {
  id: ComponentData.TComponentSelfType;
} = StateList as any;

WrapperStateList.id = CHART_ID;

export default WrapperStateList;
