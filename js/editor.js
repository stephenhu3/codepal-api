/*
 * CodeEditor
 * Editor Module
 * Uses AceEditor API to handle all plugin options
 */
CodeEditor.prototype._editor = function(options) {

	var self		= this,
		theme		= options.theme,
		$filename 	= options.$filename,
		$extension 	= options.$extension,
		aceEditor,
		aceLangMap	= { // user label to ace .js file name 
			'C#'			: 'csharp',
			'C++'			: 'c_pp',
			'Haskell'		: 'haskell',
			'Java'			: 'java',
			'JavaScript'	: 'javascript',
			'Objective-C'	: 'objectivec',
			'Perl'			: 'perl',
			'Pascal'		: 'pascal',
			'Python'		: 'python'	
		},
		extensionMap = {
			'C#'			: '.cs',
			'C++'			: '.cpp',
			'Haskell'		: '.hs',
			'Java'			: '.java',
			'JavaScript'	: '.js',
			'Objective-C'	: '.m',
			'Perl'			: '.perl',
			'Pascal'		: '.pas',
			'Python'		: '.py'	
		},
		defaultConfig = {
			// TODO
		};


	function initEditor(eleId, lang) {
		aceEditor = ace.edit(eleId);
		setEditorTheme(theme);
		setEditorLang(lang);
		aceEditor.setAutoScrollEditorIntoView(true);
		aceEditor.getSession().setTabSize(4);
	}

	function getEditorText() {
		return aceEditor.getValue();
	}

	function download() {
		// lib will automatically replace any non-valid filename chars with '-'
		var filename = $filename.val();
		if (!$filename.val()) {
			alert('Please enter a filename.');
			return;
		}
		var text = getEditorText();
		var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
		saveAs(blob, filename + extensionMap[self.global.lang]);
	}

	function setEditorTheme(theme) {
		aceEditor.setTheme("ace/theme/" + theme);
	}

	function setEditorLang(newLang) {
		self.global.lang = newLang;
		aceEditor.getSession().setMode("ace/mode/" + aceLangMap[self.global.lang]);
		$extension.html(extensionMap[self.global.lang]);
	}

	function setTabSize(size) {
		if (self.util.isInteger(size)) {
			aceEditor.getSession().setTabSize(size);	
		}
	}

	function goToLine(lineNumber) {
		if (self.util.isInteger(size)) {
			aceEditor.gotoLine(lineNumber);
		}
	}

	function find(phrase, backwards, regExp) {
		if (!phrase) {
			return;
		}
		var options = $.extend({}, defaultSearchSettings);
		if (direction) {
			options.backwards = true;
		}
		if (regExp) {
			options.regExp = true;
		}
		aceEditor.find(phrase, options);
	}

	return {
		initEditor		: initEditor,
		download		: download,
		getEditorText	: getEditorText,
		setEditorTheme	: setEditorTheme,
		setEditorLang	: setEditorLang,

		aceEditor		: aceEditor	// for debugging purposes
	};
};