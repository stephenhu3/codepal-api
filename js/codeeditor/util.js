/*
 * CodeEditor
 * Util Module
 * Dependencies:
 * - editor.js
 */

CodeEditor.prototype._util = function(options) {

    var self 		= this,
    	$filename 	= options.$filename,
    	$extension 	= options.$extension,
		messages 	= {
			'COMPILER_ERR'	: 'Compiler has encountered an unknown error!',
		    'RUNTIME_ERR'	: 'Error during runtime!'
		},
		extensionMap = {
			'C'				: '.c',
			'C#'			: '.cs',
			'C++'			: '.cpp',
			'C++11'			: '.cpp',
			'Go'			: '.go',
			'Java'			: '.java',
			'Node.js'		: '.js',
			'Python'		: '.py',
			'Python 3'		: '.py',
			'Ruby'			: '.rb',
		};

	// @SUMMARY	: downloads curr session's contents to the user's local machine
	function download() {
		// lib will automatically replace any non-valid filename chars with '-'
		var filename = $filename.val();
		if (!$filename.val()) {
			alert('Please enter a filename.');
			return;
		}
		var text = self.editor.getEditorText(),
			blob = new Blob([text], {
				type: "text/plain;charset=utf-8"
			}),
			currSession = self.editor.getCurrSessionObj(),
			lang = extensionMap[currSession.sessionObj.lang];

		saveAs(blob, filename + lang);
	}

	// @SUMMARY	: changes extension in save modal according to lang chosen
	// @PARAM	: (lang) to match with extensionMap
	function changeExtension(lang) {
		$extension.html(extensionMap[lang]);
	}

	// @RETURN	: filename input value
	function getFilename() {
		return $filename.val();
	}

	function setFilename(name) {
		$filename.val(name);
	}

	function translateErr(msg, lang) {
	 
	    var lineArray = msg.split("\n");
	    output = '';
	    newLine = '<br/>'
	    numLines = lineArray.length;
	    /*TODO
            Language specific compiler/runtime error handling
            'C'				: 'c', -done
			'C#'			: 'csharp', -done
			'C++'			: 'cpp', -done
			'C++11'			: 'cpp11', -done
			'Go'			: 'go', -done
			'Java'			: 'java', -done
			'Node.js'		: 'nodejs', -done
			'Python'		: 'python', -done
			'Python 3'		: 'python3', -done
			'Ruby'			: 'ruby'
        */
	    if (lang == 'nodejs') {	        
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('evalmachine');	            
	            if (index != -1) {
                    //identify error line
	                output += 'at' + lineArray[i].substring(index + 12) + newLine;
	                { continue; }
	            }
	            index = lineArray[i].search('.js');	           
	            if (index != -1) {
	                //don't print this line
	            }
	            else {
	                //output relevant error type information
	                output += lineArray[i] + newLine;
	                errorSearch(lineArray[i]);
	            }
	        }
	    }
	    if (lang == 'c') {
	        for (i = 0; i < numLines; i++) {

	            var index = lineArray[i].search('.c');
	            //output += index + '<br/>'; //Debug
	            if (index != -1) {
	                //identify error line
	                output += 'at ' + lineArray[i].substring(index + 2) + newLine;
	                //{ continue; }
	                index = lineArray[i].search('error: ');
	                if (index != -1) {
	                    //output += 'searching for ' + lineArray[i].substring(index + 7) + newLine; //debug
	                    errorSearch(lineArray[i].substring(index + 7));
	                    break;
	                }
	            }
	           
	            else {
	                //output relevant error type information
	                output += lineArray[i] + newLine;
	                //output += 'searching for ' + lineArray[i] + newLine; //debug
	                errorSearch(lineArray[i]);
	            }
	        }
	    }
	    if (lang == 'csharp') {
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('.cs');
	            
	            if (index != -1) {
	                //identify error line
	                output += 'at ' + lineArray[i].substring(index + 3) + newLine;	                
	                index = lineArray[i].search('error ');
	                if (index != -1) {	                    
	                    errorSearch(lineArray[i].substring(index + 6));
	                    break;
	                }
	            }
	            else {
	                //output relevant error type information
	                output += lineArray[i] + newLine;	                
	                errorSearch(lineArray[i]);
	            }
	        }
	    }
	    if (lang == 'cpp' || lang == 'cpp11') {
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('.cpp');	            
	            if (index != -1) {
	                //identify error line
	                output += 'at ' + lineArray[i].substring(index + 4) + newLine;	                
	                index = lineArray[i].search('error: ');
	                if (index != -1) {	                    
	                    errorSearch(lineArray[i].substring(index + 6));
	                    break;
	                }
	            }
	            else {
	                //output relevant error type information
	                output += lineArray[i] + newLine;	                
	                errorSearch(lineArray[i]);
	            }
	        }
	    }
	    if (lang == 'go') {
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('.go:');
	            if (index != -1) {
	                //identify error line
	                output += 'at ' + lineArray[i].substring(index + 4) + newLine;
	               
                    //TODO - more elegant handling of this
	                errorSearch(lineArray[i].substring(index + 8));
	                break;
	            }
	            else {
	                //output relevant error type information
	                output += lineArray[i] + newLine;
	                errorSearch(lineArray[i]);
	            }
	        }
	    }
	    if (lang == 'java') {
            //TODO instantiate java with a precooked main class and main method as follows
	        output += 'NOTE - Java programs run in CodePal must have the form '
                + newLine
	            + '  public class Main{'
                + newLine
                + '  public static void main(String[] args){'
                + newLine
                + '      }'                
                + '   }'
                +newLine;
                
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('.java:');

	            if (index != -1) {
	                //identify error line
	                output += 'at ' + lineArray[i].substring(index + 6) + newLine;
	                index = lineArray[i].search('error: ');
	                if (index != -1) {
	                    errorSearch(lineArray[i].substring(index + 7));
	                    break;
	                }
	            }
	            else {
	                //output relevant error type information
	                output += lineArray[i] + newLine;
	                errorSearch(lineArray[i]);
	            }
	        }
	    }
	    if (lang == 'python' || lang == 'python3') {
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('line ');

	            if (index != -1) {
	                //identify error line
	                output += 'at ' + lineArray[i].substring(index + 5) + newLine;	                
	                {continue;}
	            }
	            index = lineArray[i].search('Error: ');
	            if (index != -1) {
	                output += lineArray[i] + newLine;	                
	                errorSearch(lineArray[i]);
	                break;
	            }
	            index = lineArray[i].search('Warning: ');
	            if (index != -1) {
	                output += lineArray[i] + newLine;	                
	                errorSearch(lineArray[i]);
	                break;
	            }
	            else {
	                //do nothing
	            }
	        }
	    }
        //TODO - more research and cleanup on Ruby errors and exceptions
	    if (lang == 'ruby') {
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('repl');
	            if (index != -1) {
	                //identify error line
	                output += 'at ' + lineArray[i].substring(index+ 6) + newLine;	                
	                index = lineArray[i].search(': ');
	                if (index != -1) {	                   
	                    errorSearch(lineArray[i].substring(index +2));
	                    break;
	                }
	            }                
	            else {
	                //output relevant error type information
	                output += lineArray[i] + newLine;	                
	                errorSearch(lineArray[i]);
	            }
	        }
	    }
	    //Debug
        /*
	    output += 'DEBUG OUTPUT AFTER THIS LINE'+newLine+'current language is: ' + lang + newLine +'Original message' + newLine;
	    for (i = 0; i < numLines; i++) {
	        output += lineArray[i] + newLine;
	    }
        */
	    //In case of unhandled error, print generic message
	    if (output.length === 0) {
	        msg = messages.RUNTIME_ERR;
	    }
        
	    return output;
	}
    //Trigger youtube and Stack Overflow search for the top level error
    //TODO - youtube dropdown activation
    //Param - error - string to search
	function errorSearch(error) {
	    $('#query').val(error);
	    $('#search-button').trigger('click');
	    $('#query1').val(error);
	    $('#soSearch').trigger('click');
	}

	function genHash() {
		return new Date().getTime();
	}

	return {
	    translateErr	: translateErr,
	    genHash			: genHash,
	    download		: download,
	    getFilename		: getFilename,
	    setFilename		: setFilename,
	    changeExtension	: changeExtension
	};

};