/* CodeEditor
 * Execute Module
 * Compiles and run code using Repl.it REST API
 */ 
CodeEditor.prototype._execute = function(options) {

	var self 			= this,
		$outConsole 	= options.$outConsole,
		repl,
		replMap		 	= { // user label -> repl.it lang
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
			time_created: 1480401579000,
			msg_mac: 'GINiXV8Vztcu3DsbdqFCjq0EXVgbj3rR/G6Cn8GuIxA=' 
		},
		constants = { 
			'COMPILE_OK'	: 'OK',
			'TIME_EXCEEDED' : 'TLE',
            'MAX_TIME'      : 5000
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
	    var output = '';

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
				    output += 'Console output: ' + '<br/>' + out + '<br/><br/>';
				},
				timeout: 
                    {
                        time: constants.MAX_TIME,
                        callback: function () {
                            output += messages.TIME_EXCEEDED;                            
                            return true;
				    }
				}
			}
		).then(
			function success(result) {
				/*
					{ 
						command: "result"
						data: "if data - result of evaluation here"
						error: "if error - error message here"
					}
				*/
				
				if (result.error.length!==0) {				   			    
				    output += 'ERROR:  '
                        + '<br/>'
                        + self.util.translateErr(result.error, replMap[self.ui.getCurrLang()]) 
                        + '<br/>';
				}
             
				else {
				    output += 'SUCCESS: <br/>'
                        + result.data                        
				}
				
				$outConsole.html(output);
				$btn.prop('disabled', false);
			},

			function error(err) {				
			    $outConsole.html(output);
				$btn.prop('disabled', false);
			}
		);
	}

	return {
		initReplClient: initReplClient,
		run	: run
	};

};