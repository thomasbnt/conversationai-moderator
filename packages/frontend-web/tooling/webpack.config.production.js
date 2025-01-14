/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const path = require('path');
const webpack = require('webpack');
const publicPath = "/_assets/";

module.exports = {
  mode: 'production',

  target: 'web',

  entry: {moderator: ['@babel/polyfill', './src/app/main.tsx']},

  output: {
    path: path.join(__dirname, "..", "build"),
    publicPath: publicPath,
    filename: "js/[name].js",
    chunkFilename: "[id].js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'source-map-loader',
        enforce: 'pre'
      },
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        enforce: 'post'
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
    ]
  },

  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      'aphrodite': 'aphrodite/no-important',
      'ws': 'slugify', // Not a real alias.  But stops webpack from including ws library in bundle,
      'crypto': require.resolve("crypto-browserify"),
      'stream': require.resolve("stream-browserify"),
    }
  },
  plugins: [
    new webpack.PrefetchPlugin("react"),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVPANEL__: false,
      ENV_API_URL: process.env['API_URL'] ? "'" + (process.env['API_URL']) + "'" : undefined,
      ENV_APP_NAME: "'" + (process.env['APP_NAME'] || 'Moderator') + "'",
      ENV_REQUIRE_REASON_TO_REJECT: (process.env['REQUIRE_REASON_TO_REJECT'] || true),
      ENV_COMMENTS_EDITABLE_FLAG: (process.env['COMMENTS_EDITABLE_FLAG'] || true),
      ENV_RESTRICT_TO_SESSION: (process.env['RESTRICT_TO_SESSION'] || true),
      ENV_MODERATOR_GUIDELINES_URL: "'" + (process.env['MODERATOR_GUIDELINES_URL'] || '') + "'",
      ENV_SUBMIT_FEEDBACK_URL: "'" + (process.env['SUBMIT_FEEDBACK_URL'] || '') + "'",
    }),
    new webpack.ProvidePlugin({ process: 'process/browser', }),
  ]
};
