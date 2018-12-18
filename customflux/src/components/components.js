class GenericComponent extends React.Component {
    getDom() {
        return this.refs.dom;
    }
    componentDidMount() {
        _bindEvents(this.props.contextConfig, this.getDom());
    }
};

class ExtensionComponent extends GenericComponent {
    componentDidMount() {
       let dom = this.props.contextConfig.ref;
       this.refs.dom.appendChild(dom);
       let component = componentregistry.getComponent(this.props.contextConfig.type)
       
       if (component.componentDidMount) {
            component.componentDidMount(dom);
       }
       _bindEvents(this.props.contextConfig, this.getDom());
    }

    render() {
        return React.createElement('span', { ref: "dom"}, '');
    }
}

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
