import { ReactNode, CSSProperties, useRef } from 'react';
import { useFocusWithin, useKeyPress } from 'ahooks';

const EnterSubmitWrapper = (props: {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  onSubmit?: () => void;
}) => {
  const { children, style, className, onSubmit } = props;

  const containerRef = useRef<any>(null);

  const isFocusWithin = useFocusWithin(containerRef);

  useKeyPress('enter', () => {
    if (isFocusWithin) onSubmit?.();
  });

  return (
    <div style={style} className={className} ref={containerRef}>
      {children}
    </div>
  );
};

export default EnterSubmitWrapper;
