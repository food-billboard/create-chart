import {
  EyeOutlined,
  EyeInvisibleOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import {
  Collapse as AntCollapse,
  CollapsePanelProps,
  CollapseProps,
} from 'antd';
import classnames from 'classnames';
import type { ItemType } from 'rc-collapse/es/interface';
import { ReactNode, useCallback, useMemo, Children, cloneElement } from 'react';
import WrapperConfigList from '../Structure/ConfigList';
import PlaceHolder from '../Structure/PlaceHolder';
import Switch from '../Switch';
import styles from './index.less';

const { Item } = WrapperConfigList;

// 重写样式的折叠列表

export type TCollapseProps = CollapseProps & {
  children?: ReactNode;
};

export type TCollapsePanelProps = Exclude<CollapsePanelProps, 'extra'> & {
  visibleRender?: CollapsePanelProps['extra'] | boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
  children?: ReactNode;
};
const usePanel: (props: TCollapsePanelProps) => ItemType = (props) => {
  const {
    value,
    onChange,
    children,
    visibleRender,
    header,
    extra,
    ...nextProps
  } = props;

  const visibleRenderClick = useCallback(
    (status: boolean, e: any) => {
      e.stopPropagation();
      onChange?.(status);
    },
    [onChange],
  );

  const realVisibleRender = useMemo(() => {
    if (typeof visibleRender !== 'boolean') return visibleRender;
    if (!visibleRender) return null;

    return <Switch checked={!!value} onChange={visibleRenderClick} />;
    if (!!value)
      return (
        <EyeOutlined
          className="c-po"
          onClick={visibleRenderClick.bind(null, false)}
        />
      );
    return (
      <EyeInvisibleOutlined
        className="c-po"
        onClick={visibleRenderClick.bind(null, true)}
      />
    );
  }, [visibleRender, visibleRenderClick]);

  const realHeader = useMemo(() => {
    return (
      <>
        <PlaceHolder>{realVisibleRender}</PlaceHolder>
        <span className={styles['design-config-collapse-single-main']}>
          {header}
        </span>
        <PlaceHolder>{extra}</PlaceHolder>
      </>
    );
  }, [realVisibleRender, header, extra]);

  return {
    ...nextProps,
    label: realHeader,
    children: <WrapperConfigList>{children}</WrapperConfigList>,
  };
};

const Collapse = (props: TCollapseProps) => {
  const { className, ...nextProps } = props;

  return (
    <AntCollapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      expandIconPosition="end"
      className={classnames(className, styles['design-config-collapse'])}
      {...nextProps}
    />
  );
};

export type SingleCollapseProps = {
  parent?: TCollapseProps;
  child: TCollapsePanelProps;
  children?: ReactNode;
  level?: number;
};

export const SingleCollapse = (props: SingleCollapseProps) => {
  const { parent = {}, child, children, level = 1 } = props;

  const { value, visibleRender } = child;

  const collapsible: any = useMemo(() => {
    if (typeof visibleRender !== 'boolean' || !visibleRender || !!value)
      return 'header';

    return 'disabled';
  }, [visibleRender, value]);

  const realChildren = useMemo(() => {
    const realLevel = level + 1;
    return Children.map(children, (child: any) => {
      try {
        // @ts-ignore
        if (child.type.name === Item.name) {
          return cloneElement(child, {
            labelProps: {
              ...(child.props.labelProps || {}),
              level: realLevel,
            },
          });
        } else {
          return cloneElement(child, {
            level: realLevel,
          });
        }
      } catch (err) {
        return child;
      }
    });
  }, [children, level]);

  const items = usePanel({
    ...child,
    children: realChildren,
  });

  return (
    <Collapse
      collapsible={collapsible}
      {...parent}
      className={classnames(
        parent.className,
        styles['design-config-collapse-single'],
        {
          [styles['design-config-collapse-single-disabled']]:
            collapsible === 'disabled',
        },
      )}
      items={[items]}
    />
  );
};

export default Collapse;
