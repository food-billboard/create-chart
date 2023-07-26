import { ConnectState } from '@/models/connect';
import { get } from 'lodash';
import { connect } from 'umi';
import CommonLayout, {
  ContainerWrapper,
  DocumentTitleSetWrapper,
  EnvironmentPrompt,
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
    DocumentTitleSetWrapper,
    ContainerWrapper,
  ]),
);
