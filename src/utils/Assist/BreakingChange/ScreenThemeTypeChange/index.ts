import ThemeUtil from '../../Theme';

export const ScreenThemeTypeChange = (
  theme: ComponentData.TScreenTheme | string,
) => {
  if (typeof theme !== 'string') return theme;
  let type = 'custom';
  let realTheme;
  try {
    realTheme = ThemeUtil.themeDataSource[theme]
      ? theme
      : ThemeUtil.currentTheme;
  } catch (err) {
    realTheme = ThemeUtil.currentTheme;
  } finally {
    return {
      type,
      value: realTheme,
      color: [],
    };
  }
};
