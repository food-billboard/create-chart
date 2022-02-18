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
    if (borderNone) return children;
    return Children.map(children, (child) => {
      const className = get(child, 'props.className');
      return cloneElement(child as any, {
        className: classnames(className, {
          [styles['render-component-wrapper']]: !isSelect,
          'border-1-a': isSelect,
        }),
      });
    });
  }, [isSelect, children, borderNone]);

  return <>{realChildren}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenWrapper);
