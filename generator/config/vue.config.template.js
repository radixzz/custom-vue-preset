const rucksack = require('rucksack-css');
const rupture = require('rupture');
const nib = require('nib');
const lost = require('lost');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        use: [
          nib(),
          rupture(),
        ],
        import: [
          '~nib/lib/nib/index.styl',
          '~rupture/rupture/index.styl',
        ],
      },
      postcss: {
        plugins: [
          rucksack({
            autoprefixer: false,
            fallbacks: false
          }),
          lost(),
        ],
      }
    }
  },
  chainWebpack: (config) => {
    const { alias } = config.resolve;
    alias.set('@', resolve('src'));
    alias.set('src', resolve('src'));
    alias.set('foo', resolve('src/foo'));
    alias.set('assets', resolve('src/assets'));
    alias.set('styles', resolve('src/styles'));

    /*
      JSON rule to work with file-loader again, as of webpack 4.0
      all JSON's are handled natively see: https://github.com/webpack/webpack/releases/tag/v4.0.0
      and because of this if you try to do a: require or an import of the file
      you'll get the JSON's contents(wrapped with an export call) instead of the generated URL.
    */
    config.module
      .rule('json')
      .test(/\.(json)(\?.*)?$/)
      .type('javascript/auto')
      .use('file-loader')
      .loader('file-loader')
      .tap((options = {}) => {
        options.name = 'data/[name].[hash:8].[ext]';
        return options;
      })
  }
};
