import { SearchOutlined } from '@ant-design/icons';
import { useCallback, useEffect } from 'react';
import { connect } from 'umi';
import DebounceButton from '@/components/DebounceButton';
import GlobalLoadingActonButton from '@/components/GlobalLoadingActionButton';
import { ConnectState, ILocalModelState } from '@/models/connect';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';

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

  useEffect(() => {
    const listener = (visible: boolean) => {
      if (!visible) {
        setLocalConfig({
          componentSearchCollapse: true,
        });
        GLOBAL_EVENT_EMITTER.emit(
          EVENT_NAME_MAP.COMPONENT_SEARCH_VISIBLE,
          false,
        );
      }
    };
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_LIST_VISIBLE,
      listener,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_LIST_VISIBLE,
        listener,
      );
    };
  }, []);

  return (
    <GlobalLoadingActonButton
      icon={<SearchOutlined className="c-f-s-big" />}
      onClick={handleClick}
      type={'link'}
      Component={DebounceButton}
      needLoading={false}
    />
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
