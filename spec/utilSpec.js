describe( 'util' , function () {

    var utilModule;

    beforeEach(function () {
        ace.config.set('basePath', 'ace');
        this.result = fixture.load('fixture.html');

        var defaultLang = 'Node.js',
            defaultTheme = 'monokai';

        codeEditor = new CodeEditor({
            eleId       : 'editor',
            lang        : defaultLang,
            theme       : defaultTheme,
            omitCallout : true,
            execute     : {
                $outConsole     : $('#codeeditor #outConsole'),
            },
            util        : {
                $filename       : $('#codeeditor #filename'),
                $extension      : $('#codeeditor #extension'),
            },
            ui          : {
                $tabContainer       : $('#codeeditor #tabContainer'),
                $langContainer      : $('#codeeditor #lang'),
                $themeContainer     : $('#codeeditor #theme'),
                $snippetContainer   : $('#saved-snippets'),
                $saveModal          : $('#fileModal')
            },
            api         : {
                userID          : window.userID
            }
        });
        utilModule = codeEditor.util;
    });
    afterEach(function(){
      $(document).off();
    });

    it('fails to download a snippet', function(){
      spyOn(window, 'alert');
      utilModule.download();
      expect(alert).toHaveBeenCalled();

    });
    //TODO
    it('downloads a snippet', function(){

    });
    //TODO path coverage
    it('observes the size of the code editor window', function(){
      //spyOn(utilModule.targetNodes, 'each');
      utilModule.startObserver();
    });

    it('resiszes the code editor pane', function(){
      var testHeight = 100;
      utilModule.resizeEditor(testHeight);
      expect($('#editor').height()).toBe(testHeight);
    });

    it('prints generic error message when no language specified', function () {
        var dummyError = 'testGarbageError';
        var readableError = 'Compiler has encountered an unknown error!';
        var dummyLanguage = '';
        var translatedError = utilModule.translateErr(dummyError, dummyLanguage);
        expect(translatedError).toBe(readableError);
    });

    it('makes nodejs error message readable', function () {
        var dummynodejsError = 'garbage.jsline1\nevalmachine\nend of message';
        var readableError = 'at<br/>end of message<br/>';
        expect(utilModule.translateErr(dummynodejsError, 'nodejs')).toBe(readableError);
    });

    it('makes c error message readable', function () {
        var dummycError = 'garbage.cline1\n.c\n.c++++++++error: \nend of message';
        var readableError = 'at line1<br/>at <br/>at ++++++++error: <br/>';
        expect(utilModule.translateErr(dummycError, 'c')).toBe(readableError);
        var dummycError = 'garbage';
        var readableError = 'garbage<br/>';
        expect(utilModule.translateErr(dummycError, 'c')).toBe(readableError);
    });

    it('makes C# error message readable', function () {
        var dummyCsharpError = 'garbage.csline1\nend of message';
        var readableError = 'at line1<br/>end of message<br/>';
        expect(utilModule.translateErr(dummyCsharpError, 'csharp')).toBe(readableError);
    });

    //TODO Error handling for each language
    it('makes .. error message readable', function () {

    });

    it('generates a hash', function () {
        var testHash = new Date().getTime();
        expect(utilModule.genHash()).toBe(testHash);
    });

});
