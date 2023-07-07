import { useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { useKeyPress } from 'ahooks';
import { Tabs, Button } from 'antd';
import classnames from 'classnames';
import type { WinBoxRef } from '@/components/Winbox';
import LazyLoadWrapper from '@/components/LazyLoad';
import Logger from '../index';
import styles from './index.less';

const WinBox = LazyLoadWrapper<any, WinBoxRef>(() => {
  return import(/* webpackChunkName: "WinBox" */ '@/components/Winbox');
});

const WindowBoxWrapper = () => {
  const [dataSource, setDataSource] = useState<ReactNode>([]);
  const [currentTab, setCurrentTab] = useState('0');

  const boxRef = useRef<WinBoxRef>(null);

  const create = useCallback(() => {
    boxRef.current?.open();
  }, []);

  const handleClear = useCallback(() => {
    setDataSource([]);
    Logger.clearLog(currentTab);
  }, [currentTab]);

  useKeyPress(['ctrl.t'], create);

  useEffect(() => {
    const fetchData = () => {
      setDataSource(Logger.getLog(currentTab));
    };
    if (!!~currentTab) fetchData();
  }, [currentTab]);

  return (
    <WinBox
      wrapperComponentRef={boxRef}
      widthRate={[0.4, 0.7]}
      heightRate={[0.4, 0.7]}
    >
      <div
        className={classnames(styles['logger-window'], 'p-4 dis-flex h-100')}
      >
        <Tabs
          defaultActiveKey="0"
          onChange={setCurrentTab}
          items={[
            {
              key: '0',
              label: 'request',
            },
          ].map((item) => {
            return {
              ...item,
              children: (
                <div className={styles['logger-window-main']}>{dataSource}</div>
              ),
            };
          })}
        />
        <div className={styles['logger-window-footer']}>
          <Button onClick={handleClear}>清空</Button>
        </div>
      </div>
    </WinBox>
  );
};

export default WindowBoxWrapper;
