var integrateCodeEditor = function (container){
	
	var strVar = "";
	strVar += "		<!-- Main -->";
	strVar += "		<section id=\"codeeditor\" class=\"container\">";
	strVar += "			<!-- UI COMPONENT -->";
	strVar += "			<div class=\"row\">";
	strVar += "				<div class=\"col-sm-6\">";
	strVar += "					<label for\"filename\">Filename<\/label>";
	strVar += "					<input id=\"filename\" type=\"text\" \/>";
	strVar += "					<span id=\"extension\"><\/span>";
	strVar += "					<button type=\"button\" id=\"downloadBtn\"><i class=\"fa fa-download\"><\/i> Download<\/button>";
	strVar += "					<button type=\"button\" id=\"saveBtn\"><i class=\"fa fa-save\"><\/i> Save<\/button>";
	strVar += "                    <button id=\"runBtn\" type=\"button\"> <i class=\"fa fa-play\"> <\/i>Run<\/button>";
	strVar += "				<\/div>";
	strVar += "				<div class=\"col-sm-6 text-right\">";
	strVar += "					<button data-toggle=\"modal\" data-target=\"#configModal\" type=\"button\" id=\"configBtn\">";
	strVar += "						<i class=\"fa fa-cog\"><\/i> Custom Settings";
	strVar += "					<\/button>";
	strVar += "				<\/div>";
	strVar += "			<\/div>";
	strVar += "			<div class=\"row\">";
	strVar += "				<div class=\"col-xs-12\">";
	strVar += "					<ul id=\"tabContainer\" class=\"nav nav-tabs\" role=\"tablist\">";
	strVar += "						<li data-editoraction=\"add\" role=\"editorInstance\">";
	strVar += "							<a role=\"tab\" href=\"#\"> + <\/a>";
	strVar += "						<\/li>";
	strVar += "					<\/ul>";
	strVar += "					<div id=\"editor\"><\/div>";
	strVar += "				<\/div>";
	strVar += "			<\/div>";
	strVar += "			<div class=\"row\">";
	strVar += "				<div class=\"col-sm-6\">";
	strVar += "					<select class=\"form-control\" name=\"lang\" id=\"lang\">";
	strVar += "						<option value=\"JavaScript\">JavaScript (Node.js v4.4.3)<\/option>";
	strVar += "						<option value=\"C#\">C# (mono 4.2.3)<\/option>";
	strVar += "						<option value=\"C++\">C++ (g++ 4.8.4)<\/option>";
	strVar += "						<option value=\"Haskell\">Haskell (ghc 7.6.3)<\/option>";
	strVar += "						<option value=\"Java\">Java (openjdk 1.7.0_91)<\/option>";
	strVar += "						<option value=\"Objective-C\">Objective-C (clang 3.3)<\/option>";
	strVar += "						<option value=\"Perl\">Perl (perl 5.18.2)<\/option>";
	strVar += "						<option value=\"Pascal\">Pascal (fpc 2.6.2)<\/option>";
	strVar += "						<option value=\"Python\">Python (python 2.7.6)<\/option>";
	strVar += "					<\/select>";
	strVar += "				<\/div>";
	strVar += "                <div class=\"col-sm-6\">";
	strVar += "                    <select class=\"form-control\" name=\"theme\" id=\"theme\">";
	strVar += "                    	<optgroup label=\"Light\">";
	strVar += "							<option value=chrome>Chrome<\/option>";
	strVar += "							<option value=clouds>Clouds<\/option>";
	strVar += "                    		<option value=crimson_editor>Crimson Editor<\/option>";
	strVar += "	                        <option value=dawn>Dawn<\/option>";
	strVar += "	                        <option value=dreamweaver>Dreamweaver<\/option>";
	strVar += "	                        <option value=eclipse>Eclipse<\/option>";
	strVar += "	                        <option value=github>Github<\/option>";
	strVar += "                    		<option value=iplastic>iPlastic<\/option>";
	strVar += "	                        <option value=katzenmilch>Katzenmilch<\/option>";
	strVar += "	                        <option value=kuroir>Kuroir<\/option>";
	strVar += "                    		<option value=solarized_light>Solarized Light<\/option>";
	strVar += "                        	<option value=sqlserver>SQL Server<\/option>";
	strVar += "                    		<option value=textmate>Textmate<\/option>";
	strVar += "                        	<option value=tomorrow>Tomorrow<\/option>";
	strVar += "                        	<option value=xcode>XCode<\/option>";
	strVar += "                    	<\/optgroup>";
	strVar += "                    	<optgroup label=\"Dark\">";
	strVar += "                    		<option value=ambiance>Ambiance<\/option>";
	strVar += "                    		<option value=chaos>Chaos<\/option>";
	strVar += "                    		<option value=clouds_midnight>Clouds Midnight<\/option>";
	strVar += "                        	<option value=cobalt>Cobalt<\/option>";
	strVar += "                        	<option value=monokai>Monokai<\/option>";
	strVar += "                        	<option value=idle_fingers>Idle Fingers<\/option>";
	strVar += "                        	<option value=merbivore>Merbivore<\/option>";
	strVar += "	                        <option value=merbivore_soft>Merbivore Soft<\/option>";
	strVar += "	                        <option value=paster_on_dark>Paster On Dark<\/option>";
	strVar += "	                        <option value=solarized_dark>Solarized Dark<\/option>";
	strVar += "                    		<option value=terminal>Terminal<\/option>";
	strVar += "                    		<option value=tomorrow_night>Tomorrow Night<\/option>";
	strVar += "	                        <option value=tomorrow_night_blue>Tomorrow Night Blue<\/option>";
	strVar += "	                        <option value=tomorrow_night_bright>Tomorrow Night Bright<\/option>";
	strVar += "	                        <option value=tomorrow_night_eighties>Tomorrow Night Eighties<\/option>";
	strVar += "	                        <option value=twilight>Twilight<\/option>";
	strVar += "	                        <option value=vibrant_ink>Vibrant Ink<\/option>";
	strVar += "                    	<\/optgroup>";
	strVar += "                    <\/select>";
	strVar += "                <\/div>";
	strVar += "				";
	strVar += "			<\/div>";
	strVar += "			<div class=\"row\">";
	strVar += "				<div class=\"col-xs-12\">";
	strVar += "					<div id=\"outConsole\" class=\"jumbotron wordBreak\">";
	strVar += "                        <h3>Output:<\/h3>";
	strVar += "                    <\/div>";
	strVar += "				<\/div>";
	strVar += "			<\/div>";
	strVar += "			<!-- \/ UI COMPONENT -->";
	strVar += "";
	strVar += "			<!-- CONFIG MODAL -->";
	strVar += "			<div class=\"modal\" id=\"configModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"configModalLabel\">";
	strVar += "				<div class=\"modal-dialog\" role=\"document\">";
	strVar += "					<div class=\"modal-content\">";
	strVar += "						<div class=\"modal-header\">";
	strVar += "							<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
	strVar += "								<span aria-hidden=\"true\">&times;<\/span>";
	strVar += "							<\/button>";
	strVar += "							<h4 class=\"modal-title\" id=\"configModalLabel\">Custom Settings<\/h4>";
	strVar += "						<\/div>";
	strVar += "						<div class=\"modal-body\">";
	strVar += "							<div class=\"row\">";
	strVar += "								<div class=\"col-md-6\">Tab Size<\/div>";
	strVar += "								<div class=\"col-md-6\">";
	strVar += "									<input type=\"number\" class=\"form-control\" \/>";
	strVar += "								<\/div>";
	strVar += "								";
	strVar += "								<div class=\"col-md-6\">Font Size<\/div>";
	strVar += "								<div class=\"col-md-6\">";
	strVar += "									<input type=\"number\" class=\"form-control\" \/>";
	strVar += "								<\/div>";
	strVar += "							<\/div>";
	strVar += "						<\/div>";
	strVar += "						<div class=\"modal-footer\">";
	strVar += "							<button id=\"configSave\" type=\"button\" class=\"btn btn-primary\">";
	strVar += "								<i class=\"fa fa-save\"><\/i>  Save Changes";
	strVar += "							<\/button>";
	strVar += "						<\/div>";
	strVar += "					<\/div>";
	strVar += "				<\/div>";
	strVar += "			<\/div>";
	strVar += "			<!-- \/. CONFIG MODAL -->";
	strVar += "";
	strVar += "		<\/section>";

	// Load into DOM
	container.getElement().html(strVar);

	var codeEditor; 

	$(document).ready(function() {

		codeEditor = new CodeEditor({
			eleId		: 'editor',
			lang 		: 'JavaScript',
			execute		: {
				$outConsole		: $('#outConsole'),
			},
			editor 		: {
				$filename 		: $('#filename'),
				$extension		: $('#extension'),
				theme 			: 'monokai'
			},
			ui   		: {
				$tabContainer	: $('#tabContainer'),
				$langContainer	: $('#lang')
			}	
		});

		// Bindings
		$('[data-editoraction="add"]').click(codeEditor.editor.createNewSession);

		$('#codeeditor #runBtn').click(function() {
			$(this).prop('disabled', true);
			var currLang = codeEditor.ui.getCurrLang();
			codeEditor.execute.run($(this), currLang);
		});
		$('#codeeditor #saveBtn').click(function() { // TODO: Hook up
			alert('Code snippet save feature -- coming soon...');
		});
		$('#codeeditor #downloadBtn').click(codeEditor.editor.download);
		$('#codeeditor #lang').on('change', function() {
			var lang = $(this).find('option:selected').val();
			codeEditor.editor.setEditorLang(lang);
		});
		$('#theme').on('change', function () {
		    var theme = $(this).find('option:selected').val();
		    codeEditor.editor.setEditorTheme(theme);
		});

	});

};