let keys_inc = 1;

let _handleAction = function (actionConfig) {
    Actions.handleAction(actionConfig);
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

    if (componentSchema.type === "reference") {
        // Sec-reference render it.
        let config = componentSchema.config;
        
        // If context exist push it
        if (config.context) {
            ContextProcessor.push(config.context);
        }

        if (config.type === "section") {
            let ref = config.ref;
            let sectionMetadata = ContextProcessor.resolveSection(ref);
            let elements = _processComponentSchema(sectionMetadata, mainFrag, childFrag);
            ContextProcessor.pop();
            return elements;
        }

        if (config.context) {
            ContextProcessor.pop();
        }
    }

    // Build context:
    let contextObject = {};
    contextObject.contextConfig = {};
    contextObject.contextConfig.actions = componentSchema.config.actions;
    contextObject.key = keys_inc++;
    contextObject.contextConfig.type = componentSchema.type;

    var component = componentregistry.getComponent(componentSchema.type).render(contextObject, mainFrag, childFrag);

    if (component instanceof Element) {
        contextObject.contextConfig.ref = component;
        component = React.createElement(ExtensionComponent, contextObject);
    }

    // let elemRef = component.getDom();
    // Bind the events.
    return component;
};


_processComponentSchema(sampleMetadata, document.getElementById("app"), null);


