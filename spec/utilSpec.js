describe( 'util' , function () {

    var utilModule;

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
        utilModule = codeEditor.util;
    });

    it('checks if param is integer', function () {
        var integer =  1;
        expect(utilModule.isInteger(integer)).toBe(true);
        var rational = 0.5;
        expect(utilModule.isInteger(rational)).toBe(false);
    });


});