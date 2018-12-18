componentregistry.registerComponent("xyz-org-badge", {

    render: function (contextObject, mainFrag, childFrag) {

        let text = document.createTextNode(contextObject.badgeValue);
        let dom = document.createElement("div");
        dom.setAttribute("class", "badge");

        dom.appendChild(text);

        return dom;
    }
});