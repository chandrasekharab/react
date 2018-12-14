/** OM */

var pega = {};
pega.state = {};

(function(){

    let states = {};

    let _setState = function () {
        //
    };

    let _mapState = function (obj, component) {
        states[obj] = component;
    }

    let _fireChange = function (obj) {
        // fire
        if (states[obj]) {
            states[obj].component.render(component.ref);
        }
    }

    return {
        setState: _setState
    };

})();
