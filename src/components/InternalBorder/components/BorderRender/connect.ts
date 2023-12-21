import { get } from 'lodash';
import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  const { width, padding } = get(
    state,
    'global.screenData.config.attr.componentBorder',
  );
  return {
    width,
    padding,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
