import classnames from 'classnames';
import Scale from './components/Scale';
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
      <Scale />
    </div>
  );
};

export default ToolBar;
