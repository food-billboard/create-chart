import { ReactNode, useCallback, useMemo } from 'react';
import {
  Collapse as AntCollapse,
  CollapsePanelProps,
  CollapseProps,
} from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import PlaceHolder from '../Structure/PlaceHolder';
import WrapperConfigList from '../Structure/ConfigList';
import Switch from '../Switch';
import styles from './index.less';

const { Panel: AntPanel } = AntCollapse;

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

const Panel = (props: TCollapsePanelProps) => {
  const { value, onChange, children, visibleRender, header, ...nextProps } =
    props;

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
        {header}
      </>
    );
  }, [realVisibleRender, header]);

  return (
    <AntPanel {...nextProps} header={realHeader}>
      <WrapperConfigList>{children}</WrapperConfigList>
    </AntPanel>
  );
};

const Collapse = (props: TCollapseProps) => {
  const { className, ...nextProps } = props;

  return (
    <AntCollapse
      bordered={false}
      // defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      expandIconPosition="right"
      className={classnames(className, styles['design-config-collapse'])}
      {...nextProps}
    />
  );
};

const WrapperCollapse: typeof Collapse & {
  Panel: typeof Panel;
} = Collapse as any;

WrapperCollapse.Panel = Panel;

export const SingleCollapse = (props: {
  parent?: TCollapseProps;
  child: TCollapsePanelProps;
  children?: ReactNode;
}) => {
  const { parent = {}, child, children } = props;

  const { value, visibleRender } = child;

  const collapsible: any = useMemo(() => {
    if (typeof visibleRender !== 'boolean' || !visibleRender || !!value)
      return 'header';

    return 'disabled';
  }, [visibleRender, value]);

  return (
    <Collapse
      collapsible={collapsible}
      {...parent}
      className={classnames(parent.className, {
        [styles['design-config-collapse-single-disabled']]:
          collapsible === 'disabled',
      })}
    >
      <Panel {...child}>{children}</Panel>
    </Collapse>
  );
};

export default WrapperCollapse;
