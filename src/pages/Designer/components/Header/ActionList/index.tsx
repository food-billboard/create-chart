import { useState, useCallback, useEffect } from 'react';
import {
  SearchOutlined,
  FileSearchOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import EventEmitter from 'eventemitter3';
import classnames from 'classnames';
import { Select, Space, Button } from 'antd';
import { connect } from 'dva';
import {
  ID_PATH_MAP_EVENT_EMITTER,
  useIdPathMap,
} from '@/hooks/useComponentsPath';
import IconFont from '@/components/ChartComponents/Common/Icon';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import { ConnectState, ILocalModelState } from '@/models/connect';
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
const InternalComponentSearch = (props: {
  componentCollapse: boolean;
  setLocalConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { componentCollapse, setLocalConfig } = props;

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

export const ComponentSearch = connect(
  (state: ConnectState) => {
    return {
      componentCollapse: state.local.componentCollapse,
    };
  },
  (dispatch: any) => ({
    setLocalConfig: (value: any) =>
      dispatch({ type: 'local/setLocalConfig', value }),
  }),
)(InternalComponentSearch);

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

// 折叠右侧配置列表
const InternalCollapseConfigPanel = (props: {
  componentConfigCollapse: boolean;
  setLocalConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { componentConfigCollapse, setLocalConfig } = props;

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

export const CollapseConfigPanel = connect(
  (state: ConnectState) => {
    return {
      componentConfigCollapse: state.local.componentConfigCollapse,
    };
  },
  (dispatch: any) => ({
    setLocalConfig: (value: any) =>
      dispatch({ type: 'local/setLocalConfig', value }),
  }),
)(InternalCollapseConfigPanel);

// 组件列表折叠
const InternalComponentListCollapse = (props: {
  componentCollapse: boolean;
  setLocalConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { componentCollapse, setLocalConfig } = props;

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

export const ComponentListCollapse = connect(
  (state: ConnectState) => {
    return {
      componentCollapse: state.local.componentCollapse,
    };
  },
  (dispatch: any) => ({
    setLocalConfig: (value: any) =>
      dispatch({ type: 'local/setLocalConfig', value }),
  }),
)(InternalComponentListCollapse);

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
