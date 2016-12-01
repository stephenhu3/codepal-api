/*
 * CodeEditor
 * API Module
 * Author: Alec Ng
 * Dependencies:
 * - ace.js
 * - editor.js
 */

CodeEditor.prototype._api = function(options) {

	var self 	= this,
		domain	= 'http://ec2-52-38-68-51.us-west-2.compute.amazonaws.com:8080',
		userId = "10154533296490027"; // for testing
		// userId 	= options.userId; // window.userId after login

	function getAllSavedSnippets(callbacks) {
		performCallout(
			{
				url			: domain + '/snippets/user',
				contentType	: 'application/json',
				type 		: 'POST',
				dataType	: 'json',
				data 		: JSON.stringify({
					userId	: userId
				})
			},
			callbacks
		);
	}

	function getSnippet(uuid, callbacks) {
		performCallout(
			{
				url			: domain + '/snippets/search',
				contentType	: 'application/json',
				type 		: 'POST',
				dataType	: 'json',
				data 		: JSON.stringify({
					uuid	: uuid
				})
			},
			callbacks
		);
	}

	function createSnippet(sessionObj, newName, callbacks) {
		var snippetObj = generateSnippetObj(sessionObj);
		performCallout(
			{
				url			: domain + '/snippets/',
				contentType	: 'application/json',
				type 		: 'POST',
				dataType	: 'json',
				data 		: JSON.stringify({
					userId		: userId,
					title		: newName,
					language	: snippetObj.lang,
					content 	: snippetObj.contents,
					isPublic	: true
				})
			},
			callbacks
		);
	}

	function updateSnippet(sessionObj, newName, callbacks) {
		var snippetObj = generateSnippetObj(sessionObj);
		performCallout(
			{
				url			: domain + '/snippets/update',
				contentType	: 'application/json',
				type 		: 'POST',
				dataType	: 'json',
				data 		: JSON.stringify({
					uuid		: snippetObj.hash,
					title		: newName,
					userId		: userId,
					language	: snippetObj.lang,
					content 	: snippetObj.contents,
					isPublic	: true
				})
			},
			callbacks
		);
	}

	function deleteSnippet(uuid, callbacks) {
		performCallout(
			{
				url			: domain + '/snippets/delete',
				contentType	: 'application/json',
				type 		: 'POST',
				dataType	: 'json',
				data 		: JSON.stringify({
					uuid	: uuid
				})
			},
			callbacks
		);
	}

	// @SUMMARY	: Converts API response represnting code snippet to a session object
	// @PARAM	: [data]
	// @RETURN	: {hash: uuid, sessionObj: {}}
	function convertResponseToSessionObj(data) {
		var decodedContent 	= atob(data.content);
		return {
			hash		: data.uuid,
			contents	: decodedContent,
			lang		: data.language,
			name		: data.title
		};
	}

	// PRIVATE
	// -------------------------------

	// @SUMMARY	: Converts an editor session object to a snippet object
	// @PARAM	: [hash] corresponding to the sessionObject
	// @PARAM	: [sessionObject] editor session object to be converted
	// @RETURN	: the newly converted snippet obj
	function generateSnippetObj(session) {
		return {
			uuid		: session.hash,	
			lang		: session.sessionObj.lang,
			contents 	: btoa(session.sessionObj.aceSession.getValue()), // base64
			name		: session.sessionObj.name
		};
	}

	// @SUMMARY	: Generic template for jQuery ajax()
	// @PARAM	: (ajaxOptions) {url, contentType, type, dataType, data}
	// @PARAM	: (callbacks) {function done, function fail, function always}
	function performCallout(ajaxOptions, callbacks) {
		$.ajax(
			ajaxOptions
		)
		.done(function(data, textStatus, jqXHR) {
			if (callbacks.done) {
				callbacks.done(data);
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			if (callbacks.fail) {
				callbacks.fail();
			}
			console.log(jqXHR);
			console.log(textStatus);
		})
		.always(function() {
			if (callbacks.always) {
				callbacks.always();
			}
		});
	}

	return {
		getAllSavedSnippets	: getAllSavedSnippets,
		createSnippet		: createSnippet,
		updateSnippet		: updateSnippet,
		deleteSnippet		: deleteSnippet,
		generateSnippetObj	: generateSnippetObj,
		getSnippet			: getSnippet,
		convertResponseToSessionObj	: convertResponseToSessionObj
	};

};
