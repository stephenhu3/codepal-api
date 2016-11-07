PROJECT STRUCTURE
--------------
- index.html: main module file
- karma.conf.js: config settings for karma test runner
- package.json: node json project file with all needed dependencies

- /ace: contains all Ace Editor related JavaSccript files, including themes and syntax highlighting modes
- /css: custom css files
- /js: custom js files to:
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
    - /codeeditor : code editor related js files
- /spec: all testing related files
    - /fixtures: jasmine-jquery html fixture files
    - /support: test js dependencies
    - *[sSpec].js: testing files
            
RUNNING LOCALLY
-------------
Launch index.html in your browser of choice (only Chrome is officilally supported)
- need to [allow CORS through a Chrome plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) to be able to hit HackerEarth API endpoints.

DESIGN PATTERNS
-------------
CodeEditor JavaScript was structured using the revealing prototype design pattern.
- main.js contains prototype constructor
- subsequent files in /js contain prototype modules 

RUNNING TESTS
-------------
1. Run npm install to get all required node packages for testing.
2. Get the karma cli package: npm install -g karma-cli

To run tests, go to root and type in 'karma start karma.conf.js'
To view coverage, after running tests, navigate to codepal/coverage and open up index.html

