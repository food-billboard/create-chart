import { useCallback } from 'react';
import { get } from 'lodash';
import querystring from 'query-string';
import { getDvaGlobalModelData } from '@/utils/Assist/Component';
import VariableString from '@/utils/Assist/VariableString';

export const useLinkageInteractive = (
  linkage: ComponentData.TLinkageInteractiveConfig[],
) => {
  return useCallback((type: string, value: object) => {
    try {
      const targetLinkage = linkage.find(
        (item) => item.type === type && item.show,
      );
      if (!targetLinkage) return;
      const { value: url } = targetLinkage;
      const state = getDvaGlobalModelData();
      const { params, constants } = get(state, 'screenData.config.attr') || {};
      let targetUrl = url;
      if (/.?\{\{.+\}\}.?/.test(targetUrl)) {
        targetUrl = VariableString.variableStringToRealString(
          url,
          params || [],
          constants || [],
        );
      }
      const { origin, pathname, search, hash } = new URL(targetUrl);
      const newSearch =
        search +
        (search.startsWith('?') ? '' : '?') +
        querystring.stringify(value);
      const newUrl = origin + pathname + newSearch + hash;
      window.open(newUrl, '_blank');
    } catch (err) {}
  }, []);
};
