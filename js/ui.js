/*
 * CodeEditor
 * UI Module
 * Tabs
 */
CodeEditor.prototype._ui = function(options) {

	var self 			= this,
		$tabContainer 	= options.$tabContainer,
		defn_tab 		= "<li class=''><a></a></li>"; 

	// create a new boostrap tab and appends it to the container
	function generateAndAppendNewTab(hash, name) {
		$tab = createTab(hash, name);
		appendTab($tab);
		bindTab($tab);
		switchActiveTab(hash);
	}

	// switches focus in bootstrap tabs
	function switchActiveTab(hash) {
		$('[data-editoraction="switch"]').removeClass('active');
		$('[data-editorhash=' + hash + ']').addClass('active');
	}

	// removes tab from the UI
	function destroyTab(hash) {
		$tabContainer.find('[data-editorhash=' + hash + ']').remove();
	}

	// Private
	// ------------------------------------

	function bindTab($tab) {
		$tab.click(function() {
			if ($(this).hasClass('active')) {
				return;
			}
			self.editor.switchSessions($(this).attr('data-editorhash'));
		});
	}

	// Returns a jQuery object representing a new file tab
	// By default: it is active
	// If hash and name are not defined, use defaults
	function createTab(hash, name) {
		var $tab = $(defn_tab);
		var tabName = (name && name.trim().length > 0) ? name : 'untitled';

		$tab.addClass('active')
			.attr('role', 'editorinstance')
			.attr('data-editoraction', 'switch')
			.attr('data-editorhash', hash);

		$a = $tab.find('a');
		$a.attr('role', 'tab')
			.attr('href', '#')
			.html(tabName);

		return $tab;
	}

	// appends a new tab after the '+'
	function appendTab($tab) {
		$tabContainer.append($tab);
	}

	return {
		generateAndAppendNewTab	: generateAndAppendNewTab,
		switchActiveTab			: switchActiveTab,
		destroyTab				: destroyTab
	};

};