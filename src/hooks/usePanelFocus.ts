import { useFocusWithin } from 'ahooks';
import { Options } from 'ahooks/es/useFocusWithin';
import { BasicTarget } from 'ahooks/es/utils/domTarget';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';

export function usePanelFocus(target: BasicTarget, options?: Options) {
  return useFocusWithin(target, CopyAndPasteUtil.injectHooksOptions(options));
}
