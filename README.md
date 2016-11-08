RUNNING LOCALLY
---
Launch codeeditor.html in your browser of choice (only Chrome is officilally supported)
- need to [allow CORS through a Chrome plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) to be able to hit API endpoints.

FEATURES
---
- 9 supported languages
    - Receive execution time and standard output when compiling and running
    - Custom syntax highlighting
    - Live syntax-checking for JavaScript
- Tab functionality
    - Create, delete and switch between different tabs
    - Each tab can have its own independent language mode
- Editor functionality
    - 20+ editor themes
    - [Keyboard shortcuts](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts) for line operations, selection, go to, and find/replace
-  Download current tab contents as a local file

ISSUES
---
See [the issues page](https://github.com/stephenhu3/codepal/issues?q=is%3Aopen+is%3Aissue+label%3Abug+label%3Acodeeditor)

DESIGN PATTERNS
---
JavaScript was structured using the revealing prototype design pattern.
- main.js contains prototype constructor
- subsequent files in /js contain prototype modules 
- main.js must be loaded first to define the CodeEditor function

PROJECT STRUCTURE
---
/ace: contains all Ace Editor related JavaSccript files, including themes and syntax highlighting modes

/js: custom js files for codeeditor module

/spec: all testing related files
- /fixtures: jasmine-jquery html fixture files
- /support: test js dependencies
- *[sSpec].js: testing files

codeeditor.html: main module file

karma.conf.js: config settings for karma test runner

package.json: node json project file with all needed dependencies

RUNNING TESTS
---
1. Run `npm install` to get all required node packages for testing.
2. Get the karma cli package: `npm install -g karma-cli`

To run tests, go to root and run `karma start karma.conf.js`
To view coverage, after running tests, navigate to codepal/coverage and open up index.html

