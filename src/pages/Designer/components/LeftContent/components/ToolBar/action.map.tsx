import {} from 'react';
import {
  RedoOutlined,
  UndoOutlined,
  BorderInnerOutlined,
  BarsOutlined,
  BlockOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.less';

const commonClass: string = classnames(
  'ac-i-size-m',
  styles['design-left-tool-icon'],
);

// 重做
export const RedoIcon = () => {
  return <RedoOutlined className={classnames(commonClass)} />;
};

// 撤销
export const UndoIcon = () => {
  return <UndoOutlined className={classnames(commonClass)} />;
};

// 图层显示隐藏
export const LayerShowIcon = () => {
  return <BlockOutlined className={classnames(commonClass)} />;
};

// 图层折叠展开
export const LayerCollapseIcon = () => {
  // <ArrowsAltOutlined />
  return <ShrinkOutlined className={classnames(commonClass)} />;
};

// 辅助线显示隐藏
export const GuideLineIcon = () => {
  return <BorderInnerOutlined className={classnames(commonClass)} />;
};

// 回调管理
export const CallbackIcon = () => {
  return <BarsOutlined className={classnames(commonClass)} />;
};
