import color from 'color';
import { omit, pick } from 'lodash';
import Eventemitter3 from 'eventemitter3';
import { echartsLoader } from '../EchartsLoader';
import WonderlandTheme from '../../../theme/wonderland.project.json';
import ShineTheme from '../../../theme/shine.project.json';
import EssosTheme from '../../../theme/essos.project.json';
import MacaronsTheme from '../../../theme/macarons.project.json';
import RomaTheme from '../../../theme/roma.project.json';
import WesterosTheme from '../../../theme/westeros.project.json';

const alphaHexMap = {
  '1.00': 'FF',
  '0.99': 'FC',
  '0.98': 'FA',
  '0.97': 'F7',
  '0.96': 'F5',
  '0.95': 'F2',
  '0.94': 'F0',
  '0.93': 'ED',
  '0.92': 'EB',
  '0.91': 'E8',
  '0.90': 'E6',
  '0.89': 'E3',
  '0.88': 'E0',
  '0.87': 'DE',
  '0.86': 'DB',
  '0.85': 'D9',
  '0.84': 'D6',
  '0.83': 'D4',
  '0.82': 'D1',
  '0.81': 'CF',
  '0.80': 'CC',
  '0.79': 'C9',
  '0.78': 'C7',
  '0.77': 'C4',
  '0.76': 'C2',
  '0.75': 'BF',
  '0.74': 'BD',
  '0.73': 'BA',
  '0.72': 'B8',
  '0.71': 'B5',
  '0.70': 'B3',
  '0.69': 'B0',
  '0.68': 'AD',
  '0.67': 'AB',
  '0.66': 'A8',
  '0.65': 'A6',
  '0.64': 'A3',
  '0.63': 'A1',
  '0.62': '9E',
  '0.61': '9C',
  '0.60': '99',
  '0.59': '96',
  '0.58': '94',
  '0.57': '91',
  '0.56': '8F',
  '0.55': '8C',
  '0.54': '8A',
  '0.53': '87',
  '0.52': '85',
  '0.51': '82',
  '0.50': '80',
  '0.49': '7D',
  '0.48': '7A',
  '0.47': '78',
  '0.46': '75',
  '0.45': '73',
  '0.44': '70',
  '0.43': '6E',
  '0.42': '6B',
  '0.41': '69',
  '0.40': '66',
  '0.39': '63',
  '0.38': '61',
  '0.37': '5E',
  '0.36': '5C',
  '0.35': '59',
  '0.34': '57',
  '0.33': '54',
  '0.32': '52',
  '0.31': '4F',
  '0.30': '4D',
  '0.29': '4A',
  '0.28': '47',
  '0.27': '45',
  '0.26': '42',
  '0.25': '40',
  '0.24': '3D',
  '0.23': '3B',
  '0.22': '38',
  '0.21': '36',
  '0.20': '33',
  '0.19': '30',
  '0.18': '2E',
  '0.17': '2B',
  '0.16': '29',
  '0.15': '26',
  '0.14': '24',
  '0.13': '21',
  '0.12': '1F',
  '0.11': '1C',
  '0.10': '1A',
  '0.09': '17',
  '0.08': '14',
  '0.07': '12',
  '0.06': '0F',
  '0.05': '0D',
  '0.04': '0A',
  '0.03': '08',
  '0.02': '05',
  '0.01': '03',
  '0.00': '00',
};

export function getOpacity(prevColor: ComponentData.TColorConfig) {
  return prevColor?.a ?? 1;
}

export function getRgbaString(prevColor: ComponentData.TColorConfig) {
  if (!prevColor) return prevColor;
  try {
    return `rgba(${color(pick(prevColor, ['r', 'g', 'b']))
      .array()
      .join(',')}, ${prevColor.a ?? 1})`;
  } catch (err) {
    return '';
  }
}

export function getHexString(
  prevColor: ComponentData.TColorConfig,
  prefix?: boolean,
) {
  if (!prevColor) return prevColor;
  let result = color(omit(prevColor, 'a')).hex();
  const a = (prevColor.a ?? 1).toFixed(2);
  result += (alphaHexMap as any)[a] || 'FF';
  return prefix ? result : result.slice(1);
}

export const ThemeEventEmitter = new Eventemitter3();

export const THEM_EVENT_NAME = 'THEM_EVENT_NAME';

export const DEFAULT_THEME_COLOR = WonderlandTheme.theme.color[0];
export const DEFAULT_THEME_NAME = WonderlandTheme.themeName;

class ThemeUtil {
  currentTheme!: string;
  currentThemeColor: string[] = [];

  originThemeDataSource = {
    [WonderlandTheme.themeName]: WonderlandTheme.theme,
    [ShineTheme.themeName]: ShineTheme.theme,
    [EssosTheme.themeName]: EssosTheme.theme,
    [MacaronsTheme.themeName]: MacaronsTheme.theme,
    [RomaTheme.themeName]: RomaTheme.theme,
    [WesterosTheme.themeName]: WesterosTheme.theme,
  };

  themeDataSource = {
    ...this.originThemeDataSource,
  };

  get currentThemeColorLength() {
    return this.currentThemeColor.length;
  }

  get themeNameList() {
    return Object.keys(this.themeDataSource);
  }

  getThemeColorList(name: string) {
    return this.themeDataSource[name].color;
  }

  isThemeNameValid(name: string) {
    return !!this.themeDataSource[name];
  }

  isInternalThemeName(name: string) {
    return !!this.originThemeDataSource[name];
  }

  // 初始化
  init() {
    this.initCurrentThemeData(WonderlandTheme.themeName, false);
  }

  registerThemeLoading = false;
  registerThemeArray: [string, object][] = [];
  async registerTheme(themeName: string, options: any) {
    this.registerThemeArray.push([themeName, options]);
    if (this.registerThemeLoading) {
      return;
    }
    this.registerThemeLoading = true;
    await echartsLoader().then((echarts) => {
      const [target] = this.registerThemeArray.slice(-1);
      if (target) echarts.registerTheme(...target);
      this.registerThemeArray = [];
      this.registerThemeLoading = false;
    });
  }

  // 初始化自定义主题
  initCustomTheme(themeConfig: ComponentData.TScreenTheme) {
    const { color = [], value } = themeConfig;
    this.themeDataSource[value] = {
      seriesCnt: '3',
      backgroundColor: 'rgba(255,255,255,0)',
      titleColor: '#666666',
      subtitleColor: '#999999',
      textColorShow: false,
      textColor: '#333',
      markTextColor: '#ffffff',
      // color: ['#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2', '#f2b3c9'],
      color,
      borderColor: '#ccc',
      borderWidth: 0,
      // visualMapColor: ['#d0648a', '#22c3aa', '#adfff1'],
      visualMapColor: [color[3], color[1], color[4]],
      legendTextColor: '#999999',
      // kColor: '#d0648a',
      kColor: color[3],
      kColor0: 'transparent',
      // kBorderColor: '#d0648a',
      kBorderColor: color[3],
      // kBorderColor0: '#22c3aa',
      kBorderColor0: color[1],
      kBorderWidth: '1',
      lineWidth: '3',
      symbolSize: '8',
      symbol: 'emptyCircle',
      symbolBorderWidth: '2',
      lineSmooth: false,
      graphLineWidth: '1',
      graphLineColor: '#cccccc',
      // mapLabelColor: '#28544e',
      mapLabelColor: color[0],
      // mapLabelColorE: '#349e8e',
      mapLabelColorE: color[1],
      mapBorderColor: '#999999',
      // mapBorderColorE: '#22c3aa',
      mapBorderColorE: color[1],
      mapBorderWidth: 0.5,
      mapBorderWidthE: 1,
      mapAreaColor: '#eeeeee',
      // mapAreaColorE: 'rgba(34,195,170,0.25)',
      mapAreaColorE: color[2],
      axes: [
        {
          type: 'all',
          name: '通用坐标轴',
          axisLineShow: true,
          axisLineColor: '#cccccc',
          axisTickShow: false,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#999999',
          splitLineShow: true,
          splitLineColor: ['#eeeeee'],
          splitAreaShow: false,
          splitAreaColor: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
        },
        {
          type: 'category',
          name: '类目坐标轴',
          axisLineShow: true,
          axisLineColor: '#333',
          axisTickShow: true,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#333',
          splitLineShow: false,
          splitLineColor: ['#ccc'],
          splitAreaShow: false,
          splitAreaColor: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
        },
        {
          type: 'value',
          name: '数值坐标轴',
          axisLineShow: true,
          axisLineColor: '#333',
          axisTickShow: true,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#333',
          splitLineShow: true,
          splitLineColor: ['#ccc'],
          splitAreaShow: false,
          splitAreaColor: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
        },
        {
          type: 'log',
          name: '对数坐标轴',
          axisLineShow: true,
          axisLineColor: '#333',
          axisTickShow: true,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#333',
          splitLineShow: true,
          splitLineColor: ['#ccc'],
          splitAreaShow: false,
          splitAreaColor: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
        },
        {
          type: 'time',
          name: '时间坐标轴',
          axisLineShow: true,
          axisLineColor: '#333',
          axisTickShow: true,
          axisTickColor: '#333',
          axisLabelShow: true,
          axisLabelColor: '#333',
          splitLineShow: true,
          splitLineColor: ['#ccc'],
          splitAreaShow: false,
          splitAreaColor: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
        },
      ],
      axisSeperateSetting: false,
      toolboxColor: '#999999',
      toolboxEmphasisColor: '#666666',
      tooltipAxisColor: '#cccccc',
      tooltipAxisWidth: 1,
      // timelineLineColor: '#4ea397',
      timelineLineColor: color[1],
      timelineLineWidth: 1,
      // timelineItemColor: '#4ea397',
      timelineItemColor: color[1],
      // timelineItemColorE: '#4ea397',
      timelineItemColorE: color[1],
      // timelineCheckColor: '#4ea397',
      timelineCheckColor: color[1],
      // timelineCheckBorderColor: '#3cebd2',
      timelineCheckBorderColor: color[2],
      timelineItemBorderWidth: 1,
      // timelineControlColor: '#4ea397',
      timelineControlColor: color[1],
      // timelineControlBorderColor: '#4ea397',
      timelineControlBorderColor: color[1],
      timelineControlBorderWidth: 0.5,
      // timelineLabelColor: '#4ea397',
      timelineLabelColor: color[1],
      datazoomBackgroundColor: 'rgba(255,255,255,0)',
      datazoomDataColor: 'rgba(222,222,222,1)',
      // datazoomFillColor: 'rgba(114,230,212,0.25)',
      datazoomFillColor: color[3],
      datazoomHandleColor: '#cccccc',
      datazoomHandleWidth: '100',
      datazoomLabelColor: '#999999',
    };
  }

  // 设置当前的色调
  async initCurrentThemeData(
    themeConfig: string | ComponentData.TScreenTheme,
    registerTheme = true,
    force = false,
  ) {
    const themeName =
      typeof themeConfig === 'string' ? themeConfig : themeConfig.value;
    if (!themeName || (this.currentTheme === themeName && !force)) return;
    // custom theme
    if ((themeConfig as ComponentData.TScreenTheme).type === 'custom')
      this.initCustomTheme(themeConfig as ComponentData.TScreenTheme);

    if (registerTheme) {
      await this.registerTheme(themeName, this.themeDataSource[themeName]);
    }
    const theme = this.themeDataSource[themeName];
    this.currentTheme = themeName;
    this.currentThemeColor = theme.color;

    ThemeEventEmitter.emit(THEM_EVENT_NAME, this.currentThemeColor[0]);
  }

  // 生成下一个当前色调的颜色
  generateNextColor4CurrentTheme(index: number) {
    const realIndex = index % this.currentThemeColor.length;
    const targetColor = this.currentThemeColor[realIndex];
    return color(targetColor).object() as ComponentData.TColorConfig;
  }
}

export default new ThemeUtil();
