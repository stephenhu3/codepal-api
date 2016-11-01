describe("editor", function() {
	
	var codeEditor;

	beforeEach(function() {
		ace.config.set('basePath', '../ace');
		this.result = fixture.load('fixture.html');
		codeEditor = new CodeEditor({
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

	it('should initialize correctly', function() {
		codeEditor.editor.initEditor();
	});

});