let ContextProcessor = (function () {

    let contextStack = [];
    let contextData = globalContextData || {};
    let data = globalData || {};

    let _push = function (contextPath) {

        let path = contextPath;
        let obj = {};
        let context = {};

        if (contextPath.indexOf('.') === 0) {
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
        contextStack.pop();
    };

    let _current = function () {
        return contextStack[contextStack.length-1];
    };
    let _getProperyValue = function (propName) {
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
        let sectionObj = _current().context["$sections"][ref];
        if (sectionObj.context) {
            _push(sectionObj.context);
        }
        
        // Lookup section in store
        return sectionstore[sectionObj.name];

    };

    return  {
        push: _push,
        pop: _pop,
        getProperyValue: _getProperyValue,
        getReference: _getReference,
        resolveSection: _resolveSection
    }
})();