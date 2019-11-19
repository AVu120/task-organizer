// Decribe how our app should be bundled.
const path = require("path");

// Configuration that webpack checks when we run it.
module.exports = {
  mode: "development", // can be "development" or "production"
  // https://nodejs.org/api/path.html#path_path_resolve_paths
  entry: path.resolve(__dirname, `src`, `app`), // __dirname is a special property which is always the directory of the file which has been run from.
  // Definition of the one file that our application's going to become.
  output: {
    path: path.resolve(__dirname, 'dist'), // 'dist' for built finished files.
    filename: 'bundle.js',
    publicPath: '/' // Where our code expects to find this file.
  },
  // Array of the extensions that we want webpack to process.
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // Setting we have to enable if we want to use React Router.
  devServer: {
    historyApiFallback: true
  },
  // Regex that application will use to determine if a file should or should not be compiled.
  module: {
    rules: [{
      test: /\.jsx?/, // Any file with .js or maybe x at the end, which means js or jsx matches the test.
      loader: 'babel-loader' // Defines a loader that we want to use for that file.
    }]
  }
}