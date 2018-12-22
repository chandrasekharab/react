componentregistry.registerComponent("autocomplete", {
    render: function (contextObject, mainFrag, childFrag) {
        let options = contextObject.options;       
        let comp = React.createElement(semanticUIReact.Dropdown, { placeholder: 'Select Country', fluid: true, search: true, selection: true, options: options });


        return comp;
    }
});
