componentregistry.registerComponent("layout", {
    render: function (contextObject, mainFrag, childFrag) {

        let className = contextObject.className || "layout";
        let header = React.createElement("div", {className: className}, childFrag);
        return header;
    }
});