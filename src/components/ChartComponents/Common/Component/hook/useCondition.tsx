import classnames from 'classnames';
import { EventEmitter } from 'eventemitter3';
import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { connect } from 'umi';
import WinBox from '@/components/Winbox';
import { ConnectState } from '@/models/connect';

const EMITTER = new EventEmitter();

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  componentId: string;
};

export const InternalConditionComponent = forwardRef<
  HTMLDivElement,
  DivProps & {
    screenType: ComponentData.ScreenType;
  }
>(function (props, ref) {
  const {
    className: customClassName,
    style: customStyle,
    componentId,
    screenType,
    ...nextProps
  } = props;

  const [visible, setVisible] = useState(false);

  const [className, setClassName] = useState<string>('');
  const [style, setStyle] = useState<CSSProperties>({});

  const childrenProps = {
    ...nextProps,
    ref,
    className: classnames(customClassName, className),
    style: {
      ...customStyle,
      ...style,
    },
  };

  useEffect(() => {
    function listener(config: {
      className: string;
      style: CSSProperties;
      modalVisible: boolean;
    }) {
      const { className, style, modalVisible = false } = config;
      setVisible(modalVisible);
      setClassName(className);
      setStyle(style);
    }
    EMITTER.addListener(componentId, listener);
    return () => {
      EMITTER.removeListener(componentId, listener);
    };
  }, [componentId]);

  return (
    <>
      <div
        {...childrenProps}
        style={{
          ...childrenProps.style,
          pointerEvents: screenType === 'edit' || visible ? 'none' : 'all',
        }}
      />
      <WinBox
        // widthRate={[0.4, 0.7]}
        // heightRate={[0.4, 0.7]}
        onVisibleChange={(visible) => {
          if (!visible) {
            setVisible(false);
            EMITTER.emit(`${componentId}close`);
          }
        }}
        visible={visible}
      >
        <div {...childrenProps} />
      </WinBox>
    </>
  );
});

export const ConditionComponent = connect(
  (state: ConnectState) => {
    return {
      screenType: state.global.screenType,
    };
  },
  () => ({}),
  null,
  { forwardRef: true },
)(InternalConditionComponent);

export const useCondition = ({
  onCondition,
  screenType,
  componentId,
}: {
  onCondition: (
    condition: ComponentData.ComponentCondition,
  ) => ComponentData.ComponentConditionActionType | false;
  screenType: ComponentData.ComponentProps['global']['screenType'];
  componentId: string;
}) => {
  const [visible, setVisible] = useState(false);

  // 响应条件变化
  const internalOnCondition = useCallback(
    (
      condition: ComponentData.ComponentCondition,
      initialState: ComponentData.ComponentConditionConfig['initialState'],
    ) => {
      if (screenType === 'edit') return false;

      const result = onCondition(condition);
      let className = '';
      let style: CSSProperties = {};
      let modalVisible = false;

      switch (result) {
        case 'ease-in':
          className = 'animate__fadeIn animate__animated';
          break;
        case 'ease-in-out':
          className = 'component-condition-ease-in-out';
          break;
        case 'ease-out':
          className = 'animate__fadeOut animate__animated';
          break;
        case 'hidden':
          className = 'component-condition-hidden';
          break;
        case 'visible':
        // 小窗显示
        case 'modal-visible':
          modalVisible = result === 'modal-visible';
          break;
        default:
          className =
            initialState === 'visible' ? '' : 'component-condition-hidden';
      }

      EMITTER.emit(componentId, {
        className,
        style,
        modalVisible,
      });
      setVisible(modalVisible);

      return result;
    },
    [onCondition, screenType, componentId],
  );

  useEffect(() => {
    function listener() {
      setVisible(false);
    }
    EMITTER.addListener(`${componentId}close`, listener);
    return () => {
      EMITTER.removeListener(`${componentId}close` + 'close', listener);
    };
  }, []);

  return {
    onCondition: internalOnCondition,
    actionAble: visible,
  };
};
