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

CodeEditor.prototype._snippet = function() {

	var self = this,
		snippetIds = [];

	// @SUMMARY	: Hits API to create new snippet, changes tab accordingly
	// @PARAM	: (newName) chosen filename from user input
	function create(newName) {
		var sessionObj 	= self.editor.getCurrSessionObj(),
			callbacks	= {
				done : done,
				fail : fail 
			};

		self.api.createSnippet(sessionObj, newName, callbacks);

		function done(data) {
			var uuid = data.uuid;
			addNewSnippetId(uuid);
			self.editor.updateSession(sessionObj.hash, uuid, newName);
			self.ui.updateTab(newName, sessionObj.hash, uuid);
			self.ui.createAppendNewSnippet(uuid, newName);
			self.ui.closeSaveModal();
			alert('Snippet successfully created.');
		}

		function fail() {
			alert("We're sorry, we can't create the snippet at the moment. Please try again.");
		}
	}

	// @SUMMARY	: Get singular saved code snippet
	// @PARAM	: (uuid) of the snippet to get
	function get(uuid) {
		var callbacks = {
			done : done,
			fail : fail
		};
		self.api.getSnippet(uuid, callbacks);

		function done(data) {
			sessionObj = self.api.convertResponseToSessionObj(data);
			self.editor.createNewSession(sessionObj);
		}
		function fail() {
			alert("We're sorry, we can't create fetch snippet at the moment. Please try again.");
		}
	}

	// @SUMMARY	: Gets all of the user's saved codesnippets and generates entries
	// 	in saved snippet UI
	function getAll() {
		var callbacks = {
			done : done,
			fail : fail 
		};
		self.api.getAllSavedSnippets(callbacks);

		function done(data) {
			var snippet;
			for (var i = 0; i < data.length; i++) {
				snippet = data[i];
				addNewSnippetId(snippet.uuid);
				self.ui.createAppendNewSnippet(snippet.uuid, snippet.title);
			}
		}

		function fail() {
			alert("We're sorry, we can't create your snippets at the moment. Please try again.");
		}
	} 

	// @SUMMARY	: Updates an existing saved snippet with contents, name and lang
	// 	and updates tab name accordingly
	function update(newName) {
		var sessionObj 	= self.editor.getCurrSessionObj(),
			callbacks = {
				done	: done,
				fail	: fail
			};
		
		self.api.updateSnippet(sessionObj, newName, callbacks);

		function done(data) {
			var snippetObj = self.api.convertResponseToSessionObj(data);

			self.editor.updateSession(snippetObj.hash, snippetObj.hash, snippetObj.name);
			self.ui.updateTab(snippetObj.name, snippetObj.hash);
			self.ui.updateSnippetName(snippetObj.name, snippetObj.hash);
			self.editor.cacheSnippet(snippetObj);
			self.ui.closeSaveModal();
			alert('Your snippet has been successfully updated!');
		}

		function fail() {
			alert("We're sorry, we can't update the snippet at the moment. Please try again.");
		}
	}

	// @SUMMARY	: deletes an existing saved snippet with contents, name and lang
	// 	and deletes the tab accordingly, if session is loaded
	function remove(uuid) {
		var callbacks = {
			done	: done,
			fail	: fail
		};

		self.api.deleteSnippet(uuid, callbacks);
		
		function done() {
			self.editor.deleteSession(uuid);
			self.ui.deleteSnippet(deleteSnippet);
			removeSnippetId(uuid);
			alert('Your snippet was successfully deleted.');
		}

		function fail() {
			alert("We're sorry, we can't delete the snippet at the moment. Please try again.");
		}
	}

	// @RETURN	: bool of whether hash param is a saved snippet uuid
	function isHashSnippetId(hash) {
		return (snippetIds.indexOf(hash) !== -1);
	}

	// PRIVATE
	// -----------------------------------------

	function addNewSnippetId(uuid) {
		snippetIds.push(uuid);
	}

	function removeSnippetId(uuid) {
		var index = snippetIds.indexOf(uuid);
		if (index !== -1) {
			snippetIds.splice(index, 1);
		}
	}

	return {
		isHashSnippetId : isHashSnippetId,
		create			: create,
		get 			: get,
		getAll 			: getAll,
		update			: update,
		remove			: remove
	};

};