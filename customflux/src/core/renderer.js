var UIBootstrap = (function () {
    
    var keys_inc = 1;
 
    var _processComponentSchema = function (componentSchema, mainFrag, childFrag = []) {
    
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
    
    var _renderComponent = function (componentSchema, mainFrag, childFrag) {
    
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
    
    _render = function (uiObject) {
        debugger;
        // Push sections
        let uiMetadata = uiObject.uimetadata;
        let bootstrap = uiMetadata.bootstrap;
        let sections = uiMetadata.sectionstore;
        let data = uiObject.data;
        let contextData = uiObject.contextdata;

        ContextProcessor.updateSectionStore(sections);
        ContextProcessor.updateContextData(contextData);
        ContextProcessor.updateData(data);

        _processComponentSchema(bootstrap, document.getElementById("app"), null);
    };

    return {
        render: _render
    }

})();


