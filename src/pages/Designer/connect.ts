import { ConnectState } from '@/models/connect' 

export const mapStateToProps = (state: ConnectState) => {
  return {
    loading: state.loading.effects["settings/getUserInfo"]
  }
}

export const mapDispatchToProps = (dispatch: any) => ({
  
})