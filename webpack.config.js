const path = require("path")
const webpack = require("webpack");
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const config = {
    target: 'web',
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev?'"development"':'"production"'
            }
        }),
        new HTMLPlugin()
      ],
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },           
            {
                test: /\.(jpg|jepg|png|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options:{
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    }
}
if(isDev){
    config.module.rules.push({
            test: /\.styl(us)?$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    config.devtool = '#cheap-module-eval-source-map',
    config.devServer = {
        port: 8080,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    },
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.output.filename = '[name].js'
    config.module.rules.push({
        test: /\.styl(us)?$/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.css')
    )
}

module.exports = config