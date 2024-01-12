import classnames from 'classnames';
import { useCallback, useMemo } from 'react';
import { connect } from 'umi';
import { ConnectState, ILocalModelState } from '@/models/connect';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import CommonHeader from '../CommonHeader';
import ComponentSearch from './components/ComponentSearch';
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
    <div
      className={classnames(
        styles['component-manage'],
        'dis-flex-column f-1 dis-flex',
      )}
    >
      <CommonHeader
        title="组件"
        onBack={onBack}
        className={headerClassName}
        extra={<ComponentSearch />}
      />
      <ComponentTypeList onClick={onTypeClick} />
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