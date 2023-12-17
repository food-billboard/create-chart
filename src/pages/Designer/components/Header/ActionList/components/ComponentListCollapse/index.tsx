import classnames from 'classnames';
import { useCallback } from 'react';
import { connect } from 'umi';
import IconFont from '@/components/ChartComponents/Common/Icon';
import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import { ConnectState, ILocalModelState } from '@/models/connect';
import styles from './index.less';

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
    <Tooltip title="组件列表">
      <DebounceButton
        icon={
          <IconFont
            title="组件列表"
            type="icon-userConfig"
            className={classnames({
              [styles['rotate-icon']]: componentCollapse,
            })}
          />
        }
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
