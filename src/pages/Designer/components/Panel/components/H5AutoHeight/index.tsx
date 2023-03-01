import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import { MOBILE_HEIGHT } from '@/utils/constants';

const H5AutoHeight = () => {
  const {
    global: {
      screenData: {
        config: {
          style: { height },
          flag: { type },
        },
      },
      setScreen: setScreenData,
      screenType,
      components,
    },
  } = useMobxContext();

  const componentsHeight = useMemo(() => {
    return components.reduce((acc, cur) => {
      const {
        config: {
          style: { height },
        },
      } = cur;
      acc += height;
      return acc;
    }, 0);
  }, [components]);

  useEffect(() => {
    if (
      screenType !== 'preview' &&
      height - componentsHeight < MOBILE_HEIGHT / 2 &&
      type === 'H5'
    ) {
      setScreenData(
        {
          config: {
            style: {
              height: height + MOBILE_HEIGHT,
            },
          },
        },
        true,
      );
    }
  }, [componentsHeight, height, type, screenType]);

  return <></>;
};

export default observer(H5AutoHeight);
