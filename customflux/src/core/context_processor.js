var ContextProcessor = (function () {

    let contextStack = [];
    let contextData = {};
    let data = {};
    let sectionstore = {};

    let _push = function (contextPath) {

        let path = contextPath;
        let obj = {};
        let context = {};
        if (typeof contextPath === 'object') {
            obj = contextPath;
        } else if (contextPath.indexOf('.') === 0) {
            path = _current().fullRef + path;
            contextPath = contextPath.substring(1);
            obj = _current().obj[contextPath];
            context = _current().context[contextPath];
        } else {
            obj = data[contextPath];
            context = contextData[contextPath];
        }

        let page = {
            fullRef: path,
            obj: obj,
            context: context
        };
        contextStack.push(page);
    };

    let _pop = function () {
        if (contextStack.length > 1) {
            contextStack.pop();
        }
    };

    let _current = function () {
        return contextStack[contextStack.length-1];
    };
    let _getProperyValue = function (propName) {
        if (propName.indexOf(".") === 0) {
            propName = propName.substring(1);
        }
        return _current().obj[propName];
    };

    let _getReference = function (propName) {
        let ref = _current().ref;
        if (propName.indexOf('.') === 0) {
            ref = propName;
        } else {
            ref =+ "." + propName;
        }

        return ref;
    };

    let _resolveSection = function (ref) {
        let sectionObj = {};

        if (_current().context && _current().context["$sections"]) {
            sectionObj = _current().context["$sections"][ref] || {};
        }

        // Push the context
        if (sectionObj.context) {
            _push(sectionObj.context);
        }

        // Lookup section in store
        return sectionstore[sectionObj.name || ref];

    };

    let _updateSectionStore = function (sections = {}) {
        
        let sectionName;
        for(sectionName in sections) {
            sectionstore[sectionName] = sections[sectionName];
        }
    };

    let _updateData = function (dt) {
        data = dt;
    };

    let _updateContextData = function (cxtData) {
        contextData = cxtData;
    };

    return  {
        push: _push,
        pop: _pop,
        getProperyValue: _getProperyValue,
        getReference: _getReference,
        resolveSection: _resolveSection,
        updateSectionStore: _updateSectionStore,
        updateContextData: _updateContextData,
        updateData: _updateData
    }
})();