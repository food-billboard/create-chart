import { useDebounceFn } from 'ahooks';
import { get } from 'lodash';
import { getDvaGlobalModelData } from '@/utils/Assist/Component';
import ThemeUtil from '@/utils/Assist/Theme';
import { getLocationQuery, isDesignerPage } from '@/utils/tool';
import { useHash } from './useHash';

export function useThemeChange() {
  const { run: themeSet } = useDebounceFn(
    async (themeName: string) => {
      if (isDesignerPage()) return;
      const global = getDvaGlobalModelData();
      const themeConfig = get(global, 'screenData.config.attr.theme');
      await ThemeUtil.initCurrentThemeDataAndUpdateScreenData({
        needNotRequest: true,
        force: true,
        themeConfig: {
          ...themeConfig,
          value: themeName,
        },
        canUseQueryTheme: true,
      });
    },
    {
      wait: 500,
    },
  );

  useHash(async (currentHash, prevHash) => {
    const { theme: currentTheme } =
      getLocationQuery(currentHash.split('?')[1]) || {};
    const { theme: prevTheme } = getLocationQuery(prevHash.split('?')[1]) || {};
    // 主题名称发生改变
    if (prevTheme !== currentTheme) {
      await themeSet(currentTheme);
    }
  });
}
