import { useCallback, useRef } from 'react';
import { connect } from 'dva';
import { BugOutlined } from '@ant-design/icons';
import DebounceButton from '@/components/DebounceButton';
import { ConnectState, ILocalModelState } from '@/models/connect';
import Tooltip from '@/components/Tooltip';
import Winbox, { WinBoxRef } from './Winbox';

// 折叠右侧配置列表
const InternalDebugConfig = (props: {
  debug: ConnectState['local']['debug'];
  setDebugConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { debug, setDebugConfig } = props;
  const { show } = debug;

  const boxRef = useRef<WinBoxRef>(null);

  const onChange = useCallback((value) => {
    setDebugConfig(value);
  }, []);

  const handleClick = useCallback(() => {
    boxRef.current?.open();
  }, []);

  return (
    <Tooltip title="开启调试">
      <DebounceButton
        icon={<BugOutlined title="开启调试" />}
        onClick={handleClick}
        type={show ? 'default' : 'primary'}
      />
      <Winbox ref={boxRef} debug={debug} onChange={onChange} />
    </Tooltip>
  );
};

const DebugConfig = connect(
  (state: ConnectState) => {
    return {
      debug: state.local.debug,
    };
  },
  (dispatch: any) => ({
    setDebugConfig: (value: any) => dispatch({ type: 'local/setDebug', value }),
  }),
)(InternalDebugConfig);

export default DebugConfig;
