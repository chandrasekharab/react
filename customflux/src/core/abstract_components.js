
/**
 * Generic component which will handle generic use-cases, like binding the 
 * events.
 */
class GenericComponent extends React.Component {
    getDom() {
        return this.refs.dom;
    }
    componentDidMount() {
        Actions.bindEvents(this.props.contextConfig, this.getDom());
    }
};

/**
 * Extension component is used for custom components which are not
 * extending React components.
 */
class ExtensionComponent extends GenericComponent {
    componentDidMount() {
       let dom = this.props.contextConfig.ref;
       this.refs.dom.appendChild(dom);
       let component = componentregistry.getComponent(this.props.contextConfig.type)
       
       if (component.componentDidMount) {
            component.componentDidMount(dom);
       }
       Actions.bindEvents(this.props.contextConfig, this.getDom());
    }

    render() {
        return React.createElement('span', { ref: "dom"}, '');
    }
}