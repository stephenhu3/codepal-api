describe( 'execute' , function () {

    var executeModule;

    beforeEach(function () {
        ace.config.set('basePath', 'ace');
        this.result = fixture.load('fixture.html');

        var codeEditor = new CodeEditor({
            eleId: 'editor',
            lang: 'JavaScript',
            execute: {
                $outConsole: $('#outConsole'),
            },
            editor: {
                $filename: $('#filename'),
                $extension: $('#extension'),
                theme: 'monokai'
            },
            ui: {
                $tabContainer: $('#tabContainer'),
                $langContainer: $('#lang')
            }
        });
        executeModule = codeEditor.execute;
    });





});