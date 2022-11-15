import classnames from 'classnames';
import { connect } from 'dva';
import Scale from './components/Scale';
import PanelThumb from './components/PanelThumb';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const ToolBar = (props: { flag: ComponentData.ScreenFlagType }) => {
  const { flag } = props;

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

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
