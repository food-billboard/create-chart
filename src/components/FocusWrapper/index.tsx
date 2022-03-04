import { ReactNode, useRef, CSSProperties } from 'react';
import { Options } from 'ahooks/es/useFocusWithin';
import { usePanelFocus } from '@/hooks';

const FocusWrapper = (props: {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  options?: Options;
}) => {
  const { options, ...nextProps } = props;

  const ref = useRef<HTMLDivElement>(null);

  usePanelFocus(ref, options);

  return <div {...nextProps} ref={ref} />;
};

export default FocusWrapper;
