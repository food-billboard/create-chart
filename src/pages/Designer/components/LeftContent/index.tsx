import { useRef } from 'react';
import classnames from 'classnames';
import { usePanelFocus, useScrollBar } from '@/hooks';
import ToolBar from './components/ToolBar';
import ComponentTypeList from './components/ComponentTypeList';
import styles from './index.less';

const LeftContent = () => {
  const ref = useRef<HTMLDivElement>(null);

  usePanelFocus(ref);

  useScrollBar('#design-page-left');

  return (
    <div ref={ref} className={classnames(styles['design-page-left'], 'pos-re')}>
      <div
        className={classnames('p-lr-24', 'dis-flex', 'w-100')}
        style={{
          overflow: 'hidden',
          height: '100%',
        }}
        id="design-page-left"
      >
        <ToolBar />
        <ComponentTypeList />
      </div>
    </div>
  );
};

export default LeftContent;
