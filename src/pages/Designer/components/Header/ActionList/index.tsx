import { Space } from 'antd';
import ComponentListCollapse from './components/ComponentListCollapse';
import ComponentSearch from './components/ComponentSearch';
import LayerSearch from './components/LayerSearch';
import CollapseConfigPanel from './components/CollapseConfigPanel';
import LayerShowIcon from './components/LayerShowControl';
import DebugConfig from './components/DebugConfig';
import styles from './index.less';

const ActionList = () => {
  return (
    <Space className={styles['design-header-action']}>
      <DebugConfig />
      <ComponentSearch />
      <LayerSearch />
      <ComponentListCollapse />
      <CollapseConfigPanel />
      <LayerShowIcon />
    </Space>
  );
};

export default ActionList;
