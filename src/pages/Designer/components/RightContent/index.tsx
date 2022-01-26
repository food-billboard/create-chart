import { useRef } from 'react';
import { Input } from 'antd';
import classnames from 'classnames';
import { usePanelFocus } from '@/hooks';
import styles from './index.less';

const RightContent = () => {
  const ref = useRef<HTMLDivElement>(null);

  usePanelFocus(ref);

  return (
    <div className={classnames(styles['design-page-right'], 'p-lr-24')}>
      <div
        style={{
          height: 600,
          width: '100%',
        }}
        ref={ref}
      >
        <Input />
      </div>
    </div>
  );
};

export default RightContent;
