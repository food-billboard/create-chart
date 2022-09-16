import { useState, useCallback, useMemo } from 'react';
import { SearchOutlined, FileSearchOutlined } from '@ant-design/icons';
import EventEmitter from 'eventemitter3';
import classnames from 'classnames';
import { Select, Space, Tooltip } from 'antd';
import styles from './index.less';

export const ComponentSearchConfigEventEmitter = new EventEmitter();

export const EVENT_NAME = {
  COMPONENT_SEARCH: 'COMPONENT_SEARCH',
  COMPONENT_SEARCH_VISIBLE: 'COMPONENT_SEARCH_VISIBLE',
  LAYER_SEARCH: 'LAYER_SEARCH',
};

const ComponentSearch = () => {
  const handleClick = useCallback(() => {
    ComponentSearchConfigEventEmitter.emit(EVENT_NAME.COMPONENT_SEARCH_VISIBLE);
  }, []);

  return (
    <div
      className={classnames(styles['design-header-action-component-search'])}
    >
      <Tooltip title={'组件搜索'} placement="top">
        <SearchOutlined
          type="icon-iconlvjingkua"
          className={classnames('c-po m-r-4')}
          onClick={handleClick}
        />
      </Tooltip>
    </div>
  );
};

const LayerSearch = () => {
  return (
    <div>
      <FileSearchOutlined />
    </div>
  );
};

const ActionList = () => {
  return (
    <Space className={styles['design-header-action']}>
      <ComponentSearch />
      <LayerSearch />
    </Space>
  );
};

export default ActionList;
