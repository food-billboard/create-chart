import { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { useSize } from 'ahooks';
import classnames from 'classnames';
import 'winbox/dist/css/winbox.min.css'; // required
import 'winbox/dist/css/themes/modern.min.css'; // optional
import WinBox from 'react-winbox';
import type { WinBoxPropType } from 'react-winbox';
import { useColorList } from '@/hooks';

export type WinBoxRef = {
  open: () => void;
};

const Winbox = forwardRef<WinBoxRef, WinBoxPropType>((props, ref) => {
  const { width = 0, height = 0 } = useSize(() => document.body) || {};

  const [visible, setVisible] = useState(true);

  const [colorA, , colorB] = useColorList();

  const boxRef = useRef<WinBox>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setVisible((prev) => {
            return !prev;
          });
        },
      };
    },
    [],
  );

  if (visible) return null;

  return (
    <WinBox
      minWidth={Math.max(width * 0.3, 350)}
      minHeight={height * 0.3}
      maxWidth={width * 0.6}
      maxHeight={height * 0.6}
      x="right"
      y="bottom"
      ref={boxRef}
      {...props}
      className={classnames(props.className, 'modern')}
      background={`linear-gradient(90deg, ${colorA}, ${colorB})`}
      hide={visible}
      onClose={() => {
        setVisible(true);
      }}
    />
  );
});

export default Winbox;
