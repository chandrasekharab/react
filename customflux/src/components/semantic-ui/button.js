componentregistry.registerComponent("button", {
    render: function (contextObject, mainFrag, childFrag) {

        let label = contextObject.label;
        let primary = !!contextObject.primary;
        let context = Object.assign({}, contextObject.actions, { primary: primary });
        let button = React.createElement(semanticUIReact.Button, context, label);
        return button;
    }
});