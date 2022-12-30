import { useEffect } from 'react';
import { connect } from 'dva';
import FetchScreenComponent from '../Designer/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import useWrapperProps from '../Share/useWrapperProps';
import PainterWrapper from '../Share/components/PainterWrapper';
import { mapStateToProps, mapDispatchToProps } from './connect';

function Viewer(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  width: number;
  height: number;
  setScale: (value: number) => void;
  flag: ComponentData.ScreenFlagType;
}) {
  const { setScreenType, width, height, setScale, flag } = props;

  const { scale, ...wrapperProps } = useWrapperProps(
    width,
    height,
    setScale,
    flag,
  );

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  return (
    <PainterWrapper scale={scale}>
      <NormalPainter {...wrapperProps} />
      <FetchScreenComponent />
    </PainterWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
