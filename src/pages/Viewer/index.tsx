import { useEffect } from 'react';
import { connect } from 'dva';
import FetchScreenComponent from '../Designer/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import useWrapperProps from '../Share/useWrapperProps';
import PainterWrapper from '../Share/components/PainterWrapper';
import WaterMark from '../Share/components/WaterMark';
import { mapStateToProps, mapDispatchToProps } from './connect';

function Viewer(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  width: number;
  height: number;
  setScale: (value: number) => void;
  flag: ComponentData.ScreenFlagType;
  scale: ComponentData.ScreenScaleType;
}) {
  const {
    setScreenType,
    width,
    height,
    setScale,
    flag,
    scale: scaleConfig,
  } = props;

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

  return (
    <PainterWrapper scale={scale}>
      <NormalPainter {...wrapperProps} />
      <FetchScreenComponent />
      <WaterMark />
    </PainterWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
