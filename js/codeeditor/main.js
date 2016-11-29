/*
 * class CodeEditor
 * @Constructor
 */
function CodeEditor(options) {

	// define Modules and pass in options
	this.util 		= this._util(options.util);
	this.execute 	= this._execute(options.execute);
	this.ui 		= this._ui(options.ui);
	this.editor 	= this._editor();
	this.bindings	= this._bindings();
	this.snippet	= this._snippet();
	this.api		= this._api(options.api);

	// init
	this.editor.initEditor(options.eleId, options.lang, options.theme);
	this.ui.setLang(options.lang);
	this.ui.setTheme(options.theme);
	this.execute.initReplClient(options.lang);
}