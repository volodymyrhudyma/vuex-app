const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader :'vue-loader',
                options: {
                    loaders:{
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                }
            },
            {
                test: /\.css$/,
                loader: 'vue-style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },

    devServer: {
        hot : true,
        inline: true,
        host: 'localhost',
        disableHostCheck: true,
        port: 8000,
        open : true,
        contentBase : "public",
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    devtool: '#eval-source-map',

    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
};