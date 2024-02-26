const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devServer: {
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, "public", "build"),
    filename: "bundle.js",
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
    }),
  ],
};
