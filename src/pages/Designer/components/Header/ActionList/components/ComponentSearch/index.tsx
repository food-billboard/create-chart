import { useState, useCallback } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { connect } from 'dva';
import DebounceButton from '@/components/DebounceButton';
import GlobalLoadingActonButton from '@/components/GlobalLoadingActionButton';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import { ConnectState, ILocalModelState } from '@/models/connect';
import Tooltip from '@/components/Tooltip';
import styles from './index.less';

// 组件搜索
const InternalComponentSearch = (props: {
  componentCollapse: boolean;
  setLocalConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { componentCollapse, setLocalConfig } = props;

  const [visible, setVisible] = useState(false);

  const handleClick = useCallback(async () => {
    setLocalConfig({
      componentCollapse: !componentCollapse,
    });
    setVisible((prev) => !prev);
    GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_SEARCH_VISIBLE);
  }, [componentCollapse, setLocalConfig]);

  return (
    <div
      className={classnames(styles['design-header-action-component-search'])}
    >
      <Tooltip title={'组件搜索'} placement="top">
        <GlobalLoadingActonButton
          icon={<SearchOutlined />}
          onClick={handleClick}
          type={visible ? 'primary' : 'default'}
          Component={DebounceButton}
          needLoading={false}
        />
      </Tooltip>
    </div>
  );
};

const ComponentSearch = connect(
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

export default ComponentSearch;
