import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_X_AXIS_CONFIG,
  DEFAULT_Y_AXIS_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { getDate, getNumberValue } from '@/utils/constants';
import { TPictorialBarBasicConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(4);
const DEFAULT_DATE_VALUE = getNumberValue(10, 0, 200);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPictorialBarBasicConfig> =
    {
      interactive: {
        base: [
          {
            type: 'click',
            name: '当点击项时',
            show: false,
            fields: [
              {
                key: 'name',
                variable: '',
                description: '数据名',
              },
              {
                key: 'value',
                variable: '',
                description: '数据值',
              },
            ],
          },
        ],
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
              description: '数据名',
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
        condition: [DEFAULT_CONDITION_CONFIG()],
        xAxis: {
          ...omit(DEFAULT_X_AXIS_CONFIG, ['position']),
          max: 200,
        },
        yAxis: DEFAULT_Y_AXIS_CONFIG,
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG,
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          spirit: {
            show: false,
            value: '',
          },
          symbol: 'arrow',
          symbolSize: [20, 20],
          symbolRotate: 0,
          symbolRepeat: true,
          symbolMargin: 10,
          symbolRepeatDirection: 'start',
          symbolColor: ThemeUtil.generateNextColor4CurrentTheme(0),
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPictorialBarBasicConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 500,
          height: 300,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};
