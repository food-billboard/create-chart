import { useRef } from 'react';
import classnames from 'classnames';
import { usePanelFocus } from '@/hooks';
import ToolBar from './components/ToolBar';
import ComponentTypeList from './components/ComponentTypeList';
import styles from './index.less';

const LeftContent = () => {
  const ref = useRef<HTMLDivElement>(null);

  usePanelFocus(ref);

  return (
    <div
      ref={ref}
      className={classnames(styles['design-page-left'], 'p-lr-24', 'dis-flex')}
    >
      <ToolBar />
      <ComponentTypeList />
    </div>
  );
};

export default LeftContent;
