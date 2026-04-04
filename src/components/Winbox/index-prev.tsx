import { useSize } from 'ahooks';
import classnames from 'classnames';
import { useState, forwardRef, useRef, useImperativeHandle } from 'react';
// optional
import WinBox from 'react-winbox';
import type { WinBoxPropType } from 'react-winbox';
// required
import 'winbox/dist/css/themes/modern.min.css';
import 'winbox/dist/css/winbox.min.css';
import { DEFAULT_THEME_COLOR_LIST } from '@/utils/Assist/Theme';

export type WinBoxRef = {
  open: (visible?: boolean) => void;
};

const Winbox = forwardRef<
  WinBoxRef,
  WinBoxPropType & {
    widthRate?: [number, number];
    heightRate?: [number, number];
    onClose?: () => void;
  }
>((props, ref) => {
  const {
    widthRate = [0.3, 0.6],
    heightRate = [0.3, 0.6],
    onClose,
    ...nextProps
  } = props;

  const { width = 0, height = 0 } = useSize(() => document.body) || {};

  const [visible, setVisible] = useState(false);

  const [colorA, , colorB] = DEFAULT_THEME_COLOR_LIST;

  const boxRef = useRef<WinBox>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (visible) => {
          setVisible((prev) => {
            return visible ?? !prev;
          });
        },
      };
    },
    [],
  );

  if (!visible) return null;

  return (
    <WinBox
      minWidth={Math.max(width * widthRate[0], 350)}
      minHeight={height * heightRate[0]}
      maxWidth={width * widthRate[1]}
      maxHeight={height * heightRate[1]}
      x="right"
      y="bottom"
      ref={boxRef}
      {...nextProps}
      className={classnames(props.className, 'modern')}
      background={`linear-gradient(90deg, ${colorA}, ${colorB})`}
      hide={!visible}
      onClose={() => {
        setVisible(false);
        onClose?.();
      }}
    />
  );
});

export default Winbox;
