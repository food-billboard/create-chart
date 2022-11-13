import { useContext } from 'react';
import { ExchangePreviewerContext } from '../pages/Designer/components/ExchangeScreenFlag/components/MobilePreviewer/context';

export function useScreenFlag(
  flag: ComponentData.ScreenFlagType,
): ComponentData.ScreenFlagType {
  const { mobilePreviewerAble } = useContext(ExchangePreviewerContext);
  return mobilePreviewerAble ? 'H5' : flag;
}
