describe("editor", function() {
	
	var editorModule;

	beforeEach(function() {
		ace.config.set('basePath', 'ace');
		this.result = fixture.load('fixture.html');

		var defaultLang = 'Node.js',
			defaultTheme = 'monokai';

		codeEditor = new CodeEditor({
			eleId		: 'editor',
			lang 		: defaultLang,
			theme		: defaultTheme,
			omitCallout	: true,
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
	    editorModule = codeEditor.editor;
	});

	it('initializes the editor instance correctly', function() {
		var editorBundle = editorModule.initEditor('editor', 'Node.js', 'monokai');

		expect(Object.keys(editorBundle.sessions).length).toBe(1);
		expect($('#editor')).not.toBeEmpty();
	});

	it('gets the text within the current session', function() {
		var testStr = '(function() { console.log("test"); })();';
		editorModule.setEditorText(testStr);
		expect(editorModule.getEditorText()).toBe(testStr);
	});

	it('is able to change theme', function() {
		var newTheme = 'dawn',
			setTheme = editorModule.setEditorTheme(newTheme);
		expect(setTheme).toBe(newTheme);
	});

	it('is able to change language syntax highlighting', function() {
		var supportedLanguages = ['C', 'C#', 'C++', 'C++11', 'Go'
			, 'Java' , 'Node.js', 'Python', 'Python 3', 'Ruby'];

		for (var i = 0; i < supportedLanguages.length; i++) {
			var setLang = editorModule.setEditorLang(supportedLanguages[i]);
			
			expect(setLang).toBe(supportedLanguages[i]);
		}
	});

	it('is able to create new sessions', function() {
		var newSession = editorModule.createNewSession();
		expect(newSession.hash).toBeDefined();
		expect(newSession.sessionObj.aceSession).toBeDefined();
		expect(newSession.sessionObj.lang).toBeDefined();
	});

	it('is able to delete an existing session', function() {
		var deletedSession;

		deletedSession = editorModule.deleteSession('nonExistingHash');
		expect(deletedSession).toBeNull();

		var newSession 			= editorModule.createNewSession(),
			newHash				= newSession.hash; 
			deletedSessionHash 	= editorModule.deleteSession(newHash);
		expect(deletedSessionHash).toBe(newHash);
	});

	it('is able to switch between different existing sessions', function() {
		var session1 			= editorModule.createNewSession(),
			session1Contents 	= 'Test Str',
			session1Lang		= 'Node.js';
		editorModule.setEditorText(session1Contents);
		editorModule.setEditorLang(session1Lang);

		var session2			= editorModule.createNewSession(),
			session2Contents	= 'Test Str 2',
			session2Lang		= 'C#';
		editorModule.setEditorText(session1Contents);
		editorModule.setEditorLang(session2Lang);

		var currSesh = editorModule.switchSession(session1.hash);
		expect(editorModule.getEditorText()).toBe(session1Contents);
		expect(currSesh.lang).toBe(session1Lang);
	});

});