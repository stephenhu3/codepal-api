/*
 * CodeEditor
 * Base Prototypes + constants
 */
var CodeEditor = function(options) {

	// define Modules and pass in options
	this.util = this._util();
	this.editor = this._editor(options.editor);
	this.execute = this._execute(options.execute);

	this.global = this._global(options);
	this.defaultConfig = this._defaultConfig;
	this.messages = this._messages;

	// init
	this.editor.initEditor(options.eleId, options.lang);
	
	// for debugging purposes
	this.aceEditor = editor.aceEditor;
};

CodeEditor.prototype._global = function(options) {

	var lang = options.lang;

	return {
		lang	: lang
	};

};

