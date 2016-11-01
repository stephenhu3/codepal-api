Project Structure

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

To run codeeditor locally in Chrome, need to use
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
to be able to hit HackerEarth API endpoints.

To run tests, install http-server through npm, run http-server in route of project, go to local port and navigate to spec/SpecRunner.html