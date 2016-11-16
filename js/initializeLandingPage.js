integrateLandingPage = function (container){
container.getElement().html('<p>Add HTML here</p>');

	$(function(){
		//Add javscript here
		var parser = new DOMParser();
		var doc = parser.parseFromString(stringContainingXMLSource, "../../landingPage/landing.html");
	});
};