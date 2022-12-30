// https://umijs.org/config/
import { defineConfig } from 'umi';
import { merge } from 'lodash';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
// import packageJson from '../package.json'
// @ts-ignore
// import SentryCliPlugin from '@sentry/webpack-plugin'
import darkTheme from './theme';
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
  headScripts: [
    `
      window._AMapSecurityConfig = {
        serviceHost:'http://47.97.27.23/_AMapService',  
      }
    `,
    `https://webapi.amap.com/maps?v=2.0&key=1605b2f5a0a90cde9c112f5ea32025d3`,
  ],
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
    // config.plugin('sentry-plugin').use(SentryCliPlugin, [
    //   {
    //     include: ['../dist'],
    //     ignore: ['node_modules'],
    //     org: 'food-billboard',
    //     sourceMapReference: true,
    //     release: packageJson.version,
    //   }
    // ])
    // 生产环境配置
    if (REACT_APP_ENV === 'prod') {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            automaticNameDelimiter: '.',
            cacheGroups: {
              antdesigns: {
                name: 'antdesigns',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](@antv|antd|@ant-design)/,
                priority: 10,
              },
              echarts: {
                name: 'echarts',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](echarts|zrender)/,
                priority: 10,
              },
              vendors: {
                name: 'vendors',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](lodash|moment|react|dva|postcss)/,
                priority: 10,
              },
              commons: {
                name: 'commons',
                // 其余同步加载包
                chunks: 'all',
                minChunks: 2,
                priority: 1,
                // 这里需要注意下，webpack5会有问题， 需加上这个 enforce: true，
                // refer: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/257#issuecomment-432594711
                enforce: true,
              },
            },
          },
        },
      });
    }
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
  // devtool: 'source-map',
  //-----打包配置
  // base: '/api/backend/screen/',
  base: '/',
  publicPath: '/api/backend/screen/',
  chunks: ['echarts', 'antdesigns', 'vendors', 'commons', 'umi'],
});

export default defineConfig(
  REACT_APP_ENV === 'prod' ? productionConfig : developmentConfig,
);
