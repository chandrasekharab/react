componentregistry.registerComponent("text", {
    render: function (contextObject) {
        return React.createElement("span", null, contextObject.text);
    }
});