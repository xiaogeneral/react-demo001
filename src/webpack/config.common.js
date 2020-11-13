const path = require('path');
const merge = require('webpack-merge');
console.log(path.join(__dirname, '../node_modules/babel-loader/lib/index.js'));
console.log(path.resolve('./src'), 'include====');

module.exports = function (webpackConfig, redSkull, webpackPlugins, webpack) {
  const babelLoaderPath = path.join(__dirname, '../node_modules/babel-loader/lib/index.js');
  const { src } = redSkull;
  const pathsAlias = [
    'utils',
    'components',
    'layouts',
    'pages',
    'styles',
    'stores',
    'services',
    'assets',
    'images',
    'configs',
    'constants',
  ].reduce((result, key) => {
    result[key] = path.join(src, key);
    return result;
  }, {});
  Object.assign(webpackConfig.resolve.alias, pathsAlias, {
    '@': src,
    'helper': '@lianjia/helper',
    'antd': '@lianjia/antd',
    'mock': path.join(src, '../mock/config.js'),
    'amcomponents': path.join(src, '/application/am/components'),
    'am': path.join(src, '/application/am'),
  });

  webpackConfig = merge(webpackConfig, {
    resolve: {
      extensions: ['ts', 'tsx']
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minChunks: 2,
        cacheGroups: {
          vendor: {
            test: /node_modules\//,
            name: 'vendor',
            priority: 10,
            enforce: true,
            chunks: 'all',
          }
        }
      },
      runtimeChunk: {
        name: 'manifest',
      }
    }
  });
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  // 先删除原来的babel-loader配置
  webpackConfig.module.rules.shift();
  webpackConfig.module.rules.unshift({
    test: /\.jsx?$/,
    // exclude: /(node_modules)/,
    include: path.resolve('./src'),
    use: {
      loader: path.resolve('./node_modules/babel-loader/lib/index.js'),
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
        ],
        plugins: [
          ['import', {
            'libraryName': 'antd',
            'style': 'css',
          }],
          // Stage 0
          '@babel/plugin-proposal-function-bind',

          // Stage 1
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-logical-assignment-operators',
          ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
          ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
          ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],
          '@babel/plugin-proposal-do-expressions',

          // Stage 2
          ['@babel/plugin-proposal-decorators', { 'legacy': true }],
          '@babel/plugin-proposal-function-sent',
          '@babel/plugin-proposal-export-namespace-from',
          '@babel/plugin-proposal-numeric-separator',
          '@babel/plugin-proposal-throw-expressions',

          // Stage 3
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-syntax-import-meta',
          ['@babel/plugin-proposal-class-properties', { 'loose': false }],
          '@babel/plugin-proposal-json-strings'
        ],
        cacheDirectory: true
      }
    }
  });
  console.log(webpackConfig.module.rules, 'rules====');
  return webpackConfig;
};
