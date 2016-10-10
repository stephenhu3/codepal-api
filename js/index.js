var config = {
    content: [{
        type: 'row',
        content:[{
            type: 'component',
            componentName: 'testComponent1',
            componentState: { label: 'A' }
        },{
            type: 'column',
            content:[{
                type: 'component',
                componentName: 'youtube',
                componentState: { label: 'B' }
            },{
                type: 'component',
                componentName: 'testComponent',
                componentState: { label: 'C' }
            }]
        }]
    }]
};

var myLayout = new GoldenLayout(config);

myLayout.registerComponent('youtube', function(container, state) {
  container.getElement().html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLE7E8B7F4856C9B19" allowfullscreen=></iframe>');
});

myLayout.registerComponent( 'testComponent1', function( container ){
	container.getElement().html($( "section#codeeditor").html( ));
});

myLayout.registerComponent( 'testComponent', function(){});

myLayout.init();

$( "section#codeeditor").hide();
