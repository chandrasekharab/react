let sampleMetadata = {
    type: "layout",
    pyConfig: {
        actions: [{
            type: "change",
            name: "post"
        }]
    },

    children: [{
            type: "pxTextInput",
            pyConfig: {
                data: "firstName",
                actions: [{
                    type: "change",
                    name: "post"
                }]
            }
        },
        {
            type: "pxTextInput",
            pyConfig: {
                title: "lastName",
                actions: [{
                    type: "change",
                    name: "post"
                }]
            }
        },
        {
            type: "pxButton",
            pyConfig: {
                title: "Testing",
                actions: [{
                    type: "click",
                    name: "submit"
                }]
            }
        }
    ]
};

let data = {
    firstName: "Hello",
    lastName: "World"
};