import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getName } from '@/utils/constants/defaultValue';
import { TCarouselConfig } from './type';

const DEFAULT_VALUE = new Array(3).fill({
  name: getName(1)[0],
  value:
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TCarouselConfig> =
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
              description: '数据项',
              id: 'name',
              type: 'string',
            },
            {
              field: 'value',
              map: '',
              description: '数据值',
              id: 'value',
              type: 'string',
            },
          ],
        },
      },
      options: {
        condition: DEFAULT_CONDITION_CONFIG(),
        speed: 500,
        autoplay: true,
        pauseOnHover: true,
        dot: {
          show: true,
          position: 'bottom',
        },
        // easing: 'linear',
        fade: false,
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TCarouselConfig> =
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
          height: 250,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};
