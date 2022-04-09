import { registerTheme } from 'echarts';
import color from 'color';
import WonderlandTheme from '../../../theme/wonderland.project.json';

class ThemeUtil {
  currentTheme!: string;
  currentThemeColor: string[] = [];

  themeDataSource = {
    [WonderlandTheme.themeName]: WonderlandTheme.theme,
  };

  get currentThemeColorLength() {
    return this.currentThemeColor.length;
  }

  // 初始化
  init() {
    Object.entries(this.themeDataSource).forEach((theme) => {
      const [key, value] = theme;
      registerTheme(key, value);
    });
    this.initCurrentThemeData(WonderlandTheme.themeName);
  }

  // 设置当前的色调
  initCurrentThemeData(themeName: string) {
    const theme = this.themeDataSource[themeName];
    this.currentTheme = themeName;
    this.currentThemeColor = theme.color;
  }

  // 生成下一个当前色调的颜色
  generateNextColor4CurrentTheme(index: number) {
    const realIndex = index % this.currentThemeColor.length;
    const targetColor = this.currentThemeColor[realIndex];
    return color(targetColor).object() as ComponentData.TColorConfig;
  }
}

export default new ThemeUtil();
