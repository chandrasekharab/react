componentregistry.registerComponent("xyz-org-clock", {


    componentDidMount: function (dom) {
        function startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            dom.innerHTML =
            h + ":" + m + ":" + s;
            var t = setTimeout(startTime, 500);
          };
          
          function checkTime(i) {
            if (i < 10) {i = "0" + i};
            return i;
          };

          startTime();
    },

    render: function (contextObject, mainFrag, childFrag) {
        
        let dom = document.createElement("div");
        return dom;
    }
});