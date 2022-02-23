import { get } from 'lodash';
import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    guideLineList: get(state, 'global.guideLine.value') || [],
    guideLineShow: get(state, 'global.guideLine.show') ?? false,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
