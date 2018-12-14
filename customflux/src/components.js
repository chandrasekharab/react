class GenericComponent extends React.Component {
    getDom() {
        return this.refs.dom;
    }
    componentDidMount() {
        _bindEvents(this.props.contextConfig, this.getDom());
    }
};

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

class Layout extends GenericComponent {
    render() {
      debugger;
      return React.createElement('div', { ref: "dom"}, `Hello ${this.props.toWhat}`, this.props.children);
    }
} 

componentregistry.registerComponent("layout", {
    render: function (contextObject, mainFrag, childFrag) {
        return ReactDOM.render(
            React.createElement(Layout, contextObject, childFrag),
            mainFrag
          );

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
