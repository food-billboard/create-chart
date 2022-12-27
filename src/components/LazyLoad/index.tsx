import { lazy, Suspense } from 'react';

export default function LazyLoadWrapper<T = any>(
  loader: Parameters<typeof lazy>[0],
) {
  const Component = lazy(loader);
  return (props: T) => {
    return (
      <Suspense fallback={<div>loading.....</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
}
