import ThemeUtil from '@/utils/Assist/Theme';
import { getLocationQuery } from '@/utils/tool';
import { useHash } from './useHash';

export function useThemeChange() {
  useHash((currentHash, prevHash) => {
    const { theme: currentTheme } =
      getLocationQuery(currentHash.split('?')[1]) || {};
    const { theme: prevTheme } = getLocationQuery(prevHash.split('?')[1]) || {};
    // 主题名称发生改变
    if (prevTheme !== currentTheme) {
    }
  });
}
