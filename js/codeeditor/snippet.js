/*
 * CodeEditor
 * Snippet Module
 * Author: Alec Ng
 * Dependencies:
 * - editor.js
 * - ui.js
 * - api.js
 * 
 */

CodeEditor.prototype._api = function(options) {

	var self = this;

	// TODO: to be bound to button
	function createSnippet(name) {

		var sessionObj = self.editor.getCurrSessionObj(),
			snippetObj = self.api.generateSnippetObj(sessionObj);

		self.api.createSnippet(snippetObj.sessionObj, callback);

		function callback(uuid) {
			self.editor.updateSessionHash(sessionObj.hash, uuid, name);
			self.ui.updateTab(name, sessionObj.hash, uuid);
			showSucess();
		}
	}

	function updateSnippet() {
		self.editor.saveCurrSession();

		// update

		// post changes

		// success message
	}

	// PRIVATE
	// ----------------------------------------

	function showSucess() {
		// TODO
		alert('Success!');
	}

	return {

	};

};