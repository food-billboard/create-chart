// https://umijs.org/config/
import { defineConfig } from 'umi';
import { merge } from 'lodash';
import darkTheme from './theme';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routerConfig from './router-config';

const { REACT_APP_ENV } = process.env;

const commonConfig = {
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  antd: {},
  fastRefresh: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'hash',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes: routerConfig,
  theme: darkTheme,
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: (proxy as any)[REACT_APP_ENV || 'prod'],
  manifest: {
    basePath: '/',
  },
  chainWebpack(config: any) {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['javascript', 'json'],
      },
    ]);
  },
};

const developmentConfig: any = merge({}, commonConfig, {
  define: {
    'process.env.REACT_APP_ENV': 'dev',
  },
});

const productionConfig: any = merge({}, commonConfig, {
  define: {
    'process.env.REACT_APP_ENV': 'prod',
  },
  //-----打包配置
  // base: '/api/backend/screen/',
  base: '/',
  publicPath: '/api/backend/screen/',
});

export default defineConfig(
  REACT_APP_ENV === 'prod' ? productionConfig : developmentConfig,
);
