var initializeGoldenLayout = function () {
    // goldenLayout Configuration:
    /*
     * Following is the initial layout. We are creating a big component on the
     * left of the screen and two smaller ones on the right, on top of each
     * other, as shown in the image:
     * https://www.golden-layout.com/assets/images/tutorial_1_image_1.png
     * 
     * All GoldenLayout structures are created from three building blocks: Rows,
     * Columns and Stacks. Row's arrange items from left to right, Columns from
     * top to bottom and Stacks from front to back (as a tab-strip). These can
     * be nested. The actual parts that your app is composed of (forms, charts,
     * tables etc.) are referred to as "components". Components can be put into
     * any of these building blocks.
     * 
     * The first item in this row is the big component that we want to put on
     * the left hand side (A). To the right we want two components on top of
     * each other (B and C) - so we need to put them into a column. The whole
     * structure should look like this:
     * https://www.golden-layout.com/assets/images/tutorial_1_image_2.png
     * 
     */

    var config = {
        settings : {
            hasHeaders : true,
            constrainDragToContainer : false,
            reorderEnabled : false,
            selectionEnabled : false,
            popoutWholeStack : false,
            blockedPopoutsThrowError : false,
            closePopoutsOnUnload : false,
            showPopoutIcon : false,
            showMaximiseIcon : false,
            showCloseIcon : false
        },
        content : [ {
            type : 'row',
            content : [ {
                type : 'column',
                content : [ {
                    type : 'component',
                    componentName : 'codeEditorInput',
                    componentState : {
                        label : 'A'
                    }
                }, {
                    type : 'component',
                    componentName : 'codeEditorOutput',
                    componentState : {
                        label : 'D'
                    }
                } ]
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
    // end of initial goldenLayout configuration

    /*
     * A few things to note about this config: Every item (apart from
     * components) can have children, specified in the content array type can be
     * 'row', 'column', 'stack' or 'component' componentName specifies which
     * component should be created. More about that further down componentState
     * can be any serialisable Object and will be passed to the component
     */

    // For more details about the goldenLayout:
    // https://www.golden-layout.com/tutorials/getting-started.html
    // Instantiating the layout
    var myLayout = new GoldenLayout(config); // remove this when adding

    // Registering individual components
    myLayout.registerComponent('codeEditorInput', function (container) {
        integrateCodeEditor(container);
    });

    myLayout.registerComponent('codeEditorOutput', function (container) {
        // To-DO: @alec: Must change the following code
        window.setInterval(function () {
            var outputDiv = $('div#outConsole.jumbotron.wordBreak')[0];
            container.getElement().html(outputDiv);
        }, 100);
    });

    // Registering Youtube component
    myLayout.registerComponent('youtube', function (container) {
        integrateYoutube(container);
    });

    myLayout.registerComponent('StackOverflow', function (container) {
        integrateStackOverflow(container);
    });

    myLayout.init();
}
