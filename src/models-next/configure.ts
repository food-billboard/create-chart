import { configure } from 'mobx';

configure({
  enforceActions: 'always',
  safeDescriptors: false,
  // computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  // observableRequiresReaction: true,
  // disableErrorBoundaries: true,
});
