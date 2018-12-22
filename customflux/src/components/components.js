class TextInput extends GenericComponent {
    render() {
      return React.createElement('span', { ref: "dom"}, `Text Input`);
    }
}

class Button extends GenericComponent {
    render() {
      return React.createElement('button', { ref: "dom"}, `Button`);
    }
}

class Image extends GenericComponent {
    render() {
        return React.createElement("img", { ref: "dom"}, `Image Element`);
    }
}


class Layout extends GenericComponent {
    render() {
      debugger;
      return React.createElement('div', { ref: "dom"}, '', this.props.children);
    }
} 

componentregistry.registerComponent("layout", {
    render: function (contextObject, mainFrag, childFrag) {
        return React.createElement(Layout, contextObject, childFrag);

    }
});

componentregistry.registerComponent("pxTextInput", {
    render: function (contextObject, mainFrag, childFrag) {
        return React.createElement(TextInput, contextObject);

    }
});

componentregistry.registerComponent("pxButton", {
    render: function (contextObject, mainFrag, childFrag) {
        return React.createElement(Button, contextObject);
    }
});
