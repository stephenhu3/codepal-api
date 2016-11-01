beforeEach(function () {

    loadFixtures('fixture.html');

    var codeEditor = new CodeEditor({
        eleId       : 'editor',
        lang        : 'JavaScript',
        execute     : {
            $outConsole     : $('#outConsole'),
        },
        editor      : {
            $filename       : $('#filename'),
            $extension      : $('#extension'),
            theme           : 'monokai'
        },
        ui          : {
            $tabContainer   : $('#tabContainer'),
            $langContainer  : $('#lang')
        }
    });

});