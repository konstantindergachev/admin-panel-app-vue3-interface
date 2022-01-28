module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '^/': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },
    },
  },
};
