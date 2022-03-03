const path = require('path')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'validate-steuerid',
    libraryTarget: 'umd2',
    // @see {@link https://stackoverflow.com/questions/64639839/typescript-webpack-library-generates-referenceerror-self-is-not-defined}
    globalObject: 'this',
  },
}
