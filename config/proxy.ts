export const API_IMPROVE = 'http://jimmy2021nas.ddnsfree.com:20038';
export const API_DOMAIN = 'http://47.97.27.23';
// export const API_DOMAIN = 'http://localhost:4000';

export default {
  dev: {
    // '/api/': {
    //   target: API_DOMAIN,
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
    '/api/user/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/customer/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/screen/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/collections/': {
      target: API_IMPROVE,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/static/image/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/static/video/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  prod: {
    // '/api/': {
    //   target: API_DOMAIN,
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
    '/api/user/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/customer/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/screen/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/collections/': {
      target: API_IMPROVE,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/static/video/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/static/image/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
