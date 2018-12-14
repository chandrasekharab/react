
    let _processComponentSchema = function (componentSchema, mainFrag, childFrag) {

        let childrenComponents = componentSchema.children;
        if (childrenComponents) {
            childrenComponents.forEach(schema => {
                let docFrag = document.createDocumentFragment();
                _processComponentSchema(schema, docFrag, childFrag);
            });
        }
        
        _renderComponent(componentSchema, mainFrag, childFrag);
    };

    