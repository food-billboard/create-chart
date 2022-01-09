// https://umijs.org/config/
import { defineConfig } from 'umi';
import { merge } from 'lodash'
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
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: (proxy as any)[REACT_APP_ENV || 'prod'],
  manifest: {
    basePath: '/',
  },
}

const developmentConfig: any = merge({}, commonConfig, {
  define: {
    'process.env.REACT_APP_ENV': 'dev',
  },
})

const productionConfig: any = merge({}, commonConfig, {
  define: {
    'process.env.REACT_APP_ENV': 'prod'
  },
  //-----打包配置
  base: '/api/backend/',
  publicPath: "/api/backend/"
})

export default defineConfig(
  REACT_APP_ENV === "prod" ? productionConfig : developmentConfig
);
