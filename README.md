PROJECT STRUCTURE
--------------
- index.html: main module file
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
            
RUNNING LOCALLY
-------------
Launch index.html in your browser of choice (only Chrome is officilally supported)
