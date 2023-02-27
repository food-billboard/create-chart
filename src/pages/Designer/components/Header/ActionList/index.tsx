import { useState, useCallback, useEffect } from 'react';
import {
  SearchOutlined,
  FileSearchOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import EventEmitter from 'eventemitter3';
import classnames from 'classnames';
import { Select, Space, Button } from 'antd';
import {
  ID_PATH_MAP_EVENT_EMITTER,
  useIdPathMap,
} from '@/hooks/useComponentsPath';
import { useMobxContext } from '@/hooks';
import IconFont from '@/components/ChartComponents/Common/Icon';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import Tooltip from '@/components/Tooltip';
import { sleep } from '@/utils';
import styles from './index.less';

export const ComponentSearchConfigEventEmitter = new EventEmitter();

export const EVENT_NAME = {
  COMPONENT_SEARCH: 'COMPONENT_SEARCH',
  COMPONENT_SEARCH_VISIBLE: 'COMPONENT_SEARCH_VISIBLE',
  LAYER_SEARCH: 'LAYER_SEARCH',
};

// 组件搜索
export const ComponentSearch = () => {
  const {
    local: { componentCollapse, setLocalConfig },
  } = useMobxContext();

  const [visible, setVisible] = useState(false);

  const handleClick = useCallback(() => {
    if (componentCollapse)
      setLocalConfig({
        componentCollapse: !componentCollapse,
      });
    setVisible((prev) => !prev);
    ComponentSearchConfigEventEmitter.emit(EVENT_NAME.COMPONENT_SEARCH_VISIBLE);
  }, [componentCollapse, setLocalConfig]);

  return (
    <div
      className={classnames(styles['design-header-action-component-search'])}
    >
      <Tooltip title={'组件搜索'} placement="top">
        <Button
          icon={<SearchOutlined />}
          onClick={handleClick}
          type={visible ? 'primary' : 'default'}
        />
      </Tooltip>
    </div>
  );
};

// 图层显示隐藏
export const LayerShowIcon = (props: {}) => {
  const [visible, setVisible] = useState(false);

  const handleOpen = useCallback(() => {
    GLOBAL_EVENT_EMITTER.emit(
      EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE,
      !visible,
      'LayerShowIcon',
    );
    setVisible(!visible);
  }, [visible]);

  const onLayerChange = useCallback((visible, target) => {
    if (target !== 'LayerShowIcon') setVisible(visible);
  }, []);

  useEffect(() => {
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE,
      onLayerChange,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE,
        onLayerChange,
      );
    };
  }, [onLayerChange]);

  return (
    <Tooltip title="图层">
      <Button
        title="图层"
        icon={<BlockOutlined />}
        type={visible ? 'primary' : 'default'}
        onClick={handleOpen}
      ></Button>
    </Tooltip>
  );
};

// 图层搜索
export const LayerSearch = () => {
  const {
    global: { setSelect },
  } = useMobxContext();

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
        <Button
          icon={<FileSearchOutlined />}
          onClick={handleClick}
          type={visible ? 'primary' : 'default'}
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

// 折叠右侧配置列表
export const CollapseConfigPanel = () => {
  const {
    local: { componentConfigCollapse, setLocalConfig },
  } = useMobxContext();

  const handleClick = useCallback(() => {
    setLocalConfig({
      componentConfigCollapse: !componentConfigCollapse,
    });
  }, [componentConfigCollapse, setLocalConfig]);

  return (
    <Tooltip title="折叠组件配置">
      <Button
        icon={<IconFont title="折叠组件配置" type="icon-shangpinliebiao" />}
        onClick={handleClick}
        type={componentConfigCollapse ? 'default' : 'primary'}
      />
    </Tooltip>
  );
};

// 组件列表折叠
export const ComponentListCollapse = () => {
  const {
    local: { componentCollapse, setLocalConfig },
  } = useMobxContext();

  const handleClick = useCallback(() => {
    setLocalConfig({
      componentCollapse: !componentCollapse,
    });
  }, [componentCollapse, setLocalConfig]);

  return (
    <Tooltip title="折叠组件列表">
      <Button
        icon={<IconFont title="折叠组件列表" type="icon-userConfig" />}
        onClick={handleClick}
        type={componentCollapse ? 'default' : 'primary'}
      />
    </Tooltip>
  );
};

const ActionList = () => {
  return (
    <Space className={styles['design-header-action']}>
      <ComponentSearch />
      <LayerSearch />
      <ComponentListCollapse />
      <CollapseConfigPanel />
      <LayerShowIcon />
    </Space>
  );
};

export default ActionList;
