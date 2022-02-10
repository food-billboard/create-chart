import { useMemo } from 'react';
import json5 from 'json5';

export const useResponseData = (
  value: ComponentData.TComponentApiDataConfig,
) => {
  const {
    request: { value: responseData, valueType },
  } = value;

  const responseStringData = useMemo(() => {
    try {
      if (!responseData) {
        if (valueType === 'array') {
          return `
            [

            ]
          `;
        } else {
          return `
            {

            }
          `;
        }
      }
      if (typeof responseData === 'string') return responseData;
      return json5.stringify(responseData);
    } catch (err) {
      return `
        {

        }
      `;
    }
  }, [responseData, valueType]);

  return responseStringData;
};
