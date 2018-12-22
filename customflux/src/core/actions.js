var Actions = (function () {

    let EVENTS_MAP = {
        "click": "onClick",
        "change": "onChange"
    }

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

    /**
     * Binds the event to dom element as event-native listener.
     * @param {UIMetadata config object} config 
     * @param {element ref} dom 
     */
    var _bindEvents = function (config, dom) {
    
        if (!config) {
            return;
        }
    
        // Read actions
        let actions = config.actions || [];
    
        actions.forEach(action => {
            dom.addEventListener(action.type, function() {
                _handleAction(action);
            });        
        });
    };

    /**
     * Binds the action/event to react component.
     */
    var _bindActions = function (component, actions = []) {
        component.actions = {};
        actions.forEach(action => {
            let actionName = EVENTS_MAP[action.type];
            component.actions[actionName] = Actions.handleAction.bind(action);
        });
    };

    return {
        handleAction: _handleAction,
        bindEvents: _bindEvents,
        bindActions: _bindActions
    };
})();