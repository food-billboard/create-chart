import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { merge, uniqueId } from 'lodash';
import classnames from 'classnames';
import { Tag as AntTag } from 'antd';
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
import { TTagConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'TAG';

const Tag = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TTagConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    id,
    config: { options },
  } = value;
  const { margin, textStyle, series, icon, condition } = options;

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
  } = useComponent<TTagConfig>(
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
      syncInteractiveAction('click', { value });
    },
    [syncInteractiveAction],
  );

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      styles['component-font-tag'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

  const componentStyle = useMemo(() => {
    return merge(style, conditionStyle);
  }, [style, conditionStyle, textStyle]);

  // ?????????
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

  // ????????????
  const valueList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      return listItem(item, index);
    });
  }, [finalValue, listItem]);

  return (
    <>
      <div
        className={componentClassName}
        style={componentStyle}
        id={chartId.current}
      >
        {valueList}
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

const WrapperTag: typeof Tag & {
  id: ComponentData.TComponentSelfType;
} = Tag as any;

WrapperTag.id = CHART_ID;

export default WrapperTag;
