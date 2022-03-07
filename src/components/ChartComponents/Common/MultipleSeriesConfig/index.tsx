import { useCallback, useState } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

const MultipleSeriesConfig = (props: {}) => {
  const [activeKey, setActiveKey] = useState<string>('');

  const onChange = useCallback(() => {}, []);

  const onEdit = useCallback((targetKey, action) => {}, []);

  const add = useCallback(() => {
    // const { panes } = this.state;
    // const activeKey = `newTab${this.newTabIndex++}`;
    // const newPanes = [...panes];
    // newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    // this.setState({
    //   panes: newPanes,
    //   activeKey,
    // });
  }, []);

  const remove = useCallback((targetKey) => {
    // const { panes, activeKey } = this.state;
    // let newActiveKey = activeKey;
    // let lastIndex;
    // panes.forEach((pane, i) => {
    //   if (pane.key === targetKey) {
    //     lastIndex = i - 1;
    //   }
    // });
    // const newPanes = panes.filter(pane => pane.key !== targetKey);
    // if (newPanes.length && newActiveKey === targetKey) {
    //   if (lastIndex >= 0) {
    //     newActiveKey = newPanes[lastIndex].key;
    //   } else {
    //     newActiveKey = newPanes[0].key;
    //   }
    // }
    // this.setState({
    //   panes: newPanes,
    //   activeKey: newActiveKey,
    // });
  }, []);

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
    >
      {/* {panes.map(pane => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))} */}
    </Tabs>
  );
};

export default MultipleSeriesConfig;
