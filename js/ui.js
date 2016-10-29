/*
 * CodeEditor
 * UI Module
 * Tabs
 */
CodeEditor.prototype._ui = function(options) {

	var self 			= this,
		$tabContainer 	= options.$tabContainer,
		$langContainer	= options.$langContainer,
		defn_tab 		= "<li class=''></li>",
		defn_anchor		= "<a></a>",
		defn_span		= "<span></span>",
		defn_cross		= "<i class='glyphicon glyphicon-remove'></i>";

	
	function setLang(lang) {
		$langContainer.find(':selected').prop('selected', false);
		$langContainer.find('option[value="' + lang + '"]')
			.prop('selected', true);
	}

	function getCurrLang() {
		return $langContainer.find(':selected').val();
	}

	// create a new boostrap tab and appends it to the container
	function generateAndAppendNewTab(hash, name) {
		$tab = createTab(hash, name);
		appendTab($tab);
		bindTab($tab);
		switchActiveTab(hash);
	}

	function restoreAdjacentTab(hash) {
		var $sibling = $('[data-editorhash="' + hash + '"]')
			.prev('[data-tab="tab"]');
		if ($sibling.length === 0) {
			$sibling = $('[data-editorhash="' + hash + '"]')
			.next('[data-tab="tab"]');
		}			
		var newHash = $sibling.attr('data-editorhash');
		switchActiveTab(newHash);
		return newHash;
	}

	// switches focus in bootstrap tabs
	function switchActiveTab(hash) {
		$('[data-editoraction="switch"]')
			.closest('[data-tab="tab"]')
			.removeClass('active');
		$('[data-editorhash=' + hash + ']')
			.closest('[data-tab="tab"]')
			.addClass('active');
	}

	// removes tab from the UI
	function destroyTab(hash) {
		$tabContainer.find('[data-editorhash=' + hash + ']').remove();
	}

	// Private
	// ------------------------------------

	function bindTab($tab) {
		$tab.find('[data-editoraction="switch"]')
			.click(function() {
				var $tab = $(this).closest('[data-tab="tab"]'),
					hash = $tab.attr('data-editorhash');
				
				if ($tab.hasClass('active')) {
					return;
				}
				self.editor.switchSession(hash);
				switchActiveTab(hash);
			});

		$tab.find('[data-editoraction="delete"]')
			.click(function() {
				var $tab = $(this).closest('[data-tab="tab"]'),
					hash = $tab.attr('data-editorhash');

				if (self.editor.deleteSession(hash)) {
					var newHash = restoreAdjacentTab(hash);
					self.editor.switchSession(newHash);
					destroyTab(hash);
				}
			});
	}

	// Returns a jQuery object representing a new file tab
	// By default: it is active
	// If hash and name are not defined, use defaults
	function createTab(hash, name) {
		var $tab 	= $(defn_tab),
			$anchor	= $(defn_anchor),
			$cross	= $(defn_cross),
			$name	= $(defn_span),
			tabName = name || 'untitled';

		$cross.attr('data-tab', 'cross')
			.attr('data-editoraction', 'delete')
			.addClass('clickHand');

		$name.html(tabName)
			.addClass('clickHand')
			.attr('data-tab', 'name')
			.attr('data-editoraction', 'switch');

		$anchor.attr('role', 'tab')
			.attr('href', '#')
			.append($name)
			.append($cross);

		$tab.addClass('active')
			.attr('data-tab', 'tab')
			.attr('role', 'editorinstance')
			.attr('data-editorhash', hash)
			.append($anchor);

		return $tab;
	}

	// appends a new tab after the '+'
	function appendTab($tab) {
		$tabContainer.append($tab);
	}

	return {
		setLang					: setLang,
		getCurrLang				: getCurrLang,
		restoreAdjacentTab		: restoreAdjacentTab,
		generateAndAppendNewTab	: generateAndAppendNewTab,
		switchActiveTab			: switchActiveTab,
		destroyTab				: destroyTab
	};

};