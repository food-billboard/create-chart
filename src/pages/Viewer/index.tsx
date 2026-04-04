import { useEffect } from 'react';
import { connect } from 'umi';
import { useHashChangeReload } from '@/hooks';
import FetchScreenComponent from '../Designer/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import PainterWrapper from '../Share/components/PainterWrapper';
import useWrapperProps from '../Share/useWrapperProps';
import { mapDispatchToProps, mapStateToProps } from './connect';

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

  useHashChangeReload(() => {});

  return (
    <PainterWrapper scale={scale}>
      <NormalPainter {...wrapperProps} />
      <FetchScreenComponent screenType="preview" />
    </PainterWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
