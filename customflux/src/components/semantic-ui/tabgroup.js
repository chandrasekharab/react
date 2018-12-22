componentregistry.registerComponent("tabgroup", {
    render: function (contextObject, mainFrag, childFrag) {
        
          let tabgroup = React.createElement(semanticUIReact.Tab, { menu: { fluid: true, vertical: true }, menuPosition: 'left', panes: childFrag });

          return  tabgroup;
    }
});

