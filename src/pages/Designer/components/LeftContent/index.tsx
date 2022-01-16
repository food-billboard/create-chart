import { useState } from 'react';
import classnames from 'classnames';
import ToolBar from './components/ToolBar';
import ComponentTypeList from './components/ComponentTypeList';
import styles from './index.less';

const LeftContent = () => {
  const [] = useState<string>();

  return (
    <div
      className={classnames(styles['design-page-left'], 'p-lr-24', 'dis-flex')}
    >
      <ToolBar />
      <ComponentTypeList />
    </div>
  );
};

export default LeftContent;
