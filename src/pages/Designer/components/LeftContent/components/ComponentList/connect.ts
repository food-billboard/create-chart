export const mapStateToProps = () => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  setDragInfo: (value: any) =>
    dispatch({ type: 'global/setDragInfo', value: { value } }),
});
