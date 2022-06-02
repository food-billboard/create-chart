import { ReactNode, useMemo, Children, cloneElement } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { get } from 'lodash';
import { useIsComponentChildrenSelect } from '@/hooks';
import { getComponentStyleInScreenType } from '@/utils/Assist/Component';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from '../../index.less';

const ChildrenWrapper = (props: {
  children?: ReactNode;
  value: ComponentData.TComponentData;
  parent: ComponentData.TComponentData | null;
  select: string[];
  hoverSelect: string;
  borderNone?: boolean;
  screenType: ComponentData.ScreenType;
}) => {
  const {
    value,
    select,
    children,
    borderNone = false,
    screenType,
    hoverSelect,
  } = props;

  const isSelect = useIsComponentChildrenSelect(
    [value],
    [...select, hoverSelect],
  );

  const componentScreenTypeStyle = useMemo(() => {
    return getComponentStyleInScreenType(screenType);
  }, [screenType]);

  const realChildren = useMemo(() => {
    return Children.map(children, (child) => {
      const className = get(child, 'props.className');
      const value: ComponentData.TComponentData = get(child, 'props.value');
      const {
        config: {
          style: { left, top, rotate, opacity, width, height },
        },
      } = value;

      return cloneElement(child as any, {
        className: classnames(className, {
          [styles['render-component-wrapper-inner']]: !isSelect && !borderNone,
          'border-1-a': isSelect && !borderNone,
        }),
        style: borderNone
          ? // 组件
            {
              transform: `rotate(${rotate}deg)`,
              transformOrigin: 'left top',
              opacity,
              ...componentScreenTypeStyle,
            }
          : // 部件内组件
            {
              left,
              top,
              width,
              height,
              position: 'absolute',
              ...componentScreenTypeStyle,
            },
      });
    });
  }, [isSelect, children, borderNone, componentScreenTypeStyle]);

  return <>{realChildren}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenWrapper);
