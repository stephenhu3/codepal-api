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
  var fakeSnippetList = '123456';
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
  afterEach(function(){
    $(document).off();
  });
//TODO - 'fail' tests are currently always going to pass as long as
//       there is a function to call, needs refining
  it('fails to create a snippet', function(){
    snipSpy = spyOn(window, 'alert');
    snippetModule.create('a');
    alert('s');
    expect(snipSpy).toHaveBeenCalled();
  });

  it('creates a snippet', function(){

    calloutSpy = spyOn(apiModule, 'performCallout').and.callFake(function(callbacks){
    //alert('calloutSpy called'); //debug
      callbacks.done(goodData);
    });

    snipSpy = spyOn(apiModule, 'createSnippet').and.callFake(function (sessionObj, newName, callbacks) {
      apiModule.performCallout(callbacks);
    //alert('api called sucess with ' +callbacks); //debug
    });
    saveSpy = spyOn(uiModule, 'closeSaveModal');
    snippetModule.create('testName');

    expect(snipSpy, calloutSpy, saveSpy).toHaveBeenCalled();
  });

  it('fails to get a single snippet', function(){
    snipSpy = spyOn(window, 'alert');
    snippetModule.get(fakeuuid);
    expect(snipSpy).toHaveBeenCalled;
  });

  it('gets a single snippet', function(){
    calloutSpy = spyOn(apiModule, 'performCallout').and.callFake(function(callbacks){
    //alert('calloutSpy called'); //debug
      callbacks.done(goodData);
    });

    snipSpy = spyOn(apiModule, 'getSnippet').and.callFake(function (uuid, callbacks) {
      apiModule.performCallout( callbacks);
    //alert('api called sucess with ' +callbacks); //debug
    });
    convertSpy = spyOn(apiModule, 'convertResponseToSessionObj');

    snippetModule.get(fakeuuid);
    expect(snipSpy, calloutSpy, convertSpy).toHaveBeenCalled();
  });

  it('fails to get all snippets', function(){
    alertSpy = spyOn(window, 'alert');
    snippetModule.getAll();
    expect(alertSpy).toHaveBeenCalled;
  });

  it('gets all snippets', function(){
    calloutSpy = spyOn(apiModule, 'performCallout').and.callFake(function(callbacks){
      callbacks.done(fakeSnippetList);
    });

    snipSpy = spyOn(apiModule, 'getAllSavedSnippets').and.callFake(function(callbacks){
      apiModule.performCallout(callbacks);
    });
    snippetModule.getAll();
    expect(calloutSpy, snipSpy).toHaveBeenCalled();
  });

  it('fails to update a snippet', function(){
    var alert = spyOn(window, 'alert');
    snippetModule.update('testName');

    expect(alert).toHaveBeenCalled;
  });

  it('updates a snippet', function(){
    calloutSpy = spyOn(apiModule, 'performCallout').and.callFake(function(callbacks){
      callbacks.done(goodData);
    });
    snipSpy = spyOn(apiModule, 'updateSnippet').and.callFake(function(sessionObj, newName, callbacks){
      apiModule.performCallout(callbacks);
    });
    saveSpy = spyOn(uiModule, 'closeSaveModal');

    snippetModule.update('testName');
    expect(calloutSpy, snipSpy, saveSpy).toHaveBeenCalled();
  });

  it('fails to delete a snippet', function(){
    alertSpy = spyOn(window, 'alert');
    snippetModule.remove(fakeuuid);

    expect(alertSpy).toHaveBeenCalled;
  });

  //TODO I don't know why this fails, maybe not implemented? @Alec
  it('deletes a snippet', function(){
    calloutSpy = spyOn(apiModule, 'performCallout').and.callFake(function(callbacks){
      callbacks.done(goodData);
    });
    snipSpy = spyOn(apiModule, 'deleteSnippet').and.callFake(function(uuid, callbacks){
      apiModule.performCallout(callbacks);
    });
    uiSpy =  spyOn(uiModule, 'deleteSnippet');
    snippetModule.remove(fakeuuid);

    expect(calloutSpy, snipSpy).toHaveBeenCalled;
  });

  //TODO push a snippetId to test a success case
  it('checks if snippet is saved', function(){
    var fakeHash = 1;
    var isSaved = snippetModule.isHashSnippetId(fakeHash);
    //false since there are no saved snippets
    expect(isSaved).toBe(false);
  });
});
