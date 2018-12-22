var UIBootstrap = (function () {

    var keys_inc = 1;

    var _processComponentSchema = function (componentSchema, mainFrag) {

        let childrenComponents = componentSchema.children;
        let childFrag = [];
        if (childrenComponents) {
            childrenComponents.forEach(schema => {
                let docFrag = document.createElement("div");
                childFrag = childFrag || [];

                if (schema["repeat"]) {
                    let list = ContextProcessor.getProperyValue(schema.context);
                    list.forEach(row => {
                        ContextProcessor.push(row);
                        childFrag.push(_processComponentSchema(schema, docFrag, childFrag));
                        ContextProcessor.pop();
                    });
                } else {
                    childFrag.push(_processComponentSchema(schema, docFrag, childFrag));
                }
            });
        }

        return _renderComponent(componentSchema, mainFrag, childFrag);
    };

    var _renderComponent = function (componentSchema, mainFrag, childFrag) {

        let config = componentSchema.config || {};
        if (componentSchema.type === "reference") {

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

        if (componentSchema.config) {
            // contextObject.contextConfig.actions = config.actions;

            // Clone config into context object
            Object.assign(contextObject, config);

            // Copy additional data required
            let prop = config.data;
            if (prop) {
                contextObject[prop] = ContextProcessor.getProperyValue(prop);
            }

            // Process properties in config
            let i;
            for (i in config) {
                let prop = config[i];
                if (prop && typeof prop === "string" && prop.indexOf('.') === 0) {
                    contextObject[i] = ContextProcessor.getProperyValue(prop);
                }
            } 
        }

        contextObject.key = keys_inc++;
        contextObject.contextConfig.type = componentSchema.type;

        // Bind the events.
        Actions.bindActions(contextObject, config.actions);

        var component = componentregistry.getComponent(componentSchema.type).render(contextObject, mainFrag, childFrag);

        // non react components handling.
        if (component instanceof Element) {
            contextObject.contextConfig.ref = component;
            component = React.createElement(ExtensionComponent, contextObject);
        }

        return component;
    };

    _render = function (uiObject) {

        // Push sections
        let uiMetadata = uiObject.uimetadata;
        let bootstrap = uiMetadata.bootstrap;
        let sections = uiMetadata.sectionstore;
        let data = uiObject.data;
        let contextData = uiObject.contextdata;

        ContextProcessor.updateSectionStore(sections);
        ContextProcessor.updateContextData(contextData);
        ContextProcessor.updateData(data);

        let component = _processComponentSchema(bootstrap, document.getElementById("app"), null);
        ReactDOM.render(component, document.getElementById("app"));

    };

    return {
        render: _render
    }

})();