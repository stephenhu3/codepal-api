describe('execute', function () {

    var fakeRunOK = {
    };

    var fakeCompileErr = {
      error: 'ERROR',
      command: "result",
      data: ""
    };

    var fakeCompileSuccess = {
      error: '',
      command: "result",
      data: "if data - result of evaluation here"
    };

    var fakeTimeout = {
      error: 'ReferenceError: aaa is not defined<br/>',
      command: "result",
      data: "if data - result of evaluation here"
    };

    var timeoutMsg = 'Your code exceeded the maximum run time of 5 '
				+ ' seconds. As a result, some statements may not have been '
				+ ' executed.';
    var executeModule;
    $btn = $('#runBtn');
    $outConsole = $('#outConsole');
    testLang = 'Node.js';

    beforeEach(function () {
        ace.config.set('basePath', 'ace');
        this.result = fixture.load('fixture.html');
        jasmine.Ajax.install();

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
        executeModule = codeEditor.execute;
        editorModule = codeEditor.editor;
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it('outputs warning if there is no code to run', function () {
        var testStr = '';
        editorModule.setEditorText(testStr);
        spyOn(window, 'alert');
        executeModule.run($btn, testLang);
        expect(window.alert).toHaveBeenCalledWith('Please enter at least one statement to run.');
    });

    it('outputs working... status', function () {
        var testStr = 'testString';
        editorModule.setEditorText(testStr);
        executeModule.run($btn, testLang);
        result = $("#outConsole").text();
        expect(result).toBe('Working...');
    });


    it('should make an Ajax request to the correct URL', function () {
        var testStr = 'testString';
        editorModule.setEditorText(testStr);
        executeModule.run($btn);
       expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://api.repl.it:80/eval');
    });


    //TODO the following are imperfect
    //and kind of HACK-y
    it('outputs success data', function () {
      repl = executeModule.initReplClient('nodejs');
      result = fakeCompileSuccess;
      var node = $outConsole;
      outSpy = spyOn($outConsole, 'html');

      spyOn(repl, 'evaluateOnce').and.callFake(function(){
        var d = $.Deferred();
        d.resolve(result);
        //HACK kinda
        node.html(result.data);
        return d.promise(result);
      });
      var testStr = 'testString';
      editorModule.setEditorText(testStr);
      executeModule.run();

      output = node.html();
      expect(outSpy).toHaveBeenCalledWith('if data - result of evaluation here');
      expect(output).not.toBe('Working...');

    });

    it('outputs code run errors', function () {
      repl = executeModule.initReplClient('nodejs');
      result = fakeCompileErr;
      var node = $outConsole;
      outSpy = spyOn($outConsole, 'html');

      spyOn(repl, 'evaluateOnce').and.callFake(function(){
        var d = $.Deferred();
        d.resolve(result);
        //HACK kinda
        node.html(result.error);
        return d.promise(result);
      });
      var testStr = 'testString';
      editorModule.setEditorText(testStr);
      executeModule.run();

      output = node.html();
      expect(outSpy).toHaveBeenCalledWith('ERROR');
      expect(output).not.toBe('Working...');

    });

    it('catches errors with executing repl.evaluateOnce', function () {
      repl = executeModule.initReplClient('nodejs');

      var node = $outConsole;
      outSpy = spyOn($outConsole, 'html');

      spyOn(repl, 'evaluateOnce').and.callFake(function(){
        var d = $.Deferred();
        d.reject();
        //HACK kinda
        node.html('ERROR');
        return d.promise();
      });
      var testStr = 'testString';
      editorModule.setEditorText(testStr);
      executeModule.run();

      output = node.html();
      expect(outSpy).toHaveBeenCalledWith('ERROR');
      expect(output).not.toBe('Working...');

    });
/*
    //TODO - don't know how to implement this
    it('checks if operation exceeded 5 seconds', function () {

    });
    //TODO - don't know how to implement this
    it('runs compilable, runnable code', function () {

    });
*/
    //TODO test each language with hello world - don't know how
});
