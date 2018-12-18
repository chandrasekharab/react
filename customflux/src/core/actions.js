let Actions = (function () {

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

    return {
        handleAction: _handleAction
    };
})();