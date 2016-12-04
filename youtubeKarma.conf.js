module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: ['spec/support/jquery-3.1.1.min.js',
            'spec/support/jasmine-jquery.js',
            'spec/support/iframe_api.js',
            'spec/support/client.js',
            'js/youtubeComponent.js',
            'spec/youtubeSpec.js',
            'html/youtube.html'
        ],
        preprocessors: {
            '**/*.html': ['html2js'],
            'js/*.js': 'coverage'
        },
        reporters: ['progress', 'coverage'],
        browsers: ['Chrome']
    })
}
