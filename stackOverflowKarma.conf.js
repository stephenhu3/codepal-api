module.exports = function (config) {
    config.set({
        frameworks: ['jasmine-ajax', 'jasmine', 'fixture'],
        files: ['spec/support/jquery-3.1.1.min.js',
            'spec/support/jasmine-jquery.js',
            'spec/support/iframe_api.js',
            'spec/support/client.js',

            'js/stackOverflowComponent.js',
            'spec/stackOverflowSpec.js',
            'spec/fixtures/*',


        ],
        preprocessors: {
            '**/*.html': ['html2js'],
            'js/*.js': 'coverage'
        },
        reporters: ['progress', 'coverage'],
        browsers: ['Chrome']
    })
}
