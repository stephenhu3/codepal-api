/*
 * CodeEditor
 * API Module
 * Author: Alec Ng
 * 
 */

CodeEditor.prototype._api = function(options) {

	var self = this,
		savedSnippets;

	// @SUMMARY	: GETS all saved code snippets for the logged in user
	// @PARAM	: [userId] logged in user id
	function getAllSavedSnippets(userId) {
		$.ajax({
			url: '/domain/snippets?{userId}',
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data, textStatus, jqXHR) {
			// TODO: iterate through data for all saved snippets and store
			// 	in savedSnippets
			// TODO: call some method to populate the UI that holds all saved snippets
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			// TODO: how can this done with graceful degredation? 
			// Populate UI that holds saved snippets with error message?
			alert('Failed getting saved snippets');
		})
		.always(function() {
			// TODO: Let system know this async call is done
		});
	}

	// @SUMMARY	: POSTS a new snippet to be saved against the user, and adds it to the saved snippet UI
	// @PARAM	: [snippetObj] a converted sessionObj returned from generateSnippetObj()
	// @PARAM	: [userId] logged in user id
	function createSnippet(snippetObj, userId) {
		$.ajax({
			url: '/path/to/file',
			type: 'GET',
			dataType: 'json',
			data: {
				userId		: userId,
				title		: snippetObj.name,
				uuid		: snippetObj.hash,
				lang		: snippetObj.lang,
				contents 	: snippetObj.contents
			},
		})
		.done(function(data, textStatus, jqXHR) {
			// TODO: add saved snippet to UI containing all UI
			// TODO: success message for user
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			// TODO: error message for user
		});
	}

	// @SUMMARY	: updates a previously saved code snippet's language and contents
	// @PARAM	: [uuid] snippet's unique id
	// @PARAM	: [content] new editor contents to be saved
	// @PARAM	: [lang] new editor lang to be saved
	function updateSnippet(uuid, content, lang) {
		$.ajax({
			url: '/snippets/',
			type: 'POST',
			dataType: 'json',
			data: {
				uuid	: uuid,
				content : content,
				lang	: lang
			},
		})
		.done(function(data, textStatus, jqXHR) {
			// TODO: success message for user
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			// TODO: error message for user
			alert('Failed getting saved snippets');
		});
	}

	// @SUMMARY	: deletes a previously saved code snippet from the db and removes it from the UI
	// @PARARM	: [uuid] snippet's unique ID
	// @PARAM	: [userId] logged in user's ID
	function deleteSnippet(uuid, userId) {
		$.ajax({
			url: '/snippets/',
			type: 'POST',
			dataType: 'json',
			data: {
				userId	: userId,
				uuid	: uuid,
			},
		})
		.done(function(data, textStatus, jqXHR) {
			// TODO: remove code snippet from UI container
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			// TODO: error message for user
		});
	}

	// @SUMMARY	: Converts an editor session object to a snippet object
	// @PARAM	: [hash] corresponding to the sessionObject
	// @PARAM	: [sessionObject] editor session object to be converted
	// @RETURN	: the newly converted snippet obj
	function generateSnippetObj(hash, sessionObject) {
		return {
			uuid		: hash,	
			lang		: sessionObject.lang,
			contents 	: sessionObject.aceSession.getValue(),
			name		: sessionObject.name
		};
	}

	return {
		getAllSavedSnippets	: getAllSavedSnippets,
		createSnippet		: createSnippet,
		updateSnippet		: updateSnippet,
		deleteSnippet		: deleteSnippet,
		generateSnippetObj	: generateSnippetObj
	};

};
