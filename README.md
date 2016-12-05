#CodePal Web Interface

Usage and Installation
---
**Only Google Chrome is officially supported.**

Running on website: http://codepal.ca

Running Locally:
- Clone this repository
- Install the http-server node module using `npm install http-server -g`
- Run `http-server` in the root of this project, and navigate to one of the endpoints the command specifies
 
Features and Modules
---
**Golden Layout**
- Modular components for CodeEditor, Youtube and StackOverflow
- Resize individual components for workspace customization

**YouTube**
- Search and display youtube videos from inside goldenLayout Components
- Play selected video

**StackOverflow**
- Search and display StackOverflow questions
- Auto search compilation errors

**CodeEditor**
- 10 supported languages
    - Compile and run code in the browser
    - Custom syntax highlighting
    - Live syntax-checking for JavaScript
- Tab functionality
    - Create, delete and switch between different tabs
    - Each tab can have its own independent language mode
- Editor functionality
    - 20+ editor themes
    - [Keyboard shortcuts](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts) for line operations, selection, go to, and find/replace
-  Download current tab contents as a local file
-  Save tabs as "snippets" to be used again later
-  Load and update previously saved snippets


Project Structure
---
/css: custom css files

/html: contains html for all modules

/js
- initialization scripts for Golden Layout and Facebook login integration
- /ace: contains all Ace Editor related JavaSccript files, including themes and syntax highlighting modes
- /codeeditor : code editor module  js files
    
/spec: all testing related files
- /fixtures: jasmine-jquery html fixture files
- /support: test js dependencies
- *[sSpec].js: testing files

karma.conf.js: config settings for karma test runner

package.json: node json project file with all needed dependencies

Running Tests
-------------
1. Run `npm install` to get all required node packages for testing.
2. Get the karma cli package: `npm install -g karma-cli`
3. To run tests, go to root and run `karma start karma.conf.js` 
To view coverage, after running tests, navigate to codepal/coverage and open up index.html

# CodePal REST API

See the [api branch](https://github.com/stephenhu3/codepal/tree/api) for complete documentation.
