PROJECT STRUCTURE
--------------

/ace: contains all Ace Editor related JavaSccript files, including themes and syntax highlighting modes

/js: custom js files for codeeditor module

/spec: all testing related files
-> *[sSpec]: testing files
-> SpecRunner.html: in-browser test execution file
-> /helpers: jasmine helper functions
-> /jasmine-2.5.2: standalone jasmine distribution including jasmine-jquery for fixtures
-> /javascripts: jasmine-jquery fixtures
-> /support: jasmine.json config file

codeeditor.html: main module file

SETUP
-------------

1. Run npm install to get all required node packages for testing.
2. npm install -g karma-cl

To run codeeditor locally in Chrome, need to use
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
to be able to hit HackerEarth API endpoints.

To run tests, go to root and type in karma start karma.conf.js
To view coverage, after running tests, navigate to codepal/coverage and open up index.html
