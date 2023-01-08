import { useCallback, useRef } from 'react';
import {
  RedoOutlined,
  UndoOutlined,
  BorderInnerOutlined,
  ToolOutlined,
  BlockOutlined,
  ShrinkOutlined,
  BorderOuterOutlined,
  GlobalOutlined,
  MacCommandOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import { connect } from 'dva';
import IconFont from '@/components/ChartComponents/Common/Icon';
import CallbackManage, { CallbackManageRef } from '../CallbackManage';
import ConstantManage, { ConstantManageRef } from '../ConstantManage';
import LocalConfigMange, { LocalConfigManageRef } from '../LocalConfigMange';
import LensConfigModal, { LensConfigRef } from '../LensConfig';
import ThemeConfigModal, { ThemeConfigRef } from '../ThemeConfig';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const commonClass: string = classnames(
  'ac-i-size-m',
  styles['design-left-tool-icon'],
);

export type TCommonProps = {
  onClick?: (
    type:
      | 'undo'
      | 'redo'
      | 'layer'
      | 'guideline'
      | 'callback'
      | 'constant'
      | 'localConfig'
      | 'component-collapse'
      | 'lens',
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
        [styles['design-left-tool-icon-n-a-w']]: !!isRedoDisabled,
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
        [styles['design-left-tool-icon-n-a-w']]: !!isUndoDisabled,
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
      <ToolOutlined
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

// 本地配置管理
export const LocalConfigIcon = (props: TCommonProps) => {
  const { onClick } = props;

  const localConfigRef = useRef<LocalConfigManageRef>(null);

  const handleOpen = useCallback(() => {
    localConfigRef.current?.open();
    onClick?.('localConfig');
  }, [onClick]);

  return (
    <>
      <MacCommandOutlined
        title="本地配置管理"
        className={classnames(
          commonClass,
          'c-po',
          styles['design-left-tool-icon-hover'],
        )}
        onClick={handleOpen}
      />
      <LocalConfigMange ref={localConfigRef} />
    </>
  );
};

// 全局滤镜
export const LensConfig = (props: TCommonProps) => {
  const { onClick } = props;

  const lensConfigRef = useRef<LensConfigRef>(null);

  const handleOpen = useCallback(() => {
    lensConfigRef.current?.open();
    onClick?.('lens');
  }, [onClick]);

  return (
    <>
      <IconFont
        type="icon-iconlvjingkua"
        title="全局滤镜"
        className={classnames(
          commonClass,
          'c-po',
          styles['design-left-tool-icon-hover'],
        )}
        onClick={handleOpen}
      />
      <LensConfigModal ref={lensConfigRef} />
    </>
  );
};

// 色调修改
export const ThemeConfig = (props: TCommonProps) => {
  const { onClick } = props;

  const themeConfigRef = useRef<ThemeConfigRef>(null);

  const handleOpen = useCallback(() => {
    themeConfigRef.current?.open();
    onClick?.('lens');
  }, [onClick]);

  return (
    <>
      <IconFont
        type="icon-ziyuan"
        title="主题色选择"
        className={classnames(
          commonClass,
          'c-po',
          styles['design-left-tool-icon-hover'],
        )}
        onClick={handleOpen}
      />
      <ThemeConfigModal ref={themeConfigRef} />
    </>
  );
};
