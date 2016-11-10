RUNNING LOCALLY
-------------
Only Chrome is officially supported.
- Download [this Chrome plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) to allow CORS through Chrome
- Once installed, click the CORS logo on the top right of the browser enable the option 'Enable cross-origin resource sharing'
- Run `npm install http-server -g` 
- Run `http-server` in the root of this project, and navigate to one of the endpoints the command specifies

Features and Modules
---
CodeEditor
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

Project Structure
---
/css: custom css files

/html: contains html for all modules

/js
- initializeLandingPage.js: Tushar is still working on it
    - initializeGoldenLayout.js:
        - creates a config 
        - instantiates a layout object with it
        - calls the following functions to register respective components to layout:
            - integrateCodeEditor(container): code for CodeEditor in js/integrateCodeEditor.js
            - integrateYoutube(container): code for Youtube in js/integrateYoutube.js
            - integrateStackOverflow(container): code for StackOverflow in js/integrateStackOverflow.js
        - finally initialize the layout created above by calling: 
            - myLayout.init();
    - /ace: contains all Ace Editor related JavaSccript files, including themes and syntax highlighting modes
    - /codeeditor : code editor related js files
    
/spec: all testing related files
- /fixtures: jasmine-jquery html fixture files
- /support: test js dependencies
- *[sSpec].js: testing files

karma.conf.js: config settings for karma test runner

package.json: node json project file with all needed dependencies

RUNNING TESTS
-------------
1. Run `npm install` to get all required node packages for testing.
2. Get the karma cli package: `npm install -g karma-cli`

To run tests, go to root and run `karma start karma.conf.js`
To view coverage, after running tests, navigate to codepal/coverage and open up index.html