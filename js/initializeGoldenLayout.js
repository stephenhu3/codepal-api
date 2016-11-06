// Golden layout configuration
var config = {
	content : [ {
		type : 'row',
		content : [ {
			type : 'component',
			componentName : 'codeEditor',
			componentState : {
				label : 'A'
			}
		}, {
			type : 'column',
			content : [ {
				type : 'component',
				componentName : 'youtube',
				componentState : {
					label : 'B'
				}
			}, {
				type : 'component',
				componentName : 'StackOverflow',
				componentState : {
					label : 'C'
				}
			} ]
		} ]
	} ]
};

// Instantiating the layout and saved states
var myLayout = new GoldenLayout(config); // remove this when adding
											// SavinfState functionality

/*
 * var myLayout, savedState = localStorage.getItem( 'savedState' );
 * 
 * if( savedState !== null ) { myLayout = new GoldenLayout( JSON.parse(
 * savedState ) ); } else { myLayout = new GoldenLayout( config ); }
 * 
 * myLayout.on( 'stateChanged', function(){ var state = JSON.stringify(
 * myLayout.toConfig() ); localStorage.setItem( 'savedState', state ); });
 */

// Registering individual components
myLayout.registerComponent('codeEditor', function(container, componentState) {
	integrateCodeEditor(container);
});

// Registering Youtube component

myLayout.registerComponent('youtube', function(container, componentState) {
	integrateYoutube(container);
});

myLayout.registerComponent('StackOverflow',
		function(container, componentState) {
			container.getElement().html("<p>BLAH</p>");
			integrateStackOverflow(container);
		});

myLayout.registerComponent('testComponent',
		function(container, componentState) {
			// integrateStackOverflow(container);
		});

myLayout.init();
