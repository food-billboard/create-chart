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
import { TStateCardConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'STATE_CARD';

const StateCard = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TStateCardConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { height },
    },
  } = value;
  const { margin, textStyle, stateIcon, stateList, condition } = options;

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
  } = useComponent<TStateCardConfig>(
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

  const onClick = useCallback(
    (value, e) => {
      e.stopPropagation();
      syncInteractiveAction('click', value);
    },
    [syncInteractiveAction],
  );

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      styles['component-other-state-card'],
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
      const target: any = stateList.find((item) => item.value == value.value);
      return (
        <div key={currIndex}>
          <div
            className={classnames(styles['component-other-state-card-column'])}
            style={{
              marginTop: margin,
            }}
            onClick={onClick.bind(null, value)}
          >
            {/* 状态圆点 */}
            <div
              className={styles['component-other-state-card-column-state']}
              style={{
                width: stateIcon.size[0],
                height: stateIcon.size[1],
                borderRadius: stateIcon.borderRadius + '%',
                backgroundColor:
                  getRgbaString(target?.stateIcon.color) || 'transparent',
                transform: `rotate(${stateIcon.rotate}deg)`,
                transformOrigin: 'center center',
                [stateIcon.position === 'start' ? 'marginRight' : 'marginLeft']:
                  stateIcon.margin,
                float: stateIcon.position === 'start' ? 'left' : 'right',
              }}
            ></div>

            <div
              className={styles['component-other-state-card-column-main']}
              onClick={onClick.bind(null, value)}
            >
              {value.name}
            </div>
          </div>
        </div>
      );
    },
    [margin, stateIcon, stateList, onClick],
  );

  // 列表内容
  const valueList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      return listItem(item, index);
    });
  }, [finalValue, listItem]);

  const listContent = useMemo(() => {
    return (
      <div className={styles['component-other-state-card-content']}>
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

const WrapperStateCard: typeof StateCard & {
  id: ComponentData.TComponentSelfType;
} = StateCard as any;

WrapperStateCard.id = CHART_ID;

export default WrapperStateCard;
