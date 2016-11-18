/* CodeEditor
 * Execute Module
 * Compiles and run code using HackerEarth REST API
 */ 
CodeEditor.prototype._execute = function(options) {

	var self 			= this,
		$outConsole 	= options.$outConsole,
		repl,
		replMap		 	= { // user label hacker earth lang format 
			'Python'		: 'python3',
			'Ruby'			: 'ruby',
			'Java'			: 'java',
			'Go'			: 'go',
			'JavaScript'		: 'nodejs',
			'C#'			: 'csharp',
			'C'				: 'c',
			'C++'			: 'cpp'
		},
		token   = { 
			time_created: 1479420962000,
			msg_mac: 'IWXV2BX035qV1LckeAGHq0gzntGb/tC8PUf1RdpyBSo=' 
		},
		constants = { 
			'COMPILE_OK'	: 'OK',
			'TIME_EXCEEDED'	: 'TLE'
		},
		messages = {
			'TIME_EXCEEDED'	: 'Your code exceeded the maximum run time of 5 ' 
				+ ' seconds. As a result, some statements may not have been '  
				+ ' executed.',
			'RUN_ERROR'		: 'Sorry, something went wrong! Please refresh '
				+ 'and try again.',
		};

	function initReplClient(lang) {
		repl = new ReplitClient('api.repl.it', '80', replMap[lang], token);
		
		// only needed for a persistent connection
		repl.connect().then(
			function() { // success
				alert('REPL connected.');
			},
			function() { // failure
				alert('REPL failed to connect');
			}
		);
	}

	function run($btn) {
		var evalCode = self.editor.getEditorText();
		if (!evalCode) {
			alert('Please enter at least one statement to run.');
			$btn.prop('disabled', false);
			return;
		}
		
		repl.evaluate(
			evalCode,
			{
				stdout: function(out) {
					$outConsole.html(out);
				}
			}
		).then(
			function(result) {
				console.log('result ' + result);
				$btn.prop('disabled', false);
			},
			function(err) {
				console.log('err ' + err);
				$btn.prop('disabled', false);
			}
		);
	}

	// function run($btn, currLang) {
	// 	if (!self.editor.getEditorText()) {
	// 		alert('Please enter at least one statement to run.');
	// 		$btn.prop('disabled', false);
	// 		return;
	// 	}
		
	// 	$outConsole.html('Working...');
	// 	hackerLang = hackerLangMap[currLang];

	// 	$.ajax({
	// 		url: 'https://api.hackerearth.com/v3/code/run/',
	// 		type: 'POST',
	// 		dataType: 'json',
	// 		data: {
	// 			client_secret: clientSecretKey,
	// 			lang: hackerLang,
	// 			source: self.editor.getEditorText()
	// 		},
	// 	})
	// 	.done(function(data, textStatus, jqXHR) {
	// 		// Check for comilation errors
	// 		if (data.compile_status !== constants.COMPILE_OK) {
	// 			var textErr = data.run_status.status_detail + 
	// 				'<br/>' + self.util.translateErr(data.compile_status, hackerLang);
	// 			$outConsole.html(textErr);
	// 			return;
	// 		}

	// 		var resp = data.run_status;
	// 		var consoleOutput = "Time Used: " + resp.time_used + "<br/><br/>";

	// 		// Check if there were runtime errors
	// 		if (resp.stderr) {
	// 		    consoleOutput += self.util.translateErr(resp.stderr, hackerLang);
	// 		} else {
	// 			// Check if operation exceeded 5 seconds
	// 			if (resp.status === constants.TIME_EXCEEDED) {
	// 				consoleOutput += messages.TIME_EXCEEDED;
	// 			}
	// 			consoleOutput += resp.output_html;			
	// 		}
	// 		$outConsole.html(consoleOutput);
	// 	})
	// 	.fail(function(jqXHR, textStatus, errorThrown) {
	// 		$outConsole.html(messages.RUN_ERROR);
	// 	})
	// 	.always(function() {
	// 		$btn.prop('disabled', false);
	// 	});
	// }

	return {
		initReplClient: initReplClient,
		run	: run
	};

};