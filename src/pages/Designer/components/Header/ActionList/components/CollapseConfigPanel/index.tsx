import { useCallback } from 'react';
import { connect } from 'dva';
import DebounceButton from '@/components/DebounceButton';
import IconFont from '@/components/ChartComponents/Common/Icon';
import { ConnectState, ILocalModelState } from '@/models/connect';
import Tooltip from '@/components/Tooltip';

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
      <DebounceButton
        icon={<IconFont title="折叠组件配置" type="icon-shangpinliebiao" />}
        onClick={handleClick}
        type={componentConfigCollapse ? 'default' : 'primary'}
      />
    </Tooltip>
  );
};

const CollapseConfigPanel = connect(
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

export default CollapseConfigPanel;
