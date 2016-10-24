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

	function translateErr(msg) {
	    /*TODO
        *   Language specific compiler/runtime error handling
        */
	    /* Generic translation
        *  prints each line directly from HackerEarth's return error
        */
	    var lineArray = msg.split("\n");
	    output = '';
	    for (i = 0; i < lineArray.length; i++) {
	        output += lineArray[i] + '<br/>';
	    }

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