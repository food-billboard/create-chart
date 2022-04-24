import { registerTheme } from 'echarts';
import color from 'color';
import WonderlandTheme from '../../../theme/wonderland.project.json';
import ShineTheme from '../../../theme/shine.project.json';

class ThemeUtil {
  currentTheme!: string;
  currentThemeColor: string[] = [];

  themeDataSource = {
    [WonderlandTheme.themeName]: WonderlandTheme.theme,
    [ShineTheme.themeName]: ShineTheme.theme,
  };

  get currentThemeColorLength() {
    return this.currentThemeColor.length;
  }

  // 初始化
  init() {
    this.initCurrentThemeData(WonderlandTheme.themeName);
  }

  // 设置当前的色调
  initCurrentThemeData(themeName: string) {
    if (!themeName || this.currentTheme === themeName) return;
    registerTheme(themeName, this.themeDataSource[themeName]);
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
