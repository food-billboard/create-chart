import { useState, useCallback, useEffect, useRef } from 'react';
import { SearchOutlined, FileSearchOutlined } from '@ant-design/icons';
import EventEmitter from 'eventemitter3';
import classnames from 'classnames';
import { Select, Space, Tooltip } from 'antd';
import { connect } from 'dva';
import {
  ID_PATH_MAP_EVENT_EMITTER,
  useIdPathMap,
} from '@/hooks/useComponentsPath';
import { ConnectState } from '@/models/connect';
import { sleep } from '@/utils';
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
        <SearchOutlined className={classnames('c-po')} onClick={handleClick} />
      </Tooltip>
    </div>
  );
};

const _LayerSearch = (props: { setSelect: (value: string[]) => void }) => {
  const { setSelect } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    () => {
      return Object.values(useIdPathMap).map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    },
  );

  const handleClick = useCallback(() => {
    setVisible((prev) => {
      return !prev;
    });
  }, []);

  const onChange = useCallback((value) => {
    setSelect([value]);
  }, []);

  const onComponentsChange = async (value: ReturnType<typeof useIdPathMap>) => {
    await sleep(1000);
    setOptions(
      Object.values(value).map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      }),
    );
  };

  useEffect(() => {
    ID_PATH_MAP_EVENT_EMITTER.addListener('change', onComponentsChange);
    return () => {
      ID_PATH_MAP_EVENT_EMITTER.removeListener('change', onComponentsChange);
    };
  }, []);

  return (
    <div
      className={classnames(styles['design-header-action-layer-search'], {
        [styles['design-header-action-layer-search-active']]: visible,
      })}
    >
      <Tooltip title="图层搜索">
        <FileSearchOutlined
          className={classnames('c-po m-r-4')}
          onClick={handleClick}
        />
      </Tooltip>
      <Select
        showSearch
        onChange={onChange}
        options={options}
        filterOption={(input, option) => {
          if (!input) return true;
          return (
            option?.label.includes(input) || input.includes(option?.label || '')
          );
        }}
      />
    </div>
  );
};

const LayerSearch = connect(
  (state: ConnectState) => {
    return {};
  },
  (dispatch) => {
    return {
      setSelect: (value: string[]) =>
        dispatch({ type: 'global/setSelect', value }),
    };
  },
)(_LayerSearch);

const ActionList = () => {
  return (
    <Space className={styles['design-header-action']}>
      <ComponentSearch />
      <LayerSearch />
    </Space>
  );
};

export default ActionList;
