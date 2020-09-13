const path = require("path");


module.exports = {
  entry: {
      account: "./entrance/account.js",
      dashboard: "./entrance/dashboard.js",
      library: "./entrance/library.js",
      navbar: "./entrance/navbar.js",
      offer: "./entrance/offer.js"
  },
  output:{
    filename:"../static/js/[name].js",
    path: path.resolve()
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options:{
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }
    ]
  }
};