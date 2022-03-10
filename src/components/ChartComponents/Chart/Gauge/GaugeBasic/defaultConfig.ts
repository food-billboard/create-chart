import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getName, getNumberValue } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TGaugeBasicConfig } from './type';

const DEFAULT_NAME_LABEL = getName(5);
const DEFAULT_DATE_VALUE = getNumberValue(5);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
  };
});

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TGaugeBasicConfig> =
  {
    interactive: {
      base: [],
    },
    data: {
      request: {
        value: DEFAULT_VALUE,
      },
      filter: {
        map: [
          {
            field: 'name',
            map: '',
            description: '数据项',
            id: 'name',
            type: 'string',
          },
          {
            field: 'value',
            map: '',
            description: '数据值',
            id: 'value',
            type: 'number',
          },
        ],
      },
    },
    options: {
      animation: {
        ...DEFAULT_ANIMATION_CONFIG,
        animationDuration: 2000,
        animationEasing: 'quadraticInOut',
      },
      series: {
        min: 0,
        max: 100,
        splitNumber: 10,
        center: [50, 50],
        radius: 75,
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 10,
          },
        },
        progress: {
          show: false,
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
          width: 10,
        },
        splitLine: {
          show: true,
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
          width: 3,
          length: 10,
        },
        axisTick: {
          show: true,
          splitNumber: 5,
          length: 6,
          lineStyle: {
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          show: true,
          distance: 15,
          ...DEFAULT_FONT_CONFIG,
        },
        pointer: {
          show: true,
          length: 60,
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
          width: 6,
        },
        title: {
          show: true,
          offsetCenter: [0, 20],
          ...DEFAULT_FONT_CONFIG,
        },
        detail: {
          show: false,
          animation: false,
          ...DEFAULT_FONT_CONFIG,
        },
      },
    },
  };

const DefaultConfig: ComponentData.TComponentData<TGaugeBasicConfig> =
  mergeWithoutArray(
    {},
    {
      data: BASIC_DEFAULT_DATA_CONFIG,
      interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
    },
    BASIC_DEFAULT_CONFIG,
    {
      style: {
        width: 400,
        height: 400,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
