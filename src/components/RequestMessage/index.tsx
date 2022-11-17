import { useRef, useCallback } from 'react';
import { uniqueId } from 'lodash';
import { message } from 'antd';
import type { ArgsProps } from 'antd/es/message';

const MESSAGE_KEY = 'MESSAGE_KEY';

function useMessage(
  request: (...args: any[]) => Promise<boolean>,
  config: Partial<Pick<ArgsProps, 'duration'>>,
) {
  const { duration = 30 } = config;

  const messageKey = useRef<string>();
  const loading = useRef<boolean>(false);

  const createMessage = useCallback(
    async (
      {
        loading: loadingContent = {},
        success: successContent = {},
        error: errorContent = {},
      }: Partial<{
        loading: Partial<ArgsProps>;
        success: Partial<ArgsProps>;
        error: Partial<ArgsProps>;
      }>,
      ...args: any[]
    ) => {
      if (loading.current) return;
      loading.current = true;
      messageKey.current = uniqueId(MESSAGE_KEY);
      message.loading({
        content: '数据请求中...',
        ...loadingContent,
        duration,
        onClose: () => {
          loading.current = false;
        },
        key: messageKey.current,
      });

      try {
        const result = await request(...args);
        if (result) {
          message.success({
            duration: 2,
            content: '操作成功！',
            ...successContent,
            onClose: () => {
              loading.current = false;
              successContent?.onClose?.();
            },
            key: messageKey.current,
          });
        } else {
          throw new Error('');
        }
      } catch (err) {
        message.error({
          duration: 2,
          content: '操作失败！',
          ...errorContent,
          key: messageKey.current,
          onClose: () => {
            loading.current = false;
            errorContent?.onClose?.();
          },
        });
      }
    },
    [duration, request],
  );

  return createMessage;
}

export class Message {
  constructor(
    request: (...args: any[]) => Promise<boolean>,
    config: Partial<Pick<ArgsProps, 'duration'>> = {},
  ) {
    this.config = config;
    this.request = request;
  }

  config;
  request;

  messageKey: string = '';
  loading = false;

  createMessage = async (
    {
      loading: loadingContent = {},
      success: successContent = {},
      error: errorContent = {},
    }: Partial<{
      loading: Partial<ArgsProps>;
      success: Partial<ArgsProps>;
      error: Partial<ArgsProps>;
    }>,
    ...args: any[]
  ) => {
    const { duration = 30 } = this.config;
    if (this.loading) return;
    this.loading = true;
    this.messageKey = uniqueId(MESSAGE_KEY);
    message.loading({
      content: '数据请求中...',
      ...loadingContent,
      duration,
      onClose: () => {
        this.loading = false;
      },
      key: this.messageKey,
    });

    try {
      const result = await this.request(...args);
      if (result) {
        message.success({
          duration: 2,
          content: '操作成功！',
          ...successContent,
          key: this.messageKey,
          onClose: () => {
            this.loading = false;
            successContent?.onClose?.();
          },
        });
      } else {
        throw new Error('');
      }
    } catch (err) {
      console.error(err);
      message.error({
        duration: 2,
        content: '操作失败！',
        ...errorContent,
        key: this.messageKey,
        onClose: () => {
          this.loading = false;
          errorContent?.onClose?.();
        },
      });
    }
  };
}

export default useMessage;
