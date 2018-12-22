componentregistry.registerComponent("header", {
    render: function (contextObject, mainFrag, childFrag) {
          let header = React.createElement("div", {className: "header"}, "Hello Pega");
          return header;
    }
});