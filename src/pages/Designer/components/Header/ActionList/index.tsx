import { Space } from 'antd';
import { UndoIcon, RedoIcon } from './components/ActionUndoAndRedo';
import CallbackManage from './components/CallbackManage';
import CollapseConfigPanel from './components/CollapseConfigPanel';
import ComponentListCollapse from './components/ComponentListCollapse';
import ComponentSearch from './components/ComponentSearch';
import ConstantManage from './components/ConstantManage';
import DebugConfig from './components/DebugConfig';
import LayerSearch from './components/LayerSearch';
import LayerShowIcon from './components/LayerShowControl';
import LensManage from './components/LensConfig';
import LocalConfigManage from './components/LocalConfigMange';
import RequestDefaultConfig from './components/RequestDefaultConfig';
import ThemeConfig from './components/ThemeConfig';
import styles from './index.less';

const ActionList = () => {
  return (
    <Space className={styles['design-header-action']}>
      <UndoIcon />
      <RedoIcon />
      <DebugConfig />
      <ComponentSearch />
      <LayerSearch />
      <ComponentListCollapse />
      <CollapseConfigPanel />
      <LayerShowIcon />
      <CallbackManage />
      <ConstantManage />
      <LocalConfigManage />
      <RequestDefaultConfig />
      <LensManage />
      <ThemeConfig />
    </Space>
  );
};

export default ActionList;
