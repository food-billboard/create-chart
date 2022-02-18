import { useCallback, useRef } from 'react';
import {
  RedoOutlined,
  UndoOutlined,
  BorderInnerOutlined,
  BarsOutlined,
  BlockOutlined,
  ShrinkOutlined,
  BorderOuterOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import { connect } from 'dva';
import CallbackManage, { CallbackManageRef } from '../CallbackManage';
import ConstantManage, { ConstantManageRef } from '../ConstantManage';
import LayerManage, { LayerManageRef } from '../LayerManage';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const commonClass: string = classnames(
  'ac-i-size-m',
  styles['design-left-tool-icon'],
);

export type TCommonProps = {
  onClick?: (
    type: 'undo' | 'redo' | 'layer' | 'guideline' | 'callback' | 'constant',
  ) => void;
};

// 重做
export const InternalRedoIcon = (
  props: {
    isRedoDisabled: boolean;
    redo: () => void;
  } & TCommonProps,
) => {
  const { isRedoDisabled, redo, onClick } = props;

  const handleClick = useCallback(() => {
    if (!isRedoDisabled) {
      redo();
      onClick?.('redo');
    }
  }, [onClick, isRedoDisabled, redo]);

  return (
    <RedoOutlined
      title="重做"
      onClick={handleClick}
      className={classnames(commonClass, {
        'c-n-alw': !!isRedoDisabled,
        'c-po': !isRedoDisabled,
        [styles['design-left-tool-icon-hover']]: !isRedoDisabled,
      })}
    />
  );
};
export const RedoIcon = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalRedoIcon);

// 撤销
export const InternalUndoIcon = (
  props: {
    isUndoDisabled: boolean;
    undo: () => void;
  } & TCommonProps,
) => {
  const { isUndoDisabled, undo, onClick } = props;

  const handleClick = useCallback(() => {
    if (!isUndoDisabled) {
      undo();
      onClick?.('undo');
    }
  }, [onClick, isUndoDisabled, undo]);

  return (
    <UndoOutlined
      title="撤销"
      onClick={handleClick}
      className={classnames(commonClass, {
        'c-n-alw': !!isUndoDisabled,
        'c-po': !isUndoDisabled,
        [styles['design-left-tool-icon-hover']]: !isUndoDisabled,
      })}
    />
  );
};
export const UndoIcon = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalUndoIcon);

// 图层显示隐藏
export const LayerShowIcon = (props: TCommonProps) => {
  const { onClick } = props;

  const handleOpen = useCallback(() => {
    onClick?.('layer');
  }, [onClick]);

  return (
    <BlockOutlined
      title="图层管理"
      className={classnames(
        commonClass,
        'c-po',
        styles['design-left-tool-icon-hover'],
      )}
      onClick={handleOpen}
    />
  );
};

// 图层折叠展开
export const LayerCollapseIcon = (props: TCommonProps) => {
  // <ArrowsAltOutlined />
  return (
    <ShrinkOutlined
      className={classnames(
        commonClass,
        'c-po',
        styles['design-left-tool-icon-hover'],
      )}
    />
  );
};

// 辅助线显示隐藏
const InternalGuideLineIcon = (
  props: {
    guideLineShow?: boolean;
    setGuideLine?: (value: Partial<ComponentData.TGuideLineConfig>) => void;
  } & TCommonProps,
) => {
  const { guideLineShow, setGuideLine, onClick } = props;

  const handleClick = useCallback(() => {
    setGuideLine?.({
      show: !guideLineShow,
    });
    onClick?.('guideline');
  }, [onClick, guideLineShow, setGuideLine]);

  const domProps = {
    title: '辅助线',
    className: classnames(
      commonClass,
      'c-po',
      styles['design-left-tool-icon-hover'],
    ),
    onClick: handleClick,
  };

  if (!guideLineShow) {
    return <BorderOuterOutlined {...domProps} />;
  }

  return <BorderInnerOutlined {...domProps} />;
};
export const GuideLineIcon = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalGuideLineIcon);

// 回调管理
export const CallbackIcon = (props: TCommonProps) => {
  const { onClick } = props;

  const callbackRef = useRef<CallbackManageRef>(null);

  const handleOpen = useCallback(() => {
    callbackRef.current?.open();
    onClick?.('callback');
  }, [onClick]);

  return (
    <>
      <BarsOutlined
        title="回调管理"
        className={classnames(
          commonClass,
          'c-po',
          styles['design-left-tool-icon-hover'],
        )}
        onClick={handleOpen}
      />
      <CallbackManage ref={callbackRef} />
    </>
  );
};

// 全局常量管理
export const ConstantIcon = (props: TCommonProps) => {
  const { onClick } = props;

  const constantRef = useRef<ConstantManageRef>(null);

  const handleOpen = useCallback(() => {
    constantRef.current?.open();
    onClick?.('constant');
  }, [onClick]);

  return (
    <>
      <GlobalOutlined
        title="常量管理"
        className={classnames(
          commonClass,
          'c-po',
          styles['design-left-tool-icon-hover'],
        )}
        onClick={handleOpen}
      />
      <ConstantManage ref={constantRef} />
    </>
  );
};
