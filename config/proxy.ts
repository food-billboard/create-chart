
export const API_DOMAIN = "http://localhost:4000"

export default {
  dev: {
    '/api/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
