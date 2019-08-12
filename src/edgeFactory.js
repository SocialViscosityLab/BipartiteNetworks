class EdgeFactory {
    constructor() {

    }

    static buildEdges = function (edgs, clusters) {
        for (let index = 0; index < Object.keys(edgs).length; index++) {
            // take the source ID: cluster, cat and polarity
            let e = edgs[index];
            // look for the  cluster X in the clusters collection
            let sourceTemp;
            let targetTemp;
            for (const c of clusters) {
                let foundST = { source: false, target: false };
                if (c.cluster.id == e.source.cluster) {
                    sourceTemp = c.cluster;
                    foundST.source = true;
                }
                if (c.cluster.id == e.target.cluster) {
                    targetTemp = c.cluster;
                    foundST.target = true;
                }
                if (foundST.source && foundST.target) {
                    break;
                }
            }

            // look for the category in the X' categories
            let sourceCtgTemp;
            for (const ctgr of sourceTemp.categories) {
                if (ctgr.idCat.index == e.source.cat) {
                    sourceCtgTemp = ctgr;
                    break;
                }
            }
            // get categories connector generator
            let connSource;
            if (e.source.polarity == true) {
                connSource = sourceCtgTemp.positives[sourceCtgTemp.positives.length - 1];
            } else {
                connSource = sourceCtgTemp.negatives[sourceCtgTemp.negatives.length - 1];
            }
            // ask the connector to sproutEdge
            connSource.notifyObservers(connSource.sproutEdge());

            // look for the category in the X' categories
            let targetCtgTemp;
            for (const ctgr of targetTemp.categories) {
                if (ctgr.idCat.index == e.target.cat) {
                    targetCtgTemp = ctgr;
                    break;
                }
            }
            // get categories connector generator
            let connTarget;
            if (e.target.polarity == true) {
                connTarget = targetCtgTemp.positives[targetCtgTemp.positives.length - 1];
            } else {
                connTarget = targetCtgTemp.negatives[targetCtgTemp.negatives.length - 1];
            }
            // ask the connector to sproutEdge
            connTarget.notifyObservers(connTarget.sproutEdge());

        }
    }

    static recordJSON() {
        let filename = "edges.json";
        let output = [];
        for (let index = 0; index < edges.length; index++) {
            output.push (edges[index].id);
        }
        globalP5.saveJSON(output,filename);
    }
}