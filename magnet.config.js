module.exports = {
  magnet: {
    plugins: [
      'function',
      'controller',
      'metal',
      'sass'
    ],
    src: [
      'src/**/*.js',
    ],
    pluginsConfig: {
      sass: {
        src: 'src/stylesheets/index.scss'
      }
    }
  }
}
