import { createContext } from 'react';

export const ExchangePreviewerContext = createContext<{
  flag?: ComponentData.ScreenFlagType;
}>({});
