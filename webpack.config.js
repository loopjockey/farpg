const path = require('path');

module.exports = (env, argv) => ({
  entry: './script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  mode: argv.mode,
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,
});
