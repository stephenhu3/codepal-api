PROJECT STRUCTURE
--------------
/ace: contains all Ace Editor related JavaSccript files, including themes and syntax highlighting modes

/js: custom js files for codeeditor module

/spec: all testing related files
-> /fixtures: jasmine-jquery html fixture files
-> /support: test js dependencies
-> *[sSpec].js: testing files

codeeditor.html: main module file

karma.conf.js: config settings for karma test runner

package.json: node json project file with all needed dependencies

SETUP
-------------

1. Run npm install to get all required node packages for testing.
2. Get the karma cli package: npm install -g karma-cli

To run codeeditor locally in Chrome, launch codeeditor.html.
- need to use https://chrome.google.com/webstore/detail allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi to be able to hit HackerEarth API endpoints.

To run tests, go to root and type in 'karma start karma.conf.js'
To view coverage, after running tests, navigate to codepal/coverage and open up index.html
