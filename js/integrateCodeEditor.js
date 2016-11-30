var codeEditor;

var integrateCodeEditor = function (container){

	// Load HTML
	$.ajax({
	    type: 'GET',
	    url: 'html/codeeditor.html'
	})
    .done(function(data, textStatus, jqXHR) {
		container.getElement().html(data);
		initCodeEditor();
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		throw 'Code Editor module could not be loaded.';
	});

	function initCodeEditor() {

		// init
		var defaultLang = 'Node.js',
			defaultTheme = 'monokai';

		codeEditor = new CodeEditor({
			eleId		: 'editor',
			lang 		: defaultLang,
			theme		: defaultTheme,
			execute		: {
				$outConsole		: $('#codeeditor #outConsole'),
			},
			util		: {
				$filename 		: $('#codeeditor #filename'),
				$extension		: $('#codeeditor #extension'),
			},
			ui   		: {
				$tabContainer	: $('#codeeditor #tabContainer'),
				$langContainer	: $('#codeeditor #lang'),
				$themeContainer	: $('#codeeditor #theme'),
			},
			api			: {
				userID			: window.userID
			}
		});

		// Bindings
		$('#codeeditor [data-editoraction="add"]').click(
			codeEditor.bindings.tabAdd);

		$('#codeeditor #runBtn').click(function() {
			codeEditor.bindings.btnRun($(this));
		});

		$('#codeeditor #saveBtn').click(
			codeEditor.bindings.snippetSave);

		$('#codeeditor #downloadBtn').click(
			codeEditor.util.download);

		//Set up observer for resizing coede editor
		codeEditor.util.startObserver();

		$('#codeeditor #lang').on('change', function() {
			codeEditor.bindings.selLang($(this));
		});

		$('#codeeditor #theme').on('change', function () {
		   codeEditor.bindings.selTheme($(this));
		});

	}

};
