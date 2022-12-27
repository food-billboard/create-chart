import LazyLoadWrapper from '@/components/LazyLoad';

export default LazyLoadWrapper(() => {
  return import(/* webpackChunkName: "CODE_EDITOR" */ '../SyncCodeEditor');
});
