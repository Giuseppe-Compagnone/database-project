const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");
const fs = require("fs");

module.exports = () => {
  fs.writeFileSync(
    "./.env",
    `REACT_APP_SERVER=${process.env.REACT_APP_SERVER}\n`
  );

  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.tsx",
    devServer: {
      historyApiFallback: true,
    },
    output: {
      path: path.resolve(__dirname, "public", "build"),
      filename: "bundle.js",
      publicPath: "/",
    },
    resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] },
    module: {
      rules: [
        { test: /\.(ts|tsx)$/, loader: "ts-loader" },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        { test: /\.css$/, loader: "css-loader" },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new CopyPlugin({
        patterns: [{ from: "images", to: "images" }],
        patterns: [{ from: "public/_redirects", to: "." }],
        patterns: [{ from: "public/favicon.png", to: "." }],
      }),
      new webpack.DefinePlugin(envKeys),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  };
};
