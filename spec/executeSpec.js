describe('execute', function () {
    var configuration = {
        url: "https://api.hackerearth.com/v3/code/run/",
        remainingCallTime: 30000,
    };

    var fakeCompileOK = {
        "errors": {},
        "id": "7e5cfbe",
        "code_id": "7e5cfbe",
        "message": "OK",
        "compile_status": "OK",
        "web_link": "http://code.hackerearth.com/7e5cfbe"
    };

    var fakeRunOK = {
        "errors": {}, 
        "id": "7e5cfbe", 
        "code_id": "7e5cfbe", 
        "message": "OK", 
        "compile_status": "OK",
        "run_status": {"status": "AC",
            "time_used": "0.1005",
            "memory_used": "64",
            "output": "Hello", 
            "output_html": "Hello",
            "signal": "OTHER",
            "status_detail": "N/A",
            "time_limit": 5,
            "memory_limit": 262144},
            "web_link": "http://code.hackerearth.com/7e5cfbe"    
    };

    var fakeCompileErr = {
        "errors": {},
        "id": "7e5cfbe",
        "code_id": "7e5cfbe",
        "message": "OK",
        "compile_status": "COMPILE ERROR",
        "web_link": "http://code.hackerearth.com/7e5cfbe"
    };

    var fakeRunErr = {
        "errors": {},
        "id": "7e5cfbe",
        "code_id": "7e5cfbe",
        "message": "OK",
        "compile_status": "OK",
        "run_status": {
            "status": "AC",
            "time_used": "0.1005",
            "memory_used": "64",
            "output": "Hello",
            "output_html": "Hello",
            "signal": "OTHER",
            "status_detail": "RUN ERROR",
            "time_limit": 5,
            "memory_limit": 262144
        },
        "web_link": "http://code.hackerearth.com/7e5cfbe"
    };

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

        $btn = $('#runBtn');
        $outConsole = $('#outConsole');
        executeModule = codeEditor.execute;
        editorModule = codeEditor.editor;
        testLang = 'C';
    });
    /*
        var testStr = '(function() { console.log("test"); })();';
		editorModule.setEditorText(testStr);
                       spyOn( $, "ajax" ).and.CallFake( function (params) {
                 params.error({foo: "bar"});
        });

        spyOn($, "ajax").and.CallFake(function (params) {
            params.success({ foo: 'bar' });
        });
    */
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

    it('sends code to HackerEarth API', function () {
        //TODO
        spyOn($, "ajax");
        var testStr = "testString";
        executeModule.run($btn, testLang);
        expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(configuration.url);
    });

    it('checks for compilation errors', function () {
        //TODO
    });

    it('checks for runtime errors', function () {
        //TODO
    });

    it('checks if operation exceeded 5 seconds', function () {
        //TODO
    });

    it('fails to run', function () {
        //TODO
    });

    it('runs compilable, runnable code', function () {
        //TODO
    });

});