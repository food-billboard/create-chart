import { ReactNode, useMemo, Children, cloneElement } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { get } from 'lodash';
import { useIsComponentChildrenSelect } from '@/hooks';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from '../../index.less';

const ChildrenWrapper = (props: {
  children?: ReactNode;
  value: ComponentData.TComponentData;
  select: string[];
  borderNone?: boolean;
}) => {
  const { value, select, children, borderNone = false } = props;

  const isSelect = useIsComponentChildrenSelect([value], select);

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
            }
          : // 部件内组件
            {
              left,
              top,
              width,
              height,
              position: 'absolute',
            },
      });
    });
  }, [isSelect, children, borderNone]);

  return <>{realChildren}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenWrapper);
