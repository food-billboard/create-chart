import { useEffect } from 'react';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import { TFetchFragmentRef } from '../../FetchFragment';

export const useFilterChange = (
  id: string,
  getValue: (
    value?: any,
    options?: Partial<TFetchFragmentRef> & {
      config?: SuperPartial<ComponentData.TComponentApiDataConfig>;
    },
  ) => any,
) => {
  const listener = (config: {
    id: string;
    filter: ComponentData.TFilterConfig[];
    componentConfig: SuperPartial<ComponentData.TComponentApiDataConfig>;
  }) => {
    if (config.id !== id) return;

    return getValue(undefined, {
      filter: config.filter,
      config: config.componentConfig,
    });
  };

  useEffect(() => {
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_FILTER_CHANGE.toString(),
      listener,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_FILTER_CHANGE.toString(),
        listener,
      );
    };
  }, []);
};
