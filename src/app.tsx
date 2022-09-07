import React from 'react';
import moment from 'moment';
import 'pathseg';
import * as Sentry from '@sentry/react';
import type { ErrorBoundaryProps } from '@sentry/react';
import 'moment/locale/zh-cn';
import 'animate.css';
import ThemeUtil from './utils/Assist/Theme';
import GlobalConfig from './utils/Assist/GlobalConfig';

moment.locale('zh-cn');

// 色调初始化
ThemeUtil.init();

// 设置全局初始化配置
GlobalConfig.enableConfig({});

export const locale = {
  default: 'zh-CN',
};

export const dva = {
  config: {
    onError(error: any) {
      console.error(error);
    },
  },
};

export function rootContainer(container: JSX.Element) {
  const props: ErrorBoundaryProps = {
    fallback: ({ error, componentStack, resetError }) => {
      return (
        <div>
          <div>You have encountered an error</div>
          <div>{error.toString()}</div>
          <div>{componentStack}</div>
          <button
            onClick={() => {
              resetError();
            }}
          >
            Click here to reset!
          </button>
        </div>
      );
    },
    showDialog: true,
  };
  return React.createElement(Sentry.ErrorBoundary, props, container);
}

export const render = (nextRender: any) => {
  nextRender();
};
