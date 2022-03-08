import { Options } from 'ahooks/es/useFocusWithin';

class CopyAndPasteUtil {
  // 通过计数来判断是否处于失去焦点的状态
  FOCUS_POOL: number = 0;

  FOCUS_FLAG = false;

  isFocus = () => {
    return this.FOCUS_POOL === 0;
    return !this.FOCUS_FLAG;
  };

  forceUnFocus = () => {
    this.FOCUS_FLAG = false;
    this.FOCUS_POOL--;
  };

  forceFocus = () => {
    this.FOCUS_FLAG = true;
    this.FOCUS_POOL++;
  };

  injectHooksOptions = (
    options?: Partial<Options>,
    control: boolean = true,
  ) => {
    return {
      ...(options || {}),
      onFocus: (e: any) => {
        if (control) this.forceFocus();
        return options?.onFocus?.(e);
      },
      onBlur: (e: any) => {
        if (control) this.forceUnFocus();
        return options?.onBlur?.(e);
      },
    };
  };
}

export default new CopyAndPasteUtil();
