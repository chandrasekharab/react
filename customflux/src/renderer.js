let keys_inc = 1;

let _handleAction = function (actionConfig) {
    debugger;
};

let _bindEvents = function (config, dom) {

    debugger;

    // Read actions
    let actions = config.actions;

    actions.forEach(action => {
        dom.addEventListener(action.type, function() {
            _handleAction(action);
        });        
    });


};

let _processComponentSchema = function (componentSchema, mainFrag, childFrag = []) {

    let childrenComponents = componentSchema.children;
    if (childrenComponents) {
        childrenComponents.forEach(schema => {
            let docFrag = document.createElement("div");
            childFrag = childFrag || [];
            childFrag.push(_processComponentSchema(schema, docFrag, childFrag));
        });
    }
    
    return _renderComponent(componentSchema, mainFrag, childFrag);
};

let _renderComponent = function (componentSchema, mainFrag, childFrag) {

    // Build context:
    let contextObject = {};
    contextObject.contextConfig = {};
    contextObject.contextConfig.actions = componentSchema.pyConfig.actions;
    contextObject.key = keys_inc++;

    var component = componentregistry.getComponent(componentSchema.type).render(contextObject, mainFrag, childFrag);

    // let elemRef = component.getDom();
    // Bind the events.
    return component;
};


_processComponentSchema(sampleMetadata, document.getElementById("app"), null);


