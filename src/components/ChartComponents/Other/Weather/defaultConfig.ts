import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TWeatherConfig } from './type';

const DEFAULT_VALUE = {
  city: '杭州',
};

export const KEY_MAP = {
  info: '天气情况',
  temperature: '温度',
  humidity: '湿度',
  direct: '风向',
  power: '风力',
  aqi: '空气质量指数',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TWeatherConfig> =
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
              field: 'city',
              map: '',
              description: '城市',
              id: 'value',
              type: 'string',
            },
          ],
        },
      },
      options: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontSize: 24,
        },
        align: {
          horizontal: 'center',
          vertical: 'center',
        },
        show: ['info', 'temperature'],
        widMap: {
          show: true,
          value: [
            {
              wid: '00',
              weather: '晴',
              icon: 'bi-brightness-high',
            },
            {
              wid: '01',
              weather: '多云',
              icon: 'bi-clouds',
            },
            {
              wid: '02',
              weather: '阴',
              icon: 'bi-cloud-fog',
            },
            {
              wid: '03',
              weather: '阵雨',
              icon: 'bi-lightning',
            },
            {
              wid: '04',
              weather: '雷阵雨',
              icon: 'bi-cloud-lightning-rain',
            },
            {
              wid: '05',
              weather: '雷阵雨伴有冰雹',
            },
            {
              wid: '06',
              weather: '雨夹雪',
              icon: 'bi-cloud-sleet',
            },
            {
              wid: '07',
              weather: '小雨',
              icon: 'bi-cloud-drizzle',
            },
            {
              wid: '08',
              weather: '中雨',
              icon: 'bi-cloud-hail',
            },
            {
              wid: '09',
              weather: '大雨',
              icon: 'bi-cloud-rain-heavy',
            },
            {
              wid: '10',
              weather: '暴雨',
            },
            {
              wid: '11',
              weather: '大暴雨',
            },
            {
              wid: '12',
              weather: '特大暴雨',
            },
            {
              wid: '13',
              weather: '阵雪',
            },
            {
              wid: '14',
              weather: '小雪',
              icon: 'bi-cloud-snow',
            },
            {
              wid: '15',
              weather: '中雪',
            },
            {
              wid: '16',
              weather: '大雪',
            },
            {
              wid: '17',
              weather: '暴雪',
            },
            {
              wid: '18',
              weather: '雾',
            },
            {
              wid: '19',
              weather: '冻雨',
            },
            {
              wid: '20',
              weather: '沙尘暴',
            },
            {
              wid: '21',
              weather: '小到中雨',
            },
            {
              wid: '22',
              weather: '中到大雨',
            },
            {
              wid: '23',
              weather: '大到暴雨',
            },
            {
              wid: '24',
              weather: '暴雨到大暴雨',
            },
            {
              wid: '25',
              weather: '大暴雨到特大暴雨',
            },
            {
              wid: '26',
              weather: '小到中雪',
            },
            {
              wid: '27',
              weather: '中到大雪',
            },
            {
              wid: '28',
              weather: '大到暴雪',
            },
            {
              wid: '29',
              weather: '浮尘',
            },
            {
              wid: '30',
              weather: '扬沙',
            },
            {
              wid: '31',
              weather: '强沙尘暴',
            },
            {
              wid: '53',
              weather: '霾',
            },
          ],
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TWeatherConfig> =
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
          height: 100,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};
