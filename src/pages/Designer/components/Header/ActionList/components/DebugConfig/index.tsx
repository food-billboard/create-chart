import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import { ConnectState, ILocalModelState } from '@/models/connect';
import { BugOutlined } from '@ant-design/icons';
import { useKeyPress } from 'ahooks';
import { useCallback, useRef } from 'react';
import { connect } from 'umi';
import Winbox, { WinBoxRef } from './Winbox';

// 折叠右侧配置列表
const InternalDebugConfig = (props: {
  debug: ConnectState['local']['debug'];
  setDebugConfig: (value: Partial<ILocalModelState>) => void;
  screenType: ComponentData.ScreenType;
}) => {
  const { debug, setDebugConfig, screenType } = props;
  const { show } = debug;

  const boxRef = useRef<WinBoxRef>(null);

  const onChange = useCallback((value) => {
    setDebugConfig(value);
  }, []);

  const handleClick = useCallback(() => {
    boxRef.current?.open();
  }, []);

  useKeyPress(['ctrl.q'], () => {
    if (screenType === 'edit') {
      handleClick();
    }
  });

  return <Winbox ref={boxRef} debug={debug} onChange={onChange} />;

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
      screenType: state.global.screenType,
    };
  },
  (dispatch: any) => ({
    setDebugConfig: (value: any) => dispatch({ type: 'local/setDebug', value }),
  }),
)(InternalDebugConfig);

export default DebugConfig;
