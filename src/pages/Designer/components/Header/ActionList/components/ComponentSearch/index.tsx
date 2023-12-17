import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { useCallback } from 'react';
import { connect } from 'umi';
import DebounceButton from '@/components/DebounceButton';
import GlobalLoadingActonButton from '@/components/GlobalLoadingActionButton';
import Tooltip from '@/components/Tooltip';
import { ConnectState, ILocalModelState } from '@/models/connect';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import styles from './index.less';

// 组件搜索
const InternalComponentSearch = (props: {
  componentSearchCollapse: boolean;
  setLocalConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { componentSearchCollapse, setLocalConfig } = props;

  const handleClick = useCallback(async () => {
    const newValue = !componentSearchCollapse;
    const newConfig: Partial<ILocalModelState> = {
      componentSearchCollapse: newValue,
    };
    setLocalConfig(newConfig);
    GLOBAL_EVENT_EMITTER.emit(
      EVENT_NAME_MAP.COMPONENT_SEARCH_VISIBLE,
      !newValue,
    );
  }, [componentSearchCollapse, setLocalConfig]);

  return (
    <div
      className={classnames(styles['design-header-action-component-search'])}
    >
      <Tooltip title={'组件搜索'} placement="top">
        <GlobalLoadingActonButton
          icon={<SearchOutlined />}
          onClick={handleClick}
          type={!componentSearchCollapse ? 'primary' : 'default'}
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
      componentSearchCollapse: state.local.componentSearchCollapse,
    };
  },
  (dispatch: any) => ({
    setLocalConfig: (value: any) =>
      dispatch({ type: 'local/setLocalConfig', value }),
  }),
)(InternalComponentSearch);

export default ComponentSearch;
