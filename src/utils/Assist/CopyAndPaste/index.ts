import { Options } from 'ahooks/es/useFocusWithin';

class CopyAndPasteUtil {
  FOCUS_FLAG = false;

  isFocus = () => {
    return !this.FOCUS_FLAG;
  };

  injectHooksOptions = (options?: Partial<Options>) => {
    return {
      ...(options || {}),
      onFocus: (e: any) => {
        this.FOCUS_FLAG = true;
        return options?.onFocus?.(e);
      },
      onBlur: (e: any) => {
        this.FOCUS_FLAG = false;
        return options?.onBlur?.(e);
      },
    };
  };
}

export default new CopyAndPasteUtil();
