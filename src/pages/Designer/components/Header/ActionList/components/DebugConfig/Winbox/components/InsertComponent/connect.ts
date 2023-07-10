export const mapStateToProps = () => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
});
