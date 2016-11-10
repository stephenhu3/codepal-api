// Karma configuration
// Generated on Tue Nov 01 2016 13:18:43 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-ajax', 'jasmine', 'fixture'],
 //   plugins: ['karma-jasmine-ajax'],

    // list of files / patterns to load in the browser
    files: [
        // Dependencies
        'spec/support/jquery-3.1.1.min.js',
        'spec/support/jasmine-jquery.js',
        'js/ace/ace.js',

        // Files to test
        'js/codeeditor/main.js',
        'js/codeeditor/util.js',
        'js/codeeditor/ui.js',
        'js/codeeditor/execute.js',
        'js/codeeditor/editor.js',
    
        // Fixtures
        'spec/fixtures/*',
        
        // Helpers
        'spec/helpers/*.js',

        // Tests
        'spec/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/*.html' : ['html2js'],
        'js/*.js' : 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
