import classnames from 'classnames';
import { useMobxContext } from '@/hooks';
import Scale from './components/Scale';
import PanelThumb from './components/PanelThumb';
import styles from './index.less';

const ToolBar = () => {
  const {
    global: {
      screenData: {
        config: {
          flag: { type: flag },
        },
      },
    },
  } = useMobxContext();

  return (
    <div
      className={classnames(
        styles['design-page-toolbar'],
        'ali-r',
        'normal-background',
      )}
    >
      {flag === 'PC' && <PanelThumb />}
      <Scale />
    </div>
  );
};

export default ToolBar;
