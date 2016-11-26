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

		if (self.editor.deleteSession(hash)) {
			var newHash = self.ui.restoreAdjacentTab(hash);
			self.editor.switchSession(newHash);
			self.ui.destroyTab(hash);
		}
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

	function btnSave() {
		alert('Coming soon!');
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

	return {
		tabSwitch	: tabSwitch,
		tabDelete	: tabDelete,
		tabAdd		: tabAdd,
		btnRun		: btnRun,
		btnSave		: btnSave,
		selLang		: selLang,
		selTheme	: selTheme
	};

 };