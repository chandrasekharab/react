let sampleMetadata = {
    type: "reference",
    config: {
        type: "section",
        ref: "addresssec",
        context: "pyWorkPage"
    }
};

let sectionstore = {
    addresssec: {
        type: "layout",
        config: {
            actions: [{
                type: "change",
                name: "post"
            }]
        },

        children: [
            /*{
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
            }*/
            {
                type: "xyz-org-clock",
                config: {
                    data: "initialTime",
                    actions: [{
                        type: "click",
                        name: "post"
                    }]
                }
            }
        ]
    }
};