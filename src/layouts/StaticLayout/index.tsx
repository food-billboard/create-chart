import { connect } from 'dva';
import { get } from 'lodash';
import { ConnectState } from '@/models/connect';
import CommonLayout, {
  EnvironmentPrompt,
  DocumentTitleSetWrapper4Static,
  ContainerWrapper4Static,
  EventEmitterWrapper,
} from '../components/CommonLayout';

export default connect(
  (state: ConnectState) => {
    return {
      screenName: get(state, 'global.screenData.name') || '大屏设计器',
    };
  },
  () => ({}),
)(
  CommonLayout([
    EventEmitterWrapper,
    EnvironmentPrompt,
    DocumentTitleSetWrapper4Static,
    ContainerWrapper4Static,
  ]),
);
