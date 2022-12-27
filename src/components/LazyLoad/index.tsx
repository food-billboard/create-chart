import { lazy, Suspense } from 'react';
import { Loading } from '../PageLoading';

export default function LazyLoadWrapper<T = any>(
  loader: Parameters<typeof lazy>[0],
) {
  const Component = lazy(loader);
  return (props: T) => {
    return (
      <Suspense fallback={<Loading size={25} />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
