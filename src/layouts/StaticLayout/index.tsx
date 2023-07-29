import { get } from 'lodash';
import { connect, Outlet } from 'umi';
import { ConnectState } from '@/models/connect';
import CommonLayout, {
  ContainerWrapper4Static,
  DocumentTitleSetWrapper4Static,
  EnvironmentPrompt,
  EventEmitterWrapper,
  InitialConfigWrapper,
  CssVarWrapper,
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
    CssVarWrapper,
    InitialConfigWrapper,
    EventEmitterWrapper,
    EnvironmentPrompt,
    DocumentTitleSetWrapper4Static,
    ContainerWrapper4Static,
    Outlet,
  ]),
);
