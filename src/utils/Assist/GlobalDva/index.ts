import { getDvaGlobalModelData } from '../Component';

export const getGlobalSelect: () => string[] = () => {
  const globalState = getDvaGlobalModelData();
  return globalState.select || [];
};
