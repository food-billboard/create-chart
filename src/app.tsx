import React from 'react';
import moment from 'moment';
import { Button, Result } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import 'pathseg';
import 'css-doodle';
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
        <div
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            left: 0,
            top: 0,
            overflow: 'hidden',
            zIndex: 99,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Result
            icon={<FrownOutlined />}
            title="发生了未知的错误！"
            extra={
              <Button type="primary" onClick={resetError}>
                点击以刷新
              </Button>
            }
          />
        </div>
      );
      return (
        <div>
          <div>发生了未知的错误</div>
          {/* <div>{error.toString()}</div>
          <div>{componentStack}</div>
          <button
            onClick={() => {
              resetError();
            }}
          >
            Click here to reset!
          </button> */}
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
