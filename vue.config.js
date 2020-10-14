const path = require('path');

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      stylus: {
        import: [
          path.resolve(__dirname, 'src/assets/stylus/helpers/index.styl'),
          path.resolve(__dirname, 'src/assets/stylus/adaptive/adaptive-mixins.styl'),
        ],
      },
    },
  },
};
