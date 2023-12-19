import { useCallback, useMemo } from 'react';
import { connect } from 'umi';
import { ConnectState, ILocalModelState } from '@/models/connect';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import CommonHeader from '../CommonHeader';
import ComponentSearchList from './components/ComponentList/SearchList';
import ComponentTypeList from './components/ComponentTypeList';
import styles from './index.less';

const ComponentManage = (props: {
  componentCollapse: boolean;
  setLocalConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { componentCollapse, setLocalConfig } = props;

  const onBack = useCallback(() => {
    setLocalConfig({
      componentCollapse: !componentCollapse,
    });
    GLOBAL_EVENT_EMITTER.emit(
      EVENT_NAME_MAP.COMPONENT_LIST_VISIBLE,
      componentCollapse,
    );
  }, [componentCollapse]);

  const onTypeClick = useCallback(() => {
    if (componentCollapse) {
      setLocalConfig({
        componentCollapse: false,
      });
      GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_LIST_VISIBLE, true);
    }
  }, [componentCollapse]);

  const headerClassName = useMemo(() => {
    if (componentCollapse) {
      return styles['component-manage-collapse-header'];
    }
    return '';
  }, [componentCollapse]);

  return (
    <div className={styles['component-manage']}>
      <CommonHeader title="组件" onBack={onBack} className={headerClassName} />
      <div className="dis-flex h-100">
        <ComponentTypeList onClick={onTypeClick} />
        <ComponentSearchList />
      </div>
    </div>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      componentCollapse: state.local.componentCollapse,
    };
  },
  (dispatch) => {
    return {
      setLocalConfig: (value: any) =>
        dispatch({ type: 'local/setLocalConfig', value }),
    };
  },
)(ComponentManage);
