import classnames from 'classnames';
import { connect } from 'umi';
import PanelThumb from './components/PanelThumb';
import Scale from './components/Scale';
import ShortcutKeys from './components/ShortcutKeys';
import { mapDispatchToProps, mapStateToProps } from './connect';
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
      <ShortcutKeys />
      {flag === 'PC' && <PanelThumb />}
      <Scale />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
