declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module '@lucky-canvas/react';

declare namespace React {
  // useCallback parameters are implicitly typed to any.
  // This override has the effect of forcing you to write types any parameters you want to use.
  // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52873
  function useCallback<T extends (...args: any[]) => any>(
    callback: T,
    deps: readonly any[],
  ): T;
}

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': any;
  }
}
