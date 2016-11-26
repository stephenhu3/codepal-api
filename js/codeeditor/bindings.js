/*
 * CodeEditor
 * Binding Module
 * Author: Alec Ng
 * Dependencies:
 * - editor.js
 * - ui.js
 * - execute.js
 */

 CodeEditor.prototype._bindings = function() {

 	var self = this;

 	// TAB
 	// ------------------------------------------

 	function tabSwitch($tab) {
 		var hash = $tab.attr('data-editorhash');
			
		if ($tab.hasClass('active')) {
			return;
		}
		self.editor.switchSession(hash);
		self.ui.switchActiveTab(hash);
 	}

 	function tabDelete($tab) {
 		var hash = $tab.attr('data-editorhash');
		self.editor.deleteSession(hash);
	}

	function tabAdd() {
		self.editor.createNewSession();
	}

	// BTN
 	// ------------------------------------------

	function btnRun($btn) {
		$btn.prop('disabled', true);
		self.execute.run($btn);
	}

	// SELECT
 	// ------------------------------------------

 	function selLang($sel) {
 		var lang = $sel.find('option:selected').val();
		self.editor.setEditorLang(lang);
		self.execute.initReplClient(lang);
 	}

 	function selTheme($sel) {
 		var theme = $sel.find('option:selected').val();
	    self.editor.setEditorTheme(theme);
 	}

 	// SNIPPET
 	// ------------------------------------------

 	// @SUMMARY	: If snippet hasn't been retrieved via API, GET it
 	//			  Switch current session to chosen snippet
 	function snippetGet($snippet) {
 		var uuid = $snippet.attr('data-uuid');
 		
 		if (self.editor.isSessionLoaded(uuid)) {
 			return;
 		}
 		if (self.editor.isSessionCached(uuid)) {
 			self.editor.switchSession(uuid);
 			return;
 		}

 		self.snippet.get(uuid);
 	}

 	function snippetDelete($snippet) {
 		var uuid = $snippet.attr('data-uuid');
 		self.snippet.remove(uuid);
 	}

 	// @SUMMARY	: If snippet hasn't been saved to db, call create
 	//				If it has, then call update
 	function snippetSave() {
 		var currHash = self.editor.getCurrSessionObj().hash;
 		var name = self.util.getFilename();

 		if (isHashSnippetId(currHash)) {
 			self.snippet.update(name);
 		} else {
 			self.snippet.create(name);
 		}

 	}

	return {
		tabSwitch	: tabSwitch,
		tabDelete	: tabDelete,
		tabAdd		: tabAdd,

		btnRun		: btnRun,

		selLang		: selLang,
		selTheme	: selTheme,

		snippetGet		: snippetGet,
		snippetDelete	: snippetDelete,
		snippetSave		: snippetSave	
	};

 };