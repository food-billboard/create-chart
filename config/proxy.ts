export const API_DOMAIN = 'http://47.97.27.23';

export default {
  dev: {
    '/api/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
