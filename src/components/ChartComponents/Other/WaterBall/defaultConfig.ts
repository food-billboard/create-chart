import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_RADIAL_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TWaterBallConfig } from './type';

export const DEFAULT_DECAL = {
  symbol: 'circle',
  symbolSize: 4,
};

export const DEFAULT_LINE_STYLE = {
  width: 1,
  type: 'solid',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TWaterBallConfig> =
    {
      interactive: {
        base: [
          {
            type: 'click',
            name: '当点击项时',
            show: false,
            fields: [
              {
                key: 'value',
                variable: '',
                description: '值',
              },
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click',
            name: '点击',
          },
        ],
      },
      data: {
        request: {
          value: {
            value: 0.65,
          },
          valueType: 'object',
        },
        filter: {
          map: [
            {
              field: 'value',
              map: '',
              description: '值',
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
          label: {
            ...DEFAULT_FONT_CONFIG,
            fontWeight: 'bolder',
            fontSize: 24,
            show: true,
          },
          amplitude: 20, // 振幅
          waveAnimation: true,
          backgroundStyle: {
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 0.2,
            },
          },
          color: {
            ...DEFAULT_RADIAL_CONFIG,
            start: ThemeUtil.generateNextColor4CurrentTheme(0),
            end: ThemeUtil.generateNextColor4CurrentTheme(1),
          },
          center: [50, 50],
          radius: 80,
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TWaterBallConfig> =
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
