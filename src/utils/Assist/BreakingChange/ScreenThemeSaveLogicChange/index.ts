import { mergeWithoutArray, versionCompare } from '@/utils';

export const ScreenThemeSaveLogicChange = (
  theme: ComponentData.TScreenTheme,
  version: string,
) => {
  if (versionCompare(version, '1.21')) return theme;
  // @ts-ignore
  const { type, value, color } = theme;
  return {
    value: type === 'custom' ? 'DEFAULT_CUSTOM_THEME_NAME' : value,
    // ? 如果是Internal 则需要设置为默认的值
    color:
      type === 'custom'
        ? [
            {
              label: 'DEFAULT_CUSTOM_THEME_NAME',
              // @ts-ignore
              value: color as string[],
            },
          ]
        : [],
  } as ComponentData.TScreenTheme;
};
