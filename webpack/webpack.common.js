// Native dependencies.
const path = require('path');

// Webpack dependencies.
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Constants defines.
const srcDir = path.resolve('./src');
const distDir = path.resolve('./dist');

module.exports = (env, {
  sourceMap
}) => {
  const STYLE_LOADER = [
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap
        }
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap
        }
      }, {
        loader: 'resolve-url-loader'
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }
  ];
  const COMPILER_LOADER = [
    {
      test: /\.ts/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader'
      }]
    }
  ];
  const ASSETS_LOADER = [
    {
      test: /\.(jpe?g|png|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[hash].[ext]'
        }
      }]
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader'
      }]
    }
  ];

  return {
    entry: {
      app: path.join(srcDir, 'index.ts')
    },

    output: {
      path: distDir,
      filename: '[name].[hash].js'
    },

    resolve: {
      alias: {
        assets: path.join(srcDir, 'assets')
      },
      extensions: ['.ts', '.js']
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ],

    module: {
      rules: [
        ...STYLE_LOADER,
        ...COMPILER_LOADER,
        ...ASSETS_LOADER
      ]
    }
  }
};
