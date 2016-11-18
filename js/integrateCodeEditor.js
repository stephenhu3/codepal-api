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

		var codeEditor = new CodeEditor({
			eleId		: 'editor',
			lang 		: 'JavaScript',
			execute		: {
				$outConsole		: $('#outConsole'),
			},
			editor 		: {
				$filename 		: $('#filename'),
				$extension		: $('#extension'),
				theme 			: 'monokai'
			},
			ui   		: {
				$tabContainer	: $('#tabContainer'),
				$langContainer	: $('#lang')
			}	
		});

		// Bindings
		$('[data-editoraction="add"]').click(codeEditor.editor.createNewSession);

		$('#codeeditor #runBtn').click(function() {
			$(this).prop('disabled', true);
			codeEditor.execute.run($(this));
		});
		$('#codeeditor #saveBtn').click(function() { // TODO: Hook up
			alert('Code snippet save feature -- coming soon...');
		});
		$('#codeeditor #downloadBtn').click(codeEditor.editor.download);
		$('#codeeditor #lang').on('change', function() {
			var lang = $(this).find('option:selected').val();
			codeEditor.editor.setEditorLang(lang);
			codeEditor.execute.initReplClient(lang);
		});
		$('#theme').on('change', function () {
		    var theme = $(this).find('option:selected').val();
		    codeEditor.editor.setEditorTheme(theme);
		});

	}

};