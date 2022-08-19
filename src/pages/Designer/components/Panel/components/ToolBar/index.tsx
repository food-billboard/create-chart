import classnames from 'classnames';
import Scale from './components/Scale';
import PanelThumb from './components/PanelThumb';
import styles from './index.less';

const ToolBar = () => {
  return (
    <div
      className={classnames(
        styles['design-page-toolbar'],
        'ali-r',
        'normal-background',
      )}
    >
      <PanelThumb />
      <Scale />
    </div>
  );
};

export default ToolBar;
