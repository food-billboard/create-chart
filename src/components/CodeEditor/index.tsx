import { dynamic } from 'umi';

export default dynamic({
  loader: async function () {
    const Editor = await import(
      /* webpackChunkName: "CODE_EDITOR" */ '../SyncCodeEditor'
    );
    return Editor;
  },
});
