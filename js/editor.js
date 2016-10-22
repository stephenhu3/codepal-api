/*
 * CodeEditor
 * Editor Module
 * Uses AceEditor API to handle all plugin options
 */

var aceEditor; // FOR DEBUGGING PURPOSES

CodeEditor.prototype._editor = function(options) {

	var self		= this,
		theme		= options.theme,
		$filename 	= options.$filename,
		$extension 	= options.$extension,
		currHash,
		// aceEditor,
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
		sessions = {
			// Stores aceEditor sessions to mimic tab funcitonality
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

		// DEFAULT: empty, unnamed tab
		createNewSession();
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

	function deleteSession(hash) {
		if (typeof(sessions[hash]) === 'undefined') {
			return;
		}
		delete sessions[hash];
		self.ui.destroyTab(hash);
	}

	function createNewSession(){
		// create new hash based on timestamp, which should be unique
		if (currHash) {
			saveSession(currHash);
		}
		currHash = self.util.genHash();

		var newSession = generateNewSession();
		sessions[currHash] = newSession;
		restoreSession(currHash);
		self.ui.generateAndAppendNewTab(currHash);
	}

	function switchSessions(hash) {
		if (typeof(sessions[hash]) === 'undefined') {
			return;
		}
		saveSession(currHash);
		currHash = hash;
		restoreSession(currHash);
		self.ui.switchActiveTab(currHash);
	}

	// PRIVATE
	// -------------------------------

	function generateNewSession() {
		return new ace.EditSession('', aceLangMap[self.global.lang]);
	}

	function restoreSession(hash) {
		if (typeof(sessions[hash]) === 'undefined') {
			return;
		}
		aceEditor.setSession(sessions[hash]);
	}

	function saveSession(hash) {
		if (typeof(sessions[hash]) === 'undefined') {
			return;
		}
		// overwrite existing saved session with newest version
		sessions[hash] = aceEditor.getSession();
	}

	return {
		initEditor			: initEditor,
		download			: download,
		getEditorText		: getEditorText,
		setEditorTheme		: setEditorTheme,
		setEditorLang		: setEditorLang,
		deleteSession		: deleteSession,
		createNewSession	: createNewSession,
		switchSessions		: switchSessions,

		aceEditor			: aceEditor	// for debugging purposes
	};
};