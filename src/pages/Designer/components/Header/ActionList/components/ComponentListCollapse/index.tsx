import { useCallback } from 'react';
import { connect } from 'dva';
import DebounceButton from '@/components/DebounceButton';
import IconFont from '@/components/ChartComponents/Common/Icon';
import { ConnectState, ILocalModelState } from '@/models/connect';
import Tooltip from '@/components/Tooltip';

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
      <DebounceButton
        icon={<IconFont title="折叠组件列表" type="icon-userConfig" />}
        onClick={handleClick}
        type={componentCollapse ? 'default' : 'primary'}
      />
    </Tooltip>
  );
};

const ComponentListCollapse = connect(
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

export default ComponentListCollapse;
