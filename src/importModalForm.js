
let nodesImported;
let edgesImported;

importNetworkModalForm = function () {

    var nodesFile = document.getElementById('dragDropNodes');
    var edgesFile = document.getElementById('dragDropEdges');


    makeDroppable(nodesFile, callbackNodes);
    makeDroppable(edgesFile, callbackEdges);


// Get user click button
document.getElementById("importNetwork").onclick = getDataImport;
}

getDataImport = function () {
    buildClustersImport(nodesImported);
    buildEdgesImport(edgesImported);
}

callbackNodes = function (files) {
    //Only process json files.
    if (files[0].type.endsWith('/json')) {
        document.getElementById('nodesFileName').innerHTML = files[0].name
        loadFile(files[0], 'nodes');
    } else {
        alert("Wrong file format. Must be a JSON file")
    }
}

callbackEdges = function (files) {
    //Only process json files.
    if (files[0].type.endsWith('json')) {
        document.getElementById('edgesFileName').innerHTML = files[0].name
        loadFile(files[0], 'edges');
    } else {
        alert("Wrong file format. Must be a JSON file")
    }
}

loadFile = function (file, kind) {
    let reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            // Read text data and parse to JSON.
            let data = JSON.parse(e.target.result)
            if (kind == 'nodes') {
                nodesImported = data;
            } else if (kind == 'edges') {
                edgesImported = data;
            }
        };
    })(file);
    // Read in the file as text.
    reader.readAsText(file);
}

callback = function (files) {
    console.log("both")
    console.log(files.getData());
}

//source: https://bitwiser.in/2015/08/08/creating-dropzone-for-drag-drop-file.html
makeDroppable = function (element, callback) {

    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', true);
    input.style.display = 'none';

    input.addEventListener('change', triggerCallback);
    element.appendChild(input);

    element.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.add('dragover');
    });

    element.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
    });

    element.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
        triggerCallback(e);
    });

    element.addEventListener('click', function () {
        input.value = null;
        input.click();
    });

    function triggerCallback(e) {
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        callback.call(null, files);
    }
}

buildEdgesImport = function (result) {
    EdgeFactory.reset();
    EdgeFactory.buildEdges(result, ClusterFactory.clusters)
}

buildClustersImport = function (result) {
    ClusterFactory.reset();
    ClusterFactory.makeClusters(result);
    ClusterFactory.refreshColors(1,ColorFactory.palettes[0]);
    ClusterFactory.refreshColors(2,ColorFactory.palettes[1]);
}
