import { BlockOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { connect } from 'umi';
import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import { ConnectState, ILocalModelState } from '@/models/connect';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';

// 图层显示隐藏
const LayerShowIcon = (props: {
  layerCollapse: boolean;
  setLocalConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { layerCollapse, setLocalConfig } = props;

  const handleOpen = useCallback(() => {
    GLOBAL_EVENT_EMITTER.emit(
      EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE,
      !layerCollapse,
    );
    setLocalConfig({
      layerCollapse: !layerCollapse,
    });
  }, [layerCollapse]);

  return (
    <Tooltip title="图层">
      <DebounceButton
        title="图层"
        icon={<BlockOutlined />}
        type={layerCollapse ? 'primary' : 'default'}
        onClick={handleOpen}
      ></DebounceButton>
    </Tooltip>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      layerCollapse: state.local.layerCollapse,
    };
  },
  (dispatch) => ({
    setLocalConfig: (value: any) =>
      dispatch({ type: 'local/setLocalConfig', value }),
  }),
)(LayerShowIcon);
