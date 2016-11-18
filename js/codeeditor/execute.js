/* CodeEditor
 * Execute Module
 * Compiles and run code using HackerEarth REST API
 */ 
CodeEditor.prototype._execute = function(options) {

	var self 			= this,
		$outConsole 	= options.$outConsole,
		repl,
		replMap		 	= { // user label hacker earth lang format 
			'C'				: 'c',
			'C#'			: 'csharp',
			'C++'			: 'cpp',
			'C++11'			: 'cpp11',
			'Go'			: 'go',
			'Java'			: 'java',
			'Node.js'		: 'nodejs',
			'Python'		: 'python',
			'Python 3'		: 'python3',
			'Ruby'			: 'ruby'
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


	// @SUMMARY	: instantiates a new ReplClient everytime we want to swtich languages
	// @PARAM	: [lang] label of language we want to compile and run
	// @RETURN	: the new ReplClient instance
	function initReplClient(lang) {
		repl = new ReplitClient('api.repl.it', '80', replMap[lang], token);
		return repl;
	}

	// @SUMMARY	: Compiiles and runs the code in the current editor instance and populates
	//				the output window with any errors and stdout
	// @PARAM	: [$btn] the run button to control disable timing
	function run($btn) {
		var evalCode = self.editor.getEditorText();
		if (!evalCode) {
			alert('Please enter at least one statement to run.');
			$btn.prop('disabled', false);
			return;
		}
		
		$outConsole.html('Working...');
		repl.evaluateOnce(
			evalCode,
			{
				stdout: function(out) {
					$outConsole.html(out);
				},
				time: 5000,
				callback: function() {
					return true;
				}
			}
		).then(
			function(result) {
				/*
					{ 
						command: "result"
						data: "if data - result of evaluation here"
						error: "if error - error message here"
					}
				*/
				// TODO: Parse errors
				if (result.error) {
					$outConsole.html('ERR: ' + result.error);
				}
				if (result.data !== 'undefined') {
					$outConsole.html('DATA: ' + result.data);
				}

				console.log('result ' + result);
				$btn.prop('disabled', false);
			},
			function(err) {
				console.log('err ' + err);
				$output.html(messages.RUN_ERROR);
				$btn.prop('disabled', false);
			}
		);
	}

	return {
		initReplClient: initReplClient,
		run	: run
	};

};