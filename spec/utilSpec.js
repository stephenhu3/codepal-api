describe( 'util' , function () {

    var utilModule;

    beforeEach(function () {
        ace.config.set('basePath', 'ace');
        this.result = fixture.load('fixture.html');

        var codeEditor = new CodeEditor({
            eleId: 'editor',
            lang: 'Node.js',
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
                $langContainer: $('#lang'),
                $themeContainer : $('#theme')
            }
        });
        utilModule = codeEditor.util;
    });

    it('makes unspecified language error message readable', function () {
        var dummyError = 'error line 1\nerror line 2\nerror line 3\nend of error';
        var readableError = 'error line 1<br/>error line 2<br/>error line 3<br/>end of error<br/>';
        var dummyLanguage = '';
        var translatedError = utilModule.translateErr(dummyError, dummyLanguage);
        expect(translatedError).toBe(readableError);
    });

    it('makes C# error message readable', function () {
        var dummyCsharpError = 'garbage.csline1\nend of message';
        var readableError = 'line1<br/>end of message<br/>';
        expect(utilModule.translateErr(dummyCsharpError, 'CSHARP')).toBe(readableError);
    });

    //TODO Error handling for each language
    it('makes .. error message readable', function () {

    });
    
    it('generates a hash', function () {
        var testHash = new Date().getTime();
        expect(utilModule.genHash()).toBe(testHash);
    });

});