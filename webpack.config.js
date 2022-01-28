const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
require('@babel/polyfill')

module.exports = (env, opts) => {
  // 중복옵션 옵션들..
  const config = {
    resolve: {
      extensions: ['.vue', '.js'],
      fallback:{
        fs:false,
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util')
        
      }
    },
    // 진입점, 경로설정
    entry: {
      app: [
        '@babel/polyfill',
        path.join(__dirname, 'main.js')
      ]
    },
    // 결과물에 대한 설정
    output: {
      filename: '[name].js', // app.js
      path: path.join(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
      }),
      new CopyPlugin({
        patterns: [
          { from: 'assets', to: '' }
        ]
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
     })
    ]

  }

  // 개발용과 제품용 분기설정하기
  // eval웹팩 빌드할때 빌드시간 축소하고 디버깅이 가능하게 함. 용량이 커서 , 배포에는 적합하지X 개발용
  // cheap-module-source-map 용량이 적어지고 최적화가 잘된다. - 제품화할때 적합

  // 개발용
  if (opts.mode === 'development') {
    return merge(config, {
      // 추가 개발용 옵션
      devtool: 'eval',
      devServer: {
        open: false,
        hot: true
      }
    })

  // 제품용 if(opts.mode === 'production')
  } else {
    return merge(config, {
      // 추가 개발용 옵션
      devtool: 'cheap-module-source-map',
      plugins: [
        new CleanWebpackPlugin()
      ]
    })
  }
}
