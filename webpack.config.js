const path = require(`path`);
const MiniCSSExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = {
    entry: {
        app: `./src/index.js`
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, `./dist`),
        publicPath: `/dist`
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: `babel-loader`,
            exclude: `/node_modules/`
        },{
            test: /\.css$/,
            use: [
                `style-loader`,
                MiniCSSExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: true}
                }, {
                    loader: "postcss-loader",
                    options: {sourceMap: true, config: {path: `src/js/postcss.config.js`}}
                }, {
                    loader: "sass-loader",
                    options: {sourceMap: true}
                }
            ]
        },{
            test: /\.scss$/,
            use: [
                `style-loader`,
                MiniCSSExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: true}
                }, {
                    loader: "postcss-loader",
                    options: {sourceMap: true, config: {path: `src/js/postcss.config.js`}}
                }, {
                    loader: "sass-loader",
                    options: {sourceMap: true}
                }
            ]
        }]
    },
    devServer: {
        overlay: true
    },
    devtool: `source-map`,
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "[name].css"
        })
    ]
};
