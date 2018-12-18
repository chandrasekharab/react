var componentregistry = (function () {

    let components = {};

    let _registerComponent = function (componentName, component) {
        components[componentName] = component;
    };

    let _getComponent = function (componentName) {
        return components[componentName];
    }

    return  {
        registerComponent: _registerComponent,
        getComponent: _getComponent
    }
})();