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
import styles from './index.less';

const { Panel: AntPanel } = AntCollapse;

const Panel = (
  props: Exclude<CollapsePanelProps, 'extra'> & {
    visibleRender?: CollapsePanelProps['extra'] | boolean;
    value?: boolean;
    onChange?: (value: boolean) => void;
    children?: ReactNode;
  },
) => {
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

const Collapse = (
  props: CollapseProps & {
    children?: ReactNode;
  },
) => {
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

export default WrapperCollapse;
