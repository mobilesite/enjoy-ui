var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel'); // 并行uglify
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
var package = require('../package.json');

var path = require('path');
var config = require('../config');

var env =
    process.env.NODE_ENV === 'testing'
        ? require('../config/test.env')
        : config.build.env;

var plugins = [
    new webpack.DefinePlugin({
        'process.env': env
    }),
    new webpack.DefinePlugin({
        'process.env.VERSION': `'${package.version}'`
    }),
    new FriendlyErrorsPlugin(),
    // new UglifyJsParallelPlugin({
    //     workers: os.cpus().length,
    //     mangle: true,
    //     compressor: config.build.compressor,
    //     sourceMap: config.build.productionSourceMap
    // }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../src/assets'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
        }
    ]),
    
    new HappyPack({
        id: 'happybabel',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool,
        cache: true,
        verbose: true
    })
];

var webpackConfig = {
    entry: {
        main: './src/lib.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'enjoyUI.js',
        library: 'enjoyUI',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // todo 这个地方待配置
            vue$: 'vue/dist/vue.esm.js',
            '@': utils.joinPath('src')
        }
    },
    module: {
        rules: [
            // {
            //   test: /\.(js|vue)$/,
            //   loader: 'eslint-loader',
            //   enforce: 'pre',
            //   include: [utils.joinPath('src'), utils.joinPath('test')], // todo 修改路径
            //   options: {
            //     formatter: require('eslint-friendly-formatter')
            //   }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                loader: 'happypack/loader?id=happybabel',
                include: [utils.joinPath('src'), utils.joinPath('test')] // todo 修改路径
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
