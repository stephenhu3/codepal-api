describe('execute', function () {

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
        "compile_status": "",
        "run_status": {
            "status": "AC",
            "time_used": "0.1005",
            "memory_used": "64",
            "output": "Hello",
            "output_html": "Hello",
            "signal": "OTHER",
            "status_detail": "COMPILE ERR",
            "time_limit": 5,
            "memory_limit": 262144
        },
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
            "status_detail": "N/A",
            "time_limit": 5,
            "memory_limit": 262144,
            "stderr" : "Generic runtime error message"
        },
        "web_link": "http://code.hackerearth.com/7e5cfbe"
    }; 

    var fakeTimeout = {
        "errors": {},
        "id": "7e5cfbe",
        "code_id": "7e5cfbe",
        "message": "OK",
        "compile_status": "OK",
        "run_status": {
            "status": "TLE",
            "time_used": "5.01",
            "memory_used": "64",
            "output": "",
            "output_html": "",
            "signal": "OTHER",
            "status_detail": "N/A",
            "time_limit": 5,
            "memory_limit": 262144           
        },
        "web_link": "http://code.hackerearth.com/7e5cfbe"
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

        var doneFn = jasmine.createSpy("success");
        
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
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('https://api.hackerearth.com/v3/code/run/');
    });
     
    it('checks for compile errors', function () {       
        spyOn($, 'ajax').and.callFake(function (req) {
            var d = $.Deferred();
            d.resolve(fakeCompileErr);
            return d.promise();
        });
        var testStr = 'testString';
        editorModule.setEditorText(testStr);
        executeModule.run($btn, testLang);
        result = $("#outConsole").text();
        expect(result).toBe(fakeCompileErr.run_status.status_detail);
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
        expect(result).toBe('Time Used: '
            + fakeRunErr.run_status.time_used
            + fakeRunErr.run_status.stderr);
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

