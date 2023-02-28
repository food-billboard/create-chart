import moment from 'moment';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TDatePickerConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TDatePickerConfig> =
    {
      interactive: {
        base: [
          {
            type: 'change',
            name: '当状态改变时',
            show: false,
            fields: [
              {
                key: 'value',
                variable: '',
                description: '状态',
              },
            ],
          },
        ],
      },
      data: {
        request: {},
        filter: {
          map: [],
        },
        disabled: true,
      },
      options: {
        defaultDate: moment().format('YYYY-MM-DD'),
        mode: 'date',
        format: 'YYYY-MM-DD',
        filterDate: 'return false',
        filterTime: 'return false',
        arrow: {
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
          active: {
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
        },
        input: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
          },
          activeBorderColor: ThemeUtil.generateNextColor4CurrentTheme(0),
          borderColor: {
            r: 67,
            g: 67,
            b: 67,
          },
        },
        confirmBtn: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
          },
        },
        yearAndMonthAndTime: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
          },
        },
        week: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
          },
        },
        dateAndTime: {
          borderRadius: 4,
          backgroundColor: {
            r: 255,
            g: 255,
            b: 255,
            a: 0,
          },
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
          prevAndNext: {
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              color: {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: 0.45,
              },
            },
            backgroundColor: {
              r: 240,
              g: 240,
              b: 240,
              a: 0,
            },
          },
          hover: {
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              color: ThemeUtil.generateNextColor4CurrentTheme(0),
            },
            backgroundColor: {
              r: 240,
              g: 240,
              b: 240,
            },
          },
          active: {
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              color: {
                r: 255,
                g: 255,
                b: 255,
              },
            },
            backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
          disabled: {
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              color: {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: 0.25,
              },
            },
            backgroundColor: {
              r: 240,
              g: 240,
              b: 240,
            },
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TDatePickerConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 200,
          height: 50,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[], options: TDatePickerConfig) => {
    return {
      arrow: {
        color: ThemeUtil.generateNextColor4CurrentTheme(0),
        active: {
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
        },
      },
      input: {
        activeBorderColor: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
      dateAndTime: {
        textStyle: {
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
        },
        prevAndNext: {
          textStyle: {
            color: {
              ...ThemeUtil.generateNextColor4CurrentTheme(0),
              a: options.dateAndTime.prevAndNext.textStyle.color.a,
            },
          },
        },
        hover: {
          textStyle: {
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
        },
        active: {
          backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
        },
        disabled: {
          textStyle: {
            color: {
              ...ThemeUtil.generateNextColor4CurrentTheme(0),
              a: options.dateAndTime.disabled.textStyle.color.a,
            },
          },
        },
      },
    };
  },
};
