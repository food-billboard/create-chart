import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TFullScreenConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TFullScreenConfig> =
    {
      interactive: {
        base: [],
        linkage: [],
      },
      data: {
        request: {},
        filter: {
          map: [],
        },
        disabled: true,
      },
      options: {
        backgroundColor: {
          ...ThemeUtil.generateNextColor4CurrentTheme(0),
          a: 0.2,
        },
        borderRadius: 50,
        icon: {
          enter:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAJFBMVEVHcEz///////////////////////////////////////////8Uel1nAAAAC3RSTlMAQIDAEtJhnvAwsOTI6CEAAATnSURBVHja7ZzPTxNBFIC3WHYpvUA00cilVD1xIfakXGpMxcAFyMbE9LIxmJjspYlojFyIISbYC3owJL0QPXKhYH9I/znBUtjZfW/ee7MLB513tLP7zbfDzu6+N6Pj2LBhw8a/FLnpUdzSNfs6ajVFnzL/boDHC/ywD5LD3gx0sYFB9rSH+WrjgrbxoIcwCk3tYcdq6xt6yAC54LLDikTrfRjSIg5rKK1niNaHMGSOOGxeBPkNQzZFkGWidRuGLIggxauBqGMycTWQ0nWYyC7XrywGnoJswZAwU0gJhixnCelXYYiXJaSLzfT17CD9AJvqn2YG6WzgD7vXKSCr05HQPlIL0ZZ3RJCe0WtBYoiIy9UwgdSEY3JSzUCEHHg/AxES0qmmF6H/hP30IjREqgLd/fTN6KcWYUBkKuA0xphW/LQiHIhEBZ6POROkn1IEg/TMVBSRfgi/3V5A2qGRiiKyM0O8ErVdExVVZHeOgjgmKqqIQ0MMVGIiDIiByp4qwoGIVZSPurMDGBCxyl68PQciVEmIsCDJrslEeJBk30QiPIhIBWjLgwhUoKY8iEAFasmEsFXAhkxI4iaWiLAhSg9PpyOJCBvCVIHHjg1hqSBDR0GO4E5uS0QEEMYfmPIciTThQ9RulsiPX98xgSgq29RnfNRVAFFUulROzXfMINFL3iPyN8qgSSDRl5BjAuI7ppCICgipI399CGQcTmzVuJfLdxiQSTixdamiH/jYbdSC88Iu8v1e02bVWsgTZ5ST7sPm8ZzThQp4M04i88HoDosnFZeG//wSectFppUmUi8Y3mH9RPL99lmf16rI9LSjmyB7cKGkc5/9CfV3fjpGHsCFuiZ3KInF5uALWuVxD7TZMEFoy01PbGHOhg0bNmzYsGHDhg0bNmzY+M8i/6q8jv/6rDybBeNsodgj7Nebpz9+qqaGDFfuBPCPY3D+Co27TTAV5WrXXm1i5YJvlUrlfeJkS0gNI9QtTs1hlY/h2XpxCpIedOE1AucxjlQ+RklFHzlZAxaB142GSBHHg5PJSMr2skB7hA9JUuWiUFAFxWMJ0MtS8wkEWUDqUSGRRu/CInAavYnUo0S5+kjNnDBRVSSQaMkcHJMDpLQmgYTUquQQqRIKIErtfwWCPEeqhAJISC5HH4u2+MyHdOEzHOnmrvMI2JA2fIIGDKnBC1jZEI+z9jIPq7AhHJFYV7pSCEsEGxUuhCeCqDAhXBFYhQnhisAqPAhfBFThQfgioAoLIhGBVFgQiQikwoF4nNXuOhUOBJn2+CoMiFQk2Ssakj8QiiS7RUNqYpGECglRl8sGPEhMhYSYiMRVSIiJSFyFgvSNRGIqC5KNRwEf4pnubhKIIHuQGJBAAvHofX3FtCKwyjwJCWQQzwQiFAH3HZKQQApx5RCxCLT/jIIEcogrhRiIACoEJDCBuDKIkUhSRQ9ZK89O8/Zi5yJ7wcoPUuydW9Ukl7LbBYi+e41luNWwJ7jLzXdmTiGfc80sIftGV0sIOYQh4yLIDNEa2YtdFEGoba9tM0hD1NoQUroOyL5oTNpZjAkFQfZiT4ggLaL1CgyZFEEmBkaTlysaeOLWxfZiO3X9cVUw8S0bd+p/xIg/+hZ1jTu7GKSg61xyC/f3j+VR/Kyo8VjzwM+9rcTjx/As9x6u2zKaDRs2bBDxB7V063rUFD+5AAAAAElFTkSuQmCC',
          quit: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAIVBMVEVHcEz///////////////////////////////////////+PBM77AAAACnRSTlMAQMYTgO2gYjBQOyyldgAABNdJREFUeNrtm79vEzEUxy9NyQ+mVCBAnUILVZUprShDJwSHUDuBEBAyRapQpUxB/BDKVCEqpE4dYGEKKUmL/0ra/Dzb7929r3OpQPiNztkffy53Pt87Owh8+PDhY05xPXyXXmOF90+qdmn2sVJqLy1GpqJU79gqPjxnqF7LPn4jDHdKXGPZm2H4luhy86K1vvlDoX5RrE6twz8PyhnFLN1YsDmopMp0sTJV8kN474CEfBhWWjXZlWF53yjfHUFMla1R+XNSZPRjl+mxMhTr4/IGcXKJTg0ip0j/sYjZWGFcbLY2Lu5RkCt0YxMR9VQ/9ZNyvUJmUkxBrpKNTUVURzt8UdEqQkiHFlFnnImm4gCJiBgmGUWrOEAiIsZ/Mr26dBUcEhXhLlVDBYdERVSJvumMDsAQTcS8SYuKVIEhmog1TLRJlXjItgXRROwBL0+qxEOWLYgmUrNrkCogJEGEURFCykIRWgWD6JdWlaqiqYwOwSCayCr9MG3bx0AQgQipAkEkIpQKAhGJUCoIRCZCqACQQl0kQqgUuAHVhhwKRQgVMUQsMpnLTQ8VQ+Qi9rFSCCBiW0shiIilIoRAIpaKEIKJmCoyyDomYqrIIC9AEUNFBlGgiKGCQ0QijIoUIhNhVKQQoQitIoRIRWgVIUQsQqrIIHIRUkUGAUQoFREEEaFURBBIhFCRQPpoKqnuAGkkt1sMw5VpuEAi1VfWdqpJj/cZxq5JvAqYFFWaEOLs5VXqkF9Wha30IaoaO61LCfLArFCZA8RMDwb1OUA6ZgWFnt/oe3xaEOr2PUobcimni4L8QCEuV1cbvbqaczhdDbRC4HB1WZn/hfjj45PPdHTtlHj8n0I+WBPqEKn3+7Ei9Awhtg45q/gyfaqFZnCzkK/WkZNG7hz4j2s+fPjw4cOHDx8+fPjw4cPHPx4bS+eRwit+9qKdW/RPb/gMRu9RANfpHhMVYjNk1HrSpDpEPiYhjf6TYhTRXP0WmrsKIusg6fiNmTN54SO0Y5U5ZFOtCi5p9F20zjySzzCkehkQ6ura/itP1zy+n1jj4DzS6PA17wCxs+IL6UPsDHehnjqEGLk304a8pq76G3fThHT3q8nP0CYO6aGP7pyLSQ2ENF0goErO7T+pzSYig0AqOderqzaTiBACqOTc75PaLCJSiFglN8sd/2wGEfmw0nIXkUNO3UWAAbKFivRlkDVURRNpCJeNNjGVnN4pISSHqRh9ki7lhVTMLvFzKB0CqZg9Eq9GB1TMDmXFEEDF7A+wrl6sYnUHgIhVrN4g2xCEKptWZxCITEVfvNFCITIVWwSDSFQIEXC7jkCFEAEhySqUCLqFKlGFEkEhSSr6ZrESBukEMhV6sxgKyceqMLve0F2AerKpFTdqTaeB8H7GfFzCa5meBeLbP6MqvSqf7orMZ3FInj9fWWY667Alt80uHywyE3MHSJ5dCLnIzMtdtklHVE44iPaGIYSUmeTvCXO69BeMyX+FbF1vM6cry70qVUTrIEtMHrtMN2a+KY3vnzNy4K7TPWgzt/wy886Xj30EjTYr7DGVerS5/cr3fVB+m3mYPqRX6beZBP9wkF63G/oWhuEndoKTWVq6FnBfFyz9xTq/OhSPQ+Z1+15FvSyl9lXpo1L7/tuaDx8+fPxH8QclwFwCsbIM8QAAAABJRU5ErkJggg==',
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TFullScreenConfig> =
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
          height: 200,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[]) => {
    return {
      backgroundColor: {
        ...ThemeUtil.generateNextColor4CurrentTheme(0),
        a: 0.2,
      },
    };
  },
};
