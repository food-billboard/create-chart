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
import { CHART_ID } from '../id';
import { TStateCardConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const StateCard = (
  props: ComponentData.CommonComponentProps<TStateCardConfig>,
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
  const { margin, textStyle, stateIcon, stateList, condition } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const {
    request,
    linkageMethod,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TStateCardConfig>({
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
    return classnames(className, styles['component-other-state-card']);
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

const WrapperStateCard: typeof StateCard & {
  id: ComponentData.TComponentSelfType;
} = StateCard as any;

WrapperStateCard.id = CHART_ID;

export default WrapperStateCard;
