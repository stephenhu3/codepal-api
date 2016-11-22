/*
 * CodeEditor
 * Util Module
 */

CodeEditor.prototype._util = function() {

	var self 		= this,
		messages 	= {
			'COMPILER_ERR'	: 'Compiler has encountered an unknown error!',
		    'RUNTIME_ERR'	: 'Error during runtime!'
		};

	function isInteger(num) {
		return (typeof(num) === 'number' && num % 1 === 0);	
	}

	function translateErr(msg, lang) {
	 
	    var lineArray = msg.split("\n");
	    output = '';
	    newLine = '<br/>'
	    numLines = lineArray.length;
	    /*TODO
        *   Language specific compiler/runtime error handling
        	'CPP',
	    	'CSHARP',   Basic errors are now handled
			'HASKELL',
			'JAVA',
			'JAVASCRIPT_NODE',  
			'OBJECTIVEC',
			'PASCAL',
			'PERL',
			'PYTHON',
        */

	    /* Generic translation
        *  prints each line directly from HackerEarth's return error
        */
	    if (lang == 'nodejs') {	        
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('evalmachine');
	            //output += index + '<br/>'; //Debug

	            if (index != -1) {
                    //identify error line
	                output += 'at' + lineArray[i].substring(index + 12) + newLine;
	                { continue; }
	            }
	            index = lineArray[i].search('.js');
	            //output += 'intermediate index: ' + index; //Debug
	            if (index != -1) {
	                //don't print this line
	            }
	            else {
	                //output relevant error type information
                    //TODO - search SO and YT for this line
	                output += lineArray[i] + newLine;
	            }
	        }
	    }

	    if (lang == 'CSHARP') {
	        for (i = 0; i < numLines; i++) {
	            var index = lineArray[i].search('.cs');
	            if (index != -1)
	                output += lineArray[i].substring(index + 3) + newLine;
	            else
	                output += lineArray[i] + newLine;
	        }
	    }
        
	    if (lang == 'JAVA') {

	        //Handle the non-verbose HackerEarth error when there is no class and main method
	        if (lineArray[0] == '') {
	            output += 'The program must have at least one class declaration, and a main method within the class';
	        }

	        else {
	            for (i = 0; i < numLines; i++) {
	                output += lineArray[i] + newLine;
	            }
	        }
	    }
        
	  //Debug
	  //output += 'Original message' + newLine;    
/*
	    else {
	        for (i = 0; i < numLines; i++) {
	            output += lineArray[i] + newLine + 'current language is: ' + lang;
	        }
	    }
        */
        //Debug
//	    output += "The current language is:" + newLine + lang;  //debug

	    //In case of unhandled error, print generic message
	    if (output.length === 0) {
	        msg = messages.RUNTIME_ERR;
	    }
        
	    return output;
	}

	function genHash() {
		return new Date().getTime();
	}

	return {
	    isInteger		: isInteger,
	    translateErr	: translateErr,
	    genHash			: genHash
	};

};