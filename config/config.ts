// https://umijs.org/config/
import { merge } from 'lodash';
import { defineConfig } from 'umi';
// @ts-ignore
import CompressionPlugin from 'compression-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
// import packageJson from '../package.json'
// @ts-ignore
// import SentryCliPlugin from '@sentry/webpack-plugin'
import proxy from './proxy';
import { normalRouter, staticRouter } from './router-config';
import darkTheme from './theme';

const { REACT_APP_ENV } = process.env;

const commonConfig = {
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  // msfu: {},
  define: {
    'process.env.REACT_APP': process.env.REACT_APP,
  },
  hash: true,
  antd: {},
  fastRefresh: true,
  dva: {},
  history: {
    type: 'hash',
  },
  headScripts:
    process.env.REACT_APP === 'static'
      ? []
      : [
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
  // dynamicImport: {
  //   loading: '@/components/PageLoading/index',
  // },
  // targets: {
  //   ie: 11,
  // },
  routes: process.env.REACT_APP === 'static' ? staticRouter : normalRouter,
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
      config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
        {
          test: /\.(js|css|html)$/i, // 匹配
          threshold: 102400, // 超过10k的文件压缩
          deleteOriginalAssets: false, // 不删除源文件
        },
      ]);
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 7,
            automaticNameDelimiter: '.',
            cacheGroups: {
              vendors: {
                name: 'vendors',
                chunks: 'all',
                // test: /[\\/]node_modules[\\/](lodash|moment|react|react-dom|dva|postcss)/,
                test: /(lodash|moment|react|react-dom|dva|postcss)/,
                priority: 10,
              },
              antdesigns: {
                name: 'antdesigns',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](@antv|antd|@ant-design)/,
                priority: 10,
              },
              echarts: {
                name: 'echarts',
                chunks: 'async',
                test: /[\\/]node_modules[\\/](echarts|zrender)/,
                priority: 10,
              },
              // 'async-commons': {
              //   name: 'async-commons',
              //   chunks: 'async',
              //   test: /(react-json-view|react-select|chunk-file-upload|react-slick|react-selecto|react-rnd|react-dnd|react-shepherd|react-color)/,
              //   priority: 11,
              // },
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
  // ? https://github.com/umijs/umi/issues/10959
  esbuildMinifyIIFE: true,
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  // devtool: 'source-map',
  //-----打包配置
  // base: '/api/backend/screen/',
  base: '/',
  outputPath: process.env.DEBUG ? 'dist/create-chart' : 'dist',
  publicPath:
    process.env.REACT_APP === 'static'
      ? '/create-chart/'
      : '/api/backend/screen/',
  // chunks: ['antdesigns', 'vendors', 'commons', 'umi'],
});

export default defineConfig(
  REACT_APP_ENV === 'prod' ? productionConfig : developmentConfig,
);
