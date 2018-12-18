let express = require('express');
let fs = require('fs');
let path = require('path');

let app = express();
let getContent = function (api) {
    let content = "{";
    
    let pathStr = path.join(__dirname, 'src', 'mocks', api, 'contextdata.json');
    let contextContent = fs.readFileSync(pathStr, 'utf8');
    content = content + '"contextdata":'+ contextContent;

    pathStr = path.join(__dirname, 'src', 'mocks', api, 'data.json');
    let dataContent = fs.readFileSync(pathStr, 'utf8');
    content = content + ',"data":'+ dataContent;

    pathStr = path.join(__dirname, 'src', 'mocks', api, 'metadata.json');
    let metadataContent = fs.readFileSync(pathStr, 'utf8');
    content = content + ',"uimetadata":'+ metadataContent;

    content = content + "}";

    return content;
};

app.use(express.static(path.join(__dirname, 'src')));

// Our first route
app.get('/', function (req, res) {
    res.send('Hello Dev!');
});

/*app.get('/', function (req, res) {
    res.send('Hello Dev!');
});*/

app.get('/api/*', function (req, res) {
    let url = req.url;
    let api = url.substring("/api/".length);

    res.setHeader('Content-Type', 'application/json');
    res.send(getContent(api));
});



app.get('/display/portal', function (req, res) {
    
    let portalContent = getContent("portal");

    res.write("<html>");

    res.write("<head>");
    res.write(`
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>

    <script src="../core/abstract_components.js"></script>
    <script src="../core/components_registry.js"></script>
    <script src="../core/components_registry.js"></script>
    <script src="../core/context_processor.js"></script>

    <script src="../components/components.js"></script>
    <script src="../components/clockplugin.js"></script>
    <script src="../core/renderer.js"></script>
    <script src="../core/actions.js"></script>
    `);


    res.write("</head>");

    res.write("<body>");
    res.write("<div id='app'></div>");
    res.write("<script>");
    res.write("var uiMetadata = " + portalContent + ";\n");
    res.write("UIBootstrap.render(uiMetadata);");
    res.write("</script>");

    res.write("</body>");

    res.write("</html>");
    res.end();

});

// Listen to port 5000
app.listen(3000, function () {
    console.log('Dev app listening on port 3000!');
});

