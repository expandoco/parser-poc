module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/*.js',
      'spec/*.spec.js'
    ]
  });
};