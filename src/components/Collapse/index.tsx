import React, { ReactNode, useMemo } from 'react';
import {
  Collapse as AntCollapse,
  CollapsePanelProps,
  CollapseProps,
} from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const { Panel: AntPanel } = AntCollapse;

const Panel = (
  props: Exclude<CollapsePanelProps, 'extra'> & {
    extra?: CollapsePanelProps['extra'] | boolean;
    value?: boolean;
    onChange?: (value: boolean) => void;
    children?: ReactNode;
  },
) => {
  const { extra, value, onChange, ...nextProps } = props;

  const realExtra = useMemo(() => {
    if (typeof extra !== 'boolean') return extra;
    if (!extra) return null;
    if (!!value)
      return (
        <EyeOutlined className="c-po" onClick={onChange?.bind(null, false)} />
      );
    return (
      <EyeInvisibleOutlined
        className="c-po"
        onClick={onChange?.bind(null, true)}
      />
    );
  }, []);

  return <AntPanel {...nextProps} />;
};

const Collapse = (
  props: CollapseProps & {
    children?: ReactNode;
  },
) => {
  return <AntCollapse expandIconPosition="left" {...props} />;
};

const WrapperCollapse: typeof Collapse & {
  Panel: typeof Panel;
} = Collapse as any;

WrapperCollapse.Panel = Panel;

export default WrapperCollapse;
