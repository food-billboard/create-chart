import Select from '@/components/ChartComponents/Common/Select';
import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import { useIdPathMap } from '@/hooks';
import { ConnectState } from '@/models/connect';
import { sleep } from '@/utils';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import { FileSearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'umi';
import styles from './index.less';

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
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_ID_PATH_MAP_CHANGE,
      onComponentsChange,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_ID_PATH_MAP_CHANGE,
        onComponentsChange,
      );
    };
  }, []);

  return (
    <div
      className={classnames(styles['design-header-action-layer-search'], {
        [styles['design-header-action-layer-search-active']]: visible,
      })}
    >
      <Tooltip title="图层搜索">
        <DebounceButton
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
            option?.label?.toString().includes(input) ||
            input.includes(option?.label?.toString() || '')
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
  (dispatch: any) => {
    return {
      setSelect: (value: string[]) =>
        dispatch({ type: 'global/setSelect', value }),
    };
  },
)(_LayerSearch);

export default LayerSearch;
