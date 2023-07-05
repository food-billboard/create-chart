import { lazy, Suspense } from 'react';
import { Loading } from '../PageLoading';
import RequestPool from '@/utils/Assist/RequestPool';

const requestPool = new RequestPool({
  concurrency: 5,
});

export default function LazyLoadWrapper<T = any, RK = any>(
  loader: Parameters<typeof lazy>[0],
) {
  const Component = lazy(async () => {
    let requested = false;
    let timeout: NodeJS.Timeout;
    return new Promise<any>((resolve) => {
      requestPool.request(async () => {
        if (requested) return;
        try {
          const Component = await loader();
          clearTimeout(timeout);
          resolve(Component);
        } catch (err) {
          resolve(import('../ComponentError'));
        } finally {
          requested = true;
        }
      });
      // 超时显示错误
      timeout = setTimeout(() => {
        if (!requested) {
          requested = true;
          resolve(import('../ComponentError'));
        }
      }, 15000);
    });
  });
  return (props: T & { wrapperComponentRef?: RK }) => {
    const { wrapperComponentRef, ...nextProps } = props;
    return (
      <Suspense fallback={<Loading size={25} />}>
        <Component
          {...nextProps}
          {...(wrapperComponentRef ? { ref: wrapperComponentRef } : {})}
        />
      </Suspense>
    );
  };
}
