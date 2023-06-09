import { useRef } from 'react';
import {
  RedoOutlined,
  UndoOutlined,
  ToolOutlined,
  ShrinkOutlined,
  GlobalOutlined,
  MacCommandOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import { connect } from 'dva';
import { useDebounceFn } from 'ahooks';
import GlobalLoadingActonButton from '@/components/GlobalLoadingActionButton';
import IconFont from '@/components/ChartComponents/Common/Icon';
import CallbackManage, { CallbackManageRef } from '../CallbackManage';
import ConstantManage, { ConstantManageRef } from '../ConstantManage';
import LocalConfigMange, { LocalConfigManageRef } from '../LocalConfigMange';
import LensConfigModal, { LensConfigRef } from '../LensConfig';
import ThemeConfigModal, { ThemeConfigRef } from '../ThemeConfig';
import RequestDefaultConfigManage, {
  RequestCofigRef,
} from '../RequestDefaultConfig';
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
      | 'callback'
      | 'requestDefault'
      | 'constant'
      | 'localConfig'
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

  const { run: handleClick } = useDebounceFn(
    async () => {
      if (!isRedoDisabled) {
        redo();
        onClick?.('redo');
      }
    },
    {
      wait: 200,
    },
  );

  return (
    <GlobalLoadingActonButton
      Component={RedoOutlined}
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

  const { run: handleClick } = useDebounceFn(
    async () => {
      if (!isUndoDisabled) {
        undo();
        onClick?.('undo');
      }
    },
    { wait: 200 },
  );

  return (
    <GlobalLoadingActonButton
      Component={UndoOutlined}
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

// 回调管理
export const CallbackIcon = (props: TCommonProps) => {
  const { onClick } = props;

  const callbackRef = useRef<CallbackManageRef>(null);

  const { run: handleOpen } = useDebounceFn(
    () => {
      callbackRef.current?.open();
      onClick?.('callback');
    },
    { wait: 200 },
  );

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

  const { run: handleOpen } = useDebounceFn(
    () => {
      constantRef.current?.open();
      onClick?.('constant');
    },
    { wait: 200 },
  );

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

  const { run: handleOpen } = useDebounceFn(
    () => {
      localConfigRef.current?.open();
      onClick?.('localConfig');
    },
    { wait: 200 },
  );

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

  const { run: handleOpen } = useDebounceFn(
    () => {
      lensConfigRef.current?.open();
      onClick?.('lens');
    },
    { wait: 200 },
  );

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

  const { run: handleOpen } = useDebounceFn(
    () => {
      themeConfigRef.current?.open();
      onClick?.('lens');
    },
    { wait: 200 },
  );

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

// 默认请求配置
export const RequestDefaultConfig = (props: TCommonProps) => {
  const { onClick } = props;

  const requestConfigRef = useRef<RequestCofigRef>(null);

  const { run: handleOpen } = useDebounceFn(
    () => {
      requestConfigRef.current?.open();
      onClick?.('requestDefault');
    },
    { wait: 200 },
  );

  return (
    <>
      <IconFont
        type="icon-datafull"
        title="请求默认配置"
        className={classnames(
          commonClass,
          'c-po',
          styles['design-left-tool-icon-hover'],
        )}
        onClick={handleOpen}
      />
      <RequestDefaultConfigManage ref={requestConfigRef} />
    </>
  );
};
