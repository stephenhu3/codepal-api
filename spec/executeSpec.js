describe('execute', function () {

    var fakeRunOK = {
    };

    var fakeCompileErr = {
      error: 'ReferenceError: aaa is not defined<br/>',
      command: "result",
      data: "if data - result of evaluation here"
    };

    var fakeRunErr = {
      error: 'ReferenceError: aaa is not defined<br/>',
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

/*
    it('should make an Ajax request to the correct URL', function () {
        var testStr = 'testString';
        editorModule.setEditorText(testStr);
        executeModule.run($btn);
*/
        //  var doneFn = jasmine.createSpy("success");
        /*
        var xhr = $.ajax({url: 'https://api.hackerearth.com/v3/code/run/',
            type: 'POST',
            dataType: 'json',
            data: {
                client_secret: executeModule.clientSecretKey,
                lang: hackerLang,
                source: testStr
            }});

        xhr.onreadystatechange = function (args) {
            if (this.readyState == this.done) {
                doneFn(this.responseText);
            }
        };
        */
  /*      expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://api.repl.it:80/eval');
    });
*/

//TODO all following tests fail
    it('checks for compile errors', function () {
        spyOn($, 'ajax').and.callFake(function (req) {
          var d = $.Deferred();
          d.resolve(fakeCompileErr);
          return d.promise();
      });

      var testStr = 'testString';
      editorModule.setEditorText(testStr);
      executeModule.run($btn);

      result = $("#outConsole").text();
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://api.repl.it:80/eval');
      expect(result).toBe('something');
    });

    it('checks for runtime errors', function () {
       spyOn($, 'ajax').and.callFake(function (req) {
            var d = $.Deferred();
            d.resolve(fakeRunErr);
            return d.promise();
        });
        var testStr = 'testString';
        editorModule.setEditorText(testStr);
        executeModule.run($btn, testLang);
        result = $("#outConsole").text();
        expect(result).toBe('');
    });

    it('checks if operation exceeded 5 seconds', function () {
        spyOn($, 'ajax').and.callFake(function (req) {
            var d = $.Deferred();
            d.resolve(fakeTimeout);
            return d.promise();
        });

        var testStr = 'testString';
        editorModule.setEditorText(testStr);
        executeModule.run($btn, testLang);
        result = $("#outConsole").text();
        expect(result).toBe('Time Used: '
            + fakeTimeout.run_status.time_used
            + timeoutMsg);
    });

    it('runs compilable, runnable code', function () {
        spyOn($, 'ajax').and.callFake(function (req) {
            var d = $.Deferred();
            d.resolve(fakeRunOK);
            return d.promise();
        });
        var testStr = 'testString';
        editorModule.setEditorText(testStr);
        executeModule.run($btn, testLang);
        result = $("#outConsole").text();
        expect(result).not.toBe('Working...');
    });

    //TODO test each language with hello world
});
