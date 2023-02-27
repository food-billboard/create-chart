import { createContext, useContext } from 'react';
import Store from '../models-next';

export type MobxContextType = Store;

export const mobxStore = new Store();

export const MobxContext = createContext(mobxStore);

export function useMobxContext() {
  return useContext(MobxContext);
}
