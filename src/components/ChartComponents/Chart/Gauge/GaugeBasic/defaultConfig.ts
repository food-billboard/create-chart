import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getName, getNumberValue } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TGaugeBasicConfig } from './type';

const [DEFAULT_NAME_LABEL] = getName(1);
const [DEFAULT_DATE_VALUE] = getNumberValue(1, 0, 100);

const DEFAULT_VALUE = {
  name: DEFAULT_NAME_LABEL,
  value: DEFAULT_DATE_VALUE,
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TGaugeBasicConfig> =
    {
      interactive: {
        base: [],
      },
      data: {
        request: {
          value: DEFAULT_VALUE,
          valueType: 'object',
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
        condition: DEFAULT_CONDITION_CONFIG(),
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
              color: {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: 0.3,
              },
            },
          },
          progress: {
            show: true,
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
            width: 10,
          },
          splitLine: {
            show: true,
            color: {
              ...ThemeUtil.generateNextColor4CurrentTheme(0),
              a: 0.4,
            },
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
            width: 6,
            itemStyle: {
              color: ThemeUtil.generateNextColor4CurrentTheme(0),
            },
          },
          title: {
            show: false,
            offsetCenter: [0, 20],
            ...DEFAULT_FONT_CONFIG,
          },
          detail: {
            show: false,
            valueAnimation: false,
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
  return DefaultConfig;
};

export const themeConfig = {
  cover: (colorList: string[]) => {},
};
