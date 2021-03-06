const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist')
};

const production = (process.env.NODE_ENV == 'production' || process.env.NODE_BUILD == 'true');
const configFile = `${process.env.NODE_ENV}.config.js`;
const config = require(`./${configFile}`);

let createConfig = (options) => {
    let webpackConfig = {};

    webpackConfig.entry = {
        app: production ?
            [
                `babel-polyfill`,
                path.resolve(PATHS.src, "index.jsx")
            ] : [
            `babel-polyfill`,
            `webpack-dev-server/client?http://localhost:${options.port}`,
            `webpack/hot/only-dev-server`,
            `react-hot-loader/patch`,
            path.resolve(PATHS.src, "index.jsx")
        ]
    };

    webpackConfig.output = {
        path: PATHS.dist,
        publicPath: './',
        filename: "bundle.js"
    };

    webpackConfig.devtool = production ? "source-map" : "inline-source-map";

    webpackConfig.plugins = [];

    if (!production) {

        webpackConfig.devServer = {
            hot: true
        };

        webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    }

    webpackConfig.plugins.push(new webpack.ProgressPlugin(function(percentage, msg) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`${(percentage * 100).toFixed(2)}% ${msg}`);
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __PRODUCTION__: JSON.stringify(production),
            __API_URL__: JSON.stringify(config.apiURL)
        }),
        new ExtractTextPlugin("style.css"));

    if(production) {
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }));
    }

    webpackConfig.module = {
        rules: [
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(pdf)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(mp4)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]"
                    }
                },
            },
            {
                test: /\.(png|gif|jpg|ico|svg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /[A-Za-z]+\.json$/,
                loader: 'file-loader',
                include: path.resolve(__dirname, 'src/assets/locales'),
                options: {
                    context: path.resolve(__dirname, "./src/assets"),
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: [PATHS.src],
                use: 'babel-loader'
            },
            {
                test: /\.(woff|eot|ttf)$/, 
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            { 
                test: /vendor\/.+\.(jsx|js)$/,
                loader: 'imports?jQuery=jquery,$=jquery,this=>window'
            }
        ]
    };

    webpackConfig.resolve = {
        enforceExtension: false,
        extensions: [".js", ".jsx", ".json"],
        modules: ["node_modules"],
        alias: {
            app: PATHS.src,
            actions: path.resolve(PATHS.src, 'actions'),
            assets: path.resolve(PATHS.src, 'assets'),
            components: path.resolve(PATHS.src, 'components'),
            stores: path.resolve(PATHS.src, 'reducers'),
            services: path.resolve(PATHS.src, 'services')
        }
    };

    webpackConfig.stats = {
        reasons: true,
        errorDetails: true,
    };
    return webpackConfig;
};

module.exports = createConfig({
    production: config.production,
    port: config.port
});
