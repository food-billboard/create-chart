import { useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { useKeyPress } from 'ahooks';
import { Tabs, Button, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
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
  const [currentTab, setCurrentTab] = useState('request');

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
          defaultActiveKey="request"
          onChange={setCurrentTab}
          items={[
            {
              key: 'request',
              label: 'request',
            },
          ].map((item) => {
            return {
              ...item,
              children: (
                <div
                  className={classnames(styles['logger-window-main'], 'p-4')}
                >
                  <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                  >
                    {dataSource}
                  </Collapse>
                </div>
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
