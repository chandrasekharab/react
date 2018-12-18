var Actions = (function () {

    let actionHandlers = {
        "post": function (data) {
            console.log("Posting data " + data);
        },

        "save": function (data) {
            console.log("Saving data "+ data);
        }
    };


    let _handleAction = function (actionObject, data={}) {
        let actionHandler = actionHandlers[actionObject.name];
        if (actionHandler) {
            // Get the data
            actionHandler(data);
        }
    };

    var _bindEvents = function (config, dom) {
    
        debugger;
    
        // Read actions
        let actions = config.actions;
    
        actions.forEach(action => {
            dom.addEventListener(action.type, function() {
                _handleAction(action);
            });        
        });
    };

    return {
        handleAction: _handleAction,
        bindEvents: _bindEvents
    };
})();