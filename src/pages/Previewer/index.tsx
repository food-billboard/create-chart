import { useEffect } from 'react';
import { connect } from 'dva';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

function Previewer(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
}) {
  const { setScreenType } = props;

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  return <NormalPainter className={styles['page-preview']} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(Previewer);
