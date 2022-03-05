import { Options } from 'ahooks/es/useFocusWithin';

class CopyAndPasteUtil {
  FOCUS_FLAG = false;

  isFocus = () => {
    return !this.FOCUS_FLAG;
  };

  forceUnFocus = () => {
    this.FOCUS_FLAG = false;
  };

  forceFocus = () => {
    this.FOCUS_FLAG = true;
  };

  injectHooksOptions = (
    options?: Partial<Options>,
    control: boolean = true,
  ) => {
    return {
      ...(options || {}),
      onFocus: (e: any) => {
        if (control) this.FOCUS_FLAG = true;
        return options?.onFocus?.(e);
      },
      onBlur: (e: any) => {
        if (control) this.FOCUS_FLAG = false;
        return options?.onBlur?.(e);
      },
    };
  };
}

export default new CopyAndPasteUtil();
