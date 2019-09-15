
exportNetworkModalForm = function () {

    document.getElementById("exportNetwork").onclick = getData1;
}

getData1 = function () {

    let fileSuffix = document.getElementById("exportFileSuffix").value;
    let includeNodes = document.getElementById("includeNodes").checked;
    let includeEdges = document.getElementById("includeEdges").checked;

    if (fileSuffix) {

       if (includeNodes){
        ClusterFactory.recordJSON(fileSuffix);
       }
       if (includeEdges){
        EdgeFactory.recordJSON(fileSuffix);
       }
       if (!includeNodes && !includeEdges){
           alert("Select either nodes, edges or both")
       }
    } else {
        alert("Missing file name");
    }

}

