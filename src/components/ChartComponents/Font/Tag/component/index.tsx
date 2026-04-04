import { Tag as AntTag } from 'antd';
import classnames from 'classnames';
import { merge, uniqueId } from 'lodash';
import { useMemo, useRef, useCallback } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import ThemeUtil from '@/utils/Assist/Theme';
import { CHART_ID } from '../id';
import { TTagConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Tag = (props: ComponentData.CommonComponentProps<TTagConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { margin, textStyle, series, icon, condition } = options;

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
  } = useComponent<TTagConfig>({
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
      syncInteractiveAction('click', { value });
      linkageMethod('click-item', { value });
    },
    [syncInteractiveAction],
  );

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-font-tag']);
  }, [className]);

  const componentStyle = useMemo(() => {
    return merge(style);
  }, [style, textStyle]);

  // 列表行
  const listItem = useCallback(
    (value: any, currIndex: number) => {
      const { icon: requestIcon, value: tagValue } = value;
      const { color, icon: localIcon } = series[currIndex] || {};

      const iconName = requestIcon || localIcon;

      const iconDom = (
        <span
          className={classnames('bi', iconName)}
          style={
            icon.position === 'start'
              ? { marginRight: icon.margin }
              : { marginLeft: icon.margin }
          }
        />
      );

      return (
        <AntTag
          key={currIndex}
          onClick={onClick.bind(null, tagValue)}
          style={{
            margin,
            ...textStyle,
            color: getRgbaString(textStyle.color),
            lineHeight: 'unset',
            borderRadius: DEFAULT_BORDER_RADIUS,
          }}
          color={getRgbaString(
            color || ThemeUtil.generateNextColor4CurrentTheme(currIndex),
          )}
        >
          {!!iconName && icon.position === 'start' && iconDom}
          {tagValue}
          {!!iconName && icon.position === 'end' && iconDom}
        </AntTag>
      );
    },
    [margin, icon, onClick, series, textStyle],
  );

  // 列表内容
  const valueList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      return listItem(item, index);
    });
  }, [finalValue, listItem]);

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
          {valueList}
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

const WrapperTag: typeof Tag & {
  id: ComponentData.TComponentSelfType;
} = Tag as any;

WrapperTag.id = CHART_ID;

export default WrapperTag;
