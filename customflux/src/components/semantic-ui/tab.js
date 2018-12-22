componentregistry.registerComponent("tab", {
    render: function (contextObject, mainFrag, childFrag) {

        let component = React.createElement( semanticUIReact.Tab.Pane, null, childFrag);
        let title = contextObject.title || "NONE";

        let paneObj = { menuItem: title, render: () => component};

        return paneObj;
    }
});