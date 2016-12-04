describe("snippet", function(){
  var snippetModule;
  var fakeuuid = '1bcd7d03-cccd-49ea-8dac-fc7bb14b3bca';
  var goodData = {
      "userId": "01908170678902102",
      "title": "NewEntry.java",
      "language": "java",
      "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
      "isPublic": true
  };
  var goodResponse = {
    "uuid": "1bcd7d03-cccd-49ea-8dac-fc7bb14b3bca",
    "userId": "01908170678902102",
    "title": "NewEntry.java",
    "language": "java",
    "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
    "dateCreated": 1479618665729,
    "dateUpdated": 1479618665729,
    "isPublic": true
  };
  var badData =
    /* Missing user Id */
    {
        "title": "NewEntry.java",
        "language": "java",
        "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
        "isPublic": true
    };
  //TODO needs formatting
  //var badResponse = "{"code":500,"message":"There was an error processing your request. It has been logged (ID 5e4731a6978284c9)."}";

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
				$snippetContainer 	: $('#saved-snippets'),
        $saveModal          : $('#fileModal')
			},
			api			: {
				userID			: window.userID
			}
		});
    editorModule = codeEditor.editor;
    snippetModule = codeEditor.snippet;
    uiModule = codeEditor.ui;
    apiModule = codeEditor.api;
    editorModule = codeEditor.editor;
	});

  it('fails to create a snippet', function(){

    snipSpy = spyOn(window, 'alert');
    snippetModule.create('a');
    expect(snipSpy).toHaveBeenCalled;
  });

  it('creates a snippet', function(){

    calloutSpy = spyOn(apiModule, 'performCallout').and.callFake(function(callbacks){
    //alert('calloutSpy called'); //debug
      callbacks.done(goodData);
    });
    snipSpy = spyOn(apiModule, 'createSnippet').and.callFake(function (sessionObj, newName, callbacks) {
      apiModule.performCallout( callbacks);
    //alert('api called sucess with ' +callbacks); //debug
    });
    saveSpy = spyOn(uiModule, 'closeSaveModal');
    snippetModule.create('testName');

    expect(snipSpy, calloutSpy, saveSpy).toHaveBeenCalled;
  });

  it('fails to get a single snippet', function(){
    snipSpy = spyOn(window, 'alert');
    expect(snipSpy).toHaveBeenCalled;
    snippetModule.get(fakeuuid);
  });

  it('gets a single snippet', function(){
    snippetModule.get(fakeuuid);
  });
  it('gets all snippet', function(){

  });
  it('updates a snippet', function(){

  });
  it('deletes a snippet', function(){

  });
  it('gets a snippet', function(){

  });
});
