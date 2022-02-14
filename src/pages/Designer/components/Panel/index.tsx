import classnames from 'classnames';
import ReactSelecto from './components/ReactSelecto';
import PanelWrapper from './components/PanelWrapper';
import ToolBar from './components/ToolBar';
import Painter from './components/Painter';
import styles from './index.less';

const Panel = () => {
  return (
    <div
      className={classnames(styles['design-panel-content'], 'dis-flex-column')}
    >
      <PanelWrapper>
        <ReactSelecto />
        <Painter />
      </PanelWrapper>
      <ToolBar />
    </div>
  );
};

export default Panel;
