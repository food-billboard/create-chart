import { useEffect } from 'react';
import { useHashChangeReload, useMobxContext } from '@/hooks';
import FetchScreenComponent from '../Designer/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import useWrapperProps from '../Share/useWrapperProps';
import PainterWrapper from '../Share/components/PainterWrapper';
import WaterMark from '../Share/components/WaterMark';

function Viewer() {
  const {
    global: {
      setScreenType,
      setScale,
      screenData: {
        config: {
          style: { width, height },
          flag: { type: flag },
          attr: { scale: scaleConfig },
        },
      },
    },
  } = useMobxContext();

  const { scale, ...wrapperProps } = useWrapperProps({
    containerWidth: width,
    containerHeight: height,
    setScale,
    flag,
    scale: scaleConfig,
  });

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  useHashChangeReload(() => {});

  return (
    <PainterWrapper scale={scale}>
      <NormalPainter {...wrapperProps} />
      <FetchScreenComponent />
      <WaterMark />
    </PainterWrapper>
  );
}

export default Viewer;
