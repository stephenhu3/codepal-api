/*
 * class CodeEditor
 * @Constructor
 */
function CodeEditor(options) {

	// define Modules and pass in options
	this.util = this._util();
	this.editor = this._editor(options.editor);
	this.execute = this._execute(options.execute);
	this.ui = this._ui(options.ui);

	// init
	this.editor.initEditor(options.eleId, options.lang);
}