'use strict';

const dotenv = require('dotenv');
dotenv.config();
const baseURL = process.env.PROTOCOL + '//' + process.env.HOST + ':' + process.env.PORT

const path = require('path')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const VueLoaderPlugin = require('vue-loader/lib/plugin')

let compileCount = 0

module.exports = (env, argv) => {

  if (argv.mode === undefined) {
    argv.mode = 'development'
  }
  if (argv.watch === undefined) {
    argv.watch = false
  }

  let webpackConfig = {
    mode: argv.mode,
    cache: true,
    devtool: 'source-map',
    //devtool: false,
    entry: {
      'bundle': path.resolve(__dirname, './client-src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, './public/dist'),
      filename: '[name].js'
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm.js'
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/, // 針對所有.css 的檔案作預處理，這邊是用 regular express 的格式
          use: [
            'vue-style-loader', // 這個會後執行 (順序很重要)
            'css-loader?sourceMap', // 這個會先執行
            //'postcss-loader?sourceMap',
          ]
        },
        
        {
            test: /\.tpl$/,
            exclude: /node_modules/,
            use: {
              loader: 'html-loader',
              options: {
                attrs: false
              }
            }
        },
        {
          test: /\.less$/,
          use: [
            'vue-style-loader', // Step 3
            'css-loader?sourceMap', // Step 2再執行這個
            //'postcss-loader?sourceMap',
            'less-loader?sourceMap' // Step 1 要先執行這個
          ]
        },
        {
          test: /\.vue$/,
          use: [
            'vue-loader'
          ],
        },
        {
          test: /\.(eot|woff|woff2|svg|png|ttf)([\?]?.*)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'asset',
                publicPath: baseURL + '/dist/asset'
              }
            }
          ]
        },
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@kazupon/vue-i18n-loader',
        },
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            let paddingZero = (n) => {
              if (n < 10) {
                n = '0' + n
              }
              return n
            }
            setTimeout(() => {
              compileCount++
              let date = new Date;
              let seconds = paddingZero(date.getSeconds())
              let minutes = paddingZero(date.getMinutes())
              let hour = paddingZero(date.getHours())
              console.warn(`[${compileCount}] Building completed at ${hour}:${minutes}:${seconds}`)
            }, 100)
          });
        } // apply: (compiler) => {
      }
    ],  // plugins: [
  } // let webpackConfig = {

  // -------------------------------------------------------------------

  if (argv.mode === 'production') {
    webpackConfig.devtool = false

    for (let name in webpackConfig.entry) {
      let entry = webpackConfig.entry[name]
      webpackConfig.entry[name] = ["@babel/polyfill", entry]
      break
    }

    webpackConfig.module.rules[0] = {
      test: /\.css$/, // 針對所有.css 的檔案作預處理，這邊是用 regular express 的格式
      use: [
        'style-loader', // 這個會後執行 (順序很重要)
        'css-loader', // 這個會先執行
        'postcss-loader',
      ]
    }
    webpackConfig.module.rules[1] = {
      test: /\.less$/,
      use: [
        'style-loader', // Step 3
        'css-loader', // Step 2再執行這個
        'postcss-loader',
        'less-loader' // Step 1 要先執行這個
      ]
    }
    webpackConfig.module.rules.push({
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    })
    
    
    if (typeof(webpackConfig.optimization) !== 'object') {
      webpackConfig.optimization = {}
    }
    
    webpackConfig.optimization.minimizer = [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      })
    ]
    
    if (argv.watch === false) {
      if (Array.isArray(webpackConfig.plugins) === false) {
        webpackConfig.plugins = []
      }
      //webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    }
  }
  
  if (argv.mode === 'development') {

  }

  return webpackConfig
}
