import { CSSProperties } from 'react';
import classnames from 'classnames';
import ReactSelecto from './components/ReactSelecto';
import PanelWrapper from './components/PanelWrapper';
import ToolBar from './components/ToolBar';
import Painter from './components/Painter';
import styles from './index.less';

const Panel = (props: { style?: CSSProperties; className?: string }) => {
  const { style, className } = props;

  return (
    <div
      className={classnames(
        styles['design-panel-content'],
        'dis-flex-column',
        className,
      )}
      style={style}
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
