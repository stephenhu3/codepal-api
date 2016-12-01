describe("ui", function() {

	var uiModule;

	beforeEach(function() {
		ace.config.set('basePath', 'ace');
		this.result = fixture.load('fixture.html');

		var defaultLang = 'Node.js',
			defaultTheme = 'monokai';

		codeEditor = new CodeEditor({
			eleId		: 'editor',
			lang 		: defaultLang,
			theme		: defaultTheme,
			execute		: {
				$outConsole		: $('#codeeditor #outConsole'),
			},
			util		: {
				$filename 		: $('#codeeditor #filename'),
				$extension		: $('#codeeditor #extension'),
			},
			ui   		: {
				$tabContainer		: $('#codeeditor #tabContainer'),
				$langContainer		: $('#codeeditor #lang'),
				$themeContainer		: $('#codeeditor #theme'),
				$snippetContainer 	: $('#saved-snippets')
			},
			api			: {
				userID			: window.userID
			}
		});
	    uiModule = codeEditor.ui;
	});

	it('sets the language', function() {
		var newLang = 'C#';
		$langContainer = uiModule.setLang(newLang);
		var selectedLang = $langContainer.find(':selected').val();
		expect(selectedLang).toBe(newLang);
	});

	it('gets the currently selected language', function() {
		var newLang = 'C#';
		uiModule.setLang(newLang);
		expect(uiModule.getCurrLang()).toBe(newLang);
	});

	it('generates and appends a new tab', function() {
		var fakeHash = Date.now();
		$tabContainer = uiModule.generateAndAppendNewTab(fakeHash);

		var $activeTabs = $tabContainer.find('.active');
		expect($activeTabs.length).toBe(1);
		
		var $addedTab = $activeTabs
				.filter('[data-editorhash="' + fakeHash + '"]');
		expect($addedTab.length).toExist();

		var $switch = $addedTab.find('[data-editoraction="switch"]');
		var $delete = $addedTab.find('[data-editoraction="delete"]');

		expect($switch).toExist();
		expect($delete).toExist();
	});

	it('destroys an existing tab', function() {
		var $tabContainer = uiModule.destroyTab(undefined);
		expect($tabContainer).toBeNull();

		var fakeHash = Date.now();
		$tabContainer = uiModule.generateAndAppendNewTab(fakeHash);

		$tabContainer = uiModule.destroyTab(fakeHash);
		var $tabDeleted = $tabContainer.find('[data-editorhash="' + fakeHash + '"]');
		expect($tabDeleted).not.toExist();
	});

	describe('tab interaction', function() {

		var hash_tab1 = Date.now(),
			hash_tab2 = Date.now() + 1,
			$tabContainer;

		beforeEach(function() {
			$tabContainer = uiModule.generateAndAppendNewTab(hash_tab1);
			uiModule.generateAndAppendNewTab(hash_tab2);
		});

		it('restores a tab adjacent to another one', function() {
			var restoredTabHash;

			restoredTabHash = uiModule.restoreAdjacentTab(hash_tab2);
			expect(restoredTabHash).toBe(hash_tab1);

			var $activeTab = $tabContainer.find('.active');
			var activeTabHash = parseInt($activeTab.attr('data-editorhash'));
			expect(activeTabHash).toBe(hash_tab1);
		});

		// it('binds the delete functionality', function() {
		// 	$tab1 = $tabContainer.find('[data-editorhash=' + hash_tab1 + ']');
		// 	$tab1.find('[data-editoraction="delete"]').click();
		// 	var $delTab = $tabContainer.find('[data-editorhash=' + hash_tab1 + ']');
		// 	expect($delTab).not.toExist();
		// });

		it('binds the switch functionality', function() {
			$tab1 = $tabContainer.find('[data-editorhash=' + hash_tab1 + ']');
			$tab2 = $tabContainer.find('[data-editorhash=' + hash_tab2 + ']');

			$tab1.find('[data-editoraction="switch"]').click();
			expect($tab1.hasClass('active')).toBe(true);
			expect($tab2.hasClass('active')).toBe(false);
		});

	});

});