import { ReactNode, useMemo, Children, cloneElement } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { get } from 'lodash';
import { useIsComponentChildrenSelect, useLayerHover } from '@/hooks';
import { getComponentStyleInScreenType } from '@/utils/Assist/Component';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from '../../index.less';

const ChildrenWrapper = (props: {
  children?: ReactNode;
  value: ComponentData.TComponentData;
  parent: ComponentData.TComponentData | null;
  select: string[];
  borderNone?: boolean;
  screenType: ComponentData.ScreenType;
  version: string;
}) => {
  const {
    value,
    select,
    children,
    borderNone = false,
    screenType,
    version,
  } = props;

  const isSelect = useIsComponentChildrenSelect([value], select);

  const componentScreenTypeStyle = useMemo(() => {
    return getComponentStyleInScreenType(screenType);
  }, [screenType]);

  // * 1.5版本以后设置成中心位置
  const transformOrigin = useMemo(() => {
    return !version || parseFloat(version) > 1.5 ? 'center center' : 'left top';
  }, [version]);

  const realChildren = useMemo(() => {
    return Children.map(children, (child) => {
      const className = get(child, 'props.className');
      const value: ComponentData.TComponentData = get(child, 'props.value');
      const {
        config: {
          style: { left, top, rotate, opacity, width, height, skew },
          attr: { visible },
        },
      } = value;

      const realStyle = {
        transform: `rotate(${rotate}deg) skew(${skew?.x || 0}deg, ${
          skew?.y || 0
        }deg)`,
        transformOrigin,
        opacity,
        ...componentScreenTypeStyle,
      };

      if (!visible) realStyle.display = 'none';

      return cloneElement(child as any, {
        className: classnames(className, {
          [styles['render-component-wrapper-inner']]: !isSelect && !borderNone,
          'border-1-a': isSelect && !borderNone,
        }),
        style: borderNone
          ? // 组件
            {
              ...realStyle,
            }
          : // 组内组件
            {
              left,
              top,
              width,
              height,
              position: 'absolute',
              ...realStyle,
            },
      });
    });
  }, [
    isSelect,
    children,
    borderNone,
    componentScreenTypeStyle,
    transformOrigin,
  ]);

  return <>{realChildren}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenWrapper);
