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

	    //Seperate lines at occurrences of \n up to 4th line, 
	           //there's probably a better/less ugly way to do this
        line1 = msg.slice(0, msg.indexOf("\n"));
        line2 = msg.substr(msg.indexOf("\n") + 1);
        line3 = line2.substr(line2.indexOf("\n") + 1);
        line4 = line3.substr(line3.indexOf("\n") + 2);
        line2 = line2.slice(0, line2.indexOf("\n"));
        //Garbage line, cut from output
        line3 = line3.slice(0, line3.indexOf("\n"));
        line4 = line4.slice(0, line4.indexOf("\n"));
        //Clean up lines
        line1 = "Error ar line" + line1.substr(line1.indexOf(":")+1)+":";
        line2 = '"' + line2.substr(line2.indexOf("{")+1)+ '"';


        msg = line1 + '<br/>' + line2 + '<br/>' + line4;

	    //In case of unhandled error, print generic message
	    if (msg.length === 0) {
	        return msg;
	    }
	    else {
	        msg = messages.RUNTIME_ERR;
	    }
	    return msg;
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