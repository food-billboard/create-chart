import { useEffect } from 'react';
import { connect } from 'dva';
import FetchScreenComponent from '@/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import useResize from '../Share/useResize';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

function Viewer(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  width: number;
  height: number;
  setScale: (value: number) => void;
}) {
  const { setScreenType, width, height, setScale } = props;

  const scale = useResize(width, height, setScale);

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  return (
    <>
      <NormalPainter
        className={styles['page-viewer']}
        style={{
          transform: `scale(${scale}) translateX(-50%)`,
        }}
      />
      <FetchScreenComponent />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
