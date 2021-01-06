module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/hotels/'
    : '/',
    transpileDependencies: [
      'vue-echarts',
      'resize-detector',
    ]
};
