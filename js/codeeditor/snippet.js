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
			alert('Snippet successfully created.');
		}

		function fail() {
			alert('Something failed when creating a snippet...');
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
			alert('Snippet successfully retrieved and restored.');
		}
		function fail() {
			// TODO 
			alert('Snippet GET failed...');
		}
	}

	// @SUMMARY	: Gets all of the user's saved codesnippets and generates entries
	// 			 	in saved snippet UI
	function getAll() {
		var callbacks = {
			done : done,
			fail : fail 
		};
		self.api.getAllSavedSnippets(callbacks);

		function done() {
			/*
				foreach snippet IN response
					self.ui.createAppendNewSnippet(uuid, newName);
					addNewSnippetId();
			*/
			alert('Sucessfully got all saved snippets.');
		}

		function fail() {
			// TODO
			// for UI that holds saved snippets, change text to show some 
			// sort of error message
			alert('Error in getting all saved snippets..');
		}
	} 

	// @SUMMARY	: Updates an existing saved snippet with contents, name and lang
	//				and updates tab name accordingly
	function update(newName) {
		var sessionObj 	= self.editor.getCurrSessionObj(),
			callbacks = {
				done	: done,
				fail	: fail
			};
		
		self.api.createSnippet(sessionObj, newName, callbacks);

		function done() {
			self.editor.updateSession(sessionObj.hash, sessionObj.hash, newName);
			self.ui.updateTab(newName, sessionObj.hash, uuid);
			self.ui.updateSnippetName(newName, sessionObj.hash);
			// TODO
			alert('Updating snippet successful!');
		}

		function fail() {
			alert('Error in updating code snippet...');
		}
	}

	// @SUMMARY	: deletes an existing saved snippet with contents, name and lang
	//				and deletes the tab accordingly, if session is loaded
	function remove(uuid) {
		var callbacks = {
			done	: done,
			fail	: fail
		};

		self.api.deleteSnippet(uuid);
		
		function done() {
			self.editor.deleteSession(uuid);
			self.ui.deleteSnippet(deleteSnippet);
			removeSnippetId(uuid);
			// TODO
			alert('deletion successful!');
		}

		function fail() {
			alert('Error in deleting code snippet...');
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
		update			: update
	};

};