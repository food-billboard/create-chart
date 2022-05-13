import { ReactNode, useRef, CSSProperties, useEffect } from 'react';
import { Options } from 'ahooks/es/useFocusWithin';
import { usePanelFocus } from '@/hooks';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';

// * 还有一个地方在 ComponentSelect 那边

const FocusWrapper = (props: {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  options?: Options;
  force?: boolean;
}) => {
  const { options = {}, force, ...nextProps } = props;

  const ref = useRef<HTMLDivElement>(null);

  usePanelFocus(ref, options, typeof force === 'undefined');

  useEffect(() => {
    if (typeof force === 'boolean') {
      if (force) {
        CopyAndPasteUtil.forceFocus();
      } else {
        CopyAndPasteUtil.forceUnFocus();
      }
    }
  }, [force]);

  return <div {...nextProps} ref={ref} />;
};

export default FocusWrapper;
