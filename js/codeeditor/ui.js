/*
 * CodeEditor
 * UI Module
 * Author: Alec Ng
 * 
 * Dependencies
 * - editor.js
 */

CodeEditor.prototype._ui = function(options) {

	var self 			= this,
		$tabContainer 	= options.$tabContainer,
		$langContainer	= options.$langContainer,
		$themeContainer	= options.$themeContainer,
		defn_tab 		= "<li class=''></li>",
		defn_anchor		= "<a></a>",
		defn_span		= "<span></span>",
		defn_cross		= "<i class='glyphicon glyphicon-remove'></i>";

	
	// @SUMMARY	: updates tab's hash and name
	// @PARAM	: [name] name to change to
	// @PARAM	: [hash] hash corresponding to existing tab
	// @PARAM	: [newHash] hash tab should now be linked to
	// @RETURN	: jQuery tab element
	function updateTab(name, hash, newHash) {
		var $tab = $('[data-editorhash="' + hash + '"]'),
			$name = $tab.find('[data-tab="name"]');

		$name.html(name);
		$tab.attr('data-editorhash', newHash);
		return $tab;
	}

	// @SUMMARY	: sets the theme select to a specified theme
	// @PARAM	: [theme] the language to set to
	// @RETURN	: the jQuery theme select element 
	function setTheme(theme) {
		$themeContainer.find(':selected').prop('selected', false);
		$themeContainer.find('option[value="' + theme + '"]')
			.prop('selected', true);
		return $themeContainer;
	}

	// @SUMMARY	: sets the language select to a specified language
	// @PARAM	: [lang] the language to set to
	// @RETURN	: the jQuery language select element 
	function setLang(lang) {
		$langContainer.find(':selected').prop('selected', false);
		$langContainer.find('option[value="' + lang + '"]')
			.prop('selected', true);
		return $langContainer;
	}

	// @RETURN	: gets the currently selected language
	function getCurrLang() {
		return $langContainer.find(':selected').val();
	}

	// @SUMMARY	: creates a new tab element, adds it to the UI and makes it active
	// @PARAM	: [hash] the hash of the session this tab corresponds to
	// @PARAM	: [name] optional, the name of the tab
	// @RETURN	: the jQuery parent tab container element
	function generateAndAppendNewTab(hash, name) {
		$tab = createTab(hash, name);
		appendTab($tab);
		bindTab($tab);
		switchActiveTab(hash);
		return $tabContainer;
	}

	// @SUMMARY	: sets the editor's active tab to the neighbour of the input tab
	// @PARAM	: [hash] the hash of the session tab to find the neighbour of
	// @RETURN	: the hash of the neighbouring session tab
	function restoreAdjacentTab(hash) {
		var $sibling = $('[data-editorhash="' + hash + '"]').prev('[data-tab="tab"]');
		if ($sibling.length === 0) {
			$sibling = $('[data-editorhash="' + hash + '"]').next('[data-tab="tab"]');
		}			
		var newHash = $sibling.attr('data-editorhash');
		switchActiveTab(newHash);
		return parseInt(newHash);
	}

	// @SUMMARY	: removes a tab from the UI
	// @PARAM	: [hash] the hash of the session tab to delete
	// @RETURN	: the jQuery parent tab container element, or null if the tab doesn't exist
	function destroyTab(hash) {
		var $tabToDestroy = $tabContainer.find('[data-editorhash=' + hash + ']');
		if ($tabToDestroy.length === 1) {
			$tabToDestroy.remove();
			return $tabContainer;
		}
		return null;
	}

	// @SUMMARY	: sets a specified tab to be active and sets all others as inactive
	// @PARAM	: [hash] the hash of the tab to set to be active
	function switchActiveTab(hash) {
		$('[data-editoraction="switch"]')
			.closest('[data-tab="tab"]')
			.removeClass('active');
		$('[data-editorhash=' + hash + ']')
			.closest('[data-tab="tab"]')
			.addClass('active');
	}

	// PRIVATE
	// -------------------------------

	// @SUMMARY	: attaches switching and delete event handlers to a tab element
	// @PARAM	: [$tab] the jQuery tab element to attach event handlers to
	function bindTab($tab) {
		$tab.find('[data-editoraction="switch"]')
			.click(function() {
				var $tab = $(this).closest('[data-tab="tab"]');
				self.bindings.tabSwitch($tab);
			});

		$tab.find('[data-editoraction="delete"]')
			.click(function() {
				var $tab = $(this).closest('[data-tab="tab"]');
				self.bindings.tabDelete($tab);
			});
	}

	// @SUMMARY	: creates a new active jQuery tab element
	// @PARAM	: [hash] the hash of the session this tab represents
	// @PARAM	: [name] optional, the nam of the tab
	// @RETURN	: the jQuery tab element 
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

	// @SUMMARY	: appends a tab to the left side of the tab container
	// @PARAM	: [$tab] the jQuery tab element to append
	function appendTab($tab) {
		$tabContainer.append($tab);
	}

	return {
		setTheme				: setTheme,
		setLang					: setLang,
		getCurrLang				: getCurrLang,
		restoreAdjacentTab		: restoreAdjacentTab,
		generateAndAppendNewTab	: generateAndAppendNewTab,
		destroyTab				: destroyTab,
		updateTab				: updateTab,
		switchActiveTab			: switchActiveTab
	};

};