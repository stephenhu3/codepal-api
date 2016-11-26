/*
 * class CodeEditor
 * @Constructor
 */
function CodeEditor(options) {

	// define Modules and pass in options
	this.util 		= this._util();
	this.editor 	= this._editor(options.editor);
	this.execute 	= this._execute(options.execute);
	this.ui 		= this._ui(options.ui);
	this.bindings	= this._bindings();
	this.snippet	= this._snippet();

	// init
	this.editor.initEditor(options.eleId, options.lang);
	this.ui.setLang(options.lang);
	this.ui.setTheme(options.editor.theme);
	this.execute.initReplClient(options.lang);
}